import { computed, defineComponent, ref, watch } from 'vue';
import { useElementBounding } from '@vueuse/core';
import StickyProps from './props';
import config from '../config';
import { usePrefixClass } from '../hooks/useClass';
import { useTNodeJSX } from '../hooks/tnode';
import useElementRect from '../hooks/useElementRect';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-sticky`,
  props: StickyProps,
  setup(props) {
    const renderTNodeJSX = useTNodeJSX();
    const stickyBarClass = usePrefixClass('sticky');

    // box 用于占位和记录边界
    // content 用于实际定位
    const boxRef = ref<HTMLElement>();
    const { top: boxTop } = useElementBounding(boxRef);
    const contentRef = ref<HTMLElement>();
    const { top: contentTop, height } = useElementBounding(contentRef);

    const stickyStyle = computed(() => `height:${height.value}px;`);

    // 处理 container 的解析和边界计算。
    // 将 props.container 包装为 ref，以便正确监听 Vue ref 类型的 container
    const containerRef = computed(() => props.container);
    const {
      element: containerElement,
      rect: containerRect,
      updateElement: updateContainer,
    } = useElementRect(containerRef, { immediate: true });

    // 监听 boxTop 变化，在滚动时更新 container 边界信息
    watch(boxTop, () => {
      if (containerElement.value) {
        updateContainer();
      }
    });

    // 通过改变 content 的定位来实现 sticky 效果
    const contentStyles = computed(() => {
      let styleStr = `z-index:${props.zIndex};`;
      let isFixed = false;
      if (props.disabled) return styleStr;
      const offsetTop = Number(props.offsetTop);
      if (containerElement.value) {
        const { bottom: containerBottom } = containerRect.value;
        // sticky 固定的条件：到达吸附位置 且 container 在可视区域内
        const shouldFix = boxTop.value <= offsetTop && containerBottom > 0;

        if (shouldFix) {
          styleStr += `position:fixed;top:${offsetTop}px;`;
          isFixed = true;
        }

        // transform 的计算独立于 fixed 状态
        // 当 sticky 即将超出 container 底部时，使用 transform 让它跟随 container 一起移动
        const difference = containerBottom - offsetTop - height.value;
        if (difference < 0) {
          styleStr += `transform:translate3d(0, ${difference}px, 0);`;
        }
      } else if (boxTop.value <= offsetTop) {
        styleStr += `position:fixed;top:${offsetTop}px;`;
        isFixed = true;
      }
      props.onScroll?.({ scrollTop: contentTop.value, isFixed });
      return styleStr;
    });

    return () => (
      <div ref={boxRef} class={stickyBarClass.value} style={stickyStyle.value}>
        <div ref={contentRef} class={`${stickyBarClass.value}__content`} style={contentStyles.value}>
          {renderTNodeJSX('default')}
        </div>
      </div>
    );
  },
});

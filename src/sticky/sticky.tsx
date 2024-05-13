import { computed, defineComponent, ref, watch } from 'vue';
import { useElementBounding } from '@vueuse/core';
import StickyProps from './props';
import config from '../config';
import { usePrefixClass } from '../hooks/useClass';
import { useTNodeJSX } from '../hooks/tnode';

const name = `${config.prefix}-sticky`;

export default defineComponent({
  name,
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

    // container 容器，sticky不会超出该边界
    let container: HTMLElement;
    const containerHeight = ref(0);
    const containerTop = ref(0);

    // 监听页面滚动事件
    watch(boxTop, () => {
      if (props.container) {
        // @ts-ignore
        container = document.querySelector(props.container);
        const { top, height } = container.getBoundingClientRect();
        containerHeight.value = height;
        containerTop.value = top;
      }
    });

    // 通过改变 content 的定位来实现 sticky 效果
    const contentStyles = computed(() => {
      let styleStr = `z-index:${props.zIndex};`;
      let isFixed = false;
      if (props.disabled) return styleStr;
      const offsetTop = Number(props.offsetTop);
      if (container) {
        if (containerHeight.value + containerTop.value < offsetTop + height.value) {
          styleStr += `transform:translate3d(0, ${containerHeight.value - height.value}px, 0);`;
        } else if (boxTop.value <= offsetTop) {
          styleStr += `position:fixed;top:${offsetTop}px;`;
          isFixed = true;
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

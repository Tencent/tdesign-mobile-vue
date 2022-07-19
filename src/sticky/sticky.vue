<template>
  <div ref="boxRef" :class="boxClasses" :style="boxStyles">
    <div ref="contentRef" :class="`${boxClasses}__content`" :style="contentStyles">
      <t-node :content="stickyContent"></t-node>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, getCurrentInstance, defineComponent, ref, watch } from 'vue';
import { useElementBounding, templateRef } from '@vueuse/core';
import props from './props';
import config from '../config';
import { renderContent, useEmitEvent, TNode } from '../shared';

const name = `${config.prefix}-sticky`;

export default defineComponent({
  name,
  components: { TNode },
  props,
  setup(props, context) {
    const boxClasses = name;
    const stickyContent = computed(() => renderContent(getCurrentInstance(), 'default', ''));
    const emitEvent = useEmitEvent(props, context.emit);

    // box 用于占位和记录边界
    // content 用于实际定位
    const boxRef = templateRef('boxRef');
    const { top: boxTop } = useElementBounding(boxRef);
    const contentRef = templateRef('contentRef');
    const { top: contentTop, height } = useElementBounding(contentRef);

    const boxStyles = computed(() => `height:${height.value}px;`);

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
      emitEvent('scroll', { scrollTop: contentTop.value, isFixed });
      return styleStr;
    });

    return {
      boxClasses,
      boxStyles,
      contentStyles,
      stickyContent,
    };
  },
});
</script>

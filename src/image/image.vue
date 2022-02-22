<template>
  <div :class="classes">
    <div v-if="loadingValue || errorValue" :class="`${name}__status`">
      <t-node :content="statusContent" />
    </div>
    <img
      ref="imageDOM"
      :class="`${name}__img`"
      :style="imageStyles"
      :src="realSrc"
      :alt="alt"
      @Load="handleImgLoadCompleted"
      @Error="handleImgLoadError"
    />
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent, SetupContext, getCurrentInstance, h, watch } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import { EllipsisIcon, CloseIcon } from 'tdesign-icons-vue-next';
import { useEmitEvent, renderTNode, TNode } from '../shared';
import ImageProps from './props';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-image`;

export default defineComponent({
  name,
  components: { TNode },
  props: ImageProps,
  setup(props, context: SetupContext) {
    const emitEvent = useEmitEvent(props, context.emit);

    // 默认loading和error状态展示，slot支持Node和Function
    const internalInstance = getCurrentInstance();
    const statusContent = computed(() => {
      if (context.slots?.loading && loadingValue.value) {
        return renderTNode(internalInstance, 'loading');
      }
      if (!context.slots?.loading && loadingValue.value) {
        return h(EllipsisIcon);
      }
      if (context.slots?.error && errorValue.value) {
        return renderTNode(internalInstance, 'error');
      }
      if (!context.slots?.error && errorValue.value) {
        return h(CloseIcon);
      }
      return '';
    });

    // 记录图片的loading、error状态
    const loadingValue = ref(true);
    const errorValue = ref(false);

    // 图片自定义样式
    const imageStyles = computed(() => {
      return {
        objectFit: props.fit,
        objectPosition: props.position,
      };
    });
    const classes = computed(() => ({
      [`${name}`]: true,
      [`${name}--${props.shape}`]: true,
    }));

    // 图片懒加载
    const imageDOM = ref();
    const realSrc = ref(props.lazy ? '' : props.src);
    const { stop } = useIntersectionObserver(imageDOM, ([{ isIntersecting }], observerElement) => {
      if (isIntersecting && props.lazy) {
        // 停止监听
        stop();
        realSrc.value = props.src;
      }
    });

    // 图片加载完成回调
    const handleImgLoadCompleted = (e: Event) => {
      emitEvent('load', e);
      loadingValue.value = false;
    };

    // 图片加载失败回调
    const handleImgLoadError = (e: Event) => {
      if (realSrc.value === '') {
        return;
      }
      emitEvent('error', e);
      loadingValue.value = false;
      errorValue.value = true;
    };
    return {
      imageDOM,
      statusContent,
      name,
      classes,
      imageStyles,
      loadingValue,
      realSrc,
      errorValue,
      handleImgLoadCompleted,
      handleImgLoadError,
    };
  },
});
</script>

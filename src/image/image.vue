<template>
  <div :class="classes">
    <div v-if="loadingValue" :class="`${name}__status`">
      <slot name="loading">
        <t-icon-ellipsis />
      </slot>
    </div>
    <div v-else-if="errorValue" :class="`${name}__status`">
      <slot name="error">
        <t-icon-close />
      </slot>
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
import { ref, computed, defineComponent, SetupContext } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import { EllipsisIcon as TIconEllipsis, CloseIcon as TIconClose } from 'tdesign-icons-vue-next';

import { useEmitEvent } from '../shared';
import ImageProps from './props';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-image`;

export default defineComponent({
  name,
  components: { TIconEllipsis, TIconClose },
  props: ImageProps,
  setup(props, context: SetupContext) {
    const emitEvent = useEmitEvent(props, context.emit);
    const imageDOM = ref();
    // 图片懒加载
    const { stop } = useIntersectionObserver(imageDOM, ([{ isIntersecting }], observerElement) => {
      if (isIntersecting && props.lazy) {
        // 停止监听
        stop();
        realSrc.value = props.src;
      }
    });
    const loadingValue = ref(true);
    const errorValue = ref(false);

    const realSrc = ref(props.lazy ? '' : props.src);

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

    const handleImgLoadCompleted = (e: Event) => {
      emitEvent('load', e);
      loadingValue.value = false;
    };

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

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
      ref="wrapDOM"
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
import { ref, computed, onMounted, defineComponent, watch, SetupContext } from 'vue';

import { EllipsisIcon as TIconEllipsis, CloseIcon as TIconClose } from 'tdesign-icons-vue-next';

import { emitEvent } from '../shared';
import useInViewport from './useInViewport';
import ImageProps from './props';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-image`;

export default defineComponent({
  name,
  components: { TIconEllipsis, TIconClose },
  props: ImageProps,
  setup(props, context: SetupContext) {
    const wrapDOM = ref();
    onMounted(() => {
      const showImage = useInViewport(wrapDOM.value);
      watch(
        () => showImage.value,
        () => {
          if (props.lazy) {
            realSrc.value = props.src;
          }
        },
      );
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
      emitEvent(props, context, 'load', e);
      loadingValue.value = false;
    };

    const handleImgLoadError = (e: Event) => {
      if (realSrc.value === '') {
        return;
      }
      emitEvent(props, context, 'error', e);
      loadingValue.value = false;
      errorValue.value = true;
    };
    return {
      wrapDOM,
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

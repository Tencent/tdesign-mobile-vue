<template>
  <div :class="classes">
    <div v-if="loadingValue" :class="`${name}__status`">
      <slot name="loading">
        <t-node :content="defaultLoadingIcon"></t-node>
      </slot>
    </div>
    <div v-else-if="errorValue" :class="`${name}__status`">
      <slot name="error">
        <t-node :content="defaultCloseIcon"></t-node>
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
import { ref, computed, h, onMounted, defineComponent, watch, SetupContext } from 'vue';

import { EllipsisIcon, CloseIcon } from 'tdesign-icons-vue-next';
import { TNode } from '../shared';
import useInViewport from './useInViewport';
import ImageProps from './props';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-image`;

export default defineComponent({
  name,
  components: { TNode },
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
    const defaultLoadingIcon = computed(() => {
      return h(EllipsisIcon);
    });

    const defaultCloseIcon = computed(() => {
      return h(CloseIcon);
    });

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
      context.emit('load', e);
      loadingValue.value = false;
    };

    const handleImgLoadError = (e: Event) => {
      if (realSrc.value === '') {
        return;
      }
      context.emit('error', e);
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
      defaultLoadingIcon,
      defaultCloseIcon,
      handleImgLoadCompleted,
      handleImgLoadError,
    };
  },
});
</script>

<template>
  <div :class="classes">
    <div v-if="isLoading || isError" :class="`${name}__mask`">
      <t-node :content="statusContent" />
    </div>
    <picture>
      <template v-if="srcset">
        <source v-for="(item, index) in Object.entries(srcset)" :key="index" :type="item[0]" :srcset="item[1]" />
      </template>
      <img
        ref="imageDOM"
        :class="`${name}__img`"
        :style="imageStyles"
        :src="realSrc"
        :alt="alt"
        @load="handleImgLoadCompleted"
        @error="handleImgLoadError"
      />
    </picture>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent, getCurrentInstance, h, watchEffect } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import { CloseIcon } from 'tdesign-icons-vue-next';

import Loading from '../loading';
import { useEmitEvent, renderTNode, TNode } from '../shared';
import ImageProps from './props';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-image`;

export default defineComponent({
  name,
  components: { TNode },
  props: ImageProps,
  setup(props, context) {
    const emitEvent = useEmitEvent(props, context.emit);

    // 默认loading和error状态展示，slot支持Node和Function
    const internalInstance = getCurrentInstance();

    const closeIcon = h(CloseIcon, { size: '22px' });
    const LoadingIcon = h(Loading, { theme: 'dots', inheritColor: true });
    const statusContent = computed(() => {
      if (context.slots?.loading && isLoading.value) {
        return renderTNode(internalInstance, 'loading');
      }
      if (!context.slots?.loading && isLoading.value) {
        return LoadingIcon;
      }
      if (context.slots?.error && isError.value) {
        return renderTNode(internalInstance, 'error');
      }
      if (!context.slots?.error && isError.value) {
        return closeIcon;
      }
      return '';
    });
    console.log('=====', statusContent);
    // 记录图片的loading、error状态
    const isLoading = ref(true);
    const isError = ref(false);

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
    const realSrc = ref('');
    watchEffect(() => {
      realSrc.value = props.lazy ? '' : props.src;
    });
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
      isLoading.value = false;
    };

    // 图片加载失败回调
    const handleImgLoadError = (e: Event) => {
      if (realSrc.value === '') {
        return;
      }
      emitEvent('error', e);
      isLoading.value = false;
      isError.value = true;
    };
    return {
      imageDOM,
      statusContent,
      name,
      classes,
      imageStyles,
      isLoading,
      realSrc,
      isError,
      handleImgLoadCompleted,
      handleImgLoadError,
    };
  },
});
</script>

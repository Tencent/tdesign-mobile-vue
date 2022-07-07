<template>
  <Transition :name="name">
    <div v-show="visible" :class="classes" :style="customStyle" @click="handleClick" @touchmove="handleTouchMove">
      <slot />
    </div>
  </Transition>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted } from 'vue';
import config from '../config';
import props from './props';
import { TdOverlayProps } from './type';

const { prefix } = config;
const name = `${prefix}-overlay`;

export default defineComponent({
  name,
  props,
  setup(props: TdOverlayProps) {
    const classes = computed(() => ({
      [`${name}`]: true,
      [`${name}--active`]: props.visible,
      [`${name}--transparent`]: props.transparent,
    }));
    const customStyle = computed(() => ({
      'z-index': props.zIndex,
      'transition-duration': `${props.duration}ms`,
    }));

    const handleTouchMove = (e: TouchEvent) => {
      if (props.preventScrollThrough) {
        e.stopPropagation();
        e.preventDefault();
      }
    };
    const handleClick = (e: MouseEvent) => {
      props.onClick?.({ e });
    };

    const cls = `${prefix}-overflow-hidden`;

    onMounted(() => {
      props.preventScrollThrough && document.body.classList.add(cls);
    });

    onUnmounted(() => {
      props.preventScrollThrough && document.body.classList.remove(cls);
    });

    return {
      name,
      classes,
      customStyle,
      handleClick,
      handleTouchMove,
    };
  },
});
</script>

<template>
  <Transition :name="name">
    <div v-show="visible" :class="classes" :style="rootStyles" @click="handleClick" @touchmove="handleTouchMove">
      <slot />
    </div>
  </Transition>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import config from '../config';
import props from './props';

const { prefix } = config;
const name = `${prefix}-overlay`;

export default defineComponent({
  name,
  props,
  setup(props) {
    const classes = computed(() => ({
      [`${name}`]: true,
      [`${name}--active`]: props.visible,
      [`${name}--transparent`]: props.transparent,
    }));

    const rootStyles = computed(() =>
      props.customStyle || props.zIndex || props.duration
        ? (props.customStyle && `${props.customStyle};`) +
          (props.zIndex && `z-index:${props.zIndex};`) +
          (props.duration && `transition-duration:${props.duration}ms;`)
        : undefined,
    );

    const handleTouchMove = (e: TouchEvent) => {
      if (props.preventScrollThrough) {
        e.stopPropagation();
        e.preventDefault();
      }
    };
    const handleClick = (e: MouseEvent) => {
      props.onClick?.({ e });
    };

    return {
      name,
      classes,
      rootStyles,
      handleClick,
      handleTouchMove,
    };
  },
});
</script>

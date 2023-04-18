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
    }));

    const rootStyles = computed(() => {
      const arr = [];

      if (props.customStyle) {
        arr.push(props.customStyle);
      }
      if (props.zIndex) {
        arr.push(`z-index: ${props.zIndex}`);
      }
      if (props.duration) {
        arr.push(`transition-duration: ${props.duration}ms`);
      }
      if (props.backgroundColor) {
        arr.push(`background-color: ${props.backgroundColor}`);
      }
      return arr.join('; ');
    });

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

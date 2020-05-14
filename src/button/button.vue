<template>
  <button :class="classes" :disabled="disabled">
    <t-icon :icon="_icon" :class="iconClass" v-if="_icon" />
    <span :class="textClass" v-if="!iconOnly">
      <slot />
    </span>
  </button>
</template>

<script lang="ts">
import { ref, computed, toRefs, SetupContext } from 'vue';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-button`;

export enum ButtonShape {
  Square = 'square',
  Round = 'round',
  Circle = 'circle'
}

export interface ButtonProps {
  theme: {
    type: string;
    default: 'default';
  };
  size: {
    type: string;
    default: 'default';
  };
  icon: string;
  block: {
    type: boolean;
    default: false;
  };
  shape: {
    type: ButtonShape;
    default: ButtonShape.Round;
  };
  loading: {
    type: boolean;
    default: false;
  };
  disabled: {
    type: boolean;
    default: false;
  };
}

export default {
  name,
  props: {
    theme: {
      type: String,
      default: 'default',
    },
    size: {
      type: String,
      default: 'default',
    },
    icon: String,
    block: {
      type: Boolean,
      default: false,
    },
    shape: {
      type: String,
      default: ButtonShape.Round,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: ButtonProps, context: SetupContext) {
    const { loading } = toRefs(props);
    const inIcon = props.icon;
    const iconOnly = computed(() => !context.slots.default);

    const textClass = computed(() => [`${name}__text`]);
    const iconClass = ref(`${name}__icon`);

    const classes = computed(() => [
      `${name}`,
      `${name}--theme-${props.theme}`,
      {
        [`${name}--size-${props.size}`]: props.size,
        [`${name}--square`]:
          props.shape.valueOf() === ButtonShape.Square.valueOf(),
        [`${name}--circle`]:
          props.shape.valueOf() === ButtonShape.Circle.valueOf(),
        [`${prefix}-is-block`]: props.block,
        [`${prefix}-is-disabled`]: props.disabled,
        [`${prefix}-is-loading`]: props.loading,
      },
    ]);

    const _icon = computed(() => (loading.value ? 'loading_gradient' : inIcon));

    return {
      classes,
      textClass,
      iconClass,
      iconOnly,
      _icon,
      ...toRefs(props),
    };
  },
};
</script>

<template>
  <button :class="classes" :disabled="disabled">
    <t-icon :icon="icon" :class="iconClass" v-if="icon" />

    <span :class="textClass" v-if="!iconOnly">
      <slot />
    </span>

    <t-icon :icon="suffixIcon" :class="iconSuffixIconClass" v-if="suffixIcon" />
  </button>
</template>

<script lang="ts">
import { ref, computed, watch, toRefs, SetupContext } from 'vue';
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
  suffixIcon: string;
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
    suffixIcon: String,
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
    const { icon, loading } = toRefs(props);
    const inIcon = props.icon;
    const iconOnly = computed(() => !context.slots.default);

    const textClass = computed(() => [`${name}--text`]);
    const iconClass = ref(`${name}__icon`);
    const iconSuffixIconClass = ref(`${name}__suffix-icon`);

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

    watch(loading, (loading, prevLoading)  => {
      console.log(loading, prevLoading);
      icon.value = loading ? 'loading_gradient' : inIcon;
    });

    return {
      classes,
      textClass,
      iconClass,
      iconSuffixIconClass,
      iconOnly,
      ...toRefs(props),
    };
  },
};
</script>

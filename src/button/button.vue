<template>
  <button :class="classes" :disabled="disabled">
    <t-icon icon="loading_gradient" :class="iconClass" v-if="loading" />
    <t-icon :icon="icon" :class="iconClass" v-if="icon && !loading" />

    <span v-if="!iconOnly">
      <slot />
    </span>

    <t-icon :icon="suffixIcon" :class="iconSuffixIconClass" v-if="suffixIcon" />
  </button>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import config from '../config';
const { prefix } = config;
const name: string = `${prefix}-button`;

interface ButtonProps {
  /**
   * 风格样式
   */
  theme: {
    type: String;
    default: 'primary';
  };
  /**
   * 按钮大小
   */
  size: {
    type: String;
    default: 'm';
  };
  /**
   * 圆角
   */
  round: Boolean;
  loading: Boolean;
  disabled: Boolean;
  icon: String;
  suffixIcon: String;
  htmlType:  String;
  iconOnly: Boolean;
  block: {
    type: Boolean;
    default: false;
  };
}


export default {
  name,
  props: {
    theme: {
      type: String,
      default: 'primary',
    },
    /**
     * 按钮大小
     */
    size: {
      type: String,
      default: 'm',
    },
    /**
     * 圆角
     */
    round: Boolean,
    loading: Boolean,
    disabled: Boolean,
    icon: String,
    suffixIcon: String,
    htmlType: String,
    iconOnly: Boolean,
    block: {
      type: Boolean,
      default: false,
    },
  },
  setup(props:ButtonProps) {
    console.log(props.theme);
    const iconClass = ref(`${name}__icon`);
    const iconSuffixIconClass = ref(`${name}__suffix-icon`);

    const classes = computed(() => [
      `${name}`,
      `${name}--size-${props.size}`,
      `${name}--theme-${props.theme}`,
      {
        ['is-disabled']: props.disabled,
        [`${name}--notext`]: props.iconOnly,
        [`${name}--loading`]: props.loading,
        [`${name}--round`]: props.round,
        [`${name}--block`]: props.block,
      },
    ]);
    return { classes, iconClass, iconSuffixIconClass, ...props };
  },
};
</script>

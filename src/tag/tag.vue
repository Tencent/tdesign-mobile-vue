<template>
  <span :class="classes" :style="style">
    <t-icon v-if="icon" :class="`${baseClass}__icon`" :name="icon" />
    <slot :class="`${baseClass}__text`" />
    <t-icon v-if="closable && !disabled" :class="`${baseClass}__close`" name="close" @click="onClickClose" />
  </span>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-tag`;

export enum TagTheme {
  Default = 'default',
  Primary = 'primary',
  Info = 'info',
  Warning = 'warning',
  Danger = 'danger',
  Success = 'success',
}

export enum TagEffect {
  Dark = 'dark',
  Light = 'light',
  Plain = 'plain',
}

export enum TagSize {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
}
 
export enum TagShape {
  Square = 'square',
  Round = 'round',
  Circle = 'circle',
}

// export type TagProps = {};

const Tag = defineComponent({
  name,
  props: {
    theme: {
      type: String,
      default: TagTheme.Default,
    },
    effect: {
      type: String,
      default: TagEffect.Dark,
    },
    size: {
      type: String,
      default: TagSize.Medium,
    },
    icon: {
      type: String,
      default: '',
    },
    shape: {
      type: String,
      default: TagShape.Square,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    closable: {
      type: Boolean,
      default: false,
    },
    maxWidth: {
      type: [String, Number],
      default: '',
    },
  },
  emits: ['close'],
  setup(props, context) {
    const baseClass = name;
    const { size, shape, theme, effect, maxWidth, disabled, closable } = toRefs(props);

    const style: { maxWidth?: string } = {};
    if (maxWidth.value) {
      style.maxWidth = `${maxWidth.value}px`;
    }

    const classes = computed(() => [
      `${baseClass}`,
      `${baseClass}--theme-${theme.value}`,
      {
        [`${baseClass}--effect-${effect.value}`]: theme.value,
        [`${prefix}-is-error`]: theme.value === 'danger',
        [`${prefix}-is-success`]: theme.value === 'success',
        [`${prefix}-is-warnging`]: theme.value === 'warnging',
        [`${prefix}-is-closable ${baseClass}--closable`]: closable.value,
        [`${prefix}-is-disabled ${baseClass}--disabled`]: disabled.value,
        [`${baseClass}--size-${size.value}`]: size.value,
        [`${baseClass}--${shape.value}`]: true,
      },
    ]);

    function onClickClose(e: Event) {
      if (props.disabled) {
        e.stopPropagation();
      } else {
        context.emit('close', e);
      }
    }

    return {
      baseClass,
      classes,
      style,
      onClickClose,
    };
  },
});

export default Tag;
</script>

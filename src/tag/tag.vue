<template>
  <span :class="classes">
    <t-icon :class="baseClass+'__icon'" v-if="icon" :icon="icon" />
    <slot :class="baseClass+'__text'" />
    <t-icon
      :class="baseClass+'__close'"
      v-if="closable && !disabled"
      icon="clear"
      @click="onClickClose"
    />
  </span>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-tag`;

export enum TagTheme {
  Default = 'default',
  Primary = 'primary',
  Info = 'info',
  Warning = 'warning',
  Danger = 'danger',
  Success = 'success'
}
export enum TagEffect {
  Dark = 'dark',
  Light = 'light',
  Plain = 'plain'
}

export enum TagSize {
  Large = 'large',
  Default = 'default',
  Small = 'small'
}

export enum TagShape {
  Square = 'square',
  Round = 'round',
  Circle = 'circle'
}

export type TagProps = {};

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
      default: TagSize.Default,
    },
    icon: String,
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
  },
  setup(props, context) {
    const baseClass = name;

    const { size, shape, theme, effect } = props;

    const classes = computed(() => [
      `${baseClass}`,
      `${baseClass}--theme-${theme}`,
      {
        [`${baseClass}--effect-${effect}`]: theme !== 'default',
        [`${baseClass}--size-${size}`]: size,
        [`${baseClass}--square`]: shape.valueOf() === TagShape.Square.valueOf(),
        [`${baseClass}--round`]: shape.valueOf() === TagShape.Round.valueOf(),
        [`${baseClass}--circle`]: shape.valueOf() === TagShape.Circle.valueOf(),
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
      onClickClose,
    };
  },
});

export default Tag;
</script>

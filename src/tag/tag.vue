<template>
  <span :class="classes" :style="style">
    <t-icon :class="`${baseClass}__icon`"  v-if="icon" :name="icon" />
    <slot :class="`${baseClass}__text`" />
    <t-icon
      :class="`${baseClass}__close`"
      v-if="closable && !disabled"
      name="close"
      @click="onClickClose"
    />
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
  Success = 'success'
}

export enum TagEffect {
  Dark = 'dark',
  Light = 'light',
  Plain = 'plain'
}

export enum TagSize {
  Large = 'large',
  Medium = 'medium',
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
      default: TagSize.Medium,
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
    maxWidth: {
      type: Number || String,
      default: false,
    },
  },
  setup(props, context) {
    const baseClass = name;
    const { disabled, closable } = toRefs(props);

    const { size, shape, theme, effect, maxWidth } = props;

    const style = {};
    if (maxWidth) {
      style.maxWidth = `${maxWidth}px`;
    }

    const classes = computed(() => [
      `${baseClass}`,
      `${baseClass}--theme-${theme}`,
      {
        [`${baseClass}--effect-${effect}`]: theme,
        [`${baseClass}--closable`]: closable.value,
        [`${baseClass}--disabled`]: disabled.value,
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
      style,
      onClickClose,
    };
  },
});

export default Tag;
</script>

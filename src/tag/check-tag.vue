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
import { defineComponent, computed, toRefs } from 'vue';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-check-tag`;

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
    checked: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const baseClass = `${prefix}-tag`;;

    const { checked, disabled } = toRefs(props);
    const { size, shape } = props;

    const classes = computed(() => [
      `${baseClass}`,
      `${baseClass}`,
      `${baseClass}--theme-default`,
      {
        [`${baseClass}--size-${size}`]: size,
        [`${baseClass}--disabled`]: disabled.value,
        [`${baseClass}--checked`]: checked.value,
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

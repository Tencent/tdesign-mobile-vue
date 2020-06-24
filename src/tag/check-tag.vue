<template>
  <button :class="classes" @click="onClick($event)" :disabled="disabled">
    <t-icon :class="baseClass+'__icon'" v-if="icon" :icon="icon" />
    <slot :class="baseClass+'__text'" />
    <t-icon
      :class="baseClass+'__close'"
      v-if="closable && !disabled"
      icon="clear"
      @click="onClickClose"
    />
  </button>
</template>

<script lang="tsx">
import { defineComponent, computed, toRefs } from 'vue';
import TIcon from '../icon';
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

const CheckTag = defineComponent({
  name,
  components: {
    TIcon,
  },
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
    const baseClass = `${prefix}-tag`;

    const { checked, disabled } = toRefs(props);
    const { size, shape } = props;

    const classes = computed(() => [
      `${baseClass}`,
      `${baseClass}--checkable`,
      {
        [`${baseClass}--size-${size}`]: size,
        [`${baseClass}--disabled`]: disabled.value,
        [`${baseClass}--checked`]: checked.value,
        [`${baseClass}--square`]: shape.valueOf() === TagShape.Square.valueOf(),
        [`${baseClass}--round`]: shape.valueOf() === TagShape.Round.valueOf(),
        [`${baseClass}--circle`]: shape.valueOf() === TagShape.Circle.valueOf(),
      },
    ]);

    function onClick(e: Event): void {
      if (props.disabled) {
        e.stopPropagation();
        e.preventDefault();
      }
    }

    function onClickClose(e: Event): void {
      if (props.disabled) {
        e.stopPropagation();
      } else {
        context.emit('close', e);
      }
    }

    return {
      baseClass,
      classes,
      onClick,
      onClickClose,
    };
  },
});

export default CheckTag;
</script>

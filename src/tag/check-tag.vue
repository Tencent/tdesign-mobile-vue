<template>
  <button :class="classes" :disabled="disabled">
    <component :is="computedIcon" :class="`${baseClass}__icon`"> </component>
    <slot :class="`${baseClass}__text`" />
    <t-icon-clear v-if="closable && !disabled" :class="`${baseClass}__close`" @click="onClickClose" />
  </button>
</template>

<script lang="ts">
import TIconClear from '../icon/clear-circle-filled.vue';
import { defineComponent, computed, toRefs, watch } from 'vue';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-check-tag`;

export enum TagSize {
  Large = 'large',
  Default = 'default',
  Small = 'small',
}

export enum TagShape {
  Square = 'square',
  Round = 'round',
  Circle = 'circle',
}

// export type TagProps = {};

const CheckTag = defineComponent({
  name,
  components: {
    TIconClear,
  },
  props: {
    size: {
      type: String,
      default: TagSize.Default,
    },
    icon: {
      type: Function,
      default: undefined,
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
    checked: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['change', 'close'],
  setup(props, context) {
    const baseClass = `${prefix}-tag`;

    const { size, shape, checked, disabled, closable } = toRefs(props);

    const classes = computed(() => [
      `${baseClass}`,
      `${baseClass}--checkable`,
      {
        [`${baseClass}--size-${size.value}`]: size.value,
        [`${prefix}-is-closable ${baseClass}--closable`]: closable.value,
        [`${prefix}-is-disabled ${baseClass}--disabled`]: disabled.value,
        [`${prefix}-is-checked ${baseClass}--checked`]: checked.value,
        [`${baseClass}--square`]: shape.value.valueOf() === TagShape.Square.valueOf(),
        [`${baseClass}--round`]: shape.value.valueOf() === TagShape.Round.valueOf(),
        [`${baseClass}--circle`]: shape.value.valueOf() === TagShape.Circle.valueOf(),
      },
    ]);

    const computedIcon = computed(() => {
      if (typeof props.icon === 'function') {
        return props.icon();
      }
      return context.slots?.icon;
    });

    function onClickClose(e: Event): void {
      if (props.disabled) {
        e.stopPropagation();
      } else {
        context.emit('close', e);
      }
    }

    watch(checked, (checked) => {
      context.emit('change', checked);
    });

    return {
      baseClass,
      classes,
      onClickClose,
      computedIcon,
    };
  },
});

export default CheckTag;
</script>

<template>
  <span :class="classes" :style="style">
    <component :is="computedIcon" :class="`${baseClass}__icon`"> </component>
    <slot :class="`${baseClass}__text`" />
    <t-icon-close v-if="closable && !disabled" :class="`${baseClass}__close`" @click="onClickClose" />
  </span>
</template>

<script lang="ts">
import TIconClose from '../icon/close.vue';
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
  components: { TIconClose },
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

    const computedIcon = computed(() => {
      if (!!props.icon) {
        return props.icon();
      }
      if (!!context.slots.icon) {
        return context.slots.icon;
      }
      return undefined;
    });

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
      computedIcon,
    };
  },
});

export default Tag;
</script>

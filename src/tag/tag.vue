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
import TagProps from './props';
const { prefix } = config;
const name = `${prefix}-tag`;

const Tag = defineComponent({
  name,
  components: { TIconClose },
  props: TagProps,
  emits: ['close'],
  setup(props, context) {
    const baseClass = name;
    const { size, shape, theme, variant, maxWidth, disabled, closable } = toRefs(props);

    const style: { maxWidth?: string } = {};
    if (maxWidth.value) {
      style.maxWidth = `${maxWidth.value}px`;
    }

    const classes = computed(() => [
      `${baseClass}`,
      `${baseClass}--theme-${theme.value}`,
      `${baseClass}--${shape.value}`,
      {
        [`${baseClass}--variant-${variant.value}`]: theme.value,
        [`${prefix}-is-error`]: theme.value === 'danger',
        [`${prefix}-is-success`]: theme.value === 'success',
        [`${prefix}-is-warning`]: theme.value === 'warning',
        [`${prefix}-is-closable ${baseClass}--closable`]: closable.value,
        [`${prefix}-is-disabled ${baseClass}--disabled`]: disabled.value,
        [`${baseClass}--size-${size.value}`]: size.value,
      },
    ]);

    const computedIcon = computed(() => {
      if (typeof props.icon === 'function') {
        return props.icon();
      }
      return context.slots?.icon;
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

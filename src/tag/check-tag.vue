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
import CheckTagProps from './check-tag-props';
const { prefix } = config;
const name = `${prefix}-check-tag`;

const CheckTag = defineComponent({
  name,
  components: {
    TIconClear,
  },
  props: CheckTagProps,
  emits: ['change', 'close'],
  setup(props, context) {
    const baseClass = `${prefix}-tag`;

    const { size, shape, checked, disabled, closable } = toRefs(props);

    checked.value = props.defaultChecked;

    const classes = computed(() => [
      `${baseClass}`,
      `${baseClass}--checkable`,
      `${baseClass}--${shape.value}`,
      {
        [`${baseClass}--size-${size.value}`]: size.value,
        [`${prefix}-is-closable ${baseClass}--closable`]: closable.value,
        [`${prefix}-is-disabled ${baseClass}--disabled`]: disabled.value,
        [`${prefix}-is-checked ${baseClass}--checked`]: checked.value,
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

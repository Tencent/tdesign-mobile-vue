<template>
  <button :class="classes" :disabled="disabled" @click="handleClick">
    <div :class="`${baseClass}__icon`">
      <t-node :content="iconContent"></t-node>
    </div>
    <div :class="`${baseClass}__text`">
      <t-node :content="tagContent"></t-node>
    </div>
    <close-icon v-if="closable && !disabled" :class="`${baseClass}__close`" @click="handleClickClose" />
  </button>
</template>

<script lang="ts">
import { CloseIcon } from 'tdesign-icons-vue-next';
import { defineComponent, computed, toRefs, getCurrentInstance } from 'vue';
import config from '../config';
import CheckTagProps from './check-tag-props';
import { renderContent, renderTNode, TNode } from '@/shared';

const { prefix } = config;
const name = `${prefix}-check-tag`;

const CheckTag = defineComponent({
  name,
  components: {
    CloseIcon,
    TNode,
  },
  props: CheckTagProps,
  emits: ['change', 'click', 'close'],
  setup(props, context) {
    const baseClass = `${prefix}-tag`;

    const { size, shape, checked, disabled, closable } = toRefs(props);

    const internalInstance = getCurrentInstance();
    const tagContent = computed(() => renderContent(internalInstance, 'default', 'content'));
    const iconContent = computed(() => renderTNode(internalInstance, 'icon'));

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

    function handleClickClose(e: Event): void {
      if (props.disabled) {
        e.stopPropagation();
      } else {
        context.emit('close', e);
      }
    }

    const handleClick = (e: MouseEvent): void => {
      if (!disabled.value) {
        context.emit('click', { e });
        context.emit('change', !checked.value);
        if (typeof props.onClick === 'function') props.onClick({ e });
        if (typeof props.onChange === 'function') props.onChange(!checked.value);
      }
    };

    return {
      baseClass,
      classes,
      handleClickClose,
      handleClick,
      iconContent,
      tagContent,
    };
  },
});

export default CheckTag;
</script>

<template>
  <span :class="classes" :style="style" :aria-disabled="disabled" role="button" @click="handleClick">
    <span :class="`${baseClass}__icon`">
      <t-node :content="iconContent"></t-node>
    </span>
    <span :class="`${baseClass}__text`">
      <t-node :content="tagContent"></t-node>
    </span>
    <close-icon v-if="closable && !disabled" :class="`${baseClass}__close`" @click="onClickClose" />
  </span>
</template>

<script lang="ts">
import { CloseIcon } from 'tdesign-icons-vue-next';
import { defineComponent, computed, toRefs, getCurrentInstance } from 'vue';
import config from '../config';
import TagProps from './props';
import { emitEvent, renderContent, renderTNode, TNode } from '../shared';

const { prefix } = config;
const name = `${prefix}-tag`;

const Tag = defineComponent({
  name,
  components: { CloseIcon, TNode },
  props: TagProps,
  emits: ['close', 'click'],
  setup(props, context) {
    const internalInstance = getCurrentInstance();
    const tagContent = computed(() => renderContent(internalInstance, 'default', 'content'));
    const iconContent = computed(() => renderTNode(internalInstance, 'icon'));
    const baseClass = name;
    const { size, shape, theme, variant, maxWidth, disabled, closable } = toRefs(props);

    const style: { maxWidth?: string } = {};
    if (maxWidth?.value) {
      style.maxWidth = `${maxWidth.value}px`;
    }

    const classes = computed(() => [
      `${baseClass}`,
      `${baseClass}-${theme.value}`,
      `${baseClass}--${shape.value}`,
      {
        [`${baseClass}-${variant.value}`]: variant.value,
        [`${prefix}-is-error`]: theme.value === 'danger',
        [`${prefix}-is-success`]: theme.value === 'success',
        [`${prefix}-is-warning`]: theme.value === 'warning',
        [`${prefix}-is-closable ${baseClass}--closable`]: closable.value,
        [`${prefix}-is-disabled ${baseClass}--disabled`]: disabled.value,
        [`${baseClass}--size-${size.value}`]: size.value,
      },
    ]);

    function onClickClose(e: Event) {
      if (!props.disabled) {
        emitEvent(props, context, 'close', e);
      }
    }

    const handleClick = (e: MouseEvent): void => {
      if (!props.disabled) {
        emitEvent(props, context, 'click', e);
      }
    };

    return {
      baseClass,
      classes,
      style,
      onClickClose,
      handleClick,
      iconContent,
      tagContent,
    };
  },
});

export default Tag;
</script>

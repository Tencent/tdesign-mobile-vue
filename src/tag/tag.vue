<template>
  <span :class="classes" :style="style" @click="handleClick">
    <div :class="`${baseClass}__icon`">
      <TNode :content="iconContent"></TNode>
    </div>
    <div :class="`${baseClass}__text`">
      <TNode :content="tagContent"></TNode>
    </div>
    <t-icon-close v-if="closable && !disabled" :class="`${baseClass}__close`" @click="onClickClose" />
  </span>
</template>

<script lang="ts">
import TIconClose from '../icon/close.vue';
import { defineComponent, computed, toRefs, getCurrentInstance } from 'vue';
import config from '../config';
import TagProps from './props';
import { renderContent, renderTNode, TNode } from '@/shared';
const { prefix } = config;
const name = `${prefix}-tag`;

const Tag = defineComponent({
  name,
  components: { TIconClose, TNode },
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

    function onClickClose(e: Event) {
      if (props.disabled) {
        e.stopPropagation();
      } else {
        context.emit('close', e);
        if (typeof props.onClose === 'function') props.onClose({ e });
      }
    }

    const handleClick = (e: MouseEvent): void => {
      if (!disabled.value) {
        context.emit('click', { e });
        if (typeof props.onClick === 'function') props.onClick({ e });
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

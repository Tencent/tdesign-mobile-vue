<template>
  <span :class="classes" :style="tagStyle" :aria-disabled="disabled" role="button" @click="handleClick">
    <span :class="`${baseClass}__icon`">
      <t-node :content="iconContent"></t-node>
    </span>
    <span :class="`${baseClass}__text`">
      <t-node :content="tagContent"></t-node>
    </span>
    <span v-if="closable && !disabled" :class="`${baseClass}__icon-close`" @click="onClickClose">
      <close-icon />
    </span>
  </span>
</template>

<script lang="ts">
import { CloseIcon } from 'tdesign-icons-vue-next';
import { defineComponent, computed, getCurrentInstance } from 'vue';
import config from '../config';
import TagProps from './props';
import { useEmitEvent, renderContent, renderTNode, TNode } from '../shared';

const { prefix } = config;
const name = `${prefix}-tag`;

const Tag = defineComponent({
  name,
  components: {
    CloseIcon,
    TNode,
  },
  props: TagProps,
  emits: ['close', 'click'],
  setup(props, context) {
    const emitEvent = useEmitEvent(props, context.emit);
    const internalInstance = getCurrentInstance();
    const tagContent = computed(() => renderContent(internalInstance, 'default', 'content'));
    const iconContent = computed(() => renderTNode(internalInstance, 'icon'));
    const baseClass = name;

    const tagStyle = computed(() => {
      return props.maxWidth
        ? { maxWidth: typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth }
        : {};
    });

    const classes = computed(() => [
      `${baseClass}`,
      `${baseClass}--${props.theme}`,
      `${baseClass}--${props.shape}`,
      `${baseClass}--${props.variant}`,
      `${baseClass}--${props.size}`,
      {
        [`${prefix}-is-closable ${baseClass}--closable`]: props.closable,
        [`${prefix}-is-disabled ${baseClass}--disabled`]: props.disabled,
      },
    ]);

    const onClickClose = (e: MouseEvent): void => {
      if (!props.disabled) {
        emitEvent('close', { e });
      }
    };

    const handleClick = (e: MouseEvent): void => {
      if (!props.disabled) {
        emitEvent('click', { e });
      }
    };

    return {
      baseClass,
      classes,
      tagStyle,
      onClickClose,
      handleClick,
      iconContent,
      tagContent,
    };
  },
});

export default Tag;
</script>

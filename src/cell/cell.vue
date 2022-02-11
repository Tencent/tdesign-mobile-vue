<template>
  <div :class="styleCell" @click="onClick">
    <div v-if="leftIconContent !== undefined" :class="`${name}__left-icon`">
      <t-node :content="leftIconContent"></t-node>
    </div>
    <div v-if="titleContent !== undefined" :class="`${name}__title`">
      <t-node :content="titleContent"></t-node><span v-if="required" :class="`${name}--required`">&nbsp;*</span>
      <div v-if="descriptionContent !== undefined" :class="`${name}__description`">
        <t-node :content="descriptionContent"></t-node>
      </div>
    </div>
    <div v-if="noteContent !== undefined" :class="`${name}__note`">
      <t-node :content="noteContent"></t-node>
    </div>
    <div v-if="rightIconContent !== undefined" :class="`${name}__right-icon`">
      <t-node :content="rightIconContent"></t-node>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, toRefs, h } from 'vue';
import { ChevronRightIcon } from 'tdesign-icons-vue-next';
import { renderTNode, renderContent, TNode, emitEvent } from '../shared';
import config from '../config';
import CellProps from './props';

const { prefix } = config;
const name = `${prefix}-cell`;

export default defineComponent({
  name,
  components: { TNode },
  props: CellProps,
  emits: ['click'],
  setup(props, context) {
    const internalInstance = getCurrentInstance();
    const noteContent = computed(() => renderContent(internalInstance, 'default', 'note'));
    const titleContent = computed(() => renderTNode(internalInstance, 'title'));
    const descriptionContent = computed(() => renderTNode(internalInstance, 'description'));
    const rightIconContent = computed(() => {
      if (props.arrow) {
        return h(ChevronRightIcon);
      }
      return renderTNode(internalInstance, 'rightIcon');
    });

    const leftIconContent = computed(() => renderTNode(internalInstance, 'leftIcon'));

    const styleCell = computed(() => [
      `${name}`,
      `${name}--${props.align}`,
      {
        [`${name}--hover`]: props.hover,
        [`${name}--bordered`]: props.bordered,
      },
    ]);

    const onClick = (e: Event) => emitEvent(props, context, 'click', e);

    return {
      ...toRefs(props),
      name,
      onClick,
      styleCell,
      rightIconContent,
      leftIconContent,
      noteContent,
      titleContent,
      descriptionContent,
    };
  },
});
</script>

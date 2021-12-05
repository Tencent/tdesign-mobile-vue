<template>
  <div :class="styleCell" @click="onClick">
    <div v-if="leftIconContent !== undefined" :class="`${name}__left-icon`">
      <TNode :content="leftIconContent"></TNode>
    </div>
    <div v-if="titleContent !== undefined" :class="`${name}__title`">
      <div>
        <TNode :content="titleContent"></TNode><span v-if="required" :class="`${name}--required`">&nbsp;*</span>
      </div>
      <div v-if="descriptionContent !== undefined" :class="`${name}__description`">
        <TNode :content="descriptionContent"></TNode>
      </div>
    </div>
    <div v-if="noteContent !== undefined" :class="`${name}__note`">
      <TNode :content="noteContent"></TNode>
    </div>
    <div v-if="rightIconContent !== undefined" :class="`${name}__right-icon`">
      <TNode :content="rightIconContent"></TNode>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, toRefs, h } from 'vue';
import { renderTNode, TNode } from '@/shared';
import config from '../config';
import { ChevronRightIcon } from 'tdesign-icons-vue-next';
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
    const noteContent = computed(() => renderTNode(internalInstance, 'note'));
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

    const onClick = (e: Event) => context.emit('click', e);

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

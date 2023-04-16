<template>
  <div :class="styleCell" @click="onClick">
    <div :class="`${name}__left`">
      <div v-if="leftIconContent" :class="`${name}__left-icon`">
        <t-node :content="leftIconContent" />
      </div>
      <template v-if="image">
        <img v-if="typeof image === 'string'" :src="image" :class="`${name}__left-image`" />
        <t-node v-else :content="imageContent" />
      </template>
    </div>
    <div v-if="titleContent" :class="`${name}__title`">
      <t-node :content="titleContent" /><span v-if="required" :class="`${name}--required`">&nbsp;*</span>
      <div v-if="descriptionContent" :class="`${name}__description`">
        <t-node :content="descriptionContent" />
      </div>
    </div>
    <div v-if="noteContent" :class="`${name}__note`">
      <t-node :content="noteContent" />
    </div>
    <div v-if="rightIconContent" :class="`${name}__right`">
      <div :class="`${name}__right-icon`">
        <t-node :content="rightIconContent" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, toRefs, h } from 'vue';
import { ChevronRightIcon } from 'tdesign-icons-vue-next';
import { renderTNode, renderContent, TNode, useEmitEvent } from '../shared';
import config from '../config';
import CellProps from './props';
import { useFormDisabled } from '../form/hooks';

const { prefix } = config;
const name = `${prefix}-cell`;

export default defineComponent({
  name,
  components: { TNode },
  props: CellProps,
  emits: ['click'],
  setup(props, context) {
    const emitEvent = useEmitEvent(props, context.emit);
    const disabled = useFormDisabled();
    const internalInstance = getCurrentInstance();
    const noteContent = computed(() => renderContent(internalInstance, 'default', 'note'));
    const titleContent = computed(() => renderTNode(internalInstance, 'title'));
    const descriptionContent = computed(() => renderTNode(internalInstance, 'description'));

    const chevronRightIcon = h(ChevronRightIcon);
    const rightIconContent = computed(() => {
      if (props.arrow) {
        return chevronRightIcon;
      }
      return renderTNode(internalInstance, 'rightIcon');
    });

    const imageContent = computed(() => renderTNode(internalInstance, 'image'));
    const leftIconContent = computed(() => renderTNode(internalInstance, 'leftIcon', { params: { class: 't' } }));

    const styleCell = computed(() => [
      `${name}`,
      `${name}--${props.align}`,
      {
        [`${name}--hover`]: props.hover && disabled.value,
        [`${name}--borderless`]: props.bordered,
      },
    ]);

    const onClick = (e: Event) => {
      if (!disabled.value) {
        emitEvent('click', e);
      }
    };

    return {
      ...toRefs(props),
      name,
      onClick,
      styleCell,
      imageContent,
      rightIconContent,
      leftIconContent,
      noteContent,
      titleContent,
      descriptionContent,
    };
  },
});
</script>

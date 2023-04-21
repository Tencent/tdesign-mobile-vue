<template>
  <button
    :class="buttonClass"
    :disabled="disabled"
    :type="type"
    role="button"
    :aria-disabled="disabled"
    @click="onClick"
  >
    <t-node :content="iconContent" />
    <span :class="`${name}__content`">
      <t-node :content="buttonContent" />
    </span>
    <t-node :content="suffixContent" />
  </button>
</template>

<script lang="ts">
import { computed, toRefs, defineComponent, getCurrentInstance, h } from 'vue';

import Loading from '../loading';
import { useEmitEvent, renderContent, renderTNode, TNode } from '../shared';
import CLASSNAMES from '../shared/constants';
import ButtonProps from './props';
import config from '../config';
import { useFormDisabled } from '../form/hooks';

const { prefix } = config;
const name = `${prefix}-button`;

export default defineComponent({
  name,
  components: { TNode },
  props: ButtonProps,
  emits: ['click'],
  setup(props, context) {
    const emitEvent = useEmitEvent(props, context.emit);
    const disabled = useFormDisabled();
    const internalInstance = getCurrentInstance();
    const buttonClass = computed(() => [
      `${name}`,
      `${name}--size-${props.size}`,
      `${name}--${props.variant}`,
      {
        [`${name}--${props.theme}`]: props.theme,
        [`${name}--${props.shape}`]: props.shape,
        [`${name}--ghost`]: props.ghost,
        [`${name}--block`]: props.block,
        [`${name}--disabled`]: disabled.value,
        [CLASSNAMES.STATUS.loading]: props.loading,
      },
    ]);
    const buttonContent = computed(() => renderContent(internalInstance, 'default', 'content'));
    const loadingContent = computed(() => h(Loading, { inheritColor: true, ...props.loadingProps }));
    const iconContent = computed(() => (props.loading ? loadingContent.value : renderTNode(internalInstance, 'icon')));
    const suffixContent = computed(() => renderTNode(internalInstance, 'suffix'));

    const onClick = (e: Event) => {
      if (!props.loading && !disabled.value) {
        emitEvent('click', e);
      } else {
        e.stopPropagation();
      }
    };
    return {
      name,
      ...toRefs(props),
      disabled,
      buttonContent,
      iconContent,
      suffixContent,
      buttonClass,
      onClick,
    };
  },
});
</script>

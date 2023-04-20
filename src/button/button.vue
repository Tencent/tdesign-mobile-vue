<template>
  <button :class="buttonClass" :disabled="disabled" role="button" :aria-disabled="disabled" @click="onClick">
    <t-node :content="iconContent" />
    <span :class="`${name}__content`">
      <t-node :content="buttonContent"></t-node>
    </span>
  </button>
</template>

<script lang="ts">
import { computed, toRefs, defineComponent, getCurrentInstance, h } from 'vue';
import { LoadingIcon } from 'tdesign-icons-vue-next';
import { useEmitEvent, renderContent, renderTNode, TNode } from '../shared';
import CLASSNAMES from '../shared/constants';
import ButtonProps from './props';
import config from '../config';
import { useFormDisabled } from '../form/hooks';

const { prefix } = config;
const name = `${prefix}-button`;

const loadingContent = h(LoadingIcon, { size: '24px' });

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
        [CLASSNAMES.STATUS.disabled]: disabled.value,
        [CLASSNAMES.STATUS.loading]: props.loading,
      },
    ]);
    const buttonContent = computed(() => renderContent(internalInstance, 'default', 'content'));
    const iconContent = computed(() => (props.loading ? loadingContent : renderTNode(internalInstance, 'icon')));
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
      buttonClass,
      onClick,
    };
  },
});
</script>

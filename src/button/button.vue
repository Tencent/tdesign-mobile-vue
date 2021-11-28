<template>
  <button :class="buttonClass" :disabled="disabled" @click="onClick" role="button" :aria-disabled="disabled">
    <div :class="`${name}__content`">
      <TNode :content="iconContent"></TNode>
      <span :class="`${name}__text`">
        <TNode :content="buttonContent"></TNode>
      </span>
    </div>
  </button>
</template>

<script lang="ts">
import { computed, toRefs, defineComponent, getCurrentInstance, h } from 'vue';
import { renderContent, renderTNode, TNode } from '@/shared';
import CLASSNAMES from '../shared/constants';
import TIconLoading from '../icon/loading.vue';
import ButtonProps from './props';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-button`;

export default defineComponent({
  name,
  components: { TNode },
  props: ButtonProps,
  emits: ['click'],
  setup(props, context) {
    const internalInstance = getCurrentInstance();
    const buttonClass = computed(() => [
      `${name}`,
      props.size ? CLASSNAMES.SIZE[props.size] : '',
      `${name}--variant-${props.variant}`,
      {
        [`${name}--theme-${props.theme}`]: props.theme,
        [`${name}--shape-${props.shape}`]: props.shape !== 'round',
        [`${name}--ghost`]: props.ghost,
        [`${prefix}-size-full-width`]: props.block,
        [`${prefix}-is-disabled`]: props.disabled,
        [`${prefix}-is-loading`]: props.loading,
      },
    ]);
    const buttonContent = computed(() => renderContent(internalInstance, 'default', 'content'));
    const iconContent = computed(() => (props.loading ? h(TIconLoading) : renderTNode(internalInstance, 'icon')));
    const onClick = (e: Event) => {
      if (!props.loading && !props.disabled) {
        // 既不是加载也不是禁用时触发事件
        context.emit('click', e);
      } else {
        e.stopPropagation();
      }
    };
    return {
      name,
      ...toRefs(props),
      buttonContent,
      iconContent,
      buttonClass,
      onClick,
    };
  },
});
</script>

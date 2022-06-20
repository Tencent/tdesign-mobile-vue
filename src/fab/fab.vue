<template>
  <t-button v-bind="customButtonProps" :class="classes" :style="style" @click="onClick">
    <t-node v-if="iconTNode" :content="iconTNode" />
    <span v-if="text" :class="`${name}__text`">{{ text }}</span>
  </t-button>
</template>

<script lang="ts">
import { computed, defineComponent, SetupContext, getCurrentInstance } from 'vue';
import { renderTNode, TNode, useEmitEvent } from '../shared';
import props from './props';
import config from '../config';
import TButton, { TdButtonProps } from '../button';

const { prefix } = config;
const name = `${prefix}-fab`;

export default defineComponent({
  name,
  components: { TNode, TButton },
  props,
  emits: ['click'],
  setup(props, context: SetupContext) {
    const emitEvent = useEmitEvent(props, context.emit);

    const classes = computed(() => ({
      [`${name}`]: true,
      [`${name}--icononly`]: props.icon && !props.text,
    }));

    const onClick = (e: MouseEvent) => emitEvent('click', { e });

    const baseButtonProps = {
      size: 'middle',
      shape: 'round',
      theme: 'primary',
    };
    const customButtonProps = computed(() => ({ ...(baseButtonProps as TdButtonProps), ...props.buttonProps }));

    const internalInstance = getCurrentInstance();
    const iconTNode = computed(() => renderTNode(internalInstance, 'icon'));

    return {
      name,
      classes,
      iconTNode,
      customButtonProps,
      onClick,
    };
  },
});
</script>

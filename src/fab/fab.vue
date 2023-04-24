<template>
  <t-button
    size="large"
    theme="primary"
    :class="classes"
    :style="style"
    v-bind="btnProps"
    :icon="() => iconTNode"
    @click="onClick"
  >
    {{ text }}
  </t-button>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance } from 'vue';

import { renderTNode, useEmitEvent } from '../shared';
import props from './props';
import config from '../config';
import TButton, { ButtonProps } from '../button';

const { prefix } = config;
const name = `${prefix}-fab`;

export default defineComponent({
  name,
  components: { TButton },
  props,
  emits: ['click'],
  setup(props, context) {
    const internalInstance = getCurrentInstance();
    const iconTNode = computed(() => renderTNode(internalInstance, 'icon'));
    const emitEvent = useEmitEvent(props, context.emit);

    const classes = computed(() => ({
      [`${name}`]: true,
    }));
    const btnProps = computed<ButtonProps>(() => ({ shape: props.text ? 'round' : 'circle', ...props.buttonProps }));

    const onClick = (e: MouseEvent) => emitEvent('click', { e });

    return {
      name,
      classes,
      btnProps,
      iconTNode,
      onClick,
    };
  },
});
</script>

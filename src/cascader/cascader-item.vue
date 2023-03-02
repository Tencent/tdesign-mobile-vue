<template>
  <div :class="className" @click="onSelect({ e: $event })">
    <div :class="`${name}-content`">
      <!-- <t-node v-if="!(typeof labelTNode === 'string')" :content="labelTNode"></t-node> -->
      {{ label }}
    </div>
    <div v-show="active" :class="`${name}-active-icon`">
      <check-icon size="24" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, getCurrentInstance } from 'vue';
import { CheckIcon } from 'tdesign-icons-vue-next';
import config from '../config';
import { useEmitEvent, renderTNode } from '../shared';
import CascaderItemProps from './cascader-item-prop';

const { prefix } = config;
const name = `${prefix}-cascader-item`;

export default defineComponent({
  name,
  components: { CheckIcon },
  props: CascaderItemProps,
  emits: ['click'],
  setup(props: any, context) {
    const className = computed(() => [
      `${name}`,
      Boolean(props.active) && 'active',
      Boolean(props.disabled) && 'disabled',
    ]);
    const internalInstance = getCurrentInstance();

    const labelTNode = computed(() => renderTNode(internalInstance, 'label'));

    const emitEvent = useEmitEvent(props, context.emit);
    const onSelect = (context: { e: MouseEvent }) => {
      emitEvent('click', { e: context.e });
    };
    const label = computed(() => props.label);
    return {
      labelTNode,
      name,
      label,
      className,
      onSelect,
      ...toRefs(props),
    };
  },
});
</script>

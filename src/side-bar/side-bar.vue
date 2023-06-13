<template>
  <div :class="`${name}`">
    <slot></slot>
    <div :class="`${name}__padding`"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ComponentInternalInstance, provide, toRefs } from 'vue';
import config from '../config';
import SideBarProps from './props';
import { TdSideBarProps } from './type';
import { useEmitEvent, useDefault } from '../shared';

const { prefix } = config;
const name = `${prefix}-side-bar`;

export default defineComponent({
  name,
  props: SideBarProps,
  emits: ['update:value', 'update:modelValue', 'change'],
  setup(props, context) {
    const emitEvent = useEmitEvent(props, context.emit);
    const [currentValue, setCurrentValue] = useDefault<TdSideBarProps['value'], TdSideBarProps>(
      props,
      context.emit,
      'value',
      'change',
    );

    const state = reactive({
      children: [] as ComponentInternalInstance[],
    });

    const relation = (child: ComponentInternalInstance) => {
      child && state.children.push(child);
    };

    const removeRelation = (child: ComponentInternalInstance) => {
      state.children = state.children.filter((item) => item !== child);
    };

    const onClickItem = (cur: TdSideBarProps['value'], label: string) => {
      setCurrentValue(cur);
      emitEvent('click', cur, label);
    };

    provide('sideBarProvide', {
      ...props,
      state,
      currentValue,
      relation,
      removeRelation,
      onClickItem,
    });

    return {
      name,
      onClickItem,
      ...toRefs(props),
    };
  },
});
</script>

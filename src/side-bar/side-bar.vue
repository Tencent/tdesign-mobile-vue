<template>
  <div :class="`${name}`">
    <slot></slot>
    <div :class="`${name}__padding`"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, ComponentInternalInstance, provide, toRefs } from 'vue';
import config from '../config';
import SideBarProps from './props';
import { TdSideBarProps } from './type';
import { useDefault } from '../shared';

const { prefix } = config;
const name = `${prefix}-side-bar`;

export default defineComponent({
  name,
  props: SideBarProps,
  emits: ['update:value', 'update:modelValue', 'change'],
  setup(props, context) {
    const [currentValue, setCurrentValue] = useDefault<TdSideBarProps['value'], TdSideBarProps>(
      props,
      context.emit,
      'value',
      'change',
    );

    const children: Ref<ComponentInternalInstance[]> = ref([]);

    const relation = (child: ComponentInternalInstance) => {
      child && children.value.push(child);
    };

    const removeRelation = (child: ComponentInternalInstance) => {
      children.value = children.value.filter((item) => item !== child);
    };

    const onClickItem = (cur: string | number, label: string) => {
      setCurrentValue(cur);
      props.onClick?.(cur, label);
    };

    provide('sideBarProvide', {
      ...props,
      children,
      currentValue,
      relation,
      removeRelation,
      onClickItem,
    });

    return {
      name,
      onClickItem,
    };
  },
});
</script>

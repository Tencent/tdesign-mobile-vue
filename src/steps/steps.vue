<template>
  <div :class="baseClass">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { toRefs, provide, computed, defineComponent, reactive, ComponentInternalInstance } from 'vue';
import StepsProps from './props';
import config from '../config';
import { TdStepsProps } from './type';
import { useDefault } from '../shared';

const { prefix } = config;
const name = `${prefix}-steps`;
export default defineComponent({
  name,
  props: StepsProps,
  emits: ['update:current', 'update:modelValue', 'change'],
  setup(props, context) {
    const baseClass = computed(() => [name, `${name}--${props.layout}`, { [`${name}--readonly`]: props.readonly }]);

    const [current, setCurrent] = useDefault<TdStepsProps['current'], TdStepsProps>(
      props,
      context.emit,
      'current',
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

    const onClickItem = (cur: TdStepsProps['current'], prev: TdStepsProps['current'], e: MouseEvent) => {
      setCurrent(cur, prev, { e });
    };

    provide('stepsProvide', {
      ...props,
      state,
      current,
      relation,
      removeRelation,
      onClickItem,
    });

    return {
      baseClass,
      onClickItem,
      ...toRefs(props),
    };
  },
});
</script>

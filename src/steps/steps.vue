<template>
  <div :class="baseClass">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  toRefs,
  provide,
  computed,
  SetupContext,
  defineComponent,
  reactive,
  ComponentInternalInstance,
} from 'vue';
import { StepsProps } from './steps.interface';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-steps`;
export default defineComponent({
  name,
  props: StepsProps,
  emits: ['change', 'update:modelValue'],
  setup(props, context: SetupContext) {
    const baseClass = computed(() => [
      name,
      `${name}--${props.direction}`,
      `${name}--${props.type}-anchor`,
    ]);

    const state = reactive({
      children: [] as ComponentInternalInstance[],
    });

    const modelValue = computed(() => props.modelValue);

    const relation = (child: ComponentInternalInstance) => {
      child && state.children.push(child);
    };


    const onClickItem = (curIndex: number) => {
      if (typeof props.modelValue !== 'undefined') {
        context.emit('update:modelValue', curIndex);
        context.emit('change', curIndex);
      }
    };

    provide('stepsProvide', {
      ...props,
      state,
      relation,
      modelValue,
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

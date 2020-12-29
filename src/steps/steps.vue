<template>
  <div :class="baseClass">
    <component :is="stepItemsComponent"></component>
  </div>
</template>

<script lang="ts">
import {
  toRefs,
  provide,
  computed,
  SetupContext,
  mergeProps,
} from 'vue';
import { StepsProps } from './steps.interface';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-steps`;
export default {
  name,
  props: StepsProps,
  emits: ['change', 'update:modelValue'],
  setup(props: StepsProps, context: SetupContext) {
    const baseClass = computed(() => [
      name,
      `${name}--${props.direction}`,
      `${name}--${props.type}-anchor`,
    ]);

    const modelValue = computed(() => props.modelValue);

    const stepItemsComponent = () => {
      const defaults = context.slots.default ? context.slots.default() : [];
      return defaults
        .filter(item => item.type.name === `${prefix}-steps-item`)
        .map((comp: any, index: number) => {
          const newComp = comp;
          newComp.props = mergeProps(comp.props, { index });
          return newComp;
        });
    };

    const onClickItem = (curIndex) => {
      if (props.modelValue !== 'undefined') {
        context.emit('update:modelValue', curIndex);
        context.emit('change', curIndex);
      }
    };

    provide('stepsProvide', {
      ...props,
      modelValue,
      onClickItem,
    });

    return {
      stepItemsComponent,
      baseClass,
      onClickItem,
      ...toRefs(props),
    };
  },

};
</script>

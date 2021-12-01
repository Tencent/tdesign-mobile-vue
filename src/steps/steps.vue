<template>
  <div :class="baseClass">
    <slot>
      <t-step-item
        v-for="(item, index) in options"
        :key="index"
        :title="item.title"
        :content="item.content"
        :icon="item.icon"
        :status="item.status"
        ></t-step-item>
    </slot>
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
import TStepItem from './step-item.vue';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-steps`;
export default defineComponent({
  name,
  components: {
    TStepItem,
  },
  props: StepsProps,
  emits: ['change', 'update:modelValue'],
  setup(props, context: SetupContext) {
    const baseClass = computed(() => [
      name,
      `${name}--${props.layout}`,
      `${name}--${props.type}-anchor`,
    ]);

    const options = computed(() => props.options);

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
      options,
      baseClass,
      onClickItem,
      ...toRefs(props),
    };
  },
});
</script>

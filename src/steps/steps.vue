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
import StepsProps from './props';
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
  emits: ['update:current', 'change'],
  setup(props, context: SetupContext) {
    const baseClass = computed(() => [
      name,
      `${name}--${props.layout}`,
      `${name}--${props.theme}-anchor`,
    ]);

    const options = computed(() => props.options);

    const current = computed(() => props.current);

    const state = reactive({
      children: [] as ComponentInternalInstance[],
    });

    const relation = (child: ComponentInternalInstance) => {
      child && state.children.push(child);
    };

    const onClickItem = (cur: TdStepsProps['current'], prev: TdStepsProps['current'], e: MouseEvent) => {
      context.emit('update:current', cur);
      context.emit('change', cur, prev, { e });
      if (typeof props.onChange === 'function') props.onChange(cur, prev, { e });
    };

    provide('stepsProvide', {
      ...props,
      state,
      current,
      relation,
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

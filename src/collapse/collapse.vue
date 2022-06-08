<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { toRefs, provide, reactive, SetupContext, defineComponent, watch } from 'vue';
import { onChangeEvent } from './collapse.interface';
import CollapseProps from './props';
import { TdCollapseProps } from './type';
import config from '../config';
import { toggleElem } from './util';
import { useEmitEvent } from '../shared';

const { prefix } = config;
const name = `${prefix}-collapse`;
export default defineComponent({
  name,
  props: CollapseProps,
  emits: ['update:value', 'update:modelValue', 'change'],
  setup(props: TdCollapseProps, context: SetupContext) {
    const emitEvent = useEmitEvent(props, context.emit);
    // 根结点类名
    const state = reactive({
      className: name,
      curValue: props.value || props.defaultValue,
    });

    watch(
      () => props.value || props.defaultValue,
      (v) => {
        state.curValue = v;
      },
    );
    const onPanelChange: onChangeEvent = (value: any) => {
      const newV = toggleElem(value, state.curValue, !props.expandMutex);
      state.curValue = newV;
      emitEvent('update:value', newV);
      emitEvent('update:modelValue', newV);
      emitEvent('change', newV);
    };

    // 提供子组件访问
    provide('collapseProps', props);
    provide('collapseState', state);
    provide('onPanelChange', onPanelChange);
    return {
      ...toRefs(state),
      ...toRefs(props),
    };
  },
});
</script>

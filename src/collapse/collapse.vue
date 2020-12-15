<template>
  <div :class="className">
    <div v-if="title" :class="`${className}__title`">{{title}}</div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  toRefs,
  provide,
  reactive,
  SetupContext,
  defineComponent,
  watch,
} from 'vue';
import { ICollapseProps, CollapseProps } from './collapse.interface';
import config from '../config';
import { toggleElem } from './util';
const { prefix } = config;
const name = `${prefix}-collapse`;
export default defineComponent({
  name,
  props: CollapseProps,
  emits: ['update:value', 'change'],
  setup(props: ICollapseProps, context: SetupContext) {
    // 根结点类名
    const state = reactive({
      className: name,
      curValue: props.value,
    });

    watch(() => props.value, (v) => {
      state.curValue = v;
    });
    const onPanelChange = (name: any) => {
      const newV = toggleElem(name, state.curValue, !props.accordion);
      state.curValue = newV;
      context.emit('update:value', newV);
      context.emit('change', newV);
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

<style>

</style>

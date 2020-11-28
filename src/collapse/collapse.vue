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
} from 'vue';
import { ICollapseProps, CollapseProps } from './collapse.interface';
import config from '../config';
import { toggleElem } from './util.ts';
const { prefix } = config;
const name = `${prefix}-collapse`;
export default defineComponent({
  name,
  props: CollapseProps,
  setup(props: ICollapseProps, context: SetupContext) {
    // , context: SetupContext
    // const { slots } = context;
    // { attrs, slots, emit }
    // 根结点类名
    const state = reactive({
      className: name,
    });
    // 提供子组件访问
    provide('collapseProps', props);
    const collapsePanelChange: Function = (name) => {
      const newV = toggleElem(name, props.value, !props.accordion, props?.keepOne);
      console.log('props', { ...props }, props.accordion);
      context.emit('update:value', newV);
    };
    provide('collapsePanelChange', collapsePanelChange);
    return {
      ...toRefs(props),
      ...toRefs(state),
    };
  },
});
</script>

<style>

</style>

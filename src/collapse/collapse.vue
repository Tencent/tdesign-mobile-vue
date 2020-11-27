<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  // ref,
  // reactive,
  toRefs,
  computed,
  provide,
  // watch,
  // onMounted,
  // SetupContext,
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
    const classes = computed(() => [
      `${name}`,
    ]);
    // 提供子组件访问
    provide('collapseProps', props);
    const collapsePanelChange: Function = (name) => {
      const newV = toggleElem(name, props.value, !props?.accordion, props?.keepOne);
      console.log('collapsePanelChange', name, newV, props.value);
      context.emit('update:value', newV);

      // const allowMulti = !props.accordion
      // const curV = props.value
      // if () {

      // }
      // let nextV = []

      // if () {

      // }
    };
    provide('collapsePanelChange', collapsePanelChange);
    return {
      classes,
      ...toRefs(props),
    };
  },
});
</script>

<style>

</style>

<template>
  <div :class="`${prefix}-radio-group`">
    <slot> </slot>
  </div>
</template>

<script lang="ts">
import { SetupContext, provide, defineComponent } from 'vue';
import config from '../config';
import RadioGroupProps from '../radio/radio-group-props';

const { prefix } = config;
const name = `${prefix}-radio-group`;

export default defineComponent({
  name,
  props: RadioGroupProps,
  setup(props: any, content: SetupContext) {
    /**
     * @description: radio 事件change回调
     * @param {string}
     * @return: void
     */
    const change = (val: string) => {
      content.emit('update:value', val); // 改变自身的v-model值
      content.emit('change', val);
    };
    provide('rootGroupProps', props);
    provide('rootGroupChange', change);
    return {
      prefix,
      change,
    };
  },
});
</script>

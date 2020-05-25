<!--
 * @Author: yuliangyang
 * @Date: 2020-05-20 19:20:11
 * @LastEditTime: 2020-05-25 20:06:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tdesign-mobile-vue/src/radio-group/index.vue
-->
<template>
  <div :class="`${prefix}-radio-group`">
    <slot>
    </slot>
  </div>
</template>

<script lang="ts">
import { SetupContext, provide } from 'vue';
import config from '../config';

const { prefix } = config;

export interface RadioGroupProps {
  modelValue?: string,
  disabled?: boolean,
}

export default {
  name,
  props: {
    modelValue: String,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: RadioGroupProps, content: SetupContext) {
    const change = (name: string) => {
      content.emit('change', name);
    };
    provide('rootGroupProps', props);
    provide('rootGroupChange', change);
    return {
      prefix,
      change,
    };
  },
};
</script>

<!--
 * @Author: yuliangyang
 * @Date: 2020-05-20 19:20:11
 * @LastEditTime: 2020-05-26 15:24:14
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
    /**
     * @description radio-group 当前的值radio的值
     * @attribute modelValue
     */
    modelValue: String,
    /**
     * @description radio-group 当前的值radio组是否能被点击
     * @attribute disabled
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: RadioGroupProps, content: SetupContext) {
    /**
     * @description: radio 事件change回调
     * @param {string}
     * @return: void
     */
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

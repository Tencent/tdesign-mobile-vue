<!--
 * @Author: yuliangyang
 * @Date: 2020-05-20 19:20:11
 * @LastEditTime: 2020-07-01 16:48:31
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
import { SetupContext, provide, defineComponent } from 'vue';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-radio-group`;

export interface RadioGroupProps {
  modelValue?: string,
  disabled?: boolean,
}

export default defineComponent({
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
      content.emit('update:modelValue', name); // 改变自身的v-model值
      content.emit('change', name);
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

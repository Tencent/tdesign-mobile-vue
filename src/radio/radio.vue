<!--
 * @Author: yuliangyang
 * @Date: 2020-05-20 19:16:28
 * @LastEditTime: 2020-05-25 23:23:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tdesign-mobile-vue/src/radio/index.vue
-->
<template>
  <div
    :class="classes"
  >
    <span class="default-shape" :class="shapeClasses" @click="radioChange">
    </span>
    <span class="default-content-wrap" :class="contentClasses" @click="radioChange('content')">
      <span class="default-title" :class="titleClasses" v-if="title">
        {{ title }}
      </span>
      <div class="default-content">
        <slot></slot>
      </div>
    </span>
  </div>
</template>

<script lang="ts">
import { inject, computed } from 'vue';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-radio`;

interface RadioProps {
  name?: string,
  title?: string,
  disabled?: boolean,
  contentDisable?: boolean,
   modelValue?: string,
}
/**
 * @description: 命名类逻辑处理
 * @param {type}
 * @return: object
 */
const classesHandle = (props: RadioProps, rootGroupProps: any) => {
  const classes = computed(() => [name]);
  const shapeClasses = computed(() => [{
    [`${prefix}-is-disabled`]: (rootGroupProps.disabled || props.disabled),
    [`${prefix}-is-checked`]: (rootGroupProps.modelValue === props.name) || (props.modelValue === props.name),
  }]);
  const titleClasses = computed(() => [{ ['t-is-disabled-content']: (rootGroupProps.disabled || props.disabled) }]);
  return {
    classes,
    shapeClasses,
    titleClasses,
  };
};

export default {
  name,
  props: {
    /**
     * @description radio 当前的值
     * @attribute name
     */
    name: {
      type: String,
      default: '',
    },
    /**
     * @description radio 当前的标题
     * @attribute title
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * @description radio 当前的标题限制行数
     * @attribute titleLimitRow
     */
    titleLimitRow: {
      type: Number,
      default: 0,
    },
    /**
     * @description radio 当前radio是否能选中
     * @attribute disabled
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * @description radio 当前radio的文本部分能否被点击
     * @attribute contentDisable
     */
    contentDisable: {
      type: Boolean,
      default: false,
    },
    /**
     * @description radio 当没有用用group分组的时候派上用场
     * @attribute modelValue
     */
    modelValue: {
      type: String,
      default: '',
    },
  },
  setup(props: RadioProps, content: SetupContext) {
    const rootGroupProps:any = inject('rootGroupProps', {});
    const rootGroupChange:any = inject('rootGroupChange', () => {});
    const classes = classesHandle(props, rootGroupProps);
    /**
     * @description: 按钮处理方法
     * @param {string}
     * @return: viod
     */
    const radioChange = (area: string) => {
      if (rootGroupProps.disabled || props.disabled) {
        return;
      }
      if (area === 'content' && props.contentDisable) {
        return;
      }
      rootGroupChange(props.name); // 往group组件调用
      content.emit('change', props.name); // 自身组件广播事件
    };
    return {
      ...classes,
      radioChange,
    };
  },
};
</script>

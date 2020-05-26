<!--
 * @Author: yuliangyang
 * @Date: 2020-05-20 19:16:28
 * @LastEditTime: 2020-05-26 12:04:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tdesign-mobile-vue/src/radio/index.vue
-->
<template>
  <div
    :class="outerClasses"
  >
    <span :class="shapeClasses" @click="radioChange">
    </span>
    <span :class="`${flagName}__content-wrap`" @click="radioChange('content')">
      <span :class="titleClasses" :style="titleStyle" v-if="title">
        {{ title }}
      </span>
      <div class="default-content" :style="contentStyle">
        <slot></slot>
      </div>
    </span>
  </div>
</template>

<script lang="ts">
import { inject, computed, SetupContext } from 'vue';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-radio`;

interface RadioProps {
  name?: string,
  title?: string,
  disabled?: boolean,
  contentDisabled?: boolean,
  modelValue?: string,
  limitTitleRow?: number,
  limitContentRow?: number,
}
/**
 * @description: 命名类逻辑处理
 * @param {type}
 * @return: object
 */
const getClasses = (props: RadioProps, rootGroupProps: any) => {
  const outerClasses = computed(() => [name]);
  const shapeClasses = computed(() => [
    `${name}__default-shape`,
    {
      [`${name}__default-shape--disabled`]: (rootGroupProps?.disabled || props?.disabled),
      [`${name}__default-shape--checked`]: (rootGroupProps?.modelValue === props?.name) || (props?.modelValue === props?.name),
    }]);
  const titleClasses = computed(() => [{ [`${name}__content-title--disable`]: (rootGroupProps?.disabled || props?.disabled) }, `${name}__content-title`]);
  return {
    outerClasses,
    shapeClasses,
    titleClasses,
  };
};
/**
 * @description: 限制行数样式
 * @param {number} 行数
 * @return: 返回样式对象
 */
const getLimitRow = (row?: number):object => ({
  display: '-webkit-box',
  overflow: 'hidden',
  '-webkit-box-orient': 'vertical',
  '-webkit-line-clamp': row,
});

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
     * @description radio 当前radio是否能选中，整体是否能被点击
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
    contentDisabled: {
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
    /**
     * @description radio 限制标题的行数，超出行数打省略号
     * @attribute limitTitleRow
     */
    limitTitleRow: {
      type: Number,
      default: 0,
    },
    /**
     * @description radio 限制内容的行数，超出行数打省略号
     * @attribute limitContentRow
     */
    limitContentRow: {
      type: Number,
      default: 0,
    },
    /**
     * @description radio 选默认选中的颜色
     * @attribute checkedColor
     */
    checkedColor: {
      type: String,
      default: '#0052d9',
    },
  },
  setup(props: RadioProps, content: SetupContext) {
    const flagName = name;
    const rootGroupProps:any = inject('rootGroupProps', {});
    const rootGroupChange:any = inject('rootGroupChange', () => {});
    const limitTitleRow:number = props?.limitTitleRow || 0;
    const limitContentRow:number = props?.limitContentRow || 0;
    const titleStyle:object = limitTitleRow !== 0 ? getLimitRow(limitTitleRow) : {};
    const contentStyle:object = limitContentRow !== 0 ? getLimitRow(limitContentRow) : {};

    const classes = getClasses(props, rootGroupProps);
    /**
     * @description: 按钮处理方法
     * @param {string}
     * @return: viod
     */
    const radioChange = (area: string) => {
      if (rootGroupProps?.disabled || props?.disabled) {
        return;
      }
      if (area === 'content' && props?.contentDisabled) {
        return;
      }
      rootGroupChange(props?.name); // 往group组件调用
      content.emit('change', props?.name); // 自身组件广播事件
    };
    return {
      flagName,
      ...classes,
      radioChange,
      titleStyle,
      contentStyle,
    };
  },
};
</script>

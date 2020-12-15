<!--
 * @Author: yuliangyang
 * @Date: 2020-05-20 19:16:28
 * @LastEditTime: 2020-07-02 10:29:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tdesign-mobile-vue/src/radio/index.vue
-->
<template>
  <div
    :class="outerClasses"
  >
    <span :class="shapeClasses" @click="radioChange">
      <slot name="checkedIcon">
        <span v-if="isChecked" :class="iconClasses" :style="{backgroundColor: checkedColor}"></span>
      </slot>
    </span>
    <span :class="`${flagName}__content-wrap`" @click="radioChange('content')">
      <span v-if="title" :class="titleClasses" :style="titleStyle">
        {{ title }}
      </span>
      <div v-if="hasSlot" :class="`${flagName}__content-inner`" :style="contentStyle">
        <slot></slot>
      </div>
    </span>
  </div>
</template>

<script lang="ts">
import { ref, inject, computed, SetupContext, defineComponent } from 'vue';
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
  checkedColor?: string,
}

/**
 * @description: 判断当前radio是否选中
 * @param {props} props属性对象
* @param {rootGroup} Group注入的对象
 * @return: 返回是否选中的对象
 */
// eslint-disable-next-line max-len
const getIsCheck = (props: RadioProps, rootGroupProps: any): object => computed(() => (rootGroupProps?.modelValue === props?.name) || (props?.modelValue === props?.name));

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
      [`${prefix}-is-disabled`]: (rootGroupProps?.disabled || props?.disabled),
    }]);
  const titleClasses = computed(() => [{ [`${prefix}-is-disabled`]: (rootGroupProps?.disabled || props?.disabled) }, `${name}__content-title`]);
  const iconClasses = computed(() => [{ [`${prefix}-is-checked`]: (rootGroupProps?.modelValue === props?.name) || (props?.modelValue === props?.name) }]);
  return {
    outerClasses,
    shapeClasses,
    titleClasses,
    iconClasses,
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

export default defineComponent({
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
    const hasSlot = ref(false);
    const flagName: string = name;
    const rootGroupProps:any = inject('rootGroupProps', {});
    const rootGroupChange:any = inject('rootGroupChange', () => {});
    const limitTitleRow:number = props?.limitTitleRow || 0;
    const limitContentRow:number = props?.limitContentRow || 0;
    const titleStyle:object = limitTitleRow !== 0 ? getLimitRow(limitTitleRow) : {};
    const contentStyle:object = limitContentRow !== 0 ? getLimitRow(limitContentRow) : {};
    const classes = getClasses(props, rootGroupProps);
    const isChecked = getIsCheck(props, rootGroupProps);
    hasSlot.value = !!content.slots.default;// 判断是否有default slot
    if (!content.slots.default || !props?.title) {
      // 当没有title或者slot的时候去掉中间的margin-top
      Object.assign(contentStyle, { marginTop: 0 });
    }
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
      content.emit('update:modelValue', props?.name); // 改变自身的v-model值
      content.emit('change', props?.name); // 自身组件广播事件
    };
    return {
      flagName,
      hasSlot,
      radioChange,
      titleStyle,
      contentStyle,
      isChecked,
      ...classes,
    };
  },
});
</script>

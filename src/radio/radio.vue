<template>
  <div :class="outerClasses">
    <span :class="[`${flagName}__content-wrap`]">
      <span :class="`${flagName}__icon-wrap`" v-if="align === 'left'">
        <input type="radio" :name="name" :class="`${flagName}__original-left`" @click="radioOrgChange" :value="value"/>
        <span>
          <TNode :content="icon && icon[0]"  v-if="isChecked" :style="{color: (isChecked && !disabled)? '#0052D9' : '#DCDCDC'}" size="20px"></TNode>
          <TNode :content="icon && icon[1]" v-else :style="{color: !disabled? '#DCDCDC' : '#DCDCDC'}" size="20px"></TNode>
        </span>
      </span>
      <span :class="[`${flagName}__label-wrap`]">
        <span v-if="labelContent" :class="titleClasses">
          <span :style="titleStyle">
            <TNode :content="labelContent"></TNode>
          </span>
        </span>
        <div v-if="radioContent" :class="`${flagName}__content-inner`" :style="contentStyle" @click="radioContentChange" >
          <TNode :content="radioContent"></TNode>
        </div>
      </span>
      <span :class="`${flagName}__icon-wrap ${flagName}__icon-right-wrap`" v-if="align === 'right'">
        <input type="radio" :name="name" :class="`${flagName}__original-right`" @click="radioOrgChange" :value="value"/>
        <span>
          <TNode :content="icon && icon[0]"  v-if="isChecked" :style="{color: (isChecked && !disabled)? '#0052D9' : '#DCDCDC'}" size="20px"></TNode>
          <TNode :content="icon && icon[1]" v-else :style="{color: !disabled? '#DCDCDC' : '#DCDCDC'}" size="20px"></TNode>
        </span>
      </span>
    </span>
  </div>
</template>

<script lang="ts">
import { ref, inject, computed, SetupContext, defineComponent, getCurrentInstance } from 'vue';
import { renderContent, TNode } from '@/shared';
import config from '../config';
import RadioProps from './props';

const { prefix } = config;
const name = `${prefix}-radio`;

/**
 * @description: 判断当前radio是否选中
 * @param {props} props属性对象
 * @param {rootGroup} Group注入的对象
 * @return: 返回是否选中的对象
 */
// eslint-disable-next-line max-len
const getIsCheck = (props: any, rootGroupProps: any) => computed(() => rootGroupProps?.value === props?.value || props?.modelValue === props?.value);

/**
 * @description: 命名类逻辑处理
 * @param {type}
 * @return: object
 */
const getClasses = (props: any, rootGroupProps: any) => {
  const outerClasses = computed(() => [name]);
  const shapeClasses = computed(() => [
    `${name}__default-shape`,
    {
      [`${prefix}-is-disabled`]: rootGroupProps?.disabled || props?.disabled,
    },
  ]);
  const titleClasses = computed(() => [
    { [`${prefix}-is-disabled`]: rootGroupProps?.disabled || props?.disabled },
    { [`${name}__content-right-title`]: props?.align === 'right' },
    `${name}__content-title`,
  ]);
  const iconClasses = computed(() => [
    { [`${prefix}-is-checked`]: rootGroupProps?.value === props?.value || props?.modelValue === props?.value },
  ]);
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
const getLimitRow = (row?: number) => ({
  display: '-webkit-box',
  overflow: 'hidden',
  '-webkit-box-orient': 'vertical',
  '-webkit-line-clamp': row,
});

export default defineComponent({
  name,
  props: RadioProps,
  components: { TNode },
  emits: ['update:modelValue', 'change'],
  setup(props: any, content: SetupContext) {
    const hasSlot = ref(false);
    const internalInstance = getCurrentInstance();
    const flagName: string = name;
    const rootGroupProps: any = inject('rootGroupProps', {});
    const rootGroupChange: any = inject('rootGroupChange', () => ({}));
    const limitTitleRow: number = props?.maxLabelRow || 3;
    const limitContentRow: number = props?.maxContentRow || 5;
    const titleStyle = limitTitleRow !== 0 ? getLimitRow(limitTitleRow) : {};
    const contentStyle = limitContentRow !== 0 ? getLimitRow(limitContentRow) : {};
    const labelContent = computed(() => renderContent(internalInstance, 'default', 'label'));
    const radioContent = computed(() => renderContent(internalInstance, 'content', 'content'));
    const disabled = rootGroupProps?.disabled || props?.disabled;
    const classes = getClasses(props, rootGroupProps);
    const isChecked = getIsCheck(props, rootGroupProps);
    /**
     * @description: 处理内容点击
     * @param {string}
     * @return: viod
     */
    const radioContentChange = () => {
      if (rootGroupProps?.disabled || props?.disabled) {
        return;
      }
      if (props?.contentDisabled) {
        return;
      }
      props?.onChange && props?.onChange(true, props?.value);
      rootGroupChange(props?.value); // 往group组件调用
      content.emit('update:modelValue', props?.value); // 改变自身的v-model值
      content.emit('change', props?.value); // 自身组件广播事件
    };
    /**
     * @description: 原生radio事件处理
     * */
    const radioOrgChange = (e: Event) => {
      const target: any = e.target;
      if (rootGroupProps?.disabled || props?.disabled) {
        return;
      }
      props?.onChange && props?.onChange(true, { e });
      rootGroupChange(target?._value); // 往group组件调用
      content.emit('update:modelValue', target?._value); // 改变自身的v-model值
      content.emit('change', true, { e }); // 自身组件广播事件
    };

    return {
      radioContent,
      labelContent,
      flagName,
      hasSlot,
      radioContentChange,
      radioOrgChange,
      titleStyle,
      contentStyle,
      isChecked,
      disabled,
      ...classes,
    };
  },
});
</script>

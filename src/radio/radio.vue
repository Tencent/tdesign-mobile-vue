<template>
  <div :class="outerClasses">
    <span :class="[`${flagName}__content-wrap`]">
      <span v-if="align === 'left'" :class="`${flagName}__icon-wrap`">
        <input type="radio" :name="name" :class="`${flagName}__original-left`" :value="value" @click="radioOrgChange" />
        <!-- <span v-if="disabled && !isChecked" :class="`${flagName}__icon-disable-center`"></span> -->
        <t-node
          v-if="isChecked"
          :content="icon && icon[0]"
          :style="checkedIconStyle"
          size="20px"
        ></t-node>
        <t-node
          v-else
          :content="icon && icon[1]"
          :style="unCheckedIconStyle"
          size="20px"
        ></t-node>
      </span>
      <span :class="[`${flagName}__label-wrap`]">
        <span v-if="labelContent" :class="titleClasses">
          <t-node :content="labelContent"></t-node>
        </span>
        <div
          v-if="radioContent"
          :class="`${flagName}__content-inner`"
          @click="radioContentChange"
        >
          <t-node :content="radioContent"></t-node>
        </div>
      </span>
      <span v-if="align === 'right'" :class="`${flagName}__icon-wrap ${flagName}__icon-right-wrap`">
        <input
          type="radio"
          :name="name"
          :class="`${flagName}__original-right`"
          :value="value"
          @click="radioOrgChange"
        />
        <!-- <span v-if="disabled && !isChecked" :class="`${flagName}__icon-disable-center`"></span> -->
        <t-node
          v-if="isChecked"
          :content="icon && icon[0]"
          :style="checkedIconStyle"
          size="20px"
        ></t-node>
        <t-node
          v-else
          :content="icon && icon[1]"
          :style="unCheckedIconStyle"
          size="20px"
        ></t-node>
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
const getIsCheck = (props: any, rootGroupProps: any) =>
  computed(() => rootGroupProps?.value === props?.value || props?.modelValue === props?.value);

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

const getCheckedIconStyle = (isChecked: any, disabled: boolean) => computed(() => {
  const checkedIconStyle = {color: (isChecked && !disabled)? '#0052D9' : '#DCDCDC'};
  return checkedIconStyle
})

const getUnCheckedIconStyle = (disabled: boolean) => computed(() => {
  const unCheckStyle = { color: !disabled? '#DCDCDC' : '#DCDCDC' };
  return unCheckStyle;
});

export default defineComponent({
  name,
  components: { TNode },
  props: RadioProps,
  emits: ['update:modelValue', 'change', 'update:value'],
  setup(props: any, context: SetupContext) {
    const hasSlot = ref(false);
    const internalInstance = getCurrentInstance();
    const flagName: string = name;
    const rootGroupProps: any = inject('rootGroupProps', {});
    const rootGroupChange: any = inject('rootGroupChange', () => ({}));
    const labelContent = computed(() => renderContent(internalInstance, 'default', 'label'));
    const radioContent = computed(() => renderContent(internalInstance, 'content', 'content'));
    const disabled = rootGroupProps?.disabled || props?.disabled;
    const classes = getClasses(props, rootGroupProps);
    const isChecked = getIsCheck(props, rootGroupProps);
    const checkedIconStyle = getCheckedIconStyle(isChecked, disabled);
    const unCheckedIconStyle = getUnCheckedIconStyle(disabled);
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
      context.emit('update:value', props?.value); // 改变自身的v-model值
      context.emit('change', props?.value); // 自身组件广播事件
    };
    /**
     * @description: 原生radio事件处理
     * */
    const radioOrgChange = (e: Event) => {
      const { target } = e;
      if (rootGroupProps?.disabled || props?.disabled) {
        return;
      }
      console.log('e:', e);
      props?.onChange && props?.onChange(true, { e });
      rootGroupChange(target?.value); // 往group组件调用
      context.emit('update:modelValue', target?.value); // 改变自身的v-model值
      context.emit('change', true, { e }); // 自身组件广播事件
    };

    return {
      radioContent,
      labelContent,
      flagName,
      hasSlot,
      radioContentChange,
      radioOrgChange,
      isChecked,
      disabled,
      checkedIconStyle,
      unCheckedIconStyle,
      ...classes,
    };
  },
});
</script>

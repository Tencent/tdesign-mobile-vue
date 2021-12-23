<template>
  <div :class="`${flagName}`">
    <div :class="`${flagName}__content-wrap`">
      <!-- 按钮区域 -->
      <span v-if="align === 'left'" :class="iconClasses">
        <input
          type="checkbox"
          :name="name"
          :class="`${flagName}__original-left`"
          :value="value"
          :checked="singleChecked || isChecked"
          @click="checkBoxOrgChange"
        />
        <span v-if="disabled && !(singleChecked || isChecked)" :class="`${flagName}__icon-disable-center`"></span>
        <t-node
          v-if="(singleChecked || isChecked) && !indeterminate"
          :content="(icon && icon[0]) || defaultCheck"
          :style="checkedIconStyle"
          size="20px"
        ></t-node>
        <t-node
          v-else-if="!(singleChecked || isChecked) && !indeterminate"
          :content="(icon && icon[1]) || defaultUncheck"
          :style="unCheckedIconStyle"
          size="20px"
        ></t-node>
        <t-node v-else-if="indeterminate" :content="TMinusCircleFilledIcon" size="20px"></t-node>
      </span>
      <!-- 文本区域 -->
      <span
        :class="{ [`${flagName}__label-wrap`]: true, [`${flagName}__label-wrap-left`]: align === 'right' }"
        @click="checkBoxChange('content')"
      >
        <span v-if="labelContent" :class="titleClasses">
          <t-node :content="labelContent"></t-node>
        </span>
        <div v-if="checkboxContent" :class="`${flagName}__content-inner`">
          <t-node :content="checkboxContent"></t-node>
        </div>
      </span>
      <!-- 按钮区域 -->
      <span v-if="align === 'right'" :class="`${flagName}__icon-wrap ${flagName}__icon-right-wrap`">
        <input
          type="checkbox"
          :name="name"
          :class="`${flagName}__original-right`"
          :value="value"
          :checked="singleChecked || isChecked"
          @click="checkBoxOrgChange"
        />
        <span v-if="disabled && !(singleChecked || isChecked)" :class="`${flagName}__icon-disable-center`"></span>
        <t-node
          v-if="singleChecked || isChecked"
          :content="(icon && icon[0]) || defaultCheck"
          :style="checkedIconStyle"
          size="20px"
        ></t-node>
        <t-node v-else :content="(icon && icon[1]) || defaultUncheck" :style="unCheckedIconStyle" size="20px"></t-node>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import {
  inject,
  onMounted,
  onUnmounted,
  computed,
  SetupContext,
  defineComponent,
  getCurrentInstance,
  h,
  ref,
} from 'vue';
import { MinusCircleFilledIcon, CheckCircleFilledIcon, CircleIcon } from 'tdesign-icons-vue-next';
import config from '../config';
import CheckboxProps from './props';
import { renderContent, TNode } from '../shared';

const { prefix } = config;
const name = `${prefix}-checkbox`;

/**
 * @description: 限制行数样式
 * @param {number} 行数
 * @return: 返回样式对象
 */
// const getLimitRow = (row?: number) => ({
//   display: '-webkit-box',
//   overflow: 'hidden',
//   '-webkit-box-orient': 'vertical',
//   '-webkit-line-clamp': row,
// });

/**
 * @description: 返回 Icon 的对应的类名
 * @param {flagName} 类名前缀
 * @param {isChecked} 是否选中
 * @param {props} props属性对象
 * @param {rootGroup} Group注入的对象
 * @return: 返回IconClass对象
 */
const getIconClasses = (flagName: string, isChecked: any, content: SetupContext, props: any, rootGroup: any) =>
  computed(() => {
    const classes: Array<string> = [];
    classes.push(`${flagName}__icon-left`);
    if (isChecked.value) {
      classes.push(`${prefix}-is-checked`);
    }
    if (rootGroup?.disabled || props?.disabled) {
      classes.push(`${prefix}-is-disabled`);
    }
    return classes;
  });
/**
 * @description: 返回标题对应的类名
 * @param {flagName} 类名前缀
 * @param {props} props属性对象
 * @param {rootGroup} Group注入的对象
 * @return: 返回TitleClass对象
 */
const getTitleClasses = (flagName: string, props: any, rootGroup: any) =>
  computed(() => {
    const classes: Array<string> = [];
    classes.push(`${flagName}__content-title`);
    if (rootGroup?.disabled || props.disabled) {
      classes.push(`${prefix}-is-disabled`);
    }
    return classes;
  });
/**
 * @description: 判断当前checkbox是否选中
 * @param {props} props属性对象
 * @param {rootGroup} Group注入的对象
 * @return: 返回是否选中的对象
 */
const getIsCheck = (props: any, rootGroup: any) =>
  computed(() => rootGroup && rootGroup?.checkedValues?.value?.indexOf(props.value) !== -1);

const getCheckedIconStyle = (isChecked: any, singleChecked: boolean, disabled: boolean) =>
  computed(() => {
    const checkStyle = { color: (singleChecked || isChecked) && !disabled ? '#0052D9' : '#DCDCDC' };
    return checkStyle;
  });

const getUnCheckedIconStyle = (disabled: boolean) =>
  computed(() => {
    const unCheckStyle = { color: !disabled ? '#DCDCDC' : '#DCDCDC' };
    return unCheckStyle;
  });

/**
 * @description: 设置checkbox点击回调
 * @param {isChecked} 是否选中
 * @param {props} props属性对象
 * @param {rootGroup} Group注入的对象
 * @return: 返回点击函数
 */
const setCheckBoxChange = (props: any, rootGroup: any, content: SetupContext, isChecked: any) => (area: string) => {
  if (props.disabled) {
    return;
  }
  if (area === 'content' && props?.contentDisabled) {
    return;
  }
  if (isChecked.value) {
    content.emit('update:value', '');
    content.emit('change', '');
    if (rootGroup) {
      rootGroup?.uncheck(props.value);
    }
    if (props.checkAll) {
      rootGroup.toggleAll(false);
    }
  } else {
    content.emit('update:value', props.value);
    content.emit('change', props.value);
    if (rootGroup) {
      rootGroup?.check(props.value);
    }
    if (props.checkAll) {
      rootGroup.toggleAll(true);
    }
  }
};
export default defineComponent({
  name,
  components: { TNode },
  props: CheckboxProps,
  emits: ['update:value', 'change'],
  setup(props: any, context) {
    const defaultCheck = h(CheckCircleFilledIcon);
    const defaultUncheck = h(CircleIcon);
    const internalInstance = getCurrentInstance();
    const flagName = name;
    const rootGroup: any = inject('rootGroup', undefined);
    const labelContent = computed(() => renderContent(internalInstance, 'default', 'label'));
    const checkboxContent = computed(() => renderContent(internalInstance, 'content', 'content'));
    const TMinusCircleFilledIcon = h(MinusCircleFilledIcon);
    const singleChecked = props.checked || ref(false);
    onMounted(() => {
      rootGroup?.register(props);
    });

    onUnmounted(() => {
      rootGroup?.unregister(props);
    });
    const isChecked = getIsCheck(props, rootGroup);
    const iconClasses = getIconClasses(flagName, isChecked, context, props, rootGroup);
    const titleClasses = getTitleClasses(flagName, props, rootGroup);
    const checkBoxChange = setCheckBoxChange(props, rootGroup, context, isChecked);
    const checkedIconStyle = getCheckedIconStyle(isChecked, singleChecked, rootGroup?.disabled || props?.disabled);
    const unCheckedIconStyle = getUnCheckedIconStyle(rootGroup?.disabled || props?.disabled);

    const checkBoxOrgChange = (e: Event) => {
      const { target } = e;
      if (rootGroup?.disabled || props?.disabled) {
        return;
      }
      if (singleChecked.value || (rootGroup && isChecked.value)) {
        context.emit('update:value', '');
        context.emit('change', '');
        if (rootGroup) {
          rootGroup?.uncheck(target?.value, { e });
        } else {
          singleChecked.value = false;
        }
        if (props.checkAll) {
          rootGroup.toggleAll(false);
        }
        props?.onChange && props?.onChange(false, { e });
      } else {
        context.emit('update:value', target?.value, { e });
        context.emit('change', target?.value, { e });
        props?.onChange && props?.onChange(true, { e });
        if (rootGroup) {
          rootGroup?.check(target?.value, { e });
        } else {
          singleChecked.value = true;
        }
        if (props.checkAll) {
          rootGroup.toggleAll(true);
        }
      }
    };

    return {
      checkboxContent,
      labelContent,
      checkBoxOrgChange,
      isChecked,
      flagName,
      checkBoxChange,
      iconClasses,
      titleClasses,
      TMinusCircleFilledIcon,
      defaultCheck,
      defaultUncheck,
      singleChecked,
      checkedIconStyle,
      unCheckedIconStyle,
    };
  },
});
</script>

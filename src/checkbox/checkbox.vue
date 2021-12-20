<template>
  <div :class="`${flagName}`">
    <div :class="`${flagName}__content-wrap`">
      <!-- 按钮区域 -->
      <span :class="iconClasses" :style="iconStyle" v-if="align === 'left'">
        <input type="checkbox" :name="name" :class="`${flagName}__original-left`" @click="checkBoxOrgChange" :value="value" :checked="(singleChecked || isChecked)"/>
        <span v-if="disabled && !(singleChecked || isChecked)" :class="`${flagName}__icon-disable-center`"></span>
        <TNode :content="icon && icon[0] || defaultCheck"  v-if="(singleChecked || isChecked) && !indeterminate" :style="{color: ((singleChecked || isChecked) && !disabled)? '#0052D9' : '#DCDCDC'}" size="20px"></TNode>
        <TNode :content="icon && icon[1] || defaultUncheck" v-else-if="!(singleChecked || isChecked) && !indeterminate" :style="{color: !disabled? '#DCDCDC' : '#DCDCDC'}" size="20px"></TNode>
        <TNode :content="TMinusCircleFilledIcon" v-else-if="indeterminate" size="20px"></TNode>
      </span>
      <!-- 文本区域 -->
      <span :class="[`${flagName}__label-wrap`, align === 'right' ? `${flagName}__label-wrap-left`: '']" @click="checkBoxChange('content')">
        <span v-if="labelContent" :class="titleClasses">
          <span :style="titleStyle">
            <TNode :content="labelContent"></TNode>
          </span>
        </span>
        <div v-if="checkboxContent" :class="`${flagName}__content-inner`" :style="contentStyle">
          <TNode :content="checkboxContent"></TNode>
        </div>
      </span>
      <span :class="`${flagName}__icon-wrap ${flagName}__icon-right-wrap`" v-if="align === 'right'">
        <input type="checkbox" :name="name" :class="`${flagName}__original-right`" @click="checkBoxOrgChange" :value="value" :checked="(singleChecked || isChecked)"/>
        <span v-if="disabled && !(singleChecked || isChecked)" :class="`${flagName}__icon-disable-center`"></span>
        <TNode :content="icon && icon[0] || defaultCheck"  v-if="(singleChecked || isChecked)" :style="{color: ((singleChecked || isChecked) && !disabled)? '#0052D9' : '#DCDCDC'}" size="20px"></TNode>
        <TNode :content="icon && icon[1] || defaultUncheck" v-else :style="{color: !disabled? '#DCDCDC' : '#DCDCDC'}" size="20px"></TNode>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { inject, onMounted, onUnmounted, computed, SetupContext, defineComponent, getCurrentInstance, h, ref } from 'vue';
import config from '../config';
import CheckboxProps from './props';
import { renderContent, TNode } from '@/shared';
import { MinusCircleFilledIcon, CheckCircleFilledIcon, CircleIcon } from 'tdesign-icons-vue-next';


const { prefix } = config;
const name = `${prefix}-checkbox`;

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

/**
 * @description: 返回 Icon 的对应的类名
 * @param {flagName} 类名前缀
 * @param {isChecked} 是否选中
 * @param {props} props属性对象
 * @param {rootGroup} Group注入的对象
 * @return: 返回IconClass对象
 */
const getIconClasses = (
  flagName: string,
  isChecked: any,
  content: SetupContext,
  props: any,
  rootGroup: any,
) =>
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
 * @description: 返回 Icon对应的样式
 * @param {isChecked} 是否选中
 * @param {props} props属性对象
 * @return: 返回Icon对应的养生
 */
const getIconStyle = (isChecked: any, props: any) =>
  computed(() => {
    const resStyle: {
      color?: string;
    } = {
      color: '#0052D9', // TODO: 目前是这样的，默认是#0052D9这个颜色，支持自定义，没有跟着主题色变，后面会在common基于less生成的js，是token内容的，引用这个来解决
    };
    if (isChecked.value) {
      resStyle.color = props.checkedColor;
    }
    return resStyle;
  });
/**
 * @description: 判断当前checkbox是否选中
 * @param {props} props属性对象
 * @param {rootGroup} Group注入的对象
 * @return: 返回是否选中的对象
 */
const getIsCheck = (props: any, rootGroup: any) =>
  computed(
    () =>(rootGroup && rootGroup?.checkedValues?.value?.indexOf(props.value) !== -1),
  );

/**
 * @description: 设置checkbox点击回调
 * @param {isChecked} 是否选中
 * @param {props} props属性对象
 * @param {rootGroup} Group注入的对象
 * @return: 返回点击函数
 */
const setCheckBoxChange =
  (props: any, rootGroup: any, content: SetupContext, isChecked: any) => (area: string) => {
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
  setup(props: any, content) {
    const defaultCheck = h(CheckCircleFilledIcon);
    const defaultUncheck = h(CircleIcon);
    const internalInstance = getCurrentInstance();
    const flagName = name;
    const rootGroup: any = inject('rootGroup', undefined);
    const maxLabelRow = Number(props?.maxLabelRow) || 0;
    const maxContentRow = Number(props?.maxContentRow) || 0;
    const labelContent = computed(() => renderContent(internalInstance, 'default', 'label'));
    const checkboxContent = computed(() => renderContent(internalInstance, 'content', 'content'));
    const titleStyle = maxLabelRow !== 0 ? getLimitRow(maxLabelRow) : {};
    const contentStyle = maxContentRow !== 0 ? getLimitRow(maxContentRow) : {};
    const TMinusCircleFilledIcon = h(MinusCircleFilledIcon);
    const singleChecked = ref(false);
    onMounted(() => {
      rootGroup?.register(props);
    });

    onUnmounted(() => {
      rootGroup?.unregister(props);
    });
    const isChecked = getIsCheck(props, rootGroup);
    const iconClasses = getIconClasses(flagName, isChecked, content, props, rootGroup);
    const titleClasses = getTitleClasses(flagName, props, rootGroup);
    const iconStyle = getIconStyle(isChecked, props);
    const checkBoxChange = setCheckBoxChange(props, rootGroup, content, isChecked);

    const checkBoxOrgChange = (e: Event) => {
      const target: any = e.target;
      if (rootGroup?.disabled || props?.disabled) {
        return;
      }
      if (singleChecked.value || (rootGroup && isChecked.value)) {
        content.emit('update:value', '');
        content.emit('change', '');
        if (rootGroup) {
          rootGroup?.uncheck(target?._value, { e });
        } else {
          singleChecked.value = false;
        }
        if (props.checkAll) {
          rootGroup.toggleAll(false);
        }
        props?.onChange && props?.onChange(false, { e });
      } else {
        content.emit('update:value', target?._value, { e });
        content.emit('change', target?._value, { e });
        props?.onChange && props?.onChange(true, { e });
        if (rootGroup) {
          rootGroup?.check(target?._value, { e });
        } else {
          singleChecked.value = true;
        }
        if (props.checkAll) {
          rootGroup.toggleAll(true);
        }
      }
    }

    return {
      checkboxContent,
      labelContent,
      checkBoxOrgChange,
      isChecked,
      flagName,
      checkBoxChange,
      iconClasses,
      titleClasses,
      titleStyle,
      contentStyle,
      iconStyle,
      TMinusCircleFilledIcon,
      defaultCheck,
      defaultUncheck,
      singleChecked
    };
  },
});
</script>

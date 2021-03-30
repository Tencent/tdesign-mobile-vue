<template>
  <div :class="`${flagName}`">
    <span :class="iconClasses" :style="iconStyle" @click="checkBoxChange">
      <slot name="icon" :checked="isChecked">
        <TIconCheckCircleFilled v-if="isChecked" :class="circleFilled"/>
      </slot>
    </span>
    <span :class="`${flagName}__content-wrap`" @click="checkBoxChange('content')">
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
import TIconCheckCircleFilled from '../icon/check-circle-filled.vue';
import { ref, inject, onMounted, onUnmounted, computed, SetupContext, defineComponent } from 'vue';
import config from '../config';

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
  props: CheckBoxProps,
  rootGroup: any,
) => computed(() => {
  const classes: Array<string> = [];
  classes.push(`${flagName}__icon-left`);
  if (!isChecked.value) {
    if (!content.slots.icon) {
      classes.push(`${flagName}__icon-left--default`);
    }
  } else {
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
const getTitleClasses = (flagName: string, props: CheckBoxProps, rootGroup: any) => computed(() => {
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
const getIconStyle = (isChecked: any, props: CheckBoxProps) => computed(() => {
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
const getIsCheck = (props: CheckBoxProps, rootGroup: any) => computed(() => props?.modelValue === props?.name || (rootGroup && rootGroup?.checkedValues?.value?.indexOf(props.name) !== -1));

/**
 * @description: 设置checkbox点击回调
 * @param {isChecked} 是否选中
 * @param {props} props属性对象
 * @param {rootGroup} Group注入的对象
 * @return: 返回点击函数
 */
const setCheckBoxChange = (props: CheckBoxProps, rootGroup: any, content: SetupContext, isChecked: any) => (area: string) => {
  if (props.disabled) {
    return;
  }
  if (area === 'content' && props?.contentDisabled) {
    return;
  }
  if (isChecked.value) {
    content.emit('update:modelValue', '');
    content.emit('change', '');
    if (rootGroup) {
      rootGroup?.uncheck(props.name);
    }
  } else {
    content.emit('update:modelValue', props.name);
    content.emit('change', props.name);
    if (rootGroup) {
      rootGroup?.check(props.name);
    }
  }
};

interface CheckBoxProps {
  name?: string;
  title?: string;
  disabled?: boolean;
  contentDisabled?: boolean;
  modelValue?: string;
  limitTitleRow?: number | string;
  limitContentRow?: number | string;
  checkedColor?: string;
}
export default defineComponent({
  name,
  components: {
    TIconCheckCircleFilled,
  },
  props: {
    /**
     * @description checkbox 当前的值
     * @attribute name
     */
    name: {
      type: String,
      default: '',
    },
    /**
     * @description checkbox 当前的标题
     * @attribute title
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * @description checkbox 当前checkbox是否能选中，整体是否能被点击
     * @attribute disabled
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * @description checkbox 当前checkbox的文本部分能否被点击
     * @attribute contentDisable
     */
    contentDisabled: {
      type: Boolean,
      default: false,
    },
    /**
     * @description checkbox 当没有用用group分组的时候派上用场
     * @attribute modelValue
     */
    modelValue: {
      type: String,
      default: '',
    },
    /**
     * @description checkbox 限制标题的行数，超出行数打省略号
     * @attribute limitTitleRow
     */
    limitTitleRow: {
      type: [Number, String],
      default: 0,
    },
    /**
     * @description checkbox 限制内容的行数，超出行数打省略号
     * @attribute limitContentRow
     */
    limitContentRow: {
      type: [Number, String],
      default: 0,
    },
    /**
     * @description checkbox 选中的颜色
     * @attribute checkedColor
     */
    checkedColor: {
      type: String,
      default: '#0052D9',
    },
  },
  setup(props, content) {
    const flagName = name;
    const hasSlot = ref(false);
    const rootGroup: any = inject('rootGroup', undefined);
    const limitTitleRow = Number(props?.limitTitleRow) || 0;
    const limitContentRow = Number(props?.limitContentRow) || 0;
    const titleStyle = limitTitleRow !== 0 ? getLimitRow(limitTitleRow) : {};
    const contentStyle = limitContentRow !== 0 ? getLimitRow(limitContentRow) : {};
    const circleFilled = `${name}__icon`;

    hasSlot.value = !!content.slots.default; // 判断是否有default slot
    if (!content.slots.default || !props?.title) {
      // 当没有title或者slot的时候去掉中间的margin-top
      Object.assign(contentStyle, { marginTop: 0 });
    }
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

    return {
      isChecked,
      hasSlot,
      flagName,
      checkBoxChange,
      iconClasses,
      titleClasses,
      titleStyle,
      contentStyle,
      iconStyle,
      circleFilled,
    };
  },
});
</script>

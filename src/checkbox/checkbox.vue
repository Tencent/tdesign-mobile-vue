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
        <t-node
          v-if="(singleChecked || isChecked) && !indeterminate"
          :content="(icon && icon[0]) || defaultCheck"
          :class="checkedIconClass"
          size="24px"
        ></t-node>
        <t-node
          v-else-if="!(singleChecked || isChecked) && !indeterminate"
          :content="(icon && icon[1]) || defaultUncheck"
          :class="unCheckedIconClass"
          size="24px"
        ></t-node>
        <t-node v-else-if="indeterminate" :content="TMinusCircleFilledIcon" size="24px"></t-node>
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
        <!-- <span v-if="disabled && !(singleChecked || isChecked)" :class="`${flagName}__icon-disable-center`"></span> -->
        <t-node
          v-if="singleChecked || isChecked"
          :content="(icon && icon[0]) || defaultCheck"
          :class="checkedIconClass"
          size="24px"
        ></t-node>
        <t-node v-else :content="(icon && icon[1]) || defaultUncheck" :class="unCheckedIconClass" size="24px"></t-node>
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
import { emitEvent, renderContent, renderTNode, TNode, useToggle, useDefault } from '../shared';
import { CheckboxOption, TdCheckboxProps } from './type';

const { prefix } = config;
const name = `${prefix}-checkbox`;

/**
 * @description: 判断当前checkbox是否选中
 * @param {props} props属性对象
 * @param {rootGroup} Group注入的对象
 * @return: 返回是否选中的对象
 */
const getIsCheck = (innerValue: any, rootGroup: any) =>
  computed(() => rootGroup && rootGroup?.checkedValues?.value?.indexOf(innerValue.value) !== -1);

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
  emits: ['update:value', 'update:modelValue', 'change'],
  setup(props: any, context: SetupContext) {
    const [innerValue] = useDefault<CheckboxOption, TdCheckboxProps>(props, context.emit, 'value', 'change');
    const defaultCheck = h(CheckCircleFilledIcon);
    const defaultUncheck = h(CircleIcon);
    const internalInstance = getCurrentInstance();
    const flagName = name;
    const rootGroup: any = inject('rootGroup', undefined);
    const labelContent = computed(() => renderContent(internalInstance, 'default', 'label'));
    const checkboxContent = computed(() => renderTNode(internalInstance, 'content'));
    const TMinusCircleFilledIcon = h(MinusCircleFilledIcon);
    const singleChecked = props.checked || ref(false);
    const checkboxCheckVal = [false, true];
    onMounted(() => {
      rootGroup?.register(props);
    });

    onUnmounted(() => {
      rootGroup?.unregister(props);
    });

    const isChecked = getIsCheck(innerValue, rootGroup);

    const iconClasses = computed(() => [
      `${flagName}__icon-left`,
      {
        [`${prefix}-is-checked`]: isChecked.value,
        [`${prefix}-is-disabled`]: rootGroup?.disabled || props?.disabled,
      },
    ]);

    const titleClasses = computed(() => [
      `${flagName}__content-title`,
      {
        [`${prefix}-is-disabled`]: rootGroup?.disabled || props.disabled,
      },
    ]);

    const checkedIconClass = computed(() => [
      {
        [`${flagName}__checked-icon`]: (singleChecked || isChecked) && !(rootGroup?.disabled || props?.disabled),
        [`${flagName}__checked__disable-icon`]:
          !(singleChecked || isChecked) && !(rootGroup?.disabled || props?.disabled),
      },
    ]);

    const unCheckedIconClass = `${flagName}__uncheck-icon`;

    const checkBoxChange = setCheckBoxChange(props, rootGroup, context, isChecked);

    const { state, toggle } = useToggle(checkboxCheckVal, isChecked.value);

    const isALlSelected = computed(() => rootGroup?.isALlSelected);

    const checkBoxOrgChange = (e: Event) => {
      const { target }: { target: any } = e;
      if (rootGroup?.disabled || props?.disabled) {
        return;
      }
      if (singleChecked.value || (rootGroup && isChecked.value)) {
        toggle();
        emitEvent(props, context, 'update:value', '');
        if (rootGroup) {
          rootGroup?.uncheck(target?.value, { e });
        } else {
          singleChecked.value = false;
        }
        if (props.checkAll) {
          rootGroup.toggleAll(false);
        }
        props?.onChange && props?.onChange(state.value, { e });
      } else {
        toggle();
        emitEvent(props, context, 'update:value', target?.value, { e });
        props?.onChange && props?.onChange(state.value, { e });
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
      isALlSelected,
      unCheckedIconClass,
      checkedIconClass,
    };
  },
});
</script>

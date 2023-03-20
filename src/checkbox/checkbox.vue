<template>
  <div :class="componentClass">
    <div :class="`${flagName}__content-wrap`">
      <span v-if="align === 'left'" :class="`${flagName}__icon-left`">
        <input
          type="checkbox"
          :name="name"
          :class="`${flagName}__original-left`"
          :value="value"
          :disabled="isDisabled"
          :readonly="readonly"
          :checked="isChecked"
          :indeterminate="indeterminate"
          @click="handleChange"
        />
        <t-node v-if="!indeterminate" :content="checkIcons[isChecked ? 0 : 1]" />
        <minus-circle-filled-icon v-else />
      </span>
      <span
        v-if="labelContent || checkboxContent"
        :class="{ [`${flagName}__label`]: true, [`${flagName}__label-left`]: align === 'right' }"
        @click="(e) => handleChange(e, 'content')"
      >
        <span v-if="labelContent" :style="labelStyle">
          <t-node :content="labelContent" />
        </span>
        <span v-if="checkboxContent" :class="`${flagName}__description`" :style="contentStyle">
          <t-node :content="checkboxContent" />
        </span>
      </span>

      <span v-if="align === 'right'" :class="`${flagName}__icon-right`">
        <input
          type="checkbox"
          :name="name"
          :class="`${flagName}__original-right`"
          :value="value"
          :disabled="isDisabled"
          :readonly="readonly"
          :checked="isChecked"
          :indeterminate="indeterminate"
          @click="handleChange"
        />
        <t-node v-if="!indeterminate" :content="checkIcons[isChecked ? 0 : 1]" />
        <minus-circle-filled-icon v-else />
      </span>
    </div>
    <!--下边框 -->
    <div v-if="!borderless" :class="`${flagName}__border ${flagName}__border--${align}`"></div>
  </div>
</template>

<script lang="ts">
import { inject, computed, defineComponent, getCurrentInstance, h, toRefs, CSSProperties } from 'vue';
import { MinusCircleFilledIcon, CheckCircleFilledIcon, CircleIcon } from 'tdesign-icons-vue-next';
import config from '../config';
import CheckboxProps from './props';
import { renderContent, renderTNode, TNode, useDefault, useVModel } from '../shared';
import { TdCheckboxProps } from './type';
import ClASSNAMES from '../shared/constants';

const { prefix } = config;
const name = `${prefix}-checkbox`;

export default defineComponent({
  name,
  components: { TNode, MinusCircleFilledIcon },
  props: {
    ...CheckboxProps,
    borderless: {
      type: Boolean,
      value: false,
    },
  },
  emits: ['update:checked', 'update:modelValue', 'change'],
  setup(props, context) {
    const flagName = name;
    const checkIcons = props.icon || [h(CheckCircleFilledIcon), h(CircleIcon)];
    const [innerChecked, setInnerChecked] = useDefault<boolean, TdCheckboxProps>(
      props,
      context.emit,
      'checked',
      'change',
    );

    const internalInstance = getCurrentInstance();
    const checkboxGroup: any = inject('checkboxGroup', undefined);
    const labelContent = computed(() => renderContent(internalInstance, 'label', 'default'));
    const checkboxContent = computed(() => renderTNode(internalInstance, 'content'));
    const indeterminate = computed<boolean>(() => {
      if (props.checkAll && checkboxGroup != null) return checkboxGroup.checkAllStatus.value === 'indeterminate';
      return props.indeterminate;
    });
    const isChecked = computed(() => {
      if (props.checkAll) return checkboxGroup?.checkAllStatus.value === 'checked';
      if (checkboxGroup != null && props.value != null) {
        return !!checkboxGroup.checkedSet.value?.has(props.value);
      }

      return innerChecked.value;
    });

    const isDisabled = computed(() => {
      if (checkboxGroup?.max.value)
        return checkboxGroup.max.value <= checkboxGroup.innerValue.value.length && !isChecked.value;
      if (props.disabled != null) return props.disabled;
      return !!checkboxGroup?.disabled.value;
    });

    const componentClass = computed(() => [
      `${flagName}`,
      {
        [ClASSNAMES.STATUS.checked]: isChecked.value,
        [ClASSNAMES.STATUS.disabled]: isDisabled.value,
        [ClASSNAMES.STATUS.indeterminate]: indeterminate.value,
      },
    ]);

    const getLimitRowStyle = (row: number): CSSProperties => ({
      display: '-webkit-box',
      overflow: 'hidden',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: row,
    });

    const labelStyle = computed(() => ({
      color: isDisabled.value ? '#dcdcdc' : 'inherit',
      ...getLimitRowStyle(props.maxLabelRow),
    }));

    const contentStyle = computed(() => ({
      ...getLimitRowStyle(props.maxContentRow),
    }));

    const handleChange = (e: Event, source?: string) => {
      if (isDisabled.value) return;
      if (source === 'content' && props.contentDisabled) return;

      const value = !isChecked.value;
      setInnerChecked(value, { e });
      e.stopPropagation();
      if (checkboxGroup && checkboxGroup?.onCheckedChange) {
        checkboxGroup.onCheckedChange({ checked: value, checkAll: props.checkAll, e, option: props });
      }
    };

    return {
      ...toRefs(props),
      isChecked,
      checkIcons,
      labelContent,
      labelStyle,
      checkboxContent,
      contentStyle,
      isDisabled,
      flagName,
      componentClass,
      indeterminate,
      handleChange,
    };
  },
});
</script>

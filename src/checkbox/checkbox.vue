<template>
  <div
    :class="{
      [`${name}`]: true,
      [`${name}--${placement}`]: true,
      [`${name}--checked`]: isChecked,
      [`${name}--block`]: block,
    }"
    @click="handleChange"
  >
    <div
      :class="{
        [`${name}__icon`]: true,
        [`${name}__icon--${placement}`]: true,
        [`${name}__icon--checked`]: isChecked,
        [`${name}__icon--disabled`]: isDisabled,
      }"
    >
      <div v-if="isIconArray" :class="`${name}__icon`">
        <t-node :content="checkIcons[isChecked ? 0 : 1]" :class="`${name}__icon-wrapper`" />
      </div>
      <template v-else>
        <t-node v-if="isChecked" :content="checkedIcon" :class="`${name}__icon-wrapper`" />
        <template v-else>
          <div
            v-if="icon === 'circle' || icon === 'rectangle'"
            :class="{ [`${name}__icon-${icon}`]: true, [`${name}__icon-${icon}--disabled`]: isDisabled }"
          />
          <div v-if="icon === 'line'" class="placeholder" />
        </template>
      </template>
    </div>
    <div :class="`${name}__content`" @click.stop="(e) => handleChange(e, 'text')">
      <div
        :class="{
          [`${name}__title`]: true,
          [`${name}__title--checked`]: isChecked,
          [`${name}__title--disabled`]: isDisabled,
        }"
        :style="{ '-webkit-line-clamp': maxLabelRow }"
      >
        <t-node :content="labelContent" />
      </div>
      <div
        :class="{
          [`${name}__description`]: true,
          [`${name}__description--disabled`]: isDisabled,
        }"
        :style="{ '-webkit-line-clamp': maxContentRow }"
      >
        <t-node :content="checkboxContent" />
      </div>
    </div>
    <div v-if="!borderless" :class="`${name}__border ${name}__border--${placement}`" />
  </div>
</template>

<script lang="ts">
import { defineComponent, h, toRefs, computed, inject, getCurrentInstance } from 'vue';
import {
  CheckCircleFilledIcon,
  CircleIcon,
  MinusCircleFilledIcon,
  MinusRectangleFilledIcon,
  CheckRectangleFilledIcon,
  CheckIcon,
} from 'tdesign-icons-vue-next';
import config from '@/config';
import CheckboxProps from './props';
import { renderContent, renderTNode, TNode, useDefault } from '@/shared';
import { TdCheckboxProps } from '@/checkbox/type';
import MinusLineFilledIcon from './assets/minus-line-filled-icon.svg';
import CheckLineFilledIcon from './assets/check-line-filled-icon.svg';

const { prefix } = config;
const name = `${prefix}-checkbox`;

export default defineComponent({
  name,
  components: { TNode },
  props: {
    ...CheckboxProps,
    borderless: {
      type: Boolean,
      value: false,
    },
  },
  emits: ['update:checked', 'update:modelValue', 'change'],
  setup(props, context) {
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

    const isIconArray = Array.isArray(props.icon);
    const defaultCheckIcons = [h(CheckCircleFilledIcon), h(CircleIcon)];
    const checkIcons = computed(() => {
      if (isIconArray && props.icon.length > 1) {
        return props.icon.map((icon) =>
          typeof icon === 'string' ? h('img', { class: `${name}__icon-image`, src: icon }) : icon,
        );
      }
      return defaultCheckIcons;
    });

    const checkedIcon = computed(() => {
      if (props.icon === 'circle') return indeterminate.value ? h(MinusCircleFilledIcon) : h(CheckCircleFilledIcon);
      if (props.icon === 'rectangle')
        return indeterminate.value ? h(MinusRectangleFilledIcon) : h(CheckRectangleFilledIcon);
      if (props.icon === 'line')
        return indeterminate.value ? h('img', { src: MinusLineFilledIcon }) : h('img', { src: CheckLineFilledIcon });
      return null;
    });

    const isChecked = computed(() => {
      if (props.checkAll) {
        const checkAllStatus = checkboxGroup?.checkAllStatus.value;
        return checkAllStatus === 'checked' || checkAllStatus === 'indeterminate';
      }
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

    const handleChange = (e: Event, source?: string) => {
      if (isDisabled.value) return;
      if (source === 'text' && props.contentDisabled) return;

      const value = !isChecked.value;
      setInnerChecked(value, { e });
      e.stopPropagation();
      if (checkboxGroup && checkboxGroup?.onCheckedChange) {
        checkboxGroup.onCheckedChange({ checked: value, checkAll: props.checkAll, e, option: props });
      }
    };
    return {
      ...toRefs(props),
      name,
      checkedIcon,
      isIconArray,
      checkIcons,
      labelContent,
      checkboxContent,
      isChecked,
      isDisabled,
      indeterminate,
      handleChange,
    };
  },
});
</script>

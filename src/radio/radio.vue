<template>
  <div :class="radioClasses" @click="radioOrgChange">
    <input type="radio" :class="`${name}__original`" v-bind="inputProps" />
    <div :class="iconClass">
      <check-circle-filled-icon v-if="checked && icon === 'circle'" :class="`${name}__icon-wrap`" />
      <check-icon v-if="checked && icon === 'line'" :class="`${name}__icon-wrap`" />
      <loading-icon v-if="checked && icon === 'loading'" :class="`${name}__icon-wrap`" />
      <div
        v-if="checked && icon == 'dot'"
        :class="[`${name}__icon-${icon}`, { [`${name}__icon-${icon}--disabled`]: disabled }]"
      />
      <div
        v-if="!checked && (icon == 'circle' || icon == 'dot')"
        :class="[`${name}__icon-circle`, { [`${name}__icon-circle--disabled`]: disabled }]"
      />
      <div v-if="!checked && icon == 'line'" class="placeholder" />
      <div v-if="!checked && icon == 'loading'" class="placeholder" />

      <t-node :content="iconContent" />
    </div>

    <div :class="`${name}__content`" @click.stop="radioContentChange">
      <span v-if="labelContent" :class="titleClasses" :style="`-webkit-line-clamp: ${maxLabelRow}`">
        <t-node :content="labelContent" />
      </span>
      <div
        v-if="radioContent"
        :class="[`${name}__description`, { [`${name}__description`]: disabled }]"
        :style="`-webkit-line-clamp: ${maxContentRow}`"
      >
        <t-node :content="radioContent" />
      </div>
    </div>

    <div v-if="!finalBorderless" :class="`${name}__border ${name}__border--${finalPlacement}`"></div>
  </div>
</template>

<script lang="ts">
import { inject, computed, defineComponent, getCurrentInstance, Ref, toRefs } from 'vue';
import { CheckIcon, LoadingIcon, CheckCircleFilledIcon } from 'tdesign-icons-vue-next';

import { renderContent, renderTNode, TNode, NOOP, useVModel } from '../shared';
import config from '../config';
import RadioProps from './props';
import { RadioValue, TdRadioGroupProps } from './type';
import { useFormDisabled } from '../form/hooks';

const { prefix } = config;
const name = `${prefix}-radio`;

export default defineComponent({
  name,
  components: { TNode, CheckIcon, LoadingIcon, CheckCircleFilledIcon },
  props: RadioProps,
  emits: ['update:checked', 'update:modelValue', 'change'],
  setup(props) {
    const { checked, modelValue, block } = toRefs(props);
    const [innerChecked, setInnerChecked] = useVModel(
      checked,
      modelValue,
      props.defaultChecked,
      props.onChange,
      'checked',
    );

    const rootGroupProps = inject('rootGroupProps', {}) as TdRadioGroupProps;
    const rootGroupValue = inject('rootGroupValue', {}) as Ref;
    const rootGroupChange = inject('rootGroupChange', NOOP) as (val: RadioValue, e: Event) => void;

    const formDisabled = useFormDisabled();

    const disabled = computed(() => {
      if (formDisabled.value == null && 'disabled' in rootGroupProps) return rootGroupProps.disabled;
      return formDisabled.value;
    });
    const radioChecked = computed(() => innerChecked.value || props.value === rootGroupValue?.value);
    const finalBorderless = computed(() => {
      if (props.borderless == null && 'borderless' in rootGroupProps) return rootGroupProps.borderless;
      return props.borderless;
    });
    const finalPlacement = computed(() => {
      if (props.placement == null && 'placement' in rootGroupProps) return rootGroupProps.placement;
      return props.placement || 'left';
    });

    // input props attribute
    const inputProps = computed(() => ({
      name: rootGroupProps.name || props.name,
      checked: radioChecked.value,
      disabled: disabled.value,
      value: props.value,
    }));

    const internalInstance = getCurrentInstance();
    const labelContent = computed(() => renderContent(internalInstance, 'default', 'label'));
    const radioContent = computed(() => renderTNode(internalInstance, 'content'));
    const iconContent = computed(() => {
      if (props.icon?.length === 2) {
        const iconIndex = radioChecked.value ? 0 : 1;
        return props.icon[iconIndex];
      }
      return null;
    });

    const radioClasses = computed(() => [
      `${name}`,
      `${name}--${finalPlacement.value}`,
      {
        [`${name}--block`]: block.value,
      },
    ]);

    const titleClasses = computed(() => [
      `${name}__title`,
      {
        [`${name}__title--disabled`]: disabled.value,
      },
    ]);

    const iconClass = computed(() => [
      `${name}__icon`,
      `${name}__icon--${finalPlacement.value}`,
      {
        [`${name}__icon--checked`]: radioChecked.value,
        [`${name}__icon--disabled`]: disabled.value,
      },
    ]);

    const radioContentChange = (e: Event) => {
      if (props.contentDisabled) {
        return;
      }
      radioOrgChange(e);
    };

    const radioOrgChange = (e: Event) => {
      if (disabled.value) {
        return;
      }
      if (rootGroupChange !== NOOP && props.value !== undefined) {
        rootGroupChange(props.value, e);
      } else {
        if (!props.allowUncheck && radioChecked.value) return;
        setInnerChecked(!radioChecked.value, { e });
      }
    };

    return {
      name,
      iconClass,
      checked: radioChecked,
      radioContent,
      labelContent,
      iconContent,
      radioContentChange,
      radioOrgChange,
      radioClasses,
      titleClasses,
      inputProps,
      finalBorderless,
      finalPlacement,
    };
  },
});
</script>

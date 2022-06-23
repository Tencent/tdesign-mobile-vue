<template>
  <div :class="radioClasses">
    <span :class="[`${name}__content-wrap`]">
      <span v-if="align === 'left'" :class="`${name}__icon-wrap ${name}__icon-left-wrap`">
        <input type="radio" :class="`${name}__original-left`" v-bind="inputProps" @click="radioOrgChange" />
        <div :class="iconClass">
          <t-node :content="iconContent"></t-node>
        </div>
      </span>
      <span v-if="labelContent || radioContent" :class="[`${name}__label-wrap`]">
        <span v-if="labelContent" :class="titleClasses" @click="radioOrgChange">
          <t-node :content="labelContent"></t-node>
        </span>
        <div v-if="radioContent" :class="`${name}__content-inner`" @click="radioContentChange">
          <t-node :content="radioContent"></t-node>
        </div>
      </span>
      <span v-if="align === 'right'" :class="`${name}__icon-wrap ${name}__icon-right-wrap`">
        <input type="radio" :class="`${name}__original-right`" v-bind="inputProps" @click="radioOrgChange" />
        <div :class="iconClass">
          <t-node :content="iconContent"></t-node>
        </div>
      </span>
    </span>
    <!--下边框 -->
    <div v-if="!borderless" :class="`${name}__border ${name}__border--${align}`"></div>
  </div>
</template>

<script lang="ts">
import { inject, computed, defineComponent, getCurrentInstance, h, SetupContext, Ref, toRefs } from 'vue';
import { CheckIcon } from 'tdesign-icons-vue-next';
import { renderContent, renderTNode, TNode, NOOP, useDefault, useVModel } from '../shared';
import ClASSNAMES from '../shared/constants';
import config from '../config';
import RadioProps from './props';
import { RadioValue, TdRadioGroupProps, TdRadioProps } from './type';

const { prefix } = config;
const name = `${prefix}-radio`;

const iconDefault = [h(CheckIcon), ''];

export default defineComponent({
  name,
  components: { TNode },
  props: {
    ...RadioProps,
    borderless: {
      type: Boolean,
      value: false,
    },
  },
  emits: ['update:checked', 'update:modelValue', 'change'],
  setup(props, context: SetupContext) {
    const { checked, modelValue } = toRefs(props);
    const [innerChecked, setInnerChecked] = useVModel(
      checked,
      modelValue,
      props.defaultChecked,
      props.onChange,
      'checked',
    );

    const rootGroupProps = inject('rootGroupProps', {}) as TdRadioGroupProps;
    const rootGroupValue = inject<Ref<RadioValue>>('rootGroupValue');
    const rootGroupChange = inject('rootGroupChange', NOOP) as (val: RadioValue, e: Event) => void;
    const disabled = computed(() => (rootGroupProps.disabled !== undefined ? rootGroupProps.disabled : props.disabled));
    const radioChecked = computed(() => (rootGroupValue ? props.value === rootGroupValue.value : innerChecked.value));

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
      if (!props.icon) {
        return;
      }
      let curContent: any = '';
      const iconIndex = radioChecked.value ? 0 : 1;
      const isIconArray = Array.isArray(props.icon);
      if (isIconArray) {
        return (curContent = props.icon[iconIndex]);
      }
      return iconDefault[iconIndex];
    });

    const radioClasses = computed(() => [
      `${name}`,
      {
        [ClASSNAMES.STATUS.checked]: radioChecked.value,
        [ClASSNAMES.STATUS.disabled]: disabled.value,
      },
    ]);

    const titleClasses = computed(() => [
      `${name}__content-title`,
      {
        [ClASSNAMES.STATUS.disabled]: disabled.value,
        [`${name}__content-right-title`]: props.align === 'right',
      },
    ]);

    const iconClass = computed(() => [
      `${name}__icon`,
      {
        [`${name}__icon--checked`]: radioChecked.value,
        [`${name}__icon--disabled`]: disabled.value,
        [`${name}__icon--strock`]: props.icon === 'stroke-line',
        [`${name}__icon--custom`]: Array.isArray(props.icon),
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
        setInnerChecked(!radioChecked.value, { e });
      }
    };

    return {
      name,
      iconClass,
      radioContent,
      labelContent,
      iconContent,
      radioContentChange,
      radioOrgChange,
      radioClasses,
      titleClasses,
      inputProps,
    };
  },
});
</script>

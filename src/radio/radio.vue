<template>
  <div :class="radioClasses">
    <span :class="[`${name}__content-wrap`]">
      <span v-if="align === 'left'" :class="`${name}__icon-wrap`">
        <input
          type="radio"
          :name="radioName"
          :class="`${name}__original-left`"
          :disabled="disabled"
          :checked="checked"
          :value="value"
          @click="radioOrgChange"
        />
        <t-node :content="iconContent"></t-node>
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
        <input
          type="radio"
          :name="radioName"
          :class="`${name}__original-right`"
          :disabled="disabled"
          :checked="checked"
          :value="value"
          @click="radioOrgChange"
        />
        <t-node :content="iconContent"></t-node>
      </span>
    </span>
  </div>
</template>

<script lang="ts">
import { inject, computed, defineComponent, getCurrentInstance, h, ref, SetupContext, Ref } from 'vue';
import { CheckCircleFilledIcon, CircleIcon, CheckIcon } from 'tdesign-icons-vue-next';
import { renderContent, renderTNode, TNode, NOOP, useDefault } from '../shared';
import ClASSNAMES from '../shared/constants';
import config from '../config';
import RadioProps from './props';
import { RadioValue, TdRadioGroupProps, TdRadioProps } from './type';

const { prefix } = config;
const name = `${prefix}-radio`;

const iconDefault = {
  'fill-circle': [h(CheckCircleFilledIcon), h(CircleIcon)],
  'stroke-line': [h(CheckIcon), ''],
};

export default defineComponent({
  name,
  components: { TNode },
  props: RadioProps,
  emits: ['update:checked', 'update:modelValue', 'change'],
  setup(props, context: SetupContext) {
    const radioName = ref(props.name);
    const [innerChecked, setInnerChecked] = useDefault<Boolean, TdRadioProps>(props, context.emit, 'checked', 'change');
    const rootGroupProps = inject('rootGroupProps', {}) as TdRadioGroupProps;
    const rootGroupValue = inject<Ref<RadioValue>>('rootGroupValue');
    const rootGroupChange = inject('rootGroupChange', NOOP) as (val: RadioValue, e: Event) => void;
    const disabled = computed(() => (rootGroupProps.disabled !== undefined ? rootGroupProps.disabled : props.disabled));
    const checked = computed(() => {
      if (rootGroupValue !== undefined) {
        setInnerChecked(rootGroupValue.value === props.value);
      }
      return innerChecked.value;
    });
    const internalInstance = getCurrentInstance();
    const labelContent = computed(() => renderContent(internalInstance, 'default', 'label'));
    const radioContent = computed(() => renderTNode(internalInstance, 'content'));
    const iconContent = computed(() => {
      if (!props.icon) {
        return;
      }
      let curContent: any = '';
      const iconIndex = checked.value ? 0 : 1;
      const isIconArray = Array.isArray(props.icon);
      if (isIconArray) {
        curContent = props.icon[iconIndex];
      } else {
        curContent = iconDefault[props.icon][iconIndex];
      }
      return curContent;
    });

    const radioClasses = computed(() => [
      `${name}`,
      {
        [ClASSNAMES.STATUS.checked]: checked.value,
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
        setInnerChecked(!checked.value, e);
      }
    };

    return {
      name,
      checked,
      radioName,
      radioContent,
      labelContent,
      iconContent,
      disabled,
      radioContentChange,
      radioOrgChange,
      radioClasses,
      titleClasses,
    };
  },
});
</script>

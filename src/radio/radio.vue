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
      <span :class="[`${name}__label-wrap`]">
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
import { inject, computed, defineComponent, getCurrentInstance, h, ref } from 'vue';
import { CheckCircleFilledIcon, CircleIcon, CheckIcon } from 'tdesign-icons-vue-next';
import { renderContent, renderTNode, TNode, emitEvent, NOOP } from '../shared';
import ClASSNAMES from '../shared/constants';
import config from '../config';
import RadioProps from './props';
import { RadioValue, TdRadioGroupProps } from './type';

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
  emits: ['change', 'update:checked'],
  setup(props, context) {
    const radioName = ref(props.name);
    const rootGroupProps = inject('rootGroupProps', {}) as TdRadioGroupProps;
    const rootGroupChange = inject('rootGroupChange', NOOP) as (val: RadioValue) => void;
    const disabled = computed(() => (rootGroupProps.disabled !== undefined ? rootGroupProps.disabled : props.disabled));
    const checked = computed(() =>
      rootGroupProps.value !== undefined ? rootGroupProps.value === props.value : props.checked,
    );
    const internalInstance = getCurrentInstance();
    const labelContent = computed(() => renderContent(internalInstance, 'default', 'label'));
    const radioContent = computed(() => renderTNode(internalInstance, 'content'));
    const iconContent = computed(() => {
      if (!props.icon) {
        return;
      }
      let curContent: any = '';
      const iconIndex = checked.value === false ? 1 : 0;
      const isIconArray = Array.isArray(props.icon);
      if (isIconArray) {
        curContent = props.icon[iconIndex];
      } else {
        curContent = iconDefault[props.icon][iconIndex];
      }
      return curContent === '' ? curContent : curContent;
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
      if (rootGroupChange !== NOOP && props.value) {
        rootGroupChange(props.value);
      } else {
        context.emit('update:checked', !checked.value);
        emitEvent(props, context, 'change', !checked.value, { e });
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

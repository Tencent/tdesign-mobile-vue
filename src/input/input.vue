<template>
  <div :class="rootClasses">
    <div :class="`${componentName}__wrap--prefix`">
      <div :class="`${componentName}__icon--prefix`">
        <template v-if="prefixIconContent">
          <t-node :content="prefixIconContent"></t-node>
        </template>
      </div>
      <div :class="labelClasses">
        <t-node :content="labelContent"></t-node>
      </div>
    </div>
    <div :class="`${componentName}__wrap`">
      <div :class="`${componentName}__content ${componentName}--${status || 'default'}`">
        <input
          ref="inputRef"
          :value="innerValue"
          :name="name"
          :class="inputClasses"
          :type="type"
          :disabled="disabled"
          :autocomplete="autocomplete ? 'On' : 'Off'"
          :placeholder="placeholder"
          :readonly="readonly"
          :maxlength="maxlength || -1"
          @focus="handleFocus"
          @blur="handleBlur"
          @input="handleInput"
          @compositionend="handleCompositionend"
        />
        <div
          v-if="clearable && innerValue && innerValue.length > 0"
          :class="`${componentName}__wrap--clearable-icon`"
          @click="handleClear"
        >
          <close-circle-filled-icon />
        </div>
        <div v-if="suffixContent" :class="`${componentName}__wrap--suffix`">
          <t-node :content="suffixContent" />
        </div>
        <div v-if="suffixIconContent" :class="`${componentName}__wrap--suffix-icon`">
          <t-node :content="suffixIconContent"></t-node>
        </div>
      </div>
      <div v-if="tipsContent" :class="`${componentName}__tips ${componentName}--${align}`">
        <t-node :content="tipsContent" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import { ref, computed, defineComponent, getCurrentInstance, toRefs, nextTick, watch } from 'vue';
import { useFocus } from '@vueuse/core';
import config from '../config';
import InputProps from './props';
import { InputValue, TdInputProps } from './type';
import { getCharacterLength, renderTNode, TNode, useDefault, extendAPI } from '../shared';
import { useFormDisabled } from '../form/hooks';

const { prefix } = config;
const componentName = `${prefix}-input`;

export default defineComponent({
  name: componentName,
  components: {
    TNode,
    CloseCircleFilledIcon,
  },
  props: {
    ...InputProps,
    labelAlign: {
      type: String,
      default: 'top',
    },
  },
  emits: ['update:value', 'update:modelValue', 'click-icon', 'focus', 'blur', 'change', 'clear'],
  setup(props, context) {
    const disabled = useFormDisabled();

    const inputRef = ref();
    const { autofocus } = toRefs(props);
    const internalInstance = getCurrentInstance();
    const [innerValue] = useDefault<string, TdInputProps>(props, context.emit, 'value', 'change');

    const status = props.status || 'default';
    const labelClasses = computed(() => [`${componentName}__label`]);
    const { focused } = useFocus(inputRef, { initialValue: props.autofocus });

    const labelContent = computed(() => renderTNode(internalInstance, 'label'));
    const suffixIconContent = computed(() => renderTNode(internalInstance, 'suffixIcon'));
    const prefixIconContent = computed(() => renderTNode(internalInstance, 'prefixIcon'));
    const suffixContent = computed(() => renderTNode(internalInstance, 'suffix'));
    const tipsContent = computed(() => renderTNode(internalInstance, 'tips'));

    const inputClasses = computed(() => [
      `${componentName}__control`,
      {
        [`${componentName}--${props.align}`]: props.align !== 'left',
        [`${componentName}--${status}`]: status,
        [`${componentName}__control--disabled`]: disabled.value,
      },
    ]);

    const rootClasses = computed(() => [
      componentName,
      {
        [`${componentName}--layout-${props.layout}`]: props.layout,
        [`${componentName}--size-${props.size}`]: props.size,
        [`${componentName}--center`]: props.labelAlign === 'center',
        [`${componentName}--border`]: !props.borderless,
      },
    ]);

    const setInputValue = (v: InputValue = '') => {
      const input = inputRef.value as HTMLInputElement;
      const sV = String(v);
      if (!input) {
        return;
      }
      if (input.value !== sV) {
        input.value = sV;
      }
    };

    const handleInput = (e: any) => {
      // 中文输入的时候inputType是insertCompositionText所以中文输入的时候禁止触发。
      const checkInputType = e.inputType && e.inputType === 'insertCompositionText';
      if (e.isComposing || checkInputType) return;
      inputValueChangeHandle(e);
    };

    const inputValueChangeHandle = (e: Event) => {
      const { value } = e.target as HTMLInputElement;
      const { allowInputOverMax, maxcharacter } = props;
      if (!allowInputOverMax && maxcharacter && maxcharacter > 0 && !Number.isNaN(maxcharacter)) {
        const { length = 0, characters = '' } = getCharacterLength(value, maxcharacter) as {
          length: number;
          characters: string;
        };
        innerValue.value = characters;
      } else {
        innerValue.value = value;
      }
      nextTick(() => setInputValue(innerValue.value));
    };

    const focus = () => {
      focused.value = true;
    };

    const blur = () => {
      focused.value = false;
      // inputRef.value?.blur();
    };

    extendAPI({ focus, blur });

    const handleClear = (e: MouseEvent) => {
      innerValue.value = '';
      focused.value = true;
      props.onClear?.({ e });
    };
    const handleFocus = (e: FocusEvent) => {
      props.onFocus?.(innerValue.value, { e });
    };
    const handleBlur = (e: FocusEvent) => {
      props.onBlur?.(innerValue.value, { e });
    };

    const handleCompositionend = (e: InputEvent | CompositionEvent) => {
      inputValueChangeHandle(e as InputEvent);
    };

    watch(autofocus, (autofocus, prevAutofocus) => {
      if (autofocus === true) {
        nextTick(() => {
          focused.value = true;
        });
      }
    });

    return {
      componentName,
      ...toRefs(props),
      disabled,
      labelClasses,
      rootClasses,
      inputClasses,
      suffixContent,
      tipsContent,
      suffixIconContent,
      prefixIconContent,
      labelContent,
      innerValue,
      inputRef,
      handleClear,
      handleFocus,
      handleBlur,
      handleInput,
      handleCompositionend,
    };
  },
});
</script>

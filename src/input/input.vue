<template>
  <t-cell :required="required" :class="styleWrapper">
    <template v-if="labelContent" #title>
      <div :class="styleLabel">
        <t-node :content="labelContent"></t-node>
      </div>
    </template>
    <template v-if="prefixIconContent" #leftIcon>
      <t-node :content="prefixIconContent"></t-node>
    </template>
    <template #note>
      <div :class="`${componentName}__wrap`">
        <input
          ref="inputRef"
          :value="innerValue"
          :name="name"
          :class="styleControl"
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
          v-if="clearable && String(innerValue).length > 0"
          :class="`${componentName}__wrap--icon`"
          @click="handleClear"
        >
          <close-circle-filled-icon />
        </div>
        <div v-if="suffixContent" :class="`${componentName}__wrap--suffix`">
          <t-node :content="suffixContent" />
        </div>
      </div>
      <div v-if="errorMessage" :class="`${componentName}__error-msg`">{{ errorMessage }}</div>
    </template>
    <template v-if="suffixIconContent" #rightIcon>
      <t-node :content="suffixIconContent"></t-node>
    </template>
  </t-cell>
</template>

<script lang="ts">
import { CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import {
  ref,
  computed,
  onMounted,
  defineComponent,
  getCurrentInstance,
  toRefs,
  SetupContext,
  nextTick,
  watch,
} from 'vue';
import { useFocus } from '@vueuse/core';
import TCell from '../cell';
import config from '../config';
import InputProps from './props';
import ClASSNAMES from '../shared/constants';
import { InputValue, TdInputProps } from './type';
import { useEmitEvent, getCharacterLength, renderTNode, TNode, useDefault } from '../shared';

const { prefix } = config;
const componentName = `${prefix}-input`;

export default defineComponent({
  name: componentName,
  components: {
    TNode,
    TCell,
    CloseCircleFilledIcon,
  },
  props: InputProps,
  emits: ['update:value', 'update:modelValue', 'click-icon', 'focus', 'blur', 'change', 'clear'],
  setup(props, context: SetupContext) {
    const emitEvent = useEmitEvent(props, context.emit);
    const inputRef = ref();
    const { autofocus } = toRefs(props);
    const internalInstance = getCurrentInstance();
    const [innerValue] = useDefault<string, TdInputProps>(props, context.emit, 'value', 'change');

    const styleLabel = computed(() => ({
      [`${componentName}--label`]: true,
      [ClASSNAMES.STATUS.disabled]: props.disabled,
    }));
    const { focused } = useFocus(inputRef, { initialValue: props.autofocus });

    const labelContent = computed(() => renderTNode(internalInstance, 'label'));
    const suffixIconContent = computed(() => renderTNode(internalInstance, 'suffixIcon'));
    const prefixIconContent = computed(() => renderTNode(internalInstance, 'prefixIcon'));
    const suffixContent = computed(() => renderTNode(internalInstance, 'suffix'));

    const styleControl = computed(() => [
      `${componentName}__control`,
      {
        [`${componentName}__control--${props.align}`]: props.align !== 'left',
      },
    ]);

    const styleWrapper = computed(() => ({
      [componentName]: true,
      [`${componentName}__error`]: !!props.errorMessage,
    }));

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
      // const checkInputType = e.inputType && e.inputType === 'insertCompositionText';
      if (e.isComposing) return;
      inputValueChangeHandle(e);
    };

    const inputValueChangeHandle = (e: Event) => {
      const { value } = e.target as HTMLInputElement;
      const { maxcharacter } = props;
      if (maxcharacter && maxcharacter > 0 && !Number.isNaN(maxcharacter)) {
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

    // const focus = () => {
    //   focused.value = true;
    // };

    // const blur = () => {
    //   inputRef.value?.blur();
    // };

    const handleClear = (e: MouseEvent) => {
      innerValue.value = '';
      focused.value = true;
      emitEvent('clear', { e });
    };
    const handleFocus = (e: FocusEvent) => {
      emitEvent('focus', innerValue.value, { e });
    };
    const handleBlur = (e: FocusEvent) => {
      emitEvent('blur', innerValue.value, { e });
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
      styleLabel,
      styleWrapper,
      styleControl,
      suffixContent,
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

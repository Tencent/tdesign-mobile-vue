<template>
  <div :class="componentName">
    <textarea
      ref="textareaRef"
      v-model="innerValue"
      :style="textareaStyle"
      :name="name"
      :maxlength="maxlength || -1"
      :disabled="disabled"
      :placeholder="placeholder"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
      @compositionend="handleCompositionend"
    />
    <div v-if="maxcharacter || maxlength" :class="`${componentName}__count`">
      {{ `${textareaLength}/${maxcharacter || maxlength}` }}
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent, toRefs, SetupContext, nextTick } from 'vue';
import { useEmitEvent, getCharacterLength, useDefault } from '../shared';
import config from '../config';
import TextareaProps from './props';
import { TdTextareaProps, TextareaValue } from './type';
import calcTextareaHeight from '../_common/js/utils/calcTextareaHeight';

const { prefix } = config;
const componentName = `${prefix}-textarea`;

export default defineComponent({
  name: componentName,
  props: TextareaProps,
  emits: ['update:value', 'update:modelValue', 'click-icon', 'focus', 'blur', 'change', 'clear'],
  setup(props, context: SetupContext) {
    const emitEvent = useEmitEvent(props, context.emit);
    const textareaRef = ref<null | HTMLElement>(null);
    const textareaStyle = ref();
    const textareaLength = ref(0);
    const [innerValue] = useDefault<string, TdTextareaProps>(props, context.emit, 'value', 'change');
    innerValue.value = innerValue.value || '';

    const setInputValue = (v: TextareaValue = '') => {
      const input = textareaRef.value as HTMLTextAreaElement;
      const sV = String(v);
      if (!input) {
        return;
      }
      if (input.value !== sV) {
        input.value = sV;
      }
    };

    const adjustTextareaHeight = () => {
      if (props.autosize === true) {
        textareaStyle.value = calcTextareaHeight(textareaRef.value as HTMLTextAreaElement);
      } else if (typeof props.autosize === 'object') {
        const { minRows, maxRows } = props.autosize;
        textareaStyle.value = calcTextareaHeight(textareaRef.value as HTMLTextAreaElement, minRows, maxRows);
      } else if (context.attrs.rows) {
        textareaStyle.value = { height: 'auto', minHeight: 'auto' };
      }
      console.log('calc', textareaStyle.value);
    };

    const handleInput = (e: any) => {
      if (e.isComposing || e.inputType === 'insertCompositionText') return;
      textareaValueChangeHandle(e);
    };

    const textareaValueChangeHandle = (e: InputEvent) => {
      const { target } = e;
      const { value } = target as HTMLInputElement;
      if (props.maxcharacter && props.maxcharacter > 0 && !Number.isNaN(props.maxcharacter)) {
        const { length = 0, characters = '' } = getCharacterLength(value, props.maxcharacter) as {
          length: number;
          characters: string;
        };
        innerValue.value = characters;
        textareaLength.value = length;
      } else {
        innerValue.value = value;
        textareaLength.value = String(innerValue.value).length;
      }
      nextTick(() => setInputValue(innerValue.value));
      adjustTextareaHeight();
    };

    const handleCompositionend = (e: InputEvent | CompositionEvent) => {
      textareaValueChangeHandle(e as InputEvent);
    };

    const handleClear = (e: MouseEvent) => {
      innerValue.value = '';
      emitEvent('clear', { e });
    };
    const handleFocus = (e: FocusEvent) => {
      emitEvent('focus', innerValue.value, { e });
    };
    const handleBlur = (e: FocusEvent) => {
      emitEvent('blur', innerValue.value, { e });
    };

    onMounted(() => {
      if (props.autofocus) {
        textareaRef.value?.focus();
      }
      adjustTextareaHeight();
    });

    return {
      componentName,
      ...toRefs(props),
      innerValue,
      textareaRef,
      textareaStyle,
      textareaLength,
      handleClear,
      handleFocus,
      handleBlur,
      handleInput,
      handleCompositionend,
    };
  },
});
</script>

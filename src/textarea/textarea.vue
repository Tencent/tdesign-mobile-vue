<template>
  <div :class="textareaClass">
    <div v-if="labelContent" :class="`${componentName}__label`">
      <t-node :content="labelContent"></t-node>
    </div>
    <div :class="`${componentName}__wrapper`">
      <textarea
        ref="textareaRef"
        :value="innerValue"
        :class="textareaClassNames"
        :style="textareaStyle"
        :name="name"
        :maxlength="maxlength"
        :disabled="disabled"
        :placeholder="placeholder"
        :readonly="readonly"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
        @compositionend="handleCompositionend"
      />
      <div v-if="indicator && (maxcharacter || maxlength)" :class="`${componentName}__indicator`">
        {{ `${textareaLength}/${maxcharacter || maxlength}` }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref, onMounted, defineComponent, getCurrentInstance, toRefs, nextTick, watch, readonly } from 'vue';
import { renderTNode, TNode, getCharacterLength, useVModel } from '../shared';
import config from '../config';
import TextareaProps from './props';
import { TdTextareaProps, TextareaValue } from './type';
import calcTextareaHeight from '../_common/js/utils/calcTextareaHeight';
import { useFormDisabled } from '../form/hooks';

const { prefix } = config;
const componentName = `${prefix}-textarea`;

export default defineComponent({
  name: componentName,
  components: {
    TNode,
  },
  props: TextareaProps,
  emits: ['update:value', 'update:modelValue', 'focus', 'blur', 'change'],
  setup(props, context) {
    const disabled = useFormDisabled();
    const textareaRef = ref<null | HTMLElement>(null);
    const textareaStyle = ref();
    const textareaLength = ref(0);
    const { value, modelValue } = toRefs(props);
    const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
    const propsAutosize = computed(() => props.autosize);
    const textareaClass = computed(() => [
      `${componentName}`,
      {
        [`${componentName}--layout-${props.layout}`]: props.layout,
        [`${componentName}--border`]: props.bordered,
      },
    ]);

    const textareaClassNames = computed(() => [
      `${componentName}__wrapper-inner`,
      {
        [`${componentName}--disabled`]: disabled.value,
        [`${componentName}--readonly`]: props.readonly,
      },
    ]);
    const internalInstance = getCurrentInstance();
    const labelContent = computed(() => renderTNode(internalInstance, 'label'));

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
    };

    const handleInput = (e: any) => {
      if (e.isComposing || e.inputType === 'insertCompositionText') return;
      textareaValueChangeHandle();
    };

    const textareaValueChangeHandle = () => {
      const textarea = textareaRef.value as HTMLInputElement;
      if (
        !props.allowInputOverMax &&
        props.maxcharacter &&
        props.maxcharacter > 0 &&
        !Number.isNaN(props.maxcharacter)
      ) {
        const { length = 0, characters = '' } = getCharacterLength(textarea.value, props.maxcharacter) as {
          length: number;
          characters: string;
        };
        setInnerValue(characters);
        textareaLength.value = length;
      } else {
        setInnerValue(textarea.value);
        textareaLength.value = String(textarea.value).length;
      }
      nextTick(() => setInputValue(innerValue.value));
      adjustTextareaHeight();
    };

    const handleCompositionend = (e: InputEvent | CompositionEvent) => {
      textareaValueChangeHandle();
    };

    const handleFocus = (e: FocusEvent) => {
      props.onFocus?.(innerValue.value, { e });
    };
    const handleBlur = (e: FocusEvent) => {
      props.onBlur?.(innerValue.value, { e });
    };

    onMounted(() => {
      if (props.autofocus) {
        textareaRef.value?.focus();
      }
      textareaValueChangeHandle();
      adjustTextareaHeight();
    });

    watch(innerValue, () => {
      nextTick(() => {
        adjustTextareaHeight();
      });
    });
    watch(propsAutosize, (value) => {
      switch (value) {
        case true:
          textareaStyle.value = calcTextareaHeight(textareaRef.value as HTMLTextAreaElement);
          break;
        case false:
          textareaStyle.value = calcTextareaHeight(textareaRef.value as HTMLTextAreaElement, 1, 1);
          break;
        default:
          break;
      }
    });
    return {
      componentName,
      ...toRefs(props),
      disabled,
      labelContent,
      innerValue,
      textareaRef,
      textareaStyle,
      textareaClass,
      textareaClassNames,
      textareaLength,
      handleFocus,
      handleBlur,
      handleInput,
      handleCompositionend,
    };
  },
});
</script>

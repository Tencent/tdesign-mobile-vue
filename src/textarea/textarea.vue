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
        :maxlength="-1"
        :disabled="disabled"
        :placeholder="placeholder"
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
import { computed, ref, onMounted, defineComponent, getCurrentInstance, toRefs, nextTick, watch } from 'vue';
import { useEmitEvent, renderTNode, TNode, getCharacterLength, useVModel } from '../shared';
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
    const emitEvent = useEmitEvent(props, context.emit);
    const disabled = useFormDisabled();
    const textareaRef = ref<null | HTMLElement>(null);
    const textareaStyle = ref();
    const textareaLength = ref(0);
    const { value, modelValue } = toRefs(props);
    const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

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
      textareaValueChangeHandle(e);
    };

    const textareaValueChangeHandle = (e: InputEvent) => {
      const { target } = e;
      const { value } = target as HTMLInputElement;
      if (
        !props.allowInputOverMax &&
        props.maxcharacter &&
        props.maxcharacter > 0 &&
        !Number.isNaN(props.maxcharacter)
      ) {
        const { length = 0, characters = '' } = getCharacterLength(value, props.maxcharacter) as {
          length: number;
          characters: string;
        };
        setInnerValue(characters);
        textareaLength.value = length;
      } else {
        setInnerValue(value);
        textareaLength.value = String(innerValue.value).length;
      }
      nextTick(() => setInputValue(innerValue.value));
      adjustTextareaHeight();
    };

    const handleCompositionend = (e: InputEvent | CompositionEvent) => {
      textareaValueChangeHandle(e as InputEvent);
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

    watch(innerValue, () => {
      nextTick(() => {
        adjustTextareaHeight();
      });
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

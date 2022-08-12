<template>
  <div :class="componentName">
    <div v-if="labelContent" :class="`${componentName}__name`">
      <t-node :content="labelContent"></t-node>
    </div>
    <div :class="textareaClassNames">
      <textarea
        ref="textareaRef"
        :value="innerValue"
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
  </div>
</template>

<script lang="ts">
import { computed, ref, onMounted, defineComponent, getCurrentInstance, toRefs, SetupContext, nextTick } from 'vue';
import { useEmitEvent, renderTNode, TNode, getCharacterLength, useVModel } from '../shared';
import config from '../config';
import TextareaProps from './props';
import { TdTextareaProps, TextareaValue } from './type';
import calcTextareaHeight from '../_common/js/utils/calcTextareaHeight';

const { prefix } = config;
const componentName = `${prefix}-textarea`;

export default defineComponent({
  name: componentName,
  components: {
    TNode,
  },
  props: TextareaProps,
  emits: ['update:value', 'update:modelValue', 'click-icon', 'focus', 'blur', 'clear', 'change'],
  setup(props, context: SetupContext) {
    const emitEvent = useEmitEvent(props, context.emit);
    const textareaRef = ref<null | HTMLElement>(null);
    const textareaStyle = ref();
    const textareaLength = ref(0);
    const { value, modelValue } = toRefs(props);
    const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

    const textareaClassNames = computed(() => [
      `${componentName}__wrapper`,
      {
        [`${componentName}-is-disabled`]: props.disabled,
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
      if (props.maxcharacter && props.maxcharacter > 0 && !Number.isNaN(props.maxcharacter)) {
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

    const handleClear = (e: MouseEvent) => {
      setInnerValue('');
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
      labelContent,
      innerValue,
      textareaRef,
      textareaStyle,
      textareaClassNames,
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

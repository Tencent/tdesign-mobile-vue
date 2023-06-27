<template>
  <div :class="`${name}`">
    <div :class="boxClasses">
      <slot name="leftIcon">
        <t-node v-if="leftIconContent" :content="leftIconContent"></t-node>
      </slot>
      <input
        ref="searchInput"
        :value="searchValue"
        type="search"
        :class="[`${prefix}-input__keyword`, { [`${name}--center`]: center }]"
        :autofocus="focus"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
        @keypress="handleSearch"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
        @compositionend="handleCompositionend"
      />
      <div v-if="searchValue && clearable" :class="`${name}__clear`" @click="handleClear">
        <t-icon-clear size="24" />
      </div>
    </div>
    <slot name="action">
      <div v-if="action" v-show="focused" :class="`${name}__search-action`" @click="onActionClick">
        {{ action }}
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { SearchIcon, CloseCircleFilledIcon as TIconClear } from 'tdesign-icons-vue-next';
import { ref, computed, defineComponent, toRefs, getCurrentInstance, h, nextTick } from 'vue';
import isFunction from 'lodash/isFunction';
import { useFocus } from '@vueuse/core';
import config from '../config';
import { renderTNode, TNode } from '../shared';
import searchProps from './props';
import { useDefault } from '../shared/useDefault';

const { prefix } = config;
const name = `${prefix}-search`;

export default defineComponent({
  name,
  components: { TNode, TIconClear },
  props: searchProps,
  emits: ['update:value', 'update:modelValue', 'action-click', 'focus', 'blur', 'change', 'clear', 'submit'],
  setup(props, context) {
    const searchInput = ref();
    const { focused } = useFocus(searchInput, { initialValue: props.focus });
    const [searchValue] = useDefault(props, context.emit, 'value', 'change');

    const boxClasses = computed(() => [
      `${name}__input-box`,
      `${name}__input-box--${props.shape}`,
      {
        [`${prefix}-is-focused`]: focused.value,
      },
    ]);

    // left-icon
    const internalInstance = getCurrentInstance();
    const leftIconContent = computed(() => {
      if (isFunction(props.leftIcon) || context.slots.leftIcon) {
        return renderTNode(internalInstance, 'leftIcon');
      }
      if (props.leftIcon) {
        return h(SearchIcon, { size: '24px' });
      }
      return null;
    });

    const setInputValue = (v: any) => {
      const input = searchInput.value as HTMLInputElement;
      const sV = String(v);
      if (!input) {
        return;
      }
      if (input.value !== sV) {
        input.value = sV;
      }
    };

    const inputValueChangeHandle = (e: Event) => {
      const { value } = e.target as HTMLInputElement;
      searchValue.value = value;
      nextTick(() => setInputValue(searchValue.value));
    };

    const handleInput = (e: any) => {
      // 中文输入的时候inputType是insertCompositionText所以中文输入的时候禁止触发。
      const checkInputType = e.inputType && e.inputType === 'insertCompositionText';
      if (e.isComposing || checkInputType) return;
      inputValueChangeHandle(e);
    };

    const handleClear = (e: MouseEvent) => {
      searchValue.value = '';
      focused.value = true;
      props.onClear?.({ e });
    };

    const handleFocus = (e: FocusEvent) => {
      props.onFocus?.({ value: searchValue.value, e });
    };

    const handleBlur = (e: FocusEvent) => {
      props.onBlur?.({ value: searchValue.value, e });
    };

    const handleCompositionend = (e: InputEvent | CompositionEvent) => {
      inputValueChangeHandle(e);
    };

    const onActionClick = (e: MouseEvent) => {
      props.onActionClick?.({ e });
    };

    const handleSearch = (e: any) => {
      // 如果按的是 enter 键, 13是 enter
      if (e.keyCode === 13) {
        e.preventDefault(); // 禁止默认（换行）事件
        props.onSubmit?.({ value: searchValue.value, e });
      }
    };

    return {
      ...toRefs(props),
      prefix,
      name,
      focused,
      boxClasses,
      leftIconContent,
      searchValue,
      handleSearch,
      handleClear,
      handleFocus,
      handleBlur,
      handleInput,
      handleCompositionend,
      searchInput,
      onActionClick,
    };
  },
});
</script>

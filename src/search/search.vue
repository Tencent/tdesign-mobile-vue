<template>
  <div :class="classes">
    <div :class="`${name}__form`">
      <div :class="`${name}__box`">
        <div :class="`${name}__icon-search`">
          <slot name="leftIcon">
            <t-icon-search />
          </slot>
        </div>
        <t-input
          ref="searchInput"
          v-model="value"
          :class="`${name}__input`"
          :autofocus="focus"
          :placeholder="placeholder"
          :clearable="clearable"
          @blur="onBlur"
          @clear="onClear"
          @focus="onFocus"
          @change="onChange"
        />
      </div>
      <label v-show="state.labelActive" :class="`${name}__label`" @click="onClick">
        <div :class="`${name}__label-icon-search`">
          <slot name="leftIcon">
            <t-icon-search />
          </slot>
        </div>
        <span :class="`${name}__label-text`">{{ placeholder }}</span>
      </label>
    </div>
    <slot name="action">
      <t-button
        v-if="action"
        v-show="!state.labelActive"
        variant="text"
        :class="`${name}__cancel-button`"
        @click="onCancel"
      >
        {{ action }}
      </t-button>
    </slot>
  </div>
</template>

<script lang="ts">
import { SearchIcon as TIconSearch } from 'tdesign-icons-vue-next';
import { ref, reactive, computed, defineComponent, toRefs } from 'vue';
import config from '../config';
import TButton from '../button';
import TInput, { InputValue } from '../input';
import { extendAPI } from '../shared';
import searchProps from './props';
import { useDefault } from '../shared/useDefault';

const { prefix } = config;
const name = `${prefix}-search`;

type InputBlurContext = { e: FocusEvent };
type InputFocusContent = { e: FocusEvent };
type InputChangeContext = { e?: MouseEvent | InputEvent | undefined } | undefined;

export default defineComponent({
  name,
  components: { TIconSearch, TButton, TInput },
  props: searchProps,
  setup(props, { emit }) {
    const classes = computed(() => ({
      [`${name}`]: true,
      [`${prefix}-is-focused`]: !state.labelActive,
    }));
    const [value] = useDefault(props, emit, 'value', 'change');
    const searchInput = ref();

    const state = reactive({
      labelActive: !value.value,
      inputVal: '',
    });

    const doFocus = () => {
      searchInput.value?.focus();
    };

    const onBlur = (value: any, context: InputBlurContext) => {
      state.labelActive = !value;
      props.onBlur?.(value, { e: context.e });
    };

    const onClick = () => {
      state.labelActive = !state.labelActive;
      doFocus();
    };

    const onFocus = (value: InputValue, context: InputFocusContent) => {
      state.labelActive = false;
      props.onFocus?.(value, { e: context.e });
    };

    const onCancel = (e: MouseEvent) => {
      state.labelActive = !state.labelActive;
      props.onCancel?.(e);
      props.onActionClick?.({ e });
    };

    const onClear = (e: Event) => {
      props.onClean?.(e);
    };

    const onChange = (value: InputValue, context: InputChangeContext) => {
      props.onChange?.(value, { e: context?.e });
    };

    extendAPI({ doFocus, blur });

    return {
      ...toRefs(props),
      name: ref(name),
      classes,
      onClick,
      onCancel,
      onClear,
      onBlur,
      onFocus,
      onChange,
      state,
      value,
      searchInput,
    };
  },
});
</script>

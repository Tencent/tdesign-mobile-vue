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
      labelActive: true,
      inputVal: '',
    });

    const doFocus = () => {
      searchInput.value?.focus();
    };

    const onBlur = (value: InputValue, { e }) => {
      state.labelActive = true;
      props.onBlur?.('blur', value, { e });
    };

    const onClick = () => {
      state.labelActive = !state.labelActive;
      doFocus();
    };

    const onCancel = (e: MouseEvent) => {
      state.labelActive = !state.labelActive;
      props.onCancel?.(e);
      props.onActionClick?.({ e });
    };

    const onClear = (e: Event) => {
      props.onClean?.(e);
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
      state,
      value,
      searchInput,
    };
  },
});
</script>

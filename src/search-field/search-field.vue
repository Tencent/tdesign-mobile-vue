<template>
  <div :class="classes">
    <form :class="`${name}__form`">
      <div :class="`${name}__box`">
        <t-icon
          :class="`${name}__icon-search`"
          name="search"
          :style="iconStyle"
        ></t-icon>
        <input
          v-model="currentValue"
          :class="`${name}__input`"
          type="text"
          :autofocus="autofocus"
          :placeholder="placeholder"
        />
        <t-icon
          v-if="clearable && currentValue.length > 0"
          :class="`${name}__icon-close`"
          name="clear-circle-filled"
          :style="iconStyle"
          @click="onClear"
        ></t-icon>
      </div>
      <label
        v-show="state.labelActive"
        :class="`${name}__label`"
        @click="onClick"
      >
        <t-icon
          :class="`${name}__label-icon-search`"
          name="search"
          :style="iconStyle"
        ></t-icon>
        <span :class="`${name}__label-text`">{{ placeholder }}</span>
      </label>
    </form>
    <button
      v-show="!state.labelActive"
      :class="`${name}__cancel-button`"
      @click="onCancel"
    >
      {{ cancelButtonText }}
    </button>
  </div>
</template>

<script lang="ts">
import { ref, reactive, computed, defineComponent } from 'vue';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-search-field`;

export default defineComponent({
  name,
  props: {
    autofocus: {
      type: Boolean,
      default: true,
    },
    iconColor: {
      type: String,
      default: '#888888',
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
      default: '',
    },
    cancelButtonText: {
      type: String,
      default: '取消',
    },
  },
  emits: ['change', 'update:modelValue', 'clear', 'cancel'],
  setup(props, { emit }) {
    const classes = computed(() => ({
      [`${name}`]: true,
      [`${prefix}-is-focused`]: !state.labelActive,
    }));

    const iconStyle = computed(() => (
      props.iconColor ? `color:${props.iconColor};` : ''));

    const state = reactive({
      labelActive: true,
      inputVal: '',
    });

    const curLabelActive = computed({
      get() {
        return state.labelActive;
      },
      set(val: boolean) {
        state.labelActive = !val;
      },
    });

    const currentValue = computed({
      get() {
        return props.modelValue || state.inputVal;
      },
      set(val: string) {
        emit('change', val);
        emit('update:modelValue', val);
        state.inputVal = val;
      },
    });

    const onClick = () => {
      curLabelActive.value = state.labelActive;
    };

    const onCancel = (e: Event) => {
      curLabelActive.value = state.labelActive;
      currentValue.value = '';
      emit('cancel', e);
    };

    // no use
    // const onInput = (e: Event) => {
    //   currentValue.value = e?.target?.value ?? '';
    // };

    const onClear = (e: Event) => {
      currentValue.value = '';
      emit('clear', e);
    };

    return {
      name: ref(name),
      classes,
      iconStyle,
      onClick,
      onCancel,
      onClear,
      state,
      currentValue,
    };
  },
});
</script>

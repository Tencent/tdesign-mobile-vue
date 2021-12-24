<template>
  <div :class="classes">
    <form :class="`${name}__form`">
      <div :class="`${name}__box`">
        <div :class="`${name}__icon-search`" :style="iconStyle">
          <t-icon-search></t-icon-search>
        </div>
        <input
          ref="searchInput"
          v-model="currentValue"
          :class="`${name}__input`"
          type="text"
          :autofocus="autofocus"
          :placeholder="placeholder"
        />
        <div :class="`${name}__icon-close`" :style="iconStyle">
          <close-icon v-if="clearable && currentValue.length > 0" @click="onClear"></close-icon>
        </div>
      </div>
      <label v-show="state.labelActive" :class="`${name}__label`" @click="onClick">
        <div :class="`${name}__label-icon-search`" :style="iconStyle">
          <t-icon-search></t-icon-search>
        </div>
        <span :class="`${name}__label-text`">{{ placeholder }}</span>
      </label>
    </form>
    <button v-show="!state.labelActive" :class="`${name}__cancel-button`" @click="onCancel">
      {{ cancelButtonText }}
    </button>
  </div>
</template>

<script lang="ts">
import { SearchIcon as TIconSearch, CloseIcon } from 'tdesign-icons-vue-next';
import { ref, reactive, computed, defineComponent, nextTick } from 'vue';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-search-field`;

export default defineComponent({
  name,
  components: { TIconSearch, CloseIcon },
  props: {
    autofocus: {
      type: Boolean,
      default: true,
    },
    iconColor: {
      type: String,
      default: '#CCCCCC',
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

    const iconStyle = computed(() => (props.iconColor ? `color:${props.iconColor};` : ''));

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

    const searchInput = ref<null | HTMLInputElement>(null);

    const onClick = () => {
      curLabelActive.value = state.labelActive;
      searchInput.value?.focus();
    };

    const onCancel = (e: Event) => {
      curLabelActive.value = state.labelActive;
      currentValue.value = '';
      searchInput.value?.blur();
      emit('cancel', e);
    };

    const onClear = (e: Event) => {
      currentValue.value = '';
      emit('clear', e);
    };

    if (props.autofocus) {
      nextTick(() => {
        onClick();
      });
    }

    return {
      name: ref(name),
      classes,
      iconStyle,
      onClick,
      onCancel,
      onClear,
      state,
      currentValue,
      searchInput,
    };
  },
});
</script>

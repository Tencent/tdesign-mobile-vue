<template>
  <div :class="classes">
    <div :class="`${name}__form`">
      <div :class="`${name}__box`">
        <div :class="`${name}__icon-search`">
          <t-icon-search></t-icon-search>
        </div>
        <t-input
          ref="searchInput"
          v-model="currentValue"
          :class="`${name}__input`"
          type="search"
          :autofocus="autofocus"
          :placeholder="placeholder"
        />
        <div :class="`${name}__icon-close`">
          <t-close-icon v-if="clearable && currentValue.length > 0" @click="onClear"></t-close-icon>
        </div>
      </div>
      <label v-show="state.labelActive" :class="`${name}__label`" @click="onClick">
        <div :class="`${name}__label-icon-search`">
          <t-icon-search></t-icon-search>
        </div>
        <span :class="`${name}__label-text`">{{ placeholder }}</span>
      </label>
    </div>
    <t-button v-show="!state.labelActive" variant="text" :class="`${name}__cancel-button`" @click="onCancel">
      {{ cancelButtonText }}
    </t-button>
  </div>
</template>

<script lang="ts">
import { SearchIcon as TIconSearch, CloseCircleFilledIcon as TCloseIcon } from 'tdesign-icons-vue-next';
import { ref, reactive, computed, defineComponent, nextTick, watch, toRefs } from 'vue';
import config from '../config';
import TButton from '../button';
import TInput from '../input';
import { extendAPI } from '../shared';

const { prefix } = config;
const name = `${prefix}-search`;

export default defineComponent({
  name,
  components: { TIconSearch, TCloseIcon, TButton, TInput },
  props: {
    autofocus: {
      type: Boolean,
      default: false,
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

    const searchInput = ref();

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

    const focus = () => {
      searchInput.value?.focus();
    };

    const blur = () => {
      searchInput.value?.blur();
    };

    const onClick = () => {
      curLabelActive.value = state.labelActive;
      focus();
    };

    const onCancel = (e: Event) => {
      curLabelActive.value = state.labelActive;
      currentValue.value = '';
      blur();
      emit('cancel', e);
    };

    const onClear = (e: Event) => {
      currentValue.value = '';
      focus();
      emit('clear', e);
    };

    extendAPI({ focus, blur });

    return {
      ...toRefs(props),
      name: ref(name),
      classes,
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

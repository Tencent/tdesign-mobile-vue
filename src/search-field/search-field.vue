<template>
  <div :class="classes">
    <form :class="`${name}__form`">
      <div :class="`${name}__box`">
        <t-icon
          :class="`${name}__icon-search`"
          name="search"
          style="color: #BBBBBB;"
        ></t-icon>
        <input
          :class="`${name}__input`"
          type="text"
          :autofocus="autofocus"
          :placeholder="placeholder"
          v-model="currentValue"
        />
        <t-icon
          v-if="clearable && currentValue.length > 0"
          :class="`${name}__icon-close`"
          name="close_fill"
          style="color: #BBBBBB;"
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
          style="color: #BBBBBB;"
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
import { ref, reactive, computed, SetupContext, defineComponent } from 'vue';
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
  setup(props, context: SetupContext) {
    const { emit } = context;

    const classes = computed(() => [
      `${name}`,
      {
        [`${prefix}-is-focused`]: !state.labelActive,
      },
    ]);

    const state = reactive({
      labelActive: true,
      inputVal: '',
    });

    const curLabelActive = computed({
      get() {
        return true;
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
      context.emit('cancel', e);
    };

    const onInput = (e: Event) => {
      currentValue.value = e?.target?.value ?? '';
    };

    const onClear = (e: Event) => {
      currentValue.value = '';
      context.emit('clear', e);
    };

    return {
      name: ref(name),
      classes,
      onClick,
      onCancel,
      onInput,
      onClear,
      state,
      currentValue,
    };
  },
});
</script>

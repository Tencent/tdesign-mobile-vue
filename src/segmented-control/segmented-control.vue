<template>
  <div :class="name">
    <ul v-if="items.length > 0" :class="`${name}__list`">
      <li
        v-for="(item, index) in items"
        :key="item.value || index"
        :class="[`${name}__item`, currentActive.includes(item.value || index) && `${prefix}-is-active`]"
        @click="selectChild(item.value || index)"
      >
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import config from '../config';
import { ModelValueProps, ItemsProps } from './segmented-control.interface';
const { prefix } = config;
const name = `${prefix}-segmented-control`;

export default defineComponent({
  name,
  props: {
    modelValue: {
      type: [Array, Number, String],
      default: '',
    },
    items: {
      type: Array as ItemsProps,
      default: () => [],
    },
    isMultiple: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['change', 'update:modelValue'],
  setup(props, { emit }) {
    const initActive = (modelValue: ModelValueProps, isMultiple: boolean) => {
      const concatValue = modelValue ? ([] as any[]).concat(modelValue) : [];
      return !isMultiple && concatValue.length > 1 ? [concatValue[0]] : concatValue;
    };
    const currentActive = ref(initActive(props.modelValue as ModelValueProps, props.isMultiple));
    const selectChild = (value: string | number) => {
      const isIncluded = currentActive.value.includes(value);
      if (isIncluded) {
        props.isMultiple && (currentActive.value = currentActive.value.filter((i) => i !== value));
      } else {
        currentActive.value = props.isMultiple ? [...currentActive.value, value] : [value];
      }
    };

    watch(currentActive, (newValue) => {
      emit('update:modelValue', newValue);
      emit('change', newValue);
    });

    return {
      prefix,
      name,
      currentActive,
      selectChild,
    };
  },
});
</script>

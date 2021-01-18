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
      type: [Number, String] as ModelValueProps,
      default: '',
    },
    items: {
      type: Array as ItemsProps,
      default: () => [],
    },
  },
  emits: ['change', 'update:modelValue'],
  setup(props, { emit }) {
    const currentActive = ref(props.modelValue);
    const selectChild = (value: string | number) => {
      currentActive.value !== value && (currentActive.value = value);
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

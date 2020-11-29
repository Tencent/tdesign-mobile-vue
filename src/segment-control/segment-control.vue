<template>
  <div :class="name">
    <ul :class="`${name}__list`" v-if="items.length > 0">
      <li
        :class="[`${name}__item`, currentActive.includes(item.value || index) && 'active']"
        v-for="(item, index) in items"
        :key="item.value || index"
        @click="selectChild(item.value || index)"
      >
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, Ref } from 'vue';
import config from '../config';
import { ModelValueProps, ItemsProps, SegmentControlProps } from './segment-control.d';
const { prefix } = config;
const name = `${prefix}-segment-control`;

export default defineComponent({
  name,
  props: {
    modelValue: [Array, Number, String] as ModelValueProps,
    items: {
      type: Array as ItemsProps,
      default: () => [],
    },
    isMultiple: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: SegmentControlProps, { emit }) {
    const initActive = (modelValue, isMultiple): ModelValueProps => {
      const concatValue = [].concat(modelValue);
      return !isMultiple && concatValue.length > 1 ? [concatValue[0]] : concatValue;
    };
    const currentActive:Ref<ModelValueProps>  = ref(initActive(props.modelValue, props.isMultiple));
    const selectChild = (value) => {
      const isIncluded = currentActive.value.includes(value);
      if (isIncluded) {
        props.isMultiple && (
          currentActive.value = currentActive.value.filter(i => i !== value)
        );
      } else {
        currentActive.value = props.isMultiple ? [...currentActive.value, value] : [value];
      }
    };

    watch(currentActive, (newValue) => {
      emit('update:modelValue', newValue);
      emit('change', newValue);
    });

    return {
      name,
      currentActive,
      selectChild,
    };
  },
});
</script>

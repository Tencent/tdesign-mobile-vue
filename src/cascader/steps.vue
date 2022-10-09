<template>
  <div class="t-cascader__steps">
    <div v-for="(item, index) in items" :key="index" class="t-cascader__step" @click="handleClick(index)">
      <div
        :class="{
          't-cascader__step-dot': true,
          't-cascader__step-dot--active': index === modelValue,
          't-cascader__step-dot--last': index === items.length - 1,
        }"
      ></div>
      <div
        :class="{
          't-cascader__step-label': true,
          't-cascader__step-label--active': index === modelValue,
        }"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps({
  items: Array,
  modelValue: Number,
});

const emit = defineEmits(['update:modelValue']);

const handleClick = (index: number) => {
  emit('update:modelValue', index);
};
</script>

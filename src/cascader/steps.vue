<template>
  <div v-if="Array.isArray(items)" class="t-cascader__steps">
    <div v-for="(item, index) in items" :key="index" class="t-cascader__step" @click="handleClick(index)">
      <div
        :class="{
          't-cascader__step-dot': true,
          't-cascader__step-dot--active': index === value,
          't-cascader__step-dot--last': index === items.length - 1,
        }"
      ></div>
      <div
        :class="{
          't-cascader__step-label': true,
          't-cascader__step-label--active': index === value,
        }"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps({
  items: Array,
  value: Number,
});

const emit = defineEmits(['update:value']);

const handleClick = (index: number) => {
  emit('update:value', index);
};
</script>

<template>
  <div class="rate-demo-cell rate-demo-cell--space">
    <div class="rate-demo-cell__label">空心评分</div>
    <t-rate v-model="value1" variant="outline" clearable :color="['#FFC51C', '#E8E8E8']" :gap="defaultGap" />
  </div>
  <div class="rate-demo-cell">
    <div class="rate-demo-cell__label">实心评分</div>
    <t-rate v-model="value" clearable allow-half :color="['#FFC51C', '#E8E8E8']" :gap="defaultGap" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const defaultGap = 8;
const value = ref(2.5);
const value1 = ref(3);
</script>

<template>
  <div class="rate-demo-cell rate-demo-cell--space">
    <div class="rate-demo-cell__label">请点击评分</div>
    <t-rate v-model="value" clearable show-text :gap="defaultGap" :size="16" />
  </div>
  <div class="rate-demo-cell rate-demo-cell--space">
    <div class="rate-demo-cell__label">请点击评分</div>
    <t-rate v-model="value1" clearable show-text :texts="texts" :gap="defaultGap" />
  </div>
  <div class="rate-demo-cell">
    <div class="rate-demo-cell__label">请点击评分</div>
    <t-rate v-model="value2" clearable show-text :texts="texts" variant="outline" :gap="defaultGap" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const defaultGap = 8;
const value = ref(3);
const value1 = ref(3);
const value2 = ref(3);
const texts = ref(['很差', '差', '一般', '好评', '优秀']);
</script>

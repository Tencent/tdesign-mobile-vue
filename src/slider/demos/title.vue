<template>
  <div class="flex">
    <span :style="{ width: '120px', 'margin-right': '10px' }"> 选择器标题 </span>
    <t-slider v-model="value" :label="false" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(0);
</script>
<style>
.flex {
  display: flex;
  align-items: center;
}
</style>

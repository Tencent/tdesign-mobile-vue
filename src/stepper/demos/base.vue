<template>
  <div class="stepper-example">
    <t-stepper v-model="number" theme="filled" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const number = ref(3);
</script>

<style lang="less">
.stepper-example {
  padding: 16px;
  background-color: var(--bg-color-demo, #fff);
}
</style>

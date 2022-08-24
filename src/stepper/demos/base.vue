<template>
  <div class="stepper-demo">
    <t-cell title="标题文字">
      <t-stepper v-model.number="number" />
    </t-cell>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const number = ref(0);
</script>

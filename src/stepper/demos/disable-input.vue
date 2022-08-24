<template>
  <div class="stepper-demo">
    <t-cell title="禁止输入">
      <t-stepper v-model.number="number" :step="1" :min="0" :max="100" disable-input />
    </t-cell>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const number = ref(0);
</script>

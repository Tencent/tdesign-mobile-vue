<template>
  <t-rate v-model="value" clearable allow-half>
    <template #icon>
      <CheckCircleFilledIcon />
    </template>
  </t-rate>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CheckCircleFilledIcon } from 'tdesign-icons-vue-next';

const value = ref(3);
</script>

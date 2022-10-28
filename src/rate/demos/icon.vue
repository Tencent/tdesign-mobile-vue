<template>
  <div class="rate-demo-cell">
    <div class="rate-demo-cell__label">规格20</div>
    <t-rate v-model="value" clearable allow-half>
      <template #icon>
        <CheckCircleFilledIcon />
      </template>
    </t-rate>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CheckCircleFilledIcon } from 'tdesign-icons-vue-next';

const value = ref(3);
</script>

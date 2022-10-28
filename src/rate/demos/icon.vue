<template>
  <CustomCell title="规格20">
    <t-rate v-model="value" clearable allow-half>
      <template #icon>
        <CheckCircleFilledIcon />
      </template>
    </t-rate>
  </CustomCell>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CheckCircleFilledIcon } from 'tdesign-icons-vue-next';
import CustomCell from './components/custom-cell.vue';

const value = ref(3);
</script>

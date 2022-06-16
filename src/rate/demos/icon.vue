<template>
  <t-rate v-model="value[11]" clearable allow-half>
    <template #icon>
      <CheckCircleFilledIcon @click="onIconClick" />
    </template>
  </t-rate>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CheckCircleFilledIcon } from 'tdesign-icons-vue-next';

const onIconClick = () => {
  console.log('icon was clicked.');
};
const value = ref([1, 2, 3, 3.5, 3, 3, 3, 3, 3, 3, 3, 3]);
</script>

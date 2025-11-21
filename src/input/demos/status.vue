<template>
  <t-input v-model="text1" label="标签文字" placeholder="请输入文字" status="error" tips="辅助说明">
    <template #suffixIcon>
      <close-icon :style="{ color: '#d54941' }" />
    </template>
  </t-input>
  <t-input v-model="text2" disabled label="标签文字" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CloseIcon } from 'tdesign-icons-vue-next';

const text1 = ref('已输入文字');
const text2 = ref('不可编辑文字');
</script>

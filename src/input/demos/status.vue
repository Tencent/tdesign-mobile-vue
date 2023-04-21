<template>
  <t-input v-model="text1" label="标签文字" placeholder="请输入文字" status="error" tips="辅助说明" />
  <t-input v-model="text2" label="不可编辑" disabled />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const text1 = ref('已输入文字');
const text2 = ref('不可编辑文字');
</script>

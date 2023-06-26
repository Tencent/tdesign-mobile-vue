<template>
  <t-textarea v-model="value" name="标签文字" label="标签文字" placeholder="请输入文字" :maxlength="500" indicator />
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');
</script>

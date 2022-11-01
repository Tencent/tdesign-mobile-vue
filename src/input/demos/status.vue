<template>
  <t-cell-group>
    <t-input v-model="text1" label="标签文字"></t-input>
    <t-input v-model="text2" label="填写错误" error-message="提示信息" />
    <t-input v-model="text3" label="不可编辑" readonly />
  </t-cell-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const text1 = ref('请输入文字');
const text2 = ref('一段错误填写的内容');
const text3 = ref('不可编辑文字');
</script>

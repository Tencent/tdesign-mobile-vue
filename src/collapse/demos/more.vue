<template>
  <div>
    <t-collapse default-expand-all expand-icon>
      <t-collapse-panel v-for="(p, i) in panels" :key="i" v-bind="p" :expand-icon="true"> </t-collapse-panel>
    </t-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const panelsValue = [
  {
    header: '折叠面板标题',
    value: '0',
    content: '一段很长很长的内容文字',
  },
  {
    header: '折叠面板标题',
    value: '1',
    content: '一段很长很长的内容文字',
  },
  {
    header: '折叠面板标题',
    value: '2',
    content: '一段很长很长的内容文字',
  },
  {
    header: '折叠面板标题',
    value: '3',
    content: '一段很长很长的内容文字',
  },
];
const panels = ref(panelsValue);
</script>

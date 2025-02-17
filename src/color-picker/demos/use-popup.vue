<template>
  <div style="margin: 0 20px">
    <t-button block theme="primary" size="large" variant="outline" t-class="wrapper" @click="onShow">展示</t-button>
  </div>
  <t-color-picker use-popup :visible="visible" type="multiple" />
</template>
<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const onShow = () => {
  visible.value = true;
};
</script>

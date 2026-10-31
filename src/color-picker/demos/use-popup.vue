<template>
  <div style="margin: 0 20px">
    <t-button block theme="primary" size="large" variant="outline" t-class="wrapper" @click="onShow">展示</t-button>
  </div>
  <t-popup show-overlay placement="bottom" :visible="visible" :on-visible-change="onClose">
    <t-color-picker v-model="value" enable-alpha type="multiple" />
  </t-popup>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const value = ref('#07c160');
const onShow = () => {
  visible.value = true;
};
const onClose = (newVisible: boolean) => {
  if (!newVisible) {
    visible.value = false;
  }
};
</script>

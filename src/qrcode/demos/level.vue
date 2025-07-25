<template>
  <div style="display: flex; flex-direction: column">
    <t-slider :min="0" :max="3" :value="level" :marks="marks" :on-change="handleTabs" />
    <t-qrcode :level="levelList[level]" value="https://tdesign.gtimg.com/site/tdesign-logo.png" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const levelList = ['L', 'M', 'Q', 'H'];
const level = ref(1);
const marks = ref({
  0: '7%',
  1: '15%',
  2: '25%',
  3: '30%',
});
const handleTabs = (val) => {
  level.value = val;
};
</script>

<template>
  <div style="display: flex; flex-direction: column">
    <div class="button-group">
      <t-button
        v-for="item in levelList"
        :key="item"
        :theme="level === item ? 'light' : 'default'"
        shape="round"
        @click="handleTabs(item)"
      >
        {{ item }}
      </t-button>
    </div>
    <t-qrcode :level="level" value="https://tdesign.gtimg.com/site/tdesign-logo.png" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const levelList = ['L', 'M', 'Q', 'H'];
const level = ref('M');
const handleTabs = (val) => {
  level.value = val;
};
</script>

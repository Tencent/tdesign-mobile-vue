<template>
  <div style="display: flex; flex-direction: column">
    <div class="button-group">
      <t-button
        v-for="item in Object.keys(sizeList)"
        :key="item"
        :theme="size === sizeList[item] ? 'light' : 'default'"
        shape="round"
        @click="handleTabs(sizeList[item])"
      >
        {{ item }}
      </t-button>
    </div>
    <t-qrcode
      level="H"
      :size="size"
      :icon-size="size / 4"
      value="https://tdesign.tencent.com/"
      icon="https://tdesign.gtimg.com/site/tdesign-logo.png"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const sizeList = {
  Small: 108,
  Medium: 160,
  Large: 212,
};
const size = ref(160);

const handleTabs = (val) => {
  size.value = val;
};
</script>

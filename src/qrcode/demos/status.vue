<template>
  <div style="display: flex; flex-direction: column">
    <div class="button-group">
      <t-button
        v-for="item in statusList"
        :key="item"
        :theme="status === item ? 'light' : 'default'"
        shape="round"
        @click="handleTabs(item)"
      >
        {{ item }}
      </t-button>
    </div>
    <t-qrcode value="https://tdesign.tencent.com/" :status="status" :on-refresh="() => console.log('Click Refresh')" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const statusList = ['active', 'expired', 'loading', 'scanned'];
const status = ref('active');

const handleTabs = (val) => {
  status.value = val;
};
</script>

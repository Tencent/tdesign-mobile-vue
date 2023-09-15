<template>
  <t-tab-bar v-model="value" class="wrapper">
    <t-tab-bar-item v-for="item in list" :key="item.value" :value="item.value">
      <template #icon>
        <t-icon :name="item.icon" />
      </template>
    </t-tab-bar-item>
  </t-tab-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Icon as TIcon } from 'tdesign-icons-vue-next';

const value = ref('label_1');
const list = ref([
  { value: 'label_1', label: '首页', icon: 'home' },
  { value: 'label_2', label: '应用', icon: 'app' },
  { value: 'label_3', label: '聊天', icon: 'chat' },
  { value: 'label_4', label: '我的', icon: 'user' },
]);
</script>

<style lang="less" scoped>
:root[theme-mode='dark'] {
  .wrapper {
    --td-tab-bar-color: rgba(0, 0, 0, 0.9);
  }
}

.wrapper {
  --td-tab-bar-border-color: #e7e7e7;
  --td-tab-bar-bg-color: #eee;
  --td-tab-bar-hover-color: #ddd;
  --td-tab-bar-item-color: #bbb;
  --td-tab-bar-item-active-color: #333;
}
</style>

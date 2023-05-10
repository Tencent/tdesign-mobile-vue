<template>
  <t-tab-bar v-model="value" theme="tag" :split="false">
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
  { value: 'label_1', icon: 'home', ariaLabel: '首页' },
  { value: 'label_2', icon: 'app', ariaLabel: '软件' },
  { value: 'label_3', icon: 'chat', ariaLabel: '聊天' },
  { value: 'label_4', icon: 'user', ariaLabel: '我的' },
]);
</script>

<template>
  <t-tab-bar v-model="value" :split="false">
    <t-tab-bar-item
      v-for="item in list"
      :key="item.name"
      :value="item.name"
      :badge-props="item.badgeProps"
      :aria-label="item.ariaLabel"
    >
      {{ item.text }}
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
  { name: 'label_1', text: '首页', icon: 'home', badgeProps: { count: 16 }, ariaLabel: '首页，有16条消息' },
  { name: 'label_2', text: '软件', icon: 'app', badgeProps: { dot: true }, ariaLabel: '软件，有新的消息' },
  { name: 'label_3', text: '聊天', icon: 'chat', badgeProps: { count: 'New' }, ariaLabel: '聊天，New' },
  { name: 'label_4', text: '我的', icon: 'user', badgeProps: { count: '···' }, ariaLabel: '我的，有很多消息' },
]);
</script>

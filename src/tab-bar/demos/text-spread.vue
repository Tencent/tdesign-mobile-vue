<template>
  <t-tab-bar default-value="home" theme="tag" :split="false" @change="change">
    <t-tab-bar-item v-for="item in list" :key="item.value" :value="item.value" :sub-tab-bar="item.children">
      {{ item.label }}
    </t-tab-bar-item>
  </t-tab-bar>
</template>

<script setup lang="ts">
const list = [
  {
    value: 'home',
    label: '首页',
    icon: 'home',
  },
  {
    value: 'app',
    label: '应用',
    icon: 'app',
  },
  {
    value: 'user',
    label: '我的',
    children: [
      {
        value: 'info',
        label: '基本信息',
      },
      {
        value: 'home-page',
        label: '个人主页',
      },
      {
        value: 'setting',
        label: '设置',
      },
    ],
  },
];

const change = (changeValue: number | string) => {
  console.log('TabBar 值改变为：', changeValue);
};
</script>

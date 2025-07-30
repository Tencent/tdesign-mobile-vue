<template>
  <t-cell arrow title="带标题选择器" @click="handleVisible(true)" />
  <t-cell arrow title="无标题选择器" @click="handleVisible(false)" />

  <t-popup v-model="visible" placement="bottom">
    <t-picker v-model="area" :columns="options" :title="title" @confirm="visible = false" @cancel="visible = false" />
  </t-popup>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
const area = ref([]);
const title = ref('');
const options = [
  [
    {
      label: '北京市',
      value: '北京市',
    },
    {
      label: '上海市',
      value: '上海市',
    },
    {
      label: '广州市',
      value: '广州市',
    },
    {
      label: '深圳市',
      value: '深圳市',
    },
  ],
];

const handleVisible = (bool: boolean) => {
  title.value = bool ? '选择城市' : '';
  visible.value = true;
};
</script>

<style scoped>
.t-cell {
  margin-bottom: 16px;
}
</style>

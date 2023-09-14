<template>
  <div class="demo-tab-bar">
    <t-tabs :value="currentValue" :list="list" @change="onChange">
      <t-tab-panel v-for="item in list" :key="item.value" :value="item.value">
        <p>{{ item.panel }}</p>
      </t-tab-panel>
    </t-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const currentValue = ref('1');
const list = [
  {
    value: '1',
    label: '选项',
    panel: '内容区',
  },
  {
    value: '2',
    label: '选项',
    panel: '内容区',
  },
  {
    value: '3',
    label: '上限六个文字',
    panel: '内容区',
  },
];

const onChange = (value: string) => {
  currentValue.value = value;
  console.log(`change to ${value}`);
};
</script>

<style lang="less" scoped>
.t-tabs {
  margin-bottom: 16px;
}

.t-tabs__panel p {
  height: 120px;
  align-items: center;
  justify-content: center;
  display: flex;
  color: var(--td-text-color-secondary, rgba(#000000, 0.66));
  margin: 0;
  font-size: 14px;
  font-weight: 400;
}
</style>

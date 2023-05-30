<template>
  <div>
    <t-table
      row-key="index"
      layout-table="auto"
      :data="data"
      :columns="columns"
      :show-header="showHeader"
      cell-empty-content="-"
      @row-click="handleRowClick"
      @cell-click="handleCellClick"
      @scroll="handleScroll"
    ></t-table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const data: any[] = [];
const total = 5;
for (let i = 0; i < total; i++) {
  data.push({
    index: i + 1,
    applicant: ['横向平铺内容不省略', '内容', '内容'][i % 3],
    status: ['横向平铺内容不省略', '内容', '内容'][i % 3],
    channel: ['横向平铺内容不省略', '内容', '内容'][i % 3],
    detail: {
      email: ['横向平铺内容不省略', '内容', '内容'][i % 3],
    },
  });
}

const stripe = ref(true);
const bordered = ref(true);
const showHeader = ref(true);

const columns = ref([
  { colKey: 'applicant', title: '标题', align: 'center', width: 180 },
  {
    colKey: 'status',
    title: '标题',
    width: 180,
  },
  { colKey: 'channel', title: '标题', width: 180 },
  { colKey: 'detail.email', title: '标题', width: 180 },
]);

const handleRowClick = (e: any) => {
  console.log('row-cliek=====', e);
};

const handleCellClick = (e: any) => {
  console.log('cell-cliek=====', e);
};

const handleScroll = (e: any) => {
  console.log('scroll=====', e);
};
</script>

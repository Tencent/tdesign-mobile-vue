<template>
  <div>
    <t-table
      row-key="index"
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
const total = 10;
for (let i = 0; i < total; i++) {
  data.push({
    index: i + 1,
    applicant: ['内容', '内容', '内容'][i % 3],
    status: ['内容', '内容', '内容'][i % 3],
    channel: ['内容', '内容', '内容'][i % 3],
    detail: {
      email: ['内容', '内容', '内容内容内容'][i % 3],
    },
  });
}

const stripe = ref(true);
const bordered = ref(true);
const showHeader = ref(true);

const columns = ref([
  { colKey: 'applicant', title: '标题', ellipsis: true },
  {
    colKey: 'status',
    title: '标题',
    ellipsis: true,
  },
  { colKey: 'channel', title: '标题', ellipsis: true },
  { colKey: 'detail.email', title: '标题', ellipsis: true },
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

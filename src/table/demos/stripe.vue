<template>
  <div>
    <t-table
      :fixed-rows="[1, 2]"
      row-key="index"
      :data="data"
      :max-height="400"
      :columns="columns"
      :stripe="stripe"
      :show-header="showHeader"
      cell-empty-content="-"
      @row-click="handleRowClick"
      @cell-click="handleCellClick"
      @scroll="handleScroll"
    ></t-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue';

const data: any[] = [];
const total = 20;
for (let i = 0; i < total; i++) {
  const content = ['内容', '内容', '内容', '内容', '内容'][i % 5];
  data.push({
    index: i + 1,
    applicant: content,
    status: content,
    channel: content,
    detail: {
      email: content,
    },
    operation: content,
    more: content,
  });
}

const stripe = ref(true);
const showHeader = ref(true);

const columns = ref([
  { colKey: 'applicant', title: '标题', fixed: 'left' },
  {
    colKey: 'status',
    title: '标题',
  },
  { colKey: 'channel', title: '标题' },
  { colKey: 'detail.email', title: '标题', ellipsis: true },
  { colKey: 'operation', title: '标题' },
  { colKey: 'more', title: '标题', fixed: 'right' },
]);

const handleRowClick = (e: any) => {
  console.log('row-click=====', e);
};

const handleCellClick = (e: any) => {
  console.log('cell-click=====', e);
};

const handleScroll = (e: any) => {
  console.log('scroll=====', e);
};
</script>

<template>
  <div>
    <t-table
      row-key="index"
      :data="data"
      :columns="columns"
      :drag-sort="dragSort"
      cell-empty-content="-"
      @drag-sort="handleDragSort"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const data = ref([
  {
    index: 1,
    applicant: '内容1',
    status: '内容2',
    channel: '内容3',
    detail: {
      email: '内容内容内容123',
    },
  },
  {
    index: 2,
    applicant: '内容4',
    status: '内容5',
    channel: '内容6',
    detail: {
      email: '内容内容内容123',
    },
  },
  {
    index: 3,
    applicant: '内容7',
    status: '内容8',
    channel: '内容9',
    detail: {
      email: '内容内容内容123',
    },
  },
]);

const dragSort = ref('row');

const columns = ref([
  { colKey: 'applicant', title: '标题', ellipsis: true },
  {
    colKey: 'status',
    title: '标题',
    ellipsis: true,
  },
  {
    colKey: 'channel',
    title: '标题',
    ellipsis: true,
  },
  {
    colKey: 'detail.email',
    title: '标题',
    ellipsis: true,
  },
]);

const handleDragSort = (context: any) => {
  console.log('[drag-sort]', context);
  if (context.newData) {
    data.value = context.newData;
  }
};
</script>

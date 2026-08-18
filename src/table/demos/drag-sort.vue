<template>
  <div>
    <t-primary-table
      row-key="index"
      :data="data"
      :columns="columns"
      drag-sort="row"
      cell-empty-content="-"
      show-header
      @drag-sort="onDragSort"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { DragSortContext, PrimaryTableCol, TableRowData } from 'tdesign-mobile-vue';

const data = ref([
  {
    index: 1,
    applicant: '内容1',
    status: '内容2',
    channel: '内容3',
    detail: { email: '内容内容内容123' },
  },
  {
    index: 2,
    applicant: '内容4',
    status: '内容5',
    channel: '内容6',
    detail: { email: '内容内容内容123' },
  },
  {
    index: 3,
    applicant: '内容7',
    status: '内容8',
    channel: '内容9',
    detail: { email: '内容内容内容123' },
  },
]);

const columns: PrimaryTableCol[] = [
  { colKey: 'applicant', title: '标题', ellipsis: true },
  { colKey: 'status', title: '标题', ellipsis: true },
  { colKey: 'channel', title: '标题', ellipsis: true },
  { colKey: 'detail.email', title: '标题', ellipsis: true },
];

// dragSort="row" 时，拖拽排序结束后需要在 onDragSort 中更新 data，界面才会呈现排序后的最新顺序
const onDragSort = (params: DragSortContext<TableRowData>) => {
  data.value = params.newData as typeof data.value;
};
</script>

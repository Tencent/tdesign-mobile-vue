<template>
  <div class="loading-example-table">
    <div class="loading-example-title">上拉加载</div>
    <t-primary-table
      row-key="index"
      :data="data"
      :columns="columns"
      cell-empty-content="-"
      show-header
      :pagination="{ total, defaultPageSize: 5 }"
    >
      <template #projTag="{ row }">
        <t-tag theme="success" variant="light">{{ row.projTag }}</t-tag>
      </template>
      <template #options="{ col, row }">
        <div class="loading-cell-options">
          <t-button theme="primary" variant="text" size="small">{{ row[col.colKey].admin }}</t-button>
          <t-button theme="primary" variant="text" size="small">{{ row[col.colKey].delete }}</t-button>
        </div>
      </template>
    </t-primary-table>

    <div class="loading-example-title">分页加载</div>
    <t-primary-table
      row-key="index"
      :data="data"
      :columns="columns"
      cell-empty-content="-"
      show-header
      loading-mode="pagination"
      :pagination="{ total, defaultPageSize: 5 }"
    >
      <template #projTag="{ row }">
        <t-tag theme="success" variant="light">{{ row.projTag }}</t-tag>
      </template>
      <template #options="{ col, row }">
        <div class="loading-cell-options">
          <t-button theme="primary" variant="text" size="small">{{ row[col.colKey].admin }}</t-button>
          <t-button theme="primary" variant="text" size="small">{{ row[col.colKey].delete }}</t-button>
        </div>
      </template>
    </t-primary-table>
  </div>
</template>

<script lang="ts" setup>
import type { PrimaryTableCol } from 'tdesign-mobile-vue';

const total = 9;
const data: any[] = [];
for (let i = 0; i < total; i++) {
  data.push({
    index: i + 1,
    projName: ['项目名称', '项目名称', '项目名称'][i % 3],
    projTag: ['默认标签', '默认标签', '默认标签'][i % 3],
    options: {
      admin: ['管理', '管理', '管理'][i % 3],
      delete: ['删除', '删除', '删除'][i % 3],
    },
  });
}

const columns: PrimaryTableCol[] = [
  { colKey: 'projName', title: '项目名称', width: 80, ellipsis: true },
  {
    colKey: 'projTag',
    title: '项目名称',
    width: 80,
    cell: 'projTag',
  },
  {
    colKey: 'options',
    title: '操作',
    align: 'center',
    className: 'example-table-options',
    cell: 'options',
  },
];
</script>

<style scoped>
.loading-example-table .loading-example-title {
  font-size: 14px;
  margin: 24px 0 16px;
  color: var(--td-text-color-secondary);
}

.loading-example-table .loading-cell-options {
  display: flex;
  align-items: center;
}

.loading-example-table :deep(.example-table-options) {
  padding: 8px 0;
}
</style>

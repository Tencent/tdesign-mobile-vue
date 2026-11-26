<template>
  <div class="loading-example-table">
    <div class="loading-example-title">上拉加载</div>
    <t-table
      row-key="index"
      :data="data"
      :columns="columns"
      cell-empty-content="vvv"
      :pagination="{ total, defaultPageSize: 5 }"
    />
    <div class="loading-example-title">分页加载</div>
    <t-table
      row-key="index"
      :data="data"
      :columns="columns"
      loading-mode="pagination"
      cell-empty-content="vvv"
      :pagination="{ total, defaultPageSize: 5 }"
    />
  </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';
import { BaseTableColumns } from 'tdesign-mobile-vue';

const data: any[] = [];
const total = 9;
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

const columns = ref<BaseTableColumns>([
  { colKey: 'projName', title: '项目名称', width: 80, ellipsis: true },
  {
    colKey: 'projTag',
    title: '项目名称',
    width: 80,
    cell: (_h, { row }) => (
      <t-tag theme="success" variant="light">
        {row.projTag}
      </t-tag>
    ),
  },
  {
    colKey: 'options',
    title: '操作',
    align: 'center',
    className: 'example-table-options',
    cell: (_h, { col, row }) => (
      <div class="loading-cell-options">
        <t-button theme="primary" variant="text" size="small">
          {row[col.colKey].admin}
        </t-button>
        <t-button theme="primary" variant="text" size="small">
          {row[col.colKey].delete}
        </t-button>
      </div>
    ),
  },
]);
</script>

<style lang="less" scoped>
.loading-example-table {
  .loading-example-title {
    font-size: 14px;
    margin: 24px 0 16px;
    color: var(--td-text-color-secondary);
  }
}
</style>

<style lang="less">
.loading-example-table {
  .t-table td .loading-cell-options {
    display: flex;
    align-items: center;
  }

  .t-table .example-table-options {
    padding: 8px 0;
  }
}
</style>

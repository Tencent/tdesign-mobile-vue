<template>
  <div class="loading-example-table select-example">
    <div class="loading-example-title">单选</div>
    <t-table
      row-key="index"
      :data="data"
      :columns="singleSelectColumns"
      cell-empty-content="-"
      show-header
      select-on-row-click
      :selected-row-keys="selectRow1"
      @select-change="(v) => handleSelectChange(1, v)"
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
    </t-table>

    <div class="loading-example-title">多选</div>
    <t-table
      row-key="index"
      :data="data"
      :columns="multipleSelectColumns"
      cell-empty-content="-"
      show-header
      select-on-row-click
      :selected-row-keys="selectRow2"
      @select-change="(v) => handleSelectChange(2, v)"
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
    </t-table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { PrimaryTableCol } from 'tdesign-mobile-vue';

const selectRow1 = ref<(string | number)[]>([]);
const selectRow2 = ref<(string | number)[]>([]);

const total = 5;
const data: any[] = [];
for (let i = 0; i < total; i++) {
  data.push({
    index: i + 1,
    projName: ['项目名称1', '项目名称2', '项目名称3'][i % 3],
    projTag: ['默认标签', '默认标签', '默认标签'][i % 3],
    options: {
      admin: ['管理', '管理', '管理'][i % 3],
      delete: ['删除', '删除', '删除'][i % 3],
    },
  });
}

const globalColumns: PrimaryTableCol[] = [
  { colKey: 'projName', title: '项目名称', width: 80 },
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

const singleSelectColumns: PrimaryTableCol[] = [{ colKey: 'projSelect', type: 'single', width: 30 }, ...globalColumns];

const multipleSelectColumns: PrimaryTableCol[] = [
  { colKey: 'projSelect', type: 'multiple', width: 30 },
  ...globalColumns,
];

const handleSelectChange = (tableIndex: number, selectKeys: (number | string)[]) => {
  console.log('row-select=====', selectKeys);
  if (tableIndex === 1) {
    selectRow1.value = selectKeys;
  } else {
    selectRow2.value = selectKeys;
  }
};
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

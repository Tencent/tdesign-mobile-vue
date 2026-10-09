<template>
  <div class="loading-example-table select-example">
    <div class="loading-example-title">单选</div>
    <t-table
      row-key="index"
      :data="data"
      :columns="singleSelectColumns"
      :selected-row-keys="selectRow1"
      cell-empty-content="-"
      select-on-row-click
      @select-change="(v) => handleSelectChange(1, v)"
    />
    <div class="loading-example-title">多选</div>
    <t-table
      row-key="index"
      :data="data"
      :columns="multipleSelectColumns"
      :selected-row-keys="selectRow2"
      cell-empty-content="-"
      select-on-row-click
      @select-change="(v) => handleSelectChange(2, v)"
    />
  </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';

const selectRow1 = ref<(string | number)[]>([]);
const selectRow2 = ref<(string | number)[]>([]);

const data = ref<any[]>([]);
const total = 5;
for (let i = 0; i < total; i++) {
  data.value.push({
    index: i + 1,
    projName: ['项目名称1', '项目名称2', '项目名称3'][i % 3],
    projTag: ['默认标签', '默认标签', '默认标签'][i % 3],
    options: {
      admin: ['管理', '管理', '管理'][i % 3],
      delete: ['删除', '删除', '删除'][i % 3],
    },
  });
}

const globalColumns = [
  { colKey: 'projName', title: '项目名称', width: 80 },
  {
    colKey: 'projTag',
    title: '项目名称',
    width: 80,
    cell: (h: any, { row }: any) => (
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
    cell: (h: any, { col, row }: any) => (
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
];

const singleSelectColumns = ref([{ colKey: 'row-select', type: 'single', width: 30 }, ...globalColumns]);

const multipleSelectColumns = ref([{ colKey: 'row-select', type: 'multiple', width: 30 }, ...globalColumns]);

const handleSelectChange = (tableIndex: number, selectKeys: (number | string)[]) => {
  console.log('[row-select]', selectKeys);
  if (tableIndex === 1) {
    selectRow1.value = selectKeys;
  } else {
    selectRow2.value = selectKeys;
  }
};
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

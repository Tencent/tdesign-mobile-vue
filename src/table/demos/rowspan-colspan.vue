<template>
  <t-table
    row-key="index"
    :data="data"
    :columns="columns"
    :rowspan-and-colspan="rowspanAndColspan"
    bordered
    cell-empty-content="-"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { BaseTableColumns } from 'tdesign-mobile-vue';

const columns = ref<BaseTableColumns>([
  { colKey: 'index', title: '序号', width: 60 },
  { colKey: 'name', title: '姓名' },
  { colKey: 'department', title: '部门' },
  { colKey: 'status', title: '状态' },
]);

const data = [
  { index: 1, name: '张三', department: '研发部', status: '在职' },
  { index: 2, name: '李四', department: '研发部', status: '在职' },
  { index: 3, name: '王五', department: '设计部', status: '离职' },
  { index: 4, name: '赵六', department: '产品部', status: '在职' },
];

// 合并规则：
// 1. 第1-2行的"部门"列合并（rowspan）
// 2. 第3行的"姓名"和"部门"列合并（colspan）
const rowspanAndColspan = ({ rowIndex, colIndex }: { rowIndex: number; colIndex: number }) => {
  // 第1行第2列（部门）：向下合并2行
  if (rowIndex === 0 && colIndex === 2) {
    return { rowspan: 2, colspan: 1 };
  }
  // 第2行第2列（部门）：被上面合并，不渲染
  if (rowIndex === 1 && colIndex === 2) {
    return { rowspan: 0, colspan: 0 };
  }
  // 第3行第1列（姓名）：向右合并2列
  if (rowIndex === 2 && colIndex === 1) {
    return { rowspan: 1, colspan: 2 };
  }
  // 第3行第2列（部门）：被左边合并，不渲染
  if (rowIndex === 2 && colIndex === 2) {
    return { rowspan: 0, colspan: 0 };
  }
  return {};
};
</script>

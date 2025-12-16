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
    >
      <!-- 插槽方式 自定义单元格：cell 的值为插槽名称，参数有：{col, colIndex, row, rowIndex}  -->
      <template #cell-slot-name="{ col, row }"> {{ row[col.colKey] }}</template>

      <!-- 插槽方式 自定义单元格， colKey 的值默认为插槽名称  -->
      <template #status="{ col, row }"> {{ row[col.colKey] }} </template>

      <!-- 插槽方式 自定义表头：title 的值为插槽名称  -->
      <template #title-slot-name> 标题 </template>
    </t-table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { UserCircleIcon } from 'tdesign-icons-vue-next';
import { BaseTableColumns } from 'tdesign-mobile-vue';

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

const showHeader = ref(true);

const columns = ref<BaseTableColumns>([
  {
    colKey: 'applicant',
    title: '标题',
    cell: (_, { col, row }) => row[col.colKey],
    ellipsis: true,
  },
  {
    colKey: 'status',
    title: 'title-slot-name',
    ellipsis: true,
  },
  {
    colKey: 'channel',
    title: '标题',
    cell: 'cell-slot-name',
    ellipsis: true,
  },
  {
    colKey: 'detail.email',
    title: '标题',
    ellipsis: true,
    // render 可以渲染表头，也可以渲染单元格
    render(_, context) {
      const { type } = context;
      return {
        title: '标题',
        cell: '内容',
      }[type];
    },
  },
]);

const handleRowClick = (e: any) => {
  console.log('[row-click]', e);
};

const handleCellClick = (e: any) => {
  console.log('[cell-click]', e);
};

const handleScroll = (e: any) => {
  console.log('[scroll]', e);
};
</script>

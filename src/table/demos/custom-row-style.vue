<template>
  <div class="example-table">
    <!-- row-class-name 设置行类名 -->
    <!-- row-attributes 透传 style 属性到 tr -->
    <t-table
      row-key="id"
      :row-attributes="rowAttributes"
      :data="data"
      :columns="columns"
      :row-class-name="getRowClassName"
      bordered
    />
  </div>
</template>

<script lang="jsx" setup>
import { ref } from 'vue';
import { ErrorCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue-next';

const statusNameListMap = {
  0: { label: '审批通过', theme: 'success', icon: <CheckCircleFilledIcon /> },
  1: { label: '审批失败', theme: 'danger', icon: <CloseCircleFilledIcon /> },
  2: { label: '审批过期', theme: 'warning', icon: <ErrorCircleFilledIcon /> },
};

const data = [];
const total = 5;
for (let i = 0; i < total; i++) {
  data.push({
    applicant: ['贾明', '张三', '王芳'][i % 3],
    status: i % 3,
    channel: ['电子签署', '纸质签署', '纸质签署'][i % 3],
    detail: {
      email: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
    },
    matters: ['宣传物料制作费用', 'algolia 服务报销', '相关周边制作费', '激励奖品快递费'][i % 4],
    time: [2, 10, 1][i % 3],
  });
}

const columns = ref([
  { colKey: 'applicant', title: '申请人', width: 100, fixed: 'left' },
  {
    colKey: 'status',
    title: '审批状态',
    width: 120,
    cell: (h, { row }) => {
      return (
        <t-tag shape="round" theme={statusNameListMap[row.status].theme} variant="light-outline">
          {statusNameListMap[row.status].icon}
          {statusNameListMap[row.status].label}
        </t-tag>
      );
    },
  },
  {
    colKey: 'time',
    title: '申请耗时(天)',
    width: 120,
    align: 'center',
    // 设置单元格类名
    className: ({ row }) => {
      if (row.time >= 9) {
        return 'custom-cell-class-name';
      }
      return '';
    },
    attrs: ({ row }) => {
      if (row.time >= 9) {
        return {
          style: {
            fontWeight: 600,
            backgroundColor: 'var(--td-warning-color-light)',
          },
        };
      }
    },
  },
  {
    colKey: 'channel',
    title: '签署方式',
    width: 100,
    align: 'right',
    className: () => {
      return 'custom-cell-class-name';
    },
  },
  { colKey: 'detail.email', title: '邮箱地址', width: 160, ellipsis: true },
]);

const getRowClassName = ({ rowIndex }) => {
  if (rowIndex === 1) return 'custom-third-class-name';
  return '';
};

const rowAttributes = ({ rowIndex }) => {
  if (rowIndex === 3)
    return {
      style: 'background-color: #f1ebec',
    };
  return '';
};
</script>

<style>
.example-table .t-table .custom-third-class-name > td {
  background-color: var(--td-brand-color-light);
  font-weight: bold;
}

.example-table .t-table td.last-column-class-name {
  color: orange;
}

.t-table td.custom-cell-class-name {
  color: orange;
  font-weight: bold;
}
.t-table__row-filter-inner {
  display: flex;
  align-items: center;
  justify-content: center;
}
.t-table__row-filter-inner svg {
  margin-right: 8px;
}
</style>

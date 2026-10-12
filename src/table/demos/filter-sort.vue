<template>
  <div>
    <t-table
      row-key="key"
      :data="data"
      :columns="columns"
      :sort="sort"
      :filter-value="filterValue"
      cell-empty-content="暂无数据"
      :pagination="{ defaultCurrent: 1, defaultPageSize: 5, showJumper: true, pageSizeOptions: [1, 3, 5, 10] }"
      @filter-change="onFilterChange"
      @sort-change="onSortChange"
      @change="onChange"
    />
  </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';
import { isNumber } from 'lodash-es';

const statusNameListMap: Record<number, { label: string; theme: string }> = {
  0: { label: '审批通过', theme: 'success' },
  1: { label: '审批失败', theme: 'danger' },
  2: { label: '审批过期', theme: 'warning' },
};

const initData = new Array(5).fill(null).map((_, i) => ({
  key: String(i + 1),
  applicant: ['贾明', '张三', '王芳'][i % 3],
  status: i % 3,
  channel: ['电子签署', '纸质签署', '纸质签署'][i % 3],
  email: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
  matters: ['宣传物料制作费用', 'algolia 服务报销', '相关周边制作费', '激励奖品快递费'][i % 4],
  time: [2, 3, 1, 4][i % 4],
  createTime: [20220101, 20220201, 20220301, 20220401, 20220501][i % 4],
}));

const data = ref([...initData]);
const filterValue = ref<Record<string, any>>({
  lastName: [],
});
const sort = ref<any>();

const columns = ref([
  { colKey: 'applicant', title: '申请人', align: 'center' },
  {
    title: '申请状态',
    colKey: 'status',
    width: 120,
    align: 'center',
    filter: {
      type: 'single',
      list: [
        { label: '审批通过', value: 0 },
        { label: '已过期', value: 1 },
        { label: '审批失败', value: 2 },
      ],
      showConfirmAndReset: true,
    },
    cell: (h, { row }) => (
      <t-tag theme={statusNameListMap[row.status].theme} variant="light">
        {statusNameListMap[row.status].label}
      </t-tag>
    ),
  },
  {
    title: '签署方式',
    colKey: 'channel',
    width: 120,
    align: 'center',
    filter: {
      type: 'multiple',
      resetValue: [],
      list: [
        { label: 'All', checkAll: true },
        { label: '电子签署', value: '电子签署' },
        { label: '纸质签署', value: '纸质签署' },
      ],
      showConfirmAndReset: true,
    },
  },
  {
    title: 'Email',
    colKey: 'email',
    width: 180,
    align: 'center',
    filter: {
      type: 'input',
      resetValue: '',
      confirmEvents: ['onEnter'],
      props: { placeholder: '输入关键词过滤' },
      showConfirmAndReset: true,
    },
  },
  {
    title: 'Date',
    colKey: 'createTime',
    width: 100,
    align: 'center',
    sorter: true,
  },
]);

const request = (filters: Record<string, any>) => {
  const timer = setTimeout(() => {
    clearTimeout(timer);
    const newData = initData.filter((item) => {
      let result = true;
      if (isNumber(filters.status)) {
        result = item.status === filters.status;
      }
      if (result && filters.channel && filters.channel.length) {
        result = filters.channel.includes(item.channel);
      }
      if (result && filters.email) {
        result = item.email.indexOf(filters.email) !== -1;
      }
      if (result && filters.createTime && filters.createTime.length) {
        result = item.createTime === filters.createTime;
      }
      return result;
    });
    data.value = newData;
  }, 100);
};

const sortRequest = (sortInfo: any) => {
  const timer = setTimeout(() => {
    if (!sortInfo || !sortInfo.sortBy) {
      data.value = [...initData];
      return;
    }
    const dataNew = initData
      .concat()
      .sort((a, b) =>
        sortInfo.descending ? b[sortInfo.sortBy] - a[sortInfo.sortBy] : a[sortInfo.sortBy] - b[sortInfo.sortBy],
      );
    data.value = [...dataNew];
    clearTimeout(timer);
  }, 100);
};

const onFilterChange = (filters: Record<string, any>, col: any) => {
  console.log(filters, col);
  filterValue.value = {
    ...filters,
    createTime: filters.createTime || [],
    lastName: filters.lastName || [],
  };
  request(filters);
};

const onSortChange = (sortInfo: any) => {
  sort.value = sortInfo;
  sortRequest(sortInfo);
};

const onChange = (info: any, context: any) => {
  console.log('onChange', info, context);
};
</script>

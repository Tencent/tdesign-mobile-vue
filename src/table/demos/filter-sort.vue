<template>
  <div>
    <t-primary-table
      row-key="key"
      :data="data"
      :columns="columns"
      :sort="sort"
      :filter-value="filterValue"
      cell-empty-content="暂无数据"
      show-header
      :pagination="{ defaultCurrent: 1, defaultPageSize: 5 }"
      @filter-change="onFilterChange"
      @sort-change="onSortChange"
      @change="onChange"
    >
      <!-- 插槽方式自定义单元格，colKey 的值默认为插槽名称 -->
      <template #status="{ row }">
        <t-tag :theme="statusNameListMap[row.status].theme" variant="light">
          {{ statusNameListMap[row.status].label }}
        </t-tag>
      </template>
    </t-primary-table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { FilterValue, PrimaryTableCol, SortInfo, TableSort } from 'tdesign-mobile-vue';

const statusNameListMap: Record<number, { label: string; theme: 'success' | 'danger' | 'warning' }> = {
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
const filterValue = ref<FilterValue>({ channel: [] });
const sort = ref<TableSort>();

const columns: PrimaryTableCol[] = [
  { colKey: 'applicant', title: '申请人', align: 'center' },
  {
    title: '申请状态',
    colKey: 'status',
    width: 120,
    align: 'center',
    cell: 'status',
    // 单选过滤配置
    filter: {
      type: 'single',
      resetValue: '',
      list: [
        { label: '审批通过', value: 0 },
        { label: '审批失败', value: 1 },
        { label: '审批过期', value: 2 },
      ],
      showConfirmAndReset: true,
    },
  },
  {
    title: '签署方式',
    colKey: 'channel',
    width: 130,
    align: 'center',
    // 多选过滤配置
    filter: {
      type: 'multiple',
      resetValue: [],
      list: [
        { label: '全选', checkAll: true },
        { label: '电子签署', value: '电子签署' },
        { label: '纸质签署', value: '纸质签署' },
      ],
      // 是否显示重置、确认按钮，一般用于不希望值立即生效的场景
      showConfirmAndReset: true,
    },
  },
  {
    title: 'Email',
    colKey: 'email',
    width: 180,
    align: 'center',
    ellipsis: true,
    // 输入框过滤配置
    filter: {
      type: 'input',
      resetValue: '',
      // 输入框失焦时触发确认搜索（mobile 版 Input 组件暂未提供 enter 事件，因此使用 onBlur 替代）
      confirmEvents: ['onBlur'],
      props: { placeholder: '输入关键词过滤' },
      showConfirmAndReset: true,
    },
  },
  {
    title: '创建时间',
    colKey: 'createTime',
    width: 110,
    align: 'center',
    // 用于查看同时存在排序和过滤时的图标显示是否正常
    sorter: true,
  },
];

// 模拟远程筛选：真实业务场景中一般为接口请求
const request = (filters: FilterValue) => {
  const newData = initData.filter((item) => {
    let result = true;
    if (typeof filters.status === 'number' || filters.status === '0') {
      result = String(item.status) === String(filters.status);
    }
    if (result && filters.channel && filters.channel.length) {
      result = filters.channel.includes(item.channel);
    }
    if (result && filters.email) {
      result = item.email.indexOf(filters.email) !== -1;
    }
    return result;
  });
  data.value = newData;
};

const onFilterChange = (filters: FilterValue) => {
  filterValue.value = {
    ...filters,
    channel: filters.channel || [],
  };
  request(filters);
};

const onSortChange = (sortInfo: SortInfo) => {
  sort.value = sortInfo;
  if (!sortInfo || !sortInfo.sortBy) {
    data.value = [...initData];
    return;
  }
  data.value = initData
    .concat()
    .sort((a: any, b: any) =>
      sortInfo.descending ? b[sortInfo.sortBy] - a[sortInfo.sortBy] : a[sortInfo.sortBy] - b[sortInfo.sortBy],
    );
};

const onChange = (info: any, context: any) => {
  console.log('onChange', info, context);
};
</script>

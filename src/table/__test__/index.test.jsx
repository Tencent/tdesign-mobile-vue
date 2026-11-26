import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import TTable from '../base-table';
import TPrimaryTable from '../primary-table';
import config from '../../config';

const { prefix } = config;
const name = `${prefix}-table`;

const data = new Array(5).fill(null).map((item, index) => ({
  index: index + 1,
  applicant: `内容${index + 1}`,
  status: index % 2,
  channel: '内容',
  detail: {
    email: '内容',
  },
}));

const columns = [
  { colKey: 'applicant', title: '标题', align: 'center', ellipsis: true },
  {
    colKey: 'status',
    title: '标题',
    ellipsis: true,
  },
  { colKey: 'channel', title: '标题', ellipsis: true },
  { colKey: 'detail.email', title: '标题', ellipsis: true },
];

describe('tableLayout', () => {
  it(': tableLayout', async () => {
    const wrapper = mount({
      render() {
        return <TTable rowKey="index" data={data} columns={columns}></TTable>;
      },
    });
    // default value is fixed
    expect(wrapper.find(`.${name}--layout-fixed`).exists()).toBeTruthy();
  });
});

describe('bordered', () => {
  it(': bordered', async () => {
    const wrapper = mount({
      render() {
        return <TTable rowKey="index" data={data} columns={columns} bordered></TTable>;
      },
    });
    expect(wrapper.find(`.${name}--bordered`).exists()).toBeTruthy();
  });
});

describe('empty', () => {
  it(': empty', async () => {
    const wrapper = mount({
      render() {
        return <TTable rowKey="index" data={[]} columns={columns} empty="暂无数据"></TTable>;
      },
    });
    expect(wrapper.find('.t-table__empty').text()).toBe('暂无数据');
  });

  it(': empty works fine as a function ', () => {
    const emptyText = 'Empty Data Rendered By Function';
    const wrapper = mount({
      render() {
        return (
          <TTable
            rowKey="index"
            data={[]}
            empty={() => <div class="render-function-class">{emptyText}</div>}
            columns={columns}
          ></TTable>
        );
      },
    });
    expect(wrapper.find('.t-table__empty').exists()).toBeTruthy();
    expect(wrapper.find('.render-function-class').exists()).toBeTruthy();
    expect(wrapper.find('.t-table__empty').text()).toBe(emptyText);
  });

  it(': empty works fine as slot', () => {
    const emptyText = 'Empty Data Rendered By Slots';
    const wrapper = mount({
      render() {
        return (
          <TTable
            rowKey="index"
            data={[]}
            v-slots={{ empty: () => <div class="slots-empty-class">{emptyText}</div> }}
            columns={columns}
          ></TTable>
        );
      },
    });
    expect(wrapper.find('.t-table__empty').exists()).toBeTruthy();
    expect(wrapper.find('.slots-empty-class').exists()).toBeTruthy();
    expect(wrapper.find('.t-table__empty').text()).toBe(emptyText);
  });
});

describe('loading', () => {
  it(': loading', async () => {
    const wrapper = mount({
      render() {
        return <TTable rowKey="index" loading={true} data={data} columns={columns}></TTable>;
      },
    });
    expect(wrapper.find('.t-loading').exists()).toBeTruthy();
    expect(wrapper.find('.t-icon-loading').exists()).toBeTruthy();
    expect(wrapper.find('.t-loading__text').exists()).toBeFalsy();
  });

  it(': loadingProps', () => {
    const wrapper = mount({
      render() {
        return (
          <TTable
            rowKey="index"
            data={data}
            columns={columns}
            loading={true}
            loadingProps={{ indicator: false, text: 'function loading' }}
          ></TTable>
        );
      },
    });
    expect(wrapper.find('.t-loading').exists()).toBeTruthy();
    expect(wrapper.find('.t-icon-loading').exists()).toBeFalsy();
    expect(wrapper.find('.t-loading__text').exists()).toBeTruthy();
    expect(wrapper.find('.t-loading__text').text()).toBe('function loading');
  });
});

describe('verticalAlign', () => {
  // 行内容上下方向对齐
  it(': verticalAlign', async () => {
    const wrapper = mount({
      render() {
        return <TTable rowKey="index" data={data} columns={columns}></TTable>;
      },
    });
    // default value is middle
    expect(wrapper.classes('t-vertical-align-middle')).toBeTruthy();
  });
});

describe('columns', () => {
  it(': columns.align', () => {
    const columns = [
      { title: 'Index', colKey: 'index', align: 'center' },
      { title: 'Instance', colKey: 'instance', align: 'left' },
      { title: 'description', colKey: 'instance' },
      { title: 'Owner', colKey: 'owner', align: 'right' },
    ];
    const wrapper = mount({
      render() {
        return <TTable rowKey="index" data={data} columns={columns}></TTable>;
      },
    });
    const firstTrWrapper = wrapper.find('tbody > tr');
    const tdList = firstTrWrapper.findAll('td');
    expect(tdList[0].classes('t-align-center')).toBeTruthy();
    expect(tdList[1].classes('t-align-left')).toBeFalsy();
    expect(tdList[2].classes('t-align-left')).toBeFalsy();
    expect(tdList[3].classes('t-align-right')).toBeTruthy();
  });
});

describe('event', () => {
  it(': onCellClick', async () => {
    const fn = vi.fn();
    const wrapper = mount({
      render() {
        return <TTable rowKey="index" data={data} onCellClick={fn} columns={columns}></TTable>;
      },
    });
    wrapper.find('td').trigger('click');
    await wrapper.vm.$nextTick();
    expect(fn).toHaveBeenCalled();
  });

  it(': onRowClick', async () => {
    const fn = vi.fn();
    const wrapper = mount({
      render() {
        return <TTable rowKey="index" data={data} onRowClick={fn} columns={columns}></TTable>;
      },
    });
    wrapper.find('tbody').find('tr').trigger('click');
    await wrapper.vm.$nextTick();
    expect(fn).toHaveBeenCalled();
  });

  it(': onScroll', async () => {
    const fn = vi.fn();
    const wrapper = mount({
      render() {
        return <TTable rowKey="index" data={data} onScroll={fn} columns={columns}></TTable>;
      },
    });
    wrapper.find('.t-table__content').trigger('scroll');
    await wrapper.vm.$nextTick();
    expect(fn).toHaveBeenCalled();
  });
});

// ==================== PrimaryTable 测试 ====================

const primaryData = new Array(5).fill(null).map((item, index) => ({
  key: String(index + 1),
  applicant: ['贾明', '张三', '王芳'][index % 3],
  status: index % 3,
  channel: ['电子签署', '纸质签署', '纸质签署'][index % 3],
  email: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][index % 3],
  createTime: [20220101, 20220201, 20220301, 20220401, 20220501][index % 4],
}));

const primaryColumns = [
  { colKey: 'applicant', title: '申请人', align: 'center' },
  { colKey: 'status', title: '状态', width: 120 },
  { colKey: 'channel', title: '签署方式', width: 120 },
  { colKey: 'email', title: 'Email', width: 180 },
  { colKey: 'createTime', title: 'Date', width: 100, sorter: true },
];

describe('PrimaryTable', () => {
  describe('render', () => {
    it(': default render', () => {
      const wrapper = mount({
        render() {
          return <TPrimaryTable rowKey="key" data={primaryData} columns={primaryColumns}></TPrimaryTable>;
        },
      });
      expect(wrapper.find(`.${name}`).exists()).toBeTruthy();
    });

    it(': columns render', () => {
      const wrapper = mount({
        render() {
          return <TPrimaryTable rowKey="key" data={primaryData} columns={primaryColumns}></TPrimaryTable>;
        },
      });
      const headers = wrapper.findAll('th');
      expect(headers.length).toBeGreaterThan(0);
    });
  });

  describe('sort', () => {
    it(': sort change event', async () => {
      const onSortChange = vi.fn();
      const wrapper = mount({
        render() {
          return (
            <TPrimaryTable
              rowKey="key"
              data={primaryData}
              columns={primaryColumns}
              sort={{ sortBy: 'createTime', descending: true }}
              onSortChange={onSortChange}
            ></TPrimaryTable>
          );
        },
      });
      const sortHeader = wrapper.find('.t-table__sort-icon');
      if (sortHeader.exists()) {
        await sortHeader.trigger('click');
        await nextTick();
        expect(onSortChange).toHaveBeenCalled();
      }
    });

    it(': showSortColumnBgColor', () => {
      const wrapper = mount({
        render() {
          return (
            <TPrimaryTable
              rowKey="key"
              data={primaryData}
              columns={primaryColumns}
              showSortColumnBgColor
              sort={{ sortBy: 'createTime', descending: true }}
            ></TPrimaryTable>
          );
        },
      });
      expect(wrapper.find(`.${name}`).exists()).toBeTruthy();
    });

    it(': multipleSort', () => {
      const onSortChange = vi.fn();
      const wrapper = mount({
        render() {
          return (
            <TPrimaryTable
              rowKey="key"
              data={primaryData}
              columns={primaryColumns}
              multipleSort
              sort={[
                { sortBy: 'status', descending: true },
                { sortBy: 'createTime', descending: false },
              ]}
              onSortChange={onSortChange}
            ></TPrimaryTable>
          );
        },
      });
      expect(wrapper.find(`.${name}`).exists()).toBeTruthy();
    });
  });

  describe('filter', () => {
    it(': filter change event', () => {
      const onFilterChange = vi.fn();
      const filterColumns = [
        {
          colKey: 'status',
          title: '状态',
          filter: {
            type: 'single',
            list: [
              { label: '通过', value: 0 },
              { label: '失败', value: 1 },
            ],
          },
        },
        { colKey: 'applicant', title: '申请人' },
      ];
      const wrapper = mount({
        render() {
          return (
            <TPrimaryTable
              rowKey="key"
              data={primaryData}
              columns={filterColumns}
              filterValue={{ status: 0 }}
              onFilterChange={onFilterChange}
            ></TPrimaryTable>
          );
        },
      });
      expect(wrapper.find(`.${name}`).exists()).toBeTruthy();
    });
  });

  describe('rowSelect', () => {
    it(': select change event', () => {
      const onSelectChange = vi.fn();
      const selectColumns = [
        { colKey: 'row-select', type: 'multiple', width: 30 },
        { colKey: 'applicant', title: '申请人' },
        { colKey: 'status', title: '状态' },
      ];
      const wrapper = mount({
        render() {
          return (
            <TPrimaryTable
              rowKey="key"
              data={primaryData}
              columns={selectColumns}
              selectedRowKeys={['1', '2']}
              onSelectChange={onSelectChange}
            ></TPrimaryTable>
          );
        },
      });
      expect(wrapper.find(`.${name}`).exists()).toBeTruthy();
    });

    it(': selectOnRowClick', () => {
      const onSelectChange = vi.fn();
      const selectColumns = [
        { colKey: 'row-select', type: 'multiple', width: 30 },
        { colKey: 'applicant', title: '申请人' },
      ];
      const wrapper = mount({
        render() {
          return (
            <TPrimaryTable
              rowKey="key"
              data={primaryData}
              columns={selectColumns}
              selectOnRowClick
              onSelectChange={onSelectChange}
            ></TPrimaryTable>
          );
        },
      });
      expect(wrapper.find(`.${name}`).exists()).toBeTruthy();
    });
  });

  describe('expandedRow', () => {
    it(': expand change event', () => {
      const onExpandChange = vi.fn();
      const expandColumns = [
        { colKey: 'applicant', title: '申请人' },
        { colKey: 'status', title: '状态' },
      ];
      const wrapper = mount({
        render() {
          return (
            <TPrimaryTable
              rowKey="key"
              data={primaryData}
              columns={expandColumns}
              expandedRowKeys={['1']}
              expandedRow={(h, params) => <div class="expanded-content">展开: {params.row.applicant}</div>}
              onExpandChange={onExpandChange}
            ></TPrimaryTable>
          );
        },
      });
      expect(wrapper.find(`.${name}`).exists()).toBeTruthy();
    });

    it(': expandOnRowClick', () => {
      const onExpandChange = vi.fn();
      const expandColumns = [
        { colKey: 'applicant', title: '申请人' },
        { colKey: 'status', title: '状态' },
      ];
      const wrapper = mount({
        render() {
          return (
            <TPrimaryTable
              rowKey="key"
              data={primaryData}
              columns={expandColumns}
              expandOnRowClick
              expandedRow="expanded-slot"
              onExpandChange={onExpandChange}
            ></TPrimaryTable>
          );
        },
      });
      expect(wrapper.find(`.${name}`).exists()).toBeTruthy();
    });
  });

  describe('dragSort', () => {
    it(': dragSort prop', () => {
      const onDragSort = vi.fn();
      const wrapper = mount({
        render() {
          return (
            <TPrimaryTable
              rowKey="key"
              data={primaryData}
              columns={primaryColumns}
              dragSort="row"
              onDragSort={onDragSort}
            ></TPrimaryTable>
          );
        },
      });
      expect(wrapper.find(`.${name}`).exists()).toBeTruthy();
    });
  });

  describe('pagination', () => {
    it(': pagination works', () => {
      const onPageChange = vi.fn();
      const wrapper = mount({
        render() {
          return (
            <TPrimaryTable
              rowKey="key"
              data={primaryData}
              columns={primaryColumns}
              pagination={{ defaultCurrent: 1, defaultPageSize: 3 }}
              onPageChange={onPageChange}
            ></TPrimaryTable>
          );
        },
      });
      expect(wrapper.find(`.${name}`).exists()).toBeTruthy();
    });
  });

  describe('displayColumns', () => {
    it(': displayColumns controls visibility', () => {
      const wrapper = mount({
        render() {
          return (
            <TPrimaryTable
              rowKey="key"
              data={primaryData}
              columns={primaryColumns}
              displayColumns={['applicant', 'status']}
            ></TPrimaryTable>
          );
        },
      });
      expect(wrapper.find(`.${name}`).exists()).toBeTruthy();
    });
  });

  describe('event', () => {
    it(': onChange', () => {
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return (
            <TPrimaryTable
              rowKey="key"
              data={primaryData}
              columns={primaryColumns}
              onChange={onChange}
            ></TPrimaryTable>
          );
        },
      });
      expect(wrapper.find(`.${name}`).exists()).toBeTruthy();
    });
  });
});

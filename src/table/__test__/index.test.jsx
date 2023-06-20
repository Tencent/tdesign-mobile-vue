import { mount } from '@vue/test-utils';
import TTable from '../base-table.vue';
import config from '../../config';
import { nextTick } from 'vue';

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

  it(': loading works fine as function', async () => {
    const wrapper = mount({
      render() {
        return <TTable rowKey="index" loading={() => 'loading text'} data={data} columns={columns}></TTable>;
      },
    });
    expect(wrapper.find('.t-loading').exists()).toBeFalsy();
    expect(wrapper.find('.t-icon-loading').exists()).toBeFalsy();
    expect(wrapper.find('.t-table__loading--full').text()).toBe('loading text');
  });

  it(': loading works fine as slot', async () => {
    const loadingText = 'loading text';
    const wrapper = mount({
      render() {
        return (
          <TTable
            rowKey="index"
            v-slots={{ loading: () => <div class="slots-loading-class">{loadingText}</div> }}
            data={data}
            columns={columns}
          ></TTable>
        );
      },
    });
    expect(wrapper.find('.t-loading').exists()).toBeFalsy();
    expect(wrapper.find('.t-icon-loading').exists()).toBeFalsy();
    expect(wrapper.find('.t-table__loading--full').text()).toBe('loading text');
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
    wrapper.find('.t-table__content').trigger('wheel');
    await wrapper.vm.$nextTick();
    expect(fn).toHaveBeenCalled();
  });
});

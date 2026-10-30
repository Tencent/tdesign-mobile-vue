import { vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import TTable from '../base-table';
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

describe('Table', () => {
  describe('props', () => {
    it('tableLayout[string]', async () => {
      const wrapper = mount({
        render() {
          return <TTable rowKey="index" data={data} columns={columns}></TTable>;
        },
      });
      // default value is fixed
      expect(wrapper.find(`.${name}--layout-fixed`).exists()).toBeTruthy();
    });

    it('bordered[boolean]', async () => {
      const wrapper = mount({
        render() {
          return <TTable rowKey="index" data={data} columns={columns} bordered></TTable>;
        },
      });
      expect(wrapper.find(`.${name}--bordered`).exists()).toBeTruthy();
    });

    it('empty[string]', async () => {
      const wrapper = mount({
        render() {
          return <TTable rowKey="index" data={[]} columns={columns} empty="暂无数据"></TTable>;
        },
      });
      expect(wrapper.find('.t-table__empty').text()).toBe('暂无数据');
    });

    it('empty[function]', () => {
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

    it('loading[boolean]', async () => {
      const wrapper = mount({
        render() {
          return <TTable rowKey="index" loading={true} data={data} columns={columns}></TTable>;
        },
      });
      expect(wrapper.find('.t-loading').exists()).toBeTruthy();
      expect(wrapper.find('.t-icon-loading').exists()).toBeTruthy();
      expect(wrapper.find('.t-loading__text').exists()).toBeFalsy();
    });

    it('loading[function]', async () => {
      const wrapper = mount({
        render() {
          return <TTable rowKey="index" loading={() => 'loading text'} data={data} columns={columns}></TTable>;
        },
      });
      expect(wrapper.find('.t-loading').exists()).toBeFalsy();
      expect(wrapper.find('.t-icon-loading').exists()).toBeFalsy();
      expect(wrapper.find('.t-table__loading--full').text()).toBe('loading text');
    });

    it('loadingProps[object]', () => {
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

    it('verticalAlign[string]', async () => {
      const wrapper = mount({
        render() {
          return <TTable rowKey="index" data={data} columns={columns}></TTable>;
        },
      });
      // default value is middle
      expect(wrapper.classes('t-vertical-align-middle')).toBeTruthy();
    });

    it('columns.align', () => {
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

    it('showHeader[boolean]', async () => {
      const wrapper = mount({
        render() {
          return <TTable rowKey="index" data={data} columns={columns}></TTable>;
        },
      });
      expect(wrapper.find('thead').exists()).toBeTruthy();

      const wrapper2 = mount({
        render() {
          return <TTable rowKey="index" data={data} columns={columns} showHeader={false}></TTable>;
        },
      });
      expect(wrapper2.find('thead').exists()).toBeFalsy();
    });

    it('stripe[boolean]', async () => {
      const wrapper = mount({
        render() {
          return <TTable rowKey="index" data={data} columns={columns} stripe></TTable>;
        },
      });
      expect(wrapper.find('.t-table--striped').exists()).toBeTruthy();
    });

    it('height[number] & maxHeight[number]', async () => {
      const wrapper = mount({
        render() {
          return <TTable rowKey="index" data={data} columns={columns} height={100}></TTable>;
        },
      });
      expect(wrapper.find('.t-table__header--fixed').exists()).toBeTruthy();

      const wrapper2 = mount({
        render() {
          return <TTable rowKey="index" data={data} columns={columns} maxHeight={200}></TTable>;
        },
      });
      expect(wrapper2.find('.t-table__header--fixed').exists()).toBeTruthy();
    });

    it('rowClassName[string]', async () => {
      const wrapper = mount({
        render() {
          return <TTable rowKey="index" data={data} columns={columns} rowClassName="custom-row-class"></TTable>;
        },
      });
      expect(wrapper.find('tbody > tr').classes()).toContain('custom-row-class');
    });

    it('cellEmptyContent[string]', async () => {
      const dataWithEmpty = [{ index: 1, applicant: '', channel: '内容' }];
      const wrapper = mount({
        render() {
          return <TTable rowKey="index" data={dataWithEmpty} columns={columns} cellEmptyContent="-"></TTable>;
        },
      });
      expect(wrapper.find('tbody > tr').text()).toContain('-');
    });

    it('tableContentWidth[string]', async () => {
      const wrapper = mount({
        render() {
          return <TTable rowKey="index" data={data} columns={columns} tableContentWidth="800px"></TTable>;
        },
      });
      expect(wrapper.find('table').attributes('style')).toContain('width: 800px');
    });

    // 行列合并逻辑依赖固定数据结构组合，待补充专项数据用例
    it.todo('rowspanAndColspan[function]');
    // 固定行/汇总行/行属性需要更完整的表格数据场景
    it.todo('fixedRows[object]');
    it.todo('footerSummary[string/function]');
    it.todo('rowAttributes[object/function/array]');
  });

  describe('slots', () => {
    it('empty[slot]', () => {
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

    it('loading[slot]', async () => {
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
  });

  describe('events', () => {
    it('cellClick', async () => {
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

    it('rowClick', async () => {
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

    it('scroll', async () => {
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
});

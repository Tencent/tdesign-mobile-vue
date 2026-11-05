import { vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import TTable from '../base-table';
import ConfigProvider from '../../config-provider';
import type { BaseTableCol, TableRowData } from '../type';
import config from '../../config';

const { prefix } = config;
const name = `${prefix}-table`;

const data: TableRowData[] = new Array(5).fill(null).map((item, index) => ({
  index: index + 1,
  applicant: `内容${index + 1}`,
  status: index % 2,
  channel: '内容',
  detail: {
    email: '内容',
  },
}));

// 覆盖 ''/undefined/null 空值与 0 合法值
const emptyCellData: TableRowData[] = [
  { index: 1, applicant: '', status: 0, channel: undefined, detail: { email: null } },
];

const columns: BaseTableCol[] = [
  { colKey: 'applicant', title: '标题' },
  { colKey: 'status', title: '状态' },
  { colKey: 'channel', title: '渠道' },
  { colKey: 'detail.email', title: '邮箱' },
];

const mergeData: TableRowData[] = [
  { index: 1, applicant: '内容1', status: 1, channel: '内容', detail: { email: '邮箱1' } },
  { index: 2, applicant: '内容2', status: 0, channel: '内容', detail: { email: '邮箱2' } },
];

// useFixed 中固定列位置的计算依赖 setTimeout(0)，断言前需等待宏任务结束
const waitForFixedPosition = async () => {
  await nextTick();
  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
  await nextTick();
};

describe('Table', () => {
  describe('props', () => {
    it('bordered[boolean]', () => {
      // 默认不显示边框
      const wrapper = mount(TTable, { props: { rowKey: 'index', data, columns } });
      expect(wrapper.classes(`${name}--bordered`)).toBe(false);

      const borderedWrapper = mount(TTable, { props: { rowKey: 'index', data, columns, bordered: true } });
      expect(borderedWrapper.classes(`${name}--bordered`)).toBe(true);
      expect(borderedWrapper.find('thead').classes(`${name}--bordered`)).toBe(true);
    });

    it('cellEmptyContent[string]', () => {
      const wrapper = mount(TTable, {
        props: { rowKey: 'index', data: emptyCellData, columns, cellEmptyContent: '-' },
      });
      // 空值单元格显示兜底内容，0 属于合法值不使用兜底
      expect(
        wrapper
          .find('tbody tr')
          .findAll('td')
          .map((td) => td.text()),
      ).toEqual(['-', '0', '-', '-']);
    });

    it('cellEmptyContent[function]', () => {
      const wrapper = mount(TTable, {
        props: {
          rowKey: 'index',
          data: emptyCellData,
          columns,
          cellEmptyContent: (_, { row, rowIndex }) => `空-${row.index}-${rowIndex}`,
        },
      });
      expect(wrapper.find('tbody td').text()).toBe('空-1-0');
    });

    it('cellEmptyContent[slot]', () => {
      const wrapper = mount(TTable, {
        props: { rowKey: 'index', data: emptyCellData, columns },
        slots: {
          cellEmptyContent: ({ row, rowIndex }) => <div class="slot-empty-cell">{`空-${row.index}-${rowIndex}`}</div>,
        },
      });
      expect(wrapper.find('tbody td').find('.slot-empty-cell').text()).toBe('空-1-0');
    });

    it('columns[array]', () => {
      // 默认空列配置：渲染数据行但不渲染任何单元格
      const wrapper = mount(TTable, { props: { rowKey: 'index', data } });
      expect(wrapper.findAll('thead th')).toHaveLength(0);
      expect(wrapper.findAll('tbody tr')).toHaveLength(data.length);
      expect(wrapper.findAll('tbody td')).toHaveLength(0);

      // 指定列配置：按顺序渲染表头与单元格，支持嵌套字段取值
      const columnWrapper = mount(TTable, { props: { rowKey: 'index', data, columns } });
      expect(columnWrapper.findAll('thead th').map((th) => th.text())).toEqual(['标题', '状态', '渠道', '邮箱']);
      expect(columnWrapper.findAll('colgroup col')).toHaveLength(columns.length);
      expect(
        columnWrapper
          .find('tbody tr')
          .findAll('td')
          .map((td) => td.text()),
      ).toEqual(['内容1', '0', '内容', '内容']);
    });

    it('columns.align[left/center/right]', () => {
      const alignColumns: BaseTableCol[] = [
        { colKey: 'applicant', title: '标题', align: 'center' },
        { colKey: 'status', title: '状态', align: 'left' },
        { colKey: 'channel', title: '渠道', align: 'right' },
      ];
      const wrapper = mount(TTable, { props: { rowKey: 'index', data, columns: alignColumns } });
      const tds = wrapper.find('tbody tr').findAll('td');
      expect(tds[0].classes(`${prefix}-align-center`)).toBe(true);
      // left 为默认对齐方式，不额外添加类名
      expect(tds[1].classes(`${prefix}-align-left`)).toBe(false);
      expect(tds[2].classes(`${prefix}-align-right`)).toBe(true);
      expect(wrapper.findAll('thead th')[0].classes(`${prefix}-align-center`)).toBe(true);
    });

    it('columns.cell[function]', () => {
      const cellColumns: BaseTableCol[] = [
        {
          colKey: 'applicant',
          title: '标题',
          cell: (_, { row, rowIndex, col, colIndex }) => `${col.colKey}-${rowIndex}-${colIndex}-${row.applicant}`,
        },
        ...columns.slice(1),
      ];
      const wrapper = mount(TTable, { props: { rowKey: 'index', data, columns: cellColumns } });
      expect(wrapper.find('tbody td').text()).toBe('applicant-0-0-内容1');
    });

    it('columns.className[string]', () => {
      const classNameColumns: BaseTableCol[] = [
        { colKey: 'applicant', title: '标题', className: 'custom-col-class' },
        ...columns.slice(1),
      ];
      const wrapper = mount(TTable, { props: { rowKey: 'index', data, columns: classNameColumns } });
      wrapper.findAll('tbody tr').forEach((row) => {
        expect(row.find('td').classes()).toContain('custom-col-class');
      });
    });

    it('columns.className[function]', () => {
      const classNameColumns: BaseTableCol[] = [
        { colKey: 'applicant', title: '标题', className: ({ type }) => `col-class-${type}` },
        ...columns.slice(1),
      ];
      const wrapper = mount(TTable, { props: { rowKey: 'index', data, columns: classNameColumns } });
      wrapper.findAll('tbody tr').forEach((row) => {
        expect(row.find('td').classes()).toContain('col-class-td');
      });
    });

    it('columns.className[array]', () => {
      const classNameColumns: BaseTableCol[] = [
        { colKey: 'applicant', title: '标题', className: ['col-class-a', 'col-class-b'] },
        ...columns.slice(1),
      ];
      const wrapper = mount(TTable, { props: { rowKey: 'index', data, columns: classNameColumns } });
      wrapper.findAll('tbody tr').forEach((row) => {
        expect(row.find('td').classes()).toContain('col-class-a');
        expect(row.find('td').classes()).toContain('col-class-b');
      });
    });

    it('columns.colKey[serial-number]', () => {
      const serialColumns: BaseTableCol[] = [{ colKey: 'serial-number', title: '序号' }, ...columns];
      const wrapper = mount(TTable, { props: { rowKey: 'index', data, columns: serialColumns } });
      const rows = wrapper.findAll('tbody tr');
      expect(rows[0].find('td').text()).toBe('1');
      expect(rows[4].find('td').text()).toBe('5');
      expect(wrapper.find('thead th').classes()).toContain(`${name}__th-serial-number`);
    });

    it('columns.ellipsis[boolean]', () => {
      const ellipsisColumns: BaseTableCol[] = [
        { colKey: 'applicant', title: '标题', ellipsis: true },
        { colKey: 'status', title: '状态' },
      ];
      const wrapper = mount(TTable, { props: { rowKey: 'index', data, columns: ellipsisColumns } });
      const thList = wrapper.findAll('thead th');
      expect(thList[0].classes()).toContain(`${name}-td--ellipsis`);
      expect(thList[1].classes(`${name}-td--ellipsis`)).toBe(false);
      const td = wrapper.find('tbody tr').find('td');
      expect(td.classes()).toContain(`${name}-td--ellipsis`);
      expect(td.find('div').classes()).toEqual([`${name}__ellipsis`, `${prefix}-text-ellipsis`]);
    });

    // 源码仅将 ellipsis 作为超出省略的开关使用，未实现 TNode 自定义省略浮层内容的渲染
    it.todo('columns.ellipsis[function]');

    it('columns.ellipsisTitle[boolean]', () => {
      const ellipsisTitleColumns: BaseTableCol[] = [
        { colKey: 'applicant', title: '标题', ellipsisTitle: true },
        { colKey: 'status', title: '状态' },
      ];
      const wrapper = mount(TTable, { props: { rowKey: 'index', data, columns: ellipsisTitleColumns } });
      expect(wrapper.find('thead th').classes()).toContain(`${name}-td--ellipsis`);
      // ellipsisTitle 只作用于表头，不作用于单元格
      expect(wrapper.find('tbody td').classes(`${name}-td--ellipsis`)).toBe(false);
    });

    // 源码仅将 ellipsisTitle 作为表头超出省略的开关使用，未实现 TNode 自定义省略浮层内容的渲染
    it.todo('columns.ellipsisTitle[function]');

    it('columns.fixed[left/right]', async () => {
      const fixedColumns: BaseTableCol[] = [
        { colKey: 'applicant', title: '标题', fixed: 'left' },
        { colKey: 'status', title: '状态' },
        { colKey: 'channel', title: '渠道', fixed: 'right' },
      ];
      const wrapper = mount(TTable, { props: { rowKey: 'index', data, columns: fixedColumns } });
      await waitForFixedPosition();
      expect(wrapper.classes(`${name}--column-fixed`)).toBe(true);

      const thList = wrapper.findAll('thead th');
      expect(thList[0].classes(`${name}__cell--fixed-left`)).toBe(true);
      expect(thList[0].classes(`${name}__cell--fixed-left-last`)).toBe(true);
      expect(thList[0].attributes('style')).toContain('left: 0px');
      expect(thList[2].classes(`${name}__cell--fixed-right`)).toBe(true);
      expect(thList[2].classes(`${name}__cell--fixed-right-first`)).toBe(true);
      expect(thList[2].attributes('style')).toContain('right: 0px');

      const tds = wrapper.find('tbody tr').findAll('td');
      expect(tds[0].classes(`${name}__cell--fixed-left-last`)).toBe(true);
      expect(tds[2].classes(`${name}__cell--fixed-right-first`)).toBe(true);
    });

    it('columns.minWidth[number]', () => {
      const minWidthColumns: BaseTableCol[] = [
        { colKey: 'applicant', title: '标题', minWidth: 200 },
        ...columns.slice(1),
      ];
      const wrapper = mount(TTable, { props: { rowKey: 'index', data, columns: minWidthColumns } });
      expect(wrapper.find('colgroup col').attributes('style')).toContain('min-width: 200px');
    });

    it('columns.minWidth[string]', () => {
      const minWidthColumns: BaseTableCol[] = [
        { colKey: 'applicant', title: '标题', minWidth: '20%' },
        ...columns.slice(1),
      ];
      const wrapper = mount(TTable, { props: { rowKey: 'index', data, columns: minWidthColumns } });
      expect(wrapper.find('colgroup col').attributes('style')).toContain('min-width: 20%');
    });

    it('columns.render[function]', () => {
      const renderColumns: BaseTableCol[] = [
        {
          colKey: 'applicant',
          title: '标题',
          render: (_, { type }) => (type === 'title' ? '渲染表头' : '渲染单元格'),
        },
        ...columns.slice(1),
      ];
      const wrapper = mount(TTable, { props: { rowKey: 'index', data, columns: renderColumns } });
      expect(wrapper.find('thead th').text()).toBe('渲染表头');
      expect(wrapper.find('tbody td').text()).toBe('渲染单元格');
    });

    it('columns.title[string]', () => {
      const wrapper = mount(TTable, { props: { rowKey: 'index', data, columns } });
      const th = wrapper.find('thead th');
      expect(th.text()).toBe('标题');
      expect(th.classes()).toContain(`${name}__th-applicant`);
      expect(th.attributes('data-colkey')).toBe('applicant');
    });

    it('columns.title[function]', () => {
      const titleColumns: BaseTableCol[] = [
        { colKey: 'applicant', title: (_, { col, colIndex }) => `标题-${col.colKey}-${colIndex}` },
        ...columns.slice(1),
      ];
      const wrapper = mount(TTable, { props: { rowKey: 'index', data, columns: titleColumns } });
      expect(wrapper.find('thead th').text()).toBe('标题-applicant-0');
    });

    it('columns.width[number]', () => {
      const widthColumns: BaseTableCol[] = [{ colKey: 'applicant', title: '标题', width: 120 }, ...columns.slice(1)];
      const wrapper = mount(TTable, { props: { rowKey: 'index', data, columns: widthColumns } });
      expect(wrapper.find('colgroup col').attributes('style')).toContain('width: 120px');
    });

    it('columns.width[string]', () => {
      const widthColumns: BaseTableCol[] = [{ colKey: 'applicant', title: '标题', width: '30%' }, ...columns.slice(1)];
      const wrapper = mount(TTable, { props: { rowKey: 'index', data, columns: widthColumns } });
      expect(wrapper.find('colgroup col').attributes('style')).toContain('width: 30%');
    });

    it('data[array]', async () => {
      const wrapper = mount(TTable, { props: { rowKey: 'index', data, columns } });
      expect(wrapper.findAll('tbody tr')).toHaveLength(data.length);

      await wrapper.setProps({ data: data.slice(0, 2) });
      expect(wrapper.findAll('tbody tr')).toHaveLength(2);
    });

    it('empty[string]', () => {
      const wrapper = mount(TTable, { props: { rowKey: 'index', data: [], columns, empty: '暂无数据' } });
      expect(wrapper.find(`.${name}__empty`).text()).toBe('暂无数据');
    });

    it('empty[function]', () => {
      const wrapper = mount(TTable, {
        props: { rowKey: 'index', data: [], columns, empty: () => <div class="render-function-class">空数据</div> },
      });
      expect(wrapper.find('.render-function-class').exists()).toBe(true);
      expect(wrapper.find(`.${name}__empty`).text()).toBe('空数据');
    });

    it('empty[slot]', () => {
      const wrapper = mount(TTable, {
        props: { rowKey: 'index', data: [], columns },
        slots: { empty: () => <div class="slot-empty">Empty Data Rendered By Slots</div> },
      });
      expect(wrapper.find(`.${name}__empty`).exists()).toBe(true);
      expect(wrapper.find('.slot-empty').exists()).toBe(true);
      expect(wrapper.find(`.${name}__empty`).text()).toBe('Empty Data Rendered By Slots');
    });

    it('fixedRows[array]', () => {
      const wrapper = mount(TTable, { props: { rowKey: 'index', data, columns, fixedRows: [1, 1] } });
      const rows = wrapper.findAll('tbody > tr');
      // 冻结首行
      expect(rows[0].classes()).toContain(`${name}__row--fixed-top`);
      // 冻结尾行
      expect(rows[4].classes()).toContain(`${name}__row--fixed-bottom`);
      expect(rows[4].classes()).toContain(`${name}__row--fixed-bottom-first`);
      // 尾行前一行为首个固定底行的上一行，去掉底边框
      expect(rows[3].classes()).toContain(`${name}__row--without-border-bottom`);
    });

    it('footerSummary[string]', () => {
      const wrapper = mount(TTable, { props: { rowKey: 'index', data, columns, footerSummary: '汇总信息' } });
      const $footer = wrapper.find(`.${name}__bottom-content`);
      expect($footer.exists()).toBe(true);
      expect($footer.text()).toBe('汇总信息');
    });

    it('footerSummary[function]', () => {
      const wrapper = mount(TTable, {
        props: {
          rowKey: 'index',
          data,
          columns,
          footerSummary: () => <div class="custom-footer-summary">自定义汇总</div>,
        },
      });
      expect(wrapper.find(`.${name}__bottom-content`).find('.custom-footer-summary').text()).toBe('自定义汇总');
    });

    it('footerSummary[slot]', () => {
      const wrapper = mount(TTable, {
        props: { rowKey: 'index', data, columns },
        slots: { footerSummary: () => <div class="slot-footer">自定义汇总</div> },
      });
      expect(wrapper.find(`.${name}__bottom-content`).find('.slot-footer').text()).toBe('自定义汇总');
    });

    it('height[number]', () => {
      const wrapper = mount(TTable, { props: { rowKey: 'index', data, columns, height: 100 } });
      expect(wrapper.find(`.${name}__content`).attributes('style')).toContain('height: 100px');
      expect(wrapper.find('thead').classes(`${name}__header--fixed`)).toBe(true);
    });

    it('height[string]', () => {
      const wrapper = mount(TTable, { props: { rowKey: 'index', data, columns, height: '30%' } });
      expect(wrapper.find(`.${name}__content`).attributes('style')).toContain('height: 30%');
      expect(wrapper.find('thead').classes(`${name}__header--fixed`)).toBe(true);
    });

    it('loading[boolean]', () => {
      const wrapper = mount(TTable, { props: { rowKey: 'index', data, columns, loading: true } });
      expect(wrapper.classes(`${name}--loading`)).toBe(true);
      expect(wrapper.find(`.${prefix}-loading`).exists()).toBe(true);
      expect(wrapper.find(`.${prefix}-icon-loading`).exists()).toBe(true);
      expect(wrapper.find(`.${prefix}-loading__text`).exists()).toBe(false);
    });

    it('loading[function]', () => {
      const wrapper = mount(TTable, {
        props: { rowKey: 'index', data, columns, loading: () => 'loading text' },
      });
      expect(wrapper.classes(`${name}--loading`)).toBe(true);
      expect(wrapper.find(`.${prefix}-loading`).exists()).toBe(false);
      expect(wrapper.find(`.${name}__loading--full`).text()).toBe('loading text');
    });

    it('loading[slot]', () => {
      const wrapper = mount(TTable, {
        props: { rowKey: 'index', data, columns },
        slots: { loading: () => <div class="slot-loading">loading text</div> },
      });
      expect(wrapper.find(`.${prefix}-loading`).exists()).toBe(false);
      expect(wrapper.find(`.${prefix}-icon-loading`).exists()).toBe(false);
      expect(wrapper.find(`.${name}__loading--full`).text()).toBe('loading text');
    });

    it('loadingProps[object]', () => {
      const wrapper = mount(TTable, {
        props: {
          rowKey: 'index',
          data,
          columns,
          loading: true,
          loadingProps: { indicator: false, text: 'function loading' },
        },
      });
      expect(wrapper.find(`.${prefix}-loading`).exists()).toBe(true);
      expect(wrapper.find(`.${prefix}-icon-loading`).exists()).toBe(false);
      expect(wrapper.find(`.${prefix}-loading__text`).text()).toBe('function loading');
    });

    it('maxHeight[number]', () => {
      const wrapper = mount(TTable, { props: { rowKey: 'index', data, columns, maxHeight: 200 } });
      expect(wrapper.find(`.${name}__content`).attributes('style')).toContain('max-height: 200px');
      expect(wrapper.find('thead').classes(`${name}__header--fixed`)).toBe(true);
    });

    it('maxHeight[string]', () => {
      const wrapper = mount(TTable, { props: { rowKey: 'index', data, columns, maxHeight: '50%' } });
      expect(wrapper.find(`.${name}__content`).attributes('style')).toContain('max-height: 50%');
      expect(wrapper.find('thead').classes(`${name}__header--fixed`)).toBe(true);
    });

    it('rowAttributes[object]', () => {
      const wrapper = mount(TTable, {
        props: { rowKey: 'index', data, columns, rowAttributes: { draggable: 'true' } },
      });
      wrapper.findAll('tbody > tr').forEach((row) => {
        expect(row.attributes('draggable')).toBe('true');
      });
    });

    it('rowAttributes[array]', () => {
      const wrapper = mount(TTable, {
        props: { rowKey: 'index', data, columns, rowAttributes: [{ 'data-custom': 'a' }, { title: '行标题' }] },
      });
      wrapper.findAll('tbody > tr').forEach((row) => {
        expect(row.attributes('data-custom')).toBe('a');
        expect(row.attributes('title')).toBe('行标题');
      });
    });

    it('rowAttributes[function]', () => {
      const wrapper = mount(TTable, {
        props: {
          rowKey: 'index',
          data,
          columns,
          rowAttributes: ({ rowIndex }) => ({ 'data-row-index': String(rowIndex) }),
        },
      });
      wrapper.findAll('tbody > tr').forEach((row, index) => {
        expect(row.attributes('data-row-index')).toBe(String(index));
      });
    });

    it('rowClassName[string]', () => {
      const wrapper = mount(TTable, {
        props: { rowKey: 'index', data, columns, rowClassName: 'custom-row-class' },
      });
      expect(wrapper.find('tbody > tr').classes()).toContain('custom-row-class');
    });

    it('rowClassName[object]', () => {
      // 对象键为行数据唯一标识（rowKey 对应字段值）
      const wrapper = mount(TTable, {
        props: { rowKey: 'index', data: [data[0]], columns, rowClassName: { 1: 'custom-row-class' } },
      });
      expect(wrapper.find('tbody > tr').classes()).toContain('custom-row-class');
    });

    it('rowClassName[array]', () => {
      const wrapper = mount(TTable, {
        props: { rowKey: 'index', data, columns, rowClassName: ['row-class-a', 'row-class-b'] },
      });
      wrapper.findAll('tbody > tr').forEach((row) => {
        expect(row.classes()).toContain('row-class-a');
        expect(row.classes()).toContain('row-class-b');
      });
    });

    it('rowClassName[function]', () => {
      const wrapper = mount(TTable, {
        props: { rowKey: 'index', data, columns, rowClassName: ({ row, rowIndex }) => `row-${row.index}-${rowIndex}` },
      });
      wrapper.findAll('tbody > tr').forEach((row, index) => {
        expect(row.classes()).toContain(`row-${data[index].index}-${index}`);
      });
    });

    it('rowKey[string]', () => {
      const keyData: TableRowData[] = [
        { uid: 'a', applicant: '内容1', status: 1, channel: '内容', detail: { email: '邮箱1' } },
        { uid: 'b', applicant: '内容2', status: 0, channel: '内容', detail: { email: '邮箱2' } },
      ];
      // 合并单元格的唯一标识依赖 rowKey 字段取值
      const wrapper = mount(TTable, {
        props: {
          rowKey: 'uid',
          data: keyData,
          columns,
          rowspanAndColspan: ({ rowIndex, colIndex }) => (rowIndex === 0 && colIndex === 0 ? { rowspan: 2 } : {}),
        },
      });
      const rows = wrapper.findAll('tbody tr');
      expect(rows[0].find('td').attributes('rowspan')).toBe('2');
      expect(rows[1].findAll('td')).toHaveLength(columns.length - 1);
    });

    it('rowspanAndColspan[function]', () => {
      // 纵向合并
      const rowSpanWrapper = mount(TTable, {
        props: {
          rowKey: 'index',
          data: mergeData,
          columns,
          rowspanAndColspan: ({ rowIndex, colIndex }) => (rowIndex === 0 && colIndex === 0 ? { rowspan: 2 } : {}),
        },
      });
      expect(rowSpanWrapper.classes(`${name}--rowspan-colspan`)).toBe(true);
      const rowSpanRows = rowSpanWrapper.findAll('tbody tr');
      const mergedCell = rowSpanRows[0].find('td');
      expect(mergedCell.attributes('rowspan')).toBe('2');
      // 第二行被合并的单元格跳过渲染
      expect(rowSpanRows[1].findAll('td')).toHaveLength(columns.length - 1);
      // 合并单元格覆盖到最后一行时移除底部边框；合并场景下首列移除左边框
      expect(mergedCell.classes()).toContain(`${name}__td-last-row`);
      expect(mergedCell.classes()).toContain(`${name}__td-first-col`);

      // 横向合并
      const colSpanWrapper = mount(TTable, {
        props: {
          rowKey: 'index',
          data: mergeData,
          columns,
          rowspanAndColspan: ({ rowIndex, colIndex }) => (rowIndex === 0 && colIndex === 0 ? { colspan: 2 } : {}),
        },
      });
      const colSpanRows = colSpanWrapper.findAll('tbody tr');
      expect(colSpanRows[0].find('td').attributes('colspan')).toBe('2');
      expect(colSpanRows[0].findAll('td')).toHaveLength(columns.length - 1);
    });

    it('showHeader[boolean]', () => {
      const wrapper = mount(TTable, { props: { rowKey: 'index', data, columns } });
      expect(wrapper.find('thead').exists()).toBe(true);

      const hiddenWrapper = mount(TTable, { props: { rowKey: 'index', data, columns, showHeader: false } });
      expect(hiddenWrapper.find('thead').exists()).toBe(false);
    });

    it('stripe[boolean]', () => {
      const wrapper = mount(TTable, { props: { rowKey: 'index', data, columns, stripe: true } });
      expect(wrapper.classes(`${name}--striped`)).toBe(true);

      // 默认不显示斑马纹
      const plainWrapper = mount(TTable, { props: { rowKey: 'index', data, columns } });
      expect(plainWrapper.classes(`${name}--striped`)).toBe(false);
    });

    it('tableContentWidth[string]', () => {
      const wrapper = mount(TTable, {
        props: { rowKey: 'index', data, columns, tableContentWidth: '800px' },
      });
      expect(wrapper.find('table').attributes('style')).toContain('width: 800px');
    });

    it.each(['auto', 'fixed'] as const)('tableLayout[%s]', (layout) => {
      const wrapper = mount(TTable, { props: { rowKey: 'index', data, columns, tableLayout: layout } });
      expect(wrapper.find('table').classes()).toContain(`${name}--layout-${layout}`);
    });

    it('tableLayout[default]', () => {
      const defaultWrapper = mount(TTable, { props: { rowKey: 'index', data, columns } });
      expect(defaultWrapper.find('table').classes()).toContain(`${name}--layout-fixed`);
    });

    it.each(['top', 'middle', 'bottom'] as const)('verticalAlign[%s]', (verticalAlign) => {
      const wrapper = mount(TTable, { props: { rowKey: 'index', data, columns, verticalAlign } });
      expect(wrapper.classes()).toContain(`${prefix}-vertical-align-${verticalAlign}`);
    });

    it('applicant[slot]', () => {
      const wrapper = mount(TTable, {
        props: { rowKey: 'index', data, columns },
        slots: { applicant: ({ row, rowIndex }) => <div class="col-key-slot">{`${row.applicant}-${rowIndex}`}</div> },
      });
      expect(wrapper.find('tbody td').find('.col-key-slot').text()).toBe('内容1-0');
    });

    it('applicant-cell[slot]', () => {
      const cellSlotColumns: BaseTableCol[] = [
        { colKey: 'applicant', title: '标题', cell: 'applicant-cell' },
        ...columns.slice(1),
      ];
      const wrapper = mount(TTable, {
        props: { rowKey: 'index', data, columns: cellSlotColumns },
        slots: { 'applicant-cell': ({ row }) => <div class="cell-name-slot">{row.applicant}</div> },
      });
      expect(wrapper.find('tbody td').find('.cell-name-slot').text()).toBe('内容1');
    });

    it('applicant-title[slot]', () => {
      const titleSlotColumns: BaseTableCol[] = [{ colKey: 'applicant', title: 'applicant-title' }, ...columns.slice(1)];
      const wrapper = mount(TTable, {
        props: { rowKey: 'index', data, columns: titleSlotColumns },
        slots: { 'applicant-title': () => <div class="title-name-slot">插槽表头</div> },
      });
      expect(wrapper.find('thead th').find('.title-name-slot').text()).toBe('插槽表头');
    });
  });

  describe('events', () => {
    it('cellClick', async () => {
      const fn = vi.fn();
      const wrapper = mount(TTable, { props: { rowKey: 'index', data, columns, onCellClick: fn } });
      await wrapper.find('tbody td').trigger('click');
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith({
        row: data[0],
        col: columns[0],
        rowIndex: 0,
        colIndex: 0,
        e: expect.any(Event),
      });
    });

    it('rowClick', async () => {
      const fn = vi.fn();
      const wrapper = mount(TTable, { props: { rowKey: 'index', data, columns, onRowClick: fn } });
      await wrapper.find('tbody tr').trigger('click');
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith({ row: data[0], index: 0, e: expect.any(Event) });
    });

    it('scroll', async () => {
      const fn = vi.fn();
      const wrapper = mount(TTable, { props: { rowKey: 'index', data, columns, onScroll: fn } });
      await wrapper.find(`.${name}__content`).trigger('scroll');
      expect(fn).toHaveBeenCalledTimes(1);
      // 源码实际传入 { params: e }，与类型声明 ({ e: Event }) 不一致
      expect(fn).toHaveBeenCalledWith({ params: expect.any(Event) });
    });

    it('scrollToBottom', async () => {
      const fn = vi.fn();
      const wrapper = mount(TTable, { props: { rowKey: 'index', data, columns, onScrollToBottom: fn } });
      // jsdom 中 scrollHeight/scrollTop/clientHeight 均为 0，满足距底部 50px 的阈值
      await wrapper.find(`.${name}__content`).trigger('scroll');
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe('instanceFunctions', () => {
    it('refreshTable', async () => {
      const fixedColumns: BaseTableCol[] = [
        { colKey: 'applicant', title: '标题', fixed: 'left' },
        { colKey: 'status', title: '状态' },
        { colKey: 'channel', title: '渠道', fixed: 'right' },
      ];
      const wrapper = mount(TTable, { props: { rowKey: 'index', data, columns: fixedColumns } });
      await waitForFixedPosition();

      const instance = wrapper.vm as typeof wrapper.vm & { refreshTable: () => void };
      expect(typeof instance.refreshTable).toBe('function');
      expect(() => instance.refreshTable()).not.toThrow();
      await waitForFixedPosition();
      // 全部重新渲染后固定列样式仍然生效
      expect(wrapper.classes(`${name}--column-fixed`)).toBe(true);
      expect(wrapper.find('thead th').classes(`${name}__cell--fixed-left`)).toBe(true);
    });
  });

  describe('globalConfig', () => {
    it('table', () => {
      const wrapper = mount(ConfigProvider, {
        props: { globalConfig: { table: { empty: 'Global Empty Text' } } },
        slots: { default: () => <TTable rowKey="index" data={[]} columns={columns} /> },
      });
      expect(wrapper.find(`.${name}__empty`).text()).toBe('Global Empty Text');
    });
  });

  describe('scenarios', () => {
    describe('empty content', () => {
      it('renders the default global empty text when data is empty', () => {
        const wrapper = mount(TTable, { props: { rowKey: 'index', data: [], columns } });
        expect(wrapper.find(`.${name}__empty`).text()).toBe('暂无数据');
        // 空数据行横跨全部列
        expect(wrapper.find(`.${name}__empty-row`).find('td').attributes('colspan')).toBe(String(columns.length));
      });
    });

    describe('cell content priority', () => {
      it('columns.cell function takes priority over the colKey slot', () => {
        const cellColumns: BaseTableCol[] = [
          { colKey: 'applicant', title: '标题', cell: () => '函数渲染单元格' },
          ...columns.slice(1),
        ];
        const wrapper = mount(TTable, {
          props: { rowKey: 'index', data, columns: cellColumns },
          slots: { applicant: () => <div class="col-key-slot">插槽渲染单元格</div> },
        });
        expect(wrapper.find('tbody td').text()).toBe('函数渲染单元格');
        expect(wrapper.find('.col-key-slot').exists()).toBe(false);
      });
    });

    describe('fixed columns', () => {
      it('toggles column shadows while scrolling horizontally', async () => {
        const fixedColumns: BaseTableCol[] = [
          { colKey: 'applicant', title: '标题', fixed: 'left' },
          { colKey: 'status', title: '状态' },
          { colKey: 'channel', title: '渠道', fixed: 'right' },
        ];
        const wrapper = mount(TTable, { props: { rowKey: 'index', data, columns: fixedColumns } });
        await waitForFixedPosition();
        // 未滚动时不显示固定列阴影
        expect(wrapper.classes(`${name}__content--scrollable-to-left`)).toBe(false);
        expect(wrapper.classes(`${name}__content--scrollable-to-right`)).toBe(false);

        const content = wrapper.find(`.${name}__content`);
        Object.defineProperty(content.element, 'scrollLeft', { value: 30, configurable: true });
        Object.defineProperty(content.element, 'clientWidth', { value: 100, configurable: true });
        Object.defineProperty(content.element, 'scrollWidth', { value: 300, configurable: true });
        await content.trigger('scroll');
        await nextTick();
        expect(wrapper.classes(`${name}__content--scrollable-to-left`)).toBe(true);
        expect(wrapper.classes(`${name}__content--scrollable-to-right`)).toBe(true);
      });
    });
  });
});

import { defineComponent, computed, h, ref } from 'vue';
import { get, isFunction, isString } from 'lodash-es';
import baseTableProps from './base-table-props';
import config from '../config';
import useClassName from './hooks/useClassName';
import useStyle, { formatCSSUnit } from './hooks/useStyle';
import useFixed, { getRowFixedStyles, getColumnFixedStyles } from './hooks/useFixed';
import { ClassName } from '../common';

import { BaseTableCellParams, BaseTableCol, TableRowData, TdBaseTableProps } from './type';
import TLoading from '../loading';
import { TdLoadingProps } from '../loading/type';
import { useConfig } from '../config-provider/useConfig';
import { useTNodeJSX } from '../hooks/tnode';
import { formatClassNames, formatRowAttributes, formatRowClassNames } from './utils';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-base-table`,
  props: baseTableProps,
  emits: ['cell-click', 'row-click', 'scroll'],
  setup(props, context) {
    const tableRef = ref();
    const theadRef = ref();
    const tableElmRef = ref();
    const renderTNodeJSX = useTNodeJSX();
    const {
      classPrefix,
      tableLayoutClasses,
      tableHeaderClasses,
      tableBaseClass,
      tdAlignClasses,
      tdEllipsisClass,
      tableRowFixedClasses,
      tableColFixedClasses,
    } = useClassName();
    const { globalConfig, t } = useConfig('table');
    const defaultLoadingContent = h(TLoading, { ...(props.loadingProps as TdLoadingProps) });
    // 表格基础样式类
    const { tableClasses, tableContentStyles, tableElementStyles } = useStyle(props);
    const {
      rowAndColFixedPosition,
      tableContentRef,
      isFixedColumn,
      isFixedHeader,
      showColumnShadow,
      refreshTable,
      updateColumnFixedShadow,
    } = useFixed(props);

    const defaultColWidth = props.tableLayout === 'fixed' ? '80px' : undefined;

    const theadClasses = computed(() => [
      tableHeaderClasses.header,
      {
        [tableHeaderClasses.fixed]: Boolean(props.maxHeight || props.height),
        [tableBaseClass.bordered]: props.bordered,
      },
    ]);

    const tbodyClasses = computed(() => [tableBaseClass.body]);

    const ellipsisClasses = computed(() => [`${classPrefix}-table__ellipsis`, `${classPrefix}-text-ellipsis`]);

    const handleRowClick = (row: TableRowData, rowIndex: number, e: MouseEvent) => {
      props.onRowClick?.({ row, index: rowIndex, e });
    };

    const handleCellClick = (row: TableRowData, col: any, rowIndex: number, colIndex: number, e: MouseEvent) => {
      if (col.stopPropagation) {
        e.stopPropagation();
      }
      props.onCellClick?.({ row, col, rowIndex, colIndex, e });
    };

    const dynamicBaseTableClasses = computed(() => [
      {
        [tableBaseClass.headerFixed]: isFixedHeader.value,
        [tableBaseClass.columnFixed]: isFixedColumn.value,
        [tableColFixedClasses.leftShadow]: showColumnShadow.left,
        [tableColFixedClasses.rightShadow]: showColumnShadow.right,
      },
      tableClasses.value,
    ]);

    const tableElmClasses = computed(() => [[tableLayoutClasses[props.tableLayout || 'fixed']]]);

    const renderCell = (
      params: BaseTableCellParams<TableRowData>,
      cellEmptyContent?: TdBaseTableProps['cellEmptyContent'],
    ) => {
      const { col, row, rowIndex } = params;
      // support serial number column
      if (col.colKey === 'serial-number') {
        return rowIndex + 1;
      }

      if (isFunction(col.cell)) {
        return col.cell(h, params);
      }
      if (context.slots[col.colKey]) {
        return context.slots[col.colKey](params);
      }

      if (isString(col.cell) && context.slots?.[col.cell]) {
        return context.slots[col.cell](params);
      }
      const r = get(row, col.colKey);
      // 0 和 false 属于正常可用值，不能使用兜底逻辑 cellEmptyContent
      if (![undefined, '', null].includes(r)) return r;

      // cellEmptyContent 作为空数据兜底显示，用户可自定义
      if (cellEmptyContent) {
        return isFunction(cellEmptyContent) ? cellEmptyContent(h, params) : cellEmptyContent;
      }
      if (context.slots.cellEmptyContent) return context.slots.cellEmptyContent(params);
      if (context.slots['cell-empty-content']) return context.slots['cell-empty-content'](params);
      return r;
    };

    const loadingClasses = computed(() => [`${classPrefix}-table__loading--full`]);

    const onInnerVirtualScroll = (e: Event) => {
      const target = (e.target || e.srcElement) as HTMLElement;
      updateColumnFixedShadow(target);
      props.onScroll?.({ params: e });
    };

    const tdClassName = (td_item: BaseTableCol<TableRowData>, extra?: Array<ClassName>) => {
      let className = '';
      if (td_item.ellipsis) {
        className = tdEllipsisClass;
      }
      if (td_item.align && td_item.align !== 'left') {
        className = `${className} ${tdAlignClasses[`${td_item.align}`]}`;
      }
      return [className, ...extra];
    };

    const colStyle = (col_item: BaseTableCol<TableRowData>) => {
      return {
        width: `${formatCSSUnit(col_item.width || defaultColWidth)}`,
        minWidth: `${
          !formatCSSUnit(col_item.width || defaultColWidth) && !col_item.minWidth && props.tableLayout === 'fixed'
            ? '80px'
            : formatCSSUnit(col_item.minWidth)
        }`,
      };
    };

    const thClassName = (item_th: BaseTableCol<TableRowData>, extra?: ClassName) => {
      let className = '';
      if (item_th.colKey) {
        className = `${classPrefix}-table__th-${item_th.colKey}`;
      }
      if (item_th.ellipsisTitle || item_th.ellipsis) {
        className = `${className} ${tdEllipsisClass}`;
      }
      if (item_th.align && item_th.align !== 'left') {
        className = `${className} ${tdAlignClasses[`${item_th.align}`]}`;
      }
      return [className, extra];
    };

    const renderTitle = (item_th: BaseTableCol<TableRowData>, index: number) => {
      if (isFunction(item_th?.title)) {
        return item_th?.title(h, { col: item_th, colIndex: index });
      }
      return item_th?.title;
    };

    const renderTableBody = () => {
      const renderContentEmpty = renderTNodeJSX('empty') || t(globalConfig.value.empty);
      if (!props.data?.length && renderContentEmpty) {
        return (
          <tr class={tableBaseClass.emptyRow}>
            <td colspan={props.columns?.length}>
              <div class={tableBaseClass.empty}>{renderContentEmpty}</div>
            </td>
          </tr>
        );
      }
      if (props.data?.length) {
        return props.data?.map((tr_item, tr_index) => {
          const { style, classes } = getRowFixedStyles(
            get(tr_item, props.rowKey || 'id'),
            tr_index,
            props.data?.length || 0,
            props.fixedRows,
            rowAndColFixedPosition.value,
            tableRowFixedClasses,
          );

          const customClasses = formatRowClassNames(
            props.rowClassName,
            { row: tr_item, rowKey: props.rowKey, rowIndex: tr_index, type: 'body' },
            props.rowKey || 'id',
          );

          const trAttributes =
            formatRowAttributes(props.rowAttributes, { row: tr_item, rowIndex: tr_index, type: 'body' }) || {};

          return (
            <tr
              {...trAttributes}
              key={tr_index}
              style={style}
              class={[classes, customClasses]}
              onClick={($event) => {
                handleRowClick(tr_item, tr_index, $event);
              }}
            >
              {props.columns?.map((td_item, td_index) => {
                const tdStyles = getColumnFixedStyles(
                  td_item,
                  td_index,
                  rowAndColFixedPosition.value,
                  tableColFixedClasses,
                );

                const customClasses = formatClassNames(td_item.className, {
                  col: td_item,
                  colIndex: td_index,
                  row: tr_item,
                  rowIndex: tr_index,
                  type: 'td',
                });

                return (
                  <td
                    key={td_index}
                    style={tdStyles.style}
                    class={tdClassName(td_item, [tdStyles.classes, customClasses])}
                    onClick={($event) => {
                      handleCellClick(tr_item, td_item, tr_index, td_index, $event);
                    }}
                  >
                    <div class={td_item.ellipsis && ellipsisClasses.value}>
                      {renderCell(
                        { row: tr_item, col: td_item, rowIndex: tr_index, colIndex: td_index },
                        props.cellEmptyContent,
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          );
        });
      }
    };

    context.expose({
      refreshTable,
    });

    return () => {
      const renderLoading = renderTNodeJSX('loading', { defaultNode: defaultLoadingContent });

      return (
        <div ref={tableRef} class={dynamicBaseTableClasses.value} style="position: relative">
          <div
            ref={tableContentRef}
            class={tableBaseClass.content}
            style={tableContentStyles.value}
            onScroll={onInnerVirtualScroll}
          >
            <table ref={tableElmRef} class={tableElmClasses.value} style={tableElementStyles.value}>
              <colgroup>
                {props.columns?.map((col_item) => {
                  return <col key={col_item.colKey} style={colStyle(col_item)} />;
                })}
              </colgroup>
              {props.showHeader && (
                <thead ref={theadRef} class={theadClasses.value}>
                  <tr>
                    {props.columns?.map((item_th, index_th) => {
                      const thStyles = getColumnFixedStyles(
                        item_th,
                        index_th,
                        rowAndColFixedPosition.value,
                        tableColFixedClasses,
                      );
                      return (
                        <th
                          key={index_th}
                          class={thClassName(item_th, thStyles.classes)}
                          style={thStyles.style}
                          data-colKey={item_th.colKey}
                        >
                          <div class={(item_th.ellipsisTitle || item_th.ellipsis) && ellipsisClasses.value}>
                            {renderTitle(item_th, index_th)}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
              )}
              <tbody class={tbodyClasses.value}>{renderTableBody()}</tbody>
            </table>
            {renderLoading && <div class={loadingClasses.value}>{renderLoading}</div>}
          </div>
        </div>
      );
    };
  },
});

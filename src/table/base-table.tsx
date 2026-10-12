import { defineComponent, computed, h, ref, SetupContext, toRefs, inject, watch } from 'vue';
import { get, isFunction, isString } from 'lodash-es';
import baseTableProps from './base-table-props';
import useClassName from './hooks/useClassName';
import useStyle, { formatCSSUnit } from './hooks/useStyle';
import useFixed, { getRowFixedStyles, getColumnFixedStyles } from './hooks/useFixed';
import { renderTitle } from './hooks/useTableHeader';
import useRowspanAndColspan from './hooks/useRowspanAndColspan';
import usePagination from './hooks/usePagination';
import usePullRefresh from './hooks/usePullRefresh';
import {
  formatClassNames,
  formatRowAttributes,
  formatRowClassNames,
  handleCellSpan,
  isFirstColumnInSpan,
  isLastRowInSpan,
} from './utils';
import { ClassName } from '../common';

import { BaseTableCellParams, BaseTableCol, TableRowData, TdBaseTableProps } from './type';
import TLoading from '../loading';
import { TdLoadingProps } from '../loading/type';
import { useConfig } from '../config-provider/useConfig';
import { useTNodeJSX } from '../hooks/tnode';
import { tableInternalKey, BaseTableColumns } from './interface';

export default defineComponent({
  name: 'TBaseTable',
  props: baseTableProps,
  emits: ['cell-click', 'row-click', 'scroll', 'scroll-to-bottom'],
  setup(props, context) {
    const tableRef = ref();
    const theadRef = ref();
    const tableElmRef = ref();
    const renderTNodeJSX = useTNodeJSX();
    const { data, columns, rowKey, rowspanAndColspan } = toRefs(props);
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

    // 内部通信：从 PrimaryTable 注入的上下文
    const tableInternalCtx = inject(tableInternalKey, null);
    // 表格基础样式类
    const { tableClasses, tableContentStyles, tableElementStyles } = useStyle(props);
    const {
      rowAndColFixedPosition,
      tableContentRef,
      isFixedColumn,
      isFixedHeader,
      isWidthOverflow,
      tableWidth,
      showColumnShadow,
      refreshTable,
      updateColumnFixedShadow,
    } = useFixed(props);

    const { skipSpansMap } = useRowspanAndColspan(data, columns, rowKey, rowspanAndColspan);

    // 分页数据
    const {
      dataSource: paginationDataSource,
      isPaginateData,
      renderPagination,
    } = usePagination(props, tableContentRef);

    // 上拉加载数据
    const {
      dataSource: pullRefreshDataSource,
      isPaginateData: isPullRefreshData,
      pullOffset,
      isPulling,
      renderPullRefreshLoading,
    } = usePullRefresh(props, tableContentRef);

    // 表格展示数据：根据加载模式选择分页数据 / 上拉加载数据 / 原始数据
    const displayData = computed(() => {
      if (props.loadingMode === 'pull-refresh') {
        return isPullRefreshData.value ? pullRefreshDataSource.value : props.data;
      }
      return isPaginateData.value ? paginationDataSource.value : props.data;
    });

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
      slots: SetupContext['slots'],
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

      if (slots[col.colKey]) {
        return slots[col.colKey](params);
      }

      if (isString(col.cell) && slots?.[col.cell]) {
        return slots[col.cell](params);
      }

      if (isFunction(col.render)) {
        return col.render(h, { ...params, type: 'cell' });
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
      props.onScroll?.({ e });

      // 滚动到底部检测
      const threshold = 50;
      if (target.scrollHeight - target.scrollTop - target.clientHeight <= threshold) {
        props.onScrollToBottom?.();
      }
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

    const renderTableBody = () => {
      const renderContentEmpty = renderTNodeJSX('empty') || t(globalConfig.value.empty);
      if (!displayData.value?.length && renderContentEmpty) {
        return (
          <tr class={tableBaseClass.emptyRow}>
            <td colspan={props.columns?.length}>
              <div class={tableBaseClass.empty}>{renderContentEmpty}</div>
            </td>
          </tr>
        );
      }
      if (displayData.value?.length) {
        return displayData.value?.map((tr_item, tr_index) => {
          const rowId = get(tr_item, props.rowKey || 'id') as string | number;
          const { style, classes } = getRowFixedStyles(
            rowId,
            tr_index,
            displayData.value?.length || 0,
            props.fixedRows as TdBaseTableProps['fixedRows'],
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

          const nodes = [
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
                const params = { row: tr_item, col: td_item, rowIndex: tr_index, colIndex: td_index };
                const cellSpans: Record<string, number> = {};
                // 处理合并单元格
                const cellKey = `${get(tr_item, props.rowKey || 'id')}_${td_item.colKey || td_index}`;
                const { skipped, rowspan, colspan } = handleCellSpan(cellKey, skipSpansMap.value);

                if (skipped) return null;

                rowspan && (cellSpans.rowspan = rowspan);
                colspan && (cellSpans.colspan = colspan);

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

                const cellClasses = [
                  tdClassName(td_item, [tdStyles.classes, customClasses]),
                  {
                    // 合并单元格场景：最后一行移除底部边框
                    [tableBaseClass.tdLastRow]: isLastRowInSpan(tr_index, rowspan, displayData.value?.length),
                    // 合并单元格场景：第一列移除左边框
                    [tableBaseClass.tdFirstCol]: props.rowspanAndColspan && isFirstColumnInSpan(td_index, rowspan),
                  },
                ];

                return (
                  <td
                    key={td_index}
                    style={tdStyles.style}
                    class={cellClasses}
                    onClick={($event) => {
                      handleCellClick(tr_item, td_item, tr_index, td_index, $event);
                    }}
                    {...cellSpans}
                  >
                    <div class={td_item.ellipsis && ellipsisClasses.value}>
                      {renderCell(params, context.slots, props.cellEmptyContent)}
                    </div>
                  </td>
                );
              })}
            </tr>,
          ];

          // 展开行渲染（由 PrimaryTable 通过内部通信注入）
          if (tableInternalCtx?.renderExpandedRow) {
            const expandedNode = tableInternalCtx.renderExpandedRow({
              row: tr_item,
              index: tr_index,
              columns: props.columns || [],
              tableWidth: tableWidth.value,
              isWidthOverflow: isWidthOverflow.value,
            });
            if (expandedNode) {
              nodes.push(expandedNode as any);
            }
          }

          return nodes;
        });
      }
    };

    // 通知 PrimaryTable 叶子列变化（用于拖拽排序）
    watch(
      () => columns.value,
      (newCols) => {
        if (tableInternalCtx?.onLeafColumnsChange && newCols) {
          tableInternalCtx.onLeafColumnsChange(newCols as BaseTableColumns);
        }
      },
      { immediate: true, deep: true },
    );

    context.expose({
      refreshTable,
      tableElement: tableRef,
      tableHtmlElement: tableElmRef,
      tableContentElement: tableContentRef,
    });

    return () => {
      const renderFooter = renderTNodeJSX('footerSummary');

      const isPullRefreshMode = props.loadingMode === 'pull-refresh';

      const renderTableHeader = () =>
        props.showHeader && (
          <thead ref={theadRef} class={theadClasses.value}>
            <tr>
              {props.columns?.map((item_th, index_th) => {
                const thStyles = getColumnFixedStyles(
                  item_th,
                  index_th,
                  rowAndColFixedPosition.value,
                  tableColFixedClasses,
                );
                const customClasses = formatClassNames(item_th.className, {
                  col: item_th,
                  colIndex: index_th,
                  row: {},
                  rowIndex: -1,
                  type: 'th',
                });
                return (
                  <th
                    key={index_th}
                    class={thClassName(item_th, [thStyles.classes, customClasses])}
                    style={thStyles.style}
                    data-colKey={item_th.colKey}
                  >
                    <div class={(item_th.ellipsisTitle || item_th.ellipsis) && ellipsisClasses.value}>
                      {renderTitle(context.slots, item_th, index_th)}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
        );

      // pull-refresh 模式下，上拉加载 loading 由 usePullRefresh hook 内部渲染
      const renderLoading = () => {
        if (isPullRefreshMode) {
          return renderPullRefreshLoading();
        }
        // 非 pull-refresh 模式，使用外部 loading 控制
        if (!props.loading) return null;
        return (
          <div class={`${classPrefix}-table__loading--full`}>
            <TLoading {...(props.loadingProps as TdLoadingProps)} />
          </div>
        );
      };

      // 外部传入 loading={true} 时的全屏 loading（pull-refresh 模式下也支持外部控制全屏 loading）
      const renderFullLoading = () => {
        if (!props.loading || !isPullRefreshMode) return null;
        return (
          <div class={`${classPrefix}-table__loading--full`}>
            <TLoading {...(props.loadingProps as TdLoadingProps)} />
          </div>
        );
      };

      const renderPaginationNode = () =>
        props.pagination &&
        props.loadingMode === 'pagination' && <div class={tableBaseClass.paginationWrap}>{renderPagination()}</div>;

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
              {renderTableHeader()}
              <tbody
                class={tbodyClasses.value}
                style={
                  isPullRefreshMode
                    ? {
                        position: 'relative',
                        zIndex: 1,
                        backgroundColor: 'inherit',
                        transform: pullOffset.value > 0 ? `translateY(-${pullOffset.value}px)` : 'translateY(0)',
                        transition: isPulling.value ? 'none' : 'transform 0.3s ease',
                      }
                    : undefined
                }
              >
                {renderTableBody()}
              </tbody>
            </table>
            {renderLoading()}
            {renderFullLoading()}
            {renderPaginationNode()}
          </div>
          {renderFooter && <div class={tableBaseClass.bottomContent}>{renderFooter}</div>}
        </div>
      );
    };
  },
});

import { defineComponent, computed, ref, provide } from 'vue';
import { get } from 'lodash-es';
import BaseTable from './base-table';
import baseTableProps from './base-table-props';
import primaryTableProps from './primary-table-props';
import useClassName from './hooks/useClassName';
import useRowSelect from './hooks/useRowSelect';
import useSorter from './hooks/useSorter';
import useFilter from './hooks/useFilter';
import useDragSort from './hooks/useDragSort';
import useRowExpand from './hooks/useRowExpand';
import { renderTitle, renderTitleWidthIcon } from './hooks/useTableHeader';
import { tableInternalKey, PrimaryTableRef } from './interface';
import Ellipsis from './ellipsis';
import { resolveEllipsis } from './utils/ellipsis';
import { renderCell } from './utils';
import type { PageInfo, PaginationProps, PrimaryTableCol, TableRowData, BaseTableCellParams } from './type';

export default defineComponent({
  name: 'TPrimaryTable',
  props: {
    ...baseTableProps,
    ...primaryTableProps,
  },
  emits: [
    'cell-click',
    'row-click',
    'scroll',
    'change',
    'select-change',
    'sort-change',
    'filter-change',
    'expand-change',
    'drag-sort',
    'page-change',
  ],
  setup(props, context) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const p = props as any;
    const primaryTableRef = ref<PrimaryTableRef>();
    const innerPagination = ref<PaginationProps | undefined>(p.pagination);
    const {
      classPrefix,
      tableDraggableClasses,
      tableBaseClass,
      tableSelectedClasses,
      tableSortClasses,
      tableFilterClasses,
    } = useClassName();

    // 行选中功能
    const {
      selectedRowClassNames,
      setCurrentPaginateData,
      formatToRowSelectColumn,
      setTSelectedRowKeys,
      onInnerSelectRowClick,
    } = useRowSelect(p, tableSelectedClasses);

    // 排序功能
    const { renderSortIcon, tData } = useSorter(p);

    // 拖拽排序功能
    const { isRowHandlerDraggable, isRowDraggable, isColDraggable, updateLastRowList, setDragSortColumns } =
      useDragSort(p, {
        primaryTableRef: primaryTableRef as any,
        innerPagination,
      });

    // 过滤功能
    const { isTableOverflowHidden, renderFilterIcon } = useFilter(p, tableFilterClasses);

    // 展开/收起行功能
    const {
      showExpandedRow,
      showExpandIconColumn,
      getExpandColumn,
      renderExpandedRow,
      onInnerExpandRowClick,
      getExpandedRowClass,
    } = useRowExpand(p);

    // 提供内部通信上下文给 BaseTable
    provide(tableInternalKey, {
      onLeafColumnsChange: setDragSortColumns,
      renderExpandedRow: showExpandedRow ? renderExpandedRow : undefined,
    });

    // 处理列配置
    const getColumns = (columns: PrimaryTableCol<TableRowData>[]) => {
      const arr: PrimaryTableCol<TableRowData>[] = [];
      for (let i = 0, len = columns.length; i < len; i++) {
        let item = { ...columns[i] };
        const isDisplayColumn = item.children?.length || (p.displayColumns || []).includes(item.colKey);
        if (!isDisplayColumn && p.displayColumns) continue;
        item = formatToRowSelectColumn(item);
        const { sort, showSortColumnBgColor } = p;
        if (item.sorter && showSortColumnBgColor) {
          const sorts = sort instanceof Array ? sort : [sort];
          const sortedColumn = sorts.find((s: any) => s && s.sortBy === item.colKey && s.descending !== undefined);
          if (sortedColumn) {
            item.className =
              item.className instanceof Array
                ? [...item.className, tableSortClasses.sortColumn]
                : [item.className, tableSortClasses.sortColumn];
          }
        }
        if (item.sorter || item.filter) {
          // 排序/过滤列：title 由 renderTitleWidthIcon 渲染，内部处理超出省略
          const titleContent = renderTitle(context.slots, item, i);
          const { sorter } = item;
          const { filter } = item;
          const { ellipsisTitle } = item;
          item.title = (_renderFn: any, params: any) => {
            const sortIconResult = sorter ? renderSortIcon(params) : null;
            const filterIconResult = filter ? renderFilterIcon(params) : null;
            const attach = primaryTableRef.value?.tableContentElement;
            return renderTitleWidthIcon(
              [titleContent, sortIconResult, filterIconResult].filter(Boolean) as any,
              tableSortClasses,
              tableFilterClasses,
              params.col,
              params.colIndex,
              ellipsisTitle,
              attach,
              { classPrefix, ellipsisOverlayClassName: '' },
            );
          };
          item.ellipsisTitle = false;
        } else {
          // 普通列：按需将 title 包装为超出省略浮层（ellipsisTitle 优先级高于 ellipsis）
          const titleEllipsis = resolveEllipsis(item.ellipsisTitle !== undefined ? item.ellipsisTitle : item.ellipsis, {
            col: item,
            colIndex: i,
          });
          if (titleEllipsis.enabled) {
            const titleContent = renderTitle(context.slots, item, i);
            item.title = () => (
              <Ellipsis
                classPrefix={classPrefix}
                popupContent={(titleEllipsis.content ?? titleContent) as any}
                popupProps={titleEllipsis.props}
              >
                {titleContent}
              </Ellipsis>
            );
            item.ellipsisTitle = false;
          }
        }

        // 单元格超出省略
        if (item.ellipsis) {
          const { ellipsis, cell: oldCell, render: oldRender } = item;
          const { cellEmptyContent } = p;
          item.cell = (h2: any, cellParams: BaseTableCellParams<TableRowData>) => {
            // 复用原始 cell/render，避免 cell 被替换后无限递归
            const baseParams = {
              ...cellParams,
              col: { ...cellParams.col, cell: oldCell, render: oldRender },
            } as BaseTableCellParams<TableRowData>;
            const cellNode = renderCell(baseParams, context.slots, cellEmptyContent);
            const resolved = resolveEllipsis(ellipsis, cellParams);
            return (
              <Ellipsis
                classPrefix={classPrefix}
                popupContent={(resolved.content ?? cellNode) as any}
                popupProps={resolved.props}
              >
                {cellNode}
              </Ellipsis>
            );
          };
        }
        if (item.children?.length) {
          item.children = getColumns(item.children);
        }
        if (!item.children || item.children?.length) {
          arr.push(item);
        }
      }
      return arr;
    };

    const tColumns = computed(() => {
      const cols = getColumns(p.columns || []);
      if (showExpandIconColumn) {
        cols.unshift(getExpandColumn());
      }
      return cols;
    });

    // 行类名合并
    const tRowClassNames = computed(() => {
      const classList: any[] = [p.rowClassName, selectedRowClassNames.value, getExpandedRowClass];
      return classList.filter(Boolean);
    });

    // 行属性合并
    const tRowAttributes = computed(() => {
      const attributes: any[] = [p.rowAttributes];
      if (isRowHandlerDraggable.value || isRowDraggable.value) {
        attributes.push(({ row }: any) => ({ 'data-id': get(row, p.rowKey || 'id') }));
      }
      return attributes.filter(Boolean);
    });

    // 表格外层类名
    const primaryTableClasses = computed(() => ({
      [tableDraggableClasses.colDraggable]: isColDraggable.value,
      [tableDraggableClasses.rowHandlerDraggable]: isRowHandlerDraggable.value,
      [tableDraggableClasses.rowDraggable]: isRowDraggable.value,
      [tableBaseClass.overflowVisible]: isTableOverflowHidden.value === false,
    }));

    // 分页变化处理
    const onInnerPageChange = (pageInfo: PageInfo, newData: Array<TableRowData>) => {
      innerPagination.value = { ...innerPagination.value, ...pageInfo };
      setCurrentPaginateData(newData);
      p.onPageChange?.(pageInfo, newData);
      p.onChange?.({ pagination: pageInfo }, { trigger: 'pagination', currentData: newData });
      if (!p.reserveSelectedRowOnPaginate) {
        setTSelectedRowKeys([], {
          selectedRowData: [],
          type: 'uncheck',
          currentRowKey: 'CLEAR_ON_PAGINATE',
        });
      }
    };

    // 行点击处理
    const onInnerRowClick = (params: any) => {
      if (p.expandOnRowClick) {
        onInnerExpandRowClick(params);
      }
      if (p.selectOnRowClick) {
        onInnerSelectRowClick(params);
      }
    };

    // 滚动处理
    const onPrimaryTableScroll = (params: any) => {
      p.onScroll?.(params);
      updateLastRowList();
    };

    // 处理受控数据源（排序后的数据），分页切片交由 BaseTable 内部的 usePagination 处理
    const displayData = computed(() => {
      const sourceData = tData.value && tData.value.length ? tData.value : p.data || [];
      return sourceData;
    });

    return () => {
      return (
        <BaseTable
          ref={primaryTableRef}
          {...p}
          class={[primaryTableClasses.value, p.class]}
          columns={tColumns.value}
          rowClassName={tRowClassNames.value}
          rowAttributes={tRowAttributes.value}
          data={displayData.value}
          onPageChange={onInnerPageChange}
          onScroll={onPrimaryTableScroll}
          onRowClick={p.expandOnRowClick || p.selectOnRowClick ? onInnerRowClick : p.onRowClick}
        />
      );
    };
  },
});

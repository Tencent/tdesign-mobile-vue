import { computed, defineComponent, nextTick, ref, watch } from 'vue';
import { get } from 'lodash-es';
import baseTableProps from './base-table-props';
import primaryTableProps from './primary-table-props';
import TBaseTable from './base-table';
import useClassName from './hooks/useClassName';
import useSorter from './hooks/useSorter';
import useFilter from './hooks/useFilter';
import useDragSort, { DATA_ID_ATTR } from './hooks/useDragSort';
import useRowSelect from './hooks/useRowSelect';
import { renderTitle, renderTitleWidthIcon } from './hooks/useTableHeader';
import type { BaseTableColumns, BaseTableExpose } from './interface';
import type { PrimaryTableCol, TableRowData, TdBaseTableProps, TdPrimaryTableProps } from './type';

// BaseTable 支持的属性名称列表，用于从PrimaryTable 全量属性中筛选出需要透传给 BaseTable 的部分
// 避免将 sort/filterValue/dragSort 等 PrimaryTable 专属属性作为多余 DOM 属性透传到 BaseTable 根节点
const BASE_TABLE_PROP_KEYS = Object.keys(baseTableProps);

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
    'scroll-to-bottom',
    'update:sort',
    'update:filterValue',
    'update:data',
    'update:selectedRowKeys',
  ],
  setup(props: TdPrimaryTableProps, context) {
    const { tableDraggableClasses, tableBaseClass, tableSortClasses, tableFilterClasses, tableSelectedClasses } =
      useClassName();
    const primaryTableRef = ref<BaseTableExpose>();

    // 排序功能
    const { tData, renderSortIcon } = useSorter(props);
    // 过滤功能
    const { isTableOverflowHidden, renderFilterIcon, renderFirstFilterRow } = useFilter(props, context);
    // 拖拽排序功能
    const { isRowDraggable, isRowHandlerDraggable, isColDraggable, setDragSortColumns, registerDragEvent } =
      useDragSort(props);
    // 行选中功能
    const { selectedRowClassNames, formatToRowSelectColumn, onInnerSelectRowClick } = useRowSelect(
      props,
      tableSelectedClasses,
    );

    const primaryTableClasses = computed(() => [
      {
        [tableDraggableClasses.colDraggable]: isColDraggable.value,
        [tableDraggableClasses.rowHandlerDraggable]: isRowHandlerDraggable.value,
        [tableDraggableClasses.rowDraggable]: isRowDraggable.value,
        [tableBaseClass.overflowVisible]: isTableOverflowHidden.value === false,
      },
    ]);

    // 列配置功能：当前显示的列
    const tDisplayColumns = computed(() => props.displayColumns || props.defaultDisplayColumns);

    // 为排序列、筛选列添加排序图标、筛选图标；处理自定义列显示；处理选中列
    const getColumns = (columns: PrimaryTableCol<TableRowData>[]): PrimaryTableCol<TableRowData>[] => {
      const arr: PrimaryTableCol<TableRowData>[] = [];
      for (let i = 0, len = columns.length; i < len; i++) {
        let item = { ...columns[i] };
        // 自定义列显示控制
        const isDisplayColumn = item.children?.length || tDisplayColumns.value?.includes(item.colKey);
        if (!isDisplayColumn && tDisplayColumns.value) continue;

        // 行选中列处理
        if (['multiple', 'single'].includes(item.type)) {
          item = formatToRowSelectColumn(item) as PrimaryTableCol<TableRowData>;
        }

        const { sort, showSortColumnBgColor } = props;
        if (item.sorter && showSortColumnBgColor) {
          const sorts = sort instanceof Array ? sort : [sort];
          const sortedColumn = sorts.find((s) => s && s.sortBy === item.colKey && s.descending !== undefined);
          if (sortedColumn) {
            const originClassNames = item.className instanceof Array ? item.className : [item.className];
            item.className = originClassNames.concat(tableSortClasses.sortColumn).filter(Boolean);
          }
        }
        // 添加排序图标和过滤图标
        if (item.sorter || item.filter) {
          const titleContent = renderTitle(context.slots, item as unknown as Parameters<typeof renderTitle>[1], i);
          item.title = ((h: any, p: any) => {
            const sortIcon = item.sorter ? renderSortIcon(p) : null;
            const filterIcon = item.filter ? renderFilterIcon(p) : null;
            return renderTitleWidthIcon([titleContent, sortIcon, filterIcon], tableSortClasses, tableFilterClasses);
          }) as unknown as PrimaryTableCol<TableRowData>['title'];
          item.ellipsisTitle = false;
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

    const tColumns = computed(() => getColumns(props.columns || []));

    const onLeafColumnsChange = (columns: BaseTableColumns) => {
      setDragSortColumns(columns);
    };

    const registerDragEventNextTick = () => {
      nextTick(() => {
        if (!primaryTableRef.value) return;
        registerDragEvent(primaryTableRef.value.tableElement);
      });
    };

    // 监听列/拖拽模式/数据变化，(重新)注册拖拽事件
    watch(
      () => [tColumns.value, props.dragSort, tData.value],
      () => {
        registerDragEventNextTick();
      },
      { flush: 'post', immediate: true },
    );

    context.expose({
      tableElement: computed(() => primaryTableRef.value?.tableElement),
      tableContentElement: computed(() => primaryTableRef.value?.tableContentElement),
      tableHtmlElement: computed(() => primaryTableRef.value?.tableHtmlElement),
      refreshTable: () => primaryTableRef.value?.refreshTable(),
    });

    return () => {
      // 只透传 BaseTable 支持的属性，避免 sort/filterValue/dragSort 等 PrimaryTable 专属属性
      // 作为多余 attrs 落到 BaseTable 根节点上
      const baseTableForwardProps: Record<string, unknown> = {};
      BASE_TABLE_PROP_KEYS.forEach((key) => {
        baseTableForwardProps[key] = (props as unknown as Record<string, unknown>)[key];
      });
      // data排序结果使用内部维护的数据，兼容非受控本地排序场景
      baseTableForwardProps.data = tData.value;

      // 行选中样式
      if (selectedRowClassNames.value) {
        const existingRowClassName = baseTableForwardProps.rowClassName;
        const rowClassNames = Array.isArray(existingRowClassName) ? existingRowClassName : [existingRowClassName];
        baseTableForwardProps.rowClassName = [
          ...rowClassNames,
          ...(Array.isArray(selectedRowClassNames.value) ? selectedRowClassNames.value : [selectedRowClassNames.value]),
        ].filter(Boolean);
      }

      // 点击行选中
      if (props.selectOnRowClick) {
        const existingRowClick = baseTableForwardProps.onRowClick as TdPrimaryTableProps['onRowClick'];
        baseTableForwardProps.onRowClick = (params: Parameters<TdPrimaryTableProps['onRowClick']>[0]) => {
          onInnerSelectRowClick(params);
          existingRowClick?.(params);
        };
      }

      // 拖拽排序需要每行带 data-id 属性，用于 SortableJS 标识节点
      if (props.dragSort) {
        const rowKey = props.rowKey || 'id';
        const existingRowAttrs = props.rowAttributes;
        baseTableForwardProps.rowAttributes = (params: { row: TableRowData; rowIndex: number; type: string }) => {
          const idAttr = { [DATA_ID_ATTR]: String(get(params.row, rowKey)) };
          if (typeof existingRowAttrs === 'function') {
            return { ...existingRowAttrs(params as any), ...idAttr };
          }
          if (existingRowAttrs && typeof existingRowAttrs === 'object') {
            return { ...existingRowAttrs, ...idAttr };
          }
          return idAttr;
        };
      }

      return (
        <div class={primaryTableClasses.value}>
          {renderFirstFilterRow()}
          <TBaseTable
            {...baseTableForwardProps}
            ref={primaryTableRef}
            columns={tColumns.value as unknown as TdBaseTableProps['columns']}
            thDraggable={isColDraggable.value}
            onLeafColumnsChange={onLeafColumnsChange}
            v-slots={context.slots}
          />
        </div>
      );
    };
  },
});

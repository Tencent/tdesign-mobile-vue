import { ref, h, watch } from 'vue';
import { get, isFunction } from 'lodash-es';
import { ChevronRightCircleIcon } from 'tdesign-icons-vue-next';
import { enableRowDrag } from '../utils';
import useClassName from './useClassName';
import { DATA_ID_ATTR, DATA_PARENT_ID_ATTR, EXPANDED_SUFFIX } from './useDragSort';
import type {
  PrimaryTableCellParams,
  PrimaryTableCol,
  RowClassNameParams,
  RowEventContext,
  TableExpandedRowParams,
  TableRowData,
  TdPrimaryTableProps,
} from '../type';

function useRowExpand(props: TdPrimaryTableProps) {
  const { tableExpandClasses, positiveRotate90, tableFullRowClasses } = useClassName();

  const isControlled = props.expandedRowKeys !== undefined;
  const tExpandedRowKeys = ref<Array<string | number>>(props.expandedRowKeys || props.defaultExpandedRowKeys || []);

  // 受控模式下同步外部 expandedRowKeys
  watch(
    () => props.expandedRowKeys,
    (val) => {
      if (isControlled) {
        tExpandedRowKeys.value = val || [];
      }
    },
  );

  const setTExpandedRowKeys = (keys: Array<string | number>, options: any) => {
    if (isControlled) {
      props.onExpandChange?.(keys, options);
    } else {
      tExpandedRowKeys.value = keys;
      props.onExpandChange?.(keys, options);
    }
  };

  const showExpandedRow = Boolean(props.expandedRow);

  const getExpandedRowClass = (params: RowClassNameParams<TableRowData>) => {
    if (!showExpandedRow) return null;
    const { row, rowKey } = params;
    const currentRowKey = get(row, rowKey || 'id');
    return tExpandedRowKeys.value?.includes(currentRowKey) ? tableExpandClasses.expanded : tableExpandClasses.collapsed;
  };

  const showExpandIconColumn = props.expandIcon !== false && showExpandedRow;

  const isFirstColumnFixed = props.columns?.[0]?.fixed === 'left';

  const onToggleExpand = (e: Event, row: TableRowData) => {
    if (props.onExpandChange) {
      e.stopPropagation();
    }
    const currentId = get(row, props.rowKey || 'id');
    const index = tExpandedRowKeys.value.indexOf(currentId as string | number);
    const newKeys = [...tExpandedRowKeys.value];
    if (index !== -1) {
      newKeys.splice(index, 1);
    } else {
      newKeys.push(currentId as string | number);
    }
    setTExpandedRowKeys(newKeys, {
      expandedRowData: (props.data || []).filter((t) => newKeys.includes(get(t, props.rowKey || 'id'))),
      currentRowData: row,
    });
  };

  const renderExpandIcon = (p: PrimaryTableCellParams<TableRowData>, expandIcon: TdPrimaryTableProps['expandIcon']) => {
    const { row, rowIndex } = p;
    const currentId = get(row, props.rowKey || 'id');
    const expanded = tExpandedRowKeys.value.includes(currentId as string | number);
    const defaultIcon = <ChevronRightCircleIcon />;
    let icon: any = defaultIcon;
    if (expandIcon === false || expandIcon === null) {
      icon = null;
    } else if (isFunction(expandIcon)) {
      icon = expandIcon(h, { row, index: rowIndex });
    }
    const classes = [
      tableExpandClasses.iconBox,
      expanded ? tableExpandClasses.expanded : tableExpandClasses.collapsed,
      { [positiveRotate90]: expanded },
    ];
    return (
      <span class={classes} onClick={(e: Event) => onToggleExpand(e, row)}>
        {icon}
      </span>
    );
  };

  const getExpandColumn = () => {
    const expandCol: PrimaryTableCol<TableRowData> = {
      colKey: '__EXPAND_ROW_ICON_COLUMN__',
      width: 46,
      className: tableExpandClasses.iconCell,
      fixed: isFirstColumnFixed ? 'left' : undefined,
      cell: (_h: any, p: PrimaryTableCellParams<TableRowData>) => renderExpandIcon(p, props.expandIcon),
    };
    return expandCol;
  };

  const renderExpandedRow = (
    p: TableExpandedRowParams<TableRowData> & { tableWidth: number; isWidthOverflow: boolean },
  ) => {
    const rowId = get(p.row, props.rowKey || 'id');
    if (!tExpandedRowKeys.value || !tExpandedRowKeys.value.includes(rowId as string | number)) return null;

    const isFixedLeft = p.isWidthOverflow && (props.columns || []).find((item: any) => item.fixed === 'left');
    const dragAttr = enableRowDrag(props.dragSort) && {
      [DATA_ID_ATTR]: `${rowId}${EXPANDED_SUFFIX}`,
      [DATA_PARENT_ID_ATTR]: rowId,
    };

    return (
      <tr
        key={`${rowId}${EXPANDED_SUFFIX}`}
        {...dragAttr}
        class={[tableExpandClasses.row, { [tableFullRowClasses.base]: isFixedLeft }]}
      >
        <td colspan={(p.columns || []).length}>
          <div
            class={[tableExpandClasses.rowInner, { [tableFullRowClasses.innerFullRow]: isFixedLeft }]}
            style={isFixedLeft ? { width: `${p.tableWidth}px` } : {}}
          >
            <div class={tableFullRowClasses.innerFullElement}>
              {typeof props.expandedRow === 'function' ? props.expandedRow(h, p) : props.expandedRow}
            </div>
          </div>
        </td>
      </tr>
    );
  };

  const onInnerExpandRowClick = (p: RowEventContext<TableRowData>) => {
    onToggleExpand(p.e, p.row);
  };

  return {
    showExpandedRow,
    showExpandIconColumn,
    getExpandColumn,
    renderExpandedRow,
    onInnerExpandRowClick,
    getExpandedRowClass,
    tExpandedRowKeys,
  };
}

export default useRowExpand;

// 行选中相关功能：单选 + 多选

import { ref, computed, watch } from 'vue';
import { get, intersection, isFunction } from 'lodash-es';
import log from '../../_common/js/log';
import { isRowSelectedDisabled } from '../../_common/js/table/utils';
import Checkbox from '../../checkbox/checkbox';
import Radio from '../../radio/radio';
import type {
  PrimaryTableCellParams,
  PrimaryTableCol,
  RowClassNameParams,
  TableRowData,
  TdBaseTableProps,
  TdPrimaryTableProps,
} from '../type';
import type { TableClassName } from './useClassName';

const selectedRowDataMap = new Map<string | number, TableRowData>();

export default function useRowSelect(
  props: TdPrimaryTableProps,
  tableSelectedClasses: TableClassName['tableSelectedClasses'],
) {
  const currentPaginateData = ref<TableRowData[]>(props.data || []);
  const selectedRowClassNames = ref<TdBaseTableProps['rowClassName']>();

  // 使用简单的受控/非受控逻辑
  const isControlled = props.selectedRowKeys !== undefined;
  const tSelectedRowKeys = ref<Array<string | number>>(props.selectedRowKeys || props.defaultSelectedRowKeys || []);

  // 受控模式下同步外部 selectedRowKeys
  watch(
    () => props.selectedRowKeys,
    (val) => {
      if (isControlled) {
        tSelectedRowKeys.value = val || [];
      }
    },
  );

  const setTSelectedRowKeys = (keys: Array<string | number>, options: any) => {
    if (isControlled) {
      props.onSelectChange?.(keys, options);
    } else {
      tSelectedRowKeys.value = keys;
      props.onSelectChange?.(keys, options);
    }
  };

  const selectColumn = props.columns?.find((col: any) => ['multiple', 'single'].includes(col.type));

  const canSelectedRows = computed(() => {
    const currentData = props.reserveSelectedRowOnPaginate ? props.data : currentPaginateData.value;
    return currentData?.filter((row, rowIndex): boolean => !isDisabled(row, rowIndex)) || [];
  });

  const intersectionKeys = computed(() =>
    intersection(
      tSelectedRowKeys.value,
      canSelectedRows.value.map((t) => get(t, props.rowKey || 'id')),
    ),
  );

  watch(
    () => [props.data, props.reserveSelectedRowOnPaginate],
    () => {
      if (props.reserveSelectedRowOnPaginate) return;
      if (!props.pagination) {
        currentPaginateData.value = props.data || [];
        return;
      }
      const { pageSize, current, defaultPageSize, defaultCurrent } = props.pagination;
      const tPageSize = pageSize || defaultPageSize;
      const tCurrent = current || defaultCurrent;
      const newData = (props.data || []).slice(tPageSize * (tCurrent - 1), tPageSize * tCurrent);
      currentPaginateData.value = newData;
    },
    { immediate: true },
  );

  watch(
    () => [props.data, props.columns, tSelectedRowKeys.value, selectColumn, props.rowKey],
    () => {
      if (!selectColumn && (!tSelectedRowKeys.value || !tSelectedRowKeys.value.length)) return;
      const disabledRowFunc = (p: RowClassNameParams<TableRowData>): string =>
        selectColumn && selectColumn.disabled && selectColumn.disabled(p) ? tableSelectedClasses.disabled : '';
      const disabledRowClass = selectColumn?.disabled ? disabledRowFunc : undefined;
      const selected = new Set(tSelectedRowKeys.value);
      const selectedRowClassFunc = ({ row }: RowClassNameParams<TableRowData>) => {
        const rowId = get(row, props.rowKey || 'id');
        return selected.has(rowId) ? tableSelectedClasses.selected : '';
      };
      const selectedRowClass = selected.size ? selectedRowClassFunc : undefined;
      selectedRowClassNames.value = [disabledRowClass, selectedRowClass].filter(Boolean) as any;
    },
    { immediate: true },
  );

  function isDisabled(row: Record<string, any>, rowIndex: number): boolean {
    return isRowSelectedDisabled(selectColumn, row, rowIndex);
  }

  function getSelectedHeader() {
    return () => {
      const isIndeterminate =
        // 一些可见的行已被选中，但不是全部
        (intersectionKeys.value.length > 0 && intersectionKeys.value.length < canSelectedRows.value.length) ||
        // 某些被选中的行不可见（例如折叠的树子节点）
        intersectionKeys.value.length < tSelectedRowKeys.value.length;
      const isChecked =
        canSelectedRows.value.length !== 0 &&
        intersectionKeys.value.length === canSelectedRows.value.length &&
        // 确保所有已选中的行都是可见的（没有被折叠而隐藏的选中项）
        intersectionKeys.value.length === tSelectedRowKeys.value.length;
      return (
        <Checkbox
          icon="rectangle"
          checked={isChecked}
          indeterminate={isIndeterminate}
          disabled={!canSelectedRows.value.length}
          onChange={(checked: boolean) => handleSelectAll(checked)}
        />
      );
    };
  }

  function getRowSelectDisabledData(p: PrimaryTableCellParams<TableRowData>) {
    const { col, row, rowIndex } = p;
    const disabled: boolean =
      typeof col?.disabled === 'function' ? col.disabled({ row, rowIndex }) : (col as any)?.disabled;
    const checkProps = col && isFunction(col.checkProps) ? col.checkProps({ row, rowIndex }) : (col as any)?.checkProps;
    return {
      disabled: disabled || checkProps?.disabled,
      checkProps,
    };
  }

  function renderSelectCell(_h: any, p: PrimaryTableCellParams<TableRowData>) {
    const { col: column, row = {} } = p;
    const checked = tSelectedRowKeys.value.includes(get(row, props.rowKey || 'id'));
    const { disabled, checkProps } = getRowSelectDisabledData(p);
    const selectBoxProps = {
      checked,
      disabled,
      ...checkProps,
      onChange: () => {
        handleSelectChange(row);
      },
    };
    if (column.type === 'single') return <Radio {...selectBoxProps} />;
    if (column.type === 'multiple') {
      const isIndeterminate = props.indeterminateSelectedRowKeys?.length
        ? props.indeterminateSelectedRowKeys.includes(get(row, props.rowKey || 'id'))
        : false;
      return <Checkbox icon="rectangle" indeterminate={isIndeterminate} {...selectBoxProps} />;
    }
    return null;
  }

  const allowUncheck = computed(() => {
    const singleSelectCol = props.columns?.find((col: any) => col.type === 'single');
    if (!singleSelectCol || !singleSelectCol.checkProps || !('allowUncheck' in singleSelectCol.checkProps))
      return false;
    return singleSelectCol.checkProps.allowUncheck;
  });

  function handleSelectChange(row: TableRowData = {}) {
    let selectedRowKeys = [...tSelectedRowKeys.value];
    const reRowKey = props.rowKey || 'id';
    const id = get(row, reRowKey);
    const selectedRowIndex = selectedRowKeys.indexOf(id as string | number);
    const isExisted = selectedRowIndex !== -1;
    if (selectColumn && selectColumn.type === 'multiple') {
      if (isExisted) {
        selectedRowKeys.splice(selectedRowIndex, 1);
      } else {
        selectedRowKeys.push(id);
      }
    } else if (selectColumn && selectColumn.type === 'single') {
      selectedRowKeys = isExisted && allowUncheck.value ? [] : [id as string | number];
    } else {
      log.warn('Table', '`column.type` must be one of `multiple` and `single`');
      return;
    }
    setTSelectedRowKeys(selectedRowKeys, {
      selectedRowData: selectedRowKeys.map((t) => selectedRowDataMap.get(t)),
      currentRowKey: id,
      currentRowData: row,
      type: isExisted ? 'uncheck' : 'check',
    });
  }

  function handleSelectAll(checked: boolean) {
    const reRowKey = props.rowKey || 'id';
    const canSelectedRowKeys = canSelectedRows.value.map((record) => get(record, reRowKey));
    const disabledSelectedRowKeys = tSelectedRowKeys.value?.filter((id) => !canSelectedRowKeys.includes(id)) || [];
    const allIds = checked ? [...disabledSelectedRowKeys, ...canSelectedRowKeys] : [...disabledSelectedRowKeys];
    setTSelectedRowKeys(allIds as Array<string | number>, {
      selectedRowData: checked ? allIds.map((t) => selectedRowDataMap.get(t)) : [],
      type: checked ? 'check' : 'uncheck',
      currentRowKey: 'CHECK_ALL_BOX',
    });
  }

  function formatToRowSelectColumn(col: PrimaryTableCol) {
    const isSelection = ['multiple', 'single'].includes(col.type);
    if (!isSelection) {
      return col;
    }
    return {
      ...col,
      width: col.width || 64,
      className: tableSelectedClasses.checkCell,
      cell: (h: any, p: PrimaryTableCellParams<TableRowData>) => renderSelectCell(h, p),
      title: col.type === 'multiple' ? getSelectedHeader() : col.title,
    } as any as PrimaryTableCol;
  }

  const onInnerSelectRowClick = ({ row, index }: { row: TableRowData; index: number }) => {
    const selectedColIndex = (props.columns || []).findIndex((item: any) => item.colKey === 'row-select');
    if (selectedColIndex === -1) return;
    const { disabled } = getRowSelectDisabledData({
      row,
      rowIndex: index,
      col: (props.columns || [])[selectedColIndex],
      colIndex: selectedColIndex,
    });
    if (disabled) return;
    handleSelectChange(row);
  };

  watch(
    () => [props.data, props.rowKey],
    () => {
      for (let i = 0, len = (props.data || []).length; i < len; i++) {
        selectedRowDataMap.set(get(props.data[i], props.rowKey || 'id'), props.data[i]);
      }
    },
    { immediate: true },
  );

  const setCurrentPaginateData = (data: TableRowData[]) => {
    currentPaginateData.value = data;
  };

  return {
    selectedRowClassNames,
    currentPaginateData,
    setCurrentPaginateData,
    setTSelectedRowKeys,
    formatToRowSelectColumn,
    onInnerSelectRowClick,
    tSelectedRowKeys,
  };
}

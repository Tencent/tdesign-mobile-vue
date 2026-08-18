// 行选中相关功能：单选 + 多选

import { computed, toRefs, ref, watch } from 'vue';
import { get, intersection, isFunction } from 'lodash-es';
import { Checkbox } from '../../checkbox';
import { Radio } from '../../radio';
import useDefaultValue from '../../hooks/useDefaultValue';
import { isRowSelectedDisabled } from '../../_common/js/table/utils';
import type {
  PrimaryTableCellParams,
  PrimaryTableCol,
  TableRowData,
  TdBaseTableProps,
  TdPrimaryTableProps,
} from '../type';
import type { TableClassName } from './useClassName';

type RowClassNameParams<T> = Parameters<Extract<TdBaseTableProps['rowClassName'], Function>>[0] & { row: T };

const selectedRowDataMap = new Map<string | number, TableRowData>();

export default function useRowSelect(
  props: TdPrimaryTableProps,
  tableSelectedClasses: TableClassName['tableSelectedClasses'],
) {
  const { selectedRowKeys, columns, data, defaultSelectedRowKeys, rowKey, indeterminateSelectedRowKeys } =
    toRefs(props);

  const [tSelectedRowKeys, setTSelectedRowKeys] = useDefaultValue(
    selectedRowKeys,
    defaultSelectedRowKeys?.value || [],
    props.onSelectChange,
    'selectedRowKeys',
  );

  const selectColumn = computed(() => columns.value?.find(({ type }) => ['multiple', 'single'].includes(type)));

  const canSelectedRows = computed(() => {
    const currentData = data.value || [];
    return currentData.filter((row, rowIndex): boolean => !isDisabled(row, rowIndex));
  });

  // 选中的行，和所有可以选择的行，交集，用于计算 isSelectedAll 和 isIndeterminate
  const intersectionKeys = computed(() =>
    intersection(
      tSelectedRowKeys.value || [],
      canSelectedRows.value.map((t) => get(t, rowKey?.value || 'id')),
    ),
  );

  const selectedRowClassNames = ref<TdBaseTableProps['rowClassName']>();

  watch(
    [() => data.value, () => columns.value, tSelectedRowKeys, selectColumn, () => rowKey?.value],
    () => {
      if (!selectColumn.value && (!tSelectedRowKeys.value || !tSelectedRowKeys.value.length)) return;
      const disabledRowFunc = (p: RowClassNameParams<TableRowData>): string =>
        selectColumn.value?.disabled?.(p as any) ? tableSelectedClasses.disabled : '';
      const disabledRowClass = selectColumn.value?.disabled ? disabledRowFunc : undefined;
      const selected = new Set(tSelectedRowKeys.value);
      const selectedRowClassFunc = ({ row }: RowClassNameParams<TableRowData>) => {
        const rowId = get(row, rowKey?.value || 'id');
        return selected.has(rowId) ? tableSelectedClasses.selected : '';
      };
      const selectedRowClass = selected.size ? selectedRowClassFunc : undefined;
      selectedRowClassNames.value = [disabledRowClass, selectedRowClass].filter(Boolean) as any;
    },
    { immediate: true },
  );

  // 缓存行数据
  watch(
    () => data.value,
    (newData) => {
      if (!newData) return;
      for (let i = 0, len = newData.length; i < len; i++) {
        selectedRowDataMap.set(get(newData[i], rowKey?.value || 'id'), newData[i]);
      }
    },
    { immediate: true },
  );

  function isDisabled(row: Record<string, any>, rowIndex: number): boolean {
    return isRowSelectedDisabled(selectColumn.value, row, rowIndex);
  }

  const allowUncheck = computed(() => {
    const singleSelectCol = columns.value?.find((col) => col.type === 'single');
    if (!singleSelectCol || !singleSelectCol.checkProps || !('allowUncheck' in (singleSelectCol.checkProps as any)))
      return false;
    return (singleSelectCol.checkProps as any).allowUncheck;
  });

  function handleSelectChange(row: TableRowData = {}) {
    let selectedKeys = [...(tSelectedRowKeys.value || [])];
    const reRowKey = rowKey?.value || 'id';
    const id = get(row, reRowKey);
    const selectedRowIndex = selectedKeys.indexOf(id);
    const isExisted = selectedRowIndex !== -1;
    if (selectColumn.value?.type === 'multiple') {
      if (isExisted) {
        selectedKeys.splice(selectedRowIndex, 1);
      } else {
        selectedKeys.push(id);
      }
    } else if (selectColumn.value?.type === 'single') {
      selectedKeys = isExisted && allowUncheck.value ? [] : [id];
    } else {
      return;
    }
    setTSelectedRowKeys(selectedKeys, {
      selectedRowData: selectedKeys.map((t) => selectedRowDataMap.get(t)),
      currentRowKey: id,
      currentRowData: row,
      type: isExisted ? 'uncheck' : 'check',
    });
  }

  function handleSelectAll(checked: boolean) {
    const reRowKey = rowKey?.value || 'id';
    const canSelectedRowKeys = canSelectedRows.value.map((record) => get(record, reRowKey));
    const disabledSelectedRowKeys = selectedRowKeys?.value?.filter((id) => !canSelectedRowKeys.includes(id)) || [];
    const allIds = checked ? [...disabledSelectedRowKeys, ...canSelectedRowKeys] : [...disabledSelectedRowKeys];
    setTSelectedRowKeys(allIds, {
      selectedRowData: checked ? allIds.map((t) => selectedRowDataMap.get(t)) : [],
      type: checked ? 'check' : 'uncheck',
      currentRowKey: 'CHECK_ALL_BOX',
    });
  }

  function getRowSelectDisabledData(p: PrimaryTableCellParams<TableRowData>) {
    const { col, row, rowIndex } = p;
    if (!col) return { disabled: false, checkProps: undefined };
    const disabled: boolean = typeof col.disabled === 'function' ? col.disabled({ row, rowIndex }) : col.disabled;
    const checkProps = isFunction(col.checkProps) ? col.checkProps({ row, rowIndex }) : col.checkProps;
    return {
      disabled: disabled || (checkProps as any)?.disabled,
      checkProps,
    };
  }

  function renderSelectCell(p: PrimaryTableCellParams<TableRowData>) {
    const { col: column, row = {} } = p;
    const checked = (tSelectedRowKeys.value || []).includes(get(row, rowKey?.value || 'id'));
    const { disabled, checkProps } = getRowSelectDisabledData(p);
    const selectBoxProps = {
      checked,
      disabled,
      ...(checkProps as object),
      onChange: () => {
        handleSelectChange(row);
      },
    };
    if (column.type === 'single') return <Radio {...selectBoxProps} />;
    if (column.type === 'multiple') {
      const isIndeterminate = indeterminateSelectedRowKeys?.value?.length
        ? indeterminateSelectedRowKeys.value.includes(get(row, rowKey?.value))
        : false;
      return <Checkbox icon="rectangle" indeterminate={isIndeterminate} {...selectBoxProps} />;
    }
    return null;
  }

  function getSelectedHeader() {
    const isIndeterminate =
      // 一些可见的行已被选中，但不是全部
      (intersectionKeys.value.length > 0 && intersectionKeys.value.length < canSelectedRows.value.length) ||
      // 某些被选中的行不可见
      intersectionKeys.value.length < (tSelectedRowKeys.value || []).length;
    const isChecked =
      canSelectedRows.value.length !== 0 &&
      intersectionKeys.value.length === canSelectedRows.value.length &&
      intersectionKeys.value.length === (tSelectedRowKeys.value || []).length;
    return (
      <Checkbox
        icon="rectangle"
        checked={isChecked}
        indeterminate={isIndeterminate}
        disabled={!canSelectedRows.value.length}
        onChange={handleSelectAll}
      />
    );
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
      cell: (_h: any, p: PrimaryTableCellParams<TableRowData>) => renderSelectCell(p),
      title: col.type === 'multiple' ? () => getSelectedHeader() : col.title,
    };
  }

  const onInnerSelectRowClick: TdPrimaryTableProps['onRowClick'] = ({ row, index }) => {
    if (!columns.value?.length) return;
    const selectedColIndex = columns.value.findIndex(
      (item) => item.colKey === 'row-select' || ['single', 'multiple'].includes(item.type),
    );
    if (selectedColIndex === -1) return;
    const col = columns.value[selectedColIndex];
    if (!col) return;
    const { disabled } = getRowSelectDisabledData({
      row,
      rowIndex: index,
      col,
      colIndex: selectedColIndex,
    });
    if (disabled) return;
    handleSelectChange(row);
  };

  return {
    selectedRowClassNames,
    tSelectedRowKeys,
    formatToRowSelectColumn,
    onInnerSelectRowClick,
  };
}

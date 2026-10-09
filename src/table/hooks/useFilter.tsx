import { ref, computed, watch, h } from 'vue';
import { isFunction } from 'lodash-es';
import { getColumnsResetValue } from '../../_common/js/table/utils';
import { usePrefixClass } from '../../hooks/useClass';
import useClassName from './useClassName';
import FilterController from '../FilterController';
import type {
  FilterValue,
  PrimaryTableCol,
  TableFilterChangeContext,
  TableRowData,
  TdPrimaryTableProps,
} from '../type';
import type { TableClassName } from './useClassName';

function isFilterValueExist(value: any) {
  const isArrayTrue = value instanceof Array && value.length;
  const isObject = typeof value === 'object' && !(value instanceof Array);
  const isObjectTrue = isObject && Object.keys(value || {}).length;
  return isArrayTrue || isObjectTrue || ![null, '', undefined].includes(value);
}

function filterEmptyData(data: FilterValue) {
  const newFilterValue: FilterValue = {};
  Object.keys(data).forEach((key) => {
    const item = data[key];
    if (isFilterValueExist(item)) {
      newFilterValue[key] = item;
    }
  });
  return newFilterValue;
}

export default function useFilter(
  props: TdPrimaryTableProps,
  tableFilterClasses: TableClassName['tableFilterClasses'],
) {
  const classPrefix = usePrefixClass();
  const { isFocusClass } = useClassName();
  const isTableOverflowHidden = ref<boolean>();

  const isControlled = props.filterValue !== undefined;
  const tFilterValue = ref<FilterValue>(props.filterValue || props.defaultFilterValue || {});

  // 受控模式下同步外部 filterValue
  watch(
    () => props.filterValue,
    (val) => {
      if (isControlled) {
        tFilterValue.value = val || {};
      }
    },
  );

  const setTFilterValue = (filterValue: FilterValue, context: any) => {
    if (isControlled) {
      props.onFilterChange?.(filterValue, context);
    } else {
      tFilterValue.value = filterValue;
      props.onFilterChange?.(filterValue, context);
    }
  };

  const innerFilterValue = ref<FilterValue>(tFilterValue.value);

  const hasEmptyCondition = computed(() => {
    const filterEmpty = filterEmptyData(tFilterValue.value || {});
    return !tFilterValue.value || !Object.keys(filterEmpty).length;
  });

  watch(
    () => tFilterValue.value,
    (val) => {
      innerFilterValue.value = val;
    },
  );

  function getFilterResultContent(): string {
    const arr: string[] = [];
    (props.columns || [])
      .filter((col) => col.filter)
      .forEach((col: any) => {
        let value = tFilterValue.value[col.colKey];
        if (col.filter.list && !['null', '', 'undefined'].includes(String(value))) {
          const formattedValue = value instanceof Array ? value : [value];
          const label: string[] = [];
          col.filter.list.forEach((option: any) => {
            if (formattedValue.includes(option.value)) {
              label.push(option.label);
            }
          });
          value = label.join();
        }
        if (isFilterValueExist(value)) {
          arr.push(`${col.title}：${value}`);
        }
      });
    return arr.join('；');
  }

  function onInnerFilterChange(val: any, column: PrimaryTableCol) {
    const filterValue = {
      ...innerFilterValue.value,
      [column.colKey]: val,
    };
    innerFilterValue.value = filterValue;
    if (!(column.filter as any)?.showConfirmAndReset) {
      emitFilterChange(filterValue, 'filter-change', column);
    }
  }

  function emitFilterChange(
    filterValue: FilterValue,
    trigger: TableFilterChangeContext<TableRowData>['trigger'],
    column?: PrimaryTableCol,
  ) {
    setTFilterValue(filterValue, { col: column, trigger });
    props.onChange?.({ filter: filterValue }, { trigger: 'filter', currentData: props.data });
  }

  function onReset(column: PrimaryTableCol) {
    const resetValues: Record<string, any> = {
      single: '',
      multiple: [],
      input: '',
    };
    const filterValue: FilterValue = {
      ...tFilterValue.value,
      [column.colKey]: resetValues[(column.filter as any)?.type] || (column.filter as any)?.resetValue || '',
    };
    emitFilterChange(filterValue, 'reset', column);
  }

  function onResetAll() {
    const resetValue: { [key: string]: any } = getColumnsResetValue(props.columns || []);
    emitFilterChange(resetValue, 'clear', undefined);
  }

  function onConfirm(column: PrimaryTableCol) {
    emitFilterChange(innerFilterValue.value, 'confirm', column);
  }

  function onPopupVisibleChange(visible: boolean) {
    if (visible && !isTableOverflowHidden.value) {
      isTableOverflowHidden.value = !visible;
    }
  }

  function renderFilterIcon({ col, colIndex }: { col: PrimaryTableCol<TableRowData>; colIndex: number }) {
    if (!col.filter) return null;
    return (
      <FilterController
        column={col}
        colIndex={colIndex}
        filterIcon={props.filterIcon}
        tFilterValue={tFilterValue.value}
        innerFilterValue={innerFilterValue.value}
        tableFilterClasses={tableFilterClasses}
        isFocusClass={isFocusClass}
        popupProps={(col.filter as any)?.popupProps}
        onVisibleChange={onPopupVisibleChange}
        onReset={onReset}
        onConfirm={onConfirm}
        onInnerFilterChange={onInnerFilterChange}
      />
    );
  }

  function renderFirstFilterRow() {
    if (hasEmptyCondition.value) return null;
    const defaultNode = {
      classPrefix: classPrefix.value,
      resultText: getFilterResultContent(),
      count: props.pagination?.total || (props.data || []).length,
      onResetAll,
    };
    const filterContent = isFunction(props.filterRow) ? props.filterRow(h) : props.filterRow;
    if (filterContent === null) return null;
    return filterContent || defaultNode;
  }

  return {
    hasEmptyCondition,
    isTableOverflowHidden,
    renderFilterIcon,
    renderFirstFilterRow,
    tFilterValue,
  };
}

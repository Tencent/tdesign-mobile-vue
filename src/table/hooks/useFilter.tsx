import { computed, h, ref, toRefs, watch, type SetupContext } from 'vue';
import { isFunction } from 'lodash-es';
import useDefaultValue from '../../hooks/useDefaultValue';
import { useConfig } from '../../config-provider/useConfig';
import { getColumnsResetValue } from '../../_common/js/table/utils';
import TButton from '../../button';
import TTableFilterController from '../components/filter-controller';
import useClassName from './useClassName';
import { renderTitle } from './useTableHeader';
import type { BaseTableColumns } from '../interface';
import type {
  FilterValue,
  PrimaryTableCol,
  TableFilterChangeContext,
  TableRowData,
  TdPrimaryTableProps,
} from '../type';

function isFilterValueExist(value: any) {
  const isArrayTrue = value instanceof Array && value.length;
  const isObject = typeof value === 'object' && !(value instanceof Array);
  const isObjectTrue = value !== null && isObject && Object.keys(value).length;
  return isArrayTrue || isObjectTrue || !['null', '', 'undefined'].includes(String(value));
}

// 筛选条件不为空，才需要显示筛选结果行
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

// 递归拿到所有的column（BaseTable 目前暂不支持多级表头渲染，此处仅做数据层兼容）
function getAllColumns(col: Array<PrimaryTableCol>, columns: Array<PrimaryTableCol>) {
  col.forEach((column) => {
    if (column.children) {
      getAllColumns(column.children, columns);
    }
    columns.push(column);
  });
}

export default function useFilter(props: TdPrimaryTableProps, context: Pick<SetupContext, 'slots'>) {
  const { t, globalConfig } = useConfig('table');
  const { filterValue, columns } = toRefs(props);
  const { tableFilterClasses, isFocusClass } = useClassName();
  const isTableOverflowHidden = ref<boolean>();

  // unControl and control
  const [tFilterValue, setTFilterValue] = useDefaultValue(
    filterValue,
    props.defaultFilterValue || {},
    props.onFilterChange,
    'filterValue',
  );

  // 过滤内部值
  const innerFilterValue = ref<FilterValue>(tFilterValue.value);

  const hasEmptyCondition = computed(() => {
    const filterEmpty = filterEmptyData(tFilterValue.value || {});
    return !tFilterValue.value || !Object.keys(filterEmpty).length;
  });

  watch(tFilterValue, (val) => {
    innerFilterValue.value = val;
  });

  function renderFirstFilterRow() {
    if (hasEmptyCondition.value) return null;
    const defaultNode = (
      <div class={tableFilterClasses.result}>
        <span>
          {t(globalConfig.value.searchResultText, {
            result: getFilterResultContent(),
            count: props.pagination?.total || props.data?.length,
          })}
        </span>
        <TButton theme="primary" variant="text" onClick={onResetAll}>
          {globalConfig.value.clearFilterResultButtonText}
        </TButton>
      </div>
    );
    const filterContent = isFunction(props.filterRow) ? props.filterRow(h) : props.filterRow;
    if (filterContent === null) return null;
    const r = filterContent || defaultNode;
    if (!r) return null;
    return <div class={tableFilterClasses.inner}>{r}</div>;
  }

  // 获取搜索条件内容，存在 options 需要获取其 label 显示
  function getFilterResultContent(): string {
    const arr: string[] = [];
    const allColumns: Array<PrimaryTableCol> = [];
    getAllColumns(props.columns, allColumns);
    allColumns
      .filter((col) => col.filter)
      .forEach((col, index) => {
        let value = tFilterValue.value[col.colKey];
        if (col.filter.list && !['null', '', 'undefined'].includes(String(value))) {
          const formattedValue = value instanceof Array ? value : [value];
          const label: string[] = [];
          col.filter.list.forEach((option) => {
            if (formattedValue.includes(option.value)) {
              label.push(option.label as string);
            }
          });
          value = label.join();
        }
        if (isFilterValueExist(value)) {
          const label = isFunction(col.filter?.label) ? col.filter.label(h) : col.filter?.label;
          const title = renderTitle(context.slots, col as unknown as BaseTableColumns[0], index);
          arr.push(`${label || title}：${value}`);
        }
      });
    return arr.join('；');
  }

  function onInnerFilterChange(val: any, column: PrimaryTableCol) {
    const newFilterValue = {
      ...innerFilterValue.value,
      [column.colKey]: val,
    };
    innerFilterValue.value = newFilterValue;
    if (!column.filter.showConfirmAndReset) {
      emitFilterChange(newFilterValue, 'filter-change', column);
    }
  }

  function emitFilterChange(
    newFilterValue: FilterValue,
    trigger: TableFilterChangeContext<TableRowData>['trigger'],
    column?: PrimaryTableCol,
  ) {
    setTFilterValue(newFilterValue, { col: column, trigger });
    props.onChange?.({ filter: newFilterValue }, { trigger: 'filter', currentData: props.data });
  }

  function onReset(column: PrimaryTableCol) {
    const newFilterValue: FilterValue = {
      ...tFilterValue.value,
      [column.colKey]:
        column.filter.resetValue ??
        {
          single: '',
          multiple: [],
          input: '',
        }[column.filter.type] ??
        '',
    };
    emitFilterChange(newFilterValue, 'reset', column);
  }

  function onResetAll() {
    const resetValue = getColumnsResetValue(columns.value);
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

  // 图标：内置图标，组件自定义图标，全局配置图标
  function renderFilterIcon({ col, colIndex }: { col: PrimaryTableCol<TableRowData>; colIndex: number }) {
    return (
      <TTableFilterController
        column={col}
        colIndex={colIndex}
        filterIcon={props.filterIcon}
        tFilterValue={tFilterValue.value}
        innerFilterValue={innerFilterValue.value}
        tableFilterClasses={tableFilterClasses}
        isFocusClass={isFocusClass}
        popupProps={col.filter.popupProps}
        onReset={onReset}
        onConfirm={onConfirm}
        onInnerFilterChange={onInnerFilterChange}
        onVisibleChange={onPopupVisibleChange}
      />
    );
  }

  return {
    hasEmptyCondition,
    isTableOverflowHidden,
    renderFilterIcon,
    renderFirstFilterRow,
  };
}

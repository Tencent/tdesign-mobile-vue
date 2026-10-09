import { ref, computed, watch } from 'vue';
import { isFunction } from 'lodash-es';
import SorterButton from '../SorterButton';
import type { PrimaryTableCol, SorterFun, SortInfo, TableRowData, TdPrimaryTableProps } from '../type';

export type SortMap = Record<string, SortInfo & { index: number }>;

export default function useSorter(props: TdPrimaryTableProps) {
  const { columns, multipleSort, sortIcon, hideSortTips, onChange, onDataChange, onSortChange } = props;
  const originalData = ref<TableRowData[]>();
  const innerSort = ref<SortInfo | SortInfo[]>();

  const isControlled = props.sort !== undefined;
  const tSortInfo = ref<SortInfo | SortInfo[]>(props.sort || props.defaultSort);

  // 受控模式下同步外部 sort
  watch(
    () => props.sort,
    (val) => {
      if (isControlled) {
        tSortInfo.value = val;
      }
    },
  );

  const setTSortInfo = (sortInfo: SortInfo | SortInfo[], options: any) => {
    if (isControlled) {
      onSortChange?.(sortInfo, options);
    } else {
      tSortInfo.value = sortInfo;
      onSortChange?.(sortInfo, options);
    }
  };

  const tData = ref<TableRowData[]>(props.data || []);

  // 同步外部 data 变化
  watch(
    () => props.data,
    (val) => {
      tData.value = val || [];
    },
  );

  const setTData = (data: TableRowData[], context: any) => {
    tData.value = data;
    onDataChange?.(data, context);
  };

  const sorterFuncMap = computed(() => getSorterFuncMap(columns || []));

  const sortArray = computed(() => {
    const sort = tSortInfo.value;
    if (!sort) return [];
    return Array.isArray(sort) ? sort : [sort];
  });

  const sortMap = computed(() =>
    sortArray.value.reduce<SortMap>((prev, cur, index) => {
      const newPrev = { ...prev };
      const { sortBy } = cur;
      newPrev[sortBy] = { index, ...cur };
      return newPrev;
    }, {} as SortMap),
  );

  const isSortInfoSame = (a: SortInfo | SortInfo[], b: SortInfo | SortInfo[]) => {
    const tmpSortInfo = Array.isArray(a) ? a : [a];
    const tmpInnerSortInfo = Array.isArray(b) ? b : [b];
    if (tmpSortInfo.length && !b) return false;
    const item = tmpSortInfo[0];
    const result = tmpInnerSortInfo.find((t) => t.sortBy === item.sortBy);
    if (!result) return false;
    return item.descending === result.descending;
  };

  const handleDataSort = (sortInfo: SortInfo | Array<SortInfo>) => {
    const sort = sortInfo;
    if (!sorterFuncMap.value || !Object.keys(sorterFuncMap.value).length) return;
    if (!originalData.value) {
      originalData.value = tData.value;
    }
    const isEmptyArraySort = !sort || (sort instanceof Array && !sort.length);
    const isEmptyObjectSort = !(sort instanceof Array) && !sort?.sortBy;
    if (isEmptyArraySort || isEmptyObjectSort) {
      setTData(originalData.value, { trigger: 'sort' });
      return originalData.value;
    }
    const formattedSort = sort instanceof Array ? sort : [sort];
    const newData: TableRowData[] = tData.value.slice().sort((a: TableRowData, b: TableRowData) => {
      let sortResult = 0;
      for (let i = 0, len = formattedSort.length; i < len; i++) {
        const item = formattedSort[i];
        const sortFunc = sorterFuncMap.value[item.sortBy];
        if (sortResult === 0 && sortFunc) {
          sortResult = item.descending ? sortFunc(b, a) : sortFunc(a, b);
        } else {
          break;
        }
      }
      return sortResult;
    });
    if (JSON.stringify(newData) === JSON.stringify(tData.value)) return;
    setTData(newData, { trigger: 'sort' });
    return newData;
  };

  const handleSortHeaderClick = (col: PrimaryTableCol<TableRowData>, p: { descending: boolean }) => {
    let sortInfo: SortInfo | Array<SortInfo>;
    if (multipleSort) {
      sortInfo = getMultipleNextSort(col, p);
    } else {
      const sort = tSortInfo.value instanceof Array ? tSortInfo.value[0] : tSortInfo.value;
      sortInfo = getSingleNextSort(col, sort || undefined, p);
    }
    const newData = handleDataSort(sortInfo);
    const currentData = newData || tData.value;
    const currentDataSource = currentData;
    setTSortInfo(sortInfo, { currentDataSource, col });
    onChange?.({ sorter: sortInfo }, { currentData, trigger: 'sorter' });
    innerSort.value = sortInfo;
  };

  watch(
    () => [tSortInfo.value, tData.value],
    () => {
      if (!tSortInfo.value || !Object.keys(tSortInfo.value).length || !tData.value.length) {
        return;
      }
      if (!isSortInfoSame(tSortInfo.value, innerSort.value)) {
        handleDataSort(tSortInfo.value);
      }
    },
    { immediate: true },
  );

  function getSingleNextSort(col: PrimaryTableCol, sortInfo: SortInfo, p: { descending: boolean }): SortInfo {
    if (sortInfo && sortInfo.sortBy === col.colKey && sortInfo.descending === p.descending) {
      return undefined as any;
    }
    return { sortBy: col.colKey, descending: p.descending };
  }

  function getMultipleNextSort(col: PrimaryTableCol<TableRowData>, p: { descending: boolean }): Array<SortInfo> {
    const sort = tSortInfo.value || [];
    if (!(sort instanceof Array)) {
      return [];
    }
    const { colKey } = col;
    const result = [...sort];
    for (let i = 0, len = sort.length; i < len; i++) {
      if (sort[i].sortBy === colKey) {
        const next = getSingleNextSort(col, sort[i], p);
        if (next) {
          result[i] = next;
        } else {
          result.splice(i, 1);
        }
        return result;
      }
    }
    result.push({ sortBy: colKey, descending: p.descending });
    return result;
  }

  function getSortOrder(descending: boolean) {
    if (descending === undefined) return;
    return descending ? 'desc' : 'asc';
  }

  function getSorterFuncMap(columns: PrimaryTableCol[], map: { [key: string]: SorterFun<any> } = {}) {
    const newMap = { ...map };
    for (let i = 0, len = columns.length; i < len; i++) {
      const col = columns[i];
      if (isFunction(col.sorter)) {
        newMap[col.colKey] = col.sorter;
      }
      if (col.children?.length) {
        getSorterFuncMap(col.children, newMap);
      }
    }
    return newMap;
  }

  function renderSortIcon({ col }: { col: PrimaryTableCol<TableRowData>; colIndex: number }) {
    if (!col.sorter) return null;
    const sorterButtonsProps = {
      sortType: col.sortType,
      sortOrder: getSortOrder(sortMap.value[col.colKey]?.descending),
      sortIcon,
      hideSortTips,
    };
    return (
      <SorterButton
        key={`sorter-button-${col.colKey}`}
        {...sorterButtonsProps}
        onSortIconClick={(_: any, p: { descending: boolean }) => handleSortHeaderClick(col, p)}
      />
    );
  }

  return {
    renderSortIcon,
    tSortInfo,
    tData,
    sortMap,
  };
}

import { computed, ref, toRefs, watch } from 'vue';
import { isArray, isFunction } from 'lodash-es';
import useDefaultValue from '../../hooks/useDefaultValue';
import TSorterButton from '../components/sorter-button';
import type { PrimaryTableCol, SortInfo, TableRowData, TdPrimaryTableProps } from '../type';

export type SortMap = Record<string, SortInfo & { index: number }>;

export default function useSorter(props: TdPrimaryTableProps) {
  const { sort, data } = toRefs(props);
  const originalData = ref<TableRowData[]>();
  const [tSortInfo, setTSortInfo] = useDefaultValue(sort, props.defaultSort, props.onSortChange, 'sort');
  const [tData, setTData] = useDefaultValue(data, props.data || [], props.onDataChange, 'data');
  // 本地数据排序：用于记录哪些字段是自定义排序函数
  const sorterFuncMap = computed(() => getSorterFuncMap(props.columns));
  const innerSort = ref<SortInfo | SortInfo[]>();

  let isSortingChange = false;

  const sortArray = computed<Array<SortInfo>>(() => {
    const sortValue = tSortInfo.value;
    if (!sortValue) return [];
    return isArray(sortValue) ? sortValue : [sortValue];
  });

  const sortMap = computed<SortMap>(() => {
    const map: Record<string, any> = {};
    sortArray.value.forEach((info, index) => {
      const { sortBy } = info;
      map[sortBy] = { index, ...info };
    });
    return map;
  });

  function getSorterFuncMap(columns: PrimaryTableCol[] = [], map: { [key: string]: Function } = {}) {
    for (let i = 0, len = columns.length; i < len; i++) {
      const col = columns[i];
      if (isFunction(col.sorter)) {
        map[col.colKey] = col.sorter;
      }
      // 多级表头中的排序功能（BaseTable 目前暂不支持多级表头渲染，此处仅做数据层兼容）
      if (col.children?.length) {
        getSorterFuncMap(col.children, map);
      }
    }
    return map;
  }

  function handleDataSort(sortInfo: SortInfo | Array<SortInfo>) {
    const sortValue = sortInfo;
    if (!Object.keys(sorterFuncMap.value).length) return;
    if (!originalData.value) {
      originalData.value = tData.value;
    }
    const isEmptyArraySort = !sortValue || (sortValue instanceof Array && !sortValue.length);
    const isEmptyObjectSort = !(sortValue instanceof Array) && !sortValue?.sortBy;
    if (isEmptyArraySort || isEmptyObjectSort) {
      isSortingChange = true;
      setTData(originalData.value, { trigger: 'sort' });
      return originalData.value;
    }
    const formattedSort = sortValue instanceof Array ? sortValue : [sortValue];
    // data 为受控属性，data.slice() 浅拷贝，防止 sort 导致原数据变异
    const newData: TableRowData[] = (tData.value || []).slice().sort((a: TableRowData, b: TableRowData) => {
      let sortResult = 0;
      for (let i = 0, len = formattedSort.length; i < len; i++) {
        const item = formattedSort[i];
        const sortFunc = sorterFuncMap.value[item.sortBy];
        // 上一个排序字段值相同时才会进行下一个字段的大小对比
        if (sortResult === 0 && sortFunc) {
          sortResult = item.descending ? sortFunc(b, a) : sortFunc(a, b);
        } else {
          break;
        }
      }
      return sortResult;
    });
    // Data 变化返回的是数据引用，为避免死循环，特此检测排序数据前后是否相同，如果相同则不再触发事件
    if (JSON.stringify(newData) === JSON.stringify(tData.value)) return;
    isSortingChange = true;
    setTData(newData, { trigger: 'sort' });
    return newData;
  }

  function handleSortHeaderClick(col: PrimaryTableCol<TableRowData>, p: { descending: boolean }) {
    let sortInfo: SortInfo | Array<SortInfo>;
    if (props.multipleSort) {
      sortInfo = getMultipleNextSort(col, p);
    } else {
      // 如果此次调用之前开启了multipleSort，tSortInfo 可能为数组，尝试取数组中第一个排序字段的参数
      const sortValue = tSortInfo.value instanceof Array ? tSortInfo.value[0] : tSortInfo.value;
      sortInfo = getSingleNextSort(col, sortValue, p);
    }
    // 本地数据 data 排序，需同时抛出 data-change
    const newData = handleDataSort(sortInfo);
    const currentData = newData || tData.value;
    const currentDataSource = currentData;
    setTSortInfo(sortInfo, { currentDataSource, col });
    props.onChange?.({ sorter: sortInfo }, { currentData, trigger: 'sorter' });
    innerSort.value = sortInfo;
  }

  function getSortOrder(descending: boolean) {
    if (descending === undefined) return;
    return descending ? 'desc' : 'asc';
  }

  // 点击新排序字段，则默认按照降序排序；点击原字段，则排序字段不变仅切换排序方式
  function getSingleNextSort(col: PrimaryTableCol, sortInfo: SortInfo, p: { descending: boolean }): SortInfo {
    // 排序字段和排序方式均相同，则取消排序
    if (sortInfo && sortInfo.sortBy === col.colKey && sortInfo.descending === p.descending) {
      return undefined;
    }
    return { sortBy: col.colKey, descending: p.descending };
  }

  function getMultipleNextSort(col: PrimaryTableCol<TableRowData>, p: { descending: boolean }): Array<SortInfo> {
    // 如 tSortInfo 不是数组，判断是否存在，如存在作为第一个排序字段（保留之前未开启 multipleSort 时的字段），否则初始化为空数组
    if (!Array.isArray(tSortInfo.value)) {
      tSortInfo.value = tSortInfo.value ? [tSortInfo.value] : [];
    }
    const sortValue = tSortInfo.value;
    const { colKey } = col;
    const result = [...sortValue];
    for (let i = 0, len = sortValue.length; i < len; i++) {
      if (sortValue[i].sortBy === colKey) {
        const next = getSingleNextSort(col, sortValue[i], p);
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

  function renderSortIcon({ col }: { col: PrimaryTableCol<TableRowData>; colIndex: number }) {
    if (!col.sorter) return null;
    return (
      <TSorterButton
        key={`sorter-button-${col.colKey}`}
        sortType={col.sortType}
        sortOrder={getSortOrder(sortMap.value[col.colKey]?.descending)}
        sortIcon={props.sortIcon}
        hideSortTips={props.hideSortTips}
        onSortIconClick={(_: MouseEvent, p: { descending: boolean }) => handleSortHeaderClick(col, p)}
      />
    );
  }

  const isSortInfoSame = (a: SortInfo | SortInfo[], b: SortInfo | SortInfo[]) => {
    const tmpSortInfo = isArray(a) ? a : [a];
    const tmpInnerSortInfo = isArray(b) ? b : [b];
    if (tmpSortInfo.length && !b) return false;
    const item = tmpSortInfo[0];
    const result = tmpInnerSortInfo.find((t) => t.sortBy === item.sortBy);
    if (!result) return false;
    return item.descending === result.descending;
  };

  /**
   * 如果外部的排序不为空，且和内部排序字段不同，说明传入的 sortInfo 和 data 可能存在不一致，
   * 此时，需要在组件内部进行排序，并输出事件
   */
  watch(
    () => [tSortInfo.value, props.data],
    () => {
      if (!tSortInfo.value || !Object.keys(tSortInfo.value).length || !(tData.value || []).length) return;
      // isSortInfoSame 的两个参数顺序不可变
      if (!isSortInfoSame(tSortInfo.value, innerSort.value)) {
        handleDataSort(tSortInfo.value);
      }
    },
    { immediate: true },
  );

  /**
   * 外部 data 发生变化时，需要同步更新 originalData，避免取消排序时还原成已经过时的旧数据。
   */
  watch(
    () => props.data,
    (val) => {
      if (isSortingChange) {
        isSortingChange = false;
        return;
      }
      originalData.value = val;
    },
  );

  return {
    tData,
    renderSortIcon,
  };
}

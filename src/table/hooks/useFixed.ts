import { toRefs, ref, watch, reactive } from 'vue';
import { get } from 'lodash-es';
import log from '../../_common/js/log';
import { ClassName, Styles } from '../../common';
import type { TdBaseTableProps, TableRowData, BaseTableCol, BaseTableInstanceFunctions } from '../type';
import type { RowAndColFixedPosition, TableRowFixedClasses, FixedColumnInfo, TableColFixedClasses } from '../interface';

// 固定列相关类名处理
export function getColumnFixedStyles(
  col: TdBaseTableProps['columns'][0],
  index: number,
  rowAndColFixedPosition: RowAndColFixedPosition,
  tableColFixedClasses: TableColFixedClasses,
): { style?: Styles; classes?: ClassName } {
  const fixedPos = rowAndColFixedPosition?.get(col.colKey || index);
  if (!fixedPos) return {};
  const thClasses = {
    [tableColFixedClasses.left]: col.fixed === 'left',
    [tableColFixedClasses.right]: col.fixed === 'right',
    [tableColFixedClasses.lastLeft]: col.fixed === 'left' && fixedPos.lastLeftFixedCol,
    [tableColFixedClasses.firstRight]: col.fixed === 'right' && fixedPos.firstRightFixedCol,
  };
  const thStyles = {
    left: col.fixed === 'left' ? `${fixedPos.left}px` : undefined,
    right: col.fixed === 'right' ? `${fixedPos.right}px` : undefined,
  };
  return {
    style: thStyles,
    classes: thClasses,
  };
}

// 固定行相关类名处理
export function getRowFixedStyles(
  rowId: string | number,
  rowIndex: number,
  rowLength: number,
  fixedRows: TdBaseTableProps['fixedRows'],
  rowAndColFixedPosition: RowAndColFixedPosition,
  tableRowFixedClasses: TableRowFixedClasses,
  // 和虚拟滚动搭配使用时，需要增加 style 的偏移量
  virtualTranslateY = 0,
): { style: Styles; classes: ClassName } {
  if (!fixedRows || !fixedRows.length) return { style: undefined, classes: undefined };
  const fixedTop = rowIndex < fixedRows[0];
  const fixedBottom = rowIndex > rowLength - 1 - fixedRows[1];
  const firstFixedBottomRow = rowLength - fixedRows[1];
  const fixedPos = rowAndColFixedPosition?.get(rowId) || {};
  const rowClasses = {
    [tableRowFixedClasses.top]: fixedTop,
    [tableRowFixedClasses.bottom]: fixedBottom,
    [tableRowFixedClasses.firstBottom]: rowIndex === firstFixedBottomRow,
    [tableRowFixedClasses.withoutBorderBottom]: rowIndex === firstFixedBottomRow - 1,
  };
  const rowStyles = {
    top: fixedTop ? `${fixedPos.top - virtualTranslateY}px` : undefined,
    bottom: fixedBottom ? `${fixedPos.bottom + virtualTranslateY}px` : undefined,
  };
  return {
    style: rowStyles,
    classes: rowClasses,
  };
}

export default function useFixed(props: TdBaseTableProps) {
  const { columns, tableLayout, tableContentWidth, fixedRows, bordered } = toRefs(props);
  const data = ref<TableRowData[]>([]);
  const tableContentRef = ref<HTMLDivElement>();
  const isFixedHeader = ref(false);
  const isWidthOverflow = ref(false);
  const tableElmRef = ref<HTMLTableElement>();
  // 固定列、固定表头、固定表尾等内容的位置信息
  const rowAndColFixedPosition = ref<RowAndColFixedPosition>(new Map());
  const showColumnShadow = reactive({
    left: false,
    right: false,
  });
  // 虚拟滚动不能使用 CSS sticky 固定表头
  const virtualScrollHeaderPos = ref<{ left: number; top: number }>({ left: 0, top: 0 });
  const tableWidth = ref(0);
  const tableElmWidth = ref(0);
  const thWidthList = ref<{ [colKey: string]: number }>({});

  const isFixedColumn = ref(false);
  const isFixedRightColumn = ref(false);
  const isFixedLeftColumn = ref(false);

  function setUseFixedTableElmRef(val: HTMLTableElement) {
    tableElmRef.value = val;
  }

  function getColumnMap(
    columns: BaseTableCol[],
    map: RowAndColFixedPosition = new Map(),
    levelNodes: FixedColumnInfo[][] = [],
    level = 0,
    parent?: FixedColumnInfo,
  ) {
    for (let i = 0, len = columns.length; i < len; i++) {
      const col = columns[i];
      if (['left', 'right'].includes(col.fixed)) {
        isFixedColumn.value = true;
      }
      if (col.fixed === 'right') {
        isFixedRightColumn.value = true;
      }
      if (col.fixed === 'left') {
        isFixedLeftColumn.value = true;
      }
      const key = col.colKey || i;
      const columnInfo: FixedColumnInfo = { col, parent, index: i };
      map.set(key, columnInfo);

      if (levelNodes[level]) {
        levelNodes[level].push(columnInfo);
      } else {
        // eslint-disable-next-line no-param-reassign
        levelNodes[level] = [columnInfo];
      }
    }
    return {
      newColumnsMap: map,
      levelNodes,
    };
  }

  // 设置固定行位置信息 top/bottom
  const setFixedRowPosition = (
    trList: HTMLCollection,
    initialColumnMap: RowAndColFixedPosition,
    thead: HTMLTableSectionElement,
    tfoot: HTMLTableSectionElement,
  ) => {
    const [fixedTopRows, fixedBottomRows] = fixedRows.value || [];
    const { data, rowKey = 'id' } = props;
    for (let i = 0; i < fixedTopRows; i++) {
      const tr = trList[i] as HTMLElement;
      const rowId = get(data[i], rowKey);
      const thisRowInfo = initialColumnMap.get(rowId) || {};
      const lastRowId = get(data[i - 1], rowKey);
      const lastRowInfo = initialColumnMap.get(lastRowId) || {};
      let defaultBottom = 0;
      if (i === 0) {
        defaultBottom = thead?.getBoundingClientRect().height || 0;
      }
      thisRowInfo.top = (lastRowInfo.top || defaultBottom) + (lastRowInfo.height || 0);
      initialColumnMap.set(rowId, { ...thisRowInfo, height: tr?.getBoundingClientRect().height || 0 });
    }
    for (let i = data.length - 1; i >= data.length - fixedBottomRows; i--) {
      // 当虚拟滚动的时候，尾部固定行并非对应数据的 index，需要进行倒推计算
      const tr = trList[trList.length - (data.length - i)] as HTMLElement;
      const rowId = get(data[i], rowKey);
      const thisRowInfo = initialColumnMap.get(rowId) || {};
      const lastRowId = get(data[i + 1], rowKey);
      const lastRowInfo = initialColumnMap.get(lastRowId) || {};
      let defaultBottom = 0;
      if (i === data.length - 1) {
        defaultBottom = tfoot?.getBoundingClientRect().height || 0;
      }
      thisRowInfo.bottom = (lastRowInfo.bottom || defaultBottom) + (lastRowInfo.height || 0);
      initialColumnMap.set(rowId, { ...thisRowInfo, height: tr?.getBoundingClientRect().height || 0 });
    }
  };

  const setFixedLeftPos = (
    columns: BaseTableCol[],
    initialColumnMap: RowAndColFixedPosition,
    parent: FixedColumnInfo = {},
  ) => {
    for (let i = 0, len = columns.length; i < len; i++) {
      const col = columns[i];
      if (col.fixed === 'right') return;
      const colInfo = initialColumnMap.get(col.colKey || i);
      let lastColIndex = i - 1;
      while (lastColIndex >= 0 && columns[lastColIndex].fixed !== 'left') {
        lastColIndex -= 1;
      }
      const lastCol = columns[lastColIndex];
      // 多级表头，使用父元素作为初始基本位置
      const defaultWidth = i === 0 ? parent?.left || 0 : 0;
      const lastColInfo = initialColumnMap.get(lastCol?.colKey || i - 1);
      if (colInfo) {
        colInfo.left = (lastColInfo?.left || defaultWidth) + (lastColInfo?.width || 0);
      }
    }
  };

  const setFixedRightPos = (
    columns: BaseTableCol[],
    initialColumnMap: RowAndColFixedPosition,
    parent: FixedColumnInfo = {},
  ) => {
    for (let i = columns.length - 1; i >= 0; i--) {
      const col = columns[i];
      if (col.fixed === 'left') return;
      const colInfo = initialColumnMap.get(col.colKey || i);
      let lastColIndex = i + 1;
      while (lastColIndex < columns.length && columns[lastColIndex].fixed !== 'right') {
        lastColIndex += 1;
      }
      const lastCol = columns[lastColIndex];
      // 多级表头，使用父元素作为初始基本位置
      const defaultWidth = i === columns.length - 1 ? parent?.right || 0 : 0;
      const lastColInfo = initialColumnMap.get(lastCol?.colKey || i + 1);
      if (colInfo) {
        colInfo.right = (lastColInfo?.right || defaultWidth) + (lastColInfo?.width || 0);
      }
    }
  };

  // 获取固定列位置信息。先获取节点宽度，再计算
  const setFixedColPosition = (trList: HTMLCollection, initialColumnMap: RowAndColFixedPosition) => {
    if (!trList) return;
    for (let i = 0, len = trList.length; i < len; i++) {
      const thList = trList[i].children;
      for (let j = 0, thLen = thList.length; j < thLen; j++) {
        const th = thList[j] as HTMLElement;
        const colKey = th.dataset.colkey;
        if (!colKey) {
          log.warn('TDesign Table', `${th.innerText} missing colKey. colKey is required for fixed column feature.`);
        }
        const obj = initialColumnMap.get(colKey || j);
        if (obj?.col?.fixed) {
          initialColumnMap.set(colKey, { ...obj, width: th.getBoundingClientRect().width });
        }
      }
    }
    setFixedLeftPos(columns.value, initialColumnMap);
    setFixedRightPos(columns.value, initialColumnMap);
  };

  const updateRowAndColFixedPosition = (tableContentElm: HTMLElement, initialColumnMap: RowAndColFixedPosition) => {
    rowAndColFixedPosition.value.clear();
    if (!tableContentElm) return;
    const thead = tableContentElm.querySelector('thead');
    // 处理固定列
    thead && setFixedColPosition(thead.children, initialColumnMap);
    // 处理冻结行
    const tbody = tableContentElm.querySelector('tbody');
    const tfoot = tableContentElm.querySelector('tfoot');
    tbody && setFixedRowPosition(tbody.children, initialColumnMap, thead, tfoot);
    // 更新最终 Map
    rowAndColFixedPosition.value = initialColumnMap;
  };

  let shadowLastScrollLeft: number;
  const updateColumnFixedShadow = (target: HTMLElement, extra?: { skipScrollLimit?: boolean }) => {
    if (!isFixedColumn.value || !target) return;
    const { scrollLeft } = target;
    // 只有左右滚动，需要更新固定列阴影
    if (shadowLastScrollLeft === scrollLeft && (!extra || !extra.skipScrollLimit)) return;
    shadowLastScrollLeft = scrollLeft;
    const isShowRight = target.clientWidth + scrollLeft < target.scrollWidth;
    const isShowLeft = scrollLeft > 0;

    if (showColumnShadow.left === isShowLeft && showColumnShadow.right === isShowRight) return;
    showColumnShadow.left = isShowLeft && isFixedLeftColumn.value;
    showColumnShadow.right = isShowRight && isFixedRightColumn.value;
  };

  // 多级表头场景较为复杂：为了滚动的阴影效果，需要知道哪些列是边界列，左侧固定列的最后一列，右侧固定列的第一列，每一层表头都需要兼顾
  const setIsLastOrFirstFixedCol = (levelNodes: FixedColumnInfo[][]) => {
    for (let t = 0; t < levelNodes.length; t++) {
      const nodes = levelNodes[t];
      for (let i = 0, len = nodes.length; i < len; i++) {
        const colMapInfo = nodes[i];
        const nextColMapInfo = nodes[i + 1];
        const { parent } = colMapInfo;
        const isParentLastLeftFixedCol = !parent || parent?.lastLeftFixedCol;
        if (isParentLastLeftFixedCol && colMapInfo.col.fixed === 'left' && nextColMapInfo?.col.fixed !== 'left') {
          colMapInfo.lastLeftFixedCol = true;
        }
        const lastColMapInfo = nodes[i - 1];
        const isParentFirstRightFixedCol = !parent || parent?.firstRightFixedCol;
        if (isParentFirstRightFixedCol && colMapInfo.col.fixed === 'right' && lastColMapInfo?.col.fixed !== 'right') {
          colMapInfo.firstRightFixedCol = true;
        }
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const updateFixedStatus = () => {
    const { newColumnsMap, levelNodes } = getColumnMap(columns.value);
    setIsLastOrFirstFixedCol(levelNodes);
    const timer = setTimeout(() => {
      if (isFixedColumn.value || fixedRows.value?.length) {
        updateRowAndColFixedPosition(tableContentRef.value, newColumnsMap);
      }
      clearTimeout(timer);
    }, 0);
    return () => {
      clearTimeout(timer);
    };
  };

  const setTableElmWidth = (width: number) => {
    if (tableElmWidth.value === width) return;
    tableElmWidth.value = width;
  };

  watch(
    [data, columns, bordered, tableLayout, tableContentWidth, isFixedHeader, isWidthOverflow, isFixedColumn, fixedRows],
    updateFixedStatus,
    { immediate: true },
  );

  watch(
    [isFixedColumn, columns],
    () => {
      const timer = setTimeout(() => {
        if (isFixedColumn.value) {
          updateColumnFixedShadow(tableContentRef.value);
        }
        clearTimeout(timer);
      }, 0);
    },
    { immediate: true },
  );

  const refreshTable: BaseTableInstanceFunctions['refreshTable'] = () => {
    if (isFixedColumn.value || isFixedHeader.value) {
      updateFixedStatus();
      updateColumnFixedShadow(tableContentRef.value, { skipScrollLimit: true });
    }
  };

  const setData = (dataSource: TableRowData[]) => {
    data.value = dataSource;
  };

  const updateTableAfterColumnResize = () => {
    updateFixedStatus();
  };

  return {
    tableWidth,
    tableElmWidth,
    thWidthList,
    isFixedHeader,
    isWidthOverflow,
    tableContentRef,
    isFixedColumn,
    showColumnShadow,
    rowAndColFixedPosition,
    virtualScrollHeaderPos,
    setData,
    refreshTable,
    setTableElmWidth,
    setUseFixedTableElmRef,
    updateColumnFixedShadow,
    updateTableAfterColumnResize,
  };
}

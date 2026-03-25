import { isFunction, get, isObject } from 'lodash-es';
import { CellData, RowClassNameParams, TableColumnClassName, TableRowData, TdBaseTableProps } from '../type';
import { ClassName, HTMLElementAttributes } from '../../common';
import { SkipSpansValue } from '../hooks/useRowspanAndColspan';

export function toString(obj: any): string {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

export function debounce<T = any>(fn: Function, delay = 200): () => void {
  let timer: ReturnType<typeof setTimeout>;
  return function newFn(this: T, ...args: Array<any>): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

export interface FormatRowAttributesParams {
  row: TableRowData;
  rowIndex: number;
  type: 'body' | 'foot';
}

// 行属性
export function formatRowAttributes(attributes: TdBaseTableProps['rowAttributes'], params: FormatRowAttributesParams) {
  if (!attributes) return undefined;
  const attrList = attributes instanceof Array ? attributes : [attributes];
  let result: HTMLElementAttributes = {};
  for (let i = 0; i < attrList.length; i++) {
    const attrItem = attrList[i];
    if (!attrItem) continue;
    const attrProperty = isFunction(attrItem) ? attrItem(params) : attrItem;
    result =
      attrProperty instanceof Array ? formatRowAttributes(attrProperty, params) : Object.assign(result, attrProperty);
  }
  return result;
}

// 行类名，['A', 'B']，[() => 'A', () => 'B']
export function formatRowClassNames(
  rowClassNames: TdBaseTableProps['rowClassName'],
  params: RowClassNameParams<TableRowData>,
  rowKey: string,
) {
  const rowClassList = rowClassNames instanceof Array ? rowClassNames : [rowClassNames];
  const { row, rowIndex } = params;
  // 自定义行类名
  let customClasses: ClassName = [];
  for (let i = 0, len = rowClassList.length; i < len; i++) {
    const rName = rowClassList[i];
    let tClass = isFunction(rName) ? rName(params) : rName;
    if (isObject(tClass) && !(tClass instanceof Array)) {
      // TODO: 这里其实是两点原因导致的
      // 1. isObject(tClass) && !(tClass instanceof Array) 直接用 isPlainObject 就可以了吧，或者 tClass && typeof tClass === 'object'
      // 2. lodash-es 类型不全
      // 根据下标设置行类名
      (tClass as Record<string, any>)[rowIndex] && (tClass = (tClass as Record<string, any>)[rowIndex]);
      // 根据行唯一标识设置行类名
      const rowId = get(row, rowKey || 'id');
      tClass[rowId] && (tClass = tClass[rowId]);
    } else if (tClass instanceof Array) {
      tClass = formatRowClassNames(tClass, params, rowKey);
    }
    customClasses = customClasses.concat(tClass);
  }
  return customClasses;
}

export function formatClassNames(
  classNames: TableColumnClassName<TableRowData> | TableColumnClassName<TableRowData>[],
  params: CellData<TableRowData>,
) {
  const classes = classNames instanceof Array ? classNames : [classNames];
  const arr: any[] = [];
  for (let i = 0, len = classes.length; i < len; i++) {
    const cls = classes[i];
    if (isFunction(cls)) {
      arr.push(cls(params));
    } else {
      arr.push(cls);
    }
  }
  return arr;
}

export const INNER_PRE_NAME = '@@inner-';

// 多级表头，列配置场景，获取 currentRow
export function getCurrentRowByKey<T extends { colKey?: string; children?: any[] }>(columns: T[], key: string): T {
  if (!columns || !key) return;
  const col = columns?.find((t) => t.colKey === key);
  if (col) return col;
  for (let i = 0, len = columns.length; i < len; i++) {
    if (columns[i]?.children?.length) {
      return getCurrentRowByKey(columns[i]?.children, key);
    }
  }
}

export interface CellSpanResult {
  /** 单元格的 rowspan 属性 */
  rowspan?: number;
  /** 单元格的 colspan 属性 */
  colspan?: number;
  /** 是否跳过渲染该单元格 */
  skipped: boolean;
}

/**
 * 获取单元格合并状态
 * @param cellKey 单元格唯一标识
 * @param skipSpansMap 合并单元格映射表
 * @returns 合并单元格的结果
 */
export const handleCellSpan = (cellKey: string, skipSpansMap?: Map<string, SkipSpansValue>): CellSpanResult => {
  const result: CellSpanResult = { skipped: false };

  if (!skipSpansMap?.size) return result;

  const spanState = skipSpansMap.get(cellKey);
  if (!spanState) return result;

  if (spanState.rowspan > 1) result.rowspan = spanState.rowspan;
  if (spanState.colspan > 1) result.colspan = spanState.colspan;
  if (spanState.skipped) result.skipped = true;

  return result;
};

/**
 * 判断单元格是否是最后一行（合并单元格场景移除底部边框）
 */
export const isLastRowInSpan = (rowIndex: number, rowspan?: number, totalDataLength?: number): boolean => {
  return !!(rowspan && totalDataLength && rowIndex + rowspan === totalDataLength);
};

/**
 * 判断单元格是否是第一列（合并单元格场景移除左边框）
 * 在合并单元格场景下，所有行的第一列都应该移除左边框
 */
export const isFirstColumnInSpan = (colIndex: number, rowspan?: number): boolean => {
  return colIndex === 0;
};

import isFunction from 'lodash/isFunction';
import get from 'lodash/get';
import { CellData, TableColumnClassName, TableRowData } from './type';

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

export enum SCROLL_DIRECTION {
  X = 'x',
  Y = 'y',
  UNKNOWN = 'unknown',
}

let preScrollLeft: any;
let preScrollTop: any;

export const getScrollDirection = (scrollLeft: number, scrollTop: number): SCROLL_DIRECTION => {
  let direction = SCROLL_DIRECTION.UNKNOWN;
  if (preScrollTop !== scrollTop) {
    direction = SCROLL_DIRECTION.Y;
  } else if (preScrollLeft !== scrollLeft) {
    direction = SCROLL_DIRECTION.X;
  }
  preScrollTop = scrollTop;
  preScrollLeft = scrollLeft;
  return direction;
};

export function getEditableKeysMap(keys: Array<string | number>, list: any[], rowKey: string) {
  const map: { [key: string | number]: boolean } = {};
  for (let i = 0, len = list.length; i < len; i++) {
    const rowValue = get(list[i], rowKey);
    if (keys.includes(rowValue)) {
      map[rowValue] = true;
    }
  }
  return map;
}

export function getColumnDataByKey(columns: any[], colKey: string): any {
  for (let i = 0, len = columns.length; i < len; i++) {
    if (columns[i].colKey === colKey) return columns[i];
    if (columns[i].children?.length) {
      const t = getColumnDataByKey(columns[i].children, colKey);
      if (t) return t;
    }
  }
  return null;
}

export function getColumnIndexByKey(columns: any[], colKey: string): number {
  for (let i = 0, len = columns.length; i < len; i++) {
    if (columns[i].colKey === colKey) {
      return i;
    }
    if (columns[i].children?.length) {
      const t = getColumnDataByKey(columns[i].children, colKey);
      if (t) return i;
    }
  }
  return -1;
}

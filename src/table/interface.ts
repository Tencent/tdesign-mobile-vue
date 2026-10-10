import { InjectionKey } from 'vue';
import { TNodeReturnValue } from '../common';
import { TableRowData, BaseTableCol, TdBaseTableProps, TdPrimaryTableProps, TableExpandedRowParams } from './type';

export type BaseTableProps<T extends TableRowData = TableRowData> = TdBaseTableProps<T>;

/** 表格内部通信（PrimaryTable -> BaseTable），非公开，请勿在业务中使用 */
export interface TableInternalContext {
  onLeafColumnsChange?: (columns: BaseTableColumns) => void;
  renderExpandedRow?: (
    p: TableExpandedRowParams<TableRowData> & { tableWidth: number; isWidthOverflow: boolean },
  ) => TNodeReturnValue | null;
}

export const tableInternalKey: InjectionKey<TableInternalContext> = Symbol('tdesign-table-internal');

export type PrimaryTableProps<T extends TableRowData = TableRowData> = TdPrimaryTableProps<T>;

export interface BaseTableRef {
  tableElement: HTMLDivElement;
  tableHtmlElement: HTMLTableElement;
  tableContentElement: HTMLDivElement;
  refreshTable: () => void;
}

export type PrimaryTableRef = BaseTableRef;

export type BaseTableColumns = BaseTableCol<TableRowData>[];

export interface ColumnStickyLeftAndRight {
  left: number[];
  right: number[];
  top: number[];
  bottom?: number[];
}

export interface TableColFixedClasses {
  left: string;
  right: string;
  lastLeft: string;
  firstRight: string;
  leftShadow: string;
  rightShadow: string;
}

export interface TableRowFixedClasses {
  top: string;
  bottom: string;
  firstBottom: string;
  withoutBorderBottom: string;
}

export interface FixedColumnInfo {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  parent?: FixedColumnInfo;
  children?: string[];
  width?: number;
  height?: number;
  col?: BaseTableCol;
  index?: number;
  lastLeftFixedCol?: boolean;
  firstRightFixedCol?: boolean;
}

// 固定表头和固定列 具体的固定位置（left/top/right/bottom）
export type RowAndColFixedPosition = Map<string | number, FixedColumnInfo>;

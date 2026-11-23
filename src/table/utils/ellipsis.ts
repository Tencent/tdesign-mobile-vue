import { isObject } from 'lodash-es';
import type { TNode, TNodeReturnValue } from '../../common';
import type { EllipsisPopupProps } from '../ellipsis';
import type { PrimaryTableCol, TableRowData, BaseTableColParams, BaseTableCellParams } from '../type';

export interface ResolvedEllipsis {
  enabled: boolean;
  content?: TNode | TNodeReturnValue;
  props?: EllipsisPopupProps;
}

type EllipsisConfig = PrimaryTableCol<TableRowData>['ellipsis'] | PrimaryTableCol<TableRowData>['ellipsisTitle'];
type EllipsisParams = BaseTableColParams<TableRowData> | BaseTableCellParams<TableRowData>;
type EllipsisRenderFn = (params?: EllipsisParams) => TNodeReturnValue;
// 对象形态：{ props, content } 包裹或直接透传的 Popup 属性
type EllipsisObject = Partial<EllipsisPopupProps> & {
  props?: EllipsisPopupProps;
  content?: TNodeReturnValue | EllipsisRenderFn;
};

/**
 * 解析 ellipsis / ellipsisTitle 属性，统一为 { enabled, content, props } 结构。
 * 支持 boolean / TNode / PopupProps / { props, content } 四种形态。
 */
export function resolveEllipsis(ellipsis: EllipsisConfig, params?: EllipsisParams): ResolvedEllipsis {
  if (ellipsis === undefined || ellipsis === null || ellipsis === false) {
    return { enabled: false };
  }
  if (ellipsis === true) {
    return { enabled: true };
  }
  if (typeof ellipsis === 'function') {
    return { enabled: true, content: (ellipsis as unknown as EllipsisRenderFn)(params) };
  }
  if (isObject(ellipsis)) {
    const obj = ellipsis as EllipsisObject;
    // { props, content } 形态：仅含 props/content 键（不含 Popup 特征字段）
    const isWrapperForm =
      ('props' in obj || 'content' in obj) && !('placement' in obj || 'closeBtn' in obj || 'showOverlay' in obj);
    if (isWrapperForm) {
      const content = typeof obj.content === 'function' ? obj.content(params) : obj.content;
      return { enabled: true, content, props: obj.props };
    }
    // PopupProps 形态
    return { enabled: true, props: ellipsis as EllipsisPopupProps };
  }
  return { enabled: true, content: ellipsis };
}

// 判断是否启用省略（仅判断，不执行函数）。ellipsisTitle 优先级高于 ellipsis
export function isEllipsisEnabled(ellipsisTitle: EllipsisConfig, ellipsis: EllipsisConfig): boolean {
  const val = ellipsisTitle !== undefined ? ellipsisTitle : ellipsis;
  return val !== undefined && val !== null && val !== false;
}

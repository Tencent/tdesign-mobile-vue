import { SetupContext, h } from 'vue';
import { isString, isFunction } from 'lodash-es';
import { BaseTableColumns } from '../types';
import { resolveEllipsis } from '../utils/ellipsis';
import Ellipsis from '../ellipsis';
import type { TableClassName } from './useClassName';

// 渲染表头的通用方法
export function renderTitle(slots: SetupContext['slots'], col: BaseTableColumns[0], index: number) {
  const params = { col, colIndex: index };
  if (isFunction(col.title)) {
    return col.title(h, params);
  }
  if (isString(col.title) && slots[col.title]) {
    return slots[col.title](params);
  }
  if (isFunction(col.render)) {
    return (
      col.render(h, {
        ...params,
        type: 'title',
        row: {},
        rowIndex: -1,
      }) || col.title
    );
  }
  return col.title;
}

// 渲染带排序/过滤图标的表头标题
export function renderTitleWidthIcon(
  children: any[],
  tableSortClasses: TableClassName['tableSortClasses'],
  tableFilterClasses: TableClassName['tableFilterClasses'],
  col?: any,
  colIndex?: number,
  ellipsisTitle?: any,
  attach?: any,
  extra?: { classPrefix?: string; ellipsisOverlayClassName?: string },
) {
  const [title, sortIcon, filterIcon] = children;
  const classes = {
    [tableSortClasses.sortable]: !!sortIcon,
    [tableFilterClasses.filterable]: !!filterIcon,
  };
  // ellipsisTitle 优先级高于 ellipsis
  const resolved = resolveEllipsis(ellipsisTitle !== undefined ? ellipsisTitle : col?.ellipsis, { col, colIndex });
  return (
    <div class={classes}>
      <div class={tableSortClasses.title}>
        {resolved.enabled ? (
          <Ellipsis
            attach={attach ? () => attach : undefined}
            popupContent={(resolved.content ?? title) as any}
            popupProps={resolved.props}
            classPrefix={extra?.classPrefix}
            overlayClassName={extra?.ellipsisOverlayClassName}
          >
            {title}
          </Ellipsis>
        ) : (
          <div>{title}</div>
        )}
        {Boolean(sortIcon || filterIcon) && (
          <div class={tableFilterClasses.iconWrap}>
            {sortIcon}
            {filterIcon}
          </div>
        )}
      </div>
    </div>
  );
}

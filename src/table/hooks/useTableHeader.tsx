import { SetupContext, h } from 'vue';
import { isString, isFunction } from 'lodash-es';
import { BaseTableColumns } from '../types';
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
) {
  const [title, sortIcon, filterIcon] = children;
  const classes = {
    [tableSortClasses.sortable]: !!sortIcon,
    [tableFilterClasses.filterable]: !!filterIcon,
  };
  return (
    <div class={classes}>
      <div class={tableSortClasses.title}>
        <div>{title}</div>
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

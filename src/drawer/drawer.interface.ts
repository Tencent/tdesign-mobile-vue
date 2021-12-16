import { TNode } from '../common';

export type SidebarItem = {
  /* 菜单名称 */
  name: string;
  /* 跳转历路径 */
  path: string;
  /* 图标 */
  icon: TNode;
};

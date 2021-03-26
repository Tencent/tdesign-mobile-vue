import { TNode } from "@/shared";

export type SidebarItemType = {
  /* 菜单名称 */
  name: string,
  /* 跳转历路径 */
  path: string,
  /* 图标 */
  icon: TNode | string;
}

export interface SidebarItem {
  sidebar: Array<SidebarItemType>;
  /* 图标 */
  icon: TNode | string;
}

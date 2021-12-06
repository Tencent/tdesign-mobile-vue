/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-11-27 00:06:44
 * */

export interface TdDropdownMenuProps {
  /**
   * 菜单标题和选项的选中态颜色
   * @default ''
   */
  activeColor: string;
  /**
   * 是否在点击遮罩层后关闭菜单
   * @default true
   */
  closeOnClickOverlay: boolean;
  /**
   * 动画时长
   * @default 200
   */
  duration: string | number;
  /**
   * 是否显示遮罩层
   * @default true
   */
  overlay: boolean;
  /**
   * 菜单栏 z-index 层级
   */
  zIndex: number;
}

export interface TdDropdownItemProps {
  /**
   * 是否禁用
   * @default false
   */
  disabled: boolean;
  /**
   * 选项数据
   */
  options: Array<TdDropdownItemOption>;
  /**
   * 选项分栏（1-3）
   */
  optionsColumns: string | number;
  /**
   * 选项排列
   * @default columns
   */
  optionsLayout: 'columns' | 'tree';
  /**
   * 选取模式
   * @default single
   */
  selectMode: 'single' | 'multi';
  /**
   * 标题
   * @default ''
   */
  title: string;
  /**
   * 选中值
   */
  value: TdDropdownItemOptionValueType | Array<TdDropdownItemOptionValueType>;
  /**
   * 选中值，非受控属性
   */
  defaultValue: TdDropdownItemOptionValueType | Array<TdDropdownItemOptionValueType>;
}

export interface TdDropdownItemOption {
  title: string;
  value: TdDropdownItemOptionValueType;
  [key: string]: any;
}

export type TdDropdownItemOptionValueType = string | number;

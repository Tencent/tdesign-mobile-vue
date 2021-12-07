/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-09-19 22:44:46
 * */

 export type Item = {
  label: string;
  color?: string;
  disabled?: boolean;
};

export interface TdActionSheetProps {
  /**
   * 设置取消按钮的文本
   * @default 取消
   */
  cancelText: string;
  /**
   * 设置每页展示菜单的数量，仅当 type=grid 时有效
   * @default 8
   */
  count: number;
  /**
   * 菜单项
   */
  items: Array<string | { label: string; color: string; disable: boolean }>;
  /**
   * 是否显示取消按钮
   * @default true
   */
  showCancel: boolean;
  /**
   * 展示类型，列表和表格形式展示
   * @default list
   */
  theme: 'list' | 'grid';
  /**
   * 显示与隐藏
   * @default false
   */
  visible: boolean;
  /**
   * 显示与隐藏，非受控属性
   * @default false
   */
  defaultVisible: boolean;
  /**
   * 点击取消按钮时触发
   */
  onCancel: (context: { e: MouseEvent }) => void;
  /**
   * 关闭时触发
   */
  onClose: (context: { e: MouseEvent }) => void;
  /**
   * 选择菜单项时触发
   */
  onSelect: (selected: Item | String, index: number) => void;
}

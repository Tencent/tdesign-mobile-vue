export type onChangeEvent = (name: any) => void;
export interface ICollapseProps {
  /**
   * @description 展开的面板，支持 v-model 双向绑定
   */
  value?: string | number | any[];
  /**
   * @description 手风琴模式，每次只打开一个面板
   * @default false
   */
  accordion?: boolean;
  /**
   * @description 折叠面板标题
   */
  title?: string;
  /**
   * @description: 默认`false`。若为`true`，默认展开全部
   */
  defaultExpandAll?: boolean;
  /**
   * @description 面板内列表标签宽度
   */
  labelWidth?: number;
}

export const CollapseProps = {
  value: [Array, String, Number],
  accordion: {
    type: Boolean,
    default: false,
  },
  title: String,
  defaultExpandAll: Boolean,
  labelWidth: Number,
};

export interface ICollapsePanelProps {
  /**
   * @description 面板标识
   */
  name?: string | number;
  /**
   * @description 标题，支持命名slot
   */
  title?: string | number;
  /**
   * @description 展开按钮左侧补充描述，支持命名slot
   */
  extra?: string | number;
  /**
   * @description 内容，默认slot；数组，则为列表内容
   */
  content?: any[] | string | number;
  /**
   * @description 若为`true`，面板将不可展开/折叠
   */
  disabled?: boolean;
  /**
   * @description 面板内列表标签宽度，单项设置优先级高
   */
  labelWidth?: number;
  /**
   * @description 若为`true`，面板头部可点，触发展开/折叠事件
   */
  headerClickable?: boolean;
}
export const CollapsePanelProps = {
  name: [String, Number],
  title: [String, Number],
  extra: [String, Number],
  content: [String, Number, Array],
  disabled: Boolean,
  labelWidth: Number,
  headerClickable: {
    type: Boolean,
    default: true,
  },
};

/**
 * @description: 折叠面板按钮图标
 */
export enum CollapseIcon {
  active = 'arrow-up',
  // 非展开态
  inactive = 'arrow-down',
  right = 'arror-right',
}

export interface ICollapseState {
  /**
   * @description 折叠面板 class类
   */
  className: string;
  /**
   * @description 展开的面板状态
   */
  curValue?: string | number | any[];
}

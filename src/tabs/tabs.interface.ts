export type TabsDirection = 'vertical' | 'horizontal';

// export interface TabsProps {
//   activeName: string | number;
//   scrollable?: boolean;
//   direction?: TabsDirection;
// }
export const TabsProps = {
  /**
   * @description 初始化激活的选项卡name
   * @property activeName
   */
  activeName: {
    type: [String, Number],
    default: '',
  },
  /**
   * @description 是否滚动
   * @property scrollable
   */
  scrollable: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 选项卡方向
   * @property direction
   */
  direction: {
    type: String,
    default: 'vertical',
  },
};
// export interface TabPanelProps {
//   name: string;
//   label?: string;
//   disabled?: boolean;
//   forceRender?: boolean;
// }
export const TabPanelProps = {
  /**
   * @description 选项板name
   * @property name
   */
  name: {
    type: [String, Number],
    default: '',
  },
  /**
   * @description 选项卡显示名称
   * @property label
   */
  label: {
    type: String,
    default: '',
  },
  /**
   * @description 选项面板无效
   * @property disabled
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 选项板强制渲染
   * @property forceRender
   */
  forceRender: {
    type: Boolean,
    default: false,
  },
};

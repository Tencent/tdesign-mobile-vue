/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-02 16:32:45
 * */

export interface TdPopupProps {
  /**
   * 是否锁定内容滚动
   * @default true
   */
  lockScroll: boolean;
  /**
   * 浮层出现位置
   * @default top
   */
  placement: 'top' | 'left' | 'right' | 'bottom' | 'center';
  /**
   * 是否显示遮罩层
   * @default true
   */
  showOverlay: boolean;
  /**
   * 是否禁用teleport
   * @default false
   */
  teleportDisabled: boolean;
  /**
   * 透传给teleport组件的to属性
   * @default body
   */
  to: string;
  /**
   * 弹出层内容区的动画名，等价于transition组件的name属性
   * @default ''
   */
  transitionName: string;
  /**
   * 是否显示浮层
   * @default false
   */
  visible: boolean;
  /**
   * 是否显示浮层，非受控属性
   * @default false
   */
  defaultVisible: boolean;
  /**
   * 组件层级，Web 侧样式默认为 5500，移动端和小程序样式默认为 1500
   */
  zIndex: number;
  /**
   * 组件准备关闭时触发
   */
  onClose: () => void;
  /**
   * 组件关闭且动画结束后执行
   */
  onClosed: () => void;
  /**
   * 组件准备展示时触发
   */
  onOpen: () => void;
  /**
   * 组件展示且动画结束后执行
   */
  onOpened: () => void;
  /**
   * 当浮层隐藏或显示时触发
   */
  onVisibleChange: (visible: boolean) => void;
}

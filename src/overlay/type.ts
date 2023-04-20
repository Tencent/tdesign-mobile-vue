/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

export interface TdOverlayProps {
  /**
   * 遮罩层的背景色
   * @default ''
   */
  backgroundColor?: string;
  /**
   * 遮罩层自定义样式。优先级低于其他属性
   * @default ''
   */
  customStyle?: string;
  /**
   * 背景色过渡时间，单位毫秒
   * @default 300
   */
  duration?: number;
  /**
   * 防止滚动穿透，即不允许点击和滚动
   * @default true
   */
  preventScrollThrough?: boolean;
  /**
   * 是否展示
   * @default false
   */
  visible?: boolean;
  /**
   * 遮罩的层级
   * @default 1000
   */
  zIndex?: number;
  /**
   * 遮罩层的点击事件
   */
  onClick?: (context: { e: MouseEvent }) => void;
}

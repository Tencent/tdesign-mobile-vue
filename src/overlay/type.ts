/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

export interface TdOverlayProps {
  /**
   * 动画时长，单位毫秒
   * @default 300
   */
  duration?: number;
  /**
   * 防止滚动穿透
   * @default true
   */
  preventScrollThrough?: boolean;
  /**
   * 遮罩层是否透明
   * @default false
   */
  transparent?: boolean;
  /**
   * 是否展示
   * @default true
   */
  visible: boolean;
  /**
   * 遮罩的层级
   * @default 1000
   */
  zIndex?: number;
  /**
   * 遮罩的自定义样式
   * @default ''
   */
  customStyle?: string;
  /**
   * 遮罩层的点击事件
   */
  onClick?: (context: { e: MouseEvent }) => void;
}

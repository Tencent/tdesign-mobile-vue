export type MessageType = 'info' | 'success' | 'warning' | 'error';

export type MessageAlignType = 'left' | 'center';

export interface MessageProps {
  /** 显示与隐藏 */
  modelValue?: boolean;
  /** 显示与隐藏 */
  visible?: boolean;
  /** 消息内容 */
  content: string;
  /** 消息类型 */
  theme?: MessageType;
  /** 文本对齐方式，类型可选值为 left / center */
  align?: MessageAlignType;
  /** 显示时间，毫秒，默认 2000 */
  duration?: number;
  /** 自定义层级，默认 5000 */
  zIndex?: number;
}

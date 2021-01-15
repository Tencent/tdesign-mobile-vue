export type MessageType = 'info' | 'success' | 'warning' | 'error';

export type MessageAlignType = 'left' | 'center';
export interface MessageProps {
  modelValue?: boolean;
  visible?: boolean;
  content: string;
  theme?: MessageType;
  align?: MessageAlignType;
  duration?: number;
  zIndex?: number;
}

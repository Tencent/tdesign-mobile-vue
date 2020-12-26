import { TNode } from "@/shared";

export type MessageType = 'info' | 'success' | 'warning' | 'error';

export type MessageAlignType = 'left' | 'center';

export interface MessageOffset {
  top?: number | string;
  right?: number | string;
  left?: number | string;
}

export interface MessageProps {
  modelValue?: boolean;
  visible?: boolean;
  content: string;
  theme?: MessageType;
  align?: MessageAlignType;
  offset?: MessageOffset;
  duration?: number;
  icon?: TNode;
  zIndex?: number;
}

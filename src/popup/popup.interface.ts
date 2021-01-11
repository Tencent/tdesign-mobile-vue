export type PositionType = 'top' | 'bottom' | 'left' | 'right' | 'center';

export interface PopupProps {
  modelValue?: boolean;
  visible?: boolean;
  maskTransparent?: boolean;
  lockScroll?: boolean;
  position?: PositionType;
  transitionName?: string;
}

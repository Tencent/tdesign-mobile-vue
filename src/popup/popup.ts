export type PositionType = 'top' | 'bottom' | 'left' | 'right' | 'center';

export interface IPopupProps {
  modelValue?: boolean;
  visible?: boolean;
  maskTransparent?: boolean;
  lockScroll?: boolean;
  position?: PositionType;
  transitionName?: string;
}

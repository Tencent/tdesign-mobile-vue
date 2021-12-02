export type PlacementType = 'top' | 'bottom' | 'left' | 'right' | 'center';

export interface PopupProps {
  modelValue?: boolean;
  visible?: boolean;
  showOverlay?: boolean;
  lockScroll?: boolean;
  placement?: PlacementType;
  transitionName?: string;
}

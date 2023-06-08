export type TriggerSource = 'overlay' | 'dropdown-item';

export type DropdownMenuDo = () => void;

export type DropdownMenuState = {
  activeId: number | null;
  barRect: any;
  childCount: number;
  itemsLabel: any[];
};

export type DropdownMenuControl = {
  expandMenu: (item: any, idx: number) => void;
  collapseMenu: () => void;
  emitEvents: (emit: string, trigger?: TriggerSource) => void;
};

export enum DropdownMenuExpandState {
  expanded = 'expanded',
  collapsed = 'collapsed',
}

export type DropdownMenuContext = {
  expandedMenuControl: DropdownMenuControl | null;
  recordMenuExpanded(container: any, menuControl: DropdownMenuControl, action: DropdownMenuExpandState): void;
};

let oldOverflow: string | null = null;

export const context: DropdownMenuContext = {
  expandedMenuControl: null,
  recordMenuExpanded(container: any, menuControl: DropdownMenuControl, action: DropdownMenuExpandState) {
    const containerDom = container;
    if (action === DropdownMenuExpandState.expanded) {
      const { expandedMenuControl } = this;
      if (expandedMenuControl && expandedMenuControl !== menuControl) {
        expandedMenuControl.collapseMenu();
      }
      this.expandedMenuControl = menuControl;
      if (oldOverflow === null) {
        oldOverflow = container.style.overflow;
        containerDom.style.overflow = 'hidden';
      }
    } else if (action === DropdownMenuExpandState.collapsed) {
      if (this.expandedMenuControl === menuControl) {
        this.expandedMenuControl = null;
      }
      if (!this.expandedMenuControl && oldOverflow !== null) {
        containerDom.style.overflow = oldOverflow as string;
        oldOverflow = null;
      }
    }
  },
};

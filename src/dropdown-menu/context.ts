export type DropdownMenuControl = {
  expandMenu: (itemProps: any) => void,
  collapseMenu: (itemProps: any) => void,
};

export enum DropdownMenuState {
  expanded = 'expanded',
  collapsed = 'collapsed',
};

let oldOverflow: string | null = null;

type DropdownMenuContext = {
  expandedMenuControl: DropdownMenuControl | null;
  recordMenuExpanded(
    container: any,
    menuControl: DropdownMenuControl,
    action: DropdownMenuState
  ): void;
};

export const context: DropdownMenuContext = {
  expandedMenuControl: null,
  recordMenuExpanded(container: any, menuControl: DropdownMenuControl, action: DropdownMenuState) {
    const containerDom = container;
    if (action === DropdownMenuState.expanded) {
      const { expandedMenuControl } = this;
      if (expandedMenuControl && expandedMenuControl !== menuControl) {
        expandedMenuControl.collapseMenu();
      }
      this.expandedMenuControl = menuControl;
      if (oldOverflow === null) {
        oldOverflow = container.style.overflow;
        containerDom.style.overflow = 'hidden';
      }
    } else if (action === DropdownMenuState.collapsed) {
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

export type DropdownMenuControl = {
  expandMenu: Function,
  collapseMenu: Function,
};

export enum DropdownMenuState {
  expanded = 'expanded',
  collapsed = 'collapsed',
};

let oldOverflow: string | null = null;

type DropdownMenuContext = {
  expandedMenuControl: DropdownMenuControl | null;
  recordMenuExpanded(menuControl: DropdownMenuControl, action: DropdownMenuState): void;
};

export const context: DropdownMenuContext = {
  expandedMenuControl: null,
  recordMenuExpanded(menuControl: DropdownMenuControl, action: DropdownMenuState) {
    if (action === DropdownMenuState.expanded) {
      const { expandedMenuControl } = this;
      if (expandedMenuControl && expandedMenuControl !== menuControl) {
        expandedMenuControl.collapseMenu();
      }
      this.expandedMenuControl = menuControl;
      if (oldOverflow === null) {
        oldOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
      }
    } else if (action === DropdownMenuState.collapsed) {
      if (this.expandedMenuControl === menuControl) {
        this.expandedMenuControl = null;
      }
      if (!this.expandedMenuControl && oldOverflow !== null) {
        document.body.style.overflow = oldOverflow as string;
        oldOverflow = null;
      }
    }
  },
};

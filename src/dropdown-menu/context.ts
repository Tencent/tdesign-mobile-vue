import { DropdownMenuControl, DropdownMenuExpandState, DropdownMenuContext } from './dropdown.interface';

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

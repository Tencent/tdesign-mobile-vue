import { mount } from '@vue/test-utils';
import { DropdownMenu, DropdownItem } from '../index';
import type { TdDropdownMenuProps, TdDropdownItemProps } from '../type';

export const prefix = 't';
export const name = `${prefix}-dropdown-menu`;

export const chineseMap = '一二';
const emptyArr = new Array(2).fill(null);

export const options = emptyArr.map((_, i) => ({
  label: `选项${chineseMap[i]}`,
  value: `option_${i}`,
  disabled: false,
}));

options.push({
  label: '禁用选项',
  value: 'disabled-item',
  disabled: true,
});

export const numberOptions = [
  { label: '数量一', value: 1, disabled: false },
  { label: '数量二', value: 2, disabled: false },
];

/** TdDropdownMenuProps 由脚本生成、不含事件回调，此处补充测试需要透传的监听器 */
type DropdownMenuMountProps = TdDropdownMenuProps & {
  onMenuOpened?: (...args: any[]) => void;
  onMenuClosed?: (...args: any[]) => void;
};

/** 挂载 DropdownMenu，内部渲染一个 label/options 为默认值的 DropdownItem */
export const mountMenu = (menuProps: DropdownMenuMountProps = {}) =>
  mount({
    setup() {
      return () => (
        <DropdownMenu {...menuProps}>
          <DropdownItem label="菜单" options={options} />
        </DropdownMenu>
      );
    },
  });

/** 挂载 DropdownMenu，内部渲染一个自定义 props 的 DropdownItem（menuProps 可选） */
export const mountDropdownItem = (itemProps: TdDropdownItemProps = {}, menuProps: TdDropdownMenuProps = {}) =>
  mount({
    setup() {
      return () => (
        <DropdownMenu {...menuProps}>
          <DropdownItem {...itemProps} />
        </DropdownMenu>
      );
    },
  });

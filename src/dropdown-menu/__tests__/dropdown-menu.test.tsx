import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { DropdownMenu, DropdownItem } from '../index';
import { sleep } from '../../shared/util';
import Popup from '../../popup';
import { name, options, prefix, mountMenu } from './mount';

describe('DropdownMenu', () => {
  describe('props', () => {
    it('closeOnClickOverlay[boolean]', async () => {
      // 默认 closeOnClickOverlay = true：点击遮罩收起菜单
      const wrapper = mountMenu();
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      expect(wrapper.find(`.${name}__item--active`).exists()).toBe(true);
      await wrapper.find(`.t-overlay`).trigger('click');
      await sleep(200);
      expect(wrapper.find(`.${name}__item--active`).exists()).toBe(false);

      // closeOnClickOverlay = false：点击遮罩不收起菜单
      const wrapper2 = mountMenu({ closeOnClickOverlay: false });
      await wrapper2.find(`.${name}__item`).trigger('click');
      await sleep(200);
      expect(wrapper2.find(`.${name}__item--active`).exists()).toBe(true);
      await wrapper2.find(`.t-overlay`).trigger('click');
      await sleep(200);
      expect(wrapper2.find(`.${name}__item--active`).exists()).toBe(true);
    });

    it.each([
      ['down', 'top', '.t-icon-caret-down-small'],
      ['up', 'bottom', '.t-icon-caret-up-small'],
    ] as const)('direction[%s]', async (direction, placement, icon) => {
      const wrapper = mountMenu({ direction });
      expect(wrapper.find(icon).exists()).toBe(true);
      expect(wrapper.find(direction === 'down' ? '.t-icon-caret-up-small' : '.t-icon-caret-down-small').exists()).toBe(
        false,
      );
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      expect(wrapper.findComponent(Popup).props('placement')).toBe(placement);
    });

    // duration 仅透传给内部 Popup 控制过渡动画时长，此处断言透传结果
    const mountMenuWithDuration = async (duration?: string | number) => {
      const wrapper = mountMenu({ duration });
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      return wrapper;
    };

    it('duration[number]', async () => {
      const defaultWrapper = await mountMenuWithDuration();
      expect(defaultWrapper.findComponent(Popup).props('duration')).toBe(200);
      const wrapper = await mountMenuWithDuration(500);
      expect(wrapper.findComponent(Popup).props('duration')).toBe(500);
    });

    it('duration[string]', async () => {
      // 字符串时长传入后按 Number 转换透传给 Popup
      const wrapper = await mountMenuWithDuration('600');
      expect(wrapper.findComponent(Popup).props('duration')).toBe(600);
    });

    it('showOverlay[boolean]', async () => {
      // 默认显示遮罩层
      const wrapper = mountMenu();
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      expect(wrapper.find(`.t-overlay`).isVisible()).toBe(true);

      // showOverlay = false：遮罩 DOM 由 v-show 控制，不可见
      const wrapper2 = mountMenu({ showOverlay: false });
      await wrapper2.find(`.${name}__item`).trigger('click');
      await sleep(200);
      const $overlay = wrapper2.find(`.t-overlay`);
      expect($overlay.exists()).toBe(true);
      expect($overlay.isVisible()).toBe(false);
    });

    it('zIndex[number]', async () => {
      const wrapper = mountMenu({ zIndex: 2000 });
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      // 展开层使用 zIndex，弹出内容使用 zIndex + 1
      expect(wrapper.find(`.t-dropdown-item`).attributes('style')).toContain('z-index: 2000');
      expect(wrapper.find(`.t-popup`).attributes('style')).toContain('z-index: 2001');
    });

    it('default[slot]', () => {
      const wrapper = mount(DropdownMenu, {
        slots: {
          default: () => [
            <DropdownItem label="菜单一" options={options} />,
            <DropdownItem label="菜单二" options={options} />,
          ],
        },
      });
      expect(wrapper.findAll(`.${name}__title`).map((item) => item.text())).toEqual(['菜单一', '菜单二']);
    });
  });

  describe('events', () => {
    it('menuOpened', async () => {
      const onMenuOpened = vi.fn();
      const wrapper = mountMenu({ onMenuOpened });
      expect(onMenuOpened).not.toHaveBeenCalled();
      await wrapper.find(`.${name}__item`).trigger('click');
      expect(onMenuOpened).toHaveBeenCalledTimes(1);
      expect(wrapper.find(`.${name}__item--active`).exists()).toBe(true);
    });

    it('menuClosed', async () => {
      const onMenuClosed = vi.fn();
      const wrapper = mountMenu({ onMenuClosed });
      await wrapper.find(`.${name}__item`).trigger('click');
      expect(onMenuClosed).not.toHaveBeenCalled();
      await wrapper.find(`.${name}__item`).trigger('click');
      expect(onMenuClosed).toHaveBeenCalledTimes(1);
      expect(onMenuClosed).toHaveBeenCalledWith({ trigger: 'menu' });
      expect(wrapper.find(`.${name}__item--active`).exists()).toBe(false);

      await wrapper.find(`.${name}__item`).trigger('click');
      document.body.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
      document.body.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 1 }));
      await sleep(0);
      expect(onMenuClosed).toHaveBeenCalledTimes(2);
      expect(onMenuClosed).toHaveBeenLastCalledWith({ trigger: 'outside' });
      expect(wrapper.find(`.${name}__item--active`).exists()).toBe(false);
    });
  });

  describe('instanceFunctions', () => {
    it('toggle', async () => {
      // 直接挂载 DropdownMenu 以通过 wrapper.vm 访问实例方法
      const wrapper = mount(DropdownMenu, {
        slots: { default: () => <DropdownItem label="菜单" options={options} /> },
      });
      const instance = wrapper.vm as typeof wrapper.vm & { toggle: (index?: number) => void };
      instance.toggle(0);
      await sleep(200);
      expect(wrapper.find(`.${name}__item--active`).exists()).toBe(true);
      expect(wrapper.find(`.${prefix}-dropdown-item`).isVisible()).toBe(true);
      instance.toggle(0);
      await sleep(200);
      expect(wrapper.find(`.${name}__item--active`).exists()).toBe(false);
      instance.toggle(0);
      await sleep(200);
      instance.toggle();
      await sleep(200);
      expect(wrapper.find(`.${name}__item--active`).exists()).toBe(false);
    });

    it('expandMenu', async () => {
      // 直接挂载 DropdownMenu 以通过 wrapper.vm 访问实例方法
      const wrapper = mount(DropdownMenu, {
        slots: { default: () => <DropdownItem label="菜单" options={options} /> },
      });
      const instance = wrapper.vm as typeof wrapper.vm & {
        expandMenu: (item: { label: string; disabled?: boolean }, index: number) => void;
      };
      instance.expandMenu({ label: '菜单', disabled: true }, 0);
      await sleep(0);
      expect(wrapper.find(`.${name}__item--active`).exists()).toBe(false);
      instance.expandMenu({ label: '菜单' }, 0);
      await sleep(200);
      expect(wrapper.find(`.${name}__item--active`).exists()).toBe(true);
      expect(wrapper.find(`.${prefix}-dropdown-item`).isVisible()).toBe(true);
    });

    it('collapseMenu', async () => {
      // 直接挂载 DropdownMenu 以通过 wrapper.vm 访问实例方法
      const wrapper = mount(DropdownMenu, {
        slots: { default: () => <DropdownItem label="菜单" options={options} /> },
      });
      const instance = wrapper.vm as typeof wrapper.vm & { collapseMenu: () => void };
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      expect(wrapper.find(`.${name}__item--active`).exists()).toBe(true);
      instance.collapseMenu();
      await sleep(200);
      expect(wrapper.find(`.${name}__item--active`).exists()).toBe(false);
    });
  });
});

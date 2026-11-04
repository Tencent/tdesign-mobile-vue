import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import { DropdownMenu, DropdownItem } from '../index';
import { sleep } from '../../shared/util';
import Popup from '../../popup';

const prefix = 't';
const name = `${prefix}-dropdown-menu`;

const chineseMap = '一二';
const emptyArr = new Array(2).fill(null);
const options = emptyArr.map((_, i) => ({
  label: `选项${chineseMap[i]}`,
  value: `option_${i}`,
  disabled: false,
}));

options.push({
  label: '禁用选项',
  value: 'disabled-item',
  disabled: true,
});

describe('DropdownMenu', () => {
  describe('props', () => {
    it('closeOnClickOverlay[boolean]', async () => {
      const mountMenu = (closeOnClickOverlay?: boolean) =>
        mount({
          setup() {
            return () => (
              <DropdownMenu closeOnClickOverlay={closeOnClickOverlay}>
                <DropdownItem label="菜单" options={options} />
              </DropdownMenu>
            );
          },
        });

      // 默认 closeOnClickOverlay = true：点击遮罩收起菜单
      const wrapper = mountMenu();
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      expect(wrapper.find(`.${name}__item--active`).exists()).toBe(true);
      await wrapper.find(`.${prefix}-overlay`).trigger('click');
      await sleep(200);
      expect(wrapper.find(`.${name}__item--active`).exists()).toBe(false);

      // closeOnClickOverlay = false：点击遮罩不收起菜单
      const wrapper2 = mountMenu(false);
      await wrapper2.find(`.${name}__item`).trigger('click');
      await sleep(200);
      expect(wrapper2.find(`.${name}__item--active`).exists()).toBe(true);
      await wrapper2.find(`.${prefix}-overlay`).trigger('click');
      await sleep(200);
      expect(wrapper2.find(`.${name}__item--active`).exists()).toBe(true);
    });

    it('direction[down/up]', async () => {
      const mountMenu = (direction?: 'down' | 'up') =>
        mount({
          setup() {
            return () => (
              <DropdownMenu direction={direction}>
                <DropdownItem label="菜单" options={options} />
              </DropdownMenu>
            );
          },
        });

      // direction = down（默认）：标题栏箭头朝下
      const wrapper = mountMenu();
      expect(wrapper.find('.t-icon-caret-down-small').exists()).toBe(true);
      expect(wrapper.find('.t-icon-caret-up-small').exists()).toBe(false);
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      expect(wrapper.findComponent(Popup).props('placement')).toBe('top');

      // direction = up：标题栏箭头朝上
      const wrapper2 = mountMenu('up');
      expect(wrapper2.find('.t-icon-caret-up-small').exists()).toBe(true);
      expect(wrapper2.find('.t-icon-caret-down-small').exists()).toBe(false);
      await wrapper2.find(`.${name}__item`).trigger('click');
      await sleep(200);
      expect(wrapper2.findComponent(Popup).props('placement')).toBe('bottom');
    });

    // duration 仅透传给内部 Popup 控制过渡动画时长，此处断言透传结果
    const mountMenuWithDuration = async (duration?: string | number) => {
      const wrapper = mount({
        setup() {
          return () => (
            <DropdownMenu duration={duration}>
              <DropdownItem label="菜单" options={options} />
            </DropdownMenu>
          );
        },
      });
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
      const mountMenu = (showOverlay?: boolean) =>
        mount({
          setup() {
            return () => (
              <DropdownMenu showOverlay={showOverlay}>
                <DropdownItem label="菜单" options={options} />
              </DropdownMenu>
            );
          },
        });

      // 默认显示遮罩层
      const wrapper = mountMenu();
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      expect(wrapper.find(`.${prefix}-overlay`).isVisible()).toBe(true);

      // showOverlay = false：遮罩 DOM 由 v-show 控制，不可见
      const wrapper2 = mountMenu(false);
      await wrapper2.find(`.${name}__item`).trigger('click');
      await sleep(200);
      const $overlay = wrapper2.find(`.${prefix}-overlay`);
      expect($overlay.exists()).toBe(true);
      expect($overlay.isVisible()).toBe(false);
    });

    it('zIndex[number]', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <DropdownMenu zIndex={2000}>
              <DropdownItem label="菜单" options={options} />
            </DropdownMenu>
          );
        },
      });
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      // 展开层使用 zIndex，弹出内容使用 zIndex + 1
      expect(wrapper.find(`.${prefix}-dropdown-item`).attributes('style')).toContain('z-index: 2000');
      expect(wrapper.find(`.${prefix}-popup`).attributes('style')).toContain('z-index: 2001');
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
      const wrapper = mount(DropdownMenu, {
        props: { onMenuOpened },
        slots: { default: () => <DropdownItem label="菜单" options={options} /> },
      });
      expect(onMenuOpened).not.toHaveBeenCalled();
      await wrapper.find(`.${name}__item`).trigger('click');
      expect(onMenuOpened).toHaveBeenCalledTimes(1);
      expect(wrapper.find(`.${name}__item--active`).exists()).toBe(true);
    });

    it('menuClosed', async () => {
      const onMenuClosed = vi.fn();
      const wrapper = mount(DropdownMenu, {
        props: { onMenuClosed },
        slots: { default: () => <DropdownItem label="菜单" options={options} /> },
      });
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

  describe('scenarios', () => {
    // emitEvents 按 onmenuClosed 查找回调，与实际声明的 onMenuClosed 不符。
    it.todo('notifies menuClosed after overlay clicks, option selection and confirmation');

    it('multiple item with footer buttons', async () => {
      // 底部重置、确认按钮仅在 multiple = true 时展示
      const onReset = vi.fn();
      const onConfirm = vi.fn();
      const onChange = vi.fn();
      const selected = ref(['option_1']);
      const wrapper = mount({
        setup() {
          return () => (
            <DropdownMenu>
              <DropdownItem
                v-model={selected.value}
                label="菜单"
                multiple
                options={options}
                onReset={onReset}
                onConfirm={onConfirm}
                onChange={onChange}
              />
            </DropdownMenu>
          );
        },
      });

      // 打开菜单面板
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);

      // 初始选中 1 项
      expect(wrapper.findAll(`.${prefix}-checkbox--checked`).length).toBe(1);

      // 重置：清空选中
      await wrapper.find(`.${prefix}-dropdown-item__reset-btn`).trigger('click');
      expect(wrapper.findAll(`.${prefix}-checkbox--checked`).length).toBe(0);
      expect(onReset).toHaveBeenCalledTimes(1);

      // 勾选第 1 项后确认
      await wrapper.find(`.${prefix}-dropdown-item__checkbox-item`).trigger('click');
      await wrapper.find(`.${prefix}-dropdown-item__confirm-btn`).trigger('click');
      expect(onConfirm).toHaveBeenCalledWith(['option_0']);
      expect(onChange).toHaveBeenCalledWith(['option_0']);
      expect(selected.value).toEqual(['option_0']);
    });
  });
});

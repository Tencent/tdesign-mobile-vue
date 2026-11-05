import { enableAutoUnmount, mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { TabPanel, Tabs } from '../index';
import Sticky from '../../sticky/index';
import { trigger } from '@/test/touch';
import { mountTabs, name, numericTabList, tabList, tabPanelName } from './mount';

enableAutoUnmount(afterEach);

// mock 清理队列：用例失败中断时也保证在 afterEach 恢复全局环境
const cleanups: Array<() => void> = [];
afterEach(() => {
  while (cleanups.length) {
    const cleanup = cleanups.pop() as () => void;
    cleanup();
  }
});

interface TabLayout {
  tabLeft?: number;
  tabWidth?: number;
  innerLeft?: number;
  innerWidth?: number;
  lineWidth?: number;
  navScrollWidth?: number;
}

// jsdom 没有真实布局，指示线定位与导航滚动依赖 offsetLeft/offsetWidth，按类名 mock 各区域尺寸
const mockTabLayout = ({
  tabLeft = 100,
  tabWidth = 88,
  innerLeft = 10,
  innerWidth = 56,
  lineWidth = 32,
  navScrollWidth = 0,
}: TabLayout = {}) => {
  const widthDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth');
  const leftDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetLeft');
  Object.defineProperty(HTMLElement.prototype, 'offsetLeft', {
    configurable: true,
    get(this: HTMLElement) {
      if (this.classList.contains(`${name}__item`)) return tabLeft;
      if (this.classList.contains('t-badge')) return innerLeft;
      return 0;
    },
  });
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    get(this: HTMLElement) {
      if (this.classList.contains(`${name}__item`)) return tabWidth;
      if (this.classList.contains('t-badge')) return innerWidth;
      if (this.classList.contains(`${name}__track`)) return lineWidth;
      if (this.classList.contains(`${name}__scroll`)) return navScrollWidth;
      return 0;
    },
  });
  cleanups.push(() => {
    if (widthDescriptor) Object.defineProperty(HTMLElement.prototype, 'offsetWidth', widthDescriptor);
    if (leftDescriptor) Object.defineProperty(HTMLElement.prototype, 'offsetLeft', leftDescriptor);
  });
};

describe('Tabs', () => {
  describe('props', () => {
    it('animation[object]', async () => {
      mockTabLayout();
      const wrapper = mountTabs({ defaultValue: '1', animation: { duration: 500 } });
      const items = wrapper.findAll(`.${name}__item`);

      // 切换时下划线按 animation.duration 设置过渡时长
      await items[1].trigger('click');
      expect(wrapper.find(`.${name}__track`).attributes('style')).toContain('transition-duration: 500ms');

      await items[0].trigger('click');
      expect(wrapper.find(`.${name}__track`).attributes('style')).toContain('transition-duration: 500ms');
    });

    it.each([
      ['fixed', 'translateX(128px)', undefined],
      ['auto', 'translateX(110px)', 'width: 56px'],
      ['full', 'translateX(100px)', 'width: 88px'],
    ] as const)('bottomLineMode[%s]', async (bottomLineMode, transform, width) => {
      mockTabLayout();
      const wrapper = mountTabs({ defaultValue: '1', bottomLineMode });
      await wrapper.findAll(`.${name}__item`)[1].trigger('click');
      const style = wrapper.find(`.${name}__track`).attributes('style');
      expect(style).toContain(`transform: ${transform}`);
      if (width) expect(style).toContain(width);
      else expect(style).not.toContain('width');
    });

    it('list[array]', async () => {
      const onChange = vi.fn();
      const wrapper = mountTabs({ defaultValue: '1', onChange });
      const items = wrapper.findAll(`.${name}__item`);

      // list 生成导航项
      expect(items).toHaveLength(tabList.length);
      expect(items[0].text()).toBe('标签页一');
      expect(items[0].classes()).toContain(`${name}__item--active`);
      // list 用法不渲染面板内容
      expect(wrapper.findAll(`.${tabPanelName}`)).toHaveLength(0);

      await items[1].trigger('click');
      expect(items[1].classes()).toContain(`${name}__item--active`);
      expect(items[0].classes()).not.toContain(`${name}__item--active`);
      expect(onChange).toHaveBeenCalledWith('2', '标签页二');
    });

    it('middle[function]', () => {
      const wrapper = mountTabs({ middle: () => <div class="custom-middle">中间内容</div> });
      const $middle = wrapper.find('.custom-middle');
      expect($middle.exists()).toBe(true);
      expect($middle.text()).toBe('中间内容');
      // middle 渲染在导航与内容区之间
      expect($middle.element.nextElementSibling.classList.contains(`${name}__content`)).toBe(true);
    });

    it('middle[slot]', () => {
      const wrapper = mount(Tabs, {
        props: { list: tabList },
        slots: { middle: () => <div class="middle-slot">中间内容</div> },
      });
      const $middle = wrapper.find('.middle-slot');
      expect($middle.exists()).toBe(true);
      expect($middle.text()).toBe('中间内容');
      // middle 渲染在导航与内容区之间
      expect($middle.element.nextElementSibling.classList.contains(`${name}__content`)).toBe(true);
    });

    it('showBottomLine[boolean]', async () => {
      const wrapper = mountTabs({ defaultValue: '1' });
      expect(wrapper.find(`.${name}__track`).exists()).toBe(true);

      await wrapper.setProps({ showBottomLine: false });
      expect(wrapper.find(`.${name}__track`).exists()).toBe(false);
    });

    it.each([
      ['medium', 't-size-m'],
      ['large', 't-size-l'],
    ] as const)('size[%s]', (size, className) => {
      const wrapper = mountTabs({ size });
      expect(wrapper.classes()).toContain(className);
    });

    it('spaceEvenly[boolean]', async () => {
      const wrapper = mountTabs();
      expect(wrapper.findAll(`.${name}__item`)).toHaveLength(tabList.length);
      wrapper.findAll(`.${name}__item`).forEach((item) => {
        expect(item.classes()).toContain(`${name}__item--evenly`);
      });

      await wrapper.setProps({ spaceEvenly: false });
      wrapper.findAll(`.${name}__item`).forEach((item) => {
        expect(item.classes()).not.toContain(`${name}__item--evenly`);
      });
    });

    it('split[boolean]', async () => {
      const wrapper = mountTabs();
      expect(wrapper.find(`.${name}__nav`).classes()).toContain(`${name}__nav--split`);

      await wrapper.setProps({ split: false });
      expect(wrapper.find(`.${name}__nav`).classes()).not.toContain(`${name}__nav--split`);
    });

    it('sticky[boolean]', () => {
      // 默认不开启粘性布局，内部 Sticky 被禁用
      const wrapper = mountTabs();
      expect(wrapper.findComponent(Sticky).props('disabled')).toBe(true);

      const stickyWrapper = mountTabs({ sticky: true });
      const $sticky = stickyWrapper.findComponent(Sticky);
      expect($sticky.props('disabled')).toBe(false);
      // 粘性布局开启后导航区域被 TSticky 包装
      expect($sticky.find(`.${name}__nav`).exists()).toBe(true);
    });

    it('stickyProps[object]', () => {
      const wrapper = mountTabs({ stickyProps: { offsetTop: 50, zIndex: 100 } });
      const $sticky = wrapper.findComponent(Sticky);
      // stickyProps 透传至内部 TSticky
      expect($sticky.props('offsetTop')).toBe(50);
      expect($sticky.props('zIndex')).toBe(100);
      // sticky 关闭时强制禁用 Sticky
      expect($sticky.props('disabled')).toBe(true);
    });

    it('swipeable[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mountTabs({ defaultValue: '1', onChange });
      const $content = wrapper.find(`.${name}__content`);

      // 默认可滑动：向左滑动切换到下一项
      await trigger($content, 'touchstart', 120, 0);
      await trigger($content, 'touchmove', 20, 0);
      await trigger($content, 'touchend', 20, 0);
      expect(wrapper.findAll(`.${name}__item`)[1].classes()).toContain(`${name}__item--active`);
      expect(onChange).toHaveBeenCalledTimes(1);

      // swipeable 为 false 时滑动不切换
      const disabledWrapper = mountTabs({ defaultValue: '1', swipeable: false, onChange });
      const $disabledContent = disabledWrapper.find(`.${name}__content`);
      await trigger($disabledContent, 'touchstart', 120, 0);
      await trigger($disabledContent, 'touchmove', 20, 0);
      await trigger($disabledContent, 'touchend', 20, 0);
      expect(disabledWrapper.findAll(`.${name}__item`)[0].classes()).toContain(`${name}__item--active`);
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it.each(['line', 'tag', 'card'] as const)('theme[%s]', async (theme) => {
      const wrapper = mountTabs({ defaultValue: '1', theme });
      if (theme === 'line') {
        expect(wrapper.find(`.${name}__scroll`).classes()).toContain(`${name}__scroll--line`);
        expect(wrapper.findAll(`.${name}__item--line`)).toHaveLength(tabList.length);
        expect(wrapper.find(`.${name}__track`).exists()).toBe(true);
      } else if (theme === 'tag') {
        expect(wrapper.find(`.${name}__track`).exists()).toBe(false);
        const innerItems = wrapper.findAll(`.${name}__item-inner`);
        expect(innerItems[0].classes()).toContain(`${name}__item-inner--active`);
        expect(innerItems[1].classes()).not.toContain(`${name}__item-inner--active`);
      } else {
        expect(wrapper.find(`.${name}__track`).exists()).toBe(false);
        expect(wrapper.findAll(`.${name}__item-prefix`)).toHaveLength(0);
        expect(wrapper.findAll(`.${name}__item-suffix`)).toHaveLength(1);
        await wrapper.findAll(`.${name}__item`)[1].trigger('click');
        expect(wrapper.findAll(`.${name}__item-prefix`)).toHaveLength(1);
        expect(wrapper.findAll(`.${name}__item-suffix`)).toHaveLength(0);
      }
    });

    it('value[string]', async () => {
      const onChange = vi.fn();
      const wrapper = mountTabs({ value: '2', onChange });
      const items = wrapper.findAll(`.${name}__item`);
      expect(items[1].classes()).toContain(`${name}__item--active`);

      // 受控模式：外部更新 value 切换激活项
      await wrapper.setProps({ value: '1' });
      expect(items[0].classes()).toContain(`${name}__item--active`);
      expect(items[1].classes()).not.toContain(`${name}__item--active`);

      // 外部未同步 value 时点击不改激活项，仅抛出 update:value 与 change
      await items[1].trigger('click');
      expect(wrapper.emitted('update:value')[0]).toEqual(['2', '标签页二']);
      expect(onChange).toHaveBeenCalledWith('2', '标签页二');
      expect(items[0].classes()).toContain(`${name}__item--active`);
    });

    it('value[number]', async () => {
      const wrapper = mountTabs({ list: numericTabList, value: 2 });
      const items = wrapper.findAll(`.${name}__item`);
      expect(items[1].classes()).toContain(`${name}__item--active`);

      await wrapper.setProps({ value: 1 });
      expect(items[0].classes()).toContain(`${name}__item--active`);
      expect(items[1].classes()).not.toContain(`${name}__item--active`);
    });

    it('modelValue[string]', async () => {
      const wrapper = mountTabs({ modelValue: '2' });
      const items = wrapper.findAll(`.${name}__item`);
      expect(items[1].classes()).toContain(`${name}__item--active`);

      // v-model：点击抛出 update:modelValue
      await items[0].trigger('click');
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['1', '标签页一']);

      // 外部同步 modelValue 后激活项切换
      await wrapper.setProps({ modelValue: '1' });
      expect(items[0].classes()).toContain(`${name}__item--active`);
      expect(items[1].classes()).not.toContain(`${name}__item--active`);
    });

    it('modelValue[number]', async () => {
      const wrapper = mountTabs({ list: numericTabList, modelValue: 2 });
      const items = wrapper.findAll(`.${name}__item`);
      expect(items[1].classes()).toContain(`${name}__item--active`);

      await items[0].trigger('click');
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([1, '标签页一']);

      await wrapper.setProps({ modelValue: 1 });
      expect(items[0].classes()).toContain(`${name}__item--active`);
    });

    it('defaultValue[string]', async () => {
      const onChange = vi.fn();
      const wrapper = mountTabs({ defaultValue: '2', onChange });
      const items = wrapper.findAll(`.${name}__item`);
      expect(items[1].classes()).toContain(`${name}__item--active`);

      // 非受控模式：点击后内部状态切换
      await items[0].trigger('click');
      expect(items[0].classes()).toContain(`${name}__item--active`);
      expect(items[1].classes()).not.toContain(`${name}__item--active`);
      expect(onChange).toHaveBeenCalledWith('1', '标签页一');
    });

    it('defaultValue[number]', async () => {
      const wrapper = mountTabs({ list: numericTabList, defaultValue: 2 });
      const items = wrapper.findAll(`.${name}__item`);
      expect(items[1].classes()).toContain(`${name}__item--active`);

      await items[0].trigger('click');
      expect(items[0].classes()).toContain(`${name}__item--active`);
    });

    it('default[slot]', async () => {
      const wrapper = mount(() => (
        <Tabs defaultValue="1">
          <TabPanel value="1" label="标签页一" panel="标签一内容区" />
          <TabPanel value="2" label="标签页二" panel="标签二内容区" />
        </Tabs>
      ));
      // default 插槽中的 TabPanel 生成导航项
      const items = wrapper.findAll(`.${name}__item`);
      expect(items).toHaveLength(tabList.length);
      expect(items[0].text()).toBe('标签页一');
      expect(items[0].classes()).toContain(`${name}__item--active`);

      // 面板内容来自 default 插槽，仅激活面板渲染（destroyOnHide 默认为 true）
      let panels = wrapper.findAll(`.${tabPanelName}`);
      expect(panels).toHaveLength(1);
      expect(panels[0].text()).toBe('标签一内容区');

      await items[1].trigger('click');
      panels = wrapper.findAll(`.${tabPanelName}`);
      expect(panels).toHaveLength(1);
      expect(panels[0].text()).toBe('标签二内容区');
    });
  });

  describe('events', () => {
    it('change', async () => {
      const onChange = vi.fn();
      const wrapper = mountTabs({
        defaultValue: '1',
        onChange,
        list: [
          { value: '1', label: '标签页一' },
          { value: '2', label: '标签页二', disabled: true },
          { value: '3', label: '标签页三' },
        ],
      });
      const items = wrapper.findAll(`.${name}__item`);

      // 点击当前激活项不触发
      await items[0].trigger('click');
      expect(onChange).not.toHaveBeenCalled();

      // 点击禁用项不触发
      await items[1].trigger('click');
      expect(onChange).not.toHaveBeenCalled();

      // 切换时以 (value, label) 触发
      await items[2].trigger('click');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith('3', '标签页三');
    });

    it('click', async () => {
      const onClick = vi.fn();
      const wrapper = mountTabs({ defaultValue: '1', onClick });
      const items = wrapper.findAll(`.${name}__item`);

      // 点击当前激活项不触发（源码在激活项与禁用项上直接返回）
      await items[0].trigger('click');
      expect(onClick).not.toHaveBeenCalled();

      await items[1].trigger('click');
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith('2', '标签页二');
    });

    it('scroll', async () => {
      const onScroll = vi.fn();
      const wrapper = mountTabs({ sticky: true, stickyProps: { offsetTop: 10 }, onScroll });

      // jsdom 无法真实滚动，Sticky 在渲染计算内容位置时上报 (scrollTop, isFixed)
      expect(onScroll).toHaveBeenCalledWith(expect.any(Number), expect.any(Boolean));

      // 位置参数变化后重新计算并再次上报
      onScroll.mockClear();
      await wrapper.setProps({ stickyProps: { offsetTop: 20 } });
      expect(onScroll).toHaveBeenCalledTimes(1);
      expect(onScroll).toHaveBeenCalledWith(expect.any(Number), expect.any(Boolean));
    });
  });
});

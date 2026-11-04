import { enableAutoUnmount, mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import { TabPanel, Tabs } from '../index';
import type { TdTabsProps } from '../type';
import Sticky from '../../sticky/index';
import { trigger } from '../../image-viewer/__tests__/touch';
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

    it('bottomLineMode[fixed/auto/full]', async () => {
      mockTabLayout();

      // fixed（默认）：下划线固定宽度并居中于激活项，不设置 width
      const fixedWrapper = mountTabs({ defaultValue: '1' });
      await fixedWrapper.findAll(`.${name}__item`)[1].trigger('click');
      const fixedStyle = fixedWrapper.find(`.${name}__track`).attributes('style');
      expect(fixedStyle).toContain('transform: translateX(128px)');
      expect(fixedStyle).not.toContain('width');

      // auto：下划线宽度与激活项内容一致，并随内容偏移：100 + 10 = 110
      const autoWrapper = mountTabs({ defaultValue: '1', bottomLineMode: 'auto' });
      await autoWrapper.findAll(`.${name}__item`)[1].trigger('click');
      const autoStyle = autoWrapper.find(`.${name}__track`).attributes('style');
      expect(autoStyle).toContain('width: 56px');
      expect(autoStyle).toContain('transform: translateX(110px)');

      // full：下划线宽度与激活项整项一致
      const fullWrapper = mountTabs({ defaultValue: '1', bottomLineMode: 'full' });
      await fullWrapper.findAll(`.${name}__item`)[1].trigger('click');
      const fullStyle = fullWrapper.find(`.${name}__track`).attributes('style');
      expect(fullStyle).toContain('width: 88px');
      expect(fullStyle).toContain('transform: translateX(100px)');
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

    it('showBottomLine[boolean]', async () => {
      const wrapper = mountTabs({ defaultValue: '1' });
      expect(wrapper.find(`.${name}__track`).exists()).toBe(true);

      await wrapper.setProps({ showBottomLine: false });
      expect(wrapper.find(`.${name}__track`).exists()).toBe(false);
    });

    it('size[medium/large]', async () => {
      const wrapper = mountTabs({ size: 'medium' });
      expect(wrapper.classes()).toContain('t-size-m');

      await wrapper.setProps({ size: 'large' });
      expect(wrapper.classes()).toContain('t-size-l');
      expect(wrapper.classes()).not.toContain('t-size-m');
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

    it('theme[line/tag/card]', async () => {
      // line（默认）：渲染底部激活线条
      const lineWrapper = mountTabs({ defaultValue: '1' });
      expect(lineWrapper.find(`.${name}__scroll`).classes()).toContain(`${name}__scroll--line`);
      expect(lineWrapper.findAll(`.${name}__item--line`)).toHaveLength(tabList.length);
      expect(lineWrapper.find(`.${name}__track`).exists()).toBe(true);

      // tag：激活项内容高亮，不渲染线条
      const tagWrapper = mountTabs({ defaultValue: '1', theme: 'tag' });
      expect(tagWrapper.find(`.${name}__track`).exists()).toBe(false);
      const innerItems = tagWrapper.findAll(`.${name}__item-inner`);
      expect(innerItems[0].classes()).toContain(`${name}__item-inner--active`);
      expect(innerItems[1].classes()).not.toContain(`${name}__item-inner--active`);

      // card：激活项前后渲染装饰，切换后装饰跟随激活项
      const cardWrapper = mountTabs({ defaultValue: '1', theme: 'card' });
      expect(cardWrapper.find(`.${name}__track`).exists()).toBe(false);
      expect(cardWrapper.findAll(`.${name}__item-prefix`)).toHaveLength(0);
      expect(cardWrapper.findAll(`.${name}__item-suffix`)).toHaveLength(1);
      await cardWrapper.findAll(`.${name}__item`)[1].trigger('click');
      expect(cardWrapper.findAll(`.${name}__item-prefix`)).toHaveLength(1);
      expect(cardWrapper.findAll(`.${name}__item-suffix`)).toHaveLength(0);
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

  describe('slots', () => {
    it('middle', () => {
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

    it('default', async () => {
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

  describe('scenarios', () => {
    describe('indicator line', () => {
      beforeEach(() => {
        vi.useFakeTimers();
      });

      afterEach(() => {
        vi.useRealTimers();
      });

      it('shows the bottom line at the active tab after mount without animation', async () => {
        mockTabLayout();
        const wrapper = mountTabs({ defaultValue: '1' });

        // 定位前线条不可见
        expect(wrapper.find(`.${name}__track`).attributes('style')).toContain('opacity: 0');

        // 挂载 300ms 后完成初次定位
        vi.advanceTimersByTime(300);
        await nextTick();
        const style = wrapper.find(`.${name}__track`).attributes('style');
        expect(style).toContain('opacity: 1');
        expect(style).toContain('transform: translateX(128px)');
        // 初次定位不播放动画
        expect(style).toContain('transition-duration: 0s');
      });

      it('repositions the line when the active value changes', async () => {
        mockTabLayout({ tabLeft: 200, tabWidth: 100, lineWidth: 40 });
        const wrapper = mountTabs({ defaultValue: '1' });

        await wrapper.findAll(`.${name}__item`)[1].trigger('click');
        const style = wrapper.find(`.${name}__track`).attributes('style');
        expect(style).toContain('opacity: 1');
        // fixed 模式居中于激活项：200 + (100 - 40) / 2 = 230
        expect(style).toContain('transform: translateX(230px)');
        // 未设置 animation 时不附加过渡时长
        expect(style).not.toContain('transition-duration');
      });

      it('repositions the line on window resize', async () => {
        mockTabLayout();
        const wrapper = mountTabs({ defaultValue: '1' });

        window.dispatchEvent(new Event('resize'));
        await nextTick();
        const style = wrapper.find(`.${name}__track`).attributes('style');
        expect(style).toContain('opacity: 1');
        expect(style).toContain('transform: translateX(128px)');
      });

      it('scrolls the nav to center the active tab', async () => {
        const scrollToSpy = vi.spyOn(Element.prototype, 'scrollTo');
        cleanups.push(() => scrollToSpy.mockRestore());
        mockTabLayout({ tabLeft: 200, tabWidth: 88, navScrollWidth: 300 });
        const wrapper = mountTabs({ defaultValue: '1' });

        await wrapper.findAll(`.${name}__item`)[1].trigger('click');
        // 200 - 300 / 2 + 88 / 2 = 94
        expect(scrollToSpy).toHaveBeenCalledWith({ left: 94, behavior: 'smooth' });
      });
    });

    describe('swipe navigation', () => {
      const swipeList: TdTabsProps['list'] = [
        { value: '1', label: '标签页一', panel: '内容一' },
        { value: '2', label: '标签页二', panel: '内容二' },
        { value: '3', label: '标签页三', panel: '内容三' },
      ];
      const mountSwipeTabs = (props: TdTabsProps = {}) => mount(Tabs, { props: { list: swipeList, ...props } });

      it('switches to the next tab when swiping left', async () => {
        const onChange = vi.fn();
        const wrapper = mountSwipeTabs({ defaultValue: '2', onChange });
        const $content = wrapper.find(`.${name}__content`);

        await trigger($content, 'touchstart', 120, 0);
        await trigger($content, 'touchmove', 20, 0);
        await trigger($content, 'touchend', 20, 0);

        expect(wrapper.findAll(`.${name}__item`)[2].classes()).toContain(`${name}__item--active`);
        expect(onChange).toHaveBeenCalledWith('3', '标签页三');
      });

      it('switches to the previous tab when swiping right', async () => {
        const onChange = vi.fn();
        const wrapper = mountSwipeTabs({ defaultValue: '2', onChange });
        const $content = wrapper.find(`.${name}__content`);

        await trigger($content, 'touchstart', 0, 0);
        await trigger($content, 'touchmove', 120, 0);
        await trigger($content, 'touchend', 120, 0);

        expect(wrapper.findAll(`.${name}__item`)[0].classes()).toContain(`${name}__item--active`);
        expect(onChange).toHaveBeenCalledWith('1', '标签页一');
      });

      it('keeps the current tab when the swipe distance is not more than 40', async () => {
        const onChange = vi.fn();
        const wrapper = mountSwipeTabs({ defaultValue: '1', onChange });
        const $content = wrapper.find(`.${name}__content`);

        await trigger($content, 'touchstart', 0, 0);
        await trigger($content, 'touchmove', 40, 0);
        await trigger($content, 'touchend', 40, 0);

        expect(wrapper.findAll(`.${name}__item`)[0].classes()).toContain(`${name}__item--active`);
        expect(onChange).not.toHaveBeenCalled();
      });

      it('ignores vertical swipes', async () => {
        const onChange = vi.fn();
        const wrapper = mountSwipeTabs({ defaultValue: '2', onChange });
        const $content = wrapper.find(`.${name}__content`);

        await trigger($content, 'touchstart', 0, 0);
        await trigger($content, 'touchmove', 0, 100);
        await trigger($content, 'touchend', 0, 100);

        expect(wrapper.findAll(`.${name}__item`)[1].classes()).toContain(`${name}__item--active`);
        expect(onChange).not.toHaveBeenCalled();
      });

      it('does not switch beyond the first or last tab', async () => {
        const onChange = vi.fn();
        const firstWrapper = mountSwipeTabs({ defaultValue: '1', onChange });
        const $firstContent = firstWrapper.find(`.${name}__content`);

        // 第一个标签向右滑不动
        await trigger($firstContent, 'touchstart', 0, 0);
        await trigger($firstContent, 'touchmove', 120, 0);
        await trigger($firstContent, 'touchend', 120, 0);
        expect(firstWrapper.findAll(`.${name}__item`)[0].classes()).toContain(`${name}__item--active`);

        // 最后一个标签向左滑不动
        const lastWrapper = mountSwipeTabs({ defaultValue: '3', onChange });
        const $lastContent = lastWrapper.find(`.${name}__content`);
        await trigger($lastContent, 'touchstart', 120, 0);
        await trigger($lastContent, 'touchmove', 20, 0);
        await trigger($lastContent, 'touchend', 20, 0);
        expect(lastWrapper.findAll(`.${name}__item`)[2].classes()).toContain(`${name}__item--active`);

        expect(onChange).not.toHaveBeenCalled();
      });
    });

    it('renders the same navigation with list and TabPanel children', () => {
      const listWrapper = mountTabs({ defaultValue: '1' });
      // Fragment 包裹的子组件也会被展开收集
      const panelWrapper = mount(() => (
        <Tabs defaultValue="1">
          <>
            <TabPanel value="1" label="标签页一" panel="标签一内容区" />
            <TabPanel value="2" label="标签页二" panel="标签二内容区" />
          </>
        </Tabs>
      ));

      const listItems = listWrapper.findAll(`.${name}__item`);
      const panelItems = panelWrapper.findAll(`.${name}__item`);
      expect(panelItems).toHaveLength(listItems.length);
      expect(panelItems[0].text()).toBe(listItems[0].text());
      expect(panelItems[1].text()).toBe(listItems[1].text());
      expect(panelItems[0].classes()).toContain(`${name}__item--active`);
      // 子组件用法下激活面板内容同时渲染
      expect(panelWrapper.find(`.${tabPanelName}`).text()).toBe('标签一内容区');
    });
  });
});

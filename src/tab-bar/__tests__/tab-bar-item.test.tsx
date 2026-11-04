import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { h } from 'vue';
import TabBar from '../tab-bar';
import TabBarItem from '../tab-bar-item';
import type { SubTabBarItem } from '../type';
import { checkedTexts, mountTabBar, numericBarItems, subTabBarItems, unnamedBarItems } from './mount';

/** 在 TabBar 中挂载单个 TabBarItem：itemProps 与 itemSlots 传给子项，barProps 传给 TabBar */
const mountItem = (
  itemProps: Record<string, any> = {},
  itemSlots: Record<string, any> = {},
  barProps: Record<string, any> = {},
) =>
  mount(TabBar, {
    props: barProps,
    slots: {
      default: () => h(TabBarItem, { value: '1', ...itemProps }, itemSlots),
    },
  });

describe('TabBarItem', () => {
  describe('props', () => {
    it('badgeProps[object]', () => {
      const iconSlots = { icon: () => <div class="custom-icon">icon</div>, default: () => '标签一' };
      // count：渲染数字角标，图标包裹在角标内容中
      const count = mountItem({ badgeProps: { count: 16 } }, iconSlots, { value: '1' });
      expect(count.find('.t-badge--count').exists()).toBeTruthy();
      expect(count.find('.t-badge__count').text()).toBe('16');
      expect(count.find('.t-badge__content .custom-icon').exists()).toBeTruthy();
      // dot：渲染圆点角标，不显示数字
      const dot = mountItem({ badgeProps: { dot: true } }, iconSlots, { value: '1' });
      expect(dot.find('.t-badge--dot').exists()).toBeTruthy();
      expect(dot.find('.t-badge--count').exists()).toBeFalsy();
      // 其余徽标属性透传给 Badge：count 超过 maxCount 时显示 maxCount+
      const maxCount = mountItem({ badgeProps: { count: 100, maxCount: 99 } }, iconSlots, { value: '1' });
      expect(maxCount.find('.t-badge__count').text()).toBe('99+');
      // 无 dot/count 时不渲染角标，图标正常展示
      const plain = mountItem({ badgeProps: { color: 'red' } }, iconSlots, { value: '1' });
      expect(plain.find('.t-badge').exists()).toBeFalsy();
      expect(plain.find('.t-tab-bar-item__icon .custom-icon').exists()).toBeTruthy();
    });

    it('icon[function]', () => {
      // 渲染函数返回节点数组：作为图标渲染
      const wrapper = mountItem(
        { icon: () => [<div class="fn-icon">icon</div>] },
        { default: () => '标签一' },
        { value: '1' },
      );
      expect(wrapper.find('.t-tab-bar-item__icon .fn-icon').exists()).toBeTruthy();
      // 有图标时文本使用小号样式
      expect(wrapper.find('.t-tab-bar-item__text--small').exists()).toBeTruthy();
    });

    // 源码未支持：iconContent 对渲染结果调用 forEach，传入返回单个 VNode 的渲染函数会抛出 "iconSlot?.forEach is not a function"
    it.todo('icon[function] returning a single VNode node');
    it('icon[slot]', () => {
      const wrapper = mountItem(
        {},
        { icon: () => <div class="slot-icon">icon</div>, default: () => '标签一' },
        { value: '1' },
      );
      expect(wrapper.find('.t-tab-bar-item__icon .slot-icon').exists()).toBeTruthy();
      expect(wrapper.find('.t-tab-bar-item__text--small').exists()).toBeTruthy();
      // 未传 icon：不渲染图标容器，文本不使用小号样式
      const plain = mountItem({}, { default: () => '标签一' }, { value: '1' });
      expect(plain.find('.t-tab-bar-item__icon').exists()).toBeFalsy();
      expect(plain.find('.t-tab-bar-item__text--small').exists()).toBeFalsy();
    });

    it('subTabBar[array]', () => {
      // 配置二级菜单：渲染菜单图标，内容区角色为 button 且默认收起
      const wrapper = mountItem({ subTabBar: subTabBarItems }, { default: () => '此处展开' }, { value: '1' });
      expect(wrapper.find('.t-tab-bar-item__icon-menu').exists()).toBeTruthy();
      const content = wrapper.find('.t-tab-bar-item__content');
      expect(content.attributes('role')).toBe('button');
      expect(content.attributes('aria-expanded')).toBe('false');
      expect(wrapper.find('.t-tab-bar-item__spread').exists()).toBeFalsy();
      // 空数组视为未配置二级菜单
      const empty = mountItem({ subTabBar: [] }, { default: () => '标签一' }, { value: '1' });
      expect(empty.find('.t-tab-bar-item__icon-menu').exists()).toBeFalsy();
      expect(empty.find('.t-tab-bar-item__content').attributes('role')).toBe('tab');
    });

    it('value[string]', () => {
      // 子项 value 作为标识：与 TabBar 选中值匹配的子项选中
      expect(checkedTexts(mountTabBar({ value: '2' }))).toEqual(['标签二']);
    });

    it('value[number]', () => {
      expect(checkedTexts(mountTabBar({ value: 2 }, numericBarItems))).toEqual(['标签二']);
    });

    it('default[slot]', () => {
      const wrapper = mountItem({}, { default: () => '标签一' }, { value: '1' });
      expect(wrapper.find('.t-tab-bar-item__text').text()).toContain('标签一');
    });
  });

  describe('scenarios', () => {
    it('icon prop takes precedence over icon slot when both are provided', () => {
      const wrapper = mountItem(
        { icon: () => [<div class="fn-icon">icon</div>] },
        { icon: () => <div class="slot-icon">icon</div>, default: () => '标签一' },
        { value: '1' },
      );
      expect(wrapper.find('.t-tab-bar-item__icon .fn-icon').exists()).toBeTruthy();
      expect(wrapper.find('.t-tab-bar-item__icon .slot-icon').exists()).toBeFalsy();
    });

    it('badgeProps renders no badge when icon content is absent', () => {
      const wrapper = mountItem({ badgeProps: { count: 16 } }, { default: () => '标签一' }, { value: '1' });
      // 角标依附于图标：未提供 icon 时不渲染角标与图标容器
      expect(wrapper.find('.t-badge').exists()).toBeFalsy();
      expect(wrapper.find('.t-tab-bar-item__icon').exists()).toBeFalsy();
      expect(wrapper.find('.t-tab-bar-item__text').text()).toContain('标签一');
    });

    describe('sub menu spread', () => {
      it('opens the menu on parent click and closes it on the second click', async () => {
        const onChange = vi.fn();
        const wrapper = mountTabBar({ defaultValue: '3', onChange });
        const parent = wrapper.findAll('.t-tab-bar-item__content')[2];
        expect(parent.attributes('aria-expanded')).toBe('false');

        await parent.trigger('click');
        const menu = wrapper.find('.t-tab-bar-item__spread');
        expect(menu.exists()).toBeTruthy();
        expect(menu.attributes('role')).toBe('menu');
        expect(wrapper.findAll('.t-tab-bar-item__spread-item-text').map((item) => item.text())).toEqual([
          '展开项一',
          '展开项二',
          '展开项三',
        ]);
        // 首个菜单项前无分割线，其余项各有分割线
        expect(wrapper.findAll('.t-tab-bar-item__spread-item-split')).toHaveLength(2);
        expect(parent.attributes('aria-expanded')).toBe('true');
        expect(onChange).toHaveBeenLastCalledWith(['3']);

        // 再次点击父项：菜单收起，选中值收缩为父项 value
        await parent.trigger('click');
        expect(wrapper.find('.t-tab-bar-item__spread').exists()).toBeFalsy();
        expect(parent.attributes('aria-expanded')).toBe('false');
        expect(onChange).toHaveBeenLastCalledWith('3');
      });

      it('closes the menu after selecting a child item and the parent stays checked', async () => {
        const onChange = vi.fn();
        const wrapper = mountTabBar({ defaultValue: '3', onChange });
        const parent = wrapper.findAll('.t-tab-bar-item__content')[2];
        await parent.trigger('click');
        await wrapper.findAll('.t-tab-bar-item__spread-item')[1].trigger('click');
        expect(onChange).toHaveBeenLastCalledWith(['3', '3-2']);
        expect(wrapper.find('.t-tab-bar-item__spread').exists()).toBeFalsy();
        expect(checkedTexts(wrapper)).toEqual(['此处展开']);
        // 菜单收起后父项恢复选中态
        expect(parent.attributes('aria-selected')).toBe('true');
      });

      it('reports the child index as value when sub items have no value', async () => {
        const onChange = vi.fn();
        const subItemsWithoutValue = [{ label: '展开项一' }, { label: '展开项二' }] as SubTabBarItem[];
        const wrapper = mount(
          <TabBar defaultValue="1" onChange={onChange}>
            <TabBarItem value="1">标签一</TabBarItem>
            <TabBarItem value="3" subTabBar={subItemsWithoutValue}>
              此处展开
            </TabBarItem>
          </TabBar>,
        );
        await wrapper.findAll('.t-tab-bar-item__content')[1].trigger('click');
        await wrapper.findAll('.t-tab-bar-item__spread-item')[1].trigger('click');
        // 第二个子项未配置 value，以索引 1 上报
        expect(onChange).toHaveBeenLastCalledWith(['3', 1]);
      });

      it('closes the menu automatically after switching to another item', async () => {
        const onChange = vi.fn();
        const wrapper = mountTabBar({ defaultValue: '3', onChange });
        const contents = wrapper.findAll('.t-tab-bar-item__content');
        await contents[2].trigger('click');
        expect(wrapper.find('.t-tab-bar-item__spread').exists()).toBeTruthy();
        // 切换到普通标签：菜单自动收起
        await contents[0].trigger('click');
        expect(wrapper.find('.t-tab-bar-item__spread').exists()).toBeFalsy();
        // 再次点击父项可重新展开
        await contents[2].trigger('click');
        expect(wrapper.find('.t-tab-bar-item__spread').exists()).toBeTruthy();
        expect(onChange).toHaveBeenLastCalledWith(['3']);
      });
    });

    it('falls back to mounting order index as identity when value is not set', async () => {
      const onChange = vi.fn();
      const wrapper = mountTabBar({ defaultValue: 1, onChange }, unnamedBarItems);
      expect(checkedTexts(wrapper)).toEqual(['标签二']);
      await wrapper.findAll('.t-tab-bar-item__content')[2].trigger('click');
      // 未设置 value 的子项按挂载顺序以索引上报
      expect(onChange).toHaveBeenLastCalledWith(2);
      expect(checkedTexts(wrapper)).toEqual(['标签三']);
    });

    it('badge aria label follows tabBar global config', () => {
      const iconSlots = { icon: () => <div class="custom-icon">icon</div> };
      const getAriaLabel = (wrapper: ReturnType<typeof mountItem>) =>
        wrapper.find('.t-tab-bar-item__content').attributes('aria-label');

      // 无徽标：回退默认 TabBar
      expect(getAriaLabel(mountItem({}, iconSlots))).toBe('TabBar');
      // 圆点徽标：newsAriaLabel
      expect(getAriaLabel(mountItem({ badgeProps: { dot: true } }, iconSlots))).toBe('有新的消息');
      // count 为 "..."：moreNewsAriaLabel
      expect(getAriaLabel(mountItem({ badgeProps: { count: '...' } }, iconSlots))).toBe('有很多消息');
      // 数字 count 未超 maxCount：haveNewsAriaLabel 模板
      expect(getAriaLabel(mountItem({ badgeProps: { count: 16 } }, iconSlots))).toBe('有 16 条消息');
      // 数字 count 超过 maxCount：haveMoreNewsAriaLabel 模板
      expect(getAriaLabel(mountItem({ badgeProps: { count: 100, maxCount: 99 } }, iconSlots))).toBe('有 99+ 条消息');
      // 非数字 count：原样输出
      expect(getAriaLabel(mountItem({ badgeProps: { count: 'New' } }, iconSlots))).toBe('New');
    });
  });
});

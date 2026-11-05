import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { h } from 'vue';
import TabBar from '../tab-bar';
import TabBarItem from '../tab-bar-item';
import ConfigProvider from '../../config-provider';
import { checkedTexts, mountTabBar, numericBarItems, subTabBarItems } from './mount';

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

  describe('globalConfig', () => {
    it('tabBar', () => {
      const iconSlots = { icon: () => <div class="custom-icon">icon</div> };
      const wrapper = mount(
        <ConfigProvider globalConfig={{ tabBar: { newsAriaLabel: 'new messages' } }}>
          <TabBar>
            <TabBarItem value="1" badgeProps={{ dot: true }} v-slots={iconSlots}>
              标签一
            </TabBarItem>
          </TabBar>
        </ConfigProvider>,
      );
      expect(wrapper.find('.t-tab-bar-item__content').attributes('aria-label')).toBe('new messages');
    });
  });
});

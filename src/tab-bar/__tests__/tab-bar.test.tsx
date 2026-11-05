import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import TabBar from '../tab-bar';
import TabBarItem from '../tab-bar-item';
import { barItems, checkedTexts, mountTabBar, numericBarItems, type TabBarItemDesc } from './mount';

describe('TabBar', () => {
  describe('props', () => {
    it('bordered[boolean]', async () => {
      const wrapper = mount(
        <TabBar>
          <TabBarItem value="1">标签一</TabBarItem>
        </TabBar>,
      );
      // 默认渲染外边框
      expect(wrapper.classes()).toContain('t-tab-bar--bordered');
      await wrapper.setProps({ bordered: false });
      expect(wrapper.classes()).not.toContain('t-tab-bar--bordered');
    });

    it('fixed[boolean]', async () => {
      const wrapper = mount(
        <TabBar>
          <TabBarItem value="1">标签一</TabBarItem>
        </TabBar>,
      );
      // 默认固定在底部
      expect(wrapper.classes()).toContain('t-tab-bar--fixed');
      await wrapper.setProps({ fixed: false });
      expect(wrapper.classes()).not.toContain('t-tab-bar--fixed');
    });

    it('placeholder[boolean]', () => {
      // 默认 fixed，开启 placeholder 后渲染占位容器并包裹标签栏
      const wrapper = mountTabBar({ placeholder: true });
      const placeholder = wrapper.find('.t-tab-bar__placeholder');
      expect(placeholder.exists()).toBeTruthy();
      expect(placeholder.find('.t-tab-bar').exists()).toBeTruthy();
      // 默认不开启占位
      expect(mountTabBar().find('.t-tab-bar__placeholder').exists()).toBeFalsy();
      // 仅在 fixed 时生效
      expect(mountTabBar({ fixed: false, placeholder: true }).find('.t-tab-bar__placeholder').exists()).toBeFalsy();
    });

    it('safeAreaInsetBottom[boolean]', async () => {
      const wrapper = mount(
        <TabBar>
          <TabBarItem value="1">标签一</TabBarItem>
        </TabBar>,
      );
      // 默认开启底部安全区适配
      expect(wrapper.classes()).toContain('t-tab-bar--safe');
      await wrapper.setProps({ safeAreaInsetBottom: false });
      expect(wrapper.classes()).not.toContain('t-tab-bar--safe');
    });

    it.each(['normal', 'round'] as const)('shape[%s]', (shape) => {
      expect(mountTabBar({ shape }).classes()).toContain(`t-tab-bar--${shape}`);
    });

    it('split[boolean]', () => {
      // split 默认开启：子项渲染分割线类名
      expect(mountTabBar().find('.t-tab-bar-item--split').exists()).toBeTruthy();
      expect(mountTabBar({ split: false }).find('.t-tab-bar-item--split').exists()).toBeFalsy();
    });

    it.each(['normal', 'tag'] as const)('theme[%s]', (theme) => {
      // theme 作用于子项内容区
      expect(mountTabBar({ theme }).find(`.t-tab-bar-item__content--${theme}`).exists()).toBe(true);
    });

    it('value[string]', () => {
      expect(checkedTexts(mountTabBar({ value: '2' }))).toEqual(['标签二']);
    });

    it('value[number]', () => {
      expect(checkedTexts(mountTabBar({ value: 2 }, numericBarItems))).toEqual(['标签二']);
    });

    it('value[array]', () => {
      // 数组 value 命中带二级菜单的父项
      expect(checkedTexts(mountTabBar({ value: ['3'] }))).toEqual(['此处展开']);
    });

    it('modelValue[string]', () => {
      expect(checkedTexts(mountTabBar({ modelValue: '2' }))).toEqual(['标签二']);
    });

    it('modelValue[number]', () => {
      expect(checkedTexts(mountTabBar({ modelValue: 2 }, numericBarItems))).toEqual(['标签二']);
    });

    it('modelValue[array]', () => {
      expect(checkedTexts(mountTabBar({ modelValue: ['3'] }))).toEqual(['此处展开']);
    });

    it('defaultValue[string]', () => {
      expect(checkedTexts(mountTabBar({ defaultValue: '2' }))).toEqual(['标签二']);
    });

    it('defaultValue[number]', () => {
      expect(checkedTexts(mountTabBar({ defaultValue: 2 }, numericBarItems))).toEqual(['标签二']);
    });

    it('defaultValue[array]', () => {
      expect(checkedTexts(mountTabBar({ defaultValue: ['3'] }))).toEqual(['此处展开']);
    });

    it('zIndex[number]', async () => {
      const wrapper = mount(
        <TabBar zIndex={50}>
          <TabBarItem value="1">标签一</TabBarItem>
        </TabBar>,
      );
      expect(wrapper.attributes('style')).toContain('z-index: 50');
      await wrapper.setProps({ zIndex: 100 });
      expect(wrapper.attributes('style')).toContain('z-index: 100');
    });

    it('default[slot]', () => {
      const wrapper = mount(
        <TabBar>
          <TabBarItem value="1">标签一</TabBarItem>
          <TabBarItem value="2">标签二</TabBarItem>
        </TabBar>,
      );
      expect(wrapper.attributes('role')).toBe('tablist');
      const items = wrapper.findAll('.t-tab-bar-item');
      expect(items).toHaveLength(2);
      expect(items[0].text()).toContain('标签一');
      expect(items[1].text()).toContain('标签二');
      // 未传默认插槽时渲染空标签栏
      const empty = mount(TabBar);
      expect(empty.attributes('role')).toBe('tablist');
      expect(empty.findAll('.t-tab-bar-item')).toHaveLength(0);
    });
  });

  describe('events', () => {
    it('change', async () => {
      const onChange = vi.fn();
      const wrapper = mountTabBar({ defaultValue: '1', onChange });
      const contents = wrapper.findAll('.t-tab-bar-item__content');
      expect(onChange).toHaveBeenCalledTimes(0);

      // 切换普通标签：回传子项 value
      await contents[1].trigger('click');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith('2');

      // 切换到带二级菜单的标签：回传 [父项 value] 并展开菜单
      await contents[2].trigger('click');
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenLastCalledWith(['3']);
      expect(wrapper.find('.t-tab-bar-item__spread').exists()).toBeTruthy();

      // 选择二级菜单项：回传 [父项 value, 子项 value] 并收起菜单
      await wrapper.findAll('.t-tab-bar-item__spread-item')[1].trigger('click');
      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onChange).toHaveBeenLastCalledWith(['3', '3-2']);
      expect(wrapper.find('.t-tab-bar-item__spread').exists()).toBeFalsy();
    });

    it('update:value', async () => {
      // 受控 value：点击触发 update:value，未回写 value 前选中态不变
      const wrapper = mountTabBar({ value: '1' });
      await wrapper.findAll('.t-tab-bar-item__content')[1].trigger('click');
      expect(wrapper.emitted('update:value')).toEqual([['2']]);
      expect(checkedTexts(wrapper)).toEqual(['标签一']);
    });

    it('update:modelValue', async () => {
      const wrapper = mountTabBar({ modelValue: '1' });
      await wrapper.findAll('.t-tab-bar-item__content')[1].trigger('click');
      expect(wrapper.emitted('update:modelValue')).toEqual([['2']]);
      expect(checkedTexts(wrapper)).toEqual(['标签一']);
    });
  });

  describe('scenarios', () => {
    describe('controlled switching', () => {
      it('v-model:value syncs selection on click and on external change', async () => {
        const value = ref('1');
        const wrapper = mount({
          render: () => (
            <TabBar v-model:value={value.value}>
              {barItems.slice(0, 2).map((item) => (
                <TabBarItem key={item.value} value={item.value}>
                  {item.label}
                </TabBarItem>
              ))}
            </TabBar>
          ),
        });
        expect(checkedTexts(wrapper)).toEqual(['标签一']);
        // 点击子项：父级值与选中态同步
        await wrapper.findAll('.t-tab-bar-item__content')[1].trigger('click');
        expect(value.value).toBe('2');
        expect(checkedTexts(wrapper)).toEqual(['标签二']);
        // 父级更新受控值：选中态反向同步
        value.value = '1';
        await nextTick();
        expect(checkedTexts(wrapper)).toEqual(['标签一']);
      });

      it('v-model (modelValue) syncs selection on click', async () => {
        const value = ref('1');
        const wrapper = mount({
          render: () => (
            <TabBar v-model={value.value}>
              {barItems.slice(0, 2).map((item) => (
                <TabBarItem key={item.value} value={item.value}>
                  {item.label}
                </TabBarItem>
              ))}
            </TabBar>
          ),
        });
        await wrapper.findAll('.t-tab-bar-item__content')[1].trigger('click');
        expect(value.value).toBe('2');
        expect(checkedTexts(wrapper)).toEqual(['标签二']);
      });
    });

    describe('uncontrolled switching', () => {
      it('defaultValue selection moves on click and re-clicking the active item still emits change', async () => {
        const onChange = vi.fn();
        const wrapper = mountTabBar({ defaultValue: '1', onChange }, barItems.slice(0, 2));
        const contents = wrapper.findAll('.t-tab-bar-item__content');
        await contents[1].trigger('click');
        expect(checkedTexts(wrapper)).toEqual(['标签二']);
        expect(onChange).toHaveBeenCalledTimes(1);
        // 重复点击当前选中项：仍触发 change，选中值不变
        await contents[1].trigger('click');
        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenLastCalledWith('2');
        expect(checkedTexts(wrapper)).toEqual(['标签二']);
      });
    });

    describe('sub tab bar value', () => {
      it('array value keeps the parent item checked after selecting a child item', async () => {
        const onChange = vi.fn();
        const wrapper = mountTabBar({ defaultValue: '3', onChange });
        const parent = wrapper.findAll('.t-tab-bar-item__content')[2];
        expect(checkedTexts(wrapper)).toEqual(['此处展开']);

        await parent.trigger('click');
        await wrapper.findAll('.t-tab-bar-item__spread-item')[1].trigger('click');
        expect(onChange).toHaveBeenLastCalledWith(['3', '3-2']);
        // 选择子项后父项保持选中，菜单收起
        expect(checkedTexts(wrapper)).toEqual(['此处展开']);
        expect(wrapper.find('.t-tab-bar-item__spread').exists()).toBeFalsy();
      });
    });

    describe('edge cases', () => {
      it('renders more than three items and supports switching', async () => {
        const onChange = vi.fn();
        const manyItems: TabBarItemDesc[] = [
          { value: '1', label: '标签一' },
          { value: '2', label: '标签二' },
          { value: '3', label: '标签三' },
          { value: '4', label: '标签四' },
        ];
        const wrapper = mountTabBar({ defaultValue: '1', onChange }, manyItems);
        expect(wrapper.findAll('.t-tab-bar-item')).toHaveLength(4);
        await wrapper.findAll('.t-tab-bar-item__content')[3].trigger('click');
        expect(onChange).toHaveBeenLastCalledWith('4');
        expect(checkedTexts(wrapper)).toEqual(['标签四']);
      });
    });
  });
});

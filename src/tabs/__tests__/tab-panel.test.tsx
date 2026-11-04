import { enableAutoUnmount, mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { TabPanel, Tabs } from '../index';
import { name, tabPanelName } from './mount';

enableAutoUnmount(afterEach);

describe('TabPanel', () => {
  describe('props', () => {
    it('badgeProps[object]', () => {
      const wrapper = mount(() => (
        <Tabs defaultValue="1">
          <TabPanel value="1" label="标签页一" badgeProps={{ count: 6 }}>
            内容一
          </TabPanel>
          <TabPanel value="2" label="标签页二">
            内容二
          </TabPanel>
        </Tabs>
      ));

      // badgeProps 透传至导航项外层的 Badge
      expect(wrapper.find('.t-badge').exists()).toBe(true);
      expect(wrapper.find('.t-badge__count').text()).toBe('6');
    });

    it('destroyOnHide[boolean]', async () => {
      // 默认 true：切换后旧面板被销毁
      const wrapper = mount(() => (
        <Tabs defaultValue="1">
          <TabPanel value="1" label="标签页一">
            内容一
          </TabPanel>
          <TabPanel value="2" label="标签页二">
            内容二
          </TabPanel>
        </Tabs>
      ));
      await wrapper.findAll(`.${name}__item`)[1].trigger('click');
      let panels = wrapper.findAll(`.${tabPanelName}`);
      expect(panels).toHaveLength(1);
      expect(panels[0].text()).toBe('内容二');

      // false：隐藏时保留挂载，仅不可见
      const keepWrapper = mount(() => (
        <Tabs defaultValue="1">
          <TabPanel value="1" label="标签页一" destroyOnHide={false}>
            内容一
          </TabPanel>
          <TabPanel value="2" label="标签页二" destroyOnHide={false}>
            内容二
          </TabPanel>
        </Tabs>
      ));
      await keepWrapper.findAll(`.${name}__item`)[1].trigger('click');
      panels = keepWrapper.findAll(`.${tabPanelName}`);
      expect(panels).toHaveLength(2);
      expect(panels[0].isVisible()).toBe(false);
      expect(panels[1].isVisible()).toBe(true);
    });

    it('disabled[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(() => (
        <Tabs defaultValue="2" onChange={onChange}>
          <TabPanel value="1" label="标签页一" disabled>
            内容一
          </TabPanel>
          <TabPanel value="2" label="标签页二">
            内容二
          </TabPanel>
        </Tabs>
      ));
      const items = wrapper.findAll(`.${name}__item`);

      // 导航项带禁用态样式
      expect(items[0].classes()).toContain(`${name}__item--disabled`);
      await items[0].trigger('click');
      // 禁用项不可切换
      expect(onChange).not.toHaveBeenCalled();
      expect(items[0].classes()).not.toContain(`${name}__item--active`);
      expect(items[1].classes()).toContain(`${name}__item--active`);
    });

    it('icon[function]', () => {
      const wrapper = mount(() => (
        <Tabs defaultValue="1">
          <TabPanel value="1" label="标签页一" icon={() => <span class="custom-icon">图标</span>}>
            内容一
          </TabPanel>
        </Tabs>
      ));

      // 图标渲染在导航项内
      const $icon = wrapper.find(`.${name}__icon`);
      expect($icon.exists()).toBe(true);
      expect($icon.find('.custom-icon').exists()).toBe(true);
    });

    it('label[string]', () => {
      const wrapper = mount(() => (
        <Tabs defaultValue="1">
          <TabPanel value="1" label="标签页一">
            内容一
          </TabPanel>
          <TabPanel value="2" label="标签页二">
            内容二
          </TabPanel>
        </Tabs>
      ));

      const items = wrapper.findAll(`.${name}__item`);
      expect(items[0].text()).toBe('标签页一');
      expect(items[1].text()).toBe('标签页二');
      expect(wrapper.find(`.${name}__icon`).exists()).toBe(false);
    });

    // 子组件用法下 label 属性会被包一层函数（label: () => label[index] || item.props.label），
    // 函数类型仅 list 用法可正常渲染，见 label[function] 用例
    it('label[function]', () => {
      const wrapper = mount(Tabs, {
        props: {
          defaultValue: '1',
          list: [{ value: '1', label: () => <b class="custom-label">自定义标签</b> }],
        },
      });

      expect(wrapper.find(`.${name}__item .custom-label`).exists()).toBe(true);
      expect(wrapper.find(`.${name}__item`).text()).toBe('自定义标签');
    });

    it('lazy[boolean]', async () => {
      const wrapper = mount(() => (
        <Tabs defaultValue="1">
          <TabPanel value="1" label="标签页一">
            内容一
          </TabPanel>
          <TabPanel value="2" label="标签页二" lazy destroyOnHide={false}>
            内容二
          </TabPanel>
        </Tabs>
      ));

      // 懒加载面板初始不渲染
      expect(wrapper.findAll(`.${tabPanelName}`)).toHaveLength(1);
      expect(wrapper.text()).not.toContain('内容二');

      // 首次激活后开始渲染；面板一默认 destroyOnHide，切走即销毁
      await wrapper.findAll(`.${name}__item`)[1].trigger('click');
      expect(wrapper.findAll(`.${tabPanelName}`)).toHaveLength(1);
      expect(wrapper.text()).toContain('内容二');
      expect(wrapper.text()).not.toContain('内容一');

      // destroyOnHide 为 false 时切走后保留挂载，仅隐藏
      await wrapper.findAll(`.${name}__item`)[0].trigger('click');
      const panels = wrapper.findAll(`.${tabPanelName}`);
      expect(panels).toHaveLength(2);
      expect(panels[1].isVisible()).toBe(false);
      expect(wrapper.text()).toContain('内容一');
    });

    it('panel[string]', () => {
      const wrapper = mount(() => (
        <Tabs defaultValue="1">
          <TabPanel value="1" label="标签页一" panel="面板内容" />
        </Tabs>
      ));

      expect(wrapper.find(`.${tabPanelName}`).text()).toBe('面板内容');
    });

    it('panel[function]', () => {
      const wrapper = mount(() => (
        <Tabs defaultValue="1">
          <TabPanel value="1" label="标签页一" panel={() => <p class="custom-panel">面板内容</p>} />
        </Tabs>
      ));

      const $panel = wrapper.find(`.${tabPanelName} .custom-panel`);
      expect($panel.exists()).toBe(true);
      expect($panel.text()).toBe('面板内容');
    });

    it('value[string]', () => {
      const wrapper = mount(() => (
        <Tabs defaultValue="2">
          <TabPanel value="1" label="标签页一">
            内容一
          </TabPanel>
          <TabPanel value="2" label="标签页二">
            内容二
          </TabPanel>
        </Tabs>
      ));

      // value 用于匹配激活项
      const panels = wrapper.findAll(`.${tabPanelName}`);
      expect(panels).toHaveLength(1);
      expect(panels[0].text()).toBe('内容二');
      expect(wrapper.findAll(`.${name}__item`)[1].classes()).toContain(`${name}__item--active`);
    });

    it('value[number]', () => {
      const wrapper = mount(() => (
        <Tabs defaultValue={2}>
          <TabPanel value={1} label="标签页一">
            内容一
          </TabPanel>
          <TabPanel value={2} label="标签页二">
            内容二
          </TabPanel>
        </Tabs>
      ));

      const panels = wrapper.findAll(`.${tabPanelName}`);
      expect(panels).toHaveLength(1);
      expect(panels[0].text()).toBe('内容二');
      expect(wrapper.findAll(`.${name}__item`)[1].classes()).toContain(`${name}__item--active`);
    });
  });

  describe('slots', () => {
    it('default', () => {
      const wrapper = mount(() => (
        <Tabs defaultValue="1">
          <TabPanel value="1" label="标签页一">
            <p class="default-slot">默认插槽内容</p>
          </TabPanel>
        </Tabs>
      ));

      const $slot = wrapper.find(`.${tabPanelName} .default-slot`);
      expect($slot.exists()).toBe(true);
      expect($slot.text()).toBe('默认插槽内容');
    });

    it('panel', () => {
      const wrapper = mount(() => (
        <Tabs defaultValue="1">
          <TabPanel value="1" label="标签页一">
            {{
              panel: () => <p class="panel-slot">面板插槽内容</p>,
            }}
          </TabPanel>
        </Tabs>
      ));

      const $slot = wrapper.find(`.${tabPanelName} .panel-slot`);
      expect($slot.exists()).toBe(true);
      expect($slot.text()).toBe('面板插槽内容');
    });

    it('label', () => {
      // 源码直接调用 label()[0] 取插槽内容，插槽函数需返回数组（与模板编译行为一致）
      const wrapper = mount(() => (
        <Tabs defaultValue="1">
          <TabPanel value="1" label="标签页一">
            {{ label: () => [<b class="label-slot">标签插槽内容</b>] }}
          </TabPanel>
          <TabPanel value="2" label="标签页二">
            内容二
          </TabPanel>
        </Tabs>
      ));

      // label 插槽渲染在导航项上
      const $slot = wrapper.find(`.${name}__item .label-slot`);
      expect($slot.exists()).toBe(true);
      expect($slot.text()).toBe('标签插槽内容');
    });
  });

  describe('scenarios', () => {
    it('label slot takes precedence over the label prop in the nav', () => {
      const wrapper = mount(() => (
        <Tabs defaultValue="1">
          <TabPanel value="1" label="属性标签">
            {{ label: () => [<b class="label-slot">插槽标签</b>] }}
          </TabPanel>
        </Tabs>
      ));

      expect(wrapper.find(`.${name}__item .label-slot`).exists()).toBe(true);
      expect(wrapper.find(`.${name}__item`).text()).not.toContain('属性标签');
    });

    it('default slot takes precedence over the panel prop', () => {
      const wrapper = mount(() => (
        <Tabs defaultValue="1">
          <TabPanel value="1" label="标签页一" panel="属性面板内容">
            <p class="default-slot">插槽面板内容</p>
          </TabPanel>
        </Tabs>
      ));

      expect(wrapper.find(`.${tabPanelName}`).text()).not.toContain('属性面板内容');
      expect(wrapper.find(`.${tabPanelName} .default-slot`).text()).toBe('插槽面板内容');
    });

    it('toggles panel visibility with the active value', async () => {
      const wrapper = mount(() => (
        <Tabs defaultValue="1">
          <TabPanel value="1" label="标签页一" destroyOnHide={false}>
            内容一
          </TabPanel>
          <TabPanel value="2" label="标签页二" destroyOnHide={false}>
            内容二
          </TabPanel>
        </Tabs>
      ));
      const items = wrapper.findAll(`.${name}__item`);

      let panels = wrapper.findAll(`.${tabPanelName}`);
      expect(panels[0].isVisible()).toBe(true);
      expect(panels[1].isVisible()).toBe(false);

      await items[1].trigger('click');
      panels = wrapper.findAll(`.${tabPanelName}`);
      expect(items[1].classes()).toContain(`${name}__item--active`);
      expect(panels[0].isVisible()).toBe(false);
      expect(panels[1].isVisible()).toBe(true);

      await items[0].trigger('click');
      panels = wrapper.findAll(`.${tabPanelName}`);
      expect(panels[0].isVisible()).toBe(true);
      expect(panels[1].isVisible()).toBe(false);
    });
  });
});

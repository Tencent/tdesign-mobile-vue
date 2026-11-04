import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { nextTick, ref } from 'vue';

import SideBar from '../index';
import SideBarItem from '../side-bar-item';

const prefix = 't';
const name = `${prefix}-side-bar`;
const itemName = `${prefix}-side-bar-item`;

describe('SideBar', () => {
  describe('props', () => {
    it('value[string]', async () => {
      const value = ref('a');
      const wrapper = mount({
        setup() {
          return () => (
            <SideBar value={value.value}>
              <SideBarItem value="a" label="选项一" />
              <SideBarItem value="b" label="选项二" />
            </SideBar>
          );
        },
      });

      let $items = wrapper.findAll(`.${itemName}`);
      expect($items[0].classes()).toContain(`${itemName}--active`);

      // 外部更新受控值后激活项切换
      value.value = 'b';
      await nextTick();
      $items = wrapper.findAll(`.${itemName}`);
      expect($items[1].classes()).toContain(`${itemName}--active`);
      expect($items[0].classes()).not.toContain(`${itemName}--active`);
    });

    it('value[number]', async () => {
      const wrapper = mount(
        <SideBar value={1}>
          <SideBarItem value={0} label="选项一" />
          <SideBarItem value={1} label="选项二" />
        </SideBar>,
      );

      let $items = wrapper.findAll(`.${itemName}`);
      expect($items[1].classes()).toContain(`${itemName}--active`);
      expect($items[0].classes()).not.toContain(`${itemName}--active`);

      // 受控模式：点击仅上报 update:value，激活项保持
      await $items[0].trigger('click');
      expect(wrapper.emitted('update:value')).toEqual([[0]]);
      $items = wrapper.findAll(`.${itemName}`);
      expect($items[1].classes()).toContain(`${itemName}--active`);
      expect($items[0].classes()).not.toContain(`${itemName}--active`);

      // 外部更新受控值后激活项切换
      await wrapper.setProps({ value: 0 });
      $items = wrapper.findAll(`.${itemName}`);
      expect($items[0].classes()).toContain(`${itemName}--active`);
      expect($items[1].classes()).not.toContain(`${itemName}--active`);
    });

    it('modelValue[string]', async () => {
      const value = ref('a');
      const wrapper = mount({
        setup() {
          return () => (
            <SideBar v-model={value.value}>
              <SideBarItem value="a" label="选项一" />
              <SideBarItem value="b" label="选项二" />
            </SideBar>
          );
        },
      });

      let $items = wrapper.findAll(`.${itemName}`);
      expect($items[0].classes()).toContain(`${itemName}--active`);

      // v-model 双向绑定：点击后绑定值与激活项同步切换
      await $items[1].trigger('click');
      expect(value.value).toBe('b');
      expect(wrapper.findComponent(SideBar).emitted('update:modelValue')).toEqual([['b']]);
      $items = wrapper.findAll(`.${itemName}`);
      expect($items[1].classes()).toContain(`${itemName}--active`);
      expect($items[0].classes()).not.toContain(`${itemName}--active`);

      // 外部修改 v-model 值，激活项跟随
      value.value = 'a';
      await nextTick();
      $items = wrapper.findAll(`.${itemName}`);
      expect($items[0].classes()).toContain(`${itemName}--active`);
      expect($items[1].classes()).not.toContain(`${itemName}--active`);
    });

    it('modelValue[number]', async () => {
      const value = ref(1);
      const wrapper = mount({
        setup() {
          return () => (
            <SideBar v-model={value.value}>
              <SideBarItem value={0} label="选项一" />
              <SideBarItem value={1} label="选项二" />
            </SideBar>
          );
        },
      });

      let $items = wrapper.findAll(`.${itemName}`);
      expect($items[1].classes()).toContain(`${itemName}--active`);

      await $items[0].trigger('click');
      expect(value.value).toBe(0);
      expect(wrapper.findComponent(SideBar).emitted('update:modelValue')).toEqual([[0]]);
      $items = wrapper.findAll(`.${itemName}`);
      expect($items[0].classes()).toContain(`${itemName}--active`);
      expect($items[1].classes()).not.toContain(`${itemName}--active`);
    });

    it('defaultValue[string]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(
        <SideBar defaultValue="a" onChange={onChange}>
          <SideBarItem value="a" label="选项一" />
          <SideBarItem value="b" label="选项二" />
        </SideBar>,
      );

      let $items = wrapper.findAll(`.${itemName}`);
      expect($items[0].classes()).toContain(`${itemName}--active`);

      // 非受控模式：点击后内部值切换，不抛出 update 事件
      await $items[1].trigger('click');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith('b');
      expect(wrapper.emitted('update:value')).toBeUndefined();
      expect(wrapper.emitted('update:modelValue')).toBeUndefined();
      $items = wrapper.findAll(`.${itemName}`);
      expect($items[1].classes()).toContain(`${itemName}--active`);
      expect($items[0].classes()).not.toContain(`${itemName}--active`);
    });

    it('defaultValue[number]', async () => {
      const wrapper = mount(
        <SideBar defaultValue={0}>
          <SideBarItem value={0} label="选项一" />
          <SideBarItem value={1} label="选项二" />
        </SideBar>,
      );

      let $items = wrapper.findAll(`.${itemName}`);
      expect($items[0].classes()).toContain(`${itemName}--active`);

      await $items[1].trigger('click');
      $items = wrapper.findAll(`.${itemName}`);
      expect($items[1].classes()).toContain(`${itemName}--active`);
      expect($items[0].classes()).not.toContain(`${itemName}--active`);
    });
  });

  describe('events', () => {
    it('change', async () => {
      const onChange = vi.fn();
      const wrapper = mount(
        <SideBar defaultValue={0} onChange={onChange}>
          <SideBarItem value={0} label="选项一" />
          <SideBarItem value={1} label="选项二" />
        </SideBar>,
      );

      expect(onChange).not.toHaveBeenCalled();

      await wrapper.findAll(`.${itemName}`)[1].trigger('click');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith(1);

      // 内部值无去重保护：重复点击同一项仍会触发 change
      await wrapper.findAll(`.${itemName}`)[1].trigger('click');
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenLastCalledWith(1);
    });

    it('click', async () => {
      const testClick = async (disabled: boolean) => {
        const onClick = vi.fn();
        const value = 0;
        const label = 'tdesign-mobile-vue';
        const wrapper = mount(
          <SideBar onClick={onClick}>
            <SideBarItem value={value} label={label} disabled={disabled} />
          </SideBar>,
        );

        await wrapper.find(`.${itemName}`).trigger('click');
        expect(onClick).toHaveBeenCalledTimes(disabled ? 0 : 1);
        if (!disabled) {
          expect(onClick).toHaveBeenLastCalledWith(value, label);
        }
      };

      await testClick(false);
      await testClick(true);
    });

    it('update:value', async () => {
      const wrapper = mount(
        <SideBar value={0}>
          <SideBarItem value={0} label="选项一" />
          <SideBarItem value={1} label="选项二" />
        </SideBar>,
      );

      await wrapper.findAll(`.${itemName}`)[1].trigger('click');
      expect(wrapper.emitted('update:value')).toEqual([[1]]);
      // value 通道不抛出 update:modelValue
      expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    });

    it('update:modelValue', async () => {
      const value = ref(0);
      const wrapper = mount({
        setup() {
          return () => (
            <SideBar v-model={value.value}>
              <SideBarItem value={0} label="选项一" />
              <SideBarItem value={1} label="选项二" />
            </SideBar>
          );
        },
      });

      await wrapper.findAll(`.${itemName}`)[1].trigger('click');
      expect(wrapper.findComponent(SideBar).emitted('update:modelValue')).toEqual([[1]]);
      // modelValue 通道不抛出 update:value
      expect(wrapper.findComponent(SideBar).emitted('update:value')).toBeUndefined();
      expect(value.value).toBe(1);
    });
  });

  describe('slots', () => {
    it('default', () => {
      const wrapper = mount(
        <SideBar>
          <SideBarItem value={0} label="选项一" />
          <SideBarItem value={1} label="选项二" />
          <div class="custom-content">自定义内容</div>
        </SideBar>,
      );

      // 默认插槽内容渲染在侧边栏内
      expect(wrapper.findAll(`.${itemName}`)).toHaveLength(2);
      expect(wrapper.find('.custom-content').text()).toBe('自定义内容');
      // 渲染插槽后底部占位节点仍存在
      expect(wrapper.find(`.${name}__padding`).exists()).toBe(true);
    });
  });

  describe('scenarios', () => {
    describe('value priority', () => {
      it('value[string] & defaultValue[string]', () => {
        const wrapper = mount(
          <SideBar value="b" defaultValue="a">
            <SideBarItem value="a" label="选项一" />
            <SideBarItem value="b" label="选项二" />
          </SideBar>,
        );

        // 受控 value 优先于 defaultValue
        const $items = wrapper.findAll(`.${itemName}`);
        expect($items[1].classes()).toContain(`${itemName}--active`);
        expect($items[0].classes()).not.toContain(`${itemName}--active`);
      });

      it('modelValue[string] & defaultValue[string]', () => {
        const wrapper = mount(
          <SideBar modelValue="b" defaultValue="a">
            <SideBarItem value="a" label="选项一" />
            <SideBarItem value="b" label="选项二" />
          </SideBar>,
        );

        // v-model 受控值优先于 defaultValue
        const $items = wrapper.findAll(`.${itemName}`);
        expect($items[1].classes()).toContain(`${itemName}--active`);
        expect($items[0].classes()).not.toContain(`${itemName}--active`);
      });
    });

    describe('dynamic children', () => {
      it('unregisters child on unmount and keeps remaining items working', async () => {
        const showFirstItem = ref(true);
        const wrapper = mount({
          setup() {
            return () => (
              <SideBar defaultValue={0}>
                {showFirstItem.value && <SideBarItem value={0} label="选项一" />}
                <SideBarItem value={1} label="选项二" />
              </SideBar>
            );
          },
        });

        expect(wrapper.findAllComponents(SideBarItem)).toHaveLength(2);

        // 卸载子项时正常注销关系，剩余子项不受影响
        showFirstItem.value = false;
        await nextTick();
        expect(wrapper.findAllComponents(SideBarItem)).toHaveLength(1);
        expect(wrapper.findAll(`.${itemName}`)).toHaveLength(1);
        expect(wrapper.find(`.${itemName}`).text()).toBe('选项二');

        // 剩余子项仍可正常切换激活态
        await wrapper.find(`.${itemName}`).trigger('click');
        expect(wrapper.find(`.${itemName}`).classes()).toContain(`${itemName}--active`);
      });
    });

    describe('edge cases', () => {
      it('renders no active item when value matches nothing', () => {
        const wrapper = mount(
          <SideBar value="not-exist">
            <SideBarItem value="a" label="选项一" />
          </SideBar>,
        );

        expect(wrapper.find(`.${itemName}--active`).exists()).toBe(false);
        expect(wrapper.find(`.${itemName}__line`).exists()).toBe(false);
      });

      it('renders no active item when no value is given', () => {
        const wrapper = mount(
          <SideBar>
            <SideBarItem value="a" label="选项一" />
          </SideBar>,
        );

        expect(wrapper.find(`.${itemName}--active`).exists()).toBe(false);
      });
    });
  });
});

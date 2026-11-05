import { ref, nextTick } from 'vue';
import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Checkbox, { CheckboxGroup } from '../index';
import config from '../../config';

const { prefix } = config;
const name = `${prefix}-checkbox`;

describe('CheckboxGroup', () => {
  describe('props', () => {
    it('borderless[boolean]', () => {
      // 默认子选项带边框
      const wrapper = mount(() => (
        <CheckboxGroup>
          <Checkbox value="1" />
        </CheckboxGroup>
      ));
      expect(wrapper.find(`.${name}__border`).exists()).toBe(true);

      // 分组设置 borderless 后，子选项统一无边框
      const wrapper2 = mount(() => (
        <CheckboxGroup borderless>
          <Checkbox value="1" />
        </CheckboxGroup>
      ));
      expect(wrapper2.find(`.${name}__border`).exists()).toBe(false);
    });

    it.each(['vertical', 'horizontal'] as const)('direction[%s]', (direction) => {
      const wrapper = mount(CheckboxGroup, { props: { direction, options: ['选项一', '选项二'] } });
      expect(wrapper.classes()).toContain(`${name}-group--${direction}`);
      expect(wrapper.findAll(`.${name}--${direction}`)).toHaveLength(2);
    });

    it('disabled[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <CheckboxGroup disabled onChange={onChange}>
              <Checkbox value="1" ref="1" />
              <Checkbox value="2" ref="2" />
            </CheckboxGroup>
          );
        },
      });

      // 分组禁用后，子选项图标呈禁用态
      expect(wrapper.findComponent({ ref: '1' }).find(`.${name}__icon--disabled`).exists()).toBe(true);

      // 点击禁用子选项不切换选中态，也不触发 change
      await wrapper.findComponent({ ref: '1' }).find(`.${name}--left`).trigger('click');
      expect(wrapper.findComponent({ ref: '1' }).classes()).not.toContain(`${name}--checked`);
      expect(onChange).toHaveBeenCalledTimes(0);
    });

    it('keys[object]', async () => {
      const keysOptions = [
        { name: '选项一', val: '1' },
        { name: '选项二', val: '2', inactive: true },
      ];
      const keys = { value: 'val', label: 'name', disabled: 'inactive' };
      const onChange = vi.fn();
      const wrapper = mount(() => (
        <CheckboxGroup options={keysOptions} keys={keys} defaultValue={['1']} onChange={onChange} />
      ));

      const $checkboxs = wrapper.findAllComponents(Checkbox);
      expect($checkboxs).toHaveLength(2);
      // keys 别名解析 options 的 label/value，defaultValue 按 val 匹配选中
      expect(wrapper.text()).toContain('选项一');
      expect(wrapper.text()).toContain('选项二');
      expect($checkboxs[0].classes()).toContain(`${name}--checked`);
      expect($checkboxs[1].classes()).not.toContain(`${name}--checked`);
      expect($checkboxs[1].find(`.${name}__icon--disabled`).exists()).toBe(true);
      await $checkboxs[1].trigger('click');
      expect(onChange).not.toHaveBeenCalled();
    });

    it('max[number]', async () => {
      const checked = ref([]);
      const wrapper = mount({
        setup() {
          return () => (
            <CheckboxGroup v-model={checked.value} max={2}>
              <Checkbox value="1" ref="1" />
              <Checkbox value="2" ref="2" />
              <Checkbox value="3" ref="3" />
            </CheckboxGroup>
          );
        },
      });

      await wrapper.findComponent({ ref: '1' }).find(`.${name}--left`).trigger('click');

      expect(wrapper.findComponent({ ref: '1' }).classes()).toContain(`${name}--checked`);

      await wrapper.findComponent({ ref: '2' }).find(`.${name}--left`).trigger('click');

      expect(wrapper.findComponent({ ref: '2' }).classes()).toContain(`${name}--checked`);
      // 达到 max 后未选中项禁用
      expect(wrapper.findComponent({ ref: '3' }).find(`.${name}__icon--disabled`).exists()).toBe(true);
      await wrapper.findComponent({ ref: '3' }).trigger('click');
      expect(checked.value).toEqual(['1', '2']);

      await wrapper.findComponent({ ref: '1' }).trigger('click');
      expect(checked.value).toEqual(['2']);
      expect(wrapper.findComponent({ ref: '3' }).find(`.${name}__icon--disabled`).exists()).toBe(false);
      await wrapper.findComponent({ ref: '3' }).trigger('click');
      expect(checked.value).toEqual(['2', '3']);
    });

    // name 在 checkbox-group-props.ts 中声明（统一设置内部复选框 HTML 属性），但组件实现未读取该属性（未透传给子项），待组件支持后再补
    it.todo('name[string]');

    it('options[array]', () => {
      const primitives = mount(CheckboxGroup, { props: { options: ['北京', 1] } });
      expect(primitives.findAllComponents(Checkbox).map((item) => item.props('value'))).toEqual(['北京', 1]);
      expect(primitives.text()).toContain('北京');
      expect(primitives.text()).toContain('1');
      const defaultValue = ref(['1']);
      const options = [
        {
          label: '选项一',
          value: '1',
        },
        {
          label: '选项二',
          value: '2',
        },
      ];
      const wrapper = mount(() => <CheckboxGroup defaultValue={defaultValue.value} options={options} />);
      const $checkboxs = wrapper.findAllComponents(Checkbox);
      expect($checkboxs.length).toBe(2);
      expect($checkboxs[0].classes()).toContain(`${name}--checked`);
      expect($checkboxs[1].classes()).not.toContain(`${name}--checked`);
    });

    it('readonly[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <CheckboxGroup readonly onChange={onChange}>
              <Checkbox value="1" ref="1" />
            </CheckboxGroup>
          );
        },
      });

      // 分组只读后，点击子选项不切换选中态，也不触发 change
      await wrapper.findComponent({ ref: '1' }).find(`.${name}--left`).trigger('click');
      expect(wrapper.findComponent({ ref: '1' }).classes()).not.toContain(`${name}--checked`);
      expect(onChange).toHaveBeenCalledTimes(0);
    });

    it('value[array]', async () => {
      const wrapper = mount(CheckboxGroup, { props: { options: ['one', 'two'], value: ['one'] } });
      expect(wrapper.findAllComponents(Checkbox)[0].classes()).toContain(`${name}--checked`);
      await wrapper.setProps({ value: ['two'] });
      expect(wrapper.findAllComponents(Checkbox)[0].classes()).not.toContain(`${name}--checked`);
      expect(wrapper.findAllComponents(Checkbox)[1].classes()).toContain(`${name}--checked`);
    });

    it('modelValue[array]', async () => {
      const checked = ref<string[]>(['1']);
      const wrapper = mount({
        setup() {
          return () => (
            <CheckboxGroup v-model={checked.value}>
              <Checkbox value="1" ref="1" />
              <Checkbox value="2" ref="2" />
            </CheckboxGroup>
          );
        },
      });

      // 受控初值同步子项选中态
      expect(wrapper.findComponent({ ref: '1' }).classes()).toContain(`${name}--checked`);
      expect(wrapper.findComponent({ ref: '2' }).classes()).not.toContain(`${name}--checked`);

      // 外部更新受控值，子项选中态跟随变化
      checked.value = ['2'];
      await nextTick();
      expect(wrapper.findComponent({ ref: '1' }).classes()).not.toContain(`${name}--checked`);
      expect(wrapper.findComponent({ ref: '2' }).classes()).toContain(`${name}--checked`);
    });

    it('defaultValue[array]', async () => {
      const wrapper = mount(CheckboxGroup, { props: { options: ['one', 'two'], defaultValue: ['one'] } });
      const items = wrapper.findAllComponents(Checkbox);
      expect(items[0].classes()).toContain(`${name}--checked`);
      await items[1].trigger('click');
      expect(items[0].classes()).toContain(`${name}--checked`);
      expect(items[1].classes()).toContain(`${name}--checked`);
    });

    it('default[slot]', async () => {
      const wrapper = mount(CheckboxGroup, {
        slots: { default: () => <Checkbox value="one" label="插槽选项" /> },
      });
      const item = wrapper.findComponent(Checkbox);
      expect(item.text()).toBe('插槽选项');
      await item.trigger('click');
      expect(item.classes()).toContain(`${name}--checked`);
    });
  });

  describe('events', () => {
    it('change', async () => {
      const onChange = vi.fn();
      const checked = ref([]);
      const wrapper = mount({
        setup() {
          return () => (
            <CheckboxGroup v-model={checked.value} onChange={onChange}>
              <Checkbox value="1" ref="1" />
              <Checkbox value="2" ref="2" />
            </CheckboxGroup>
          );
        },
      });

      expect(checked.value.length).toBe(0);

      const target = wrapper.findComponent({ ref: '1' });
      await target.find(`.${name}--left`).trigger('click');

      expect(target.classes()).toContain(`${name}--checked`);
      expect(checked.value).toContain('1');

      await target.find(`.${name}--left`).trigger('click');

      expect(target.classes()).not.toContain(`${name}--checked`);
      expect(checked.value.length).toBe(0);
      expect(onChange).toHaveBeenNthCalledWith(1, ['1'], {
        e: expect.any(MouseEvent),
        current: '1',
        type: 'check',
      });
      expect(onChange).toHaveBeenNthCalledWith(2, [], {
        e: expect.any(MouseEvent),
        current: '1',
        type: 'uncheck',
      });
      expect(onChange).toHaveBeenCalledTimes(2);
    });
  });
});

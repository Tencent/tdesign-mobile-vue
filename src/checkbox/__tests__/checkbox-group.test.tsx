import { ref, nextTick } from 'vue';
import { vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Checkbox, { CheckboxGroup } from '../index';
import config from '../../config';

const { prefix } = config;
const name = `${prefix}-checkbox`;

describe('CheckboxGroup', () => {
  describe('props', () => {
    it('options[array]', () => {
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
      // expect($checkboxs[0].vm.isChecked).toBeTruthy();
      // expect($checkboxs[1].vm.isChecked).toBeFalsy();
    });

    // borderless/disabled/readonly 作用于整组选项的边框与交互，与子项联动验证
    it.todo('borderless[boolean]');
    it.todo('disabled[boolean]');
    it.todo('readonly[boolean]');
    // keys 自定义 options 字段别名
    it.todo('keys[object]');

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

      // expect(wrapper.findComponent({ ref: '1' }).vm.isChecked).toBe(true);

      await wrapper.findComponent({ ref: '2' }).find(`.${name}--left`).trigger('click');

      // expect(wrapper.findComponent({ ref: '2' }).vm.isChecked).toBe(true);
      // expect(wrapper.findComponent({ ref: '3' }).vm.isDisabled).toBe(true);
    });

    it('direction[vertical/horizontal]', () => {
      const wrapper = mount(() => (
        <CheckboxGroup>
          <Checkbox value="1" ref="1" />
          <Checkbox value="2" ref="2" />
        </CheckboxGroup>
      ));
      // 默认值为 vertical
      expect(wrapper.find(`.${name}-group--vertical`).exists()).toBe(true);
      expect(wrapper.find(`.${name}-group--horizontal`).exists()).toBe(false);
    });
  });

  describe('events', () => {
    it('change', async () => {
      const checked = ref([]);
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

      expect(checked.value.length).toBe(0);

      const target = wrapper.findComponent({ ref: '1' });
      await target.find(`.${name}--left`).trigger('click');

      // expect(wrapper.findComponent({ ref: '1' }).vm.isChecked).toBe(true);
      expect(checked.value).toContain('1');

      await target.find(`.${name}--left`).trigger('click');

      // expect(wrapper.findComponent({ ref: '1' }).vm.isChecked).toBe(false);
      expect(checked.value.length).toBe(0);
    });
  });

  describe('scenarios', () => {
    it('check all', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <CheckboxGroup default-value={[]}>
              <Checkbox value="1" ref="1" check-all />
              <Checkbox value="2" ref="2" />
              <Checkbox value="3" ref="3" />
            </CheckboxGroup>
          );
        },
      });

      await wrapper.findComponent({ ref: '1' }).find(`.${name}--left`).trigger('click');

      // expect(wrapper.findComponent({ ref: '2' }).vm.isChecked).toBe(true);
      // expect(wrapper.findComponent({ ref: '3' }).vm.isChecked).toBe(true);

      await wrapper.findComponent({ ref: '1' }).find(`.${name}--left`).trigger('click');

      // expect(wrapper.findComponent({ ref: '2' }).vm.isChecked).toBe(false);
      // expect(wrapper.findComponent({ ref: '3' }).vm.isChecked).toBe(false);
    });

    it('invalid value warns', async () => {
      const checked = ref('1');
      const wrapper = mount(() => (
        <CheckboxGroup v-model={checked}>
          <Checkbox value="1" />
          <Checkbox value="2" />
        </CheckboxGroup>
      ));
      const logSpy = vi.spyOn(global.console, 'warn');
      const target = wrapper.findAllComponents(Checkbox)[0];
      await target.trigger('click');
      // expect(logSpy).toHaveBeenCalled();
      expect(logSpy.mock.calls[0][0]).toContain('TDesign CheckboxGroup Warn');
      logSpy.mockRestore();
    });

    it('undefined option value', async () => {
      const defaultValue = ref([]);
      const options = [
        {
          label: '选项一',
          value: undefined,
        },
        {
          label: '选项二',
          value: '2',
        },
      ];
      const wrapper = mount(() => <CheckboxGroup defaultValue={defaultValue.value} options={options} />);
      const target = wrapper.findAllComponents(Checkbox)[0];
      await target.trigger('click');
      // expect(target.vm.isChecked).toBeFalsy();
    });

    it('direction changes dynamically', async () => {
      const direction = ref('vertical');
      const wrapper = mount(() => (
        <CheckboxGroup direction={direction.value}>
          <Checkbox value="1" ref="1" />
          <Checkbox value="2" ref="2" />
        </CheckboxGroup>
      ));
      // 初始为 vertical
      expect(wrapper.find(`.${name}-group--vertical`).exists()).toBe(true);
      expect(wrapper.find(`.${name}-group--horizontal`).exists()).toBe(false);
      expect(wrapper.findAll(`.${name}--horizontal`).length).toBe(0);

      // 动态切换为 horizontal
      direction.value = 'horizontal';
      await nextTick();
      expect(wrapper.find(`.${name}-group--horizontal`).exists()).toBe(true);
      expect(wrapper.find(`.${name}-group--vertical`).exists()).toBe(false);
      expect(wrapper.findAll(`.${name}--horizontal`).length).toBe(2);

      // 动态切换回 vertical
      direction.value = 'vertical';
      await nextTick();
      expect(wrapper.find(`.${name}-group--vertical`).exists()).toBe(true);
      expect(wrapper.find(`.${name}-group--horizontal`).exists()).toBe(false);
      expect(wrapper.findAll(`.${name}--horizontal`).length).toBe(0);
    });
  });
});

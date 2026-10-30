import { ref, nextTick } from 'vue';
import { vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Checkbox, { CheckboxGroup } from '../index';
import type { TdCheckboxGroupProps } from '../type';
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

    it('keys[object]', () => {
      const keysOptions = [
        { name: '选项一', val: '1' },
        { name: '选项二', val: '2' },
      ];
      const keys = { value: 'val', label: 'name' };
      const wrapper = mount(() => <CheckboxGroup options={keysOptions} keys={keys} defaultValue={['1']} />);

      const $checkboxs = wrapper.findAllComponents(Checkbox);
      expect($checkboxs).toHaveLength(2);
      // keys 别名解析 options 的 label/value，defaultValue 按 val 匹配选中
      expect(wrapper.text()).toContain('选项一');
      expect(wrapper.text()).toContain('选项二');
      expect($checkboxs[0].classes()).toContain(`${name}--checked`);
      expect($checkboxs[1].classes()).not.toContain(`${name}--checked`);
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
    });

    // name 在 checkbox-group-props.ts 中声明（统一设置内部复选框 HTML 属性），但组件实现未读取该属性（未透传给子项），待组件支持后再补
    it.todo('name[string]');

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

      expect(target.classes()).toContain(`${name}--checked`);
      expect(checked.value).toContain('1');

      await target.find(`.${name}--left`).trigger('click');

      expect(target.classes()).not.toContain(`${name}--checked`);
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

      expect(wrapper.findComponent({ ref: '1' }).classes()).toContain(`${name}--checked`);
      expect(wrapper.findComponent({ ref: '2' }).classes()).toContain(`${name}--checked`);
      expect(wrapper.findComponent({ ref: '3' }).classes()).toContain(`${name}--checked`);

      await wrapper.findComponent({ ref: '1' }).find(`.${name}--left`).trigger('click');

      expect(wrapper.findComponent({ ref: '1' }).classes()).not.toContain(`${name}--checked`);
      expect(wrapper.findComponent({ ref: '2' }).classes()).not.toContain(`${name}--checked`);
      expect(wrapper.findComponent({ ref: '3' }).classes()).not.toContain(`${name}--checked`);
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
      // value 为 undefined 的选项不走 group 受控通道，仅切换自身选中态
      expect(target.classes()).toContain(`${name}--checked`);
    });

    it('options 优先于 slot 渲染选项', () => {
      const wrapper = mount(() => (
        <CheckboxGroup options={[{ label: '选项一', value: '1' }]}>
          <Checkbox value="2" label="slot 选项" />
        </CheckboxGroup>
      ));
      expect(wrapper.findAllComponents(Checkbox).length).toBe(1);
      expect(wrapper.text()).toContain('选项一');
      expect(wrapper.text()).not.toContain('slot 选项');
    });

    it('slot 选项数量动态变化时同步', async () => {
      const showExtra = ref(false);
      const wrapper = mount({
        setup() {
          return () => (
            <CheckboxGroup>
              <Checkbox value="1" label="选项一" />
              {showExtra.value ? <Checkbox value="2" label="选项二" /> : null}
            </CheckboxGroup>
          );
        },
      });
      expect(wrapper.findAllComponents(Checkbox).length).toBe(1);

      showExtra.value = true;
      await nextTick();
      expect(wrapper.findAllComponents(Checkbox).length).toBe(2);

      showExtra.value = false;
      await nextTick();
      expect(wrapper.findAllComponents(Checkbox).length).toBe(1);
    });

    it('direction changes dynamically', async () => {
      const direction = ref<TdCheckboxGroupProps['direction']>('vertical');
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

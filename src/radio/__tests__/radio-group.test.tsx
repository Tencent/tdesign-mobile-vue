import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Radio from '../radio';
import RadioGroup from '../radio-group';
import type { TdRadioGroupProps } from '../type';

const prefix = 't';
const name = `${prefix}-radio`;

// icon 数组形式的类型为 Array<TNode>（渲染函数），组件把数组项直接作为子节点渲染，
// 通过自定义 toString 使渲染文本与字符串一致
const createIconText = (text: string) => {
  const icon = () => text;
  icon.toString = () => text;
  return icon;
};

describe('RadioGroup', () => {
  describe('props', () => {
    it('allowUncheck[boolean]', async () => {
      const value = ref('1');
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <RadioGroup v-model:value={value.value} allowUncheck onChange={onChange}>
              <Radio name="radio" value="1" label="选项一"></Radio>
              <Radio name="radio" value="2" label="选项二"></Radio>
            </RadioGroup>
          );
        },
      });
      const radios = wrapper.findAll(`.${name}`);
      expect(radios[0].find(`.${name}__icon--checked`).exists()).toBe(true);

      // 允许取消选中：点击选中项后整组清空
      await radios[0].trigger('click');
      expect(value.value).toBeUndefined();
      expect(onChange).toHaveBeenLastCalledWith(undefined, expect.anything());
      expect(wrapper.findAll(`.${name}__icon--checked`)).toHaveLength(0);

      // 默认不允许取消：再次点击选中项保持不变
      const value2 = ref('1');
      const wrapper2 = mount({
        setup() {
          return () => (
            <RadioGroup v-model:value={value2.value}>
              <Radio name="radio" value="1" label="选项一"></Radio>
            </RadioGroup>
          );
        },
      });
      await wrapper2.findAll(`.${name}`)[0].trigger('click');
      expect(value2.value).toBe('1');
      expect(wrapper2.findAll(`.${name}__icon--checked`)).toHaveLength(1);
    });

    it('borderless[boolean]', () => {
      // 无边框模式作用于整组子项
      const wrapper = mount(() => (
        <RadioGroup borderless>
          <Radio name="radio" value="1" label="单选"></Radio>
          <Radio name="radio" value="2" label="单选"></Radio>
        </RadioGroup>
      ));
      expect(wrapper.findAll(`.${name}__border`)).toHaveLength(0);

      // 默认渲染子项边框
      const wrapper2 = mount(() => (
        <RadioGroup>
          <Radio name="radio" value="1" label="单选"></Radio>
        </RadioGroup>
      ));
      expect(wrapper2.findAll(`.${name}__border`)).toHaveLength(1);
    });

    it('direction[vertical/horizontal]', () => {
      const wrapper = mount(() => (
        <RadioGroup>
          <Radio name="radio" value="1" label="单选"></Radio>
          <Radio name="radio" value="2" label="单选"></Radio>
        </RadioGroup>
      ));
      // 默认值为 vertical
      expect(wrapper.find(`.${name}-group--vertical`).exists()).toBe(true);
      expect(wrapper.find(`.${name}-group--horizontal`).exists()).toBe(false);
    });

    it('disabled[boolean]', async () => {
      const value = ref('1');
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <RadioGroup v-model:value={value.value} disabled onChange={onChange}>
              <Radio name="radio" value="1" label="选项一"></Radio>
              <Radio name="radio" value="2" label="选项二"></Radio>
            </RadioGroup>
          );
        },
      });

      // 整组禁用后子项图标呈禁用态
      expect(wrapper.findAll(`.${name}__icon--disabled`)).toHaveLength(2);

      // 点击禁用子项不切换选中值，也不触发 change
      await wrapper.findAll(`.${name}`)[1].trigger('click');
      expect(value.value).toBe('1');
      expect(onChange).toHaveBeenCalledTimes(0);
      expect(wrapper.findAll(`.${name}__icon--checked`)).toHaveLength(1);
    });

    it('icon[string]', () => {
      const wrapper = mount(() => (
        <RadioGroup
          value="1"
          icon="dot"
          options={[
            { label: '选项一', value: '1' },
            { label: '选项二', value: '2' },
          ]}
        />
      ));
      const icons = wrapper.findAll(`.${name}__icon`);
      // 分组 icon 透传给 options 渲染的子项：选中项渲染圆点图标，未选中项渲染空心圆
      expect(icons[0].find(`.${name}__icon-dot`).exists()).toBe(true);
      expect(icons[1].find(`.${name}__icon-circle`).exists()).toBe(true);
    });

    it('icon[array]', () => {
      const icon: TdRadioGroupProps['icon'] = [createIconText('已选图标'), createIconText('未选图标')];
      const wrapper = mount(() => (
        <RadioGroup
          value="1"
          icon={icon}
          options={[
            { label: '选项一', value: '1' },
            { label: '选项二', value: '2' },
          ]}
        />
      ));
      const icons = wrapper.findAll(`.${name}__icon`);
      // 数组按 [选中图标, 非选中图标] 分别渲染
      expect(icons[0].text()).toContain('已选图标');
      expect(icons[1].text()).toContain('未选图标');
    });

    it('keys[object]', async () => {
      const wrapper = mount(RadioGroup, {
        props: {
          options: [
            {
              name: '单选',
              data: '1',
              disabled: true,
            },
            {
              name: '单选',
              data: '2',
            },
          ],
          keys: {
            value: 'data',
            label: 'name',
          },
        },
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('name[string]', () => {
      const wrapper = mount(() => (
        <RadioGroup name="group-name">
          <Radio name="radio" value="1" label="选项一"></Radio>
          <Radio name="radio" value="2" label="选项二"></Radio>
        </RadioGroup>
      ));
      const inputs = wrapper.findAll('input');
      expect(inputs).toHaveLength(2);
      // 分组 name 优先于子项 name，透传到原生 input
      inputs.forEach((input) => {
        expect(input.attributes('name')).toBe('group-name');
      });
    });

    it('options[array]', () => {
      const wrapper = mount(() => (
        <RadioGroup
          options={[
            { label: '选项一', value: '1' },
            { label: '选项二', value: '2' },
          ]}
          defaultValue="1"
        />
      ));
      const radios = wrapper.findAllComponents(Radio);
      expect(radios).toHaveLength(2);
      expect(wrapper.text()).toContain('选项一');
      expect(wrapper.text()).toContain('选项二');
      // options 渲染的子 Radio 按 defaultValue 匹配选中态
      expect(radios[0].find(`.${name}__icon--checked`).exists()).toBe(true);
      expect(radios[1].find(`.${name}__icon--checked`).exists()).toBe(false);
    });

    it('placement[left/right]', () => {
      const wrapper = mount(() => (
        <RadioGroup placement="right">
          <Radio name="radio" value="1" label="选项一"></Radio>
          <Radio name="radio" value="2" label="选项二"></Radio>
        </RadioGroup>
      ));
      const radios = wrapper.findAll(`.${name}`);
      // 分组 placement 低于子项 placement，未单独设置时子项跟随分组
      radios.forEach((radio) => {
        expect(radio.classes()).toContain(`${name}--right`);
      });
      expect(radios[0].find(`.${name}__icon--right`).exists()).toBe(true);
    });

    it('readonly[boolean]', async () => {
      const value = ref('1');
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <RadioGroup v-model:value={value.value} readonly onChange={onChange}>
              <Radio name="radio" value="1" label="单选"></Radio>
              <Radio name="radio" value="2" label="单选"></Radio>
            </RadioGroup>
          );
        },
      });

      // 整组只读时点击任意选项不切换选中值
      await wrapper.findAll(`.${name}`)[1].trigger('click');
      expect(value.value).toBe('1');
      expect(onChange).not.toHaveBeenCalled();
      // 选中态图标仍停留在原选中项
      expect(wrapper.findAll(`.${name}__icon--checked`)).toHaveLength(1);
      expect(wrapper.findAll(`.${name}`)[0].find(`.${name}__icon--checked`).exists()).toBe(true);
    });

    it('modelValue[string]', async () => {
      const value = ref('1');
      const wrapper = mount({
        setup() {
          return () => (
            <RadioGroup v-model={value.value}>
              <Radio name="radio" value="1" label="选项一"></Radio>
              <Radio name="radio" value="2" label="选项二"></Radio>
            </RadioGroup>
          );
        },
      });
      const radios = wrapper.findAll(`.${name}`);
      expect(radios[0].find(`.${name}__icon--checked`).exists()).toBe(true);

      // v-model 双向绑定：点击子项后选中值与选中态同步切换
      await radios[1].trigger('click');
      expect(value.value).toBe('2');
      expect(radios[1].find(`.${name}__icon--checked`).exists()).toBe(true);
      expect(radios[0].find(`.${name}__icon--checked`).exists()).toBe(false);

      // 外部修改 v-model 值，选中项跟随
      value.value = '1';
      await nextTick();
      expect(radios[0].find(`.${name}__icon--checked`).exists()).toBe(true);
      expect(radios[1].find(`.${name}__icon--checked`).exists()).toBe(false);
    });
  });

  describe('events', () => {
    it('change', async () => {
      const radio = ref('3');
      const wrapper = mount(() => (
        <RadioGroup v-model:value={radio.value} allowUncheck>
          <Radio name="radio" value="1" label="单选"></Radio>
          <Radio name="radio" value="2" label="单选"></Radio>
          <Radio name="radio" value="3" label="单选"></Radio>
        </RadioGroup>
      ));
      const [radio1, radio2] = wrapper.findAllComponents(`.${name}`);
      // expect(radio1.vm.checked).toBeTruthy();
      await radio1.trigger('click');
      expect(radio.value).toBe('1');
      // tsx vm
      // expect(radio2.vm.checked).toBeTruthy();
      await radio2.trigger('click');
      expect(radio.value).toBe('2');

      // tsx vm
      const radioContent = wrapper.find(`.${name}__content`);
      await radioContent.trigger('click');
      expect(radio.value).toBe('1');
      // expect(radio1.vm.checked).toBeTruthy();
    });
  });

  describe('scenarios', () => {
    it('direction changes dynamically', async () => {
      const direction = ref<TdRadioGroupProps['direction']>('vertical');
      const wrapper = mount(() => (
        <RadioGroup direction={direction.value}>
          <Radio name="radio" value="1" label="单选"></Radio>
          <Radio name="radio" value="2" label="单选"></Radio>
        </RadioGroup>
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

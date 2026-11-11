import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Radio from '../radio';
import RadioGroup from '../radio-group';
import type { TdRadioGroupProps } from '../type';
import config from '../../config';

const { prefix } = config;
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

    it.each(['vertical', 'horizontal'] as const)('direction[%s]', (direction) => {
      const wrapper = mount(RadioGroup, { props: { direction, options: ['选项一', '选项二'] } });
      expect(wrapper.classes()).toContain(`${name}-group--${direction}`);
      expect(wrapper.findAll(`.${name}--${direction}`)).toHaveLength(2);
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

      // 整组禁用后子项图标呈禁用态，原生 input 同步禁用
      expect(wrapper.findAll(`.${name}__icon--disabled`)).toHaveLength(2);
      expect(wrapper.findAll('input')[0].attributes('disabled')).toBeDefined();

      // 点击禁用子项不切换选中值，也不触发 change
      await wrapper.findAll(`.${name}`)[1].trigger('click');
      expect(value.value).toBe('1');
      expect(onChange).toHaveBeenCalledTimes(0);
      expect(wrapper.findAll(`.${name}__icon--checked`)).toHaveLength(1);
    });

    it.each(['circle', 'line', 'dot'] as const)('icon[%s]', async (icon) => {
      const options: TdRadioGroupProps['options'] = [
        { label: '选项一', value: '1' },
        { label: '选项二', value: '2' },
      ];
      const wrapper = mount(RadioGroup, {
        props: {
          defaultValue: '1',
          icon,
          options,
        },
      });

      const icons = wrapper.findAll(`.${name}__icon`);
      const selected = icons[0];
      const unselected = icons[1];
      if (icon === 'circle') {
        expect(selected.find('.t-icon-check-1').exists()).toBe(true);
        expect(selected.find(`.${name}__icon-circle--checked`).exists()).toBe(true);
        expect(unselected.find(`.${name}__icon-circle`).exists()).toBe(true);
      } else if (icon === 'line') {
        expect(selected.find('.t-icon-check').exists()).toBe(true);
        expect(unselected.find(`.${name}__icon-line`).exists()).toBe(true);
      } else if (icon === 'dot') {
        expect(selected.find(`.${name}__icon-dot--checked`).exists()).toBe(true);
        expect(selected.find(`.${name}__icon-dot-inner`).exists()).toBe(true);
        expect(unselected.find(`.${name}__icon-dot`).exists()).toBe(true);
        expect(unselected.find(`.${name}__icon-dot-inner`).exists()).toBe(false);
      }
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
      const value = ref('1');
      const onChange = vi.fn();
      // 通过 keys 定义 value/label/disabled 字段别名；别名后字段与 RadioOptionObj 声明不同，需经 unknown 断言
      const aliasOptions = [
        { name: '选项一', data: '1', inactive: true },
        { name: '选项二', data: '2' },
      ] as unknown as TdRadioGroupProps['options'];
      const wrapper = mount({
        setup() {
          return () => (
            <RadioGroup
              v-model:value={value.value}
              keys={{ value: 'data', label: 'name', disabled: 'inactive' }}
              options={aliasOptions}
              onChange={onChange}
            />
          );
        },
      });

      const radios = wrapper.findAllComponents(Radio);
      expect(radios).toHaveLength(2);
      // keys 别名解析 options 的 label/value：label 渲染、value 匹配选中
      expect(radios[0].text()).toContain('选项一');
      expect(radios[1].text()).toContain('选项二');
      expect(radios[0].find(`.${name}__icon--checked`).exists()).toBe(true);
      expect(radios[1].find(`.${name}__icon--checked`).exists()).toBe(false);

      // keys.disabled 别名解析禁用态：禁用项点击无效
      expect(radios[0].find(`.${name}__icon--disabled`).exists()).toBe(true);
      await radios[0].trigger('click');
      expect(onChange).not.toHaveBeenCalled();
      expect(value.value).toBe('1');

      // 未禁用项点击正常切换选中值
      await radios[1].trigger('click');
      expect(value.value).toBe('2');
      expect(onChange).toHaveBeenCalledWith('2', expect.objectContaining({ e: expect.any(MouseEvent) }));
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
      // string / number 数据项表示 label 与 value 相同
      const primitives = mount(RadioGroup, {
        props: { options: ['北京', 1] },
      });
      const primitiveRadios = primitives.findAllComponents(Radio);
      expect(primitiveRadios).toHaveLength(2);
      expect(primitiveRadios.map((item) => item.props('value'))).toEqual(['北京', 1]);
      expect(primitives.text()).toContain('北京');
      expect(primitives.text()).toContain('1');

      // 对象数据项按 label / value 渲染并匹配选中态
      const wrapper = mount(RadioGroup, {
        props: {
          options: [
            { label: '选项一', value: '1' },
            { label: '选项二', value: '2' },
          ],
          defaultValue: '1',
        },
      });
      const radios = wrapper.findAllComponents(Radio);
      expect(radios).toHaveLength(2);
      expect(wrapper.text()).toContain('选项一');
      expect(wrapper.text()).toContain('选项二');
      expect(radios[0].find(`.${name}__icon--checked`).exists()).toBe(true);
      expect(radios[1].find(`.${name}__icon--checked`).exists()).toBe(false);
    });

    it.each(['left', 'right'] as const)('placement[%s]', (placement) => {
      const wrapper = mount(() => (
        <RadioGroup placement={placement}>
          <Radio name="radio" value="1" label="选项一" />
          <Radio name="radio" value="2" label="选项二" />
        </RadioGroup>
      ));
      const radios = wrapper.findAll(`.${name}`);
      radios.forEach((radio) => {
        expect(radio.classes()).toContain(`${name}--${placement}`);
      });
      expect(radios[0].find(`.${name}__icon--${placement}`).exists()).toBe(true);
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

    it('value[string]', async () => {
      const value = ref('选项一');
      const wrapper = mount({
        setup() {
          return () => <RadioGroup v-model:value={value.value} options={['选项一', '选项二']} />;
        },
      });
      const radios = wrapper.findAll(`.${name}`);
      expect(radios[0].find(`.${name}__icon--checked`).exists()).toBe(true);

      // v-model:value 双向绑定：点击子项后选中值与选中态同步切换
      await radios[1].trigger('click');
      expect(value.value).toBe('选项二');
      expect(radios[1].find(`.${name}__icon--checked`).exists()).toBe(true);
      expect(radios[0].find(`.${name}__icon--checked`).exists()).toBe(false);

      // 外部修改受控值，选中项跟随
      value.value = '选项一';
      await nextTick();
      expect(radios[0].find(`.${name}__icon--checked`).exists()).toBe(true);
      expect(radios[1].find(`.${name}__icon--checked`).exists()).toBe(false);
    });

    it('value[number]', async () => {
      const wrapper = mount(RadioGroup, {
        props: {
          value: 2,
          options: [1, 2, 3],
        },
      });
      let radios = wrapper.findAll(`.${name}`);
      expect(radios[1].find(`.${name}__icon--checked`).exists()).toBe(true);

      // 受控模式：点击触发 update:value，未接收新值前选中态保持
      await radios[0].trigger('click');
      expect(wrapper.emitted('update:value')).toEqual([[1, expect.objectContaining({ e: expect.any(MouseEvent) })]]);
      expect(radios[1].find(`.${name}__icon--checked`).exists()).toBe(true);

      // 外部更新受控值，选中项跟随
      await wrapper.setProps({ value: 1 });
      radios = wrapper.findAll(`.${name}`);
      expect(radios[0].find(`.${name}__icon--checked`).exists()).toBe(true);
      expect(radios[1].find(`.${name}__icon--checked`).exists()).toBe(false);
    });

    it('value[boolean]', async () => {
      const value = ref(true);
      const wrapper = mount({
        setup() {
          return () => (
            <RadioGroup
              v-model:value={value.value}
              options={[
                { label: '是', value: true },
                { label: '否', value: false },
              ]}
            />
          );
        },
      });
      const radios = wrapper.findAll(`.${name}`);
      expect(radios[0].find(`.${name}__icon--checked`).exists()).toBe(true);

      // 点击未选中项后，布尔值选中态切换
      await radios[1].trigger('click');
      expect(value.value).toBe(false);
      expect(radios[1].find(`.${name}__icon--checked`).exists()).toBe(true);
      expect(radios[0].find(`.${name}__icon--checked`).exists()).toBe(false);
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

    it('modelValue[number]', async () => {
      const value = ref(1);
      const wrapper = mount({
        setup() {
          return () => <RadioGroup v-model={value.value} options={[1, 2]} />;
        },
      });
      const radios = wrapper.findAll(`.${name}`);
      expect(radios[0].find(`.${name}__icon--checked`).exists()).toBe(true);

      await radios[1].trigger('click');
      expect(value.value).toBe(2);
      expect(radios[1].find(`.${name}__icon--checked`).exists()).toBe(true);
      expect(radios[0].find(`.${name}__icon--checked`).exists()).toBe(false);
    });

    it('modelValue[boolean]', async () => {
      const value = ref(true);
      const wrapper = mount({
        setup() {
          return () => (
            <RadioGroup
              v-model={value.value}
              options={[
                { label: '是', value: true },
                { label: '否', value: false },
              ]}
            />
          );
        },
      });
      const radios = wrapper.findAll(`.${name}`);
      expect(radios[0].find(`.${name}__icon--checked`).exists()).toBe(true);

      await radios[1].trigger('click');
      expect(value.value).toBe(false);
      expect(radios[1].find(`.${name}__icon--checked`).exists()).toBe(true);
    });

    it('defaultValue[string]', async () => {
      const wrapper = mount(RadioGroup, {
        props: {
          defaultValue: '1',
          options: [
            { label: '选项一', value: '1' },
            { label: '选项二', value: '2' },
          ],
        },
      });
      let radios = wrapper.findAll(`.${name}`);
      expect(radios[0].find(`.${name}__icon--checked`).exists()).toBe(true);

      // 非受控模式：点击后内部选中值切换并保持
      await radios[1].trigger('click');
      radios = wrapper.findAll(`.${name}`);
      expect(radios[1].find(`.${name}__icon--checked`).exists()).toBe(true);
      expect(radios[0].find(`.${name}__icon--checked`).exists()).toBe(false);
    });

    it('defaultValue[number]', async () => {
      const wrapper = mount(RadioGroup, {
        props: {
          defaultValue: 1,
          options: [1, 2],
        },
      });
      let radios = wrapper.findAll(`.${name}`);
      expect(radios[0].find(`.${name}__icon--checked`).exists()).toBe(true);

      await radios[1].trigger('click');
      radios = wrapper.findAll(`.${name}`);
      expect(radios[1].find(`.${name}__icon--checked`).exists()).toBe(true);
      expect(radios[0].find(`.${name}__icon--checked`).exists()).toBe(false);
    });

    it('defaultValue[boolean]', async () => {
      const wrapper = mount(RadioGroup, {
        props: {
          defaultValue: true,
          options: [
            { label: '是', value: true },
            { label: '否', value: false },
          ],
        },
      });
      let radios = wrapper.findAll(`.${name}`);
      expect(radios[0].find(`.${name}__icon--checked`).exists()).toBe(true);

      await radios[1].trigger('click');
      radios = wrapper.findAll(`.${name}`);
      expect(radios[1].find(`.${name}__icon--checked`).exists()).toBe(true);
      expect(radios[0].find(`.${name}__icon--checked`).exists()).toBe(false);
    });

    it('default[slot]', async () => {
      const wrapper = mount(RadioGroup, {
        slots: { default: () => <Radio value="one" label="插槽选项" /> },
      });
      const item = wrapper.findComponent(Radio);
      expect(item.text()).toContain('插槽选项');
      await item.trigger('click');
      expect(item.find(`.${name}__icon--checked`).exists()).toBe(true);
    });
  });

  describe('events', () => {
    it('change', async () => {
      const radio = ref('3');
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <RadioGroup
              v-model:value={radio.value}
              name="group-name"
              options={[
                { label: '选项一', value: '1' },
                { label: '选项二', value: '2' },
                { label: '选项三', value: '3' },
              ]}
              onChange={onChange}
            />
          );
        },
      });
      const radios = wrapper.findAll(`.${name}`);

      // 点击子项触发 change，context.name 为分组 name
      await radios[0].trigger('click');
      expect(radio.value).toBe('1');
      expect(onChange).toHaveBeenNthCalledWith(1, '1', { e: expect.any(MouseEvent), name: 'group-name' });

      // 点击内容区域同样触发选中与 change
      await radios[1].find(`.${name}__content`).trigger('click');
      expect(radio.value).toBe('2');
      expect(onChange).toHaveBeenNthCalledWith(2, '2', { e: expect.any(MouseEvent), name: 'group-name' });
      expect(onChange).toHaveBeenCalledTimes(2);
    });
  });
});

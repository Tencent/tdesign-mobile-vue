import { mount } from '@vue/test-utils';
import { ref, nextTick } from 'vue';
import { describe, it, expect, vi } from 'vitest';
import Checkbox, { CheckboxGroup } from '../index';
import config from '../../config';

const { prefix } = config;
const name = `${prefix}-checkbox`;

describe('Checkbox', () => {
  describe('props', () => {
    it('block[boolean]', async () => {
      const wrapper = mount(Checkbox, { slots: { default: '选项' } });
      expect(wrapper.classes()).toContain('t-checkbox--block');
      await wrapper.setProps({ block: false });
      expect(wrapper.classes()).not.toContain('t-checkbox--block');
    });

    it('borderless[boolean]', async () => {
      const wrapper = mount(() => <Checkbox>选项</Checkbox>);
      expect(wrapper.find('.t-checkbox__border').exists()).toBeTruthy();

      const wrapper2 = mount(() => <Checkbox borderless>选项</Checkbox>);
      expect(wrapper2.find('.t-checkbox__border').exists()).toBeFalsy();
    });

    it('checkAll[boolean]', async () => {
      // checkAll 单独使用无效，需在 CheckboxGroup 中使用；不走 .vm，用 DOM 类名断言全选联动
      const wrapper = mount(() => (
        <CheckboxGroup>
          <Checkbox checkAll label="全选" />
          <Checkbox value="1" label="选项一" />
          <Checkbox value="2" label="选项二" />
        </CheckboxGroup>
      ));
      const $checkboxes = wrapper.findAll(`.${name}`);
      expect($checkboxes).toHaveLength(3);
      // 初始全部未选中
      $checkboxes.forEach((item) => {
        expect(item.classes()).not.toContain(`${name}--checked`);
      });

      // 点击全选选项，选中所有子选项
      await $checkboxes[0].trigger('click');
      $checkboxes.forEach((item) => {
        expect(item.classes()).toContain(`${name}--checked`);
      });

      // 取消一个子选项后，全选选项变为半选态
      await $checkboxes[2].trigger('click');
      expect($checkboxes[2].classes()).not.toContain(`${name}--checked`);
      expect($checkboxes[1].classes()).toContain(`${name}--checked`);
      expect($checkboxes[0].find('.t-icon-minus-circle-filled').exists()).toBe(true);

      // 半选态再次点击全选选项，清空所有选中
      await $checkboxes[0].trigger('click');
      $checkboxes.forEach((item) => {
        expect(item.classes()).not.toContain(`${name}--checked`);
      });
    });

    it('checked[boolean]', async () => {
      const checked = ref(false);
      const wrapper = mount({
        setup() {
          return () => <Checkbox v-model:checked={checked.value}>选项</Checkbox>;
        },
      });

      // 初始受控值 false，未选中
      expect(wrapper.classes()).not.toContain(`${name}--checked`);

      // 点击触发 update:checked，受控值更新后选中态同步
      await wrapper.find(`.${name}`).trigger('click');
      expect(checked.value).toBe(true);
      await nextTick();
      expect(wrapper.classes()).toContain(`${name}--checked`);

      // 外部回改受控值，选中态跟随
      checked.value = false;
      await nextTick();
      expect(wrapper.classes()).not.toContain(`${name}--checked`);
    });

    it('modelValue[boolean]', async () => {
      const wrapper = mount(Checkbox, { props: { modelValue: false } });
      await wrapper.trigger('click');
      expect(wrapper.emitted('update:modelValue')).toEqual([[true, { e: expect.any(MouseEvent) }]]);
      expect(wrapper.classes()).not.toContain(`${name}--checked`);
      await wrapper.setProps({ modelValue: true });
      expect(wrapper.classes()).toContain(`${name}--checked`);
    });

    it('defaultChecked[boolean]', async () => {
      const wrapper = mount(Checkbox, { props: { defaultChecked: true } });
      expect(wrapper.classes()).toContain('t-checkbox--checked');
      await wrapper.trigger('click');
      expect(wrapper.classes()).not.toContain('t-checkbox--checked');
      await wrapper.trigger('click');
      expect(wrapper.classes()).toContain('t-checkbox--checked');
    });

    it('content[string]', () => {
      const wrapper = mount(Checkbox, { props: { content: '描述内容' } });
      expect(wrapper.find(`.${name}__description`).text()).toBe('描述内容');
    });

    it('content[function]', async () => {
      const wrapper = mount(() => <Checkbox content={() => <div class="checkbox-desc">描述内容</div>}>选项</Checkbox>);
      expect(wrapper.find('.checkbox-desc').exists()).toBeTruthy();
    });

    it('content[slot]', () => {
      const wrapper = mount(Checkbox, { slots: { content: () => <span>插槽描述</span> } });
      expect(wrapper.find(`.${name}__description`).text()).toBe('插槽描述');
    });

    it('contentDisabled[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(() => (
        <Checkbox contentDisabled onChange={onChange}>
          选项
        </Checkbox>
      ));
      // 点击内容区域不触发选中
      await wrapper.find(`.${name}__content`).trigger('click');
      expect(wrapper.classes()).not.toContain(`${name}--checked`);
      expect(onChange).toHaveBeenCalledTimes(0);

      // 图标区域仍可正常选中。
      await wrapper.find(`.${name}__icon`).trigger('click');
      expect(wrapper.classes()).toContain(`${name}--checked`);
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('default[string]', () => {
      const wrapper = mount(Checkbox, { props: { default: '别名主文案' } });
      expect(wrapper.find(`.${name}__title`).text()).toBe('别名主文案');
    });

    it('default[function]', () => {
      const wrapper = mount(Checkbox, { props: { default: () => <span>函数别名主文案</span> } });
      expect(wrapper.find(`.${name}__title`).text()).toBe('函数别名主文案');
    });

    it('default[slot]', () => {
      const wrapper = mount(Checkbox, { slots: { default: () => <span>默认主文案</span> } });
      expect(wrapper.find(`.${name}__title`).text()).toBe('默认主文案');
    });

    it('disabled[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Checkbox, { props: { disabled: true, onChange } });

      // 禁用态：图标与主文案带禁用修饰类
      expect(wrapper.find(`.${name}__icon--disabled`).exists()).toBe(true);
      expect(wrapper.find(`.${name}__title--disabled`).exists()).toBe(true);

      // 点击不切换选中态，也不触发 change
      await wrapper.find(`.${name}`).trigger('click');
      expect(wrapper.classes()).not.toContain(`${name}--checked`);
      expect(onChange).toHaveBeenCalledTimes(0);
      await wrapper.setProps({ disabled: false });
      await wrapper.trigger('click');
      expect(wrapper.classes()).toContain(`${name}--checked`);
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('icon[boolean]', async () => {
      const wrapper = mount(Checkbox, { props: { icon: false } });
      expect(wrapper.find(`.${name}__icon`).exists()).toBe(false);
      await wrapper.setProps({ icon: true });
      expect(wrapper.find(`.${name}__icon-circle`).exists()).toBe(true);
      await wrapper.trigger('click');
      expect(wrapper.find('.t-icon-check-circle-filled').exists()).toBe(true);
    });

    it('icon[circle]', async () => {
      const wrapper = mount(Checkbox, { props: { icon: 'circle' } });
      expect(wrapper.find(`.${name}__icon-circle`).exists()).toBe(true);
      await wrapper.trigger('click');
      expect(wrapper.find('.t-icon-check-circle-filled').exists()).toBe(true);
    });

    it('icon[array]', async () => {
      const activeImage = 'https://tdesign.gtimg.com/miniprogram/checkbox-checked.png';
      const inActiveImage = 'https://tdesign.gtimg.com/miniprogram/checkbox.png';
      const wrapper = mount(() => <Checkbox icon={[activeImage, inActiveImage]} />);
      expect(wrapper.find(`.${name}__icon-image`).attributes('src')).toBe(inActiveImage);
      await wrapper.trigger('click');
      expect(wrapper.find(`.${name}__icon-image`).attributes('src')).toBe(activeImage);
    });

    // 类型允许 TNode 数组，但 render-tnode.ts 直接返回 content，不执行其中的函数。
    it.todo('icon[function-array]');

    it('icon[incomplete-array]', async () => {
      const wrapper = mount(() => <Checkbox icon={['']} />);
      expect(wrapper.find('.t-icon-circle').exists()).toBe(true);
      await wrapper.trigger('click');
      expect(wrapper.find('.t-icon-check-circle-filled').exists()).toBe(true);
    });

    it('icon[rectangle]', async () => {
      const wrapper = mount(() => <Checkbox icon="rectangle" />);
      expect(wrapper.find(`.${name}__icon-rectangle`).exists()).toBe(true);
      await wrapper.trigger('click');
      expect(wrapper.find('.t-icon-check-rectangle-filled').exists()).toBe(true);
    });

    it('icon[line]', async () => {
      const wrapper = mount(() => <Checkbox icon="line" />);
      expect(wrapper.find(`.${name}__icon .placeholder`).exists()).toBe(true);
      await wrapper.trigger('click');
      expect(wrapper.find('.t-icon-check').exists()).toBe(true);
    });

    it('indeterminate[boolean]', async () => {
      const wrapper = mount(() => <Checkbox indeterminate>选项</Checkbox>);
      await wrapper.trigger('click');
      expect(wrapper.find('.t-icon-minus-circle-filled').exists()).toBe(true);
    });

    it('label[string]', async () => {
      const wrapper = mount(() => <Checkbox label="主文案" />);
      expect(wrapper.find(`.${name}__title`).text()).toBe('主文案');
    });

    it('label[function]', async () => {
      const wrapper = mount(() => <Checkbox label={() => <span class="custom-label">函数主文案</span>} />);
      expect(wrapper.find('.custom-label').text()).toBe('函数主文案');
    });

    it('label[slot]', () => {
      const wrapper = mount(Checkbox, { slots: { label: () => <span>插槽主文案</span> } });
      expect(wrapper.find(`.${name}__title`).text()).toBe('插槽主文案');
    });

    // -webkit-line-clamp 依赖 webkit 私有样式，jsdom/cssstyle 会丢弃该样式，无法断言行数
    it.todo('maxContentRow[number]');

    // -webkit-line-clamp 依赖 webkit 私有样式，jsdom/cssstyle 会丢弃该样式，无法断言行数
    it.todo('maxLabelRow[number]');

    // name 在 props.ts 中声明（HTML 元素原生属性），但组件实现未读取该属性（无输入类元素可透传），待组件支持后再补
    it.todo('name[string]');

    it('placement[right]', async () => {
      const wrapper = mount(() => <Checkbox placement="right">选项</Checkbox>);
      expect(wrapper.classes()).toContain(`${name}--right`);
    });

    it('placement[default]', async () => {
      const wrapper = mount(() => <Checkbox>选项</Checkbox>);
      expect(wrapper.classes()).toContain(`${name}--left`);
    });

    it('readonly[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Checkbox, { props: { readonly: true, onChange } });
      // 只读状态下点击不切换选中态，也不触发 change
      await wrapper.find(`.${name}`).trigger('click');
      expect(wrapper.classes()).not.toContain(`${name}--checked`);
      expect(onChange).toHaveBeenCalledTimes(0);
      await wrapper.setProps({ readonly: false });
      await wrapper.trigger('click');
      expect(wrapper.classes()).toContain(`${name}--checked`);
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('value[string]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(() => (
        <CheckboxGroup onChange={onChange}>
          <Checkbox value="one" />
        </CheckboxGroup>
      ));
      await wrapper.findComponent(Checkbox).trigger('click');
      expect(onChange).toHaveBeenCalledWith(['one'], expect.objectContaining({ current: 'one' }));
    });

    it('value[number]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(() => (
        <CheckboxGroup onChange={onChange}>
          <Checkbox value={1} />
        </CheckboxGroup>
      ));
      await wrapper.findComponent(Checkbox).trigger('click');
      expect(onChange).toHaveBeenCalledWith([1], expect.objectContaining({ current: 1 }));
    });

    it('value[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(() => (
        <CheckboxGroup onChange={onChange}>
          <Checkbox value={false} />
        </CheckboxGroup>
      ));
      await wrapper.findComponent(Checkbox).trigger('click');
      expect(onChange).toHaveBeenCalledWith([false], expect.objectContaining({ current: false }));
    });
  });

  describe('events', () => {
    it('change', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Checkbox, { props: { onChange } });
      await wrapper.trigger('click');
      expect(onChange).toHaveBeenNthCalledWith(1, true, { e: expect.any(MouseEvent) });
      await wrapper.trigger('click');
      expect(onChange).toHaveBeenNthCalledWith(2, false, { e: expect.any(MouseEvent) });
      expect(onChange).toHaveBeenCalledTimes(2);
    });
  });

  describe('scenarios', () => {
    it('explicit disabled overrides group and form disabled states', async () => {
      const onChange = vi.fn();
      const wrapper = mount(CheckboxGroup, {
        props: { disabled: true, onChange },
        global: { provide: { formDisabled: { disabled: ref(true) } } },
        slots: { default: () => <Checkbox value="one" disabled={false} /> },
      });
      await wrapper.findComponent(Checkbox).trigger('click');
      expect(onChange).toHaveBeenCalledWith(['one'], expect.objectContaining({ type: 'check' }));
    });

    it('explicit readonly overrides group readonly', async () => {
      const onChange = vi.fn();
      const wrapper = mount(CheckboxGroup, {
        props: { readonly: true, onChange },
        slots: { default: () => <Checkbox value="one" readonly={false} /> },
      });
      await wrapper.findComponent(Checkbox).trigger('click');
      expect(onChange).toHaveBeenCalledWith(['one'], expect.objectContaining({ type: 'check' }));
    });
  });
});

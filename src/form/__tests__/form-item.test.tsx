import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils';
import { afterEach, describe, it, expect } from 'vitest';
import { h, ref } from 'vue';
import { CheckCircleFilledIcon, ChevronRightIcon } from 'tdesign-icons-vue-next';
import { FormItem, Form } from '../index';
import type { FormRule, TdFormItemProps } from '../type';
import Input from '../../input';
import config from '../../config';

const { prefix } = config;

const name = `${prefix}-form`;

enableAutoUnmount(afterEach);

const mountItem = (itemProps: TdFormItemProps = {}, slots = {}) =>
  mount(Form, {
    slots: { default: () => h(FormItem, itemProps, slots) },
  });

describe('FormItem', () => {
  describe('props', () => {
    it('arrow[boolean]', () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Form>
              <FormItem label="label" name="name" arrow>
                <Input />
              </FormItem>
            </Form>
          );
        },
      });

      // arrow 开启时渲染右侧箭头图标
      expect(wrapper.find(`.${name}__item-arrow`).exists()).toBe(true);
      expect(wrapper.findComponent(ChevronRightIcon).exists()).toBe(true);
    });

    it('contentAlign[left/right]', () => {
      const alignList: TdFormItemProps['contentAlign'][] = ['left', 'right'];

      alignList.forEach((contentAlign) => {
        const wrapper = mount({
          setup() {
            return () => (
              <Form>
                <FormItem label="label" name="name" contentAlign={contentAlign}>
                  <Input />
                </FormItem>
              </Form>
            );
          },
        });
        // 表单项内容区按 contentAlign 添加对齐类名（优先级高于 Form.contentAlign）
        expect(wrapper.find(`.${name}__controls--${contentAlign}`).exists()).toBe(true);
      });
    });

    it('for[string]', () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Form>
              <FormItem label="label" name="name" for="name-input">
                <input id="name-input" />
              </FormItem>
            </Form>
          );
        },
      });

      // for 透传到原生 label，并关联到对应的原生表单控件。
      expect(wrapper.find(`.${name}__label`).find('label').attributes('for')).toBe('name-input');
      expect(wrapper.get<HTMLLabelElement>('label').element.control).toBe(wrapper.get('input#name-input').element);
    });

    it('help[string]', () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Form>
              <FormItem label="label" name="name" help="help text">
                <Input />
              </FormItem>
            </Form>
          );
        },
      });

      expect(wrapper.find(`.${name}__item-help`).text()).toBe('help text');
    });

    it('help[function]', () => {
      const wrapper = mount({
        setup() {
          const renderHelp = () => <CheckCircleFilledIcon />;

          return () => (
            <Form>
              <FormItem label="label" name="name" help={renderHelp}>
                <Input />
              </FormItem>
            </Form>
          );
        },
      });

      expect(wrapper.findComponent(CheckCircleFilledIcon).exists()).toBeTruthy();
    });

    it('help[slot]', () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Form>
              <FormItem label="label" name="name" v-slots={{ help: () => 'slot: help text ' }}>
                <Input />
              </FormItem>
            </Form>
          );
        },
      });

      expect(wrapper.find(`.${name}__item-help`).text()).toBe('slot: help text');
    });

    it('label[string]', () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Form>
              <FormItem label="姓名" name="name">
                <Input />
              </FormItem>
            </Form>
          );
        },
      });

      expect(wrapper.find(`.${name}__label`).text()).toBe('姓名');
    });

    it('label[function]', () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Form>
              <FormItem label={() => '函数标签'} name="name">
                <Input />
              </FormItem>
            </Form>
          );
        },
      });

      expect(wrapper.find(`.${name}__label`).text()).toBe('函数标签');
    });

    it('label[slot]', () => {
      const wrapper = mountItem({}, { label: () => <span>插槽标签</span> });
      expect(wrapper.get(`.${name}__label label`).text()).toBe('插槽标签');
    });

    it('labelAlign[left/right/top]', () => {
      const labelAlignList: TdFormItemProps['labelAlign'][] = ['left', 'right', 'top'];

      labelAlignList.forEach((labelAlign) => {
        const wrapper = mount({
          setup() {
            return () => (
              <Form label-align="right">
                <FormItem label="label" name="name" labelAlign={labelAlign}>
                  <Input />
                </FormItem>
              </Form>
            );
          },
        });
        if (labelAlign) {
          expect(wrapper.find(`.${name}__label`).classes(`${name}__label--${labelAlign}`)).toBeTruthy();
        }
      });
    });

    it('labelWidth[number]', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Form>
              <FormItem label="label" name="name" labelWidth={120}>
                <Input />
              </FormItem>
            </Form>
          );
        },
      });
      // 数值宽度转换为 px，优先级高于 Form.labelWidth
      expect(wrapper.get<HTMLElement>(`.${name}__label`).element.style.width).toBe('120px');
      expect(wrapper.get<HTMLElement>(`.${name}__controls`).element.style.marginLeft).toBe('120px');
    });

    it('labelWidth[string]', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Form>
              <FormItem label="label" name="name" labelWidth="100px">
                <Input />
              </FormItem>
            </Form>
          );
        },
      });
      // 字符串宽度原样应用
      expect(wrapper.get<HTMLElement>(`.${name}__label`).element.style.width).toBe('100px');
      expect(wrapper.get<HTMLElement>(`.${name}__controls`).element.style.marginLeft).toBe('100px');
    });

    it('name[string]', () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Form>
              <FormItem label="label" name="username">
                <Input />
              </FormItem>
            </Form>
          );
        },
      });

      // name 作为表单项类名标识，用于定位表单字段
      expect(wrapper.find(`.${name}__item`).classes()).toContain(`${name}-item__username`);
    });

    it('requiredMark[boolean]', () => {
      const rules = [{ required: true, message: '姓名必填' }];
      const mountItem = (requiredMark: boolean) =>
        mount({
          setup() {
            return () => (
              <Form rules={{ name: rules }} data={{ name: '' }}>
                <FormItem label="label" name="name" requiredMark={requiredMark}>
                  <Input />
                </FormItem>
              </Form>
            );
          },
        });

      // requiredMark = false：即使规则必填也不显示星号
      expect(mountItem(false).find(`.${name}__label--required`).exists()).toBe(false);
      // requiredMark = true：显示星号
      expect(mountItem(true).find(`.${name}__label--required`).exists()).toBe(true);
    });

    it('rules[array]', async () => {
      const formData = { name: '' };
      const wrapper = mount({
        setup() {
          return () => (
            <Form data={formData}>
              <FormItem label="姓名" name="name" rules={[{ required: true, message: '表单项级规则' }]}>
                <Input v-model={formData.name} />
              </FormItem>
            </Form>
          );
        },
      });

      await wrapper.findComponent(Form).vm.$.exposed.validate();
      expect(wrapper.find(`.${name}__item-extra`).text()).toBe('表单项级规则');
    });

    it('showErrorMessage[boolean]', async () => {
      const formData = { name: '' };
      const wrapper = mount({
        setup() {
          return () => (
            <Form data={formData}>
              <FormItem
                label="姓名"
                name="name"
                rules={[{ required: true, message: '姓名必填' }]}
                showErrorMessage={false}
              >
                <Input v-model={formData.name} />
              </FormItem>
            </Form>
          );
        },
      });

      await wrapper.findComponent(Form).vm.$.exposed.validate();
      // FormItem.showErrorMessage = false 时校验失败也不渲染错误提示（优先级高于 Form.showErrorMessage）
      expect(wrapper.find(`.${name}__item-extra`).exists()).toBe(false);
    });

    it('default[slot]', () => {
      const wrapper = mountItem({}, { default: () => <input class="slot-input" /> });
      expect(wrapper.get(`.${name}__controls-content .slot-input`).element.tagName).toBe('INPUT');
    });
  });

  describe('scenarios', () => {
    it('validates blur rules when the input loses focus', async () => {
      const wrapper = mount(() => (
        <Form data={{ name: '' }}>
          <FormItem name="name" label="姓名" rules={[{ required: true, message: '失焦校验失败', trigger: 'blur' }]}>
            <Input />
          </FormItem>
        </Form>
      ));
      expect(wrapper.find(`.${name}__item-extra`).exists()).toBe(false);
      await wrapper.get('input').trigger('blur');
      await flushPromises();
      expect(wrapper.get(`.${name}__item-extra`).text()).toBe('失焦校验失败');
    });

    it('revalidates when item rules change', async () => {
      const rules = ref<FormRule[]>([]);
      const wrapper = mount(() => (
        <Form data={{ name: '' }}>
          <FormItem name="name" label="姓名" rules={rules.value} />
        </Form>
      ));
      expect(wrapper.find(`.${name}__item-extra`).exists()).toBe(false);
      rules.value = [{ required: true, message: '新增规则校验失败' }];
      await flushPromises();
      expect(wrapper.get(`.${name}__item-extra`).text()).toBe('新增规则校验失败');
    });

    it('renders success messages from custom validators', async () => {
      const wrapper = mount(() => (
        <Form data={{ name: 'TDesign' }}>
          <FormItem
            name="name"
            label="姓名"
            rules={[
              {
                validator: () => ({ result: true, message: '校验成功', type: 'success' }),
              },
            ]}
          />
        </Form>
      ));
      expect(await wrapper.findComponent(Form).vm.$.exposed.validate()).toBe(true);
      expect(wrapper.get(`.${name}__item-extra`).text()).toBe('校验成功');
      expect(wrapper.find(`.${name}__item--error`).exists()).toBe(false);
    });

    it('label prop takes priority over label slot and falls back when empty', async () => {
      const dynamic = mount(FormItem, {
        props: { label: '属性标签', labelWidth: '81px' },
        slots: { label: () => <span>插槽标签</span> },
      });
      expect(dynamic.get('label').text()).toBe('属性标签');
      await dynamic.setProps({ label: '' });
      expect(dynamic.get('label').text()).toBe('插槽标签');
    });

    it('help prop takes priority over help slot and falls back when removed', async () => {
      const wrapper = mount(FormItem, {
        props: { help: '属性帮助' },
        slots: { help: () => <span>插槽帮助</span> },
      });
      expect(wrapper.get(`.${name}__item-help`).text()).toBe('属性帮助');
      await wrapper.setProps({ help: undefined });
      expect(wrapper.get(`.${name}__item-help`).text()).toBe('插槽帮助');
    });

    it('item layout overrides Form layout and top alignment clears horizontal spacing', () => {
      const wrapper = mount(() => (
        <Form labelAlign="right" labelWidth={80} contentAlign="left">
          <FormItem label="姓名" labelAlign="left" labelWidth={120} contentAlign="right" />
          <FormItem label="年龄" labelAlign="top" labelWidth={120} />
        </Form>
      ));
      const items = wrapper.findAllComponents(FormItem);
      expect(items[0].get(`.${name}__label`).classes()).toContain(`${name}__label--left`);
      expect(items[0].get(`.${name}__label`).attributes('style')).toContain('width: 120px');
      expect(items[0].find(`.${name}__controls--right`).exists()).toBe(true);
      expect(items[1].get(`.${name}__label`).classes()).toContain(`${name}__label--top`);
      expect(items[1].get(`.${name}__label`).attributes('style') || '').not.toContain('width');
      expect(items[1].get(`.${name}__controls`).attributes('style') || '').not.toContain('margin-left');
    });

    it('zero labelWidth hides label content', () => {
      const wrapper = mountItem({ label: '隐藏标签', labelWidth: 0 });
      expect(wrapper.get('label').text()).toBe('');
    });

    it('item rules and requiredMark override Form settings', async () => {
      const wrapper = mount(() => (
        <Form requiredMark data={{ name: '' }} rules={{ name: [{ required: true, message: '表单级规则' }] }}>
          <FormItem name="name" label="姓名" requiredMark={false} rules={[{ required: true, message: '表单项规则' }]} />
        </Form>
      ));
      expect(wrapper.find(`.${name}__label--required`).exists()).toBe(false);
      await wrapper.findComponent(Form).vm.$.exposed.validate();
      expect(wrapper.get(`.${name}__item-extra`).text()).toBe('表单项规则');
    });

    it('item showErrorMessage overrides Form showErrorMessage', async () => {
      const wrapper = mount(() => (
        <Form showErrorMessage={false} data={{ name: '' }}>
          <FormItem name="name" label="姓名" showErrorMessage rules={[{ required: true, message: '姓名必填' }]} />
        </Form>
      ));
      await wrapper.findComponent(Form).vm.$.exposed.validate();
      expect(wrapper.get(`.${name}__item-extra`).text()).toBe('姓名必填');
    });
  });
});

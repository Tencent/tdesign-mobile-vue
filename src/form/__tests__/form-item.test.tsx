import { enableAutoUnmount, mount } from '@vue/test-utils';
import { afterEach, describe, it, expect } from 'vitest';
import { h } from 'vue';
import { CheckCircleFilledIcon, ChevronRightIcon } from 'tdesign-icons-vue-next';
import { FormItem, Form } from '../index';
import type { TdFormItemProps } from '../type';
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

    it.each(['left', 'right'] as TdFormItemProps['contentAlign'][])('contentAlign[%s]', (contentAlign) => {
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

    it.each(['left', 'right', 'top'] as TdFormItemProps['labelAlign'][])('labelAlign[%s]', (labelAlign) => {
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
});

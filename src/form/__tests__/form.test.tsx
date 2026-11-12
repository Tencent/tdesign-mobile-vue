import { ref, nextTick, type Ref } from 'vue';
import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import { ChevronRightIcon } from 'tdesign-icons-vue-next';
import { FormItem, Form } from '../index';
import Input from '../../input';
import { ConfigProvider } from '../../config-provider';
import config from '../../config';
import { sleep } from '../../shared/util';
import type { Data, FormRules } from '../type';

const { prefix } = config;

const name = `${prefix}-form`;

enableAutoUnmount(afterEach);

describe('Form', () => {
  describe('props', () => {
    let wrapper: VueWrapper;
    beforeEach(() => {
      wrapper = mount(Form, {
        slots: {
          default: () => (
            <FormItem label="name" name="name">
              <Input placeholder="请输入内容" />
            </FormItem>
          ),
        },
      });
    });

    it('colon[boolean]', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Form colon>
              <FormItem label="姓名" name="name">
                <Input placeholder="请输入内容" />
              </FormItem>
            </Form>
          );
        },
      });
      // colon 开启时 label 后渲染全局配置的冒号字符（默认全角冒号）
      expect(wrapper.find(`.${name}__label`).text()).toContain('：');
    });

    it.each(['left', 'right'] as const)('contentAlign[%s]', (contentAlign) => {
      const wrapper = mount({
        setup() {
          return () => (
            <Form contentAlign={contentAlign}>
              <FormItem label="姓名" name="name">
                <Input placeholder="请输入内容" />
              </FormItem>
            </Form>
          );
        },
      });
      expect(wrapper.find(`.${name}__controls--${contentAlign}`).exists()).toBe(true);
    });

    it('data[object]', async () => {
      const formData = ref({ name: '' });
      const rules = { name: [{ required: true }] };
      const wrapper = mount({
        setup() {
          return () => (
            <Form rules={rules} data={formData.value}>
              <FormItem label="姓名" name="name">
                <Input v-model={formData.value.name} />
              </FormItem>
            </Form>
          );
        },
      });

      const form = wrapper.findComponent(Form);
      // FormItem 校验取值来源于 Form.data：name 为空时校验不通过
      expect(await form.vm.$.exposed.validate()).not.toBe(true);

      // data 中字段更新后，校验按最新值执行
      formData.value.name = 'TDesign';
      expect(await form.vm.$.exposed.validate()).toBe(true);
    });

    it('disabled[boolean]', async () => {
      const input = wrapper.find('input');
      expect(input.element.hasAttribute('disabled')).toBeFalsy();
      await wrapper.setProps({ disabled: true });
      expect(input.element.hasAttribute('disabled')).toBeTruthy();
    });

    it('errorMessage[object]', async () => {
      const formData = { name: '' };
      const wrapper = mount({
        setup() {
          return () => (
            <Form
              rules={{ name: [{ required: true }] }}
              data={formData}
              // eslint-disable-next-line no-template-curly-in-string
              errorMessage={{ required: '${name}为必填项，请检查' }}
            >
              <FormItem label="姓名" name="name">
                <Input v-model={formData.name} />
              </FormItem>
            </Form>
          );
        },
      });

      await wrapper.findComponent(Form).vm.$.exposed.validate();
      // 规则未配置 message 时，使用 Form.errorMessage 模板渲染错误信息（label 作为 ${name}）
      expect(wrapper.find(`.${name}__item-extra`).text()).toBe('姓名为必填项，请检查');
    });

    it('id[string]', async () => {
      const form = wrapper.find('form');
      expect(form.element.hasAttribute('id')).toBeFalsy();
      await wrapper.setProps({ id: 'my-form' });
      expect(form.element.getAttribute('id')).toBe('my-form');
    });

    it.each(['left', 'right', 'top'] as const)('labelAlign[%s]', async (labelAlign) => {
      await wrapper.setProps({ labelAlign });
      expect(wrapper.find(`.${name}__label`).classes(`${name}__label--${labelAlign}`)).toBe(true);
    });

    it('labelWidth[number]', async () => {
      expect(wrapper.get<HTMLElement>(`.${name}__label`).element.style.width).eq('81px');
      expect(wrapper.get<HTMLElement>(`.${name}__controls`).element.style.marginLeft).eq('81px');

      await wrapper.setProps({ labelWidth: 100 });
      expect(wrapper.get<HTMLElement>(`.${name}__label`).element.style.width).eq('100px');
      expect(wrapper.get<HTMLElement>(`.${name}__controls`).element.style.marginLeft).eq('100px');
    });

    it('labelWidth[string]', async () => {
      await wrapper.setProps({ labelWidth: '100px' });
      expect(wrapper.get<HTMLElement>(`.${name}__label`).element.style.width).eq('100px');
      expect(wrapper.get<HTMLElement>(`.${name}__controls`).element.style.marginLeft).eq('100px');
    });

    it('preventSubmitDefault[boolean]', async () => {
      const event = new Event('submit', { bubbles: true, cancelable: true });
      const spy = vi.spyOn(event, 'preventDefault');
      const wrapper = mount({
        setup() {
          return () => (
            <Form>
              <FormItem label="姓名" name="name">
                <Input placeholder="请输入内容" />
              </FormItem>
            </Form>
          );
        },
      });
      wrapper.element.dispatchEvent(event);
      expect(spy).toHaveBeenCalled();
      await wrapper.setProps({ preventSubmitDefault: false });
      const allowedEvent = new Event('submit', { bubbles: true, cancelable: true });
      wrapper.element.dispatchEvent(allowedEvent);
      expect(allowedEvent.defaultPrevented).toBe(false);
    });

    it('readonly[boolean]', async () => {
      const input = wrapper.find('input');
      expect(input.element.hasAttribute('readonly')).toBeFalsy();
      await wrapper.setProps({ readonly: true });
      expect(input.element.hasAttribute('readonly')).toBeTruthy();
    });

    it('requiredMark[boolean]', async () => {
      const mountForm = (requiredMark: boolean) =>
        mount({
          setup() {
            return () => (
              <Form requiredMark={requiredMark} rules={{ name: [{ required: true }] }} data={{ name: '' }}>
                <FormItem label="姓名" name="name">
                  <Input />
                </FormItem>
              </Form>
            );
          },
        });

      // requiredMark = false：即使规则必填，整个表单不显示星号
      expect(mountForm(false).find(`.${name}__label--required`).exists()).toBe(false);
      // requiredMark = true：表单项显示星号
      expect(mountForm(true).find(`.${name}__label--required`).exists()).toBe(true);
    });

    it.each(['left', 'right'] as const)('requiredMarkPosition[%s]', (requiredMarkPosition) => {
      const wrapper = mount({
        setup() {
          return () => (
            <Form requiredMarkPosition={requiredMarkPosition}>
              <FormItem required-mark />
            </Form>
          );
        },
      });
      // 仅 right 取值添加 required-right 类名
      expect(wrapper.find(`.${name}__label`).classes(`${name}__label--required-right`)).toBe(
        requiredMarkPosition === 'right',
      );
    });

    it.each(['empty', 'initial'] as const)('resetType[%s]', async (resetType) => {
      const formData = ref({
        name: 'defaultName',
      });

      const wrapper = mount({
        setup() {
          return () => (
            <Form rules={{ name: [{ required: true }] }} data={formData.value} resetType={resetType}>
              <FormItem label="name" name="name">
                <Input v-model={formData.value.name} />
              </FormItem>
            </Form>
          );
        },
      });

      await wrapper.findComponent(Form).vm.$.exposed.reset();
      // empty 重置为空值，initial 重置为初始值
      expect(formData.value.name).eq(resetType === 'initial' ? 'defaultName' : '');
    });

    it('rules[object]', async () => {
      const form = wrapper.findComponent(Form);
      await wrapper.setProps({ data: { name: '' }, rules: { name: [{ required: true, message: '姓名必填' }] } });
      expect(await form.vm.$.exposed.validate()).toMatchObject({
        name: [{ required: true, message: '姓名必填', result: false }],
      });
      expect(form.get(`.${name}__item-extra`).text()).toBe('姓名必填');
      await wrapper.setProps({ data: { name: 'TDesign' } });
      expect(await form.vm.$.exposed.validate()).toBe(true);
    });

    const mountScrollForm = (scrollToFirstError: '' | 'smooth' | 'auto') => {
      const wrapper = mount({
        setup() {
          return () => (
            <Form
              rules={{ name: [{ required: true, message: '姓名必填' }] }}
              data={{ name: '' }}
              scrollToFirstError={scrollToFirstError}
            >
              <FormItem label="name" name="name">
                <Input />
              </FormItem>
            </Form>
          );
        },
      });
      const scrollIntoView = vi.fn();
      wrapper.element.querySelector('.t-form-item__name').scrollIntoView = scrollIntoView;
      return { wrapper, scrollIntoView };
    };

    it('scrollToFirstError[smooth]', async () => {
      const { wrapper, scrollIntoView } = mountScrollForm('smooth');
      await wrapper.findComponent(Form).trigger('submit');
      await sleep(0);
      // 校验失败提交时，按 smooth 滚动定位到第一个校验不通过的字段
      expect(scrollIntoView).toHaveBeenCalledTimes(1);
      expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    });

    it('scrollToFirstError[auto]', async () => {
      const { wrapper, scrollIntoView } = mountScrollForm('auto');
      await wrapper.findComponent(Form).trigger('submit');
      await flushPromises();
      expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'auto' });
    });

    // 空字符串（默认）不触发滚动定位
    it('scrollToFirstError[default]', async () => {
      const { wrapper, scrollIntoView } = mountScrollForm('');
      await wrapper.findComponent(Form).trigger('submit');
      await flushPromises();
      expect(scrollIntoView).not.toHaveBeenCalled();
    });

    it('showErrorMessage[boolean]', async () => {
      const rules = {
        name: [{ required: true, message: '姓名必填' }],
      };
      const formData = {
        name: '',
      };

      const showErrorMessage = true;
      const wrapper = mount({
        setup() {
          return () => (
            <Form rules={rules} data={formData} showErrorMessage={showErrorMessage}>
              <FormItem label="name" name="name">
                <Input v-model={formData.name} />
              </FormItem>
            </Form>
          );
        },
      });
      const form = wrapper.findComponent(Form);
      await form.vm.$.exposed.validate();

      expect(form.find(`.${name}__item-extra`).text()).eq('姓名必填');
      await wrapper.setProps({ showErrorMessage: false });
      await form.vm.$.exposed.validate();
      expect(form.find(`.${name}__item-extra`).exists()).toBeFalsy();
    });

    // submitWithWarningMessage 组件未消费该属性（提交恒触发 onSubmit，不区分警告态，API 标注【讨论中】），无行为差异可断言
    it.todo('submitWithWarningMessage[boolean]');

    it('default[slot]', () => {
      const wrapper = mount(Form, { slots: { default: () => <FormItem label="插槽表单项" /> } });
      expect(wrapper.element.tagName).toBe('FORM');
      expect(wrapper.findComponent(FormItem).text()).toContain('插槽表单项');
    });
  });
  describe('events', () => {
    it('submit', async () => {
      const onSubmit = vi.fn();
      const onValidate = vi.fn();

      const wrapper = mount(Form, {
        props: {
          onSubmit,
          onValidate,
        },
      });

      const form = wrapper.findComponent(Form);
      expect(onSubmit).not.toBeCalled();

      await form.trigger('submit');
      await nextTick();
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith({ validateResult: true, firstError: '' });

      const onInvalidSubmit = vi.fn();
      const invalid = mount(Form, {
        props: {
          data: { name: '', age: '' },
          rules: { name: [{ required: true, message: '姓名必填' }], age: [{ required: true, message: '年龄必填' }] },
          onSubmit: onInvalidSubmit,
        },
        slots: {
          default: () => (
            <>
              <FormItem name="name" />
              <FormItem name="age" />
            </>
          ),
        },
      });
      await invalid.trigger('submit');
      await flushPromises();
      expect(onInvalidSubmit).toHaveBeenCalledTimes(1);
      expect(onInvalidSubmit).toHaveBeenCalledWith({
        validateResult: {
          name: [{ required: true, message: '姓名必填', result: false }],
          age: [{ required: true, message: '年龄必填', result: false }],
        },
        firstError: '姓名必填',
      });
    });

    it('reset', async () => {
      const onReset = vi.fn();
      const rules = {
        name: [{ required: true }],
      };
      const data = ref({
        name: 'test',
      });

      const wrapper = mount(
        () => (
          <Form onReset={onReset} rules={rules} data={data.value}>
            <FormItem arrow label="name" name="name">
              <Input v-model={data.value.name} />
            </FormItem>
          </Form>
        ),
        { attachTo: document.body },
      );

      const form = wrapper.findComponent(Form);

      // arrow
      const $ChevronRightIcon = wrapper.findComponent(ChevronRightIcon);
      expect($ChevronRightIcon.exists()).toBeTruthy();

      expect(onReset).not.toBeCalled();
      await form.trigger('reset');
      expect(onReset).toHaveBeenCalledTimes(1);
      expect(onReset).toHaveBeenCalledWith({ e: expect.any(Event) });
      expect(data.value).toMatchObject({ name: '' });
    });

    it('validate', async () => {
      const onValidate = vi.fn();
      const wrapper = mount(Form, {
        props: { data: { name: '' }, rules: { name: [{ required: true, message: '姓名必填' }] }, onValidate },
        slots: { default: () => <FormItem label="姓名" name="name" /> },
      });
      const result = await wrapper.vm.$.exposed.validate();
      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(onValidate).toHaveBeenCalledWith({ validateResult: result });
      expect(result).toMatchObject({ name: [{ result: false, message: '姓名必填' }] });
    });
  });

  // test expose function
  describe('instanceFunctions', () => {
    let wrapper: VueWrapper;
    let form: VueWrapper;
    let data: Ref<Data>;
    let rules: Ref<FormRules>;
    let onValidate: ReturnType<typeof vi.fn>;
    let onSubmit: ReturnType<typeof vi.fn>;
    let onReset: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      rules = ref<FormRules>({
        name: [{ required: true, message: '姓名必填', trigger: 'blur' }],
        age: [{ required: true, trigger: 'blur' }],
      });
      data = ref({
        name: '',
        age: undefined,
      });
      onValidate = vi.fn();
      onSubmit = vi.fn();
      onReset = vi.fn();

      wrapper = mount(
        () => (
          <Form rules={rules.value} data={data.value} onValidate={onValidate} onSubmit={onSubmit} onReset={onReset}>
            <FormItem label="name" name="name">
              <Input v-model={data.value.name} />
            </FormItem>
            <FormItem label="age" name="age">
              <Input v-model={data.value.age} />
            </FormItem>
          </Form>
        ),
        { attachTo: document.body },
      );
      form = wrapper.findComponent(Form);
    });

    it('validate', async () => {
      const result = await form.vm.$.exposed.validate({ fields: ['name'], trigger: 'blur' });
      expect(result).toMatchObject({ name: [{ result: false, message: '姓名必填' }] });
      expect(result).not.toHaveProperty('age');
      expect(form.findAll(`.${name}__item-extra`)).toHaveLength(1);
      expect(onValidate).toHaveBeenCalledWith({ validateResult: result });

      form.vm.$.exposed.clearValidate();
      await nextTick();
      expect(await form.vm.$.exposed.validate({ fields: ['name'], trigger: 'change' })).toBe(true);
      expect(form.find(`.${name}__item-extra`).exists()).toBe(false);
    });

    it('validateOnly', async () => {
      const result = await form.vm.$.exposed.validateOnly({ fields: ['name'], trigger: 'blur' });
      expect(result).toMatchObject({ name: [{ result: false, message: '姓名必填' }] });
      expect(result).not.toHaveProperty('age');
      expect(form.find(`.${name}__item-extra`).exists()).toBe(false);
      expect(onValidate).not.toHaveBeenCalled();
      expect(await form.vm.$.exposed.validateOnly({ trigger: 'change' })).toBe(true);

      await form.vm.$.exposed.validate();
      const messages = form.findAll(`.${name}__item-extra`).map((item) => item.text());
      expect(await form.vm.$.exposed.validateOnly({ fields: [] })).toBe(true);
      expect(form.findAll(`.${name}__item-extra`).map((item) => item.text())).toEqual(messages);
    });

    it('submit', async () => {
      await form.vm.$.exposed.submit({ showErrorMessage: false });
      await flushPromises();
      expect(form.find(`.${name}__item-extra`).exists()).toBeFalsy();
      expect(form.find(`.${name}__item--error`).exists()).toBeFalsy();

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onValidate).toHaveBeenCalledTimes(1);
      await form.vm.$.exposed.submit({ showErrorMessage: true });
      await flushPromises();
      expect(form.findAll(`.${name}__item-extra`)).toHaveLength(2);
      expect(form.findAll(`.${name}__item--error`)).toHaveLength(2);
      expect(onSubmit).toHaveBeenCalledTimes(2);
      expect(onValidate).toHaveBeenCalledTimes(2);
      expect(onReset).not.toBeCalled();
    });

    it('clearValidate', async () => {
      // validate failed
      await form.vm.$.exposed.validate();
      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(form.find(`.${name}__item-extra`).exists()).toBeTruthy();
      expect(form.find(`.${name}__item--error`).exists()).toBeTruthy();

      await form.vm.$.exposed.clearValidate(['name']);
      // 仅清除 name 的校验状态，age 的 extra 仍然存在（使用全局 errorMessage 兜底）
      const remainingExtras = form.findAll(`.${name}__item-extra`);
      expect(remainingExtras).toHaveLength(1);

      await form.vm.$.exposed.validate();
      expect(onValidate).toHaveBeenCalledTimes(2);
      expect(form.find(`.${name}__item-extra`).exists()).toBeTruthy();

      // clearValidate
      await form.vm.$.exposed.clearValidate();
      expect(form.find(`.${name}__item-extra`).exists()).toBeFalsy();
    });

    it('setValidateMessage', async () => {
      await form.vm.$.exposed.validate();
      expect(wrapper.findAll(`.${name}__item-extra`)[0].text()).eq('姓名必填');
      expect(wrapper.findAll(`.${name}__item-tips`)[0].classes(`${name}__item--error`)).toBeTruthy();

      form.vm.$.exposed.setValidateMessage({
        name: [{ type: 'warning', message: '自定义用户名校验信息提示' }],
      });
      await nextTick();
      expect(wrapper.findAll(`.${name}__item-extra`)[0].text()).eq('自定义用户名校验信息提示');
      expect(wrapper.findAll('.t-form__item-tips')[0].classes(`${name}__item--warning`)).toBeTruthy();
    });

    it('reset', async () => {
      const rules = ref<FormRules>({
        name: [{ required: true, message: '姓名必填', trigger: 'blur' }],
        age: [{ required: true, trigger: 'blur' }],
      });
      const data = ref<Data>({
        name: 'test',
        age: 18,
      });

      wrapper = mount(() => (
        <Form rules={rules.value} data={data.value} onValidate={onValidate} onSubmit={onSubmit} onReset={onReset}>
          <FormItem label="name" name="name">
            <Input v-model={data.value.name} />
          </FormItem>
          <FormItem label="age" name="age">
            <Input v-model={data.value.age} />
          </FormItem>
        </Form>
      ));
      form = wrapper.findComponent(Form);

      // set validate success style
      await form.vm.$.exposed.validate();
      expect(onSubmit).not.toBeCalled();
      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(form.find(`.${name}__item-extra`).exists()).toBeFalsy();
      expect(form.find(`.${name}__item--error`).exists()).toBeFalsy();

      // reset to empty value & clear style
      await form.vm.$.exposed.reset();
      expect(onReset).toHaveBeenCalledTimes(1);
      expect(data.value).toMatchObject({ name: '', age: undefined });

      // set validate fail style
      await form.vm.$.exposed.validate();
      expect(onValidate).toHaveBeenCalledTimes(2);

      // reset to initial value & clear style
      await form.vm.$.exposed.reset({ type: 'initial' });
      expect(onReset).toHaveBeenCalledTimes(2);
      expect(data.value).toMatchObject({ name: 'test', age: 18 });

      // set validate fail style
      rules.value = {
        name: [{ validator: () => false, message: '姓名校验失败', trigger: 'blur' }],
        age: [{ validator: () => false, message: '年龄校验失败', trigger: 'blur' }],
      };
      await nextTick();
      await form.vm.$.exposed.validate();
      expect(form.findAll(`.${name}__item-extra`)).toHaveLength(2);
      expect(form.findAll(`.${name}__item--error`)).toHaveLength(2);

      // reset "name" to empty value
      await form.vm.$.exposed.reset({ fields: ['name'] });
      expect(onReset).toHaveBeenCalledTimes(3);
      expect(data.value).toMatchObject({ name: '', age: 18 });
    });
  });

  describe('globalConfig', () => {
    it('form requiredMarkPosition falls back when unset', async () => {
      const wrapper = mount(() => (
        <ConfigProvider globalConfig={{ form: { requiredMarkPosition: 'right' } }}>
          <Form>
            <FormItem requiredMark label="姓名" />
          </Form>
        </ConfigProvider>
      ));
      await nextTick();
      expect(wrapper.get(`.${name}__label`).classes()).toContain(`${name}__label--required-right`);
    });
    it('form colonText/errorMessage', async () => {
      // eslint-disable-next-line no-template-curly-in-string
      const required = '请填写${name}';
      const wrapper = mount(() => (
        <ConfigProvider globalConfig={{ form: { colonText: ':', errorMessage: { required } } }}>
          <Form colon data={{ name: '' }} rules={{ name: [{ required: true }] }}>
            <FormItem label="姓名" name="name">
              <Input />
            </FormItem>
          </Form>
        </ConfigProvider>
      ));
      expect(wrapper.get(`.${name}__label`).text()).toBe('姓名:');
      await wrapper.findComponent(Form).vm.$.exposed.validate();
      expect(wrapper.get(`.${name}__item-extra`).text()).toBe('请填写姓名');
    });
    it('form overridden by Form errorMessage and requiredMarkPosition', async () => {
      const wrapper = mount(() => (
        <ConfigProvider
          globalConfig={{ form: { requiredMarkPosition: 'right', errorMessage: { required: '全局错误' } } }}
        >
          <Form
            requiredMarkPosition="left"
            data={{ name: '' }}
            rules={{ name: [{ required: true }] }}
            errorMessage={{ required: '表单错误' }}
          >
            <FormItem label="姓名" name="name">
              <Input />
            </FormItem>
          </Form>
        </ConfigProvider>
      ));
      expect(wrapper.get(`.${name}__label`).classes()).not.toContain(`${name}__label--required-right`);
      await wrapper.findComponent(Form).vm.$.exposed.validate();
      expect(wrapper.get(`.${name}__item-extra`).text()).toBe('表单错误');
    });
  });
});

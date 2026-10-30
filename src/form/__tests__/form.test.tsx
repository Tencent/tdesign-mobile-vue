import { ref, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { isObject } from 'lodash-es';
import { ChevronRightIcon } from 'tdesign-icons-vue-next';
import { FormItem, Form } from '../index.ts';
import Input from '../../input';
import { ConfigProvider } from '../../config-provider';
import Radio, { RadioGroup } from '../../radio';
import config from '../../config';

const { prefix } = config;

const name = `${prefix}-form`;

const sleep = (duration) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });

describe('Form', () => {
  describe('props', () => {
    let wrapper = null;
    beforeEach(() => {
      wrapper = mount({
        setup() {
          return () => (
            <Form>
              <FormItem label="name" name="name">
                <Input placeholder="请输入内容" />
              </FormItem>
            </Form>
          );
        },
      });
    });

    describe('rules', () => {
      let wrapper;
      let rules;
      let formData;
      let form;
      let onValidate;
      beforeEach(() => {
        rules = ref();
        formData = ref({
          name: '',
          time: undefined,
          gender: '',
        });
        onValidate = vi.fn();
        wrapper = mount(Form, {
          attachTo: document.body,
          props: { rules, data: formData, onValidate },
          slots: {
            default: {
              setup() {
                return () => (
                  <>
                    <FormItem label="name" name="name">
                      <Input v-model={formData.value.name} />
                    </FormItem>
                    <FormItem label="radio" name="radio">
                      <RadioGroup v-model={formData.value.gender} class="box" borderless>
                        <Radio block={false} name="radio" value="man" label="男" />
                        <Radio block={false} name="radio" value="women" label="女" />
                        <Radio block={false} name="radio" value="secret" label="保密" />
                      </RadioGroup>
                    </FormItem>
                  </>
                );
              },
            },
          },
        });
        form = wrapper.findComponent(Form);
      });
      const validate = async (...args) => {
        const res = await form.vm.$.exposed.validate(args);
        return res;
      };
      const reset = (...args) => {
        form.vm.$.exposed.reset(args);
      };
      const expectToFailure = (res) => {
        expect(isObject(res)).toBe(true);
      };
      const expectToSuccess = (res) => {
        expect(res).toBe(true);
      };

      it('boolean', async () => {
        rules.value = { radio: [{ boolean: true }] };

        formData.value.radio = 'true';
        let res = await validate();
        expectToFailure(res);

        formData.value.radio = true;
        res = await validate();
        expectToSuccess(res);
      });

      it('email', async () => {
        rules.value = { name: [{ email: true }] };

        formData.value.name = '123.com';
        let res = await validate();
        expectToFailure(res);

        formData.value.name = 'test@gmail.com';
        res = await validate();
        expectToSuccess(res);
      });

      it('enum', async () => {
        rules.value = { name: [{ enum: ['primary', 'info', 'warning'] }] };

        formData.value.name = '123';
        let res = await validate();
        expectToFailure(res);

        formData.value.name = 'info';
        res = await validate();
        expectToSuccess(res);
      });

      it('idcard', async () => {
        rules.value = { name: [{ idcard: true }] };

        formData.value.name = '123456789012345678';
        let res = await validate();
        expectToSuccess(res);

        formData.value.name = '12345678901234567x';
        res = await validate();
        expectToSuccess(res);

        formData.value.name = '123456789012345';
        res = await validate();
        expectToSuccess(res);
      });

      it('len', async () => {
        rules.value = { name: [{ len: 7 }] };

        formData.value.name = '12345';
        let res = await validate();
        expectToFailure(res);

        formData.value.name = '1234567';
        res = await validate();
        expectToSuccess(res);

        formData.value.name = 'success';
        res = await validate();
        expectToSuccess(res);
      });

      it('max', async () => {
        rules.value = { name: [{ max: 7 }] };

        formData.value.name = 'failure!';
        let res = await validate();
        expectToFailure(res);

        formData.value.name = 'success';
        res = await validate();
        expectToSuccess(res);

        formData.value.name = '12345';
        res = await validate();
        expectToSuccess(res);
      });

      it('min', async () => {
        rules.value = { name: [{ min: 5 }] };

        formData.value.name = 'fail';
        let res = await validate();
        expectToFailure(res);

        formData.value.name = 'success';
        res = await validate();
        expectToSuccess(res);

        formData.value.name = '12345';
        res = await validate();
        expectToSuccess(res);
      });

      it('message', async () => {
        rules.value = { name: [{ required: true, message: 'custom error message' }] };
        await validate();
        expect(form.find(`.${name}__item-extra`).text()).toBe('custom error message');
      });

      it('number', async () => {
        rules.value = { name: [{ number: true }] };

        formData.value.name = 'fail';
        let res = await validate();
        expectToFailure(res);

        formData.value.name = 123.4;
        res = await validate();
        expectToSuccess(res);

        formData.value.name = 0x123;
        res = await validate();
        expectToSuccess(res);

        formData.value.name = 0o110;
        res = await validate();
        expectToSuccess(res);

        formData.value.name = 0b110;
        res = await validate();
        expectToSuccess(res);

        formData.value.name = 1e5;
        res = await validate();
        expectToSuccess(res);
      });

      it('pattern', async () => {
        rules.value = { name: [{ pattern: /@qq.com/ }] };

        formData.value.name = 'test@fail.com';
        let res = await validate();
        expectToFailure(res);

        formData.value.name = 'test@qq.com';
        res = await validate();
        expectToSuccess(res);
      });

      it('required', async () => {
        rules.value = { name: [{ required: true }] };

        formData.value.name = '';
        let res = await validate();
        expectToFailure(res);

        formData.value.name = 'test';
        res = await validate();
        expectToSuccess(res);
      });

      it('telnumber', async () => {
        rules.value = { name: [{ telnumber: true }] };

        formData.value.name = '19999';
        let res = await validate();
        expectToFailure(res);

        formData.value.name = '15333333333';
        res = await validate();
        expectToSuccess(res);
      });

      it('type', async () => {
        rules.value = { name: [{ required: true, type: 'error' }] };
        await validate();
        expect(form.find(`.${prefix}-form__item-tips`).classes(`${name}__item--error`)).toBeTruthy();

        rules.value = { name: [{ required: true, type: 'warning' }] };
        await validate();
        expect(form.find(`.${prefix}-form__item-tips`).classes(`${name}__item--warning`)).toBeTruthy();
      });
      it('url', async () => {
        rules.value = { name: [{ url: true }] };
        formData.value.name = 'test';
        let res = await validate();
        expectToFailure(res);

        formData.value.name = 'tdesign.tencent.com/vue-next';
        res = await validate();
        expectToSuccess(res);
      });
      it('validator', async () => {
        const isNumber = (val) => typeof val === 'number';
        rules.value = { name: [{ validator: (val) => isNumber(val) }] };
        formData.value.name = 'string';
        let res = await validate();
        expectToFailure(res);

        formData.value.name = 123;
        res = await validate();
        expectToSuccess(res);
      });
      it('whitespace', async () => {
        rules.value = { name: [{ whitespace: true }] };
        formData.value.name = ' ';
        let res = await validate();
        expectToFailure(res);

        formData.value.name = '';
        res = await validate();
        expectToSuccess(res);
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

    it('contentAlign[left/right]', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Form contentAlign="right">
              <FormItem label="姓名" name="name">
                <Input placeholder="请输入内容" />
              </FormItem>
            </Form>
          );
        },
      });
      expect(wrapper.find(`.${name}__controls--right`).exists()).toBeTruthy();
    });

    it('disabled[boolean]', async () => {
      const input = wrapper.find('input');
      expect(input.element.hasAttribute('disabled')).toBeFalsy();
      await wrapper.setProps({ disabled: true });
      expect(input.element.hasAttribute('disabled')).toBeTruthy();
    });

    it('id[string]', async () => {
      const form = wrapper.find('form');
      expect(form.element.hasAttribute('id')).toBeFalsy();
      await wrapper.setProps({ id: 'my-form' });
      expect(form.element.getAttribute('id')).toBe('my-form');
    });

    it('labelAlign[left/right/top]', async () => {
      expect(wrapper.find(`.${name}__label`).classes(`${name}__label--right`)).toBeTruthy();

      await wrapper.setProps({ labelAlign: 'top' });
      expect(wrapper.find(`.${name}__label`).classes(`${name}__label--top`)).toBeTruthy();

      await wrapper.setProps({ labelAlign: 'left' });
      expect(wrapper.find(`.${name}__label`).classes(`${name}__label--left`)).toBeTruthy();
    });

    it('labelWidth[number]', async () => {
      expect(wrapper.find(`.${name}__label`).element.style.width).eq('81px');
      expect(wrapper.find(`.${name}__controls`).element.style.marginLeft).eq('81px');

      await wrapper.setProps({ labelWidth: 100 });
      expect(wrapper.find(`.${name}__label`).element.style.width).eq('100px');
      expect(wrapper.find(`.${name}__controls`).element.style.marginLeft).eq('100px');
    });

    it('labelWidth[string]', async () => {
      await wrapper.setProps({ labelWidth: '100px' });
      expect(wrapper.find(`.${name}__label`).element.style.width).eq('100px');
      expect(wrapper.find(`.${name}__controls`).element.style.marginLeft).eq('100px');
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
    });

    it('readonly[boolean]', async () => {
      const input = wrapper.find('input');
      expect(input.element.hasAttribute('readonly')).toBeFalsy();
      await wrapper.setProps({ readonly: true });
      expect(input.element.hasAttribute('readonly')).toBeTruthy();
    });

    it('requiredMarkPosition[left/right]', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Form>
              <FormItem required-mark />
            </Form>
          );
        },
      });
      const labelEl = wrapper.find(`.${name}__label`);

      expect(labelEl.classes(`${name}__label--required-right`)).toBe(false);

      await wrapper.setProps({ requiredMarkPosition: 'right' });
      await nextTick();
      expect(labelEl.classes(`${name}__label--required-right`)).toBe(true);

      await wrapper.setProps({ requiredMarkPosition: 'left' });
      await nextTick();
      expect(labelEl.classes(`${name}__label--required-right`)).toBe(false);
    });

    it('resetType[empty/initial]', async () => {
      const rules = {
        name: [{ required: true }],
      };
      const formData = ref({
        name: 'defaultName',
      });

      const wrapper = mount({
        setup() {
          return () => (
            <Form rules={rules} data={formData.value}>
              <FormItem label="name" name="name">
                <Input v-model={formData.value.name} />
              </FormItem>
            </Form>
          );
        },
      });

      const form = wrapper.findComponent(Form);

      expect(formData.value.name).eq('defaultName');
      await form.vm.$.exposed.reset();
      expect(formData.value.name).eq('');

      await wrapper.setProps({ resetType: 'initial' });
      await form.vm.$.exposed.reset();
      expect(formData.value.name).eq('defaultName');
    });

    it('scrollToFirstError[string]', async () => {
      const formData = ref({ name: '' });
      const wrapper = mount({
        setup() {
          return () => (
            <Form
              rules={{ name: [{ required: true, message: '姓名必填' }] }}
              data={formData.value}
              scrollToFirstError="smooth"
            >
              <FormItem label="name" name="name">
                <Input v-model={formData.value.name} />
              </FormItem>
            </Form>
          );
        },
      });

      const scrollIntoView = vi.fn();
      wrapper.element.querySelector('.t-form-item__name').scrollIntoView = scrollIntoView;

      const form = wrapper.findComponent(Form);
      await form.trigger('submit');
      await sleep(0);

      // 校验失败提交时，自动滚动定位到第一个校验不通过的字段
      expect(scrollIntoView).toHaveBeenCalledTimes(1);
      expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
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
    });

    it('reset', async () => {
      const onReset = vi.fn();
      const rules = {
        name: [{ required: true }],
      };
      const data = ref({
        name: 'test',
      });

      const wrapper = mount(Form, {
        attachTo: document.body,
        props: {
          onReset,
          rules,
          data,
        },
        slots: {
          default: {
            setup() {
              return () => (
                <FormItem arrow label="name" name="name">
                  <Input v-model={data.value.name} />
                </FormItem>
              );
            },
          },
        },
      });

      const form = wrapper.findComponent(Form);

      // arrow
      const $ChevronRightIcon = wrapper.findComponent(ChevronRightIcon);
      expect($ChevronRightIcon.exists()).toBeTruthy();

      expect(onReset).not.toBeCalled();
      await form.trigger('reset');
      expect(onReset).toHaveBeenCalledTimes(1);
      expect(data.value).toMatchObject({ name: '' });
    });
  });

  // test expose function
  describe('instanceFunctions', () => {
    let wrapper;
    let form;
    let data;
    let rules;
    let onValidate;
    let onSubmit;
    let onReset;

    beforeEach(() => {
      rules = ref({
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

      wrapper = mount(Form, {
        attachTo: document.body,
        props: {
          rules,
          data,
          statusIcon: true,
          onValidate,
          onSubmit,
          onReset,
        },
        slots: {
          default: {
            setup() {
              return () => (
                <>
                  <FormItem label="name" name="name">
                    <Input v-model={data.value.name} />
                  </FormItem>
                  <FormItem label="age" name="age">
                    <Input v-model={data.value.age} />
                  </FormItem>
                </>
              );
            },
          },
        },
      });
      form = wrapper.findComponent(Form);
    });

    it('submit', async () => {
      await form.vm.$.exposed.submit({ showErrorMessage: false });
      await sleep(1000);
      expect(form.find(`.${name}__item-extra`).exists()).toBeFalsy();
      expect(form.find(`${name}__item--error`).exists()).toBeFalsy();

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onValidate).toHaveBeenCalledTimes(1);
      await form.vm.$.exposed.submit({ showErrorMessage: true });
      await sleep(1000);
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
      expect(form.find(`${name}__item--error`).exists()).toBeFalsy();

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
      const rules = ref({
        name: [{ required: true, message: '姓名必填', trigger: 'blur' }],
        age: [{ required: true, trigger: 'blur' }],
      });
      const data = ref({
        name: 'test',
        age: 18,
      });

      wrapper = mount(Form, {
        props: {
          rules,
          data,
          statusIcon: true,
          onValidate,
          onSubmit,
          onReset,
        },
        slots: {
          default: {
            setup() {
              return () => (
                <>
                  <FormItem label="name" name="name">
                    <Input v-model={data.value.name} />
                  </FormItem>
                  <FormItem label="age" name="age">
                    <Input v-model={data.value.age} />
                  </FormItem>
                </>
              );
            },
          },
        },
      });
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
      await form.vm.$.exposed.validate();
      expect(form.findAll(`.${name}__item-extra`)).toHaveLength(2);
      expect(form.findAll(`.${name}__item--error`)).toHaveLength(2);

      // reset "name" to empty value
      await form.vm.$.exposed.reset({ fields: ['name'] });
      expect(onReset).toHaveBeenCalledTimes(3);
      expect(data.value).toMatchObject({ name: '', age: 18 });
    });
  });

  describe('scenarios', () => {
    it('requiredMarkPosition falls back to ConfigProvider global config', async () => {
      const wrapper = mount({
        setup() {
          const globalConfig = {
            form: {
              requiredMarkPosition: 'right',
            },
          };
          return () => (
            <ConfigProvider globalConfig={globalConfig}>
              <Form>
                <FormItem required-mark />
              </Form>
            </ConfigProvider>
          );
        },
      });
      await nextTick();
      const labelEl = wrapper.find(`.${name}__label`);
      expect(labelEl.classes(`${name}__label--required-right`)).toBe(true);
    });
  });
});

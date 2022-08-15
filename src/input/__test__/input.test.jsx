import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Input from '../input.vue';
import { CloseCircleFilledIcon, InfoCircleFilledIcon, AppIcon } from 'tdesign-icons-vue-next';

const alignList = ['center', 'right'];

describe('Input.vue', async () => {
  it('create', async () => {
    const wrapper = mount(<Input />);
    expect(wrapper.classes()).toContain('t-input');
    expect(wrapper.classes()).toContain('t-cell');
    const input = wrapper.find('.t-input__wrap input');
    expect(input.exists()).toBeTruthy();
  });

  it('placeholder render', async () => {
    const wrapper = mount(<Input placeholder="请输入" />);
    const input = wrapper.find('.t-input__wrap input');
    expect(input.attributes('placeholder')).toBe('请输入');
  });

  it('label render', async () => {
    const wrapper = mount(<Input label="标题" />);
    const label = wrapper.find('.t-cell__title .t-input--label');
    expect(label.exists()).toBeTruthy();
    expect(label.text()).toBe('标题');
  });

  it('required render', async () => {
    const wrapper = mount(<Input label="标题" required />);
    const required = wrapper.find('.t-cell__title .t-cell--required');
    expect(required.exists()).toBeTruthy();
    expect(required.text()).toContain('*');
  });

  it('errorMessage render', async () => {
    const wrapper = mount(<Input label="标题" errorMessage="错误信息" />);
    const errorMessage = wrapper.find('.t-input__error-msg');
    expect(errorMessage.exists()).toBeTruthy();
    expect(errorMessage.text()).toBe('错误信息');
  });

  it('align render', async () => {
    alignList.forEach((a) => {
      const wrapper = mount(<Input label="标题" align={a} />);
      const control = wrapper.find(`.t-input__control--${a}`);
      expect(control.exists()).toBeTruthy();
    });
  });

  it('clearable render', async () => {
    const value = ref('123');
    const handleClear = vi.fn();
    const wrapper = mount(<Input label="标题" v-model={value.value} clearable onClear={handleClear} />);
    const closeIcon = wrapper.findComponent(CloseCircleFilledIcon);
    expect(closeIcon.exists()).toBeTruthy();
    await closeIcon.trigger('click');
    expect(value.value).toBe('');
    expect(handleClear).toBeCalled();
  });

  it('disabled render', async () => {
    const value = ref('123');
    const wrapper = mount(<Input label="标题" v-model={value.value} disabled />);
    const label = wrapper.find('.t-input--label');
    expect(label.classes()).toContain('t-is-disabled');
    const input = wrapper.find('.t-input__wrap input');
    expect(input.element.hasAttribute('disabled')).toBeTruthy();
  });

  it('readonly render', async () => {
    const value = ref('123');
    const wrapper = mount(<Input label="标题" v-model={value.value} readonly />);
    const input = wrapper.find('.t-input__wrap input');
    expect(input.element.hasAttribute('readonly')).toBeTruthy();
  });

  it('maxlength render', async () => {
    const value = ref('');
    const wrapper = mount(<Input label="标题" v-model={value.value} maxlength={10} />);
    const input = wrapper.find('.t-input__wrap input');
    expect(input.element.getAttribute('maxlength')).toBe('10');
  });

  it('autocomplete render', async () => {
    const wrapper = mount(<Input label="标题" autocomplete />);
    const input = wrapper.find('.t-input__wrap input');
    expect(input.element.getAttribute('autocomplete')).toBe('On');
  });

  it('size render', async () => {
    const wrapper = mount(() => <Input label="标题" size="small" />);
    expect(wrapper.classes()).toContain('t-input--size-small');
  });

  it('icon slot render', async () => {
    const slots = {
      prefixIcon: () => <InfoCircleFilledIcon />,
      suffixIcon: () => <AppIcon />,
    };
    const wrapper = mount(<Input label="标题" v-slots={slots} />);
    const leftIcon = wrapper.find('.t-cell__left-icon svg');
    const rightIcon = wrapper.find('.t-cell__right-icon svg');
    expect(wrapper.findComponent(InfoCircleFilledIcon).exists()).toBeTruthy();
    expect(wrapper.findComponent(AppIcon).exists()).toBeTruthy();
    expect(leftIcon.exists()).toBeTruthy();
    expect(rightIcon.exists()).toBeTruthy();
  });

  it('type render', async () => {
    const wrapper = mount(<Input label="标题" type="number" />);
    const input = wrapper.find('.t-input__wrap input');
    expect(input.element.getAttribute('type')).toBe('number');
  });

  it('blur trigger', async () => {
    const onBlur = vi.fn();
    const wrapper = mount(<Input label="标题" onBlur={onBlur} />);
    const input = wrapper.find('.t-input__wrap input');
    await input.trigger('blur');
    expect(onBlur).toBeCalled();
  });

  it('focus trigger', async () => {
    const onFocus = vi.fn();
    const wrapper = mount(<Input label="标题" onFocus={onFocus} />);
    const input = wrapper.find('.t-input__wrap input');
    await input.trigger('focus');
    expect(onFocus).toBeCalled();
  });

  it('change trigger', async () => {
    const data = ref('');
    const value = ref('');
    const handleChange = (val) => {
      value.value = val;
    };
    const wrapper = mount(<Input label="标题" v-model={data.value} onChange={handleChange} />);
    const el = wrapper.find('.t-input__wrap input').element;
    await nextTick();
    const simulateEvent = (text, event) => {
      el.value = text;
      el.dispatchEvent(new Event(event));
    };
    simulateEvent('2', 'input');
    await nextTick();
    expect(value.value).toBe('2');
  });
});

import { nextTick, ref, onMounted } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Input from '../input.vue';

import { CloseCircleFilledIcon, InfoCircleFilledIcon, AppIcon } from 'tdesign-icons-vue-next';

const prefix = 't';
const name = `${prefix}-input`;
const alignList = ['center', 'right'];

const simulateEvent = (target, text, event) => {
  target.value = text;
  target.dispatchEvent(new Event(event));
};

describe('Input.vue', async () => {
  describe('props', async () => {
    it(': value', async () => {
      const value = ref('123');
      const wrapper = mount(<Input v-model={value.value} />);
      expect(wrapper.classes()).toContain('t-input');
      expect(wrapper.classes()).toContain('t-cell');
      const input = wrapper.find('.t-input__wrap input');
      expect(input.exists()).toBeTruthy();
      expect(input.element.value).toBe('123');
    });

    it(': maxcharacter', async () => {
      const value = ref('');
      const maxcharacter = 2;
      const onChange = vi.fn();
      const wrapper = mount(<Input v-model={value.value} maxcharacter={maxcharacter} onChange={onChange} />);
      const el = wrapper.find('input').element;
      await simulateEvent(el, '一个汉字等于两个字符，超出会被剪切', 'input');
      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith('一');
    });

    it(': placeholder', async () => {
      const wrapper = mount(<Input placeholder="请输入" />);
      const input = wrapper.find('.t-input__wrap input');
      expect(input.attributes('placeholder')).toBe('请输入');
    });

    it(': label', async () => {
      const wrapper = mount(<Input label="标题" />);
      const label = wrapper.find('.t-cell__title .t-input--label');
      expect(label.exists()).toBeTruthy();
      expect(label.text()).toBe('标题');
    });

    it(': required', async () => {
      const wrapper = mount(<Input label="标题" required />);
      const required = wrapper.find('.t-cell__title .t-cell--required');
      expect(required.exists()).toBeTruthy();
      expect(required.text()).toContain('*');
    });

    it(': errorMessage', async () => {
      const wrapper = mount(<Input label="标题" errorMessage="错误信息" />);
      const errorMessage = wrapper.find('.t-input__error-msg');
      expect(errorMessage.exists()).toBeTruthy();
      expect(errorMessage.text()).toBe('错误信息');
    });

    it(': align', async () => {
      alignList.forEach((a) => {
        const wrapper = mount(<Input label="标题" align={a} />);
        const control = wrapper.find(`.t-input__control--${a}`);
        expect(control.exists()).toBeTruthy();
      });
    });

    it(': clearable', async () => {
      const value = ref('123');
      const handleClear = vi.fn();
      const wrapper = mount(<Input label="标题" v-model={value.value} clearable onClear={handleClear} />);
      const closeIcon = wrapper.findComponent(CloseCircleFilledIcon);
      expect(closeIcon.exists()).toBeTruthy();
      await closeIcon.trigger('click');
      expect(value.value).toBe('');
      expect(handleClear).toBeCalled();
    });

    it(': disabled', async () => {
      const value = ref('123');
      const wrapper = mount(<Input label="标题" v-model={value.value} disabled />);
      const label = wrapper.find('.t-input--label');
      expect(label.classes()).toContain('t-is-disabled');
      const input = wrapper.find('.t-input__wrap input');
      expect(input.element.hasAttribute('disabled')).toBeTruthy();
    });

    it(': readonly', async () => {
      const value = ref('123');
      const wrapper = mount(<Input label="标题" v-model={value.value} readonly />);
      const input = wrapper.find('.t-input__wrap input');
      expect(input.element.hasAttribute('readonly')).toBeTruthy();
    });

    it(': maxlength', async () => {
      const value = ref('');
      const wrapper = mount(<Input label="标题" v-model={value.value} maxlength={10} />);
      const input = wrapper.find('.t-input__wrap input');
      expect(input.element.getAttribute('maxlength')).toBe('10');
    });

    it(': autocomplete', async () => {
      const wrapper = mount(<Input label="标题" autocomplete />);
      const input = wrapper.find('.t-input__wrap input');
      expect(input.element.getAttribute('autocomplete')).toBe('On');
    });

    it(': size', async () => {
      const wrapper = mount(() => <Input label="标题" size="small" />);
      expect(wrapper.classes()).toContain('t-input--size-small');
    });

    it(': type', async () => {
      const wrapper = mount(<Input label="标题" type="number" />);
      const input = wrapper.find('.t-input__wrap input');
      expect(input.element.getAttribute('type')).toBe('number');
    });

    it(': onBlur', async () => {
      const onBlur = vi.fn();
      const wrapper = mount(<Input label="标题" onBlur={onBlur} />);
      await nextTick();
      const input = wrapper.find('.t-input__wrap input');
      await input.trigger('blur');
      expect(onBlur).toBeCalled();
    });

    it(': onFocus', async () => {
      const onFocus = vi.fn();
      const wrapper = mount(<Input label="标题" onFocus={onFocus} />);
      const input = wrapper.find('.t-input__wrap input');
      await input.trigger('focus');
      expect(onFocus).toBeCalled();
    });

    it(': onChange', async () => {
      const value = ref('');
      const onChange = vi.fn();
      const wrapper = mount(<Input label="标题" v-model={value.value} onChange={onChange} />);
      const el = wrapper.find('.t-input__wrap input').element;
      await simulateEvent(el, '文本', 'input');
      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith('文本');
    });
  });
  describe('event', async () => {
    it(': focus && blur', async () => {
      const inputRef = ref(null);
      const placeholder = 'placeholder content';
      const onBlur = vi.fn();
      const onFocus = vi.fn();
      const wrapper = mount({
        render() {
          return <Input ref={inputRef} placeholder={placeholder} onBlur={onBlur} onFocus={onFocus} />;
        },
      });
      const input = wrapper.find(`.${name}__wrap input`);

      inputRef.value.focus(); // 调用 focus 方法, 实现聚焦
      await nextTick();

      await input.trigger('blur'); // 模拟触发 blur
      expect(onBlur).toBeCalledTimes(1);

      await input.trigger('focus'); // 模拟触发 focus
      expect(onFocus).toBeCalledTimes(1);

      inputRef.value.blur(); // 调用 blur 方法，实现失焦
      await nextTick();
    });
  });

  describe('slots', async () => {
    it(': icon', async () => {
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
  });
});

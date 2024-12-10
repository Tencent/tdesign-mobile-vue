import { nextTick, ref, onMounted } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Input from '../input';

import { CloseCircleFilledIcon, InfoCircleFilledIcon, AppIcon } from 'tdesign-icons-vue-next';

const prefix = 't';
const name = `${prefix}-input`;

const simulateEvent = (target, text, event) => {
  target.value = text;
  target.dispatchEvent(new Event(event));
};

describe('Input.vue', async () => {
  describe('props', async () => {
    it(': value', async () => {
      const value = ref('123');
      const wrapper = mount(<Input v-model={value.value} />);
      const input = wrapper.find('.t-input input');
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
      const label = wrapper.find('.t-input__label');
      expect(label.exists()).toBeTruthy();
      expect(label.text()).toBe('标题');
    });

    it(': tips', async () => {
      const wrapper = mount(<Input label="标题" tips="错误信息" />);
      const $tips = wrapper.find('.t-input__tips');
      expect($tips.exists()).toBeTruthy();
      expect($tips.text()).toBe('错误信息');
    });

    it(': align', async () => {
      const alignList = ['', 'left', 'center', 'right'];
      alignList.forEach((align) => {
        const tips = 'tips';
        const wrapper = mount(<Input label="标题" align={align} tips={tips} />);
        const $tips = wrapper.find('.t-input__tips');
        const control = wrapper.find(`.t-input__control`);

        if (align && align !== 'left') {
          expect(control.classes()).toContain(`t-input--${align}`);
        }

        expect($tips.classes()).contain(`t-input--${align}`);
      });
    });

    it(': clearable', async () => {
      const value = ref('123');
      const handleClear = vi.fn();
      const wrapper = mount(<Input label="标题" v-model={value.value} clearable onClear={handleClear} />);
      const closeIcon = wrapper.findComponent(CloseCircleFilledIcon);
      expect(closeIcon.exists()).toBeTruthy();
      await closeIcon.trigger('touchend');
      expect(value.value).toBe('');
      expect(handleClear).toBeCalled();
    });

    it(': disabled', async () => {
      const value = ref('123');
      const wrapper = mount(<Input label="标题" v-model={value.value} disabled />);
      const label = wrapper.find('.t-input__control');
      expect(label.classes()).toContain('t-input__control--disabled');
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

    it(': layout', async () => {
      const layoutList = ['', 'vertical', 'horizontal'];
      layoutList.forEach((layout, index) => {
        const wrapper = mount(() => <Input label="标题" layout={layout} />);
        if (layout) {
          expect(wrapper.classes()).toContain(`t-input--layout-${layout}`);
        }
      });
    });

    it(': type', async () => {
      const wrapper = mount(<Input label="标题" type="number" />);
      const input = wrapper.find('.t-input__wrap input');
      expect(input.element.getAttribute('type')).toBe('number');
    });

    it(': type=password', async () => {
      const wrapper = mount(<Input label="标题" type="password" />);
      expect(wrapper.find('.t-icon-browse-off').exists()).toBeTruthy();
      wrapper.find('.t-icon-browse-off').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-icon-browse').exists()).toBeTruthy();
      const attrDom = wrapper.find('input');
      expect(attrDom.attributes('type')).toBe('text');
      wrapper.find('.t-icon-browse').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-icon-browse-off').exists()).toBeTruthy();
      const attrDom1 = wrapper.find('input');
      expect(attrDom1.attributes('type')).toBe('password');
    });

    it(': type=password and disabled', async () => {
      const wrapper = mount(<Input label="标题" type="password" disabled />);
      expect(wrapper.find('.t-icon-browse-off').exists()).toBeTruthy();
      wrapper.find('.t-icon-browse-off').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-icon-browse-off').exists()).toBeTruthy();
      await wrapper.setProps({
        disabled: false,
      });
      wrapper.find('.t-icon-browse-off').trigger('click');
      await wrapper.vm.$nextTick();
      const attrDom = wrapper.find('input');
      expect(attrDom.attributes('type')).toBe('text');
      wrapper.find('.t-icon-browse').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-icon-browse-off').exists()).toBeTruthy();
      const attrDom1 = wrapper.find('input');
      expect(attrDom1.attributes('type')).toBe('password');
    });

    it(': autofocus', async () => {
      const value = ref('123');
      const wrapper = mount(<Input label="标题" v-model={value.value} clearable clearTrigger="focus" autofocus />);
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-icon-close-circle-filled').exists()).toBeTruthy();
      wrapper.vm.blur();
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-icon-close-circle-filled').exists()).toBeFalsy();
      wrapper.vm.focus();
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-icon-close-circle-filled').exists()).toBeTruthy();
    });

    it(': clearTrigger=always', async () => {
      const value = ref('123');
      const handleClear = vi.fn();
      const wrapper = mount(
        <Input label="标题" v-model={value.value} clearable clearTrigger="always" onClear={handleClear} />,
      );
      expect(wrapper.find('.t-icon-close-circle-filled').exists()).toBeTruthy();
      await wrapper.find('.t-icon-close-circle-filled').trigger('touchend');
      expect(value.value).toBe('');
      expect(handleClear).toBeCalled();
    });

    it(': clearTrigger=always and disabled', async () => {
      const value = ref('123');
      const handleClear = vi.fn();
      const wrapper = mount(
        <Input label="标题" v-model={value.value} disabled clearable clearTrigger="always" onClear={handleClear} />,
      );
      expect(wrapper.find('.t-icon-close-circle-filled').exists()).toBeFalsy();
      await wrapper.setProps({
        disabled: false,
      });
      expect(wrapper.find('.t-icon-close-circle-filled').exists()).toBeTruthy();
    });

    it(': clearTrigger=always and readonly', async () => {
      const value = ref('123');
      const handleClear = vi.fn();
      const wrapper = mount(
        <Input label="标题" v-model={value.value} readonly clearable clearTrigger="always" onClear={handleClear} />,
      );
      expect(wrapper.find('.t-icon-close-circle-filled').exists()).toBeFalsy();
      await wrapper.setProps({
        readonly: false,
      });
      expect(wrapper.find('.t-icon-close-circle-filled').exists()).toBeTruthy();
    });

    it(': clearTrigger=focus', async () => {
      const value = ref('123');
      const handleClear = vi.fn();
      const wrapper = mount(
        <Input label="标题" v-model={value.value} clearable clearTrigger="focus" onClear={handleClear} />,
      );
      expect(wrapper.find('.t-icon-close-circle-filled').exists()).toBeFalsy();
      wrapper.vm.focus();
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-icon-close-circle-filled').exists()).toBeTruthy();

      await wrapper.find('.t-icon-close-circle-filled').trigger('touchend');
      expect(value.value).toBe('');
      expect(handleClear).toBeCalled();
    });

    it(': clearTrigger=focus and disabled', async () => {
      const value = ref('123');
      const handleClear = vi.fn();
      const wrapper = mount(
        <Input label="标题" v-model={value.value} disabled clearable clearTrigger="focus" onClear={handleClear} />,
      );
      expect(wrapper.find('.t-icon-close-circle-filled').exists()).toBeFalsy();
      wrapper.vm.focus();
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-icon-close-circle-filled').exists()).toBeFalsy();
      await wrapper.setProps({
        disabled: false,
      });
      wrapper.vm.focus();
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-icon-close-circle-filled').exists()).toBeTruthy();
    });

    it(': clearTrigger=focus and readonly', async () => {
      const value = ref('123');
      const handleClear = vi.fn();
      const wrapper = mount(
        <Input label="标题" v-model={value.value} readonly clearable clearTrigger="focus" onClear={handleClear} />,
      );
      expect(wrapper.find('.t-icon-close-circle-filled').exists()).toBeFalsy();
      wrapper.vm.focus();
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-icon-close-circle-filled').exists()).toBeFalsy();
      await wrapper.setProps({
        readonly: false,
      });
      wrapper.vm.focus();
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-icon-close-circle-filled').exists()).toBeTruthy();
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

    it(': compositionend', async () => {
      const onCompositionend = vi.fn();
      const wrapper = mount(<Input label="标题" onCompositionend={onCompositionend} />);
      const $input = wrapper.find('input');
      await $input.trigger('compositionend');
      expect(onCompositionend).toBeCalled();
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

  describe('slots', async () => {
    it(': prefixIcon && suffixIcon', async () => {
      const slots = {
        prefixIcon: () => <InfoCircleFilledIcon />,
        suffixIcon: () => <AppIcon />,
      };
      const wrapper = mount(<Input label="标题" v-slots={slots} />);
      const prefixIcon = wrapper.find('.t-input__icon--prefix svg');
      const suffixIcon = wrapper.find('.t-input__wrap--suffix-icon svg');
      expect(prefixIcon.exists()).toBeTruthy();
      expect(suffixIcon.exists()).toBeTruthy();
      expect(wrapper.findComponent(InfoCircleFilledIcon).exists()).toBeTruthy();
      expect(wrapper.findComponent(AppIcon).exists()).toBeTruthy();
    });
  });
});

import { ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Search from '../search';
import { CloseCircleFilledIcon as TIconClear } from 'tdesign-icons-vue-next';

const prefix = 't';
const name = `${prefix}-search`;

describe('search', () => {
  describe('props', () => {
    it(': placeholder', async () => {
      const placeholder = 'placeholder content';
      const wrapper = mount(Search, {
        props: {
          placeholder,
        },
      });
      const $input = wrapper.find('.t-input__keyword');
      expect($input.attributes('placeholder')).toEqual(placeholder);
    });

    it(': shape', async () => {
      const placeholder = 'placeholder content';
      const wrapper = mount(Search, {
        props: {
          placeholder,
        },
      });
      const $inputBox = wrapper.find(`.${name}__input-box`);
      // shape 默认值取 'square'
      expect($inputBox.classes().includes(`${name}__input-box--square`)).toBeTruthy();

      await wrapper.setProps({
        shape: 'round',
      });
      // shape = 'round'
      expect($inputBox.classes().includes(`${name}__input-box--round`)).toBeTruthy();
    });
  });

  describe('event', () => {
    it(': onFocus', async () => {
      const value = '聚焦测试';
      let focusValue = '';
      const onFocus = vi.fn((e) => {
        focusValue = e.value;
      });
      const wrapper = mount(Search, {
        props: {
          value,
          onFocus,
        },
      });
      const $search = wrapper.find(`.${name}__input-box`);
      const $input = wrapper.find(`input`);

      await $input.trigger('focus');
      expect(onFocus).toBeCalled();
      expect(focusValue).toEqual(value);
    });

    it(': onClear && onChange', async () => {
      const value = ref('清除测试');
      const onClear = vi.fn();
      const onChange = vi.fn((e) => {
        value.value = e;
      });
      const wrapper = mount(Search, {
        props: {
          value: value.value,
          onClear,
          onChange,
        },
      });
      const closeIcon = wrapper.findComponent(TIconClear);
      // clearable = true, 清除图标存在
      expect(closeIcon.exists()).toBeTruthy();

      await closeIcon.trigger('click'); // 清除, 同时也会触发 change
      expect(onClear).toBeCalled();
      expect(onChange).toBeCalled();
      expect(value.value).toEqual('');
    });

    it(': onBlur', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const wrapper = mount(Search, {
        props: {
          onFocus,
          onBlur,
        },
      });
      const $search = wrapper.find(`.${name}__input-box`);
      const $input = wrapper.find(`input`);
      await $input.trigger('focus'); // 聚焦
      expect(onFocus).toBeCalled();
      await $input.trigger('blur'); // 失焦
      expect(onBlur).toBeCalled();
      expect($search.classes().includes(`${prefix}-is-focused`)).toBeFalsy();
    });

    it(':onKeypress', async () => {
      const onKeypress = vi.fn();
      const wrapper = mount(Search, {
        props: {
          onKeypress,
        },
      });
      const $input = wrapper.find(`input`);
      await $input.trigger('keypress');
      expect(onKeypress).toBeCalled();
    });

    it(':onCompositionend', async () => {
      const onCompositionend = vi.fn();
      const wrapper = mount(Search, {
        props: {
          onCompositionend,
        },
      });
      const $input = wrapper.find('input');
      await $input.trigger('compositionend');
      expect(onCompositionend).toBeCalled();
    });

    it(':onActionClick', async () => {
      const onActionClick = vi.fn();
      const wrapper = mount(Search, {
        props: {
          value: 'test',
          action: '取消',
          onActionClick,
        },
      });
      const $input = wrapper.find(`.${name}__search-action`);
      await $input.trigger('click');
      expect(onActionClick).toBeCalled();
    });
  });

  describe('slots', () => {
    it(': action', async () => {
      const action = '插槽';

      const wrapper = mount(Search, {
        props: {
          value: 'test',
        },
        slots: {
          action,
        },
      });
      // TODO: 插槽实现的 dom 结构不正确，后期另提 pr 修复
      const $search = wrapper.find(`.${name}`);

      expect($search.text()).toEqual(action);
    });

    it(': left-icon', async () => {
      const text = '插槽';
      const leftIcon = () => {
        return text;
      };
      const wrapper = mount(Search, {
        slots: {
          leftIcon,
        },
      });
      const $search = wrapper.find(`.${name}`);
      expect($search.text()).toEqual(text);
    });
  });
});

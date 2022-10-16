import { ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Search from '../search.vue';
import Input from '../../input/index';
import Button from '../../button/index';
import { CloseCircleFilledIcon as TIconClear } from 'tdesign-icons-vue-next';

const prefix = 't'
const name = `${prefix}-search`;

describe('search', () => {
  describe('props', () => {
    it(': placeholder', async () => {
      const placeholder = 'placeholder content';
      const wrapper = mount(Search, {
        props: {
          placeholder,
        }
      })
      const $input = wrapper.findComponent(Input).find(`input`);
      expect($input.attributes('placeholder')).toEqual(placeholder);
    });

    it(': action', async () => {
      const action = '提交';
      const wrapper = mount(Search, {
        props: {
          action,
        }
      })
      const $actionBtn = wrapper.findComponent(Button);
      const $input = wrapper.findComponent(Input).find(`input`);

      // focus = false, value = '', defaultValue = '' (默认，action 内容隐藏)
      expect($actionBtn.attributes('style').includes(`display: none;`)).toBeTruthy();

      // 模拟触发 input 的 focus , action 内容显示
      await $input.trigger('focus');
      expect($actionBtn.attributes('style').includes(`display: none;`)).toBeFalsy();
      expect($actionBtn.text()).toEqual(action);
    });

    it(': defaultValue', async () => {
      const placeholder = 'placeholder content';
      const wrapper = mount(Search, {
        props: {
          placeholder,
        }
      })
      const $search = wrapper.find(`.${name}`);
      const $iconSearch = wrapper.find(`.${name}__label`);
      await $iconSearch.trigger('click'); // 触发 click, 组件变成聚焦态
      expect($search.classes().includes(`${prefix}-is-focused`)).toBeTruthy();
    });

    it(': shape', async () => {
      const placeholder = 'placeholder content';
      const wrapper = mount(Search, {
        props: {
          placeholder,
          shape: ''
        }
      })
      const $form = wrapper.find(`.${name}__form`);
      const $label = wrapper.find(`.${name}__label`)
      // shape = '', 则取 'round'
      expect($form.attributes('style').includes(`border-radius: 50px;`)).toBeTruthy();
      expect($label.attributes('style').includes(`border-radius: 50px;`)).toBeTruthy();

      await wrapper.setProps({
        shape: 'square'
      });
      // shape = 'square'
      expect($form.attributes('style')).toEqual('');
      expect($label.attributes('style')).toEqual('');
    });

    it(': onActionClick', async () => {
      const value = ref('测试');
      const action = '提交';
      const onActionClick = vi.fn();
      const wrapper = mount(Search, {
        props: {
          value: value.value,
          action,
          onActionClick
        }
      })
      const $actionBtn = wrapper.findComponent(Button).find(`button`);
      await $actionBtn.trigger('click')
      expect(onActionClick).toBeCalled();
    });

    it(': onFocus', async () => {
      const value = '聚焦测试';
      let focusValue = '';
      const onFocus = vi.fn((e) => {
        focusValue = e;
      });
      const wrapper = mount(Search, {
        props: {
          value,
          onFocus,
        }
      })
      const $search = wrapper.find(`.${name}`);
      const $input = wrapper.findComponent(Input).find(`input`);

      await $input.trigger('focus');
      expect(onFocus).toBeCalled();
      expect(focusValue).toEqual(value);
      expect($search.classes().includes(`${prefix}-is-focused`)).toBeTruthy();
    });

    it(': onClear && onChange', async () => {
      const value = ref('清除测试');
      const onClear = vi.fn();
      const onChange = vi.fn((e) => {
        value.value = e
      });
      const wrapper = mount(Search, {
        props: {
          value: value.value,
          onClear,
          onChange
        }
      })
      const $search = wrapper.find(`.${name}`);
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
        }
      })
      const $search = wrapper.find(`.${name}`);
      const $input = wrapper.findComponent(Input).find(`input`);
      await $input.trigger('focus'); // 聚焦
      expect(onFocus).toBeCalled();
      await $input.trigger('blur'); // 失焦
      expect(onBlur).toBeCalled();
      expect($search.classes().includes(`${prefix}-is-focused`)).toBeFalsy();
    });
  });

  describe('slots', () => {
    it(': action', async () => {
      const action = "插槽"
      const wrapper = mount(Search, {
        slots: {
          action,
        },
      });
      // TODO: 插槽实现的 dom 结构不正确，后期另提 pr 修复
      const $search = wrapper.find(`.${name}`)
      expect($search.text()).toEqual(action);
    });
  });

  // describe('event', () => {
  //   it(': event name', () => {});
  // });
})

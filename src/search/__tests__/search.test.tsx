import { ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { CloseCircleFilledIcon as TIconClear } from 'tdesign-icons-vue-next';
import Search from '../search';

const prefix = 't';
const name = `${prefix}-search`;

describe('Search', () => {
  describe('props', () => {
    it('placeholder[string]', async () => {
      const placeholder = 'placeholder content';
      const wrapper = mount(Search, {
        props: {
          placeholder,
        },
      });
      const $input = wrapper.find('.t-input__keyword');
      expect($input.attributes('placeholder')).toEqual(placeholder);
    });

    it('shape[square/round]', async () => {
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
    it('center[boolean]', async () => {
      const wrapper = mount(Search, {
        props: {
          center: true,
        },
      });
      expect(wrapper.find(`.${name}__input-box .${name}--center`).exists()).toBeTruthy();

      const wrapper2 = mount(Search, {});
      expect(wrapper2.find(`.${name}--center`).exists()).toBeFalsy();
    });

    it('disabled[boolean]', async () => {
      const wrapper = mount(Search, {
        props: {
          disabled: true,
        },
      });
      expect(wrapper.find('input').attributes('disabled')).toBeDefined();
    });

    it('readonly[boolean]', async () => {
      const wrapper = mount(Search, {
        props: {
          readonly: true,
        },
      });
      expect(wrapper.find('input').attributes('readonly')).toBeDefined();
    });

    // maxlength 经 useLengthLimit 逻辑截断，不透传原生属性（见 search.tsx 注释），依赖输入事件
    it.todo('maxlength[number]');
    // maxcharacter 字数限制依赖输入事件截断行为
    it.todo('maxcharacter[number]');

    it('modelValue[string]', async () => {
      const value = ref('受控值');
      const wrapper = mount(() => <Search v-model={value.value} />);
      expect(wrapper.find('input').element.value).toBe('受控值');
    });

    it('defaultValue[string]', async () => {
      const wrapper = mount(Search, {
        props: {
          defaultValue: '非受控值',
        },
      });
      expect(wrapper.find('input').element.value).toBe('非受控值');
    });

    // clearTrigger 控制清空按钮出现时机，依赖 focus/clear 交互组合
    it.todo('clearTrigger[string]');
    // cursorColor 为 CSS 变量注入，jsdom 无法断言样式
    it.todo('cursorColor[string]');
    // autocompleteOptions 联想词列表依赖输入联想交互流程
    it.todo('autocompleteOptions[array]');

    it('resultList[array]', async () => {
      const resultList = ['第一个结果', '第二个结果'];
      const wrapper = mount(Search, {
        props: {
          resultList,
          value: '关键字',
        },
      });
      await wrapper.find('input').trigger('input');
      const $list = wrapper.find(`.${name}__result-list`);
      expect($list.exists()).toBeTruthy();
      expect($list.text()).toContain('第一个结果');
      expect($list.text()).toContain('第二个结果');
    });
  });

  describe('events', () => {
    it('focus', async () => {
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

    it('clear & change', async () => {
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

    it('blur', async () => {
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

    it('keypress', async () => {
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

    it('compositionend', async () => {
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

    it('actionClick', async () => {
      const onActionClick = vi.fn();
      const wrapper = mount(Search, {
        props: {
          value: 'test',
          action: '取消',
          onActionClick,
        },
      });
      const $input = wrapper.find(`input`);
      await $input.trigger('focus');

      const $action = wrapper.find(`.${name}__search-action`);
      await $action.trigger('click');
      expect(onActionClick).toBeCalled();
    });
  });

  describe('slots', () => {
    it('action[slot]', async () => {
      const action = '插槽';

      const wrapper = mount(Search, {
        props: {
          value: 'test',
        },
        slots: {
          action,
        },
      });
      const $input = wrapper.find(`input`);
      await $input.trigger('focus');

      const $action = wrapper.find(`.${name}__search-action`);

      expect($action.text()).toEqual(action);
    });

    it('left-icon[slot]', async () => {
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

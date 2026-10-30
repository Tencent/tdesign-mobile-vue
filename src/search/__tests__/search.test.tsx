import { ref, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { CloseCircleFilledIcon as TIconClear, SearchIcon as TSearchIcon } from 'tdesign-icons-vue-next';
import Search from '../search';

const prefix = 't';
const name = `${prefix}-search`;

describe('Search', () => {
  describe('props', () => {
    // autocompleteOptions 在 props.ts 声明但组件未消费该属性，联想词渲染逻辑未实现
    it.todo('autocompleteOptions[array]');

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

    it('clearTrigger[string]', async () => {
      // clearTrigger = 'focus'：输入框有值但未聚焦时不显示清空按钮，聚焦后显示
      const wrapper = mount(Search, {
        props: {
          value: '关键字',
          clearTrigger: 'focus',
        },
      });
      expect(wrapper.findComponent(TIconClear).exists()).toBe(false);
      // useFocus 的监听在 post-flush 挂载，先等一个 tick 再聚焦
      await nextTick();
      await wrapper.find('input').trigger('focus');
      expect(wrapper.findComponent(TIconClear).exists()).toBe(true);

      // 默认 'always'：输入框有值即显示清空按钮
      const wrapper2 = mount(Search, {
        props: {
          value: '关键字',
        },
      });
      expect(wrapper2.findComponent(TIconClear).exists()).toBe(true);
    });

    it('clearable[boolean]', async () => {
      // 默认可清空：输入框有值即显示清空按钮
      const wrapper = mount(Search, {
        props: {
          value: '关键字',
        },
      });
      expect(wrapper.findComponent(TIconClear).exists()).toBe(true);

      // clearable = false 时不渲染清空按钮
      const wrapper2 = mount(Search, {
        props: {
          value: '关键字',
          clearable: false,
        },
      });
      expect(wrapper2.findComponent(TIconClear).exists()).toBe(false);
    });

    it('cursorColor[string]', () => {
      const wrapper = mount(Search, {
        props: {
          cursorColor: '#00d362',
        },
      });
      // 以 CSS 变量注入到输入框
      expect(wrapper.find('input').attributes('style')).toContain('--td-search-cursor-color: #00d362');
    });

    it('disabled[boolean]', async () => {
      const wrapper = mount(Search, {
        props: {
          disabled: true,
        },
      });
      expect(wrapper.find('input').attributes('disabled')).toBeDefined();
    });

    it('leftIcon[string]', async () => {
      // leftIcon 默认值 'search' 渲染搜索图标
      const wrapper = mount(Search, {});
      expect(wrapper.findComponent(TSearchIcon).exists()).toBe(true);

      // 值非 'search' 时按 TNode 字符串直接渲染
      const wrapper2 = mount(Search, {
        props: {
          leftIcon: '自定义左侧图标',
        },
      });
      expect(wrapper2.find(`.${name}__input-box`).text()).toContain('自定义左侧图标');
    });

    it('leftIcon[function]', async () => {
      const wrapper = mount(Search, {
        props: {
          leftIcon: () => '函数左侧图标',
        },
      });
      expect(wrapper.find(`.${name}__input-box`).text()).toContain('函数左侧图标');
    });

    it('maxcharacter[number]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Search, {
        props: {
          maxcharacter: 5,
          onChange,
        },
      });
      const $input = wrapper.find('input');
      await $input.setValue('aaaaaa');
      await nextTick();
      // 超出 maxcharacter 的输入被截断
      expect($input.element.value).toBe('aaaaa');
      expect(onChange).toHaveBeenLastCalledWith('aaaaa', expect.objectContaining({ trigger: 'input-change' }));

      // 中文按两个字符计算，超出部分被截断
      await $input.setValue('一二三');
      await nextTick();
      expect($input.element.value).toBe('一二');
      expect(onChange).toHaveBeenLastCalledWith('一二', expect.anything());
    });

    it('maxlength[number]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Search, {
        props: {
          maxlength: 3,
          onChange,
        },
      });
      const $input = wrapper.find('input');
      await $input.setValue('abcdef');
      await nextTick();
      expect($input.element.value).toBe('abc');
      expect(onChange).toHaveBeenLastCalledWith('abc', expect.objectContaining({ trigger: 'input-change' }));
      // 不透传原生 maxlength 属性，由组件内部截断
      expect($input.attributes('maxlength')).toBeUndefined();
    });

    it('maxlength[string]', async () => {
      const wrapper = mount(Search, {
        props: {
          maxlength: '3',
        },
      });
      const $input = wrapper.find('input');
      await $input.setValue('abcdef');
      await nextTick();
      expect($input.element.value).toBe('abc');
    });

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

    it('readonly[boolean]', async () => {
      const wrapper = mount(Search, {
        props: {
          readonly: true,
        },
      });
      expect(wrapper.find('input').attributes('readonly')).toBeDefined();
    });

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
    it('action', async () => {
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

    it('left-icon', async () => {
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

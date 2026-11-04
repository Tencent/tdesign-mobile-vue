import { nextTick, ref } from 'vue';
import { mount, type VueWrapper } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { CloseCircleFilledIcon as TIconClear, SearchIcon as TSearchIcon } from 'tdesign-icons-vue-next';
import Search from '../search';

const prefix = 't';
const name = `${prefix}-search`;

const getInputElement = (wrapper: VueWrapper) => wrapper.get('input').element as HTMLInputElement;

describe('Search', () => {
  describe('props', () => {
    it('action[string]', () => {
      const wrapper = mount(Search, {
        props: {
          action: '取消',
        },
      });
      const $action = wrapper.find(`.${name}__search-action`);
      expect($action.exists()).toBeTruthy();
      expect($action.text()).toBe('取消');

      // 默认空字符串时不渲染右侧操作区域
      const wrapper2 = mount(Search, {});
      expect(wrapper2.find(`.${name}__search-action`).exists()).toBeFalsy();
    });

    it('action[function]', () => {
      const wrapper = mount(Search, {
        props: {
          action: () => <span class="custom-action">取消</span>,
        },
      });
      const $action = wrapper.find(`.${name}__search-action`);
      expect($action.exists()).toBeTruthy();
      expect($action.find('.custom-action').text()).toBe('取消');
    });

    it('action[slot]', () => {
      const wrapper = mount(Search, {
        slots: {
          action: () => <span class="slot-action">插槽操作</span>,
        },
      });
      const $action = wrapper.find(`.${name}__search-action`);
      expect($action.exists()).toBeTruthy();
      expect($action.find('.slot-action').text()).toBe('插槽操作');
    });

    // autocompleteOptions 在 props.ts 声明但组件源码未消费该属性，联想词渲染逻辑未实现
    it.todo('autocompleteOptions[array]');

    it('center[boolean]', () => {
      const wrapper = mount(Search, {
        props: {
          center: true,
        },
      });
      expect(wrapper.find(`.${name}__input-box .${name}--center`).exists()).toBeTruthy();

      const wrapper2 = mount(Search, {});
      expect(wrapper2.find(`.${name}--center`).exists()).toBeFalsy();
    });

    it('clearTrigger[always/focus]', async () => {
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

    it('clearable[boolean]', () => {
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

    it('disabled[boolean]', () => {
      const wrapper = mount(Search, {
        props: {
          disabled: true,
          value: '关键字',
        },
      });
      expect(wrapper.find('input').attributes('disabled')).toBeDefined();
      // 禁用时不渲染清空按钮
      expect(wrapper.findComponent(TIconClear).exists()).toBeFalsy();
    });

    it('focus[boolean]', () => {
      const wrapper = mount(Search, {
        props: {
          focus: true,
        },
      });
      // focus 透传为原生 autofocus 属性，由浏览器聚焦输入框
      expect(getInputElement(wrapper).hasAttribute('autofocus')).toBeTruthy();

      const wrapper2 = mount(Search, {});
      expect(getInputElement(wrapper2).hasAttribute('autofocus')).toBeFalsy();
    });

    it('leftIcon[string]', () => {
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

    it('leftIcon[function]', () => {
      const wrapper = mount(Search, {
        props: {
          leftIcon: () => <span class="custom-left-icon">函数左侧图标</span>,
        },
      });
      expect(wrapper.find(`.${name}__input-box .custom-left-icon`).text()).toBe('函数左侧图标');
    });

    it('leftIcon[slot]', () => {
      const wrapper = mount(Search, {
        slots: {
          leftIcon: () => <span class="slot-left-icon">插槽图标</span>,
        },
      });
      expect(wrapper.find(`.${name}__input-box .slot-left-icon`).text()).toBe('插槽图标');
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

    it('placeholder[string]', () => {
      const placeholder = 'placeholder content';
      const wrapper = mount(Search, {
        props: {
          placeholder,
        },
      });
      const $input = wrapper.find('.t-input__keyword');
      expect($input.attributes('placeholder')).toEqual(placeholder);
    });

    it('readonly[boolean]', () => {
      const wrapper = mount(Search, {
        props: {
          readonly: true,
          value: '关键字',
        },
      });
      expect(wrapper.find('input').attributes('readonly')).toBeDefined();
      // 只读时不渲染清空按钮
      expect(wrapper.findComponent(TIconClear).exists()).toBeFalsy();
    });

    it('resultList[array]', async () => {
      const resultList = ['第一个结果', '第二个结果'];
      const wrapper = mount(Search, {
        props: {
          resultList,
          value: '关键字',
        },
      });
      // 初始不显示结果列表，输入后才出现
      expect(wrapper.find(`.${name}__result-list`).exists()).toBeFalsy();
      await wrapper.find('input').trigger('input');
      const $list = wrapper.find(`.${name}__result-list`);
      expect($list.exists()).toBeTruthy();
      expect($list.text()).toContain('第一个结果');
      expect($list.text()).toContain('第二个结果');
    });

    it('shape[square/round]', async () => {
      const wrapper = mount(Search, {});
      const $inputBox = wrapper.find(`.${name}__input-box`);
      // shape 默认值取 'square'
      expect($inputBox.classes()).toContain(`${name}__input-box--square`);

      await wrapper.setProps({
        shape: 'round',
      });
      expect($inputBox.classes()).not.toContain(`${name}__input-box--square`);
      expect($inputBox.classes()).toContain(`${name}__input-box--round`);
    });

    it('value[string]', async () => {
      const wrapper = mount(Search, {
        props: {
          value: '受控值',
        },
      });
      expect(getInputElement(wrapper).value).toBe('受控值');

      // 受控模式：输入通过 update:value 通道上报，值仍由外部 value 控制
      await wrapper.find('input').setValue('新关键词');
      const emitted = wrapper.emitted('update:value');
      expect(emitted).toHaveLength(1);
      expect(emitted[0][0]).toBe('新关键词');
      await nextTick();
      expect(getInputElement(wrapper).value).toBe('受控值');
    });

    it('modelValue[string]', async () => {
      const wrapper = mount(Search, {
        props: {
          modelValue: '受控值',
        },
      });
      expect(getInputElement(wrapper).value).toBe('受控值');

      // 受控模式：输入通过 update:modelValue 通道上报，值仍由外部 modelValue 控制
      await wrapper.find('input').setValue('新值');
      const emitted = wrapper.emitted('update:modelValue');
      expect(emitted).toHaveLength(1);
      expect(emitted[0][0]).toBe('新值');
      await nextTick();
      expect(getInputElement(wrapper).value).toBe('受控值');
    });

    it('defaultValue[string]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Search, {
        props: {
          defaultValue: '非受控值',
          onChange,
        },
      });
      expect(getInputElement(wrapper).value).toBe('非受控值');

      // 非受控模式：内部自维护值并同步回输入框
      await wrapper.find('input').setValue('输入内容');
      await nextTick();
      expect(getInputElement(wrapper).value).toBe('输入内容');
      expect(onChange).toHaveBeenLastCalledWith('输入内容', expect.objectContaining({ trigger: 'input-change' }));
    });

    // enterkeyhint 由组件内部固定注入（未在 props.ts 声明），置于分组末尾
    it('enterkeyhint[string]', () => {
      const wrapper = mount(Search, {});
      expect(wrapper.find('input').attributes('enterkeyhint')).toBe('search');
    });
  });

  describe('events', () => {
    it('actionClick', async () => {
      const onActionClick = vi.fn();
      const wrapper = mount(Search, {
        props: {
          action: '取消',
          onActionClick,
        },
      });
      await wrapper.find(`.${name}__search-action`).trigger('click');
      expect(onActionClick).toHaveBeenCalledTimes(1);
      expect(onActionClick).toHaveBeenCalledWith({ e: expect.any(MouseEvent) });
    });

    it('blur', async () => {
      const onBlur = vi.fn();
      const wrapper = mount(Search, {
        props: {
          value: '失焦测试',
          onBlur,
        },
      });
      await wrapper.find('input').trigger('blur');
      expect(onBlur).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledWith({ value: '失焦测试', e: expect.any(FocusEvent) });
    });

    it('change', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Search, {
        props: {
          onChange,
        },
      });
      await wrapper.find('input').setValue('文本');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith('文本', { trigger: 'input-change', e: expect.any(Event) });
    });

    it('clear', async () => {
      const value = ref('清除测试');
      const onChange = vi.fn();
      const onClear = vi.fn();
      const wrapper = mount(() => <Search v-model={value.value} onClear={onClear} onChange={onChange} />);
      const clearIcon = wrapper.findComponent(TIconClear);
      // clearable 默认 true，输入框有值时清除图标存在
      expect(clearIcon.exists()).toBeTruthy();

      await clearIcon.trigger('click');
      expect(onClear).toHaveBeenCalledTimes(1);
      expect(onClear).toHaveBeenCalledWith({ e: expect.any(MouseEvent) });
      // 清空同时通过 change 通道上报空值
      expect(onChange).toHaveBeenCalledWith('', { trigger: 'clear', e: expect.any(MouseEvent) });
      expect(value.value).toBe('');
      expect(getInputElement(wrapper).value).toBe('');
    });

    it('focus', async () => {
      const onFocus = vi.fn();
      const wrapper = mount(Search, {
        props: {
          value: '聚焦测试',
          onFocus,
        },
      });
      await wrapper.find('input').trigger('focus');
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onFocus).toHaveBeenCalledWith({ value: '聚焦测试', e: expect.any(FocusEvent) });
    });

    // onSearch 在 props.ts 中声明，但组件源码从未调用该回调（触发场景未实现）
    it.todo('search');

    it('submit', async () => {
      const value = ref('提交测试');
      const onSubmit = vi.fn();
      const wrapper = mount(() => <Search v-model={value.value} onSubmit={onSubmit} />);
      const el = getInputElement(wrapper);
      await nextTick();

      // 非 enter 键不触发 submit
      el.dispatchEvent(new KeyboardEvent('keypress', { key: 'a', code: 'KeyA', bubbles: true, cancelable: true }));
      await nextTick();
      expect(onSubmit).not.toBeCalled();

      // 回车键触发 submit 并阻止默认行为
      const enterEvent = new KeyboardEvent('keypress', {
        key: 'Enter',
        code: 'Enter',
        bubbles: true,
        cancelable: true,
      });
      el.dispatchEvent(enterEvent);
      await nextTick();
      expect(enterEvent.defaultPrevented).toBe(true);
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith({ value: '提交测试', e: expect.any(KeyboardEvent) });
    });

    // compositionend 为原生事件透传（未在 props.ts 声明），置于分组末尾
    it('compositionend', async () => {
      const onCompositionend = vi.fn();
      const wrapper = mount(Search, {
        attrs: {
          onCompositionend,
        },
      });
      await wrapper.find('input').trigger('compositionend');
      expect(onCompositionend).toBeCalled();
    });
  });

  describe('scenarios', () => {
    describe('result list', () => {
      it('selecting an option updates the value and closes the list', async () => {
        const value = ref('关键字');
        const resultList = ['关键字一', '关键字二'];
        const onChange = vi.fn();
        const wrapper = mount(() => <Search v-model={value.value} resultList={resultList} onChange={onChange} />);
        await wrapper.find('input').trigger('input');
        expect(wrapper.find(`.${name}__result-list`).exists()).toBeTruthy();

        await wrapper.findAll(`.${name}__result-item`)[1].trigger('click');
        expect(value.value).toBe('关键字二');
        expect(onChange).toHaveBeenCalledWith('关键字二', {
          trigger: 'option-click',
          e: expect.any(MouseEvent),
        });
        // 选择联想词后关闭结果列表
        expect(wrapper.find(`.${name}__result-list`).exists()).toBeFalsy();
      });

      it('matching keyword is highlighted in result items', async () => {
        const wrapper = mount(Search, {
          props: {
            modelValue: '关键字',
            resultList: ['关键字一', '其他结果'],
          },
        });
        await wrapper.find('input').trigger('input');
        const $highlights = wrapper.findAll(`.${name}__result-item--highLight`);
        // 仅命中关键字的结果项渲染高亮节点
        expect($highlights).toHaveLength(1);
        expect($highlights[0].text()).toBe('关键字');
      });
    });

    describe('IME composition', () => {
      it('composition input does not commit the value', async () => {
        const value = ref('');
        const onChange = vi.fn();
        const wrapper = mount(() => <Search v-model={value.value} onChange={onChange} />);
        const el = getInputElement(wrapper);
        el.value = '拼音';
        el.dispatchEvent(new InputEvent('input', { inputType: 'insertCompositionText', data: '拼音', bubbles: true }));
        await nextTick();
        // 输入法组合期间不提交值
        expect(onChange).not.toBeCalled();
        expect(value.value).toBe('');

        // compositionend 后提交组合输入结果（组件在 nextTick 会把输入框重置为未提交的值，需先恢复拼音）
        el.value = '拼音';
        el.dispatchEvent(new CompositionEvent('compositionend', { bubbles: true }));
        await nextTick();
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith('拼音', { trigger: 'input-change', e: expect.any(Event) });
        expect(value.value).toBe('拼音');
      });
    });

    describe('form context', () => {
      it('form disabled state disables the search input', async () => {
        const disabled = ref(true);
        const wrapper = mount(Search, {
          props: {
            value: '关键字',
          },
          global: {
            provide: {
              formDisabled: { disabled },
            },
          },
        });
        expect(wrapper.find('input').attributes('disabled')).toBeDefined();
        // 表单禁用时同样不渲染清空按钮
        expect(wrapper.findComponent(TIconClear).exists()).toBeFalsy();

        disabled.value = false;
        await nextTick();
        expect(wrapper.find('input').attributes('disabled')).toBeUndefined();
        expect(wrapper.findComponent(TIconClear).exists()).toBeTruthy();
      });

      it('search disabled takes priority over form disabled', async () => {
        const disabled = ref(true);
        const wrapper = mount(Search, {
          props: {
            disabled: false,
          },
          global: {
            provide: {
              formDisabled: { disabled },
            },
          },
        });
        // Search.disabled = false 优先于 Form.disabled = true
        expect(wrapper.find('input').attributes('disabled')).toBeUndefined();

        await wrapper.setProps({ disabled: true });
        expect(wrapper.find('input').attributes('disabled')).toBeDefined();
      });

      it('form readonly state makes the input readonly', () => {
        const readonly = ref(true);
        const wrapper = mount(Search, {
          props: {
            value: '关键字',
          },
          global: {
            provide: {
              formReadonly: { readonly },
            },
          },
        });
        expect(wrapper.find('input').attributes('readonly')).toBeDefined();
        // 表单只读时同样不渲染清空按钮
        expect(wrapper.findComponent(TIconClear).exists()).toBeFalsy();
      });
    });

    describe('render priority', () => {
      it('leftIcon slot overrides the default search icon', () => {
        const wrapper = mount(Search, {
          slots: {
            leftIcon: () => <span class="slot-left-icon">插槽图标</span>,
          },
        });
        expect(wrapper.find('.slot-left-icon').exists()).toBeTruthy();
        expect(wrapper.findComponent(TSearchIcon).exists()).toBeFalsy();
      });

      it('leftIcon prop takes priority over leftIcon slot', () => {
        const wrapper = mount(Search, {
          props: {
            leftIcon: '属性图标',
          },
          slots: {
            leftIcon: () => <span class="slot-left-icon">插槽图标</span>,
          },
        });
        expect(wrapper.find(`.${name}__input-box`).text()).toContain('属性图标');
        expect(wrapper.find('.slot-left-icon').exists()).toBeFalsy();
      });

      it('action prop takes priority over action slot', () => {
        const wrapper = mount(Search, {
          props: {
            action: '属性操作',
          },
          slots: {
            action: () => <span class="slot-action">插槽操作</span>,
          },
        });
        const $action = wrapper.find(`.${name}__search-action`);
        expect($action.exists()).toBeTruthy();
        expect($action.text()).toBe('属性操作');
        expect(wrapper.find('.slot-action').exists()).toBeFalsy();
      });

      it('controlled value takes precedence over defaultValue', () => {
        const wrapper = mount(Search, {
          props: {
            value: '受控值',
            defaultValue: '非受控值',
          },
        });
        expect(getInputElement(wrapper).value).toBe('受控值');
      });
    });
  });
});

import { nextTick, ref } from 'vue';
import { mount, type VueWrapper } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { CloseCircleFilledIcon, InfoCircleFilledIcon, AppIcon } from 'tdesign-icons-vue-next';
import Input from '../input';
import type { TdInputProps } from '../type';

const prefix = 't';
const name = `${prefix}-input`;

const simulateEvent = (target: HTMLInputElement, text: string, event: string) => {
  target.value = text;
  target.dispatchEvent(new Event(event));
};

const focusInput = (wrapper: VueWrapper) => (wrapper.vm as unknown as { focus: () => void }).focus();
const getInputElement = (wrapper: VueWrapper) => wrapper.get('input').element as HTMLInputElement;
describe('Input', () => {
  describe('props', () => {
    it('align[left/center/right]', async () => {
      const alignList: TdInputProps['align'][] = ['left', 'center', 'right'];
      alignList.forEach((align) => {
        const tips = 'tips';
        const wrapper = mount(<Input label="标题" align={align} tips={tips} />);
        const $tips = wrapper.find('.t-input__tips');
        const control = wrapper.find(`.t-input__control`);

        if (align && align !== 'left') {
          expect(control.classes()).toContain(`t-input--${align}`);
        } else {
          // 默认 left 不额外添加对齐修饰类
          expect(control.classes()).not.toContain(`t-input--center`);
          expect(control.classes()).not.toContain(`t-input--right`);
        }

        expect($tips.classes()).contain(`t-input--${align}`);
      });
    });

    it('allowInputOverMax[boolean]', async () => {
      // 默认超限输入被截断
      const value = ref('');
      const wrapper = mount(<Input v-model={value.value} maxlength={5} />);
      const el = getInputElement(wrapper);
      await simulateEvent(el, '12345678', 'input');
      expect(value.value).toBe('12345');

      // allowInputOverMax 允许保留超限输入
      const overMaxValue = ref('');
      const overMaxWrapper = mount(<Input v-model={overMaxValue.value} maxlength={5} allowInputOverMax />);
      const overMaxEl = getInputElement(overMaxWrapper);
      await simulateEvent(overMaxEl, '12345678', 'input');
      expect(overMaxValue.value).toBe('12345678');
    });

    it('autocomplete[string]', async () => {
      const wrapper = mount(<Input label="标题" autocomplete="on" />);
      const input = wrapper.find('.t-input__wrap input');
      expect(input.element.getAttribute('autocomplete')).toBe('On');

      // 未设置时输出 Off
      const wrapper2 = mount(<Input label="标题" />);
      expect(wrapper2.find('.t-input__wrap input').element.getAttribute('autocomplete')).toBe('Off');
    });

    it('autofocus[boolean]', async () => {
      const value = ref('123');
      const wrapper = mount(<Input label="标题" v-model={value.value} clearable clearTrigger="focus" autofocus />);
      const input = wrapper.find('.t-input__wrap input');
      expect(input.element.hasAttribute('autofocus')).toBeTruthy();

      // 模拟浏览器因 autofocus 属性而聚焦
      await input.trigger('focus');
      expect(wrapper.find('.t-icon-close-circle-filled').exists()).toBeTruthy();
    });

    it('borderless[boolean]', async () => {
      const wrapper = mount(<Input />);
      expect(wrapper.find('.t-input--border').exists()).toBeTruthy();

      const wrapper2 = mount(<Input borderless />);
      expect(wrapper2.find('.t-input--border').exists()).toBeFalsy();
    });

    it('clearTrigger[always]', async () => {
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

    it('clearTrigger[always] & disabled[boolean]', async () => {
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

    it('clearTrigger[always] & readonly[boolean]', async () => {
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

    it('clearTrigger[focus]', async () => {
      const value = ref('123');
      const handleClear = vi.fn();
      const wrapper = mount(
        <Input label="标题" v-model={value.value} clearable clearTrigger="focus" onClear={handleClear} />,
      );
      expect(wrapper.find('.t-icon-close-circle-filled').exists()).toBeFalsy();
      focusInput(wrapper);
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-icon-close-circle-filled').exists()).toBeTruthy();

      await wrapper.find('.t-icon-close-circle-filled').trigger('touchend');
      expect(value.value).toBe('');
      expect(handleClear).toBeCalled();
    });

    it('clearTrigger[focus] & disabled[boolean]', async () => {
      const value = ref('123');
      const handleClear = vi.fn();
      const wrapper = mount(
        <Input label="标题" v-model={value.value} disabled clearable clearTrigger="focus" onClear={handleClear} />,
      );
      expect(wrapper.find('.t-icon-close-circle-filled').exists()).toBeFalsy();
      focusInput(wrapper);
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-icon-close-circle-filled').exists()).toBeFalsy();
      await wrapper.setProps({
        disabled: false,
      });
      focusInput(wrapper);
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-icon-close-circle-filled').exists()).toBeTruthy();
    });

    it('clearTrigger[focus] & readonly[boolean]', async () => {
      const value = ref('123');
      const handleClear = vi.fn();
      const wrapper = mount(
        <Input label="标题" v-model={value.value} readonly clearable clearTrigger="focus" onClear={handleClear} />,
      );
      expect(wrapper.find('.t-icon-close-circle-filled').exists()).toBeFalsy();
      focusInput(wrapper);
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-icon-close-circle-filled').exists()).toBeFalsy();
      await wrapper.setProps({
        readonly: false,
      });
      focusInput(wrapper);
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-icon-close-circle-filled').exists()).toBeTruthy();
    });

    it('clearable[boolean]', async () => {
      const value = ref('123');
      const handleClear = vi.fn();
      const wrapper = mount(<Input label="标题" v-model={value.value} clearable onClear={handleClear} />);
      const closeIcon = wrapper.findComponent(CloseCircleFilledIcon);
      expect(closeIcon.exists()).toBeTruthy();
      await closeIcon.trigger('touchend');
      expect(value.value).toBe('');
      expect(handleClear).toBeCalled();
    });

    it('cursorColor[string]', async () => {
      const wrapper = mount(<Input cursorColor="red" />);
      const input = wrapper.find('.t-input__wrap input');
      // 光标颜色以内联 CSS 变量注入到原生 input
      expect(input.attributes('style')).toContain('--td-input-cursor-color: red');
    });

    it('disabled[boolean]', async () => {
      const value = ref('123');
      const wrapper = mount(<Input label="标题" v-model={value.value} disabled />);
      const label = wrapper.find('.t-input__control');
      expect(label.classes()).toContain('t-input__control--disabled');
      const input = wrapper.find('.t-input__wrap input');
      expect(input.element.hasAttribute('disabled')).toBeTruthy();
    });

    it('enterkeyhint[enter/done/go/next/previous/search/send]', async () => {
      const wrapper = mount(<Input enterkeyhint="search" />);
      expect(wrapper.find('input').attributes('enterkeyhint')).toBe('search');
    });

    it('extra[function]', async () => {
      const wrapper = mount(<Input extra={() => <div class="custom-extra">额外内容</div>} />);
      expect(wrapper.find('.custom-extra').exists()).toBeTruthy();
    });

    it('format[function]', async () => {
      const value = ref('abc');
      const onChange = vi.fn();
      const format: TdInputProps['format'] = (val) => String(val).toUpperCase();
      const wrapper = mount(<Input label="标题" v-model={value.value} format={format} onChange={onChange} />);
      const input = wrapper.find('.t-input__wrap input');
      await input.trigger('blur');
      // 失焦时按 format 格式化并回写值
      expect(onChange).toHaveBeenCalledWith('ABC');
      expect(value.value).toBe('ABC');
    });

    it('label[string]', async () => {
      const wrapper = mount(<Input label="标题" />);
      const label = wrapper.find('.t-input__label');
      expect(label.exists()).toBeTruthy();
      expect(label.text()).toBe('标题');
    });

    it('label[function]', async () => {
      const wrapper = mount(<Input label={() => '函数标题'} />);
      const label = wrapper.find('.t-input__label');
      expect(label.exists()).toBeTruthy();
      expect(label.text()).toBe('函数标题');
    });

    it('layout[vertical/horizontal]', async () => {
      const layoutList: TdInputProps['layout'][] = ['vertical', 'horizontal'];
      layoutList.forEach((layout, index) => {
        const wrapper = mount(() => <Input label="标题" layout={layout} />);
        if (layout) {
          expect(wrapper.classes()).toContain(`t-input--layout-${layout}`);
        }
      });
    });

    it('maxcharacter[number]', async () => {
      const value = ref('');
      const maxcharacter = 2;
      const onChange = vi.fn();
      const wrapper = mount(<Input v-model={value.value} maxcharacter={maxcharacter} onChange={onChange} />);
      const el = getInputElement(wrapper);
      await simulateEvent(el, '一个汉字等于两个字符，超出会被剪切', 'input');
      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith('一');
    });

    it('maxlength[number]', async () => {
      const value = ref('');
      const wrapper = mount(<Input label="标题" v-model={value.value} maxlength={10} />);
      const input = wrapper.find('.t-input__wrap input');
      expect(input.element.getAttribute('maxlength')).toBe(null);
    });

    it('name[string]', async () => {
      const wrapper = mount(<Input label="标题" name="username" />);
      const input = wrapper.find('.t-input__wrap input');
      // name 透传给原生 input 元素
      expect(input.attributes('name')).toBe('username');
    });

    it('placeholder[string]', async () => {
      const wrapper = mount(<Input placeholder="请输入" />);
      const input = wrapper.find('.t-input__wrap input');
      expect(input.attributes('placeholder')).toBe('请输入');
    });

    it('prefixIcon[function]', async () => {
      const wrapper = mount(<Input label="标题" prefixIcon={() => <AppIcon />} />);
      expect(wrapper.find('.t-input__icon--prefix svg').exists()).toBeTruthy();
      expect(wrapper.findComponent(AppIcon).exists()).toBeTruthy();
    });

    it('readonly[boolean]', async () => {
      const value = ref('123');
      const wrapper = mount(<Input label="标题" v-model={value.value} readonly />);
      const input = wrapper.find('.t-input__wrap input');
      expect(input.element.hasAttribute('readonly')).toBeTruthy();
    });

    it('spellCheck[boolean]', async () => {
      const wrapper = mount(<Input spellCheck />);
      expect(wrapper.find('input').attributes('spellcheck')).toBe('true');

      // 默认关闭拼写检查
      const wrapper2 = mount(<Input />);
      expect(wrapper2.find('input').attributes('spellcheck')).toBe('false');
    });

    it('status[default/success/warning/error]', async () => {
      const statusList: TdInputProps['status'][] = ['default', 'success', 'warning', 'error'];
      statusList.forEach((status) => {
        const wrapper = mount(<Input status={status} />);
        expect(wrapper.get('.t-input__control').classes()).toContain(`t-input--${status}`);
      });
    });

    it('suffix[string]', async () => {
      const wrapper = mount(<Input label="标题" suffix="个/元" />);
      const suffix = wrapper.find(`.${name}__wrap--suffix`);
      expect(suffix.exists()).toBeTruthy();
      expect(suffix.text()).toBe('个/元');
    });

    it('suffix[function]', async () => {
      const wrapper = mount(<Input label="标题" suffix={() => <span class="custom-suffix">后置内容</span>} />);
      const suffix = wrapper.find(`.${name}__wrap--suffix`);
      expect(suffix.exists()).toBeTruthy();
      expect(suffix.find('.custom-suffix').text()).toBe('后置内容');
    });

    it('suffixIcon[function]', async () => {
      const wrapper = mount(<Input label="标题" suffixIcon={() => <AppIcon />} />);
      expect(wrapper.find('.t-input__wrap--suffix-icon svg').exists()).toBeTruthy();
      expect(wrapper.findComponent(AppIcon).exists()).toBeTruthy();
      // type=password 时的浏览图标优先于自定义 suffixIcon
      const password = mount(<Input type="password" suffixIcon={() => <AppIcon />} />);
      expect(password.find('.t-icon-browse-off').exists()).toBeTruthy();
      expect(password.findComponent(AppIcon).exists()).toBeFalsy();
    });

    it('tips[string]', async () => {
      const wrapper = mount(<Input label="标题" tips="错误信息" />);
      const $tips = wrapper.find('.t-input__tips');
      expect($tips.exists()).toBeTruthy();
      expect($tips.text()).toBe('错误信息');
    });

    it('tips[function]', async () => {
      const wrapper = mount(<Input label="标题" tips={() => '函数错误信息'} />);
      const $tips = wrapper.find('.t-input__tips');
      expect($tips.exists()).toBeTruthy();
      expect($tips.text()).toBe('函数错误信息');
    });

    it('type[number]', async () => {
      const wrapper = mount(<Input label="标题" type="number" />);
      const input = wrapper.find('.t-input__wrap input');
      expect(input.element.getAttribute('type')).toBe('number');
    });

    it('type[password]', async () => {
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

    it('type[password] & disabled[boolean]', async () => {
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

    it('value[string]', async () => {
      const value = ref('123');
      const wrapper = mount(<Input v-model:value={value.value} />);
      const el = getInputElement(wrapper);
      expect(el.value).toBe('123');

      // 输入后通过 update:value 通道回写受控值
      await simulateEvent(el, '文本', 'input');
      expect(wrapper.emitted('update:value')).toEqual([['文本']]);
      expect(value.value).toBe('文本');
    });

    it('value[number]', async () => {
      const value = ref(123);
      const wrapper = mount(<Input v-model:value={value.value} />);
      const el = getInputElement(wrapper);
      expect(el.value).toBe('123');

      await simulateEvent(el, '456', 'input');
      // 输入事件返回字符串值（初始数字值仅用于初始渲染）
      expect(wrapper.emitted('update:value')).toEqual([['456']]);
      expect(value.value).toBe('456');
    });

    it('modelValue[string]', async () => {
      const value = ref('123');
      const wrapper = mount(<Input v-model={value.value} />);
      const el = getInputElement(wrapper);
      expect(el.value).toBe('123');

      await simulateEvent(el, '文本', 'input');
      expect(wrapper.emitted('update:modelValue')).toEqual([['文本']]);
      expect(value.value).toBe('文本');
    });

    it('modelValue[number]', async () => {
      const value = ref(123);
      const wrapper = mount(<Input v-model={value.value} />);
      const el = getInputElement(wrapper);
      expect(el.value).toBe('123');

      await simulateEvent(el, '456', 'input');
      // 输入事件返回字符串值（初始数字值仅用于初始渲染）
      expect(wrapper.emitted('update:modelValue')).toEqual([['456']]);
      expect(value.value).toBe('456');
    });

    it('defaultValue[string]', async () => {
      const wrapper = mount(<Input defaultValue="默认值" />);
      expect(getInputElement(wrapper).value).toBe('默认值');
    });

    it('defaultValue[number]', async () => {
      const wrapper = mount(<Input defaultValue={123} />);
      expect(getInputElement(wrapper).value).toBe('123');
    });

    // pattern / inputmode 在组件内部声明（不在 props.ts），置于分组末尾
    it('pattern[string]', async () => {
      const wrapper = mount(<Input pattern="[0-9]*" />);
      expect(wrapper.find('input').attributes('pattern')).toBe('[0-9]*');
    });

    it('inputmode[search/text/none/url/tel/email/numeric/decimal]', async () => {
      const inputmodeList = ['search', 'text', 'none', 'url', 'tel', 'email', 'numeric', 'decimal'] as const;
      inputmodeList.forEach((inputmode) => {
        const wrapper = mount(<Input inputmode={inputmode} />);
        expect(wrapper.get('input').attributes('inputmode')).toBe(inputmode);
      });
    });
  });
  describe('events', () => {
    it('focus & blur', async () => {
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

      inputRef.value?.focus(); // 调用 focus 方法, 实现聚焦
      await nextTick();

      await input.trigger('blur'); // 模拟触发 blur
      expect(onBlur).toBeCalledTimes(1);

      await input.trigger('focus'); // 模拟触发 focus
      expect(onFocus).toBeCalledTimes(1);

      inputRef.value?.blur(); // 调用 blur 方法，实现失焦
      await nextTick();
    });

    it('compositionend', async () => {
      const onCompositionend = vi.fn();
      // onCompositionend 属原生事件透传，通过非字面量 props 规避 JSX 类型检查
      const props = { label: '标题', onCompositionend };
      const wrapper = mount(<Input {...props} />);
      const $input = wrapper.find('input');
      await $input.trigger('compositionend');
      expect(onCompositionend).toBeCalled();
    });

    it('blur', async () => {
      const value = ref('初始值');
      const onBlur = vi.fn();
      const wrapper = mount(<Input label="标题" v-model={value.value} onBlur={onBlur} />);
      await nextTick();
      const input = wrapper.find('.t-input__wrap input');
      await input.trigger('blur');
      expect(onBlur).toBeCalledTimes(1);
      expect(onBlur).toHaveBeenCalledWith('初始值', { e: expect.any(FocusEvent) });
    });

    it('focus', async () => {
      const value = ref('初始值');
      const onFocus = vi.fn();
      const wrapper = mount(<Input label="标题" v-model={value.value} onFocus={onFocus} />);
      const input = wrapper.find('.t-input__wrap input');
      await input.trigger('focus');
      expect(onFocus).toBeCalledTimes(1);
      expect(onFocus).toHaveBeenCalledWith('初始值', { e: expect.any(FocusEvent) });
    });

    it('change', async () => {
      const value = ref('');
      const onChange = vi.fn();
      const wrapper = mount(<Input label="标题" v-model={value.value} onChange={onChange} />);
      await simulateEvent(getInputElement(wrapper), '文本', 'input');
      expect(onChange).toBeCalledTimes(1);
      // 组件调用 onChange 时未透传 context（类型声明的 trigger/e 缺失）
      expect(onChange).toHaveBeenCalledWith('文本');
    });

    it('clear', async () => {
      const value = ref('123');
      const onClear = vi.fn();
      const onChange = vi.fn();
      const wrapper = mount(
        <Input label="标题" v-model={value.value} clearable onClear={onClear} onChange={onChange} />,
      );
      await wrapper.find('.t-icon-close-circle-filled').trigger('touchend');
      expect(onClear).toBeCalledTimes(1);
      expect(onClear).toHaveBeenCalledWith({ e: expect.any(TouchEvent) });
      // 清空仅回调新值，类型声明的 trigger/e 上下文未透传
      expect(onChange).toHaveBeenCalledWith('');
      expect(value.value).toBe('');
    });

    it('validate', async () => {
      // 初值即超限：挂载后立即触发校验提醒（输入默认被截断，需 allowInputOverMax 保留超限值）
      const onValidate = vi.fn();
      mount(<Input modelValue="12345678" maxlength={5} allowInputOverMax onValidate={onValidate} />);
      expect(onValidate).toBeCalledTimes(1);
      expect(onValidate).toHaveBeenCalledWith({ error: 'exceed-maximum' });

      // 受控值更新为超限后触发
      const onUpdateValidate = vi.fn();
      const wrapper = mount(<Input modelValue="" maxlength={5} allowInputOverMax onValidate={onUpdateValidate} />);
      await wrapper.setProps({ modelValue: '12345678' });
      await nextTick();
      expect(onUpdateValidate).toBeCalledTimes(1);
      expect(onUpdateValidate).toHaveBeenCalledWith({ error: 'exceed-maximum' });

      // maxcharacter 超限同样触发
      const onCharacterValidate = vi.fn();
      const characterWrapper = mount(
        <Input modelValue="" maxcharacter={2} allowInputOverMax onValidate={onCharacterValidate} />,
      );
      await characterWrapper.setProps({ modelValue: '三个字符' });
      await nextTick();
      expect(onCharacterValidate).toBeCalledTimes(1);
      expect(onCharacterValidate).toHaveBeenCalledWith({ error: 'exceed-maximum' });
    });
  });

  describe('slots', () => {
    it('label', async () => {
      const wrapper = mount(<Input v-slots={{ label: () => <span class="slot-label">插槽标签</span> }} />);
      expect(wrapper.get('.t-input__label .slot-label').text()).toBe('插槽标签');
    });

    it('tips', async () => {
      const wrapper = mount(<Input v-slots={{ tips: () => <span class="slot-tips">插槽提示</span> }} />);
      expect(wrapper.get('.t-input__tips .slot-tips').text()).toBe('插槽提示');
    });

    it('suffix', async () => {
      const wrapper = mount(<Input v-slots={{ suffix: () => <span class="slot-suffix">插槽后缀</span> }} />);
      expect(wrapper.get(`.${name}__wrap--suffix .slot-suffix`).text()).toBe('插槽后缀');
    });

    it('extra', async () => {
      const wrapper = mount(<Input v-slots={{ extra: () => <span class="slot-extra">插槽额外</span> }} />);
      expect(wrapper.get('.slot-extra').text()).toBe('插槽额外');
    });

    it('prefixIcon & suffixIcon', async () => {
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

  describe('scenarios', () => {
    it('label prop takes priority over label slot', async () => {
      const wrapper = mount(
        <Input label="属性标签" v-slots={{ label: () => <span class="slot-label">插槽标签</span> }} />,
      );
      expect(wrapper.get('.t-input__label').text()).toBe('属性标签');
      expect(wrapper.find('.slot-label').exists()).toBeFalsy();
    });

    it('suffix prop takes priority over suffix slot', async () => {
      const wrapper = mount(
        <Input suffix="属性后缀" v-slots={{ suffix: () => <span class="slot-suffix">插槽后缀</span> }} />,
      );
      expect(wrapper.get(`.${name}__wrap--suffix`).text()).toBe('属性后缀');
      expect(wrapper.find('.slot-suffix').exists()).toBeFalsy();
    });

    it('prefixIcon prop takes priority over prefixIcon slot', async () => {
      const wrapper = mount(
        <Input prefixIcon={() => <AppIcon />} v-slots={{ prefixIcon: () => <InfoCircleFilledIcon /> }} />,
      );
      expect(wrapper.findComponent(AppIcon).exists()).toBeTruthy();
      expect(wrapper.findComponent(InfoCircleFilledIcon).exists()).toBeFalsy();
    });

    it('composition input does not commit the value', async () => {
      const value = ref('');
      const onChange = vi.fn();
      const wrapper = mount(<Input v-model={value.value} onChange={onChange} />);
      const el = getInputElement(wrapper);
      el.value = '拼音';
      el.dispatchEvent(new InputEvent('input', { inputType: 'insertCompositionText', data: '拼音', bubbles: true }));
      await nextTick();
      expect(onChange).not.toBeCalled();
      expect(value.value).toBe('');

      // compositionend 后提交组合输入结果
      await simulateEvent(el, '拼音', 'compositionend');
      expect(onChange).toBeCalledTimes(1);
      expect(value.value).toBe('拼音');
    });

    it('clearing a number input sets the value to undefined', async () => {
      const value = ref(123);
      const onChange = vi.fn();
      const wrapper = mount(<Input type="number" v-model={value.value} clearable onChange={onChange} />);
      await wrapper.find('.t-icon-close-circle-filled').trigger('touchend');
      // 数字类型清空置为 undefined
      expect(onChange).toHaveBeenCalledWith(undefined);
      expect(value.value).toBeUndefined();
    });

    it('maxlength and maxcharacter together logs a warning', async () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      try {
        mount(<Input maxlength={5} maxcharacter={2} />);
        expect(warn).toHaveBeenCalledWith('TDesign Input Warn: Pick one of maxlength and maxcharacter please.');
      } finally {
        warn.mockRestore();
      }
    });

    // TdInputProps.onChange 声明了 context（trigger/e），组件调用时未透传。
    it.todo('change context includes trigger and event');
  });
});

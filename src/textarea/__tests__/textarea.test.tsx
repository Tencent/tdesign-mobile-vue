import { nextTick, ref } from 'vue';
import { enableAutoUnmount, mount, type VueWrapper } from '@vue/test-utils';
import { afterEach, describe, it, expect, vi } from 'vitest';
import Textarea from '../textarea';
import { simulateInputEvent as simulateEvent } from '../../../test/utils/input';

const getTextarea = (wrapper: VueWrapper) => wrapper.get('textarea').element as HTMLTextAreaElement;

// jsdom 中 scrollHeight 恒为 0，mock 为随内容行数增长的高度：
// 空内容单行 24px（含 jsdom 默认的 4px 上下 padding），非空内容每 10 个字符折一行、每行 20px
const mockScrollHeight = () =>
  vi.spyOn(Element.prototype, 'scrollHeight', 'get').mockImplementation(function (this: Element) {
    const value = (this as HTMLTextAreaElement).value || '';
    if (!value) return 24;
    return Math.ceil(value.length / 10) * 20 + 4;
  });

enableAutoUnmount(afterEach);

describe('Textarea', () => {
  describe('props', () => {
    it('allowInputOverMax[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(<Textarea label="标题" maxlength={5} allowInputOverMax indicator onChange={onChange} />);
      const el = getTextarea(wrapper);
      await simulateEvent(el, '12345678', 'input');
      // 超出 maxlength 后仍保留全部输入
      expect(onChange).toHaveBeenLastCalledWith('12345678');
      await nextTick();
      expect(el.value).toBe('12345678');
      // 计数器按实际长度显示，可超过上限
      expect(wrapper.get('.t-textarea__indicator').text()).toContain('8/5');
    });

    it('autofocus[boolean]', async () => {
      const onFocus = vi.fn();
      const wrapper = mount(<Textarea autofocus onFocus={onFocus} />);
      const textarea = wrapper.get('textarea');
      expect(textarea.element.hasAttribute('autofocus')).toBeTruthy();

      // 模拟浏览器因 autofocus 属性而聚焦
      await textarea.trigger('focus');
      expect(onFocus).toBeCalled();
    });

    it('autosize[boolean]', async () => {
      const scrollHeight = mockScrollHeight();
      try {
        const value = ref('');
        const wrapper = mount(<Textarea v-model={value.value} autosize />);
        const el = getTextarea(wrapper);
        await nextTick();
        // 空内容时高度为单行内容高度
        expect(el.style.minHeight).toBe('20px');
        expect(el.style.height).toBe('24px');

        // 输入多行文本后高度自动撑开
        await simulateEvent(el, 'a'.repeat(25), 'input');
        expect(el.style.height).toBe('64px');

        // 关闭 autosize 后高度回落为固定单行
        await wrapper.setProps({ autosize: false });
        expect(el.style.height).toBe('20px');
      } finally {
        scrollHeight.mockRestore();
      }
    });

    it('autosize[object]', async () => {
      const scrollHeight = mockScrollHeight();
      try {
        const wrapper = mount(<Textarea autosize={{ minRows: 2, maxRows: 3 }} defaultValue={'a'.repeat(25)} />);
        const el = getTextarea(wrapper);
        await nextTick();
        // minRows 撑起最小两行高度
        expect(el.style.minHeight).toBe('40px');
        // 内容超过 maxRows 时高度被限制在三行
        expect(el.style.height).toBe('60px');

        // 空内容时高度不低于 minRows
        const value = ref('');
        const minRowsWrapper = mount(<Textarea v-model={value.value} autosize={{ minRows: 2, maxRows: 3 }} />);
        await nextTick();
        expect(getTextarea(minRowsWrapper).style.height).toBe('40px');

        await wrapper.setProps({ autosize: { minRows: 4, maxRows: 5 } });
        expect(el.style.minHeight).toBe('80px');
        expect(el.style.height).toBe('80px');
        await wrapper.setProps({ autosize: true });
        expect(el.style.minHeight).toBe('20px');
        expect(el.style.height).toBe('64px');
      } finally {
        scrollHeight.mockRestore();
      }
    });

    it('bordered[boolean]', async () => {
      const wrapper = mount(<Textarea bordered />);
      expect(wrapper.find('.t-textarea--border').exists()).toBeTruthy();

      // 默认不显示外边框
      const wrapper2 = mount(<Textarea />);
      expect(wrapper2.find('.t-textarea--border').exists()).toBeFalsy();
    });

    it('cursorColor[string]', async () => {
      const wrapper = mount(<Textarea cursorColor="red" />);
      expect(wrapper.get('textarea').attributes('style')).toContain('caret-color: red');

      await wrapper.setProps({ cursorColor: 'blue' });
      expect(wrapper.get('textarea').attributes('style')).toContain('caret-color: blue');

      // 默认光标颜色
      const wrapper2 = mount(<Textarea />);
      expect(wrapper2.get('textarea').attributes('style')).toContain('caret-color: #0052d9');
    });

    it('disabled[boolean]', async () => {
      const value = ref('文本');
      const wrapper = mount(<Textarea label="标题" v-model={value.value} disabled />);
      expect(wrapper.get('.t-textarea__wrapper-inner').classes()).toContain('t-textarea--disabled');
      expect(wrapper.get('textarea').element.hasAttribute('disabled')).toBeTruthy();

      // 默认不禁用
      const wrapper2 = mount(<Textarea />);
      expect(wrapper2.get('textarea').element.hasAttribute('disabled')).toBeFalsy();
    });

    it('indicator[boolean]', async () => {
      const maxcharacter = 20;
      const wrapper = mount(<Textarea label="标题" indicator maxcharacter={maxcharacter} />);
      expect(wrapper.get('.t-textarea__indicator').text()).toBe(`0/${maxcharacter}`);

      // maxlength 同样驱动计数器
      const maxlengthWrapper = mount(<Textarea indicator maxlength={10} />);
      expect(maxlengthWrapper.get('.t-textarea__indicator').text()).toBe('0/10');

      // 未设置 maxlength 且未设置 maxcharacter 时计数器不渲染
      const noLimitWrapper = mount(<Textarea indicator />);
      expect(noLimitWrapper.find('.t-textarea__indicator').exists()).toBeFalsy();

      await wrapper.setProps({ indicator: false });
      expect(wrapper.find('.t-textarea__indicator').exists()).toBe(false);
      await wrapper.setProps({ indicator: true });
      expect(wrapper.get('.t-textarea__indicator').text()).toBe(`0/${maxcharacter}`);
    });

    it('label[string]', async () => {
      const wrapper = mount(<Textarea label="标题" />);
      const label = wrapper.get('.t-textarea__label');
      expect(label.text()).toBe('标题');
    });

    it('label[function]', async () => {
      const wrapper = mount(<Textarea label={() => <span class="custom-label">函数标题</span>} />);
      const label = wrapper.get('.t-textarea__label');
      expect(label.find('.custom-label').text()).toBe('函数标题');
    });

    it('label[slot]', async () => {
      const wrapper = mount(<Textarea v-slots={{ label: () => <span class="slot-label">插槽标签</span> }} />);
      expect(wrapper.get('.t-textarea__label .slot-label').text()).toBe('插槽标签');
    });

    it.each(['vertical', 'horizontal'] as const)('layout[%s]', (layout) => {
      const wrapper = mount(<Textarea label="标题" layout={layout} />);
      expect(wrapper.classes()).toContain(`t-textarea--layout-${layout}`);
    });

    it('layout[default and update]', async () => {
      const wrapper = mount(<Textarea />);
      expect(wrapper.classes()).toContain('t-textarea--layout-horizontal');
      await wrapper.setProps({ layout: 'vertical' });
      expect(wrapper.classes()).toContain('t-textarea--layout-vertical');
      expect(wrapper.classes()).not.toContain('t-textarea--layout-horizontal');
    });

    it('maxcharacter[number]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(<Textarea label="标题" maxcharacter={2} onChange={onChange} />);
      const el = getTextarea(wrapper);
      // 一个汉字占两个字符，超出部分被截断
      await simulateEvent(el, '一个汉字等于两个字符，超出会被剪切', 'input');
      expect(onChange).toHaveBeenLastCalledWith('一');
      await nextTick();
      expect(el.value).toBe('一');
    });

    it('maxlength[string]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(<Textarea label="标题" maxlength="5" onChange={onChange} />);
      const el = getTextarea(wrapper);
      // 字符串形式的 maxlength 与数值形式同样生效
      await simulateEvent(el, '12345678', 'input');
      expect(onChange).toHaveBeenLastCalledWith('12345');
      await nextTick();
      expect(el.value).toBe('12345');
    });

    it('maxlength[number]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(<Textarea label="标题" maxlength={5} onChange={onChange} />);
      const el = getTextarea(wrapper);
      await simulateEvent(el, '超过五个字符的文本', 'input');
      // 超出 maxlength 的输入按 unicode 长度截断
      expect(onChange).toHaveBeenLastCalledWith('超过五个字');
      await nextTick();
      expect(el.value).toBe('超过五个字');
    });

    it('name[string]', async () => {
      const wrapper = mount(<Textarea name="remark" />);
      expect(wrapper.get('textarea').attributes('name')).toBe('remark');
    });

    it('placeholder[string]', async () => {
      const wrapper = mount(<Textarea placeholder="请输入" />);
      expect(wrapper.get('textarea').attributes('placeholder')).toBe('请输入');
    });

    it('readonly[boolean]', async () => {
      const wrapper = mount(<Textarea readonly />);
      expect(wrapper.get('textarea').attributes('readonly')).toBeDefined();
      expect(wrapper.get('.t-textarea__wrapper-inner').classes()).toContain('t-textarea--readonly');

      // 默认非只读
      const wrapper2 = mount(<Textarea />);
      expect(wrapper2.get('textarea').attributes('readonly')).toBeUndefined();
    });

    it('value[string]', async () => {
      const value = ref('123');
      const wrapper = mount(<Textarea v-model:value={value.value} />);
      const el = getTextarea(wrapper);
      expect(el.value).toBe('123');

      // 输入后通过 update:value 通道回写受控值（挂载时会先同步一次初始值）
      await simulateEvent(el, '文本', 'input');
      expect(wrapper.emitted('update:value')).toEqual([['123'], ['文本']]);
      expect(value.value).toBe('文本');
    });

    it('value[number]', async () => {
      const value = ref(123);
      const wrapper = mount(<Textarea v-model:value={value.value} />);
      const el = getTextarea(wrapper);
      expect(el.value).toBe('123');

      await simulateEvent(el, '456', 'input');
      // 输入事件返回字符串值（初始数字值仅用于初始渲染）
      expect(wrapper.emitted('update:value')).toEqual([['123'], ['456']]);
      expect(value.value).toBe('456');
    });

    it('modelValue[string]', async () => {
      const value = ref('123');
      const wrapper = mount(<Textarea v-model={value.value} />);
      const el = getTextarea(wrapper);
      expect(el.value).toBe('123');

      await simulateEvent(el, '文本', 'input');
      expect(wrapper.emitted('update:modelValue')).toEqual([['123'], ['文本']]);
      expect(value.value).toBe('文本');
    });

    it('modelValue[number]', async () => {
      const value = ref(123);
      const wrapper = mount(<Textarea v-model={value.value} />);
      const el = getTextarea(wrapper);
      expect(el.value).toBe('123');

      await simulateEvent(el, '456', 'input');
      // 输入事件返回字符串值（初始数字值仅用于初始渲染）
      expect(wrapper.emitted('update:modelValue')).toEqual([['123'], ['456']]);
      expect(value.value).toBe('456');
    });

    it('defaultValue[string]', async () => {
      const wrapper = mount(<Textarea defaultValue="默认文本" />);
      expect(getTextarea(wrapper).value).toBe('默认文本');
    });

    it('defaultValue[number]', async () => {
      const wrapper = mount(<Textarea defaultValue={123} />);
      expect(getTextarea(wrapper).value).toBe('123');
    });
  });

  describe('events', () => {
    it('blur', async () => {
      const onBlur = vi.fn();
      const wrapper = mount(<Textarea label="标题" defaultValue="初始值" onBlur={onBlur} />);
      await wrapper.get('textarea').trigger('blur');
      expect(onBlur).toBeCalledTimes(1);
      expect(onBlur).toHaveBeenCalledWith('初始值', { e: expect.any(FocusEvent) });
    });

    it('focus', async () => {
      const onFocus = vi.fn();
      const wrapper = mount(<Textarea label="标题" defaultValue="初始值" onFocus={onFocus} />);
      await wrapper.get('textarea').trigger('focus');
      expect(onFocus).toBeCalledTimes(1);
      expect(onFocus).toHaveBeenCalledWith('初始值', { e: expect.any(FocusEvent) });
    });

    it('change', async () => {
      const onChange = vi.fn();
      const wrapper = mount(<Textarea label="标题" onChange={onChange} />);
      const el = getTextarea(wrapper);
      await simulateEvent(el, '文本', 'input');
      expect(onChange).toHaveBeenLastCalledWith('文本');
      expect(el.value).toBe('文本');
    });

    it('compositionend', async () => {
      const onCompositionend = vi.fn();
      // onCompositionend 属原生事件透传，通过非字面量 props 规避 JSX 类型检查
      const nativeProps = { label: '标题', onCompositionend };
      const wrapper = mount(<Textarea {...nativeProps} />);
      await wrapper.get('textarea').trigger('compositionend');
      expect(onCompositionend).toBeCalled();
    });

    // TdTextareaProps.onChange 声明了 context（e），组件调用时未透传该参数
    it.todo('change context includes the input event');
  });

  describe('instanceFunctions', () => {
    it('focus & blur', async () => {
      const wrapper = mount(<Textarea />, { attachTo: document.body });
      const vm = wrapper.vm as unknown as { focus: () => void; blur: () => void };
      const el = getTextarea(wrapper);

      vm.focus();
      await nextTick();
      expect(document.activeElement).toBe(el);

      vm.blur();
      await nextTick();
      expect(document.activeElement).not.toBe(el);
    });
  });
});

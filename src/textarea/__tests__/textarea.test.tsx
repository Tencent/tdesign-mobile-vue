import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Textarea from '../textarea';

const simulateEvent = (target, text, event) => {
  target.value = text;
  target.dispatchEvent(new Event(event));
};

describe('Textarea', () => {
  describe('props', () => {
    // allowInputOverMax 依赖超限输入截断行为
    it.todo('allowInputOverMax[boolean]');

    it('autofocus[boolean]', async () => {
      const onFocus = vi.fn();
      const wrapper = mount(<Textarea autofocus onFocus={onFocus} />);
      const textarea = wrapper.find('textarea');
      expect(textarea.element.hasAttribute('autofocus')).toBeTruthy();

      // 模拟浏览器因 autofocus 属性而聚焦
      await textarea.trigger('focus');
      expect(onFocus).toBeCalled();
    });

    it('autosize[boolean]', async () => {
      const value = ref('');
      const onChange = vi.fn();
      const wrapper = mount(<Textarea label="标题" v-model={value.value} autosize onChange={onChange} />);
      expect(onChange).toBeCalledTimes(1);
      const el = wrapper.find('textarea').element;
      await simulateEvent(el, '这里是一段很长很长很长的长文本，支持自动换行', 'input');
      expect(onChange).toBeCalledTimes(2);
    });

    it('autosize[object]', async () => {
      const value = ref('');
      const onChange = vi.fn();
      const wrapper = mount(
        <Textarea label="标题" v-model={value.value} autosize={{ minRows: 1, maxRows: 3 }} onChange={onChange} />,
      );
      expect(onChange).toBeCalledTimes(1);
      const el = wrapper.find('textarea').element;
      await simulateEvent(el, '这里是一段很长很长很长的长文本，支持自动换行', 'input');
      expect(onChange).toBeCalledTimes(2);
    });

    it('bordered[boolean]', async () => {
      const wrapper = mount(<Textarea bordered />);
      expect(wrapper.find('.t-textarea--border').exists()).toBeTruthy();

      const wrapper2 = mount(<Textarea />);
      expect(wrapper2.find('.t-textarea--border').exists()).toBeFalsy();
    });

    // cursorColor 为 CSS 变量注入，jsdom 无法断言样式
    it.todo('cursorColor[string]');

    it('disabled[boolean]', async () => {
      const value = ref('文本');
      const wrapper = mount(<Textarea label="标题" v-model={value.value} disabled />);
      const label = wrapper.find('.t-textarea__wrapper-inner');
      expect(label.classes()).toContain('t-textarea--disabled');
      const textarea = wrapper.find('textarea');
      expect(textarea.element.hasAttribute('disabled')).toBeTruthy();
    });

    it('indicator[boolean]', async () => {
      const maxcharacter = 20;
      const wrapper = mount(<Textarea label="标题" indicator maxcharacter={maxcharacter} />);
      const indicator = wrapper.find('.t-textarea__indicator');
      expect(indicator.exists()).toBeTruthy();
      expect(indicator.text()).toBe(`0/${maxcharacter}`);
    });

    it('label[string]', async () => {
      const wrapper = mount(<Textarea label="标题" />);
      const label = wrapper.find('.t-textarea__label');
      expect(label.exists()).toBeTruthy();
      expect(label.text()).toBe('标题');
    });

    it('layout[vertical/horizontal]', async () => {
      const wrapper = mount(<Textarea layout="vertical" label="标题" />);
      expect(wrapper.find('.t-textarea--layout-vertical').exists()).toBeTruthy();
    });

    it('maxcharacter[number]', async () => {
      const value = ref('');
      const maxcharacter = 2;
      const onChange = vi.fn();
      const wrapper = mount(
        <Textarea label="标题" v-model={value.value} maxcharacter={maxcharacter} onChange={onChange} />,
      );
      expect(onChange).toBeCalledTimes(1);
      const el = wrapper.find('textarea').element;
      await simulateEvent(el, '一个汉字等于两个字符，超出会被剪切', 'input');
      expect(onChange).toBeCalledTimes(2);
      expect(onChange).toHaveBeenCalledWith('一');
    });

    // maxlength 经字数限制逻辑处理，依赖输入事件
    it.todo('maxlength[number]');

    it('name[string]', async () => {
      const wrapper = mount(<Textarea name="remark" />);
      expect(wrapper.find('textarea').attributes('name')).toBe('remark');
    });

    it('placeholder[string]', async () => {
      const wrapper = mount(<Textarea placeholder="请输入" />);
      const input = wrapper.find('textarea');
      expect(input.attributes('placeholder')).toBe('请输入');
    });

    it('readonly[boolean]', async () => {
      const wrapper = mount(<Textarea readonly />);
      expect(wrapper.find('textarea').attributes('readonly')).toBeDefined();
    });

    it('value[string]', async () => {
      const value = ref('文本');
      const wrapper = mount(() => <Textarea value={value.value} />);
      expect(wrapper.classes()).toContain('t-textarea');
      const textarea = wrapper.find('textarea');
      expect(textarea.exists()).toBeTruthy();
      expect(textarea.element.value).toBe('文本');
    });

    it('value[number]', async () => {
      const value = ref(123);
      const wrapper = mount(() => <Textarea value={value.value} />);
      const textarea = wrapper.find('textarea');
      expect(textarea.exists()).toBeTruthy();
      expect(textarea.element.value).toBe('123');
    });

    it('defaultValue[string]', async () => {
      const wrapper = mount(<Textarea defaultValue="默认文本" />);
      expect(wrapper.find('textarea').element.value).toBe('默认文本');
    });
  });

  describe('events', () => {
    it('blur', async () => {
      const onBlur = vi.fn();
      const onFocus = vi.fn();
      const wrapper = mount(<Textarea label="标题" autofocus onBlur={onBlur} onFocus={onFocus} />);
      const textarea = wrapper.find('textarea');
      await textarea.trigger('blur');
      expect(onBlur).toBeCalled();
    });

    it('focus', async () => {
      const onFocus = vi.fn();
      const wrapper = mount(<Textarea label="标题" onFocus={onFocus} />);
      const textarea = wrapper.find('textarea');
      await textarea.trigger('focus');
      expect(onFocus).toBeCalled();
    });

    it('compositionend', async () => {
      const onCompositionend = vi.fn();
      const wrapper = mount(<Textarea label="标题" onCompositionend={onCompositionend} />);
      const textarea = wrapper.find('textarea');
      await textarea.trigger('compositionend');
      expect(onCompositionend).toBeCalled();
    });

    it('change', async () => {
      const data = ref('');
      const value = ref('');
      const handleChange = (val) => {
        value.value = val;
      };
      const wrapper = mount(<Textarea label="标题" v-model={data.value} onChange={handleChange} />);
      const el = wrapper.find('textarea').element;
      await simulateEvent(el, '文本', 'input');
      expect(value.value).toBe('文本');
    });
  });
});

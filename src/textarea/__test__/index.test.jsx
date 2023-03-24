import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Textarea from '../textarea.vue';

const simulateEvent = (target, text, event) => {
  target.value = text;
  target.dispatchEvent(new Event(event));
};

describe('Textarea.vue', () => {
  it(': value', async () => {
    const value = ref('文本');
    const wrapper = mount(() => <Textarea value={value.value} />);
    expect(wrapper.classes()).toContain('t-textarea');
    const textarea = wrapper.find('textarea');
    expect(textarea.exists()).toBeTruthy();
    expect(textarea.element.value).toBe('文本');
  });

  it(': maxcharacter ', async () => {
    const value = ref('');
    const maxcharacter = 2;
    const onChange = vi.fn();
    const wrapper = mount(
      <Textarea label="标题" v-model={value.value} maxcharacter={maxcharacter} onChange={onChange} />,
    );
    const el = wrapper.find('textarea').element;
    await simulateEvent(el, '一个汉字等于两个字符，超出会被剪切', 'input');
    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('一');
  });

  it(': autosize ', async () => {
    const value = ref('');
    const onChange = vi.fn();
    const wrapper = mount(<Textarea label="标题" v-model={value.value} autosize onChange={onChange} />);
    const el = wrapper.find('textarea').element;
    await simulateEvent(el, '这里是一段很长很长很长的长文本，支持自动换行', 'input');
    expect(onChange).toBeCalledTimes(1);
  });

  it(': placeholder', async () => {
    const wrapper = mount(<Textarea placeholder="请输入" />);
    const input = wrapper.find('textarea');
    expect(input.attributes('placeholder')).toBe('请输入');
  });

  it(': label', async () => {
    const wrapper = mount(<Textarea label="标题" />);
    const label = wrapper.find('.t-textarea__label');
    expect(label.exists()).toBeTruthy();
    expect(label.text()).toBe('标题');
  });

  it(': disabled', async () => {
    const value = ref('文本');
    const wrapper = mount(<Textarea label="标题" v-model={value.value} disabled />);
    const label = wrapper.find('.t-textarea__wrapper-inner');
    expect(label.classes()).toContain('t-is-disabled');
    const textarea = wrapper.find('textarea');
    expect(textarea.element.hasAttribute('disabled')).toBeTruthy();
  });

  it(': onBlur', async () => {
    const onBlur = vi.fn();
    const onFocus = vi.fn();
    const wrapper = mount(<Textarea label="标题" autofocus onBlur={onBlur} onFocus={onFocus} />);
    const textarea = wrapper.find('textarea');
    await textarea.trigger('blur');
    expect(onBlur).toBeCalled();
  });

  it(': onFocus', async () => {
    const onFocus = vi.fn();
    const wrapper = mount(<Textarea label="标题" onFocus={onFocus} />);
    const textarea = wrapper.find('textarea');
    await textarea.trigger('focus');
    expect(onFocus).toBeCalled();
  });

  it(': onChange ', async () => {
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

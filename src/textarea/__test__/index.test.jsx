import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Textarea from '../textarea.vue';

describe('Textarea.vue', () => {
  it('create', async () => {
    const value = ref('123');
    const wrapper = mount(() => <Textarea v-model={value.value} />);
    expect(wrapper.classes()).toContain('t-textarea');
    const textarea = wrapper.find('textarea');
    expect(textarea.exists()).toBeTruthy();
    expect(textarea.element.value).toBe('123');
  });

  it('placeholder render', async () => {
    const wrapper = mount(<Textarea placeholder="请输入" />);
    const input = wrapper.find('textarea');
    expect(input.attributes('placeholder')).toBe('请输入');
  });

  it('label render', async () => {
    const wrapper = mount(<Textarea label="标题" />);
    const label = wrapper.find('.t-textarea__name');
    expect(label.exists()).toBeTruthy();
    expect(label.text()).toBe('标题');
  });

  it('disabled render', async () => {
    const value = ref('123');
    const wrapper = mount(<Textarea label="标题" v-model={value.value} disabled />);
    const label = wrapper.find('.t-textarea__wrapper');
    expect(label.classes()).toContain('t-textarea-is-disabled');
    const textarea = wrapper.find('textarea');
    expect(textarea.element.hasAttribute('disabled')).toBeTruthy();
  });

  it('maxlength render', async () => {
    const value = ref('');
    const wrapper = mount(<Textarea label="标题" v-model={value.value} maxlength={10} />);
    const textarea = wrapper.find('textarea');
    expect(textarea.element.getAttribute('maxlength')).toBe('10');
  });

  it('blur trigger', async () => {
    const onBlur = vi.fn();
    const wrapper = mount(<Textarea label="标题" onBlur={onBlur} />);
    const textarea = wrapper.find('textarea');
    await textarea.trigger('blur');
    expect(onBlur).toBeCalled();
  });

  it('focus trigger', async () => {
    const onFocus = vi.fn();
    const wrapper = mount(<Textarea label="标题" onFocus={onFocus} />);
    const textarea = wrapper.find('textarea');
    await textarea.trigger('focus');
    expect(onFocus).toBeCalled();
  });

  it('change trigger', async () => {
    const data = ref('');
    const value = ref('');
    const handleChange = (val) => {
      value.value = val;
    };
    const wrapper = mount(<Textarea label="标题" v-model={data.value} onChange={handleChange} />);
    const el = wrapper.find('textarea').element;
    await nextTick();
    const simulateEvent = (text, event) => {
      el.value = text;
      el.dispatchEvent(new Event(event));
    };
    simulateEvent('2', 'input');
    await nextTick();
    expect(value.value).toBe('2');
  });
});

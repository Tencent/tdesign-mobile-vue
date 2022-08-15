import { ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Radio from '../radio.vue';
import RadioGroup from '../../radio-group/radio-group.vue';

describe('Radio.vue', () => {
  it('radio create', async () => {
    const wrapper = mount(() => <Radio></Radio>);
    expect(wrapper.classes()).toContain('t-radio');
  });

  it('disabled render', async () => {
    const wrapper = mount(() => <Radio disabled></Radio>);
    expect(wrapper.classes()).toContain('t-is-disabled');
  });

  it('checked render', async () => {
    const checked = ref(true);
    const wrapper = mount(() => <Radio modelValue={checked.value}></Radio>);
    expect(wrapper.classes()).toContain('t-is-checked');
  });

  it('align render', async () => {
    const wrapper1 = mount(() => <Radio></Radio>);
    const wrapper2 = mount(() => <Radio align="right"></Radio>);
    const wrap1 = wrapper1.find('.t-radio__icon-wrap');
    const wrap2 = wrapper2.find('.t-radio__icon-wrap');
    expect(wrap1.classes()).toContain('t-radio__icon-left-wrap');
    expect(wrap2.classes()).toContain('t-radio__icon-right-wrap');
  });

  it('group create', async () => {
    const wrapper = mount(() => (
      <RadioGroup>
        <Radio></Radio>
        <Radio></Radio>
        <Radio></Radio>
      </RadioGroup>
    ));
    const radioList = wrapper.findAll('.t-radio');
    expect(wrapper.classes()).toContain('t-radio-group');
    expect(radioList.length).toBe(3);
  });

  it('change event', async () => {
    const radio = ref('1');
    const wrapper = mount(() => (
      <RadioGroup v-model:value={radio.value}>
        <Radio name="radio" value="1" label="单选"></Radio>
        <Radio name="radio" value="2" label="单选"></Radio>
        <Radio name="radio" value="3" label="单选"></Radio>
      </RadioGroup>
    ));
    const [radio1, radio2] = wrapper.findAll('.t-radio');
    const [, original2] = wrapper.findAll('.t-radio__original-left');
    expect(radio1.classes()).toContain('t-is-checked');
    await original2.trigger('click');
    expect(radio2.classes()).toContain('t-is-checked');
    expect(radio.value).toBe('2');
  });
});

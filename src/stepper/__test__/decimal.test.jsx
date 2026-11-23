import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { nextTick } from 'vue';
import Stepper from '../stepper';

const mountStepper = (props) => {
  const calls = [];
  const wrapper = mount(Stepper, {
    props: { ...props, onChange: (value) => calls.push(value) },
  });
  return { wrapper, calls, $input: wrapper.find('.t-stepper__input') };
};

const typeAndCommit = async ($input, text) => {
  $input.element.value = text;
  await $input.trigger('input');
  await $input.trigger('change');
  await nextTick();
};

describe('stepper decimal input', () => {
  it('opens the decimal keyboard when step has a fractional part', () => {
    const { $input } = mountStepper({ step: 0.01, defaultValue: 1 });
    expect($input.attributes('inputmode')).toBe('decimal');
    expect($input.attributes('type')).toBe('text');
  });

  it('keeps the decimal part committed into a stepper with a fractional step', async () => {
    const { calls, $input } = mountStepper({ step: 0.01, defaultValue: 1 });
    await typeAndCommit($input, '1.5');
    expect(Number(calls.at(-1))).toBe(1.5);
  });

  it('keeps an integer keypad and strips decimals for an integer step', async () => {
    const { calls, $input } = mountStepper({ step: 1, defaultValue: 1 });
    expect($input.attributes('inputmode')).toBe('numeric');
    expect($input.attributes('type')).toBe('tel');

    await typeAndCommit($input, '1.5');
    expect(Number(calls.at(-1))).toBe(1);
  });
});

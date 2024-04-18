import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Badge from '../badge';
import Button from '../../button/button';
import config from '../../config';

const { prefix } = config;
const name = `${prefix}-badge`;
const TEXT = 'Badge 徽标';

describe('Badge', () => {
  it(': dot', () => {
    const wrapper = mount(() => (
      <Badge dot>
        <Button>按钮</Button>
      </Badge>
    ));
    const dot = wrapper.find(`.${name}--dot`);
    expect(dot.exists()).toBeTruthy();
    expect(wrapper.findComponent(Button).text()).toEqual(`按钮`);
  });

  it(': count', () => {
    const wrapper = mount(() => (
      <Badge count={5}>
        <Button>按钮</Button>
      </Badge>
    ));
    const inner = wrapper.find(`.${name}--count`);
    expect(inner.text()).toEqual('5');
  });

  it(': maxCount', () => {
    const count = 100;
    const maxCount = 50;
    const wrapper = mount(() => (
      <Badge count={count} maxCount={maxCount}>
        <Button>按钮</Button>
      </Badge>
    ));
    const inner = wrapper.find(`.${name}--count`);
    expect(inner.exists()).toBeTruthy();
    expect(inner.text()).toEqual(`${maxCount}+`);
  });

  it(': shape', async () => {
    const count = 16;
    const wrapper = mount(Badge, {
      props: {
        count,
        shape: '',
        content: TEXT,
      },
    });
    // shape = ''
    const $badge = wrapper.findComponent(Badge);
    const inner = $badge.find(`.${name}--basic`);
    ['circle', 'ribbon', 'round'].forEach((s) => {
      expect(inner.classes().includes(`${name}--${s}`)).toBeFalsy();
    });
    expect($badge.text()).toEqual(`${TEXT}${count}`);

    const shape = 'ribbon';
    await wrapper.setProps({
      shape,
    });
    expect(inner.classes()).toContain(`${name}--${shape}`);
  });

  it(': size', async () => {
    const wrapper = mount(Badge, {
      props: {
        dot: true,
        size: '',
        content: TEXT,
      },
    });
    // size = ''
    const $badge = wrapper.findComponent(Badge);
    const inner = $badge.find(`.${name}--basic`);
    ['medium', 'small'].forEach((s) => {
      expect(inner.classes().includes(`${name}--${s}`)).toBeFalsy();
    });
    expect($badge.text()).toEqual(`${TEXT}`);

    const size = 'small';
    await wrapper.setProps({
      size,
    });
    expect(inner.classes()).toContain(`${name}--${size}`);
  });

  it(': showZero', () => {
    const wrapper = mount(() => (
      <Badge showZero>
        <Button>按钮</Button>
      </Badge>
    ));
    const inner = wrapper.find(`.${name}--basic`);
    expect(inner.exists()).toBeTruthy();
    expect(inner.text()).toEqual('0');
  });

  it(': offset', () => {
    const count = 100;
    const offset = [20, 30];
    const wrapper = mount(() => (
      <Badge count={count} offset={offset}>
        <Button>按钮</Button>
      </Badge>
    ));
    const inner = wrapper.find(`.${name}--basic`);
    expect(inner.attributes('style').includes(`right: ${offset[0]}px; top: ${offset[1]}px`)).toBeTruthy();
  });
});

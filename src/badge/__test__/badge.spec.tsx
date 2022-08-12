import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Badge from '../badge.vue';
import Button from '../../button/button.vue';
import { TdBadgeProps } from '../type';

const shapeList: TdBadgeProps['shape'][] = ['circle', 'ribbon', 'round'];
const sizeList: TdBadgeProps['size'][] = ['medium', 'small'];

describe('Badge.vue', async () => {
  it('create', async () => {
    const wrapper = mount(() => (
      <Badge dot>
        <Button>按钮</Button>
      </Badge>
    ));
    expect(wrapper.classes()).toContain('t-badge');
    const dot = wrapper.find('.t-badge--dot');
    const button = wrapper.findComponent(Button);
    expect(dot.exists()).toBeTruthy();
    expect(button.exists()).toBeTruthy();
  });

  it('count render', async () => {
    const wrapper = mount(() => (
      <Badge count={5}>
        <Button>按钮</Button>
      </Badge>
    ));
    const inner = wrapper.find('.t-badge__inner');
    expect(inner.exists()).toBeTruthy();
    expect(inner.text()).toBe('5');
  });

  it('maxCount render', async () => {
    const wrapper = mount(() => (
      <Badge count={100} maxCount={50}>
        <Button>按钮</Button>
      </Badge>
    ));
    const inner = wrapper.find('.t-badge__inner');
    expect(inner.exists()).toBeTruthy();
    expect(inner.text()).toBe('50+');
  });

  it('shape render', async () => {
    shapeList.forEach((s) => {
      const wrapper = mount(() => (
        <Badge shape={s} count={5}>
          <Button>按钮</Button>
        </Badge>
      ));
      const inner = wrapper.find('.t-badge__inner');
      expect(inner.classes()).toContain(`t-badge--${s}`);
    });
  });

  it('size render', async () => {
    sizeList.forEach((s) => {
      const wrapper = mount(() => (
        <Badge size={s} count={5}>
          <Button>按钮</Button>
        </Badge>
      ));
      const inner = wrapper.find('.t-badge__inner');
      expect(inner.classes()).toContain(`t-badge--${s}`);
    });
  });

  it('showZero render', async () => {
    const wrapper = mount(() => (
      <Badge count={0} showZero>
        <Button>按钮</Button>
      </Badge>
    ));
    const inner = wrapper.find('.t-badge__inner');
    expect(inner.exists()).toBeTruthy();
    expect(inner.text()).toBe('0');
  });

  it('offset render', async () => {
    const wrapper = mount(() => (
      <Badge count={100} offset={[20, 30]}>
        <Button>按钮</Button>
      </Badge>
    ));
    const inner = wrapper.find('.t-badge__inner');
    expect(getComputedStyle(inner.element, null).right).toBe('20px');
    expect(getComputedStyle(inner.element, null).top).toBe('30px');
  });
});

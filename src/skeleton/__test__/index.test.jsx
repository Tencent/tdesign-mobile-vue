import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Skeleton from '../skeleton.vue';

describe('Skeleton.vue', async () => {
  it('create', async () => {
    const wrapper = mount(() => <Skeleton />);
    expect(wrapper.classes()).toContain('t-skeleton');
    const content = wrapper.find('.t-skeleton__content');
    expect(content.exists()).toBeTruthy();
  });

  it('theme render', async () => {
    const wrapper1 = mount(() => <Skeleton theme="avatar" />);
    const wrapper2 = mount(() => <Skeleton theme="image" />);
    const wrapper3 = mount(() => <Skeleton theme="paragraph" />);
    const content1 = wrapper1.find('.t-skeleton--type-circle');
    const content2 = wrapper2.find('.t-skeleton--type-rect');
    const content3 = wrapper3.find('.t-skeleton--type-text');
    expect(content1.exists()).toBeTruthy();
    expect(content2.exists()).toBeTruthy();
    expect(content3.exists()).toBeTruthy();
  });

  it('animation render', async () => {
    const wrapper1 = mount(() => <Skeleton animation="gradient" />);
    const wrapper2 = mount(() => <Skeleton animation="flashed" />);
    const row1 = wrapper1.find('.t-skeleton__row > .t-skeleton__col');
    const row2 = wrapper2.find('.t-skeleton__row > .t-skeleton__col');
    expect(row1.classes()).toContain('t-skeleton--animation-gradient');
    expect(row2.classes()).toContain('t-skeleton--animation-flashed');
  });
});

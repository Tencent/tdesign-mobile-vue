import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Divider from '../divider.vue';
import { TdDividerProps } from '../type';

const TEXT = 'tdesign-mobile-vue';

const alignList: TdDividerProps['align'][] = ['left', 'right', 'center'];

describe('divider.vue', async () => {
  it('create', async () => {
    const wrapper = mount(Divider);
    expect(wrapper.classes()).toContain('t-divider');
  });

  it('text render', async () => {
    const wrapper = mount(() => <Divider>{TEXT}</Divider>);
    expect(wrapper.text()).toBe(TEXT);
  });

  it('dashed render', async () => {
    const wrapper = mount(() => <Divider dashed />);
    expect(wrapper.classes()).toContain('t-divider--dashed');
  });

  it('align render', async () => {
    alignList.forEach((align) => {
      const wrapper = mount(() => <Divider align={align}>{TEXT}</Divider>);
      expect(wrapper.classes()).toContain(`t-divider--content-${align}`);
    });
  });

  it('vertical render', async () => {
    const wrapper = mount(() => <Divider layout="vertical" />);
    expect(wrapper.classes()).toContain('t-divider-vertical');
  });

  it('lineColor render', async () => {
    const wrapper = mount(() => <Divider lineColor="red" />);
    expect(getComputedStyle(wrapper.element, null).borderColor).toBe('red');
  });
});

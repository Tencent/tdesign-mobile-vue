import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Divider from '../divider.vue';

const TEXT = 'tdesign-mobile-vue';

describe('divider.vue', async () => {
  it('create', async () => {
    const wrapper = mount(Divider);
    expect(wrapper.classes()).toContain('t-divider');
  });

  it('text render', async () => {
    const wrapper = mount(() => <Divider>{TEXT}</Divider>);
    expect(wrapper.text()).toBe(TEXT);
  });

  it('content render', async () => {
    const wrapper = mount(() => <Divider content={TEXT}></Divider>);
    expect(wrapper.text()).toBe(TEXT);
  });

  it('default render', async () => {
    const wrapper = mount(() => <Divider default={TEXT}></Divider>);
    expect(wrapper.text()).toBe(TEXT);
  });

  it('dashed render', async () => {
    const wrapper = mount(() => <Divider dashed />);
    expect(wrapper.classes()).toContain('t-divider--dashed');
  });

  it('align render', async () => {
    const wrapper1 = mount(() => <Divider align="center">{TEXT}</Divider>);
    expect(wrapper1.classes()).toContain(`t-divider--content-center`);
    const wrapper2 = mount(() => <Divider align="right">{TEXT}</Divider>);
    expect(wrapper2.classes()).toContain(`t-divider--content-right`);
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

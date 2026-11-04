import { enableAutoUnmount, mount } from '@vue/test-utils';
import { afterEach, describe, it, expect } from 'vitest';
import Divider from '../divider';
import config from '../../config';

const { prefix } = config;
const name = `${prefix}-divider`;
const TEXT = 'tdesign-mobile-vue';
const aligns = ['left', 'right', 'center'] as const;

enableAutoUnmount(afterEach);

describe('Divider', () => {
  describe('props', () => {
    it.each(aligns)('align[%s]', async (align) => {
      const wrapper = mount(Divider);
      expect(wrapper.classes()).toContain(`${name}--center`);

      await wrapper.setProps({ align });
      expect(wrapper.classes()).toContain(`${name}--${align}`);
      aligns
        .filter((value) => value !== align)
        .forEach((value) => {
          expect(wrapper.classes()).not.toContain(`${name}--${value}`);
        });
    });

    it('content[string]', async () => {
      const wrapper = mount(Divider, { props: { content: TEXT } });
      expect(wrapper.get(`.${name}__content`).text()).toBe(TEXT);
      await wrapper.setProps({ content: 'updated content' });
      expect(wrapper.get(`.${name}__content`).text()).toBe('updated content');
    });

    it('content[function]', () => {
      const wrapper = mount(Divider, {
        props: { content: () => <span class="content-node">{TEXT}</span> },
      });
      expect(wrapper.get(`.${name}__content .content-node`).text()).toBe(TEXT);
    });

    it('content[slot]', () => {
      const wrapper = mount(Divider, { slots: { content: () => <span>{TEXT}</span> } });
      expect(wrapper.get(`.${name}__content span`).text()).toBe(TEXT);
    });

    it('dashed[boolean]', async () => {
      const wrapper = mount(Divider);
      expect(wrapper.classes()).not.toContain(`${name}--dashed`);
      await wrapper.setProps({ dashed: true });
      expect(wrapper.classes()).toContain(`${name}--dashed`);
      await wrapper.setProps({ dashed: false });
      expect(wrapper.classes()).not.toContain(`${name}--dashed`);
    });

    it('default[string]', () => {
      const wrapper = mount(Divider, { props: { default: TEXT } });
      expect(wrapper.get(`.${name}__content`).text()).toBe(TEXT);
    });

    it('default[function]', () => {
      const wrapper = mount(Divider, {
        props: { default: () => <span class="default-node">{TEXT}</span> },
      });
      expect(wrapper.get(`.${name}__content .default-node`).text()).toBe(TEXT);
    });

    it('default[slot]', () => {
      const wrapper = mount(Divider, { slots: { default: () => <span>{TEXT}</span> } });
      expect(wrapper.get(`.${name}__content span`).text()).toBe(TEXT);
    });

    it('layout[horizontal/vertical]', async () => {
      const wrapper = mount(Divider);
      expect(wrapper.classes()).toContain(`${name}--horizontal`);
      expect(wrapper.classes()).not.toContain(`${name}--vertical`);
      await wrapper.setProps({ layout: 'vertical' });
      expect(wrapper.classes()).toContain(`${name}--vertical`);
      expect(wrapper.classes()).not.toContain(`${name}--horizontal`);
      await wrapper.setProps({ layout: 'horizontal' });
      expect(wrapper.classes()).toContain(`${name}--horizontal`);
      expect(wrapper.classes()).not.toContain(`${name}--vertical`);
    });
  });

  describe('scenarios', () => {
    it('renders an empty separator without content', () => {
      const wrapper = mount(Divider);
      expect(wrapper.attributes('role')).toBe('separator');
      expect(wrapper.get(`.${name}__content`).text()).toBe('');
    });
  });
});

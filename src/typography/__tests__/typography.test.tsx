import { enableAutoUnmount, mount } from '@vue/test-utils';
import { afterEach, describe, it, expect } from 'vitest';
import { Typography, Text, Title, Paragraph } from '../index';
import { COMPONENT_NAME, longText, shortText } from './mount';

enableAutoUnmount(afterEach);

describe('Typography', () => {
  describe('props', () => {
    it('default[slot]', () => {
      const wrapper = mount(Typography, {
        slots: {
          default: () => longText,
        },
      });
      expect(wrapper.find(`span.${COMPONENT_NAME}`).exists()).toBe(true);
      expect(wrapper.text()).toBe(longText);
    });
  });

  describe('scenarios', () => {
    it('forwards text props and custom attributes to its rendered content', () => {
      const wrapper = mount(Typography, {
        attrs: { strong: true, theme: 'success', id: 'typography-content', 'aria-label': '文本' },
        slots: { default: () => shortText },
      });
      const text = wrapper.getComponent(Text);
      expect(text.props('strong')).toBe(true);
      expect(text.props('theme')).toBe('success');
      expect(wrapper.get('strong').text()).toBe(shortText);
      expect(text.classes()).toContain(`${COMPONENT_NAME}--success`);
      expect(text.attributes('id')).toBe('typography-content');
      expect(text.attributes('aria-label')).toBe('文本');
    });

    it('renders default slot through the built-in Text component', () => {
      const wrapper = mount(Typography, {
        slots: {
          default: () => shortText,
        },
      });
      expect(wrapper.findComponent(Text).exists()).toBe(true);
      expect(wrapper.find(`.${COMPONENT_NAME}`).exists()).toBe(true);
      expect(wrapper.text()).toBe(shortText);
    });

    it('renders an empty container without default slot', () => {
      const wrapper = mount(Typography);
      expect(wrapper.find(`.${COMPONENT_NAME}`).exists()).toBe(true);
      expect(wrapper.text()).toBe('');
    });

    it('exports Text Title and Paragraph sub-components', () => {
      expect((Typography as any).name).toBe('TTypography');
      expect((Text as any).name).toBe('TTypographyText');
      expect((Title as any).name).toBe('TTypographyTitle');
      expect((Paragraph as any).name).toBe('TTypographyParagraph');
    });
  });
});

import { enableAutoUnmount, mount } from '@vue/test-utils';
import { afterEach, describe, it, expect } from 'vitest';
import { Typography } from '../index';
import { COMPONENT_NAME, longText } from './mount';

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
});

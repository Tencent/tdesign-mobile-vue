import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Row from '../row';

const prefix = 't';
const rowName = `${prefix}-row`;

describe('Row', () => {
  describe('props', () => {
    it('gutter[number]', async () => {
      const wrapper = mount(Row, {
        props: {
          gutter: 100,
        },
      });
      expect(wrapper.attributes().style).toBe('margin-right: -50px; margin-left: -50px;');
      expect(wrapper.classes()).toContain(`${rowName}`);
    });
  });
});

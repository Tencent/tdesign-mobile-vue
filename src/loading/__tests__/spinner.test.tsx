import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Spinner from '../icon/spinner';

describe('Spinner', () => {
  describe('props', () => {
    it('renders twelve spinner lines with sequential classes', () => {
      const wrapper = mount(() => <Spinner />);
      const lines = wrapper.findAll('.t-loading__spinner--line');
      expect(lines).toHaveLength(12);
      lines.forEach((line, index) => {
        expect(line.classes()).toContain(`t-loading__spinner--line-${index + 1}`);
      });
    });
  });
});

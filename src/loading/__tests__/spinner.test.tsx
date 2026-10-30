import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Spinner from '../icon/spinner';

describe('Spinner', () => {
  describe('scenarios', () => {
    it('renders spinner lines', () => {
      const wrapper = mount(() => <Spinner />);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

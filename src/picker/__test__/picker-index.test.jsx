import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import Picker from '../picker';

describe('Picker', () => {
  describe('index resolution', () => {
    it('resolves the index of a falsy 0 value', async () => {
      const columns = [
        [
          { label: 'A', value: 1 },
          { label: 'B', value: 0 },
        ],
      ];
      const onConfirm = vi.fn();
      const wrapper = mount(Picker, { props: { columns, defaultValue: [0], onConfirm } });
      expect(wrapper.find('.t-picker-item__item--active').text()).toBe('B');
      await wrapper.find('.t-picker__confirm').trigger('click');
      expect(onConfirm.mock.calls[0][0]).toEqual([0]);
    });

    it('falls back to the first item when the value is not in the column', async () => {
      const columns = [
        [
          { label: 'A', value: 1 },
          { label: 'B', value: 2 },
        ],
      ];
      const onConfirm = vi.fn();
      const wrapper = mount(Picker, { props: { columns, defaultValue: [99], onConfirm } });
      expect(wrapper.find('.t-picker-item__item--active').text()).toBe('A');
      await wrapper.find('.t-picker__confirm').trigger('click');
      expect(onConfirm.mock.calls[0][0]).toEqual([1]);
    });
  });
});

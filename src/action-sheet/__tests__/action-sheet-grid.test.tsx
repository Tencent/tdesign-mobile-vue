import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ActionSheetGrid from '../action-sheet-grid';
import config from '../../config';

const { prefix } = config;

describe('ActionSheetGrid', () => {
  describe('props', () => {
    it('count[number]', async () => {
      const wrapper = mount(ActionSheetGrid, {
        props: {
          items: [
            {
              label: '1',
            },
            {
              label: '2',
            },
            {
              label: '3',
            },
          ],
          count: 1,
        },
      });
      expect(wrapper.findAll(`.${prefix}-grid`)).toHaveLength(3);
      await wrapper.setProps({
        count: 2,
      });
      expect(wrapper.findAll(`.${prefix}-grid`)).toHaveLength(2);
    });
  });
});

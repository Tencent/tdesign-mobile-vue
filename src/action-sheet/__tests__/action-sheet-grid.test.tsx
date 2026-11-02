import { describe, it, expect, vi } from 'vitest';
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

    it('items[array]', () => {
      const wrapper = mount(ActionSheetGrid, {
        props: {
          items: [{ label: '选项一' }, { label: '选项二' }],
        },
      });

      expect(wrapper.findAll(`.${prefix}-grid-item`)).toHaveLength(2);
      expect(wrapper.text()).toContain('选项一');
      expect(wrapper.text()).toContain('选项二');
    });
  });

  describe('events', () => {
    it('selected', async () => {
      const onSelected = vi.fn();
      const wrapper = mount(ActionSheetGrid, {
        props: {
          items: [{ label: '选项一' }, { label: '选项二' }],
          onSelected,
        },
      });

      await wrapper.findAll(`.${prefix}-grid-item`)[1].trigger('click');

      expect(wrapper.emitted('selected')).toEqual([[1]]);
      expect(onSelected).toHaveBeenCalledWith(1);
    });

    it('selected[paged index]', async () => {
      const onSelected = vi.fn();
      const wrapper = mount(ActionSheetGrid, {
        props: {
          count: 2,
          items: [{ label: '选项一' }, { label: '选项二' }, { label: '选项三' }],
          onSelected,
        },
      });

      expect(wrapper.find(`.${prefix}-action-sheet__grid--swiper`).exists()).toBe(true);
      await wrapper.findAll(`.${prefix}-grid-item`)[2].trigger('click');

      expect(wrapper.emitted('selected')).toEqual([[2]]);
      expect(onSelected).toHaveBeenCalledWith(2);
    });
  });
});

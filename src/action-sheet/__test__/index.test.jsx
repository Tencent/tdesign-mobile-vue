import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ActionSheet from '../action-sheet.vue';
import MenuGrid from '../action-sheet-grid.vue';

describe('ActionSheet', () => {
  describe('props', () => {
    it('showCancel', async () => {
      const wrapper = mount(ActionSheet, {
        props: {
          items: [],
          visible: true,
        },
      });
      expect(wrapper.find('.t-action-sheet__content').exists()).toEqual(true);
      await wrapper.setProps({
        showCancel: false,
      });
      expect(wrapper.find('.t-action-sheet__footer').exists()).toEqual(false);
    });

    it('cancelText', async () => {
      const wrapper = mount(ActionSheet, {
        props: {
          items: [],
          visible: true,
        },
      });
      expect(wrapper.find('.t-action-sheet__footer').text()).toEqual('取消');
      await wrapper.setProps({
        cancelText: 'Cancel',
      });
      expect(wrapper.find('.t-action-sheet__footer').text()).toEqual('Cancel');
    });

    it('theme', async () => {
      const wrapper = mount(ActionSheet, {
        props: {
          theme: 'list',
          items: [],
          visible: true,
        },
      });
      expect(wrapper.find('.t-action-sheet__list').exists()).toEqual(true);
      expect(wrapper.find('.t-action-sheet__grid').exists()).toEqual(false);
      await wrapper.setProps({
        theme: 'grid',
      });
      expect(wrapper.find('.t-action-sheet__list').exists()).toEqual(false);
      expect(wrapper.find('.t-action-sheet__grid').exists()).toEqual(true);
    });

    it('count', async () => {
      const wrapper = mount(ActionSheet, {
        props: {
          theme: 'grid',
          items: ['1', '2', '3'],
          visible: true,
          count: 2,
        },
      });
      expect(wrapper.findComponent(MenuGrid).props().count).toEqual(2);
      await wrapper.setProps({
        count: 3,
      });
      expect(wrapper.findComponent(MenuGrid).props().count).toEqual(3);
    });

    it('visible', async () => {
      const wrapper = mount(ActionSheet, {
        props: {
          visible: false,
          items: [],
        },
      });
      expect(wrapper.find('.t-popup').isVisible()).toEqual(false);
      await wrapper.setProps({
        visible: true,
      });
      expect(wrapper.find('.t-popup').isVisible()).toEqual(true);
    });
  });

  describe('events', () => {
    it('onSelected', () => {
      const onSelected = vi.fn();
      const wrapper = mount(ActionSheet, {
        props: {
          visible: true,
          items: ['确定', '删除'],
          onSelected
        }
      });
      expect(wrapper.find('.t-popup--content').isVisible()).toEqual(true);
      wrapper.findAll('.t-action-sheet__list-item')[0].trigger('click');
      expect(onSelected).toHaveBeenCalledTimes(1);
      expect(onSelected).toHaveBeenLastCalledWith('确定', 0);
      wrapper.findAll('.t-action-sheet__list-item')[1].trigger('click');
      expect(onSelected).toHaveBeenCalledTimes(2);
      expect(onSelected).toHaveBeenLastCalledWith('删除', 1);
    });

    it('onCancel', () => {
      const onCancel = vi.fn();
      const wrapper = mount(() => <ActionSheet visible items={['确定', '删除']} onCancel={onCancel} />);
      wrapper.find('.t-class-cancel').trigger('click');
      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it('onClose', () => {
      const onClose = vi.fn();
      const wrapper = mount(() => <ActionSheet visible items={['确定', '删除']} onClose={onClose} />);
      wrapper.find('.t-overlay').trigger('click');
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});

describe('MenuGrid', () => {
  it('count', async () => {
    const wrapper = mount(MenuGrid, {
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
    expect(wrapper.findAll('.t-grid')).toHaveLength(3);
    await wrapper.setProps({
      count: 2,
    });
    expect(wrapper.findAll('.t-grid')).toHaveLength(2);
  });
});

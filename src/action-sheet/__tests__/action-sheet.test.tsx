import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ActionSheet from '../action-sheet';
import type { TdActionSheetProps } from '../type';
import MenuGrid from '../action-sheet-grid';
import { GridItem as TGridItem } from '../../grid/index';
import TBadge from '../../badge/index';
import config from '../../config';

const { prefix } = config;
const name = `${prefix}-action-sheet`;

describe('ActionSheet', () => {
  describe('props', () => {
    it('align[center/left]', async () => {
      const alignList: TdActionSheetProps['align'][] = ['center', 'left'];

      alignList.forEach((align) => {
        const wrapper = mount(() => (
          <ActionSheet items={[]} visible={true} description={'动作面板描述文字'} align={align}></ActionSheet>
        ));
        if (align === 'left') {
          expect(wrapper.find(`.${name}--left`).exists()).toBeTruthy();
        } else {
          expect(wrapper.find(`.${name}--left`).exists()).toBeFalsy();
        }
      });
    });

    it('cancelText[string]', async () => {
      const wrapper = mount(ActionSheet, {
        props: {
          items: [],
          visible: true,
        },
      });
      expect(wrapper.find(`.${name}__footer`).text()).toEqual('取消');
      await wrapper.setProps({
        cancelText: 'Cancel',
      });
      // expect(wrapper.find(`.${name}__footer`).text()).toEqual('Cancel');
    });

    it('count[number]', async () => {
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

    it('items[array]', async () => {
      const wrapper = mount(ActionSheet, {
        props: {
          items: [
            {
              label: '选项一',
              badge: { count: 1 },
            },
            {
              label: '选项二',
              badge: { dot: true },
            },
          ],
          visible: true,
        },
      });
      expect(wrapper.find(`.${name}__content`).exists()).toEqual(true);
      expect(wrapper.findAllComponents(TBadge).length).toEqual(2);
    });

    it('popupProps[object]', async () => {
      const wrapper = mount(ActionSheet, {
        props: {
          visible: true,
          items: ['选项'],
          popupProps: { zIndex: 5000 },
        },
      });
      expect(wrapper.find('.t-overlay').attributes('style')).toContain('z-index: 5000');
    });

    it('showCancel[boolean]', async () => {
      const wrapper = mount(ActionSheet, {
        props: {
          items: [],
          visible: true,
        },
      });
      expect(wrapper.find(`.${name}__content`).exists()).toEqual(true);
      await wrapper.setProps({
        showCancel: false,
      });
      expect(wrapper.find(`.${name}__footer`).exists()).toEqual(false);
    });

    it('showOverlay[boolean]', async () => {
      const wrapper = mount(ActionSheet, {
        props: {
          visible: true,
          items: ['选项'],
        },
      });
      expect(wrapper.find('.t-overlay').isVisible()).toBeTruthy();

      const wrapper2 = mount(ActionSheet, {
        props: {
          visible: true,
          items: ['选项'],
          showOverlay: false,
        },
      });
      const overlay = wrapper2.find('.t-overlay');
      overlay.exists() && expect(overlay.isVisible()).toBeFalsy();
    });

    it('theme[list/grid]', async () => {
      const wrapper = mount(ActionSheet, {
        props: {
          theme: 'list',
          items: [],
          visible: true,
        },
      });
      expect(wrapper.find(`.${name}__list`).exists()).toEqual(true);
      expect(wrapper.find(`.${name}__grid`).exists()).toEqual(false);
      await wrapper.setProps({
        theme: 'grid',
      });
      expect(wrapper.find(`.${name}__list`).exists()).toEqual(false);
      // expect(wrapper.find(`.${name}__grid`).exists()).toEqual(true);
    });

    it('visible[boolean]', async () => {
      const wrapper = mount(ActionSheet, {
        props: {
          visible: false,
          items: [],
        },
      });
      expect(wrapper.find(`.${prefix}-popup`).exists()).toBeFalsy();
      await wrapper.setProps({
        visible: true,
      });
      // expect(wrapper.find(`.${prefix}-popup`).exists()).toBeTruthy();
    });

    it('defaultVisible[boolean]', async () => {
      const wrapper = mount(ActionSheet, {
        props: {
          defaultVisible: true,
          items: ['选项'],
        },
      });
      expect(wrapper.find(`.${name}__content`).exists()).toEqual(true);
    });
  });

  describe('events', () => {
    it('selected', async () => {
      const onSelected = vi.fn();
      const wrapper = mount(ActionSheet, {
        props: {
          theme: 'list',
          visible: true,
          items: ['确定', '删除'],
          onSelected,
        },
      });
      wrapper.findAll(`.${name}__list-item`)[0].trigger('click');
      expect(onSelected).toHaveBeenCalledTimes(1);
      expect(onSelected).toHaveBeenLastCalledWith('确定', 0);
      wrapper.findAll(`.${name}__list-item`)[1].trigger('click');
      expect(onSelected).toHaveBeenCalledTimes(2);
      expect(onSelected).toHaveBeenLastCalledWith('删除', 1);

      await wrapper.setProps({
        theme: 'grid',
      });

      const $TGridItems = wrapper.findAllComponents(TGridItem);
      expect($TGridItems.length).toEqual(2);
      $TGridItems[0].trigger('click');
      expect(onSelected).toHaveBeenCalledTimes(3);
      expect(onSelected).toHaveBeenLastCalledWith('确定', 0);
      $TGridItems[1].trigger('click');
      expect(onSelected).toHaveBeenCalledTimes(4);
      expect(onSelected).toHaveBeenLastCalledWith('删除', 1);
    });

    it('cancel', () => {
      const onCancel = vi.fn();
      const wrapper = mount(() => <ActionSheet visible items={['确定', '删除']} onCancel={onCancel} />);
      wrapper.find(`.${name}__cancel`).trigger('click');
      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it('close', () => {
      const onClose = vi.fn();
      const wrapper = mount(() => <ActionSheet visible items={['确定', '删除']} onClose={onClose} />);
      wrapper.find(`.${prefix}-overlay`).trigger('click');
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});

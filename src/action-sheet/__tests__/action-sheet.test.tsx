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

    it('cancelText[string]', () => {
      const wrapper = mount(ActionSheet, {
        props: {
          items: [],
          visible: true,
          cancelText: 'Cancel',
        },
      });
      expect(wrapper.find(`.${name}__footer`).text()).toEqual('Cancel');
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

    it('description[string]', async () => {
      // 设置描述文字：渲染描述节点，且根节点不带 --no-description 修饰类
      const wrapper = mount(ActionSheet, {
        props: {
          items: ['选项'],
          visible: true,
          description: '动作面板描述文字',
        },
      });
      expect(wrapper.find(`.${name}__description`).text()).toEqual('动作面板描述文字');
      expect(wrapper.find(`.${name}--no-description`).exists()).toEqual(false);

      // 不设置描述：不渲染描述节点，根节点带 --no-description 修饰类
      const wrapper2 = mount(ActionSheet, {
        props: {
          items: ['选项'],
          visible: true,
        },
      });
      expect(wrapper2.find(`.${name}__description`).exists()).toEqual(false);
      expect(wrapper2.find(`.${name}--no-description`).exists()).toEqual(true);
    });

    it('items[array]', () => {
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
          items: ['选项'],
          visible: true,
        },
      });
      expect(wrapper.find(`.${name}__list`).exists()).toEqual(true);
      expect(wrapper.find(`.${name}__grid`).exists()).toEqual(false);
      await wrapper.setProps({
        theme: 'grid',
      });
      expect(wrapper.find(`.${name}__list`).exists()).toEqual(false);
      expect(document.querySelector(`.${name}__grid`)).toBeTruthy();
    });

    it('visible[boolean]', async () => {
      document.body.innerHTML = '';
      const wrapper = mount(ActionSheet, {
        props: {
          visible: false,
          items: [],
        },
      });
      expect(document.querySelector(`.${prefix}-popup`)).toBeFalsy();
      await wrapper.setProps({
        visible: true,
      });
      expect(document.querySelector(`.${prefix}-popup`)).toBeTruthy();
    });

    it('modelValue[boolean]', async () => {
      document.body.innerHTML = '';
      const wrapper = mount(ActionSheet, {
        props: {
          modelValue: false,
          items: ['选项'],
        },
      });
      expect(document.querySelector(`.${prefix}-popup`)).toBeFalsy();
      await wrapper.setProps({ modelValue: true });
      expect(document.querySelector(`.${prefix}-popup`)).toBeTruthy();
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
      await wrapper.findAll(`.${name}__list-item`)[0].trigger('click');
      expect(onSelected).toHaveBeenCalledTimes(1);
      expect(onSelected).toHaveBeenLastCalledWith('确定', 0);
      const wrapper2 = mount(ActionSheet, {
        props: {
          theme: 'list',
          visible: true,
          items: ['确定', '删除'],
          onSelected,
        },
      });
      await wrapper2.findAll(`.${name}__list-item`)[1].trigger('click');
      expect(onSelected).toHaveBeenCalledTimes(2);
      expect(onSelected).toHaveBeenLastCalledWith('删除', 1);

      await wrapper2.setProps({
        theme: 'grid',
      });

      const $TGridItems = wrapper2.findAllComponents(TGridItem);
      expect($TGridItems.length).toEqual(2);
      await $TGridItems[0].trigger('click');
      expect(onSelected).toHaveBeenCalledTimes(3);
      expect(onSelected).toHaveBeenLastCalledWith('确定', 0);
      await $TGridItems[1].trigger('click');
      expect(onSelected).toHaveBeenCalledTimes(4);
      expect(onSelected).toHaveBeenLastCalledWith('删除', 1);
    });

    it('cancel', async () => {
      const onCancel = vi.fn();
      const wrapper = mount(() => <ActionSheet visible items={['确定', '删除']} onCancel={onCancel} />);
      await wrapper.find(`.${name}__cancel`).trigger('click');
      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it('close', async () => {
      const onClose = vi.fn();
      const wrapper = mount(() => <ActionSheet visible items={['确定', '删除']} onClose={onClose} />);
      await wrapper.find(`.${prefix}-overlay`).trigger('click');
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledWith({ trigger: 'overlay' });
    });
  });
});

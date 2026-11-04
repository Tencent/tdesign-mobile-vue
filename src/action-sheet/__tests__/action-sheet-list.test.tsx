import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ActionSheetList from '../action-sheet-list';
import TBadge from '../../badge';
import config from '../../config';

const { prefix } = config;
const name = `${prefix}-action-sheet`;

describe('ActionSheetList', () => {
  describe('props', () => {
    it('items[array]', () => {
      const wrapper = mount(ActionSheetList, {
        props: {
          items: [
            { label: '选项零' },
            {
              label: '选项一',
              description: '描述一',
              color: 'red',
              icon: 'icon-name',
              suffixIcon: () => <span>suffix-icon</span>,
            },
            {
              label: '选项二',
              disabled: true,
            },
          ],
        },
      });

      const items = wrapper.findAll(`.${name}__list-item`);
      expect(items).toHaveLength(3);
      expect(items[0].text()).toContain('选项零');
      expect(items[1].text()).toContain('选项一');
      expect(items[1].text()).toContain('描述一');
      expect(items[1].attributes('style')).toContain('color: red');
      expect(items[1].find(`.${name}__list-item-icon`).text()).toContain('icon-name');
      expect(items[1].find(`.${name}__list-item-icon--suffix`).text()).toContain('suffix-icon');
      expect(items[2].classes()).toContain(`${name}__list-item--disabled`);
      expect(items[2].attributes('disabled')).toBeDefined();
    });

    it('items[array]', () => {
      const wrapper = mount(ActionSheetList, {
        props: {
          items: [
            { label: '数字徽标', badge: { count: 1 } },
            { label: '点徽标', badge: { dot: true } },
            { label: '自定义徽标', badge: { content: 'new' } },
          ],
        },
      });

      expect(wrapper.findAllComponents(TBadge)).toHaveLength(2);
      expect(wrapper.text()).toContain('自定义徽标');
    });

    it('icon[function] & suffixIcon[function]', () => {
      const wrapper = mount(ActionSheetList, {
        props: {
          items: [
            {
              label: '自定义图标',
              icon: () => <span class="custom-icon">图标</span>,
              suffixIcon: () => <span class="custom-suffix-icon">后缀</span>,
            },
          ],
        },
      });

      expect(wrapper.find('.custom-icon').text()).toBe('图标');
      expect(wrapper.find('.custom-suffix-icon').text()).toBe('后缀');
    });
  });

  describe('events', () => {
    it('selected', async () => {
      const onSelected = vi.fn();
      const wrapper = mount(ActionSheetList, {
        props: {
          items: [{ label: '选项一' }, { label: '选项二' }],
          onSelected,
        },
      });

      await wrapper.findAll(`.${name}__list-item`)[1].trigger('click');

      expect(wrapper.emitted('selected')).toEqual([[1]]);
      expect(onSelected).toHaveBeenCalledWith(1);
    });

    it('selected[disabled item]', async () => {
      const onSelected = vi.fn();
      const wrapper = mount(ActionSheetList, {
        props: {
          items: [{ label: '禁用项', disabled: true }],
          onSelected,
        },
      });

      await wrapper.find(`.${name}__list-item`).trigger('click');

      expect(onSelected).not.toHaveBeenCalled();
    });
  });
});

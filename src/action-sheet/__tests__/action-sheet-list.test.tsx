import { describe, expect, it } from 'vitest';
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
            { label: '选项零', badge: { count: 1 } },
            {
              label: '选项一',
              description: '描述一',
              color: 'red',
              icon: 'icon-name',
              suffixIcon: () => <span>suffix-icon</span>,
              badge: { dot: true },
            },
            {
              label: '选项二',
              disabled: true,
              badge: { content: 'new' },
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
      expect(wrapper.findAllComponents(TBadge)).toHaveLength(2);
    });

    it('icon[function]', () => {
      const wrapper = mount(ActionSheetList, {
        props: {
          items: [
            {
              label: '自定义图标',
              icon: () => <span class="custom-icon">图标</span>,
            },
          ],
        },
      });

      expect(wrapper.find('.custom-icon').text()).toBe('图标');
    });

    it('suffixIcon[function]', () => {
      const wrapper = mount(ActionSheetList, {
        props: {
          items: [
            {
              label: '自定义后缀图标',
              suffixIcon: () => <span class="custom-suffix-icon">后缀</span>,
            },
          ],
        },
      });

      expect(wrapper.find('.custom-suffix-icon').text()).toBe('后缀');
    });
  });

  // selected 事件已由 action-sheet.test.tsx 的 events 覆盖（同一点击路径且断言公开签名），此处不再重复。
});

import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import CellGroup from '../cell-group';
import type { TdCellGroupProps } from '../type';

const themeList: TdCellGroupProps['theme'][] = ['default', 'card'];

describe('CellGroup', () => {
  describe('props', () => {
    it('bordered[boolean]', async () => {
      // 默认不显示组边框
      const wrapper = mount(() => <CellGroup></CellGroup>);
      expect(wrapper.find('.t-cell-group').classes()).not.toContain('t-cell-group--bordered');

      // bordered 开启后输出组边框类名
      const wrapper2 = mount(() => <CellGroup bordered></CellGroup>);
      expect(wrapper2.find('.t-cell-group').classes()).toContain('t-cell-group--bordered');
    });

    it('theme[default/card]', async () => {
      themeList.forEach((t) => {
        const wrapper = mount(() => <CellGroup theme={t}></CellGroup>);
        const theme = wrapper.find(`.t-cell-group--${t}`);
        expect(theme.exists()).toBeTruthy();
      });
    });

    it('title[string]', async () => {
      const wrapper = mount(() => <CellGroup title="分组标题"></CellGroup>);
      expect(wrapper.find('.t-cell-group__title').text()).toBe('分组标题');

      // 未设置 title 时不渲染标题节点
      const wrapper2 = mount(() => <CellGroup></CellGroup>);
      expect(wrapper2.find('.t-cell-group__title').exists()).toBe(false);
    });
  });
});

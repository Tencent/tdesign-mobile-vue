import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import CellGroup from '../cell-group';

const themeList = ['default', 'card'];

describe('CellGroup', () => {
  describe('props', () => {
    it('theme[default/card]', async () => {
      themeList.forEach((t) => {
        const wrapper = mount(() => <CellGroup theme={t}></CellGroup>);
        const theme = wrapper.find(`.t-cell-group--${t}`);
        expect(theme.exists()).toBeTruthy();
      });
    });
  });
});

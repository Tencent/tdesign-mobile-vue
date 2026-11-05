import { enableAutoUnmount, mount } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import Grid from '../grid';
import GridItem from '../grid-item';
import config from '../../config';
import { trigger } from '@/test/touch';
import { sleep } from '../../shared/util';

const { prefix } = config;
const name = `${prefix}-grid`;

enableAutoUnmount(afterEach);

describe('Grid', () => {
  describe('props', () => {
    it('align[left/center]', () => {
      (['left', 'center'] as const).forEach((align) => {
        const wrapper = mount(Grid, { props: { align }, slots: { default: () => <GridItem /> } });
        expect((wrapper.get(`.${name}-item`).element as HTMLElement).style.textAlign).toBe(align);
      });
    });

    it('border[boolean]', () => {
      const bordered = mount(Grid, { props: { border: true }, slots: { default: () => <GridItem /> } });
      expect(bordered.classes()).toContain(`${name}--bordered`);
      expect(bordered.get(`.${name}-item`).classes()).toContain(`${name}-item--bordered`);

      const plain = mount(Grid, { slots: { default: () => <GridItem /> } });
      expect(plain.classes()).not.toContain(`${name}--bordered`);
      expect(plain.get(`.${name}-item`).classes()).not.toContain(`${name}-item--bordered`);
    });

    it('column[number]', async () => {
      const wrapper = mount(Grid, { props: { column: 5 }, slots: { default: () => <GridItem /> } });
      expect((wrapper.element as HTMLElement).style.gridTemplateColumns).toBe('repeat(5, 1fr)');
      expect((wrapper.get(`.${name}-item`).element as HTMLElement).style.flexBasis).toBe('20%');
      await wrapper.setProps({ column: 2 });
      expect((wrapper.element as HTMLElement).style.gridTemplateColumns).toBe('repeat(2, 1fr)');
      expect((wrapper.get(`.${name}-item`).element as HTMLElement).style.flexBasis).toBe('50%');
    });

    it('gutter[number]', () => {
      const wrapper = mount(Grid, { props: { border: true, gutter: 12 }, slots: { default: () => <GridItem /> } });
      expect(wrapper.attributes('style')).toContain('padding: 12px');
      expect(wrapper.get(`.${name}-item`).classes()).toContain(`${name}-item--surround`);
    });

    it('hover[boolean]', async () => {
      const enabled = mount(Grid, { props: { hover: true }, slots: { default: () => <GridItem /> } });
      const disabled = mount(Grid, { slots: { default: () => <GridItem /> } });
      await trigger(enabled.get(`.${name}-item`).element, 'touchstart');
      await sleep(60);
      expect(enabled.get(`.${name}-item`).classes()).toContain(`${name}-item--hover`);
      await trigger(disabled.get(`.${name}-item`).element, 'touchstart');
      await sleep(60);
      expect(disabled.get(`.${name}-item`).classes()).not.toContain(`${name}-item--hover`);
    });

    it('theme[default/card]', () => {
      (['default', 'card'] as const).forEach((theme) => {
        const wrapper = mount(Grid, { props: { theme }, slots: { default: () => <GridItem /> } });
        if (theme === 'card') {
          expect(wrapper.classes()).toContain(`${name}--card`);
        } else {
          expect(wrapper.classes()).not.toContain(`${name}--card`);
        }
      });
    });

    it('default[slot]', () => {
      const wrapper = mount(Grid, { slots: { default: () => [<GridItem text="一" />, <GridItem text="二" />] } });
      expect(wrapper.findAllComponents(GridItem)).toHaveLength(2);
      expect(wrapper.text()).toContain('一');
      expect(wrapper.text()).toContain('二');
    });
  });

  describe('scenarios', () => {
    it('border with gutter uses item borders without a grid border', () => {
      const wrapper = mount(Grid, { props: { border: true, gutter: 8 }, slots: { default: () => <GridItem /> } });
      expect(wrapper.classes()).not.toContain(`${name}--bordered`);
      expect(wrapper.get(`.${name}-item`).classes()).toContain(`${name}-item--bordered`);
      expect(wrapper.get(`.${name}-item`).classes()).toContain(`${name}-item--surround`);
    });

    it('column zero enables auto sizing and omits grid-template columns', () => {
      const wrapper = mount(Grid, { props: { column: 0 }, slots: { default: () => <GridItem /> } });
      expect(wrapper.classes()).toContain(`${name}--auto-size`);
      expect(wrapper.attributes('style') || '').not.toContain('grid-template-columns');
      expect((wrapper.get(`.${name}-item`).element as HTMLElement).style.flexBasis).toBe('');
    });
  });
});

import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { Indexes, IndexesAnchor } from '../index';
import config from '../../config';

const name = `${config.prefix}-indexes-anchor`;

const mountAnchor = (props: { index?: string | number } = {}, slots: Record<string, unknown> = {}) =>
  mount(Indexes, {
    props: { indexList: ['A'] },
    slots: {
      default: () => h(IndexesAnchor, { index: props.index ?? 'A' }, slots),
    },
  });

describe('IndexesAnchor', () => {
  describe('props', () => {
    it('index[string]', () => {
      const wrapper = mountAnchor({ index: 'B' });
      const anchor = wrapper.get(`.${name}`);
      expect(anchor.attributes('data-index')).toBe('B');
      expect(wrapper.get(`.${name}__header`).text()).toBe('B');
    });

    it('index[number]', () => {
      const wrapper = mountAnchor({ index: 12 });
      expect(wrapper.get(`.${name}`).attributes('data-index')).toBe('12');
      expect(wrapper.get(`.${name}__header`).text()).toBe('12');
    });

    it('default[slot]', () => {
      const wrapper = mountAnchor({ index: 'A' }, { default: () => h('span', { class: 'anchor-slot' }, '自定义锚点') });
      expect(wrapper.get(`.${name}__slot .anchor-slot`).text()).toBe('自定义锚点');
      expect(wrapper.get(`.${name}__header`).text()).toBe('A');
    });
  });

  describe('scenarios', () => {
    it('renders the custom slot above the index header', () => {
      const wrapper = mountAnchor({ index: 'A' }, { default: () => h('span', { class: 'anchor-slot' }, '内容') });
      const wrapperEl = wrapper.get(`.${name}__wrapper`);
      expect(Array.from(wrapperEl.element.children).map((element) => element.className)).toEqual([
        `${name}__slot`,
        `${name}__header`,
      ]);
    });
  });
});

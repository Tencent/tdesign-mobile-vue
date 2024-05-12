import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Row from '../../row';
import Col from '../col';

const prefix = 't';
const rowName = `${prefix}-row`;
const colName = `${prefix}-col`;

const TEXT = 'tdesign-mobile-vue';

describe('row', () => {
  describe('props', () => {
    it(':gutter', async () => {
      const wrapper = mount(Row, {
        props: {
          gutter: '100',
        },
      });
      expect(wrapper.attributes.style).toBe('margin-right: -50px; margin-left: -50px;');
      expect(wrapper.classes()).toContain(`${rowName}`);
    });
  });
});

describe('col', () => {
  describe('props', () => {
    it(':offset', async () => {
      const wrapper = mount(Col, {
        props: {
          offset: '2',
        },
      });
      expect(wrapper.classes()).toContain(`${colName}--offset-2`);
    });

    it(':span', async () => {
      const wrapper = mount(Col, {
        props: {
          span: '2',
          content: TEXT,
        },
      });
      expect(wrapper.classes()).toContain(`${colName}--2`);
      expect(wrapper.text()).toBe(TEXT);
    });
  });
});


import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Row from '../row';
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
          gutter: 100,
        },
      });
      expect(wrapper.attributes().style).toBe('margin-right: -50px; margin-left: -50px;');
      expect(wrapper.classes()).toContain(`${rowName}`);
    });
  });
});

describe('col', () => {
  describe('props', () => {
    it(':offset', async () => {
      const wrapper = mount(() => {
        return (
          <Row gutter="100">
            <Col offset="2" />
          </Row>
        );
      });
      const col = wrapper.findComponent(Col);
      expect(col.classes()).toContain(`${colName}--offset-2`);
    });

    it(':span', async () => {
      const wrapper = mount(() => {
        return (
          <Row gutter="100">
            <Col span="2">{TEXT}</Col>
          </Row>
        );
      });
      const col = wrapper.findComponent(Col);
      expect(col.classes()).toContain(`${colName}--2`);
      expect(col.text()).toBe(TEXT);
    });
  });
});

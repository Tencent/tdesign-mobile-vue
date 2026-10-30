import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Row from '../row';
import Col from '../col';

const prefix = 't';
const colName = `${prefix}-col`;
const TEXT = 'tdesign-mobile-vue';

describe('Col', () => {
  describe('props', () => {
    it('offset[number]', async () => {
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

    it('span[number]', async () => {
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

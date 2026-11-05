import { enableAutoUnmount, mount } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import Row from '../row';
import Col from '../col';
import config from '../../config';

const { prefix } = config;
const colName = `${prefix}-col`;
const TEXT = 'tdesign-mobile-vue';

enableAutoUnmount(afterEach);

describe('Col', () => {
  describe('props', () => {
    it('offset[string]', () => {
      const wrapper = mount(Row, { slots: { default: () => <Col offset="2" /> } });
      expect(wrapper.findComponent(Col).classes()).toContain(`${colName}--offset-2`);
    });

    it('offset[number]', () => {
      const wrapper = mount(Row, { slots: { default: () => <Col offset={3} /> } });
      const classes = wrapper.findComponent(Col).classes();
      expect(classes).toContain(`${colName}--offset-3`);
      expect(classes).not.toContain(`${colName}--offset-2`);
    });

    it('span[string]', () => {
      const wrapper = mount(Row, { slots: { default: () => <Col span="2">{TEXT}</Col> } });
      const col = wrapper.findComponent(Col);
      expect(col.classes()).toContain(`${colName}--2`);
      expect(col.text()).toBe(TEXT);
    });

    it('span[number]', () => {
      const wrapper = mount(Row, { slots: { default: () => <Col span={4} /> } });
      const classes = wrapper.findComponent(Col).classes();
      expect(classes).toContain(`${colName}--4`);
      expect(classes).not.toContain(`${colName}--2`);
    });

    it('default[slot]', () => {
      const wrapper = mount(Row, { slots: { default: () => <Col span="2">{TEXT}</Col> } });
      expect(wrapper.findComponent(Col).text()).toBe(TEXT);
    });
  });
});

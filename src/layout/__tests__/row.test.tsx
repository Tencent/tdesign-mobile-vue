import { enableAutoUnmount, mount } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import Row from '../row';
import Col from '../col';
import config from '../../config';

const { prefix } = config;
const rowName = `${prefix}-row`;

enableAutoUnmount(afterEach);

describe('Row', () => {
  describe('props', () => {
    it('gutter[string]', () => {
      // 数字字符串按 px 数值参与计算
      expect(mount(Row, { props: { gutter: '100' } }).attributes('style')).toBe(
        'margin-right: -50px; margin-left: -50px;',
      );

      // 带单位字符串参与除法得到 NaN，样式无效
      expect(mount(Row, { props: { gutter: '2rem' } }).attributes('style')).toBeUndefined();
    });

    it('gutter[number]', async () => {
      const wrapper = mount(Row, { props: { gutter: 100 } });
      expect(wrapper.attributes('style')).toBe('margin-right: -50px; margin-left: -50px;');
      expect(wrapper.classes()).toContain(rowName);

      await wrapper.setProps({ gutter: 20 });
      expect(wrapper.attributes('style')).toBe('margin-right: -10px; margin-left: -10px;');

      // 未设置 gutter 时不输出负外边距
      expect(mount(Row).attributes('style')).toBeUndefined();
    });

    it('default[slot]', () => {
      const wrapper = mount(Row, { slots: { default: () => <Col span="2">内容</Col> } });
      expect(wrapper.findComponent(Col).text()).toBe('内容');
    });
  });

  describe('scenarios', () => {
    // provide 传入的是普通对象（gutter 为初始值快照），更新 gutter 不会同步已有子列内边距。
    it.todo('updates child column padding when gutter changes');
    // 带单位字符串 gutter 计算为 NaN，无法用于 rem/em 等单位。
    it.todo('gutter supports css unit strings');
  });
});

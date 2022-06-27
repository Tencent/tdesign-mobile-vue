/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { mount } from '@vue/test-utils';
import Badge from '../../../src/badge';
import { h } from 'vue';

describe('Badge', () => {
  describe(':props', () => {
    // 颜色: 
    it('color', () => {
      const wrapper = mount(Badge, {
        propsData: {"color":"","content":"测试"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
    it('count', () => {
      const wrapper = mount(Badge, {
        propsData: {
          count: () => h('div', 'text')
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });

    it('count', () => {
      const wrapper = mount(Badge, {
        propsData: {
          count: 'text'
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 是否为红点: false
    it('dot', () => {
      const wrapper = mount(Badge, {
        propsData: {"color":"green","content":"测试","dot":true},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 封顶的数字值: 99
    it('maxCount', () => {
      const wrapper = mount(Badge, {
        propsData: {"color":"green","content":"测试","maxCount":"99"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 设置状态点的位置偏移，示例：[-10, 20] 或 ['10em', '8rem']: 
    it('offset', () => {
      const wrapper = mount(Badge, {
        propsData: {"color":"green","content":"测试","offset":""},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 形状: circle
    it('shape', () => {
      const wrapper = mount(Badge, {
        propsData: {"color":"green","content":"测试","shape":"circle"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 形状: round
    it('shape', () => {
      const wrapper = mount(Badge, {
        propsData: {"color":"green","content":"测试","shape":"round"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 形状: ribbon
    it('shape', () => {
      const wrapper = mount(Badge, {
        propsData: {"color":"green","content":"测试","shape":"ribbon"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 当数值为 0 时，是否展示徽标: false
    it('showZero', () => {
      const wrapper = mount(Badge, {
        propsData: {"color":"green","content":"测试","showZero":true},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 尺寸: small
    it('size', () => {
      const wrapper = mount(Badge, {
        propsData: {"color":"green","content":"测试","size":"small"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 尺寸: medium
    it('size', () => {
      const wrapper = mount(Badge, {
        propsData: {"color":"green","content":"测试","size":"medium"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
  });
});
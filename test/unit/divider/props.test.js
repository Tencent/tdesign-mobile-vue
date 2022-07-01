/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { mount } from '@vue/test-utils';
import Divider from '../../../src/divider';
import { h } from 'vue';

describe('Divider', () => {
  describe(':props', () => {
    // 文本位置（仅在水平分割线有效）: left
    it('align', () => {
      const wrapper = mount(Divider, {
        propsData: {"align":"left"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 文本位置（仅在水平分割线有效）: right
    it('align', () => {
      const wrapper = mount(Divider, {
        propsData: {"align":"right"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 文本位置（仅在水平分割线有效）: center
    it('align', () => {
      const wrapper = mount(Divider, {
        propsData: {"align":"center"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
    it('content', () => {
      const wrapper = mount(Divider, {
        propsData: {
          content: () => h('div', 'text')
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });

    it('content', () => {
      const wrapper = mount(Divider, {
        propsData: {
          content: 'text'
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 是否虚线（仅在水平分割线有效）: false
    it('dashed', () => {
      const wrapper = mount(Divider, {
        propsData: {"dashed":true},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
    it('default', () => {
      const wrapper = mount(Divider, {
        propsData: {
          default: () => h('div', 'text')
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });

    it('default', () => {
      const wrapper = mount(Divider, {
        propsData: {
          default: 'text'
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 分隔线类型有两种：水平和垂直: horizontal
    it('layout', () => {
      const wrapper = mount(Divider, {
        propsData: {"layout":"horizontal"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 分隔线类型有两种：水平和垂直: vertical
    it('layout', () => {
      const wrapper = mount(Divider, {
        propsData: {"layout":"vertical"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 分隔线颜色: 
    it('lineColor', () => {
      const wrapper = mount(Divider, {
        propsData: {"lineColor":""},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
  });
});
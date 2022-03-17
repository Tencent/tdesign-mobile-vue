/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { mount } from '@vue/test-utils';
import Radio from '../../../src/radio';
import { h } from 'vue';

describe('Radio', () => {
  describe(':props', () => {
    // 复选框和内容相对位置: left
    it('align', () => {
      const wrapper = mount(Radio, {
        propsData: {"align":"left"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 复选框和内容相对位置: right
    it('align', () => {
      const wrapper = mount(Radio, {
        propsData: {"align":"right"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 是否选中: false
    it('checked', () => {
      const wrapper = mount(Radio, {
        propsData: {"checked":true},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
    it('content', () => {
      const fn = jest.fn();
      const wrapper = mount(Radio, {
        propsData: {
          content: () => h('div', 'text')
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });

    it('content', () => {
      const fn = jest.fn();
      const wrapper = mount(Radio, {
        propsData: {
          content: 'text'
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 是否禁用组件内容（content）触发选中: false
    it('contentDisabled', () => {
      const wrapper = mount(Radio, {
        propsData: {"contentDisabled":true},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
    it('default', () => {
      const fn = jest.fn();
      const wrapper = mount(Radio, {
        propsData: {
          default: () => h('div', 'text')
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });

    it('default', () => {
      const fn = jest.fn();
      const wrapper = mount(Radio, {
        propsData: {
          default: 'text'
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
    it('label', () => {
      const fn = jest.fn();
      const wrapper = mount(Radio, {
        propsData: {
          label: () => h('div', 'text')
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });

    it('label', () => {
      const fn = jest.fn();
      const wrapper = mount(Radio, {
        propsData: {
          label: 'text'
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// HTML 元素原生属性: 
    it('name', () => {
      const wrapper = mount(Radio, {
        propsData: {"name":""},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 单选按钮的值: false
    it('value', () => {
      const wrapper = mount(Radio, {
        propsData: {"value":true},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
  });
});
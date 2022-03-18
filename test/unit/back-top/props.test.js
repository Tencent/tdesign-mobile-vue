/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { mount } from '@vue/test-utils';
import BackTop from '../../../src/back-top';
import { h } from 'vue';

describe('BackTop', () => {
  describe(':props', () => {
    // 是否绝对定位固定到屏幕右下方: true
    it('fixed', () => {
      const wrapper = mount(BackTop, {
        propsData: {"text":"返回","fixed":true},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
    it('icon', () => {
      const fn = jest.fn();
      const wrapper = mount(BackTop, {
        propsData: {
          icon: () => h('div', 'text')
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });

    it('icon', () => {
      const fn = jest.fn();
      const wrapper = mount(BackTop, {
        propsData: {
          icon: 'text'
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 定位滚动到指定对象: 
    it('target', () => {
      const wrapper = mount(BackTop, {
        propsData: {"text":"返回","target":""},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 预设的样式类型: round
    it('theme', () => {
      const wrapper = mount(BackTop, {
        propsData: {"text":"返回","theme":"round"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 预设的样式类型: half-round
    it('theme', () => {
      const wrapper = mount(BackTop, {
        propsData: {"text":"返回","theme":"half-round"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 预设的样式类型: round-dark
    it('theme', () => {
      const wrapper = mount(BackTop, {
        propsData: {"text":"返回","theme":"round-dark"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 预设的样式类型: half-round-dark
    it('theme', () => {
      const wrapper = mount(BackTop, {
        propsData: {"text":"返回","theme":"half-round-dark"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
  });
});
/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { mount } from '@vue/test-utils';
import Button from '../../../src/button';
import { h } from 'vue';

describe('Button', () => {
  describe(':props', () => {
    // 是否为块级元素: false
    it('block', () => {
      const wrapper = mount(Button, {
        propsData: {"content":"我是按钮","block":true},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
    it('content', () => {
      const fn = jest.fn();
      const wrapper = mount(Button, {
        propsData: {
          content: () => h('div', 'text')
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });

    it('content', () => {
      const fn = jest.fn();
      const wrapper = mount(Button, {
        propsData: {
          content: 'text'
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
    it('disabled', () => {
      const fn = jest.fn();
      const wrapper = mount(Button, {
        propsData: {
          disabled: true,
          onClick: fn,
        },
      });
      wrapper.trigger('click');
      expect(fn).not.toHaveBeenCalled();
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 是否禁用按钮: false
    it('disabled', () => {
      const wrapper = mount(Button, {
        propsData: {"content":"按钮1","disabled":true},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 是否为幽灵按钮（镂空按钮）: false
    it('ghost', () => {
      const wrapper = mount(Button, {
        propsData: {"content":"我是按钮","ghost":true},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
    it('icon', () => {
      const fn = jest.fn();
      const wrapper = mount(Button, {
        propsData: {
          icon: () => h('div', 'text')
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });

    it('icon', () => {
      const fn = jest.fn();
      const wrapper = mount(Button, {
        propsData: {
          icon: 'text'
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 是否显示为加载状态: false
    it('loading', () => {
      const wrapper = mount(Button, {
        propsData: {"content":"我是按钮","loading":true},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 按钮形状，有二种：方形、圆角方形 : square
    it('shape', () => {
      const wrapper = mount(Button, {
        propsData: {"content":"我是按钮","shape":"square"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 按钮形状，有二种：方形、圆角方形 : round
    it('shape', () => {
      const wrapper = mount(Button, {
        propsData: {"content":"我是按钮","shape":"round"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 组件尺寸: small
    it('size', () => {
      const wrapper = mount(Button, {
        propsData: {"content":"我是按钮","size":"small"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 组件尺寸: medium
    it('size', () => {
      const wrapper = mount(Button, {
        propsData: {"content":"我是按钮","size":"medium"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 组件尺寸: large
    it('size', () => {
      const wrapper = mount(Button, {
        propsData: {"content":"我是按钮","size":"large"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 组件风格，依次为品牌色、危险色: default
    it('theme', () => {
      const wrapper = mount(Button, {
        propsData: {"content":"我是按钮","theme":"default"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 组件风格，依次为品牌色、危险色: primary
    it('theme', () => {
      const wrapper = mount(Button, {
        propsData: {"content":"我是按钮","theme":"primary"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 组件风格，依次为品牌色、危险色: danger
    it('theme', () => {
      const wrapper = mount(Button, {
        propsData: {"content":"我是按钮","theme":"danger"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 按钮形式，基础、线框、文字: base
    it('variant', () => {
      const wrapper = mount(Button, {
        propsData: {"content":"我是按钮","variant":"base"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 按钮形式，基础、线框、文字: outline
    it('variant', () => {
      const wrapper = mount(Button, {
        propsData: {"content":"我是按钮","variant":"outline"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 按钮形式，基础、线框、文字: text
    it('variant', () => {
      const wrapper = mount(Button, {
        propsData: {"content":"我是按钮","variant":"text"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
  });
});
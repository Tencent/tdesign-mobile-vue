/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { mount } from '@vue/test-utils';
import Image from '../../../src/image';
import { h } from 'vue';

describe('Image', () => {
  describe(':props', () => {
    // 图片描述: 
    it('alt', () => {
      const wrapper = mount(Image, {
        propsData: {"alt":"","src":"https://tdesign.gtimg.com/site/upload1.png"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
    it('error', () => {
      const fn = jest.fn();
      const wrapper = mount(Image, {
        propsData: {
          error: () => h('div', 'text')
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });

    it('error', () => {
      const fn = jest.fn();
      const wrapper = mount(Image, {
        propsData: {
          error: 'text'
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 图片填充模式: contain
    it('fit', () => {
      const wrapper = mount(Image, {
        propsData: {"alt":"图片占位","src":"https://tdesign.gtimg.com/site/upload1.png","fit":"contain"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 图片填充模式: cover
    it('fit', () => {
      const wrapper = mount(Image, {
        propsData: {"alt":"图片占位","src":"https://tdesign.gtimg.com/site/upload1.png","fit":"cover"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 图片填充模式: fill
    it('fit', () => {
      const wrapper = mount(Image, {
        propsData: {"alt":"图片占位","src":"https://tdesign.gtimg.com/site/upload1.png","fit":"fill"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 图片填充模式: none
    it('fit', () => {
      const wrapper = mount(Image, {
        propsData: {"alt":"图片占位","src":"https://tdesign.gtimg.com/site/upload1.png","fit":"none"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 图片填充模式: scale-down
    it('fit', () => {
      const wrapper = mount(Image, {
        propsData: {"alt":"图片占位","src":"https://tdesign.gtimg.com/site/upload1.png","fit":"scale-down"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 是否开启图片懒加载: false
    it('lazy', () => {
      const wrapper = mount(Image, {
        propsData: {"alt":"图片占位","src":"https://tdesign.gtimg.com/site/upload1.png","lazy":true},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
    it('loading', () => {
      const fn = jest.fn();
      const wrapper = mount(Image, {
        propsData: {
          loading: () => h('div', 'text')
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });

    it('loading', () => {
      const fn = jest.fn();
      const wrapper = mount(Image, {
        propsData: {
          loading: 'text'
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 等同于原生的 object-position 属性，可选值为 top right bottom left 或 string，可以自定义任何px或者百分比: center
    it('position', () => {
      const wrapper = mount(Image, {
        propsData: {"alt":"图片占位","src":"https://tdesign.gtimg.com/site/upload1.png","position":"center"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 图片圆角类型: circle
    it('shape', () => {
      const wrapper = mount(Image, {
        propsData: {"alt":"图片占位","src":"https://tdesign.gtimg.com/site/upload1.png","shape":"circle"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 图片圆角类型: round
    it('shape', () => {
      const wrapper = mount(Image, {
        propsData: {"alt":"图片占位","src":"https://tdesign.gtimg.com/site/upload1.png","shape":"round"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 图片圆角类型: square
    it('shape', () => {
      const wrapper = mount(Image, {
        propsData: {"alt":"图片占位","src":"https://tdesign.gtimg.com/site/upload1.png","shape":"square"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
  });
});
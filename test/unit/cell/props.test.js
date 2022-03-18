/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { mount } from '@vue/test-utils';
import Cell from '../../../src/cell';
import { h } from 'vue';

describe('Cell', () => {
  describe(':props', () => {
    // 内容的对齐方式，默认居中对齐: top
    it('align', () => {
      const wrapper = mount(Cell, {
        propsData: {"align":"top"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 内容的对齐方式，默认居中对齐: middle
    it('align', () => {
      const wrapper = mount(Cell, {
        propsData: {"align":"middle"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 内容的对齐方式，默认居中对齐: bottom
    it('align', () => {
      const wrapper = mount(Cell, {
        propsData: {"align":"bottom"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 是否显示右侧箭头: false
    it('arrow', () => {
      const wrapper = mount(Cell, {
        propsData: {"arrow":true},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 是否显示下边框: true
    it('bordered', () => {
      const wrapper = mount(Cell, {
        propsData: {"bordered":true},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
    it('description', () => {
      const fn = jest.fn();
      const wrapper = mount(Cell, {
        propsData: {
          description: () => h('div', 'text')
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });

    it('description', () => {
      const fn = jest.fn();
      const wrapper = mount(Cell, {
        propsData: {
          description: 'text'
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 是否开启点击反馈: 
    it('hover', () => {
      const wrapper = mount(Cell, {
        propsData: {"hover":""},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
    it('image', () => {
      const fn = jest.fn();
      const wrapper = mount(Cell, {
        propsData: {
          image: () => h('div', 'text')
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });

    it('image', () => {
      const fn = jest.fn();
      const wrapper = mount(Cell, {
        propsData: {
          image: 'text'
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
    it('leftIcon', () => {
      const fn = jest.fn();
      const wrapper = mount(Cell, {
        propsData: {
          leftIcon: () => h('div', 'text')
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });

    it('leftIcon', () => {
      const fn = jest.fn();
      const wrapper = mount(Cell, {
        propsData: {
          leftIcon: 'text'
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
    it('note', () => {
      const fn = jest.fn();
      const wrapper = mount(Cell, {
        propsData: {
          note: () => h('div', 'text')
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });

    it('note', () => {
      const fn = jest.fn();
      const wrapper = mount(Cell, {
        propsData: {
          note: 'text'
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 是否显示表单必填星号: false
    it('required', () => {
      const wrapper = mount(Cell, {
        propsData: {"required":true},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
    it('rightIcon', () => {
      const fn = jest.fn();
      const wrapper = mount(Cell, {
        propsData: {
          rightIcon: () => h('div', 'text')
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });

    it('rightIcon', () => {
      const fn = jest.fn();
      const wrapper = mount(Cell, {
        propsData: {
          rightIcon: 'text'
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
    it('title', () => {
      const fn = jest.fn();
      const wrapper = mount(Cell, {
        propsData: {
          title: () => h('div', 'text')
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });

    it('title', () => {
      const fn = jest.fn();
      const wrapper = mount(Cell, {
        propsData: {
          title: 'text'
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
  });
});
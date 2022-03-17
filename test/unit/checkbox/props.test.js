/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { mount } from '@vue/test-utils';
import Checkbox from '../../../src/checkbox';
import { h } from 'vue';

describe('Checkbox', () => {
  describe(':props', () => {
    // 复选框和内容相对位置: left
    it('align', () => {
      const wrapper = mount(Checkbox, {
        propsData: {"align":"left"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 复选框和内容相对位置: right
    it('align', () => {
      const wrapper = mount(Checkbox, {
        propsData: {"align":"right"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 用于标识是否为「全选选项」。单独使用无效，需在 CheckboxGroup 中使用: false
    it('checkAll', () => {
      const wrapper = mount(Checkbox, {
        propsData: {"checkAll":true},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 是否选中: false
    it('checked', () => {
      const wrapper = mount(Checkbox, {
        propsData: {"checked":true},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
    it('content', () => {
      const fn = jest.fn();
      const wrapper = mount(Checkbox, {
        propsData: {
          content: () => h('div', 'text')
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });

    it('content', () => {
      const fn = jest.fn();
      const wrapper = mount(Checkbox, {
        propsData: {
          content: 'text'
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 是否禁用组件内容（content）触发选中: 
    it('contentDisabled', () => {
      const wrapper = mount(Checkbox, {
        propsData: {"contentDisabled":""},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
    it('default', () => {
      const fn = jest.fn();
      const wrapper = mount(Checkbox, {
        propsData: {
          default: () => h('div', 'text')
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });

    it('default', () => {
      const fn = jest.fn();
      const wrapper = mount(Checkbox, {
        propsData: {
          default: 'text'
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
    it('icon', () => {
      const wrapper = mount(Checkbox, {
        propsData: {"icon":""},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 是否为半选: false
    it('indeterminate', () => {
      const wrapper = mount(Checkbox, {
        propsData: {"indeterminate":true},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
    it('label', () => {
      const fn = jest.fn();
      const wrapper = mount(Checkbox, {
        propsData: {
          label: () => h('div', 'text')
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });

    it('label', () => {
      const fn = jest.fn();
      const wrapper = mount(Checkbox, {
        propsData: {
          label: 'text'
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 内容最大行数限制: 5
    it('maxContentRow', () => {
      const wrapper = mount(Checkbox, {
        propsData: {"maxContentRow":"5"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 主文案最大行数限制: 3
    it('maxLabelRow', () => {
      const wrapper = mount(Checkbox, {
        propsData: {"maxLabelRow":"3"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// HTML 元素原生属性: 
    it('name', () => {
      const wrapper = mount(Checkbox, {
        propsData: {"name":""},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 只读状态: false
    it('readonly', () => {
      const wrapper = mount(Checkbox, {
        propsData: {"readonly":true},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 复选框的值: 
    it('value', () => {
      const wrapper = mount(Checkbox, {
        propsData: {"value":""},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
  });
});
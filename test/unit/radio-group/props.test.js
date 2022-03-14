/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { mount } from '@vue/test-utils';
import RadioGroup from '../../../src/radio-group';
import { h } from 'vue';

describe('RadioGroup', () => {
  describe(':props', () => {
    
    it('disabled', () => {
      const fn = jest.fn();
      const wrapper = mount(RadioGroup, {
        propsData: {
          disabled: true,
          onClick: fn,
        },
      });
      wrapper.trigger('click');
      expect(fn).not.toHaveBeenCalled();
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 是否禁用全部子单选框: undefined
    it('disabled', () => {
      const wrapper = mount(RadioGroup, {
        propsData: {"disabled":"undefined"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// HTML 元素原生属性: 
    it('name', () => {
      const wrapper = mount(RadioGroup, {
        propsData: {"name":""},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 单选组件按钮形式。RadioOption 数据类型为 string 或 number 时，表示 label 和 value 值相同: 
    it('options', () => {
      const wrapper = mount(RadioGroup, {
        propsData: {"options":""},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 选中的值: false
    it('value', () => {
      const wrapper = mount(RadioGroup, {
        propsData: {"value":true},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
  });
});
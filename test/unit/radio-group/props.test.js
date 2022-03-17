/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { mount } from '@vue/test-utils';
import RadioGroup from '../../../src/radio-group';
import { h } from 'vue';

describe('RadioGroup', () => {
  describe(':props', () => {
    
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
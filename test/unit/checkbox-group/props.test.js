/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { mount } from '@vue/test-utils';
import CheckboxGroup from '../../../src/checkbox-group';
import { h } from 'vue';

describe('CheckboxGroup', () => {
  describe(':props', () => {
    
    it('disabled', () => {
      const fn = jest.fn();
      const wrapper = mount(CheckboxGroup, {
        propsData: {
          disabled: true,
          onClick: fn,
        },
      });
      wrapper.trigger('click');
      expect(fn).not.toHaveBeenCalled();
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 是否禁用组件: false
    it('disabled', () => {
      const wrapper = mount(CheckboxGroup, {
        propsData: {"disabled":true},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 支持最多选中的数量: undefined
    it('max', () => {
      const wrapper = mount(CheckboxGroup, {
        propsData: {"max":"undefined"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 统一设置内部复选框 HTML 属性: 
    it('name', () => {
      const wrapper = mount(CheckboxGroup, {
        propsData: {"name":""},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 以配置形式设置子元素。示例1：`['北京', '上海']` ，示例2: `[{ label: '全选', checkAll: true }, { label: '上海', value: 'shanghai' }]`。checkAll 值为 true 表示当前选项为「全选选项」: []
    it('options', () => {
      const wrapper = mount(CheckboxGroup, {
        propsData: {"options":"[]"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 选中值: []
    it('value', () => {
      const wrapper = mount(CheckboxGroup, {
        propsData: {"value":"[]"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
  });
});
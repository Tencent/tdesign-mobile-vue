/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { mount } from '@vue/test-utils';
import Avatar from '../../../src/avatar';
import { h } from 'vue';

describe('Avatar', () => {
  describe(':props', () => {
    // 头像替换文本，仅当图片加载失败时有效: 
    it('alt', () => {
      const wrapper = mount(Avatar, {
        propsData: {"image":"https://tdesign.gtimg.com/mobile/demos/avatar_1.png","alt":""},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 头像右上角提示信息，继承 Badge 组件的全部特性。如：小红点，或者数字: 
    it('badgeProps', () => {
      const wrapper = mount(Avatar, {
        propsData: {"image":"https://tdesign.gtimg.com/mobile/demos/avatar_1.png","badgeProps":""},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 加载失败时隐藏图片: false
    it('hideOnLoadFailed', () => {
      const wrapper = mount(Avatar, {
        propsData: {"image":"https://tdesign.gtimg.com/mobile/demos/none.png","hideOnLoadFailed":true},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
    it('icon', () => {
      const fn = jest.fn();
      const wrapper = mount(Avatar, {
        propsData: {
          icon: () => h('div', 'text')
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });

    it('icon', () => {
      const fn = jest.fn();
      const wrapper = mount(Avatar, {
        propsData: {
          icon: 'text'
        },
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 图片地址: 
    it('image', () => {
      const wrapper = mount(Avatar, {
        propsData: {"image":""},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 形状: circle
    it('shape', () => {
      const wrapper = mount(Avatar, {
        propsData: {"image":"https://tdesign.gtimg.com/mobile/demos/avatar_1.png","shape":"circle"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 形状: round
    it('shape', () => {
      const wrapper = mount(Avatar, {
        propsData: {"image":"https://tdesign.gtimg.com/mobile/demos/avatar_1.png","shape":"round"},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });// 尺寸，示例值：small/medium/large/24px/38px 等，默认为 large: 
    it('size', () => {
      const wrapper = mount(Avatar, {
        propsData: {"image":"https://tdesign.gtimg.com/mobile/demos/avatar_1.png","size":""},
      });
      expect(wrapper.wrapperElement).toMatchSnapshot();
    });
  });
});
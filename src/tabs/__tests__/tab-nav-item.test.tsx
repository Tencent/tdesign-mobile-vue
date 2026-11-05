import { enableAutoUnmount, mount } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import TabNavItem from '../tab-nav-item';
import { name } from './mount';

enableAutoUnmount(afterEach);

describe('TabNavItem', () => {
  describe('props', () => {
    it('label[string]', () => {
      const wrapper = mount(TabNavItem, { props: { label: '标签' } });

      expect(wrapper.text()).toBe('标签');
      // 无图标时不渲染图标容器
      expect(wrapper.find(`.${name}__icon`).exists()).toBe(false);
    });

    it('label[function]', () => {
      const wrapper = mount(TabNavItem, {
        props: { label: () => <b class="custom-label">函数标签</b> },
      });

      expect(wrapper.find('.custom-label').exists()).toBe(true);
      expect(wrapper.text()).toBe('函数标签');
    });

    it('icon[function]', () => {
      const wrapper = mount(TabNavItem, {
        props: { icon: () => <span class="custom-icon">图标</span> },
      });

      // 图标渲染在图标容器内
      const $icon = wrapper.find(`.${name}__icon`);
      expect($icon.exists()).toBe(true);
      expect($icon.find('.custom-icon').exists()).toBe(true);
      expect($icon.text()).toBe('图标');
    });

    it('default[slot]', () => {
      const wrapper = mount(TabNavItem, {
        props: { label: '属性标签' },
        slots: { default: () => <span class="default-slot">默认插槽</span> },
      });

      // default 插槽优先于 label 属性
      expect(wrapper.find('.default-slot').exists()).toBe(true);
      expect(wrapper.text()).not.toContain('属性标签');
    });
  });
});

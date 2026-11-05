import { enableAutoUnmount, mount } from '@vue/test-utils';
import { afterEach, describe, it, expect } from 'vitest';
import TImage from '../../image';
import Empty from '../empty';

enableAutoUnmount(afterEach);

describe('Empty', () => {
  describe('props', () => {
    it('action[function]', () => {
      const wrapper = mount(Empty, {
        props: {
          action: () => 'some function action',
        },
      });
      const dom = wrapper.find('.t-empty__actions');
      expect(dom.text()).toBe('some function action');
    });

    it('action[slot]', () => {
      const wrapper = mount(Empty, { slots: { action: () => <button>重新加载</button> } });
      expect(wrapper.get('.t-empty__actions button').text()).toBe('重新加载');
    });

    it('description[string]', () => {
      const description = '描述内容';
      const wrapper = mount(Empty, {
        props: {
          description,
        },
      });
      const dom = wrapper.find('.t-empty__description');
      expect(dom.text()).toBe(description);
    });

    it('description[function]', () => {
      const wrapper = mount(Empty, {
        props: {
          description: () => '函数描述内容',
        },
      });
      const dom = wrapper.find('.t-empty__description');
      expect(dom.text()).toBe('函数描述内容');
    });

    it('description[slot]', () => {
      const wrapper = mount(Empty, { slots: { description: () => <span>插槽描述</span> } });
      expect(wrapper.get('.t-empty__description span').text()).toBe('插槽描述');
    });

    it('icon[string]', () => {
      const icon = 'some icon';
      const wrapper = mount(Empty, {
        props: {
          icon,
        },
      });
      const dom = wrapper.find('.t-empty__icon');
      expect(dom.text()).toBe(icon);
    });

    it('icon[function]', () => {
      const wrapper = mount(Empty, {
        props: {
          icon: () => 'some function icon',
        },
      });
      const dom = wrapper.find('.t-empty__icon');
      expect(dom.text()).toBe('some function icon');
    });

    it('icon[slot]', () => {
      const wrapper = mount(Empty, { slots: { icon: () => <span>插槽图标</span> } });
      expect(wrapper.get('.t-empty__icon span').text()).toBe('插槽图标');
    });

    it('image[string]', () => {
      const image = 'some string';
      const wrapper = mount(Empty, {
        props: {
          image,
        },
      });
      const childWrapper = wrapper.findComponent(TImage);
      expect(childWrapper.exists()).toBe(true);
      expect(childWrapper.props('src')).toBe(image);
    });

    it('image[function]', () => {
      const wrapper = mount(Empty, {
        props: { image: () => <span class="image-node">图片节点</span> },
      });
      expect(wrapper.get('.t-empty__thumb .image-node').text()).toBe('图片节点');
      expect(wrapper.findComponent(TImage).exists()).toBe(false);
    });

    it('image[slot]', () => {
      const wrapper = mount(Empty, { slots: { image: () => <img class="slot-image" src="empty.png" /> } });
      expect(wrapper.get('.t-empty__thumb .slot-image').attributes('src')).toBe('empty.png');
    });
  });
});

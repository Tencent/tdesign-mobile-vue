import { mount } from '@vue/test-utils';
import TImage from '../../image';
import Empty from '../empty';

describe('Empty', () => {
  describe('props', () => {
    it('description[string]', () => {
      const description = '描述内容';
      const wrapper = mount(Empty, {
        props: {
          description,
        },
      });
      const dom = wrapper.find('.t-empty__description');
      expect(dom?.element?.innerHTML).toBe(description);
    });

    it('description[function]', () => {
      const wrapper = mount(Empty, {
        props: {
          description: () => '函数描述内容',
        },
      });
      const dom = wrapper.find('.t-empty__description');
      expect(dom?.element?.innerHTML).toBe('函数描述内容');
    });

    it('action[string]', () => {
      const action = 'some action';
      const wrapper = mount(Empty, {
        props: {
          action,
        },
      });
      const dom = wrapper.find('.t-empty__actions');
      expect(dom?.element?.innerHTML).toBe(action);
      const icons = wrapper.findAll('.t-empty__icon');
      expect(icons.length).toBe(0);
    });

    it('action[function]', () => {
      const wrapper = mount(Empty, {
        props: {
          action: () => 'some function action',
        },
      });
      const dom = wrapper.find('.t-empty__actions');
      expect(dom?.element?.innerHTML).toBe('some function action');
    });

    it('icon[string]', () => {
      const icon = 'some icon';
      const wrapper = mount(Empty, {
        props: {
          icon,
        },
      });
      const dom = wrapper.find('.t-empty__icon');
      expect(dom?.element?.innerHTML).toBe(icon);
    });

    it('icon[function]', () => {
      const wrapper = mount(Empty, {
        props: {
          icon: () => 'some function icon',
        },
      });
      const dom = wrapper.find('.t-empty__icon');
      expect(dom?.element?.innerHTML).toBe('some function icon');
    });

    it('image[vnode]', () => {
      const image = <img class="test-img" />;
      const wrapper = mount(Empty, {
        props: {
          image,
        },
      });
      const dom = wrapper.findAll('.t-empty__thumb .test-img');
      expect(dom.length).toBe(1);
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
  });
});

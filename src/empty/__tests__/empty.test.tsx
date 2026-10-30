import { mount } from '@vue/test-utils';
import TImage from '../../image';
import Empty from '../empty';

describe('Empty', () => {
  describe('props', () => {
    it('action[function]', () => {
      const wrapper = mount(Empty, {
        props: {
          action: () => 'some function action',
        },
      });
      const dom = wrapper.find('.t-empty__actions');
      expect(dom?.element?.innerHTML).toBe('some function action');
    });

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

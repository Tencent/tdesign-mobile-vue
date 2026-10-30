import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import Icon from '../index';
import '../icon-svg-props';
import '../iconfont-props';

describe('Icon', () => {
  describe('props', () => {
    it('name[string]', () => {
      const wrapper = mount(<Icon name="apple" />);
      expect(wrapper.find('.t-icon.t-icon-apple')).toBeTruthy();
    });

    it('size[string]', () => {
      const testSize = (size, target, fontSize) => {
        const wrapper = mount(<Icon name="apple" size={size} />);
        if (target) {
          expect(wrapper.find(`.t-icon.t-icon-apple.t-size-${target}`).exists()).toBeTruthy();
        } else if (fontSize) {
          expect(wrapper.find(`.t-icon.t-icon-apple`).element.style.fontSize).toBe(fontSize);
        }
      };
      testSize('small', 's');
      testSize('medium', 'm');
      testSize('large', 'l');
      testSize('25px', '', '25px');
      testSize('2rem', '', '2rem');
      testSize('2em', '', '2em');
    });

    // icon-svg/iconfont 的 loadDefaultIcons/url/tag 为图标源加载配置，依赖网络资源
    it.todo('icon-svg url[string] & loadDefaultIcons[boolean]');
    it.todo('iconfont url[string] & tag[string] & loadDefaultIcons[boolean]');
  });

  describe('events', () => {
    it('click', () => {
      const onClick = vi.fn();
      const wrapper = mount(<Icon name="apple" onClick={onClick} />);
      wrapper.trigger('click');
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});

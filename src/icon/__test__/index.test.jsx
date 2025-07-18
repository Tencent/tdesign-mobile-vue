import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import Icon from '../index';
import '../icon-svg-props';
import '../iconfont-props';

describe('icon', () => {
  describe('props', () => {
    it(':name', () => {
      const wrapper = mount(<Icon name="apple" />);
      expect(wrapper.find('.t-icon.t-icon-apple')).toBeTruthy();
    });

    it(':size', () => {
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
  });

  describe('event', () => {
    it(':click', () => {
      const onClick = vi.fn();
      const wrapper = mount(<Icon name="apple" onClick={onClick} />);
      wrapper.trigger('click');
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});

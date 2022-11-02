import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import NavBar from '../navbar.vue';

describe('navbar', () => {
  describe('props', () => {
    it('fixed', async () => {
      const navbar = mount(<NavBar title="标题" />);
      expect(navbar.vm.navStyle).toContain('position: fixed');

      await navbar.setProps({ fixed: false });
      expect(navbar.vm.navStyle).toContain('position: relative');
    });

    it('background', () => {
      const navbar = mount(<NavBar background="red" />);
      expect(navbar.vm.navStyle).toContain('background: red');
    });

    it('homeIcon', () => {
      const navbar = mount(<NavBar title="标题" homeIcon />);
      expect(navbar.find('.t-icon-home').exists()).toBeTruthy();
    });

    it('leftIcon', () => {
      const navbar = mount(<NavBar title="标题" leftIcon />);
      expect(navbar.find('.t-icon-chevron-left').exists()).toBeTruthy();
    });

    it('title', () => {
      const navbar = mount(<NavBar title="标题" />);
      expect(navbar.text()).toContain('标题');
    });

    it('titleMaxLength', async () => {
      const navbar = mount(<NavBar title="标题超过了六个字符" titleMaxLength={6} />);
      expect(navbar.text()).toContain('标题超过了六...');

      await navbar.setProps({ titleMaxLength: -1 });
      expect(navbar.text()).toContain('标题超过了六个字符');
      await navbar.setProps({ titleMaxLength: 10, title: '测试标题' });
      expect(navbar.text()).toContain('测试标题');
    });

    it('visible', () => {
      const navbar = mount(<NavBar title="标题" visible={false} />);
      expect(navbar.isVisible()).toBe(false);
    });
  });

  describe('events', () => {
    it('left-click', async () => {
      const fn = vi.fn();
      const navbar = mount(<NavBar title="标题" leftIcon onLeftClick={fn} />);
      await navbar.find('.t-icon-chevron-left').trigger('click');
      expect(fn).toHaveBeenCalled();
    });
  });

  describe('functions', () => {
    it('homeIcon', () => {
      const test = () => '测试';
      const navbar = mount(<NavBar title="标题" homeIcon={test} />);
      expect(navbar.text()).toContain('测试');
      expect(navbar.find('.t-icon-home').exists()).toBeFalsy();
    });

    it('leftIcon', () => {
      const test = () => '测试';
      const navbar = mount(<NavBar title="标题" leftIcon={test} />);
      expect(navbar.text()).toContain('测试');
      expect(navbar.find('.t-icon-chevron-left').exists()).toBeFalsy();
    });

    it('rightIcon', () => {
      const test = () => '测试';
      const navbar = mount(<NavBar title="标题" rightIcon={test} />);
      expect(navbar.text()).toContain('测试');
    });

    it('title', () => {
      const test = () => '测试';
      const navbar = mount(<NavBar title={test} />);
      expect(navbar.text()).toContain('测试');
    });
  });

  describe('slots', () => {
    it('homeIcon', () => {
      const slot = <div>测试</div>;
      const navbar = mount(<NavBar title="标题" />, {
        slots: {
          'home-icon': slot,
        },
      });
      expect(navbar.text()).toContain('测试');
    });

    it('leftIcon', () => {
      const slot = <div>测试</div>;
      const navbar = mount(<NavBar title="标题" />, {
        slots: {
          'left-icon': slot,
        },
      });
      expect(navbar.text()).toContain('测试');
    });

    it('rightIcon', () => {
      const slot = <div>测试</div>;
      const navbar = mount(<NavBar title="标题" />, {
        slots: {
          'right-icon': slot,
        },
      });
      expect(navbar.text()).toContain('测试');
    });

    it('title', () => {
      const slot = <div>测试</div>;
      const navbar = mount(<NavBar />, {
        slots: {
          title: slot,
        },
      });
      expect(navbar.text()).toContain('测试');
    });
  });
});

import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { AppIcon as TIconApp } from 'tdesign-icons-vue-next';
import NavBar from '../navbar';

const iconFunc = () => h(TIconApp);
describe('Navbar', () => {
  describe('props', () => {
    it('capsule[function]', () => {
      const navbar = mount(<NavBar title="标题" capsule={iconFunc} />);
      expect(navbar.find('.t-icon-app').exists()).toBeTruthy();
    });

    it('fixed[boolean]', async () => {
      const navbar = mount(<NavBar title="标题" />);
      expect(navbar.element.className).toContain('t-navbar--fixed');

      await navbar.setProps({ fixed: false });
      expect(navbar.element.className).not.toContain('t-navbar--fixed');
    });

    it('left[function]', () => {
      const test = () => '左侧内容';
      const navbar = mount(<NavBar title="标题" left={test} />);
      expect(navbar.text()).toContain('左侧内容');
    });

    it('leftArrow[boolean]', () => {
      const navbar = mount(<NavBar title="标题" leftArrow />);
      expect(navbar.find('.t-navbar__left-arrow').exists()).toBeTruthy();
    });

    it('placeholder[boolean]', () => {
      const navbar = mount(<NavBar title="标题" fixed placeholder />);
      expect(navbar.find('.t-navbar__placeholder').exists()).toBeTruthy();
    });

    it('right[function]', () => {
      const test = () => '右侧内容';
      const navbar = mount(<NavBar title="标题" right={test} />);
      expect(navbar.text()).toContain('右侧内容');
    });

    it('safeAreaInsetTop[boolean]', () => {
      const navbar = mount(<NavBar title="标题" safeAreaInsetTop />);
      expect(navbar.find('.t-safe-area-top').exists()).toBeTruthy();
    });

    it('title[string]', () => {
      const navbar = mount(<NavBar title="标题" />);
      expect(navbar.text()).toContain('标题');
    });

    it('title[function]', () => {
      const test = () => '标题';
      const navbar = mount(<NavBar title={test} />);
      expect(navbar.text()).toContain('标题');
    });

    it('titleMaxLength[number]', async () => {
      const navbar = mount(<NavBar title="标题超过了六个字符" titleMaxLength={6} />);
      expect(navbar.text()).toContain('标题超过了六...');

      await navbar.setProps({ titleMaxLength: -1 });
      expect(navbar.text()).toContain('标题超过了六个字符');
      await navbar.setProps({ titleMaxLength: 10, title: '测试标题' });
      expect(navbar.text()).toContain('测试标题');
    });

    it('visible[boolean]', () => {
      const navbar = mount(<NavBar title="标题" visible={false} animation={false} />);
      const el = navbar.element;
      expect(el.className).toContain('t-navbar--hide');
    });

    it('zIndex[number]', () => {
      const navbar = mount(<NavBar title="标题" zIndex={100} />);
      expect(navbar.attributes('style')).toContain('z-index: 100');
    });

    it('visibleAnimation[boolean]', () => {
      const navbar = mount(<NavBar title="标题" visible={false} />);
      const el = navbar.element;
      expect(el.className).toContain('t-navbar--hide-animation');
    });
  });

  describe('events', () => {
    it('leftClick', async () => {
      const fn = vi.fn();
      const wrapper = mount(<NavBar title="标题" onLeftClick={fn} />, {
        // 插槽名称必须要和组件内部保持一致'left'
        slots: {
          left: iconFunc,
        },
      });
      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.findComponent(TIconApp).exists()).toBeTruthy();
      const left = wrapper.find('.t-navbar__left');
      await left.trigger('click');
      expect(fn).toHaveBeenCalled();
    });

    it('rightClick', async () => {
      const fn = vi.fn();
      const wrapper = mount(<NavBar title="标题" onRightClick={fn} />, {
        // 插槽名称必须要和组件内部保持一致'right'
        slots: {
          right: iconFunc,
        },
      });
      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.findComponent(TIconApp).exists()).toBeTruthy();
      const right = wrapper.find('.t-navbar__right');
      await right.trigger('click');
      expect(fn).toHaveBeenCalled();
    });
  });

  describe('slots', () => {
    it('left', () => {
      const slot = <div class="left-content">左侧内容</div>;
      const navbar = mount(<NavBar title="标题" />, {
        slots: {
          left: slot,
        },
      });
      expect(navbar.find('.t-navbar__left').find('.left-content').exists()).toBeTruthy();
    });

    it('capsule', () => {
      const navbar = mount(<NavBar title="标题" />, {
        slots: {
          capsule: iconFunc,
        },
      });
      expect(navbar.find('.t-navbar__capsule').exists()).toBeTruthy();
    });

    it('right', () => {
      const slot = <div class="right-content">右侧内容</div>;
      const navbar = mount(<NavBar title="标题" />, {
        slots: {
          right: slot,
        },
      });
      expect(navbar.find('.t-navbar__right').find('.right-content').exists()).toBeTruthy();
    });

    it('title', () => {
      const slot = <div>标题</div>;
      const navbar = mount(<NavBar />, {
        slots: {
          title: slot,
        },
      });
      expect(navbar.text()).toContain('标题');
    });
  });
});

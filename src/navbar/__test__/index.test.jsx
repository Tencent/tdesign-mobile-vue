import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import NavBar from '../navbar';
import { AppIcon as TIconApp } from 'tdesign-icons-vue-next';

const iconFunc = () => h(TIconApp);
describe('navbar', () => {
  describe('props', () => {
    it('fixed', async () => {
      const navbar = mount(<NavBar title="标题" />);
      expect(navbar.element.style.position).toBe('fixed');

      await navbar.setProps({ fixed: false });
      expect(navbar.element.style.position).toBe('relative');
    });

    it('leftArrow', () => {
      const navbar = mount(<NavBar title="标题" leftArrow />);
      expect(navbar.find('.t-navbar__left-arrow').exists()).toBeTruthy();
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

    it('visible-animation', () => {
      const navbar = mount(<NavBar title="标题" visible={false} />);
      const el = navbar.element;
      expect(el.className).toContain('t-navbar--hide-animation');
    });

    it('visible', () => {
      const navbar = mount(<NavBar title="标题" visible={false} animation={false} />);
      const el = navbar.element;
      expect(el.className).toContain('t-navbar--hide');
    });
  });

  describe('events', () => {
    it('left-click', async () => {
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

    it('right-click', async () => {
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

  describe('functions', () => {
    it('left', () => {
      const test = () => '左侧内容';
      const navbar = mount(<NavBar title="标题" left={test} />);
      expect(navbar.text()).toContain('左侧内容');
    });

    it('capsule', () => {
      const navbar = mount(<NavBar title="标题" capsule={iconFunc} />);
      expect(navbar.find('.t-icon-app').exists()).toBeTruthy();
    });

    it('right', () => {
      const test = () => '右侧内容';
      const navbar = mount(<NavBar title="标题" right={test} />);
      expect(navbar.text()).toContain('右侧内容');
    });

    it('title', () => {
      const test = () => '标题';
      const navbar = mount(<NavBar title={test} />);
      expect(navbar.text()).toContain('标题');
    });
  });

  describe('slots', () => {
    it('left', () => {
      const slot = <div className="left-content">左侧内容</div>;
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
      const slot = <div className="right-content">右侧内容</div>;
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

import { enableAutoUnmount, mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import NavBar from '../navbar';

enableAutoUnmount(afterEach);

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Navbar', () => {
  describe('props', () => {
    it('animation[boolean]', async () => {
      // animation 默认 true：显示态类名带动画后缀
      const wrapper = mount(<NavBar title="标题" />);
      expect(wrapper.classes()).toContain('t-navbar--visible-animation');

      // animation = false：显示态类名不带动画后缀
      await wrapper.setProps({ animation: false });
      expect(wrapper.classes()).toContain('t-navbar--visible');
      expect(wrapper.classes()).not.toContain('t-navbar--visible-animation');
    });

    it('capsule[function]', () => {
      const withCapsule = mount(<NavBar title="标题" capsule={() => '胶囊内容'} />);
      expect(withCapsule.get('.t-navbar__capsule').text()).toBe('胶囊内容');

      // 默认不传 capsule：不渲染胶囊容器
      const withoutCapsule = mount(<NavBar title="标题" />);
      expect(withoutCapsule.find('.t-navbar__capsule').exists()).toBeFalsy();
    });

    it('capsule[slot]', () => {
      const wrapper = mount(<NavBar title="标题" />, {
        slots: { capsule: <div class="capsule-content">胶囊</div> },
      });
      expect(wrapper.find('.t-navbar__capsule .capsule-content').exists()).toBeTruthy();
    });

    it('fixed[boolean]', async () => {
      // fixed 默认 true
      const wrapper = mount(<NavBar title="标题" />);
      expect(wrapper.classes()).toContain('t-navbar--fixed');

      await wrapper.setProps({ fixed: false });
      expect(wrapper.classes()).not.toContain('t-navbar--fixed');
    });

    it('left[function]', () => {
      const wrapper = mount(<NavBar title="标题" left={() => '左侧内容'} />);
      expect(wrapper.get('.t-navbar__left').text()).toContain('左侧内容');
    });

    it('left[slot]', () => {
      const wrapper = mount(<NavBar title="标题" />, {
        slots: { left: <div class="left-content">左侧内容</div> },
      });
      expect(wrapper.find('.t-navbar__left .left-content').exists()).toBeTruthy();
    });

    it('leftArrow[boolean]', () => {
      const withArrow = mount(<NavBar title="标题" leftArrow />);
      expect(withArrow.find('.t-navbar__left-arrow').exists()).toBeTruthy();

      const withoutArrow = mount(<NavBar title="标题" />);
      expect(withoutArrow.find('.t-navbar__left-arrow').exists()).toBeFalsy();
    });

    it('placeholder[boolean]', () => {
      // fixed + placeholder：渲染占位元素
      const fixedNavbar = mount(<NavBar title="标题" fixed placeholder />);
      expect(fixedNavbar.find('.t-navbar__placeholder').exists()).toBeTruthy();

      // 默认不开启 placeholder：不渲染占位元素
      const noPlaceholder = mount(<NavBar title="标题" fixed />);
      expect(noPlaceholder.find('.t-navbar__placeholder').exists()).toBeFalsy();

      // placeholder 仅在 fixed 时生效
      const unfixedNavbar = mount(<NavBar title="标题" fixed={false} placeholder />);
      expect(unfixedNavbar.find('.t-navbar__placeholder').exists()).toBeFalsy();
    });

    it('right[function]', () => {
      const withRight = mount(<NavBar title="标题" right={() => '右侧内容'} />);
      expect(withRight.get('.t-navbar__right').text()).toContain('右侧内容');

      // 默认不传 right：不渲染右侧容器
      const withoutRight = mount(<NavBar title="标题" />);
      expect(withoutRight.find('.t-navbar__right').exists()).toBeFalsy();
    });

    it('right[slot]', () => {
      const wrapper = mount(<NavBar title="标题" />, {
        slots: { right: <div class="right-content">右侧内容</div> },
      });
      expect(wrapper.find('.t-navbar__right .right-content').exists()).toBeTruthy();
    });

    it('safeAreaInsetTop[boolean]', async () => {
      // safeAreaInsetTop 默认 true：内容区带顶部安全区类名
      const wrapper = mount(<NavBar title="标题" />);
      expect(wrapper.get('.t-navbar__content').classes()).toContain('t-safe-area-top');

      await wrapper.setProps({ safeAreaInsetTop: false });
      expect(wrapper.get('.t-navbar__content').classes()).not.toContain('t-safe-area-top');
    });

    it('title[string]', () => {
      const wrapper = mount(<NavBar title="标题" />);
      expect(wrapper.get('.t-navbar__center-title').text()).toBe('标题');

      // 默认不设置标题：不渲染中部区域
      const empty = mount(<NavBar />);
      expect(empty.find('.t-navbar__center').exists()).toBeFalsy();
    });

    it('title[function]', () => {
      const wrapper = mount(<NavBar title={() => '函数标题'} />);
      expect(wrapper.get('.t-navbar__center').text()).toBe('函数标题');
      // 函数类型标题不使用字符串标题的 span 包装
      expect(wrapper.find('.t-navbar__center-title').exists()).toBeFalsy();
    });

    it('title[slot]', () => {
      const wrapper = mount(<NavBar />, {
        slots: { title: <div class="title-content">插槽标题</div> },
      });
      expect(wrapper.find('.t-navbar__center .title-content').exists()).toBeTruthy();
      // 插槽标题不使用字符串标题的 span 包装
      expect(wrapper.find('.t-navbar__center-title').exists()).toBeFalsy();
    });

    it('titleMaxLength[number]', async () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const wrapper = mount(<NavBar title="标题超过了六个字符" titleMaxLength={6} />);
      // 超出最大长度：截断并追加省略号
      expect(wrapper.get('.t-navbar__center').text()).toBe('标题超过了六...');

      // 等于最大长度：不截断
      await wrapper.setProps({ titleMaxLength: 9 });
      expect(wrapper.get('.t-navbar__center').text()).toBe('标题超过了六个字符');

      // 小于等于 0：告警且不截断
      await wrapper.setProps({ titleMaxLength: 0 });
      expect(wrapper.get('.t-navbar__center').text()).toBe('标题超过了六个字符');
      expect(warn).toHaveBeenCalledWith('titleMaxLength must be greater than 0');
    });

    it('visible[boolean]', async () => {
      // visible 默认 true
      const wrapper = mount(<NavBar title="标题" animation={false} />);
      expect(wrapper.classes()).toContain('t-navbar--visible');
      expect(wrapper.classes()).not.toContain('t-navbar--hide');

      await wrapper.setProps({ visible: false });
      expect(wrapper.classes()).toContain('t-navbar--hide');
      expect(wrapper.classes()).not.toContain('t-navbar--visible');
    });

    it('zIndex[number]', () => {
      const wrapper = mount(<NavBar title="标题" zIndex={100} />);
      expect(wrapper.attributes('style')).toContain('z-index: 100');
    });
  });

  describe('events', () => {
    it('leftClick', async () => {
      const onLeftClick = vi.fn();
      const onRightClick = vi.fn();
      const wrapper = mount(<NavBar title="标题" onLeftClick={onLeftClick} onRightClick={onRightClick} />);
      await wrapper.find('.t-navbar__left').trigger('click');
      expect(onLeftClick).toHaveBeenCalledTimes(1);
      expect(onLeftClick.mock.calls[0]).toEqual([]);
      // 点击左侧区域不应触发右侧事件
      expect(onRightClick).not.toHaveBeenCalled();
    });

    it('rightClick', async () => {
      const onRightClick = vi.fn();
      const onLeftClick = vi.fn();
      const wrapper = mount(
        <NavBar title="标题" right={() => '右侧内容'} onRightClick={onRightClick} onLeftClick={onLeftClick} />,
      );
      await wrapper.find('.t-navbar__right').trigger('click');
      expect(onRightClick).toHaveBeenCalledTimes(1);
      expect(onRightClick.mock.calls[0]).toEqual([]);
      // 点击右侧区域不应触发左侧事件
      expect(onLeftClick).not.toHaveBeenCalled();
    });
  });
});

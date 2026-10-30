import { mount } from '@vue/test-utils';
import { vi, describe, it, expect, afterEach } from 'vitest';
import { Icon, IconFont } from 'tdesign-icons-vue-next';
import '../icon-svg-props';
import '../iconfont-props';

// icon-svg / iconfont 会向 document 注入 script / link 标签，用例结束后清理，避免相互影响
afterEach(() => {
  document
    .querySelectorAll('script.t-svg-js-stylesheet--unique-class, link.t-iconfont-stylesheet--unique-class')
    .forEach((node) => node.remove());
});

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

    it('icon-svg url[string] & loadDefaultIcons[boolean]', () => {
      const customUrl = 'https://mock.com/icons/index.js';

      // 传入自定义 url 时，use 引用去掉 t-icon- 前缀，且 url 与内置图标脚本均被注入
      const wrapper = mount(<Icon name="apple" url={customUrl} />);
      expect(wrapper.find('use').attributes('href')).toBe('#apple');
      const sources = Array.from(document.querySelectorAll('script.t-svg-js-stylesheet--unique-class')).map((node) =>
        node.getAttribute('src'),
      );
      expect(sources).toContain(customUrl);
      // 自定义 url 之外还有内置 CDN 图标脚本
      expect(sources).toHaveLength(2);

      // loadDefaultIcons 为 false 时不注入内置图标脚本，只注入自定义 url
      document.querySelectorAll('script.t-svg-js-stylesheet--unique-class').forEach((node) => node.remove());
      mount(<Icon name="apple" url={customUrl} loadDefaultIcons={false} />);
      const sourcesWithoutDefault = Array.from(
        document.querySelectorAll('script.t-svg-js-stylesheet--unique-class'),
      ).map((node) => node.getAttribute('src'));
      expect(sourcesWithoutDefault).toEqual([customUrl]);
    });

    it('iconfont url[string] & tag[string] & loadDefaultIcons[boolean]', () => {
      const customUrl = 'https://mock.com/fonts/index.css';

      // 自定义 url 时以 name 作为类名，tag 决定渲染标签，url 与内置图标样式均被注入
      const wrapper = mount(<IconFont name="apple" url={customUrl} tag="span" />);
      expect(wrapper.element.tagName).toBe('SPAN');
      expect(wrapper.classes()).toContain('apple');
      expect(wrapper.classes()).not.toContain('t-icon-apple');
      const hrefs = Array.from(document.querySelectorAll('link.t-iconfont-stylesheet--unique-class')).map((node) =>
        node.getAttribute('href'),
      );
      expect(hrefs).toContain(customUrl);
      // 自定义 url 之外还有内置 CDN 图标样式
      expect(hrefs).toHaveLength(2);

      // loadDefaultIcons 为 false 时不注入内置图标样式，只注入自定义 url
      document.querySelectorAll('link.t-iconfont-stylesheet--unique-class').forEach((node) => node.remove());
      mount(<IconFont name="apple" url={customUrl} loadDefaultIcons={false} />);
      const hrefsWithoutDefault = Array.from(document.querySelectorAll('link.t-iconfont-stylesheet--unique-class')).map(
        (node) => node.getAttribute('href'),
      );
      expect(hrefsWithoutDefault).toEqual([customUrl]);
    });
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

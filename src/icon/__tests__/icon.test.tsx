import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { h, resolveComponent } from 'vue';
import Icon from '../index';
import { getScriptSources, setupIconCleanup } from './mount';

setupIconCleanup();

describe('Icon', () => {
  describe('props', () => {
    it('loadDefaultIcons[boolean]', () => {
      const existing = getScriptSources();
      mount(Icon, { props: { name: 'apple', loadDefaultIcons: false } });
      expect(getScriptSources()).toEqual(existing);
      mount(Icon, { props: { name: 'apple', loadDefaultIcons: true } });
      expect(getScriptSources()).toEqual([
        ...existing,
        expect.stringMatching(/^https:\/\/tdesign\.gtimg\.com\/icon\/.+\/fonts\/index\.js$/),
      ]);
    });

    it('name[string]', async () => {
      const wrapper = mount(Icon, { props: { name: 'apple', loadDefaultIcons: false } });
      expect(wrapper.element.tagName.toLowerCase()).toBe('svg');
      expect(wrapper.classes()).toContain('t-icon');
      expect(wrapper.classes()).toContain('t-icon-apple');
      expect(wrapper.get('use').attributes('href')).toBe('#t-icon-apple');

      await wrapper.setProps({ name: 'add' });
      expect(wrapper.classes()).toContain('t-icon-add');
      expect(wrapper.classes()).not.toContain('t-icon-apple');
      expect(wrapper.get('use').attributes('href')).toBe('#t-icon-add');
    });

    it('size[string]', async () => {
      const wrapper = mount(Icon, { props: { name: 'apple', loadDefaultIcons: false } });
      expect(wrapper.attributes('style') || '').not.toContain('font-size');
      await wrapper.setProps({ size: 'small' });
      expect(wrapper.classes()).toContain('t-size-s');
      await wrapper.setProps({ size: 'medium' });
      expect(wrapper.classes()).toContain('t-size-m');
      expect(wrapper.classes()).not.toContain('t-size-s');
      await wrapper.setProps({ size: 'large' });
      expect(wrapper.classes()).toContain('t-size-l');
      await wrapper.setProps({ size: '25px' });
      expect(wrapper.attributes('style')).toContain('font-size: 25px');
      expect(wrapper.classes()).not.toContain('t-size-l');
      await wrapper.setProps({ size: '2rem' });
      expect(wrapper.attributes('style')).toContain('font-size: 2rem');
      await wrapper.setProps({ size: '2em' });
      expect(wrapper.attributes('style')).toContain('font-size: 2em');
      await wrapper.setProps({ size: undefined });
      expect(wrapper.attributes('style') || '').not.toContain('font-size');
      expect(wrapper.classes().filter((name) => name.startsWith('t-size-'))).toEqual([]);
    });

    it('url[string]', () => {
      const url = 'https://example.com/guide-icons.js';
      const existing = getScriptSources();
      const wrapper = mount(Icon, { props: { name: 'custom-apple', url } });
      expect(wrapper.get('use').attributes('href')).toBe('#custom-apple');
      expect(getScriptSources()).toContain(url);
      expect(getScriptSources().filter((source) => !existing.includes(source))).toHaveLength(2);
    });

    it('url[array]', () => {
      const urls = ['https://example.com/icons-one.js', 'https://example.com/icons-two.js'];
      const existing = getScriptSources();
      const wrapper = mount(Icon, { props: { name: 'custom-apple', url: urls, loadDefaultIcons: false } });
      expect(getScriptSources()).toEqual([...existing, ...urls]);
      expect(wrapper.get('use').attributes('href')).toBe('#custom-apple');
      expect(urls).toEqual(['https://example.com/icons-one.js', 'https://example.com/icons-two.js']);
    });
  });

  describe('events', () => {
    it('click', async () => {
      const onClick = vi.fn();
      const wrapper = mount(Icon, { props: { name: 'apple', loadDefaultIcons: false, onClick } });
      await wrapper.trigger('click');
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith({ e: expect.any(MouseEvent) });
    });
  });

  describe('scenarios', () => {
    it('loads only custom resources when default icons are disabled', () => {
      const url = 'https://example.com/custom-only.js';
      const existing = getScriptSources();
      mount(Icon, { props: { name: 'custom-apple', url, loadDefaultIcons: false } });
      expect(getScriptSources().filter((source) => !existing.includes(source))).toEqual([url]);
    });

    it('deduplicates resources within arrays and across instances', () => {
      const url = 'https://example.com/shared-icons.js';
      mount(Icon, { props: { name: 'custom-apple', url: [url, url], loadDefaultIcons: false } });
      mount(Icon, { props: { name: 'custom-add', url, loadDefaultIcons: false } });
      expect(getScriptSources().filter((source) => source === url)).toHaveLength(1);
    });

    it('reuses an existing resource node without replacing it', () => {
      const url = 'https://example.com/preloaded-icons.js';
      const script = document.createElement('script');
      script.className = 't-svg-js-stylesheet--unique-class';
      script.src = url;
      document.body.appendChild(script);
      mount(Icon, { props: { name: 'custom-apple', url, loadDefaultIcons: false } });
      expect(document.querySelectorAll(`script[src="${url}"]`)).toHaveLength(1);
      expect(document.querySelector(`script[src="${url}"]`)).toBe(script);
    });

    it('passes color styles and native attributes to the SVG', () => {
      const wrapper = mount(Icon, {
        props: { name: 'apple', loadDefaultIcons: false },
        attrs: { style: { color: 'red' }, 'aria-label': '苹果', role: 'img' },
      });
      expect(wrapper.attributes('style')).toContain('color: red');
      expect(wrapper.attributes('aria-label')).toBe('苹果');
      expect(wrapper.attributes('role')).toBe('img');
    });

    it('registers the public TIcon component on installation', () => {
      const wrapper = mount(
        {
          setup() {
            return () => h(resolveComponent('TIcon'), { name: 'apple', loadDefaultIcons: false });
          },
        },
        { global: { plugins: [Icon] } },
      );
      expect(wrapper.get('svg').classes()).toContain('t-icon-apple');
    });
  });
});

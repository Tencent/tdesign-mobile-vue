import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { IconFont } from 'tdesign-icons-vue-next';
import { getStylesheetSources, setupIconCleanup } from './mount';

setupIconCleanup();

describe('IconFont', () => {
  describe('props', () => {
    it('loadDefaultIcons[boolean]', () => {
      const existing = getStylesheetSources();
      mount(IconFont, { props: { name: 'apple', loadDefaultIcons: false } });
      expect(getStylesheetSources()).toEqual(existing);
      mount(IconFont, { props: { name: 'apple', loadDefaultIcons: true } });
      expect(getStylesheetSources()).toEqual([
        ...existing,
        expect.stringMatching(/^https:\/\/tdesign\.gtimg\.com\/icon\/.+\/fonts\/index\.css$/),
      ]);
    });

    it('name[string]', async () => {
      const wrapper = mount(IconFont, { props: { name: 'apple', loadDefaultIcons: false } });
      expect(wrapper.classes()).toContain('t-icon');
      expect(wrapper.classes()).toContain('t-icon-apple');
      await wrapper.setProps({ name: 'add' });
      expect(wrapper.classes()).toContain('t-icon-add');
      expect(wrapper.classes()).not.toContain('t-icon-apple');
    });

    it('size[string]', async () => {
      const wrapper = mount(IconFont, { props: { name: 'apple', loadDefaultIcons: false } });
      expect(wrapper.attributes('style') || '').not.toContain('font-size');
      await wrapper.setProps({ size: 'small' });
      expect(wrapper.classes()).toContain('t-size-s');
      await wrapper.setProps({ size: 'medium' });
      expect(wrapper.classes()).toContain('t-size-m');
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

    it('tag[string]', async () => {
      const wrapper = mount(IconFont, { props: { name: 'apple', loadDefaultIcons: false } });
      expect(wrapper.element.tagName).toBe('I');
      await wrapper.setProps({ tag: 'span' });
      expect(wrapper.element.tagName).toBe('SPAN');
      await wrapper.setProps({ tag: 'div' });
      expect(wrapper.element.tagName).toBe('DIV');
    });

    it('url[string]', () => {
      const url = 'https://example.com/custom-fonts.css';
      const existing = getStylesheetSources();
      const wrapper = mount(IconFont, { props: { name: 'custom-apple', url } });
      expect(wrapper.classes()).toContain('custom-apple');
      expect(wrapper.classes()).not.toContain('t-icon-custom-apple');
      expect(getStylesheetSources()).toContain(url);
      expect(getStylesheetSources().filter((source) => !existing.includes(source))).toHaveLength(2);
      const link = document.querySelector(`link[href="${url}"]`);
      expect(link?.getAttribute('rel')).toBe('stylesheet');
    });

    it('url[array]', () => {
      const urls = ['https://example.com/font-one.css', 'https://example.com/font-two.css'];
      const existing = getStylesheetSources();
      const wrapper = mount(IconFont, { props: { name: 'custom-apple', url: urls, loadDefaultIcons: false } });
      expect(wrapper.classes()).toContain('custom-apple');
      expect(getStylesheetSources()).toEqual([...existing, ...urls]);
      expect(urls).toEqual(['https://example.com/font-one.css', 'https://example.com/font-two.css']);
    });
  });

  describe('events', () => {
    it('click', async () => {
      const onClick = vi.fn();
      const wrapper = mount(IconFont, { props: { name: 'apple', loadDefaultIcons: false, onClick } });
      await wrapper.trigger('click');
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith({ e: expect.any(MouseEvent) });
    });
  });
});

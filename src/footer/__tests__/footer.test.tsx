import { enableAutoUnmount, mount } from '@vue/test-utils';
import { afterEach, describe, it, expect } from 'vitest';
import Footer from '../footer';
import Image from '../../image';
import type { LinkObj, FooterLogo } from '../type';

enableAutoUnmount(afterEach);

describe('Footer', () => {
  describe('props', () => {
    it('links[array]', async () => {
      const links: LinkObj[] = [
        {
          name: '关于我们',
          url: '/about',
          target: '_self',
        },
        {
          name: '帮助中心',
          url: '/help',
          target: '_blank',
        },
        { name: '联系我们' },
      ];
      const wrapper = mount(Footer, {
        props: { links },
      });
      const items = wrapper.findAll('a.t-footer__link-item');
      expect(items.map((item) => item.text())).toEqual(['关于我们', '帮助中心', '联系我们']);
      expect(items[0].attributes()).toMatchObject({ href: '/about', target: '_self' });
      expect(items[1].attributes()).toMatchObject({ href: '/help', target: '_blank' });
      expect(items[2].attributes('href')).toBeUndefined();
      expect(items[2].attributes('target')).toBeUndefined();
      expect(wrapper.findAll('.t-footer__link-line').map((item) => item.text())).toEqual(['|', '|']);
      expect(wrapper.get('.t-footer__link-list').element.lastElementChild).toBe(items[2].element);

      await wrapper.setProps({ links: [{ name: '唯一链接', url: '/single' }] });
      expect(wrapper.findAll('.t-footer__link-item')).toHaveLength(1);
      expect(wrapper.get('.t-footer__link-item').text()).toBe('唯一链接');
      expect(wrapper.get('.t-footer__link-item').attributes('href')).toBe('/single');
      expect(wrapper.find('.t-footer__link-line').exists()).toBe(false);

      await wrapper.setProps({ links: [] });
      expect(wrapper.find('.t-footer__link-list').exists()).toBe(false);
    });

    it('logo[object]', async () => {
      const logo: FooterLogo = {
        icon: 'https://tdesign.gtimg.com/miniprogram/images/logo2.png',
        title: '品牌页脚',
        url: 'https://tdesign.tencent.com/',
        target: '_blank',
      };
      const wrapper = mount(Footer, {
        props: { logo },
      });
      expect(wrapper.get('a.t-footer__logo').attributes()).toMatchObject({ href: logo.url, target: '_blank' });
      expect(wrapper.findComponent(Image).props('src')).toBe(logo.icon);
      expect(wrapper.get('.t-footer__title').text()).toBe('品牌页脚');

      await wrapper.setProps({ logo: { icon: '', title: '文字品牌' } });
      expect(wrapper.findComponent(Image).exists()).toBe(false);
      expect(wrapper.get('.t-footer__title').text()).toBe('文字品牌');
      expect(wrapper.get('.t-footer__logo').attributes('href')).toBeUndefined();
      expect(wrapper.get('.t-footer__logo').attributes('target')).toBeUndefined();

      await wrapper.setProps({ logo: { icon: logo.icon } });
      expect(wrapper.findComponent(Image).props('src')).toBe(logo.icon);
      expect(wrapper.find('.t-footer__title').exists()).toBe(false);

      await wrapper.setProps({ logo: undefined });
      expect(wrapper.find('.t-footer__logo').exists()).toBe(false);
    });

    it('text[string]', async () => {
      const text = 'Copyright © 2019-2023 TDesign.All Rights Reserved.';
      const wrapper = mount(Footer, {
        props: { text },
      });
      const textContainer = wrapper.find('.t-footer__text');
      expect(textContainer.text()).toBe(text);
      await wrapper.setProps({ text: '更新的版权信息' });
      expect(wrapper.get('.t-footer__text').text()).toBe('更新的版权信息');
      await wrapper.setProps({ text: '' });
      expect(wrapper.find('.t-footer__text').exists()).toBe(false);
    });
  });
});

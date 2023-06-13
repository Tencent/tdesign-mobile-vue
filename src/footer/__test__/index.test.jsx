import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Footer from '../footer.vue';

describe('footer', () => {
  describe('props', () => {
    it(': text', () => {
      const text = 'Copyright © 2019-2023 TDesign.All Rights Reserved.';
      const wrapper = mount(Footer, {
        props: { text },
      });
      const textContainer = wrapper.find('.t-footer__text');
      expect(textContainer.text()).toBe(text);
    });

    it(': links', () => {
      const links = [
        {
          name: '底部链接',
          url: '/pages/index',
          openType: 'navigate',
        },
        {
          name: '底部链接',
          url: '/pages/index',
          openType: 'navigate',
        },
      ];
      const wrapper = mount(Footer, {
        props: { links },
      });
      const textContainer = wrapper.find('.t-footer__link-item');
      expect(textContainer.text()).toBe('底部链接');
      const lineContainer = wrapper.find('.t-footer__link-line');
      expect(lineContainer.text()).toBe('|');
    });
  });

  it(': logo', () => {
    const logo = {
      url: 'https://tdesign.gtimg.com/miniprogram/images/logo1.png',
    };
    const wrapper = mount(Footer, {
      props: { logo },
    });
    expect(wrapper.find('.t-footer__logo').exists()).toEqual(true);
  });

  it(': icon', () => {
    const logo = {
      icon: 'https://tdesign.gtimg.com/miniprogram/images/logo2.png',
    };
    const wrapper = mount(Footer, {
      props: { logo },
    });
    expect(wrapper.find('.t-footer__icon').exists()).toEqual(true);
  });

  it(': title', () => {
    const logo = {
      title: '品牌页脚',
    };
    const wrapper = mount(Footer, {
      props: { logo },
    });
    expect(wrapper.find('.t-footer__title').exists()).toEqual(true);
  });
  it(': logo-target', () => {
    const logo = {
      target: 'https://tdesign.tencent.com/',
    };
    const wrapper = mount(Footer, {
      props: { logo },
    });
    expect(wrapper.find('.t-footer__logo').attributes().target).toBe(logo.target);
  });
});

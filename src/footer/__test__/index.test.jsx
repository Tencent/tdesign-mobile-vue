import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
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
                }
            ];
            const wrapper = mount(Footer, {
                props: { links },
            });
            const textContainer = wrapper.find('.t-footer__link-item');
            expect(textContainer.text()).toBe('底部链接');
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

});
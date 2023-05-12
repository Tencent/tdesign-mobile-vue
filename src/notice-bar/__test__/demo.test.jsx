/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/notice-bar/demos/base.vue';
import customVue from '@/notice-bar/demos/custom.vue';
import customizationVue from '@/notice-bar/demos/customization.vue';
import eventVue from '@/notice-bar/demos/event.vue';
import iconDemoVue from '@/notice-bar/demos/iconDemo.vue';
import mobileVue from '@/notice-bar/demos/mobile.vue';
import scrollingVue from '@/notice-bar/demos/scrolling.vue';
import suffixIconVue from '@/notice-bar/demos/suffixIcon.vue';
import themeVue from '@/notice-bar/demos/theme.vue';

const mapper = {
  baseVue,
  customVue,
  customizationVue,
  eventVue,
  iconDemoVue,
  mobileVue,
  scrollingVue,
  suffixIconVue,
  themeVue,
};

describe('NoticeBar', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`NoticeBar ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import controllerVue from '@/notice-bar/demos/controller.vue';
import eventVue from '@/notice-bar/demos/event.vue';
import iconVue from '@/notice-bar/demos/icon.vue';
import mobileVue from '@/notice-bar/demos/mobile.vue';
import multiLineVue from '@/notice-bar/demos/multi-line.vue';
import scrollingVue from '@/notice-bar/demos/scrolling.vue';
import staticVue from '@/notice-bar/demos/static.vue';
import themeVue from '@/notice-bar/demos/theme.vue';

const mapper = {
  controllerVue,
  eventVue,
  iconVue,
  mobileVue,
  multiLineVue,
  scrollingVue,
  staticVue,
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

/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/toast/demos/base.vue';
import closeVue from '@/toast/demos/close.vue';
import coverVue from '@/toast/demos/cover.vue';
import mobileVue from '@/toast/demos/mobile.vue';
import themeVue from '@/toast/demos/theme.vue';

const mapper = {
  baseVue,
  closeVue,
  coverVue,
  mobileVue,
  themeVue,
};

describe('Toast', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Toast ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

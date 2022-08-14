/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/back-top/demos/base.vue';
import mobileVue from '@/back-top/demos/mobile.vue';
import targetVue from '@/back-top/demos/target.vue';
import themeVue from '@/back-top/demos/theme.vue';

const mapper = {
  baseVue,
  mobileVue,
  targetVue,
  themeVue,
};

describe('BackTop', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`BackTop ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

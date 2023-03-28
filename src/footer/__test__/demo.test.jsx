/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/footer/demos/base.vue';
import linkVue from '@/footer/demos/link.vue';
import logoVue from '@/footer/demos/logo.vue';
import mobileVue from '@/footer/demos/mobile.vue';

const mapper = {
  baseVue,
  linkVue,
  logoVue,
  mobileVue,
};

describe('Footer', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Footer ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/empty/demos/base.vue';
import buttonEmptyVue from '@/empty/demos/buttonEmpty.vue';
import imageEmptyVue from '@/empty/demos/imageEmpty.vue';
import mobileVue from '@/empty/demos/mobile.vue';

const mapper = {
  baseVue,
  buttonEmptyVue,
  imageEmptyVue,
  mobileVue,
};

describe('Empty', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Empty ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/col/demos/base.vue';
import mobileVue from '@/col/demos/mobile.vue';
import offsetVue from '@/col/demos/offset.vue';

const mapper = {
  baseVue,
  mobileVue,
  offsetVue,
};

describe('Col', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Col ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

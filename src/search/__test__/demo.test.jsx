/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import actionVue from '@/search/demos/action.vue';
import baseVue from '@/search/demos/base.vue';
import maxLengthVue from '@/search/demos/max-length.vue';
import mobileVue from '@/search/demos/mobile.vue';
import otherVue from '@/search/demos/other.vue';
import shapeVue from '@/search/demos/shape.vue';

const mapper = {
  actionVue,
  baseVue,
  maxLengthVue,
  mobileVue,
  otherVue,
  shapeVue,
};

describe('Search', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Search ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

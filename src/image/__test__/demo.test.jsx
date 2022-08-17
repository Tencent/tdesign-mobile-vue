/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/image/demos/base.vue';
import errorVue from '@/image/demos/error.vue';
import fitVue from '@/image/demos/fit.vue';
import lazyVue from '@/image/demos/lazy.vue';
import loadingVue from '@/image/demos/loading.vue';
import mobileVue from '@/image/demos/mobile.vue';
import positionVue from '@/image/demos/position.vue';
import shapeVue from '@/image/demos/shape.vue';

const mapper = {
  baseVue,
  errorVue,
  fitVue,
  lazyVue,
  loadingVue,
  mobileVue,
  positionVue,
  shapeVue,
};

describe('Image', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Image ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

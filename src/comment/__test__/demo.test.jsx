/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/comment/demos/base.vue';
import collapseVue from '@/comment/demos/collapse.vue';
import imageVue from '@/comment/demos/image.vue';
import mixedVue from '@/comment/demos/mixed.vue';
import mobileVue from '@/comment/demos/mobile.vue';

const mapper = {
  baseVue,
  collapseVue,
  imageVue,
  mixedVue,
  mobileVue,
};

describe('Comment', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Comment ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import badgeVue from '@/grid/demos/badge.vue';
import baseVue from '@/grid/demos/base.vue';
import descVue from '@/grid/demos/desc.vue';
import mobileVue from '@/grid/demos/mobile.vue';

const mapper = {
  badgeVue,
  baseVue,
  descVue,
  mobileVue,
};

describe('Grid', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Grid ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

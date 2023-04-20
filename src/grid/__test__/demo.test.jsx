/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import badgeVue from '@/grid/demos/badge.vue';
import baseVue from '@/grid/demos/base.vue';
import borderedVue from '@/grid/demos/bordered.vue';
import cardVue from '@/grid/demos/card.vue';
import descVue from '@/grid/demos/desc.vue';
import iconVue from '@/grid/demos/icon.vue';
import mobileVue from '@/grid/demos/mobile.vue';
import scrollVue from '@/grid/demos/scroll.vue';

const mapper = {
  badgeVue,
  baseVue,
  borderedVue,
  cardVue,
  descVue,
  iconVue,
  mobileVue,
  scrollVue,
};

describe('Grid', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Grid ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

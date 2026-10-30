/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import accordionVue from '@/collapse/demos/accordion.vue';
import actionVue from '@/collapse/demos/action.vue';
import baseVue from '@/collapse/demos/base.vue';
import cardVue from '@/collapse/demos/card.vue';
import mobileVue from '@/collapse/demos/mobile.vue';
import placementVue from '@/collapse/demos/placement.vue';

const mapper = {
  accordionVue,
  actionVue,
  baseVue,
  cardVue,
  mobileVue,
  placementVue,
};

describe('Collapse', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Collapse ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

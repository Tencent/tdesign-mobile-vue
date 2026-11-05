/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/radio/demos/base.vue';
import cardVue from '@/radio/demos/card.vue';
import customVue from '@/radio/demos/custom.vue';
import horizontalVue from '@/radio/demos/horizontal.vue';
import iconVue from '@/radio/demos/icon.vue';
import mobileVue from '@/radio/demos/mobile.vue';
import placementVue from '@/radio/demos/placement.vue';
import statusVue from '@/radio/demos/status.vue';

const mapper = {
  baseVue,
  cardVue,
  customVue,
  horizontalVue,
  iconVue,
  mobileVue,
  placementVue,
  statusVue,
};

describe('Radio', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Radio ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

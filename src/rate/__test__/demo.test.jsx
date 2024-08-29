/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import actionVue from '@/rate/demos/action.vue';
import baseVue from '@/rate/demos/base.vue';
import colorVue from '@/rate/demos/color.vue';
import countVue from '@/rate/demos/count.vue';
import customVue from '@/rate/demos/custom.vue';
import mobileVue from '@/rate/demos/mobile.vue';
import placementVue from '@/rate/demos/placement.vue';
import showTextVue from '@/rate/demos/show-text.vue';
import sizeVue from '@/rate/demos/size.vue';
import specialVue from '@/rate/demos/special.vue';

const mapper = {
  actionVue,
  baseVue,
  colorVue,
  countVue,
  customVue,
  mobileVue,
  placementVue,
  showTextVue,
  sizeVue,
  specialVue,
};

describe('Rate', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Rate ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

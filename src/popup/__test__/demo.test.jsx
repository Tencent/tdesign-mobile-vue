/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import customAnimationVue from '@/popup/demos/custom-animation.vue';
import mobileVue from '@/popup/demos/mobile.vue';
import placementBottomVue from '@/popup/demos/placement-bottom.vue';
import placementCenterVue from '@/popup/demos/placement-center.vue';
import placementLeftVue from '@/popup/demos/placement-left.vue';
import placementRightVue from '@/popup/demos/placement-right.vue';
import placementTopVue from '@/popup/demos/placement-top.vue';
import placementVue from '@/popup/demos/placement.vue';

const mapper = {
  customAnimationVue,
  mobileVue,
  placementBottomVue,
  placementCenterVue,
  placementLeftVue,
  placementRightVue,
  placementTopVue,
  placementVue,
};

describe('Popup', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Popup ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

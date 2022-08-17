/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/checkbox/demos/base.vue';
import disableVue from '@/checkbox/demos/disable.vue';
import groupVue from '@/checkbox/demos/group.vue';
import iconVue from '@/checkbox/demos/icon.vue';
import indeterminateVue from '@/checkbox/demos/indeterminate.vue';
import maxVue from '@/checkbox/demos/max.vue';
import mobileVue from '@/checkbox/demos/mobile.vue';
import rightVue from '@/checkbox/demos/right.vue';
import sizeVue from '@/checkbox/demos/size.vue';

const mapper = {
  baseVue,
  disableVue,
  groupVue,
  iconVue,
  indeterminateVue,
  maxVue,
  mobileVue,
  rightVue,
  sizeVue,
};

describe('Checkbox', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Checkbox ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

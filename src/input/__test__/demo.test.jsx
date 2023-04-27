/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import alignVue from '@/input/demos/align.vue';
import bannerVue from '@/input/demos/banner.vue';
import baseVue from '@/input/demos/base.vue';
import borderedVue from '@/input/demos/bordered.vue';
import customVue from '@/input/demos/custom.vue';
import labelVue from '@/input/demos/label.vue';
import layoutVue from '@/input/demos/layout.vue';
import maxLengthVue from '@/input/demos/maxLength.vue';
import mobileVue from '@/input/demos/mobile.vue';
import prefixVue from '@/input/demos/prefix.vue';
import specialVue from '@/input/demos/special.vue';
import statusVue from '@/input/demos/status.vue';
import suffixVue from '@/input/demos/suffix.vue';

const mapper = {
  alignVue,
  bannerVue,
  baseVue,
  borderedVue,
  customVue,
  labelVue,
  layoutVue,
  maxLengthVue,
  mobileVue,
  prefixVue,
  specialVue,
  statusVue,
  suffixVue,
};

describe('Input', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Input ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/slider/demos/base.vue';
import capsuleVue from '@/slider/demos/capsule.vue';
import disabledVue from '@/slider/demos/disabled.vue';
import labelVue from '@/slider/demos/label.vue';
import mobileVue from '@/slider/demos/mobile.vue';
import rangeVue from '@/slider/demos/range.vue';
import stepVue from '@/slider/demos/step.vue';

const mapper = {
  baseVue,
  capsuleVue,
  disabledVue,
  labelVue,
  mobileVue,
  rangeVue,
  stepVue,
};

describe('Slider', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Slider ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/slider/demos/base.vue';
import disableVue from '@/slider/demos/disable.vue';
import markVue from '@/slider/demos/mark.vue';
import mobileVue from '@/slider/demos/mobile.vue';
import rangeVue from '@/slider/demos/range.vue';
import titleVue from '@/slider/demos/title.vue';
import unZeroVue from '@/slider/demos/unZero.vue';
import valueVue from '@/slider/demos/value.vue';

const mapper = {
  baseVue,
  disableVue,
  markVue,
  mobileVue,
  rangeVue,
  titleVue,
  unZeroVue,
  valueVue,
};

describe('Slider', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Slider ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

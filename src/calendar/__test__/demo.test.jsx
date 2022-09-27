/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import MockDate from 'mockdate';

import baseVue from '@/calendar/demos/base.vue';
import customButtonVue from '@/calendar/demos/custom-button.vue';
import customRangeVue from '@/calendar/demos/custom-range.vue';
import customTextVue from '@/calendar/demos/custom-text.vue';
import mobileVue from '@/calendar/demos/mobile.vue';
import multipleVue from '@/calendar/demos/multiple.vue';
import rangeVue from '@/calendar/demos/range.vue';

MockDate.set('2020-12-28');

const mapper = {
  baseVue,
  customButtonVue,
  customRangeVue,
  customTextVue,
  mobileVue,
  multipleVue,
  rangeVue,
};

describe('Calendar', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Calendar ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

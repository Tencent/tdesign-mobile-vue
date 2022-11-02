/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/date-time-picker/demos/base.vue';
import customRangeVue from '@/date-time-picker/demos/custom-range.vue';
import fullVue from '@/date-time-picker/demos/full.vue';
import mobileVue from '@/date-time-picker/demos/mobile.vue';
import timeVue from '@/date-time-picker/demos/time.vue';
import yearMonthVue from '@/date-time-picker/demos/year-month.vue';

const mapper = {
  baseVue,
  customRangeVue,
  fullVue,
  mobileVue,
  timeVue,
  yearMonthVue,
};

describe('DateTimePicker', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`DateTimePicker ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

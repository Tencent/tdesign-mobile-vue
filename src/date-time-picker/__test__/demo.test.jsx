/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import MockDate from 'mockdate';

import dateAllVue from '@/date-time-picker/demos/date-all.vue';
import hourMinuteSecondVue from '@/date-time-picker/demos/hour-minute-second.vue';
import hourMinuteVue from '@/date-time-picker/demos/hour-minute.vue';
import mobileVue from '@/date-time-picker/demos/mobile.vue';
import stepsVue from '@/date-time-picker/demos/steps.vue';
import withTitleVue from '@/date-time-picker/demos/with-title.vue';
import withoutTitleVue from '@/date-time-picker/demos/without-title.vue';
import yearMonthDateVue from '@/date-time-picker/demos/year-month-date.vue';
import yearMonthVue from '@/date-time-picker/demos/year-month.vue';

MockDate.set('2020-12-28');

const mapper = {
  dateAllVue,
  hourMinuteSecondVue,
  hourMinuteVue,
  mobileVue,
  stepsVue,
  withTitleVue,
  withoutTitleVue,
  yearMonthDateVue,
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

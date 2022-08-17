/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/date-time-picker/demos/base.vue';
import hourMinuteVue from '@/date-time-picker/demos/hour-minute.vue';
import mobileVue from '@/date-time-picker/demos/mobile.vue';
import renderLabelDateVue from '@/date-time-picker/demos/render-label-date.vue';
import startEndDateVue from '@/date-time-picker/demos/start-end-date.vue';

const mapper = {
  baseVue,
  hourMinuteVue,
  mobileVue,
  renderLabelDateVue,
  startEndDateVue,
};

describe('DateTimePicker', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`DateTimePicker ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

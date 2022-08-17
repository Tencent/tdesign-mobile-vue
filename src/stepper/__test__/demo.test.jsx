/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/stepper/demos/base.vue';
import disableInputVue from '@/stepper/demos/disable-input.vue';
import disabledVue from '@/stepper/demos/disabled.vue';
import eventVue from '@/stepper/demos/event.vue';
import mobileVue from '@/stepper/demos/mobile.vue';

const mapper = {
  baseVue,
  disableInputVue,
  disabledVue,
  eventVue,
  mobileVue,
};

describe('Stepper', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Stepper ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

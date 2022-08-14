/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import confirmVue from '@/dialog/demos/confirm.vue';
import feedbackVue from '@/dialog/demos/feedback.vue';
import inputVue from '@/dialog/demos/input.vue';
import mobileVue from '@/dialog/demos/mobile.vue';

const mapper = {
  confirmVue,
  feedbackVue,
  inputVue,
  mobileVue,
};

describe('Dialog', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Dialog ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

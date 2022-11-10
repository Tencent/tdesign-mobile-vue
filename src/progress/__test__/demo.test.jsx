/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/progress/demos/base.vue';
import customVue from '@/progress/demos/custom.vue';
import mobileVue from '@/progress/demos/mobile.vue';
import noTextVue from '@/progress/demos/noText.vue';
import statusVue from '@/progress/demos/status.vue';
import strokeWidthVue from '@/progress/demos/strokeWidth.vue';

const mapper = {
  baseVue,
  customVue,
  mobileVue,
  noTextVue,
  statusVue,
  strokeWidthVue,
};

describe('Progress', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Progress ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

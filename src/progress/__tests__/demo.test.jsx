/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/progress/demos/base.vue';
import circleVue from '@/progress/demos/circle.vue';
import lineVue from '@/progress/demos/line.vue';
import mobileVue from '@/progress/demos/mobile.vue';
import plumpVue from '@/progress/demos/plump.vue';

const mapper = {
  baseVue,
  circleVue,
  lineVue,
  mobileVue,
  plumpVue,
};

describe('Progress', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Progress ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

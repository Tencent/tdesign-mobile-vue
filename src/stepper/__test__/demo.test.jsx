/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/stepper/demos/base.vue';
import minMaxVue from '@/stepper/demos/min-max.vue';
import mobileVue from '@/stepper/demos/mobile.vue';
import sizeVue from '@/stepper/demos/size.vue';
import statusVue from '@/stepper/demos/status.vue';
import themeVue from '@/stepper/demos/theme.vue';

const mapper = {
  baseVue,
  minMaxVue,
  mobileVue,
  sizeVue,
  statusVue,
  themeVue,
};

describe('Stepper', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Stepper ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

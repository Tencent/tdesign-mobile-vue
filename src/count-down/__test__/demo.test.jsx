/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/count-down/demos/base.vue';
import mobileVue from '@/count-down/demos/mobile.vue';
import specsVue from '@/count-down/demos/specs.vue';

const mapper = {
  baseVue,
  mobileVue,
  specsVue,
};

describe('CountDown', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`CountDown ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

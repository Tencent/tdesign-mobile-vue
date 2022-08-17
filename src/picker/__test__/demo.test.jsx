/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/picker/demos/base.vue';
import cascadeVue from '@/picker/demos/cascade.vue';
import mobileVue from '@/picker/demos/mobile.vue';

const mapper = {
  baseVue,
  cascadeVue,
  mobileVue,
};

describe('Picker', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Picker ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

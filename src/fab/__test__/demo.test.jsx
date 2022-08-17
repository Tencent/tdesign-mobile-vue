/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import displayVue from '@/fab/demos/display.vue';
import mobileVue from '@/fab/demos/mobile.vue';
import textVue from '@/fab/demos/text.vue';

const mapper = {
  displayVue,
  mobileVue,
  textVue,
};

describe('Fab', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Fab ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

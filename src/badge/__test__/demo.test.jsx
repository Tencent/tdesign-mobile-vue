/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import buttonVue from '@/badge/demos/button.vue';
import mobileVue from '@/badge/demos/mobile.vue';
import normalVue from '@/badge/demos/normal.vue';
import singleLineVue from '@/badge/demos/single-line.vue';

const mapper = {
  buttonVue,
  mobileVue,
  normalVue,
  singleLineVue,
};

describe('Badge', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Badge ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

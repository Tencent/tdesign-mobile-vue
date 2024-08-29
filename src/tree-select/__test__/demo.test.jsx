/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/tree-select/demos/base.vue';
import mobileVue from '@/tree-select/demos/mobile.vue';
import multipleVue from '@/tree-select/demos/multiple.vue';
import normalVue from '@/tree-select/demos/normal.vue';

const mapper = {
  baseVue,
  mobileVue,
  multipleVue,
  normalVue,
};

describe('TreeSelect', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`TreeSelect ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

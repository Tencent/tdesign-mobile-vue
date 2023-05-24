/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/upload/demos/base.vue';
import customVue from '@/upload/demos/custom.vue';
import mobileVue from '@/upload/demos/mobile.vue';
import multipleVue from '@/upload/demos/multiple.vue';
import statusVue from '@/upload/demos/status.vue';

const mapper = {
  baseVue,
  customVue,
  mobileVue,
  multipleVue,
  statusVue,
};

describe('Upload', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Upload ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

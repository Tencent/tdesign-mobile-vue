/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseMultipleVue from '@/upload/demos/baseMultiple.vue';
import baseSingleVue from '@/upload/demos/baseSingle.vue';
import mobileVue from '@/upload/demos/mobile.vue';

const mapper = {
  baseMultipleVue,
  baseSingleVue,
  mobileVue,
};

describe('Upload', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Upload ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

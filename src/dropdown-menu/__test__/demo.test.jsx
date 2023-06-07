/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import customizedVue from '@/dropdown-menu/demos/customized.vue';
import disabledVue from '@/dropdown-menu/demos/disabled.vue';
import mobileVue from '@/dropdown-menu/demos/mobile.vue';
import multipleVue from '@/dropdown-menu/demos/multiple.vue';
import singleVue from '@/dropdown-menu/demos/single.vue';

const mapper = {
  customizedVue,
  disabledVue,
  mobileVue,
  multipleVue,
  singleVue,
};

describe('DropdownMenu', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`DropdownMenu ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

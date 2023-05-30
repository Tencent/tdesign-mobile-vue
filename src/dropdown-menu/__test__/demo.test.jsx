/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import mobileVue from '@/dropdown-menu/demos/mobile.vue';
import multiVue from '@/dropdown-menu/demos/multi.vue';
import singleVue from '@/dropdown-menu/demos/single.vue';
import slotDemoVue from '@/dropdown-menu/demos/slotDemo.vue';

const mapper = {
  mobileVue,
  multiVue,
  singleVue,
  slotDemoVue,
};

describe('DropdownMenu', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`DropdownMenu ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

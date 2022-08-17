/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import customizedMenuVue from '@/dropdown-menu/demos/customized-menu.vue';
import demoContainerVue from '@/dropdown-menu/demos/demo-container.vue';
import disabledVue from '@/dropdown-menu/demos/disabled.vue';
import eventsVue from '@/dropdown-menu/demos/events.vue';
import mobileVue from '@/dropdown-menu/demos/mobile.vue';
import multipleVue from '@/dropdown-menu/demos/multiple.vue';
import optionsLayoutVue from '@/dropdown-menu/demos/options-layout.vue';
import singleVue from '@/dropdown-menu/demos/single.vue';
import treeVue from '@/dropdown-menu/demos/tree.vue';

const mapper = {
  customizedMenuVue,
  demoContainerVue,
  disabledVue,
  eventsVue,
  mobileVue,
  multipleVue,
  optionsLayoutVue,
  singleVue,
  treeVue,
};

describe('DropdownMenu', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`DropdownMenu ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

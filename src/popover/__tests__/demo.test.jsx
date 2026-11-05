/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import mobileVue from '@/popover/demos/mobile.vue';
import placementVue from '@/popover/demos/placement.vue';
import themeVue from '@/popover/demos/theme.vue';
import typeVue from '@/popover/demos/type.vue';

const mapper = {
  mobileVue,
  placementVue,
  themeVue,
  typeVue,
};

describe('Popover', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Popover ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

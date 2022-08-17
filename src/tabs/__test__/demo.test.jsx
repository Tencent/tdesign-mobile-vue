/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/tabs/demos/base.vue';
import horizontalVue from '@/tabs/demos/horizontal.vue';
import mobileVue from '@/tabs/demos/mobile.vue';
import scrollVue from '@/tabs/demos/scroll.vue';

const mapper = {
  baseVue,
  horizontalVue,
  mobileVue,
  scrollVue,
};

describe('Tabs', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Tabs ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

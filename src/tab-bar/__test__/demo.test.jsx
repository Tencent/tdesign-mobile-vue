/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/tab-bar/demos/base.vue';
import iconTextVue from '@/tab-bar/demos/icon-text.vue';
import mobileVue from '@/tab-bar/demos/mobile.vue';
import pureIconVue from '@/tab-bar/demos/pure-icon.vue';
import textSpreadVue from '@/tab-bar/demos/text-spread.vue';

const mapper = {
  baseVue,
  iconTextVue,
  mobileVue,
  pureIconVue,
  textSpreadVue,
};

describe('TabBar', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`TabBar ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

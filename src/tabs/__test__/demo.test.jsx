/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import animationVue from '@/tabs/demos/animation.vue';
import baseVue from '@/tabs/demos/base.vue';
import disabledVue from '@/tabs/demos/disabled.vue';
import mobileVue from '@/tabs/demos/mobile.vue';
import scrollVue from '@/tabs/demos/scroll.vue';
import sizeVue from '@/tabs/demos/size.vue';
import underscoreVue from '@/tabs/demos/underscore.vue';
import verticalVue from '@/tabs/demos/vertical.vue';

const mapper = {
  animationVue,
  baseVue,
  disabledVue,
  mobileVue,
  scrollVue,
  sizeVue,
  underscoreVue,
  verticalVue,
};

describe('Tabs', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Tabs ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

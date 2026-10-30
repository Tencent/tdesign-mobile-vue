/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/segmented/demos/base.vue';
import blockVue from '@/segmented/demos/block.vue';
import disabledVue from '@/segmented/demos/disabled.vue';
import mobileVue from '@/segmented/demos/mobile.vue';

const mapper = {
  baseVue,
  blockVue,
  disabledVue,
  mobileVue,
};

describe('Segmented', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Segmented ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

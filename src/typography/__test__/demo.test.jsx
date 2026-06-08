/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/typography/demos/base.vue';
import combinationVue from '@/typography/demos/combination.vue';
import copyableVue from '@/typography/demos/copyable.vue';
import ellipsisVue from '@/typography/demos/ellipsis.vue';
import mobileVue from '@/typography/demos/mobile.vue';
import themeVue from '@/typography/demos/theme.vue';

const mapper = {
  baseVue,
  combinationVue,
  copyableVue,
  ellipsisVue,
  mobileVue,
  themeVue,
};

describe('Typography', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Typography ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

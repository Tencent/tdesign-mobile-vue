/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/cascader/demos/base.vue';
import keysVue from '@/cascader/demos/keys.vue';
import mobileVue from '@/cascader/demos/mobile.vue';
import themeTabVue from '@/cascader/demos/theme-tab.vue';
import withTitleVue from '@/cascader/demos/with-title.vue';
import withValueVue from '@/cascader/demos/with-value.vue';

const mapper = {
  baseVue,
  keysVue,
  mobileVue,
  themeTabVue,
  withTitleVue,
  withValueVue,
};

describe('Cascader', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Cascader ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

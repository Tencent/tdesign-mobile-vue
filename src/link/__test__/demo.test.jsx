/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/link/demos/base.vue';
import disabledVue from '@/link/demos/disabled.vue';
import linkSizeVue from '@/link/demos/linkSize.vue';
import mobileVue from '@/link/demos/mobile.vue';
import prefixVue from '@/link/demos/prefix.vue';
import suffixVue from '@/link/demos/suffix.vue';
import themeVue from '@/link/demos/theme.vue';
import underlineVue from '@/link/demos/underline.vue';

const mapper = {
  baseVue,
  disabledVue,
  linkSizeVue,
  mobileVue,
  prefixVue,
  suffixVue,
  themeVue,
  underlineVue,
};

describe('Link', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Link ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

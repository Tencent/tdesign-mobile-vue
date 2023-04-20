/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/popup/demos/base.vue';
import customCloseVue from '@/popup/demos/custom-close.vue';
import mobileVue from '@/popup/demos/mobile.vue';
import withTitleVue from '@/popup/demos/with-title.vue';

const mapper = {
  baseVue,
  customCloseVue,
  mobileVue,
  withTitleVue,
};

describe('Popup', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Popup ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

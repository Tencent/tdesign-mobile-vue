/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/color-picker/demos/base.vue';
import formatVue from '@/color-picker/demos/format.vue';
import mobileVue from '@/color-picker/demos/mobile.vue';
import multipleVue from '@/color-picker/demos/multiple.vue';
import usePopupVue from '@/color-picker/demos/use-popup.vue';

const mapper = {
  baseVue,
  formatVue,
  mobileVue,
  multipleVue,
  usePopupVue,
};

describe('ColorPicker', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`ColorPicker ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

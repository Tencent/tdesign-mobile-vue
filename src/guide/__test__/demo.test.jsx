/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/guide/demos/base.vue';
import customPopoverVue from '@/guide/demos/custom-popover.vue';
import dialogBodyVue from '@/guide/demos/dialog-body.vue';
import dialogVue from '@/guide/demos/dialog.vue';
import mobileVue from '@/guide/demos/mobile.vue';
import myPopoverVue from '@/guide/demos/my-popover.vue';
import noMaskVue from '@/guide/demos/no-mask.vue';
import popoverDialogVue from '@/guide/demos/popover-dialog.vue';

const mapper = {
  baseVue,
  customPopoverVue,
  dialogBodyVue,
  dialogVue,
  mobileVue,
  myPopoverVue,
  noMaskVue,
  popoverDialogVue,
};

describe('Guide', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Guide ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

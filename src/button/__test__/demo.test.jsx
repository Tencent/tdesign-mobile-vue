/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/button/demos/base.vue';
import blockVue from '@/button/demos/block.vue';
import ghostVue from '@/button/demos/ghost.vue';
import groupVue from '@/button/demos/group.vue';
import iconVue from '@/button/demos/icon.vue';
import mobileVue from '@/button/demos/mobile.vue';
import shapeVue from '@/button/demos/shape.vue';
import sizeVue from '@/button/demos/size.vue';
import statusVue from '@/button/demos/status.vue';
import themeVue from '@/button/demos/theme.vue';

const mapper = {
  baseVue,
  blockVue,
  ghostVue,
  groupVue,
  iconVue,
  mobileVue,
  shapeVue,
  sizeVue,
  statusVue,
  themeVue,
};

describe('Button', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Button ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

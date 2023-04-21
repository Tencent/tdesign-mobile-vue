/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/tag/demos/base.vue';
import checkableVue from '@/tag/demos/checkable.vue';
import closableVue from '@/tag/demos/closable.vue';
import ellipsisVue from '@/tag/demos/ellipsis.vue';
import iconVue from '@/tag/demos/icon.vue';
import mobileVue from '@/tag/demos/mobile.vue';
import shapeVue from '@/tag/demos/shape.vue';
import sizeVue from '@/tag/demos/size.vue';
import themeVue from '@/tag/demos/theme.vue';

const mapper = {
  baseVue,
  checkableVue,
  closableVue,
  ellipsisVue,
  iconVue,
  mobileVue,
  shapeVue,
  sizeVue,
  themeVue,
};

describe('Tag', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Tag ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

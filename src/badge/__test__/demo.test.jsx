/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import basicVue from '@/badge/demos/basic.vue';
import colorVue from '@/badge/demos/color.vue';
import distVue from '@/badge/demos/dist.vue';
import maxCountVue from '@/badge/demos/max-count.vue';
import mobileVue from '@/badge/demos/mobile.vue';
import offsetVue from '@/badge/demos/offset.vue';
import shapeVue from '@/badge/demos/shape.vue';
import textVue from '@/badge/demos/text.vue';

const mapper = {
  basicVue,
  colorVue,
  distVue,
  maxCountVue,
  mobileVue,
  offsetVue,
  shapeVue,
  textVue,
};

describe('Badge', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Badge ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

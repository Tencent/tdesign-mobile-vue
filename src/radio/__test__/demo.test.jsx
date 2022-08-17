/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/radio/demos/base.vue';
import groupVue from '@/radio/demos/group.vue';
import iconVue from '@/radio/demos/icon.vue';
import leftStrokeLineVue from '@/radio/demos/leftStrokeLine.vue';
import mobileVue from '@/radio/demos/mobile.vue';
import rightVue from '@/radio/demos/right.vue';
import rightStrovkeLineVue from '@/radio/demos/rightStrovkeLine.vue';
import sizeVue from '@/radio/demos/size.vue';
import statusVue from '@/radio/demos/status.vue';

const mapper = {
  baseVue,
  groupVue,
  iconVue,
  leftStrokeLineVue,
  mobileVue,
  rightVue,
  rightStrovkeLineVue,
  sizeVue,
  statusVue,
};

describe('Radio', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Radio ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

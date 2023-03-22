/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/loading/demos/base.vue';
import delayVue from '@/loading/demos/delay.vue';
import horzVue from '@/loading/demos/horz.vue';
import mobileVue from '@/loading/demos/mobile.vue';
import pureTextVue from '@/loading/demos/pure-text.vue';
import sizeVue from '@/loading/demos/size.vue';
import speedVue from '@/loading/demos/speed.vue';
import vertVue from '@/loading/demos/vert.vue';

const mapper = {
  baseVue,
  delayVue,
  horzVue,
  mobileVue,
  pureTextVue,
  sizeVue,
  speedVue,
  vertVue,
};

describe('Loading', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Loading ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

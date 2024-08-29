/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/swiper/demos/base.vue';
import cardVue from '@/swiper/demos/card.vue';
import controlVue from '@/swiper/demos/control.vue';
import currentVue from '@/swiper/demos/current.vue';
import customVue from '@/swiper/demos/custom.vue';
import fractionVue from '@/swiper/demos/fraction.vue';
import mobileVue from '@/swiper/demos/mobile.vue';
import outsideVue from '@/swiper/demos/outside.vue';
import verticalVue from '@/swiper/demos/vertical.vue';

const mapper = {
  baseVue,
  cardVue,
  controlVue,
  currentVue,
  customVue,
  fractionVue,
  mobileVue,
  outsideVue,
  verticalVue,
};

describe('Swiper', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Swiper ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

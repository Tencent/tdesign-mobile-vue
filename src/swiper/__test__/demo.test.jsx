/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import asyncVue from '@/swiper/demos/async.vue';
import baseVue from '@/swiper/demos/base.vue';
import controlVue from '@/swiper/demos/control.vue';
import controlledVue from '@/swiper/demos/controlled.vue';
import directionVue from '@/swiper/demos/direction.vue';
import mobileVue from '@/swiper/demos/mobile.vue';
import navigationTypeVue from '@/swiper/demos/navigation-type.vue';
import noLoopVue from '@/swiper/demos/no-loop.vue';

const mapper = {
  asyncVue,
  baseVue,
  controlVue,
  controlledVue,
  directionVue,
  mobileVue,
  navigationTypeVue,
  noLoopVue,
};

describe('Swiper', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Swiper ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import MockDate from 'mockdate';

import baseVue from '@/table/demos/base.vue';
import borderedVue from '@/table/demos/bordered.vue';
import mobileVue from '@/table/demos/mobile.vue';
import scrollVue from '@/table/demos/scroll.vue';
import stripeVue from '@/table/demos/stripe.vue';

MockDate.set('2020-12-28');

const mapper = {
  baseVue,
  borderedVue,
  mobileVue,
  scrollVue,
  stripeVue,
};

describe('Table', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Table ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import allowHalfVue from '@/rate/demos/allow-half.vue';
import baseVue from '@/rate/demos/base.vue';
import colorVue from '@/rate/demos/color.vue';
import countVue from '@/rate/demos/count.vue';
import disabledVue from '@/rate/demos/disabled.vue';
import iconVue from '@/rate/demos/icon.vue';
import mobileVue from '@/rate/demos/mobile.vue';
import sizeVue from '@/rate/demos/size.vue';
import textVue from '@/rate/demos/text.vue';

const mapper = {
  allowHalfVue,
  baseVue,
  colorVue,
  countVue,
  disabledVue,
  iconVue,
  mobileVue,
  sizeVue,
  textVue,
};

describe('Rate', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Rate ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

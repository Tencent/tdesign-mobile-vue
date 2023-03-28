/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import allVue from '@/checkbox/demos/all.vue';
import baseVue from '@/checkbox/demos/base.vue';
import cardVue from '@/checkbox/demos/card.vue';
import horizontalVue from '@/checkbox/demos/horizontal.vue';
import mobileVue from '@/checkbox/demos/mobile.vue';
import rightVue from '@/checkbox/demos/right.vue';
import specialVue from '@/checkbox/demos/special.vue';
import statusVue from '@/checkbox/demos/status.vue';
import typeVue from '@/checkbox/demos/type.vue';

const mapper = {
  allVue,
  baseVue,
  cardVue,
  horizontalVue,
  mobileVue,
  rightVue,
  specialVue,
  statusVue,
  typeVue,
};

describe('Checkbox', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Checkbox ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

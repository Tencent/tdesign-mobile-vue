/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import MockDate from 'mockdate';

import horizontalVue from '@/form/demos/horizontal.vue';
import mobileVue from '@/form/demos/mobile.vue';
import verticalVue from '@/form/demos/vertical.vue';

MockDate.set('2020-12-28');

const mapper = {
  horizontalVue,
  mobileVue,
  verticalVue,
};

describe('Form', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Form ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

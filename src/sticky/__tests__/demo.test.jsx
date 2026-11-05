/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/sticky/demos/base.vue';
import containerVue from '@/sticky/demos/container.vue';
import mobileVue from '@/sticky/demos/mobile.vue';
import offsetVue from '@/sticky/demos/offset.vue';

const mapper = {
  baseVue,
  containerVue,
  mobileVue,
  offsetVue,
};

describe('Sticky', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Sticky ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

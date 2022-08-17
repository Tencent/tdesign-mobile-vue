/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import adjustVue from '@/avatar/demos/adjust.vue';
import mobileVue from '@/avatar/demos/mobile.vue';
import shapeVue from '@/avatar/demos/shape.vue';
import sizeVue from '@/avatar/demos/size.vue';
import typeVue from '@/avatar/demos/type.vue';

const mapper = {
  adjustVue,
  mobileVue,
  shapeVue,
  sizeVue,
  typeVue,
};

describe('Avatar', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Avatar ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

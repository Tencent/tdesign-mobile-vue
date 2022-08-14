/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import borderVue from '@/cell/demos/border.vue';
import clickVue from '@/cell/demos/click.vue';
import groupVue from '@/cell/demos/group.vue';
import mobileVue from '@/cell/demos/mobile.vue';
import multipleVue from '@/cell/demos/multiple.vue';
import singleVue from '@/cell/demos/single.vue';

const mapper = {
  borderVue,
  clickVue,
  groupVue,
  mobileVue,
  multipleVue,
  singleVue,
};

describe('Cell', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Cell ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

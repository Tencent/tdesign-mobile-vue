/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import halfRoundVue from '@/back-top/demos/half-round.vue';
import mobileVue from '@/back-top/demos/mobile.vue';
import roundVue from '@/back-top/demos/round.vue';

const mapper = {
  halfRoundVue,
  mobileVue,
  roundVue,
};

describe('BackTop', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`BackTop ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

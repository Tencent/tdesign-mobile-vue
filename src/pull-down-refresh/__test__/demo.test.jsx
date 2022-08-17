/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/pull-down-refresh/demos/base.vue';
import loadingTextsVue from '@/pull-down-refresh/demos/loading-texts.vue';
import mobileVue from '@/pull-down-refresh/demos/mobile.vue';
import timeoutVue from '@/pull-down-refresh/demos/timeout.vue';

const mapper = {
  baseVue,
  loadingTextsVue,
  mobileVue,
  timeoutVue,
};

describe('PullDownRefresh', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`PullDownRefresh ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

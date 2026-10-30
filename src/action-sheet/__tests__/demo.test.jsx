/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import alignVue from '@/action-sheet/demos/align.vue';
import gridMultipleVue from '@/action-sheet/demos/grid-multiple.vue';
import gridVue from '@/action-sheet/demos/grid.vue';
import listVue from '@/action-sheet/demos/list.vue';
import mobileVue from '@/action-sheet/demos/mobile.vue';
import statusVue from '@/action-sheet/demos/status.vue';

const mapper = {
  alignVue,
  gridMultipleVue,
  gridVue,
  listVue,
  mobileVue,
  statusVue,
};

describe('ActionSheet', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`ActionSheet ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

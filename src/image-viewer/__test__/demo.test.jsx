/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import alignVue from '@/image-viewer/demos/align.vue';
import baseVue from '@/image-viewer/demos/base.vue';
import mobileVue from '@/image-viewer/demos/mobile.vue';
import operationVue from '@/image-viewer/demos/operation.vue';

const mapper = {
  alignVue,
  baseVue,
  mobileVue,
  operationVue,
};

describe('ImageViewer', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`ImageViewer ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import cropVue from '@/image/demos/crop.vue';
import loadingErrorVue from '@/image/demos/loading-error.vue';
import loadingTipVue from '@/image/demos/loading-tip.vue';
import mobileVue from '@/image/demos/mobile.vue';
import roundedVue from '@/image/demos/rounded.vue';
import sizeVue from '@/image/demos/size.vue';

const mapper = {
  cropVue,
  loadingErrorVue,
  loadingTipVue,
  mobileVue,
  roundedVue,
  sizeVue,
};

describe('Image', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Image ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

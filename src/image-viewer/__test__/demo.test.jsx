/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import backgroundVue from '@/image-viewer/demos/background.vue';
import baseVue from '@/image-viewer/demos/base.vue';
import closeBtnVue from '@/image-viewer/demos/closeBtn.vue';
import closeEventVue from '@/image-viewer/demos/closeEvent.vue';
import imageListVue from '@/image-viewer/demos/imageList.vue';
import initialIndexVue from '@/image-viewer/demos/initialIndex.vue';
import mobileVue from '@/image-viewer/demos/mobile.vue';

const mapper = {
  backgroundVue,
  baseVue,
  closeBtnVue,
  closeEventVue,
  imageListVue,
  initialIndexVue,
  mobileVue,
};

describe('ImageViewer', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`ImageViewer ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

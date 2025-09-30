/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/watermark/demos/base.vue';
import grayVue from '@/watermark/demos/gray.vue';
import imageVue from '@/watermark/demos/image.vue';
import layoutVue from '@/watermark/demos/layout.vue';
import mobileVue from '@/watermark/demos/mobile.vue';
import movingImageVue from '@/watermark/demos/movingImage.vue';
import movingTextVue from '@/watermark/demos/movingText.vue';
import multiLineVue from '@/watermark/demos/multiLine.vue';
import multiLineGrayVue from '@/watermark/demos/multiLineGray.vue';

const mapper = {
  baseVue,
  grayVue,
  imageVue,
  layoutVue,
  mobileVue,
  movingImageVue,
  movingTextVue,
  multiLineVue,
  multiLineGrayVue,
};

describe('Watermark', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Watermark ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

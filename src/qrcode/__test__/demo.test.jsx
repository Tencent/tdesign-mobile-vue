/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import baseVue from '@/qrcode/demos/base.vue';
import colorVue from '@/qrcode/demos/color.vue';
import downloadVue from '@/qrcode/demos/download.vue';
import iconVue from '@/qrcode/demos/icon.vue';
import levelVue from '@/qrcode/demos/level.vue';
import mobileVue from '@/qrcode/demos/mobile.vue';
import sizeVue from '@/qrcode/demos/size.vue';
import statusRenderVue from '@/qrcode/demos/status-render.vue';
import statusVue from '@/qrcode/demos/status.vue';
import typeVue from '@/qrcode/demos/type.vue';

const mapper = {
  baseVue,
  colorVue,
  downloadVue,
  iconVue,
  levelVue,
  mobileVue,
  sizeVue,
  statusRenderVue,
  statusVue,
  typeVue,
};

describe('Qrcode', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Qrcode ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

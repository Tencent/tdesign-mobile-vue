/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import alignVue from '@/input/demos/align.vue';
import limitVue from '@/input/demos/limit.vue';
import mobileVue from '@/input/demos/mobile.vue';
import sizeVue from '@/input/demos/size.vue';
import specialVue from '@/input/demos/special.vue';
import statusVue from '@/input/demos/status.vue';
import typeVue from '@/input/demos/type.vue';

const mapper = {
  alignVue,
  limitVue,
  mobileVue,
  sizeVue,
  specialVue,
  statusVue,
  typeVue,
};

describe('Input', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Input ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import alignVue from '@/message/demos/align.vue';
import closeVue from '@/message/demos/close.vue';
import durationVue from '@/message/demos/duration.vue';
import functionVue from '@/message/demos/function.vue';
import mobileVue from '@/message/demos/mobile.vue';
import offsetVue from '@/message/demos/offset.vue';
import textVue from '@/message/demos/text.vue';
import themeVue from '@/message/demos/theme.vue';

const mapper = {
  alignVue,
  closeVue,
  durationVue,
  functionVue,
  mobileVue,
  offsetVue,
  textVue,
  themeVue,
};

describe('Message', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Message ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

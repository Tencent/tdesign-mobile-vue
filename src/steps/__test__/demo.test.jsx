/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import clickVue from '@/steps/demos/click.vue';
import contentVue from '@/steps/demos/content.vue';
import horizontalVue from '@/steps/demos/horizontal.vue';
import iconVue from '@/steps/demos/icon.vue';
import mobileVue from '@/steps/demos/mobile.vue';
import verticalVue from '@/steps/demos/vertical.vue';

const mapper = {
  clickVue,
  contentVue,
  horizontalVue,
  iconVue,
  mobileVue,
  verticalVue,
};

describe('Steps', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Steps ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

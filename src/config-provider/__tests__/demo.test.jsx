/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import MockDate from 'mockdate';

import mobileVue from '@/config-provider/demos/mobile.vue';
import otherEnVue from '@/config-provider/demos/other-en.vue';
import tableEnVue from '@/config-provider/demos/table-en.vue';
import uploadEnVue from '@/config-provider/demos/upload-en.vue';

MockDate.set('2020-12-28');

const mapper = {
  mobileVue,
  otherEnVue,
  tableEnVue,
  uploadEnVue,
};

describe('ConfigProvider', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`ConfigProvider ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

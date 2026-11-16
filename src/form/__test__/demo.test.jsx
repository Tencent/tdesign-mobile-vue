/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import MockDate from 'mockdate';

import baseVue from '@/form/demos/base.vue';
import colonVue from '@/form/demos/colon.vue';
import contentAlignVue from '@/form/demos/content-align.vue';
import helpVue from '@/form/demos/help.vue';
import labelAlignVue from '@/form/demos/label-align.vue';
import labelWidthVue from '@/form/demos/label-width.vue';
import mobileVue from '@/form/demos/mobile.vue';
import requiredMarkVue from '@/form/demos/required-mark.vue';
import rulesVue from '@/form/demos/rules.vue';

MockDate.set('2020-12-28');

const mapper = {
  baseVue,
  colonVue,
  contentAlignVue,
  helpVue,
  labelAlignVue,
  labelWidthVue,
  mobileVue,
  requiredMarkVue,
  rulesVue,
};

describe('Form', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Form ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

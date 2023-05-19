/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import doubleVue from '@/swipe-cell/demos/double.vue';
import eventVue from '@/swipe-cell/demos/event.vue';
import iconVue from '@/swipe-cell/demos/icon.vue';
import leftVue from '@/swipe-cell/demos/left.vue';
import mobileVue from '@/swipe-cell/demos/mobile.vue';
import rightVue from '@/swipe-cell/demos/right.vue';

const mapper = {
  doubleVue,
  eventVue,
  iconVue,
  leftVue,
  mobileVue,
  rightVue,
};

describe('SwipeCell', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`SwipeCell ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

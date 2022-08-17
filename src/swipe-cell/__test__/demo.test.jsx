/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import bindVue from '@/swipe-cell/demos/bind.vue';
import btnsVue from '@/swipe-cell/demos/btns.vue';
import contentVue from '@/swipe-cell/demos/content.vue';
import disabledVue from '@/swipe-cell/demos/disabled.vue';
import eventVue from '@/swipe-cell/demos/event.vue';
import leftCardVue from '@/swipe-cell/demos/left-card.vue';
import leftMoreMenuVue from '@/swipe-cell/demos/left-more-menu.vue';
import leftOneMenuVue from '@/swipe-cell/demos/left-one-menu.vue';
import leftTwoMenuVue from '@/swipe-cell/demos/left-two-menu.vue';
import mobileVue from '@/swipe-cell/demos/mobile.vue';
import rightMenuVue from '@/swipe-cell/demos/right-menu.vue';

const mapper = {
  bindVue,
  btnsVue,
  contentVue,
  disabledVue,
  eventVue,
  leftCardVue,
  leftMoreMenuVue,
  leftOneMenuVue,
  leftTwoMenuVue,
  mobileVue,
  rightMenuVue,
};

describe('SwipeCell', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`SwipeCell ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

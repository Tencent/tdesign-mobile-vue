/**
 * 该文件为由脚本 `npm run test:demo` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
import animationVue from '@/skeleton/demos/animation.vue';
import cellGroupVue from '@/skeleton/demos/cell-group.vue';
import gridVue from '@/skeleton/demos/grid.vue';
import imageGroupVue from '@/skeleton/demos/image-group.vue';
import mobileVue from '@/skeleton/demos/mobile.vue';
import themeVue from '@/skeleton/demos/theme.vue';

const mapper = {
  animationVue,
  cellGroupVue,
  gridVue,
  imageGroupVue,
  mobileVue,
  themeVue,
};

describe('Skeleton', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(`Skeleton ${demoName} demo works fine`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

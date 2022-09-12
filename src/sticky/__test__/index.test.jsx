import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { ref, nextTick } from 'vue';
import Sticky from '../sticky.vue';

// const _mount = (template) =>
//   mount(
//     {
//       components: {
//         'el-affix': Sticky,
//       },
//       template,
//     },
//     { attachTo: document.body },
//   );

describe('sticky', () => {
  describe('props', () => {
    it('disabled', async () => {
      const wrapper = mount(Sticky, {
        props: { disabled: true },
      });
      expect(wrapper.classes()).toContain('is-disabled');
      await wrapper.trigger('click');
      expect(wrapper.emitted('click')).toBeUndefined();
    });
  });
  // describe('slots', () => {
  //   it(': icon', () => {});
  //   ···
  // })

  // describe('event', () => {
  //   it(': click', async () => {});
  //   ···
  // })
});

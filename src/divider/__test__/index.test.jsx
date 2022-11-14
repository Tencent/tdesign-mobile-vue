import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Divider from '../divider.vue';

const prefix = 't';
const name = `${prefix}-divider`;
const TEXT = 'tdesign-mobile-vue';

describe('divider.vue', async () => {
  describe('props', async () => {
    it(': default', async () => {
      const wrapper = mount(() => <Divider default={TEXT}></Divider>);
      expect(wrapper.text()).toBe(TEXT);
    });

    it(': dashed', async () => {
      const wrapper = mount(() => <Divider dashed />);
      expect(wrapper.classes()).toContain(`${name}--dashed`);
    });

    it(': align', async () => {
      const wrapper = mount(Divider, {
        props: {
          align: '',
          content: TEXT,
        },
      });
      const $divider = wrapper.findComponent(Divider);
      expect($divider.text()).toEqual(TEXT);

      // align = ''
      ['left', 'right', 'center'].map((item) => {
        expect($divider.classes().includes(`${name}--content-${item}`)).toBeFalsy();
      });

      const align = 'left';
      await wrapper.setProps({
        align,
      });
      // align = 'left'
      expect($divider.classes()).toContain(`${name}--content-${align}`);
    });

    it(': layout', async () => {
      const wrapper = mount(Divider, {
        props: {
          layout: '',
          content: TEXT,
        },
      });
      const $divider = wrapper.findComponent(Divider);
      expect($divider.text()).toEqual(TEXT);

      // layout = ''
      ['horizontal', 'vertical'].map((item) => {
        expect($divider.classes().includes(`${name}-${item}`)).toBeFalsy();
      });

      const layout = 'vertical';
      await wrapper.setProps({
        layout,
      });
      // layout = 'vertical'
      expect($divider.classes()).toContain(`${name}-${layout}`);
    });

    it(': lineColor', async () => {
      const wrapper = mount(() => <Divider lineColor="red" />);
      expect(getComputedStyle(wrapper.element, null).borderColor).toBe('red');
    });
  });
  describe('slot', async () => {
    it(': content', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Divider>
              {{
                content: TEXT,
              }}
            </Divider>
          );
        },
      });
      const $divider = wrapper.findComponent(Divider);
      expect($divider.text()).toEqual(TEXT);
    });

    it(': default', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Divider>
              {{
                default: TEXT,
              }}
            </Divider>
          );
        },
      });
      const $divider = wrapper.findComponent(Divider);
      expect($divider.text()).toEqual(TEXT);
    });
  });
});

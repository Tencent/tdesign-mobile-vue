import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Divider from '../divider';
import config from '../../config';

const { prefix } = config;
const name = `${prefix}-divider`;
const TEXT = 'tdesign-mobile-vue';

describe('Divider', () => {
  describe('props', () => {
    it('align[left/right/center]', async () => {
      const wrapper = mount(Divider, {
        props: {
          content: () => TEXT,
        },
      });
      const $divider = wrapper.findComponent(Divider);
      expect($divider.text()).toEqual(TEXT);

      // align 默认 center
      expect($divider.find(`.${name}`).classes()).toContain(`${name}--center`);
      ['left', 'right'].forEach((item) => {
        expect($divider.find(`.${name}`).classes().includes(`${name}--${item}`)).toBeFalsy();
      });

      const align = 'left';
      await wrapper.setProps({
        align,
      });
      // align = 'left'
      expect($divider.find(`.${name}`).classes()).toContain(`${name}--${align}`);
    });

    it('dashed[boolean]', async () => {
      const wrapper = mount(() => <Divider dashed />);
      expect(wrapper.find(`.${name}`).classes()).toContain(`${name}--dashed`);
    });

    it('default[string]', async () => {
      const wrapper = mount(() => <Divider default={TEXT}></Divider>);
      expect(wrapper.text()).toBe(TEXT);
    });

    it('default[function]', async () => {
      const wrapper = mount(() => <Divider default={() => TEXT}></Divider>);
      expect(wrapper.text()).toBe(TEXT);
    });

    it('layout[horizontal/vertical]', async () => {
      const wrapper = mount(Divider, {
        props: {
          content: () => TEXT,
        },
      });
      const $divider = wrapper.findComponent(Divider);
      expect($divider.text()).toEqual(TEXT);

      // layout 默认 horizontal
      expect($divider.find(`.${name}`).classes()).toContain(`${name}--horizontal`);
      expect($divider.find(`.${name}`).classes()).not.toContain(`${name}--vertical`);

      const layout = 'vertical';
      await wrapper.setProps({
        layout,
      });
      // layout = 'vertical'
      expect($divider.find(`.${name}`).classes()).toContain(`${name}--${layout}`);
    });
  });

  describe('slots', () => {
    it('content', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Divider>
              {{
                content: () => TEXT,
              }}
            </Divider>
          );
        },
      });
      const $divider = wrapper.findComponent(Divider);
      expect($divider.text()).toEqual(TEXT);
    });

    it('default', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Divider>
              {{
                default: () => TEXT,
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

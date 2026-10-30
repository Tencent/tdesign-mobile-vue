import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Divider from '../divider';
import config from '../../config';

const { prefix } = config;
const name = `${prefix}-divider`;
const TEXT = 'tdesign-mobile-vue';

describe('Divider', () => {
  describe('props', () => {
    it('default[string]', async () => {
      const wrapper = mount(() => <Divider default={TEXT}></Divider>);
      expect(wrapper.text()).toBe(TEXT);
    });

    it('default[function]', async () => {
      const wrapper = mount(() => <Divider default={() => TEXT}></Divider>);
      expect(wrapper.text()).toBe(TEXT);
    });

    it('dashed[boolean]', async () => {
      const wrapper = mount(() => <Divider dashed />);
      expect(wrapper.find(`.${name}`).classes()).toContain(`${name}--dashed`);
    });

    it('align[string]', async () => {
      const wrapper = mount(Divider, {
        props: {
          align: '',
          content: TEXT,
        },
      });
      const $divider = wrapper.findComponent(Divider);
      expect($divider.text()).toEqual(TEXT);

      // align = ''
      ['left', 'right', 'center'].forEach((item) => {
        expect($divider.find(`.${name}`).classes().includes(`${name}--${item}`)).toBeFalsy();
      });

      const align = 'left';
      await wrapper.setProps({
        align,
      });
      // align = 'left'
      expect($divider.find(`.${name}`).classes()).toContain(`${name}--${align}`);
    });

    it('layout[string]', async () => {
      const wrapper = mount(Divider, {
        props: {
          layout: '',
          content: TEXT,
        },
      });
      const $divider = wrapper.findComponent(Divider);
      expect($divider.text()).toEqual(TEXT);

      // layout = ''
      ['horizontal', 'vertical'].forEach((item) => {
        expect($divider.find(`.${name}`).classes().includes(`${name}--${item}`)).toBeFalsy();
      });

      const layout = 'vertical';
      await wrapper.setProps({
        layout,
      });
      // layout = 'vertical'
      expect($divider.find(`.${name}`).classes()).toContain(`${name}--${layout}`);
    });
  });

  describe('slots', () => {
    it('content[slot]', async () => {
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

    it('default[slot]', async () => {
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

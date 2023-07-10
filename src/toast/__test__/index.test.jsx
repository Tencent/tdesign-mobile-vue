import { describe, it, expect, vi } from 'vitest';
import Toast from '../toast.vue';
import Overlay from '../../overlay';
import { mount } from '@vue/test-utils';
import { LoadingIcon } from 'tdesign-icons-vue-next';

import config from '../../config';
const { prefix } = config;
const bodyLockClass = `${prefix}-overflow-hidden`;

describe('Toast', () => {
  describe('props', () => {
    it(': direction', async () => {
      const wrapper = mount(Toast, {
        direction: 'row',
      });
      expect(wrapper.find('.t-toast').classes()).toContain('t-toast--row');
      await wrapper.setProps({
        direction: 'column',
      });
      expect(wrapper.find('.t-toast').classes()).toContain('t-toast--column');

      const directionList = ['', 'row', 'column'];
      directionList.forEach((direction, index) => {
        const wrapper = mount(() => <Toast direction={direction} message="direction" />);
        const $toast = wrapper.find('.t-toast');
        if (direction) {
          expect($toast.classes()).toContain(`t-toast--${direction}`);
        }
      });
    });

    it(': icon', async () => {
      const icon = () => <LoadingIcon />;

      const wrapper = mount(Toast, {
        props: {
          icon,
        },
      });
      expect(wrapper.findComponent(LoadingIcon).exists()).toBeTruthy();
    });

    it(': message', async () => {
      const wrapper = mount(Toast, {
        props: {
          message: 'Loading',
        },
      });
      expect(wrapper.find('.t-toast').text()).toEqual('Loading');
    });

    it(': overlayProps', async () => {
      const wrapper = mount(Toast);
      await wrapper.setProps({
        overlayProps: {
          duration: 1000,
        },
      });
      expect(wrapper.findComponent(Overlay).vm.duration).toEqual(1000);
    });

    it(': preventScrollThrough', async () => {
      mount(Toast, {
        props: {
          preventScrollThrough: true,
        },
      });
      expect(document.body).toHaveClass(bodyLockClass);
    });

    it(': showOverlay', async () => {
      const wrapper = mount(Toast, {
        props: {
          showOverlay: true,
        },
      });
      expect(wrapper.findComponent(Overlay).vm.visible).toEqual(true);
      await wrapper.setProps({
        showOverlay: false,
      });
      expect(wrapper.findComponent(Overlay).vm.visible).toEqual(false);
    });

    it(': theme', async () => {
      const wrapper = mount(Toast, {
        props: {
          theme: 'loading',
        },
      });

      expect(wrapper.findComponent(LoadingIcon).exists()).toEqual(true);
    });
  });
});

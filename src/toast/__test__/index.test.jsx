import { describe, it, expect, vi } from 'vitest';
import { LoadingIcon } from 'tdesign-icons-vue-next';
import { mount } from '@vue/test-utils';
import { createApp } from 'vue';
import Toast from '../toast';
import { ToastPlugin } from '../index';
import Overlay from '../../overlay';
import { sleep } from '../../shared/util';
import config from '../../config';

const { prefix } = config;
const bodyLockClass = `${prefix}-toast--lock`;

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
      expect(document.body.classList.contains(bodyLockClass)).toBeTruthy();
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

describe('Toast Plugin', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('show', () => {
    ToastPlugin('Hello');
    expect(document.body.textContent).toContain('Hello');
  });

  it('method', () => {
    const testShow = (method, text) => {
      document.body.innerHTML = '';
      ToastPlugin[method](text);
      expect(document.body.textContent).toContain(text);
    };
    testShow('loading', '加载中');
    testShow('success', '成功');
    testShow('warning', '警告');
    testShow('error', '失败');
    ToastPlugin.clear();
    expect(document.body.textContent).not.toContain('失败');
  });

  it('clear', () => {
    const onClose = vi.fn();
    ToastPlugin({
      message: 'hello',
      onClose,
    });
    ToastPlugin.clear();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('duration', async () => {
    const onDestroy = vi.fn();
    ToastPlugin({
      message: 'hello',
      onDestroy,
      duration: 1000,
    });

    expect(onDestroy).not.toHaveBeenCalled();
    await sleep(900);
    expect(onDestroy).not.toHaveBeenCalled();
    await sleep(100);
    expect(onDestroy).toHaveBeenCalledTimes(1);
  });

  it('attach', () => {
    const errorFn = vi.fn();
    vi.spyOn(console, 'error').mockImplementation(errorFn);

    ToastPlugin({
      attach: 'abc',
    });
    expect(errorFn).toHaveBeenCalledWith('attach is not exist');

    const div = document.createElement('div');
    div.id = 'test-container';
    document.body.appendChild(div);

    ToastPlugin({
      attach: `#${div.id}`,
    });
    expect(document.querySelector(`#${div.id} .t-toast`)).toBeTruthy();
  });

  it('use plugin', () => {
    const wrapper = mount(() => <div></div>, { global: { plugins: [ToastPlugin] } });
    expect(document.body.textContent).not.toContain('测试');
    wrapper.vm.$toast('测试');
    expect(document.body.textContent).toContain('测试');
  });
});

import { DOMWrapper, enableAutoUnmount, mount } from '@vue/test-utils';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { h, nextTick } from 'vue';
import { AppIcon } from 'tdesign-icons-vue-next';
import Drawer from '../index';
import type { TdDrawerProps } from '../type';
import { sleep } from '../../shared/util';
import { createAttachContainer } from '../../../test/utils/attach';

// 先等待浮层异步任务，再由 Vue 卸载，最后清理 DOM；避免提前清空 Teleport 锚点。
enableAutoUnmount((unmount) => {
  afterEach(async () => {
    await sleep(300);
    unmount();
    document.body.innerHTML = '';
  });
});

const placementList: TdDrawerProps['placement'][] = ['left', 'right'];
const body = new DOMWrapper(document.body);

describe('Drawer', () => {
  describe('props', () => {
    it('attach[string]', async () => {
      const container = createAttachContainer('drawer-container');

      mount(Drawer, {
        props: {
          visible: true,
          attach: '#drawer-container',
        },
      });
      await nextTick();
      expect(document.querySelector('#drawer-container .t-drawer')).toBeTruthy();
    });

    it('attach[function]', async () => {
      const container = createAttachContainer();
      const wrapper = mount(Drawer, { props: { visible: true, attach: () => container } });
      await nextTick();
      expect(container.querySelector('.t-drawer')).not.toBeNull();
      wrapper.unmount();
      expect(container.querySelector('.t-drawer')).toBeNull();
      container.remove();
    });

    it('closeOnOverlayClick[boolean]', async () => {
      const onClose = vi.fn();
      const mountDrawer = (closeOnOverlayClick: boolean) =>
        mount({
          render() {
            return <Drawer visible={true} closeOnOverlayClick={closeOnOverlayClick} onClose={onClose} />;
          },
        });

      // false：点击遮罩不触发关闭
      const preventDrawer = mountDrawer(false);
      await preventDrawer.findComponent({ name: 'TOverlay' }).find('.t-overlay').trigger('click');
      expect(onClose).not.toBeCalled();
      expect(preventDrawer.findComponent(Drawer).emitted('update:visible')).toBeUndefined();

      // true：点击遮罩触发 onClose('overlay')
      const closeDrawer = mountDrawer(true);
      await closeDrawer.findComponent({ name: 'TOverlay' }).find('.t-overlay').trigger('click');
      expect(onClose).toBeCalledWith('overlay');
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(closeDrawer.findComponent(Drawer).emitted('update:visible')).toEqual([[false]]);
    });

    it('destroyOnClose[boolean]', async () => {
      const wrapper = mount(Drawer, {
        props: {
          visible: true,
          destroyOnClose: true,
        },
      });
      expect(wrapper.find('.t-drawer__sidebar').exists()).toBeTruthy();

      await wrapper.setProps({ visible: false });
      expect(wrapper.find('.t-drawer__sidebar').exists()).toBeFalsy();

      await wrapper.setProps({ visible: true });
      await nextTick();
      expect(document.querySelector('.t-drawer__sidebar')).not.toBeNull();
    });

    it('footer[function]', () => {
      const wrapper = mount(Drawer, {
        props: {
          footer: () => <button>custom footer</button>,
        },
      });
      expect(wrapper.get('.t-drawer__footer button').text()).toBe('custom footer');
    });

    it('footer[slot]', () => {
      const wrapper = mount(Drawer, { slots: { footer: () => <button>插槽底部</button> } });
      expect(wrapper.get('.t-drawer__footer button').text()).toBe('插槽底部');
    });

    it('items[array]', async () => {
      const items = [
        {
          title: '菜单一',
          icon: () => h(AppIcon),
        },
        {
          title: '菜单二',
        },
      ];
      const wrapper = mount(Drawer, { props: { items } });

      const $items = wrapper.findAll('.t-drawer__sidebar-item');
      expect($items).toHaveLength(2);
      expect($items.at(0).text()).toBe('菜单一');
      expect($items.at(1).text()).toBe('菜单二');
      expect($items[0].findComponent(AppIcon).exists()).toBe(true);
      expect($items[1].find('.t-drawer__sidebar-item-icon').exists()).toBe(false);

      await wrapper.setProps({ items: [] });
      expect(document.querySelectorAll('.t-drawer__sidebar-item')).toHaveLength(0);
      await wrapper.setProps({ items: [{ title: '新菜单' }] });
      expect(document.querySelector('.t-drawer__sidebar-item-title').textContent).toBe('新菜单');
    });

    it('overlayProps[object]', async () => {
      const wrapper = mount(Drawer, {
        props: {
          visible: true,
          overlayProps: { zIndex: 4000 },
        },
      });
      expect(wrapper.find('.t-overlay').attributes('style')).toContain('z-index: 4000');
    });

    it.each(placementList)('placement[%s]', async (placement) => {
      const wrapper = mount(Drawer, { props: { visible: true } });
      expect(wrapper.find('.t-popup--right').exists()).toBe(true);
      await wrapper.setProps({ placement });
      const popup = document.querySelector('.t-popup');
      expect(popup.classList.contains(`t-popup--${placement}`)).toBe(true);
      expect(popup.classList.contains(`t-popup--${placement === 'left' ? 'right' : 'left'}`)).toBe(false);
    });

    it('showOverlay[boolean]', async () => {
      const wrapper = mount(Drawer, {
        props: {
          visible: true,
        },
      });
      expect(wrapper.find('.t-overlay').isVisible()).toBeTruthy();

      const wrapper2 = mount(Drawer, {
        props: {
          visible: true,
          showOverlay: false,
        },
      });
      const overlay = wrapper2.find('.t-overlay');
      expect(overlay.exists()).toBe(true);
      expect(overlay.isVisible()).toBe(false);
    });

    it('title[string]', async () => {
      const wrapper = mount(Drawer, {
        props: {
          title: '抽屉标题',
        },
      });
      expect(wrapper.find('.t-drawer__title').text()).toBe('抽屉标题');
      await wrapper.setProps({ title: '更新后的标题' });
      expect(document.querySelector('.t-drawer__title').textContent).toBe('更新后的标题');
    });

    it('title[function]', () => {
      const wrapper = mount(Drawer, {
        props: {
          title: () => <span>custom title</span>,
        },
      });
      expect(wrapper.get('.t-drawer__title span').text()).toBe('custom title');
    });

    it('title[slot]', () => {
      const wrapper = mount(Drawer, { slots: { title: () => <span>插槽标题</span> } });
      expect(wrapper.get('.t-drawer__title span').text()).toBe('插槽标题');
    });

    it('visible[boolean]', async () => {
      const wrapper = mount(Drawer, {
        props: {
          visible: false,
        },
      });

      expect(wrapper.find('.t-drawer__sidebar').isVisible()).toBe(false);
      await wrapper.setProps({
        visible: true,
      });
      // 内容 teleport 到 body，需从 document 查询
      expect(body.get('.t-drawer__sidebar').isVisible()).toBe(true);
      await wrapper.setProps({ visible: false });
      await vi.waitFor(() => {
        expect(body.get('.t-drawer__sidebar').isVisible()).toBe(false);
      });
      // 默认关闭仅隐藏节点，不销毁内容。
      expect(document.querySelector('.t-drawer__sidebar')).not.toBeNull();
    });

    it('zIndex[number]', async () => {
      const wrapper = mount(Drawer, {
        props: {
          visible: true,
          zIndex: 666,
        },
      });
      expect(wrapper.find('.t-popup').attributes('style')).toContain('z-index: 666');
      await wrapper.setProps({ zIndex: 2000 });
      expect(document.querySelector<HTMLElement>('.t-popup').style.zIndex).toBe('2000');
    });

    it('default[slot]', () => {
      const wrapper = mount(Drawer, { slots: { default: () => <div class="drawer-content">内容</div> } });
      expect(wrapper.get('.t-drawer .drawer-content').text()).toBe('内容');
    });
  });

  describe('events', () => {
    // API 声明为 { e: MouseEvent }，当前实现却从 visible-change 回调传入 { visible }。
    // 且 closeOnOverlayClick=false 时不会通知点击，待组件修复后补齐事件参数及触发时机断言。
    it.todo('overlayClick');

    it('close', async () => {
      const onClose = vi.fn();
      const wrapper = mount(Drawer, { props: { visible: true, onClose } });
      await wrapper.find('.t-overlay').trigger('click');
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledWith('overlay');
    });

    it('itemClick', async () => {
      const onItemClick = vi.fn();
      const items = [
        {
          title: '菜单一',
          icon: () => h(AppIcon),
        },
        {
          title: '菜单二',
          icon: () => h(AppIcon),
        },
      ];
      const wrapper = mount(Drawer, { props: { items, onItemClick } });

      const $items = wrapper.findAll('.t-drawer__sidebar-item');
      expect($items).toHaveLength(2);

      await $items.at(0).trigger('click');
      expect(onItemClick).toHaveBeenNthCalledWith(1, 0, items[0], { e: expect.any(MouseEvent) });

      await $items.at(1).trigger('click');
      expect(onItemClick).toHaveBeenNthCalledWith(2, 1, items[1], { e: expect.any(MouseEvent) });
      expect(onItemClick).toHaveBeenCalledTimes(2);
    });

    it('update:visible', async () => {
      const wrapper = mount(Drawer, { props: { visible: true } });
      await wrapper.find('.t-overlay').trigger('click');
      expect(wrapper.emitted('update:visible')).toEqual([[false]]);
    });
  });
});

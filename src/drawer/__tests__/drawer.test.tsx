import { config, mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref, h } from 'vue';
import { AppIcon } from 'tdesign-icons-vue-next';
import Drawer, { DrawerPlugin } from '../index';
import { sleep } from '../../shared/util';

config.global.stubs = {
  teleport: false,
};

const placementList = ['', 'left', 'right'];

const isElementVisible = (el) => {
  while (el) {
    if (getComputedStyle(el).display === 'none') return false;
    el = el.parentElement;
  }
  return true;
};

describe('Drawer', () => {
  describe('props', () => {
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
      // expect(wrapper.find('.t-drawer__sidebar').isVisible()).toBe(true);
    });

    it('placement[string]', async () => {
      placementList.forEach((placement) => {
        const wrapper = mount(() => <Drawer visible={true} placement={placement} />);
        if (placement) {
          expect(wrapper.find(`.t-popup--${placement}`)).toBeTruthy();
        }
      });
    });

    it('closeOnOverlayClick[boolean]', async () => {
      const onClose = vi.fn();
      const closeOverlayClick = ref(true);

      const visible = ref(true);
      const wrapper = mount({
        render() {
          return <Drawer visible={visible.value} closeOverlayClick={closeOverlayClick} onClose={onClose} />;
        },
      });

      const $overlay = wrapper.findComponent({ name: 'TOverlay' });
      expect($overlay.exists()).toBeTruthy();

      $overlay.find('.t-overlay').trigger('click');
      expect(onClose).toBeCalledWith('overlay');
    });

    it('items[array]', async () => {
      const titleSidebar = ref([
        {
          title: '菜单一',
        },
        {
          title: '菜单二',
        },
      ]);

      const wrapper = mount({
        render() {
          return <Drawer items={titleSidebar.value} />;
        },
      });

      const $items = wrapper.findAll('.t-drawer__sidebar-item');
      expect($items).toHaveLength(2);
      titleSidebar.value.map(async (item, index) => {
        expect($items.at(index).text()).toEqual(item.title);
      });
    });

    it('footer[function]', () => {
      const wrapper = mount(Drawer, {
        props: {
          footer: () => h(<div>custom footer</div>),
        },
      });
      expect(wrapper.find('.t-drawer__footer').exists()).toBeTruthy();
    });

    it('title[string]', () => {
      const wrapper = mount(Drawer, {
        props: {
          title: '抽屉标题',
        },
      });
      expect(wrapper.find('.t-drawer__title').exists()).toBeTruthy();
    });

    it('title[function]', () => {
      const wrapper = mount(Drawer, {
        props: {
          title: () => h(<div>custom title</div>),
        },
      });
      expect(wrapper.find('.t-drawer__title').exists()).toBeTruthy();
    });

    it('zIndex[number]', async () => {
      const wrapper = mount(Drawer, {
        props: {
          visible: true,
          zIndex: 666,
        },
      });
      expect(wrapper.find('.t-popup').attributes('style')).toContain('z-index: 666');
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
      overlay.exists() && expect(overlay.isVisible()).toBeFalsy();
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
    });
  });

  describe('events', () => {
    it('overlayClick', async () => {
      const onOverlayClick = vi.fn();
      const visible = ref(true);
      const wrapper = mount({
        render() {
          return <Drawer visible={visible.value} onOverlayClick={onOverlayClick} />;
        },
      });

      const $popup = wrapper.findComponent({ name: 'TPopup' });
      expect($popup.exists()).toBeTruthy();
      $popup.vm.$emit('visible-change', visible.value);
      expect($popup.emitted()['visible-change'].length).toBe(1);
      expect($popup.emitted()['visible-change'][0]).toEqual([true]);
      expect(onOverlayClick).toBeCalledTimes(1);
    });

    it('close', async () => {
      const onClose = vi.fn();
      const iconSidebar = ref([
        {
          title: '菜单一',
          icon: () => h(AppIcon),
        },
        {
          title: '菜单二',
          icon: () => h(AppIcon),
        },
      ]);

      const wrapper = mount({
        render() {
          return <Drawer items={iconSidebar.value} onClose={onClose} />;
        },
      });

      const $popup = wrapper.findComponent({ name: 'TPopup' });
      expect($popup.exists()).toBeTruthy();
      $popup.vm.$emit('close');
      expect($popup.emitted().close).toBeTruthy();
      expect($popup.emitted().close.length).toBe(1);
      expect(onClose).toBeCalledTimes(1);
    });

    it('itemClick', async () => {
      const clickItemValue = {};
      const onItemClick = (index, item, context) => {
        clickItemValue.index = index;
        clickItemValue.item = item;
      };
      const iconSidebar = ref([
        {
          title: '菜单一',
          icon: () => h(AppIcon),
        },
        {
          title: '菜单二',
          icon: () => h(AppIcon),
        },
      ]);

      const wrapper = mount({
        render() {
          return <Drawer items={iconSidebar.value} onItemClick={onItemClick} />;
        },
      });

      const $items = wrapper.findAll('.t-drawer__sidebar-item');
      expect($items).toHaveLength(2);

      const triggerClick = (index) => {
        $items.at(index).trigger('click');
        expect(clickItemValue.index).toEqual(index);
        expect(clickItemValue.item).toEqual(iconSidebar.value[index]);
      };

      iconSidebar.value.map(async (item, index) => {
        await triggerClick(index);
      });
    });
  });

  describe('scenarios', () => {
    describe('plugin', () => {
      beforeEach(() => {
        document.body.innerHTML = '';
      });
      const title = 'Hello TDesign';

      it('show', async () => {
        expect(document.querySelector('.t-drawer')).toBeFalsy();
        const handler = DrawerPlugin({
          items: [{ title }],
        });
        expect(document.body.textContent).toContain(title);
        expect(document.querySelector('.t-drawer')).toBeTruthy();
        expect(isElementVisible(document.querySelector('.t-drawer'))).toBe(false);

        await handler.show();
        expect(isElementVisible(document.querySelector('.t-drawer'))).toBe(true);

        await handler.hide();
        await sleep(300);
        expect(isElementVisible(document.querySelector('.t-drawer'))).toBe(false);
      });

      it('update', async () => {
        const title2 = 'Hello Vue';
        expect(document.querySelector('.t-drawer')).toBeFalsy();
        const handler = DrawerPlugin({
          items: [{ title }],
        });
        expect(document.body.textContent).toContain(title);
        await handler.update({
          items: [{ title: title2 }],
        });
        expect(document.body.textContent).not.toContain(title);
        expect(document.body.textContent).toContain(title2);
      });

      it('destroy', async () => {
        const handler = DrawerPlugin({
          items: [{ title }],
        });
        expect(document.body.textContent).toContain(title);
        await handler.destroy();
        expect(document.body.textContent).not.toContain(title);
      });

      it('use plugin', () => {
        const wrapper = mount(() => <div></div>, { global: { plugins: [DrawerPlugin] } });
        expect(typeof wrapper.vm.$drawer).toBe('function');
        expect(document.body.textContent).not.toContain(title);
        wrapper.vm.$drawer({ items: [{ title }] });
        expect(document.body.textContent).toContain(title);
      });
    });
  });
});

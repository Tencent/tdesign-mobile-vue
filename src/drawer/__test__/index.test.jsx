import { config, mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import drawer from '../drawer';
import { ref, h } from 'vue';
import { AppIcon } from 'tdesign-icons-vue-next';

config.global.stubs = {
  teleport: true,
};

const placementList = ['', 'left', 'right'];

describe('drawer', () => {
  // test props
  describe('props', () => {
    it(': visible	', async () => {
      const wrapper = mount(drawer, {
        props: {
          visible: false,
        },
      });

      expect(wrapper.find('.t-drawer__sidebar').isVisible()).toBe(false);
      await wrapper.setProps({
        visible: true,
      });
      expect(wrapper.find('.t-drawer__sidebar').isVisible()).toBe(true);
    });

    it(': placement	', async () => {
      placementList.map((placement) => {
        const wrapper = mount(() => <drawer visible={true} placement={placement} />);
        if (placement) {
          expect(wrapper.find(`.t-popup--${placement}`)).toBeTruthy();
        }
      });
    });

    it(': closeOnOverlayClick', async () => {
      const onClose = vi.fn();
      const closeOverlayClick = ref(true);

      const visible = ref(true);
      const wrapper = mount({
        render() {
          return <drawer visible={visible.value} closeOverlayClick={closeOverlayClick} onClose={onClose} />;
        },
      });

      const $overlay = wrapper.findComponent({ name: 't-overlay' });
      expect($overlay.exists()).toBeTruthy();

      $overlay.find('.t-overlay').trigger('click');
      expect(onClose).toBeCalledWith('overlay');
    });

    it(': items', async () => {
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
          return <drawer items={titleSidebar.value} />;
        },
      });

      const $items = wrapper.findAll('.t-drawer__sidebar-item');
      expect($items).toHaveLength(2);
      titleSidebar.value.map(async (item, index) => {
        expect($items.at(index).text()).toEqual(item.title);
      });
    });
  });

  // test events
  describe('event', () => {
    it(': overlayClick', async () => {
      const onOverlayClick = vi.fn();
      const visible = ref(true);
      const wrapper = mount({
        render() {
          return <drawer visible={visible.value} onOverlayClick={onOverlayClick} />;
        },
      });

      const $popup = wrapper.findComponent({ name: 't-popup' });
      expect($popup.exists()).toBeTruthy();
      $popup.vm.$emit('visible-change', visible.value);
      expect($popup.emitted()['visible-change'].length).toBe(1);
      expect($popup.emitted()['visible-change'][0]).toEqual([true]);
      expect(onOverlayClick).toBeCalledTimes(1);
    });

    it(': close', async () => {
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
          return <drawer items={iconSidebar.value} onClose={onClose} />;
        },
      });

      const $popup = wrapper.findComponent({ name: 't-popup' });
      expect($popup.exists()).toBeTruthy();
      $popup.vm.$emit('close');
      expect($popup.emitted().close).toBeTruthy();
      expect($popup.emitted().close.length).toBe(1);
      expect(onClose).toBeCalledTimes(1);
    });

    it(': itemClick', async () => {
      let clickItemValue = {};
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
          return <drawer items={iconSidebar.value} onItemClick={onItemClick} />;
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
});

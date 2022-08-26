import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import drawer from '../drawer.vue';
import { ref, h } from 'vue';
import { AppIcon } from 'tdesign-icons-vue-next';
import { async } from 'regenerator-runtime';

describe('drawer', () => {
  // test props
  describe('props', () => {
    it(': visible	', async () => {
			const wrapper = mount(drawer, {
				props: {
					visible: true,
				},
      });

      expect(wrapper.find('.t-overlay').classes('t-overlay--active')).toBe(true)
      expect(wrapper.find('.t-overlay').isVisible()).toBe(true)
      await wrapper.setProps({
        visible: false,
      })
    })

    it(': closeOnOverlayClick', async () => {
      let triggerOrigin = {};
      const onClose = (trigger) => {
        triggerOrigin = trigger.trigger;
      };
      const closeOverlayClick = ref(true);

      const visible = ref(true);
      const wrapper = mount({
        render() {
          return <drawer visible={visible} closeOverlayClick={closeOverlayClick} onClose={onClose}/>
        }
      })

      const $overlay = wrapper.findComponent({ name: 't-overlay' })
      expect($overlay.exists()).toBeTruthy()
      $overlay.vm.$emit('click')
      expect(triggerOrigin).toBe('overlay')
    })

    it(': items', async () => {
      const titleSidebar = ref([
        {
          title: '菜单一'
        },
        {
          title: '菜单二'
        }
      ]);

      const wrapper = mount({
        render() {
          return <drawer items={titleSidebar} />
        }
      })

      const $items = wrapper.findAll('.t-drawer__sidebar-item')
      expect($items).toHaveLength(2)
      titleSidebar.value.map(async (item, index)=> {
        expect($items.at(index).text()).toEqual(item.title)
      });
    })
  });

  // test events
  describe('event', () => {
    it(': overlayClick', async () => {
      const onOverlayClick = vi.fn();
      const visible = ref(true);
      const wrapper = mount({
        render() {
          return <drawer visible={visible} onOverlayClick={onOverlayClick}/>
        }
      })

      const $popup = wrapper.findComponent({ name: 't-popup' })
      expect($popup.exists()).toBeTruthy()
      $popup.vm.$emit('visible-change', visible.value)
      expect($popup.emitted()['visible-change'].length).toBe(1)
      expect($popup.emitted()['visible-change'][0]).toEqual([true])
      expect(onOverlayClick).toBeCalledTimes(1)
    })

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
        }
      ]);

      const wrapper = mount({
        render() {
          return <drawer items={iconSidebar} onClose={onClose} />
        }
      })

      const $popup = wrapper.findComponent({ name: 't-popup' })
      expect($popup.exists()).toBeTruthy()
      $popup.vm.$emit('close')
      expect($popup.emitted().close).toBeTruthy()
      expect($popup.emitted().close.length).toBe(1)
      expect(onClose).toBeCalledTimes(1)
    })

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
        }
      ]);

      const wrapper = mount({
        render() {
          return <drawer items={iconSidebar} onItemClick={ onItemClick } />
        }
      })

      const $items = wrapper.findAll('.t-drawer__sidebar-item')
      expect($items).toHaveLength(2)

      const triggerClick = (index) => {
        $items.at(index).trigger('click');
        expect(clickItemValue.index).toEqual(index)
        expect(clickItemValue.item).toEqual(iconSidebar.value[index])
      }

      iconSidebar.value.map(async (item, index)=> {
        await triggerClick(index)
      });

    });
  });
})

import { describe, it, expect, vi } from 'vitest';
import Overlay from '../overlay.vue'
import { mount } from '@vue/test-utils';

describe('Overlay', () => {
  describe('props', () => {
    it(': visible', async () => {
      const wrapper = mount(Overlay, {
        props: { visible: true }
      })
      expect(wrapper.find('.t-overlay--active').exists()).toEqual(true)
      await wrapper.setProps({ visible: false })
      expect(wrapper.find('.t-overlay--active').exists()).toEqual(false)
    });

    it(': preventScrollThrough', async () => {
      const wrapper = mount(Overlay, {
        props: { visible: true, preventScrollThrough: false }
      })
      const event = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn()
      }
      wrapper.find('.t-overlay').trigger('touchmove', event)
      expect(event.preventDefault).toHaveBeenCalledTimes(0)
      expect(event.stopPropagation).toHaveBeenCalledTimes(0)

      await wrapper.setProps({
        preventScrollThrough: true
      })
      wrapper.find('.t-overlay').trigger('touchmove', event)
      expect(event.preventDefault).toHaveBeenCalledTimes(1)
      expect(event.stopPropagation).toHaveBeenCalledTimes(1)
    })

    it(': transparent', async () => {
      const wrapper = mount(Overlay, {
        props: {
          visible: true
        }
      })
      expect(wrapper.find('.t-overlay--transparent').exists()).toEqual(false)
      await wrapper.setProps({
        transparent: true
      })
      expect(wrapper.find('.t-overlay--transparent').exists()).toEqual(true)
    })

    it(': duration', async () => {
      const wrapper = mount(Overlay, {
        props: {
          visible: true,
        }
      })
      expect(getComputedStyle(wrapper.find('.t-overlay').element)['transition-duration']).toEqual('300ms')
      await wrapper.setProps({
        duration: 100
      })
      expect(getComputedStyle(wrapper.find('.t-overlay').element)['transition-duration']).toEqual('100ms')
    });

    it (': zIndex', async () => {
      const wrapper = mount(Overlay, {
        props: {
          visible: true,
        }
      })
      expect(getComputedStyle(wrapper.find('.t-overlay').element)['z-index']).toEqual('1000')
      await wrapper.setProps({
        zIndex: 99
      })
      expect(getComputedStyle(wrapper.find('.t-overlay').element)['z-index']).toEqual('99')
    })

  })

  describe('slots', () => {
    it(': default', () => {
      const wrapper = mount(Overlay, {
        props: { visible: true },
        slots: {
          default: 'my content'
        }
      })
      expect(wrapper.find('.t-overlay').text()).toEqual('my content')
    })
  })

  describe('events', () => {
    it(': click', async () => {
      const onClick = vi.fn()
      const wrapper = mount(Overlay, {
        props: {
          visible: true,
          onClick
        }
      })
      wrapper.find('.t-overlay').trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(1)
      expect(onClick).toHaveBeenCalledTimes(1)
      expect(onClick).toHaveBeenCalledWith({
        e: expect.any(MouseEvent)
      })
    });
  })
})

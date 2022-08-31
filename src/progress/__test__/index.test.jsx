import { describe, it, expect, vi } from 'vitest';
import Progress from '../progress.vue'
import { mount } from '@vue/test-utils';

describe('Progress', () => {
  describe('props', () => {
    it(': color', async () => {
      const wrapper = mount(Progress, {
        props: { color: 'orange' }
      })
      const percentBar = wrapper.find('.t-progress__bar-percent')
      expect(getComputedStyle(percentBar.element).backgroundColor).toBe('orange')

      await wrapper.setProps({
        color: 'red'
      })
      expect(getComputedStyle(percentBar.element).backgroundColor).toBe('red')
    })

    it(': label', async () => {
      const wrapper = mount(Progress)
      expect(wrapper.find('.t-progress__label').exists()).toEqual(true)
      await wrapper.setProps({
        label: false
      })
      expect(wrapper.find('.t-progress__label').exists()).toEqual(false)
    })

    it(': percentage', async () => {
      const wrapper = mount(Progress, {
        props: { percentage: 50 }
      })
      const percentBar = wrapper.find('.t-progress__bar-percent')
      expect(getComputedStyle(percentBar.element).width).toBe('50%')
      await wrapper.setProps({
        percentage: 80
      })
      expect(getComputedStyle(percentBar.element).width).toBe('80%')
    })

    it(': status', async () => {
      const wrapper = mount(Progress, {
        props: { status: 'success' }
      })

      expect(wrapper.classes()).toContain('t-progress--status--success')
      await wrapper.setProps({
        status: 'error'
      })
      expect(wrapper.classes()).not.toContain('t-progress--status--success')
      expect(wrapper.classes()).toContain('t-progress--status--error')
    })

    it(': strokeWidth', async () => {
      const wrapper = mount(Progress, {
        props: { strokeWidth: 10 }
      })
      expect(getComputedStyle(wrapper.find('.t-progress__bar').element).height).toEqual('10px')
      await wrapper.setProps({
        strokeWidth: 8
      })
      expect(getComputedStyle(wrapper.find('.t-progress__bar').element).height).toEqual('8px')
    })

    it(': trackColor', async () => {
      const wrapper = mount(Progress, {
        props: { trackColor: 'orange' }
      })
      expect(getComputedStyle(wrapper.find('.t-progress__bar').element).backgroundColor).toEqual('orange')
      await wrapper.setProps({
        trackColor: 'white'
      })
      expect(getComputedStyle(wrapper.find('.t-progress__bar').element).backgroundColor).toEqual('white')
    })
  })

  describe('slots', () => {
    it(': label', () => {
      const wrapper = mount(Progress, {
        slots: { label: '25%' }
      })
      expect(wrapper.find('.t-progress__label').text()).toEqual('25%')
    })
  })
})

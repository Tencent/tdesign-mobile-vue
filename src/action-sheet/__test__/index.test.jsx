import { describe, it, expect, vi } from 'vitest';
import { DOMWrapper, mount } from '@vue/test-utils';
import ActionSheet from '../action-sheet.vue'
import MenuGrid from '../menu-grid.vue'
import { ref } from 'vue';

describe('ActionSheet', () => {
  describe('props', () => {
    it ('showCancel', async () => {
      const wrapper = mount(ActionSheet, {
        props: {
          items: [],
          visible: true
        }
      })
      expect(wrapper.find('.t-action-sheet__action').exists()).toEqual(true)
      await wrapper.setProps({
        showCancel: false
      })
      expect(wrapper.find('.t-action-sheet__action').exists()).toEqual(false)
    })

    it ('cancelText', async () => {
      const wrapper = mount(ActionSheet, {
        props: {
          items: [],
          visible: true
        }
      })
      expect(wrapper.find('.t-action-sheet__action').text()).toEqual('取消')
      await wrapper.setProps({
        cancelText: 'Cancel'
      })
      expect(wrapper.find('.t-action-sheet__action').text()).toEqual('Cancel')
    })

    it ('type', async () => {
      const wrapper = mount(ActionSheet, {
        props: {
          type: 'list',
          items: [],
          visible: true
        }
      })
      expect(wrapper.find('.t-action-sheet__panel-list').exists()).toEqual(true)
      expect(wrapper.find('.t-action-sheet__panel-grid').exists()).toEqual(false)
      await wrapper.setProps({
        type: 'grid'
      })
      expect(wrapper.find('.t-action-sheet__panel-list').exists()).toEqual(false)
      expect(wrapper.find('.t-action-sheet__panel-grid').exists()).toEqual(true)
    })

    it ('count', async () => {
      const wrapper = mount(ActionSheet, {
        props: {
          type: 'grid',
          items: ['1', '2', '3'],
          visible: true,
          count: 2
        }
      })
      expect(wrapper.findComponent(MenuGrid).props().count).toEqual(2)
      await wrapper.setProps({
        count: 3
      })
      expect(wrapper.findComponent(MenuGrid).props().count).toEqual(3)
    })

    it ('visible', async () => {
      const wrapper = mount(ActionSheet, {
        props: {
          visible: true,
          items: []
        }
      })
      expect(wrapper.find('.t-popup--content').isVisible()).toEqual(true)
      await wrapper.setProps({
        visible: false
      })
      expect(wrapper.find('.t-popup--content').isVisible()).toEqual(false)
    })
  })

  describe('events', () => {
    it ('onSelected', () => {
      const onSelected = vi.fn()
      const wrapper = mount(() => <ActionSheet visible items={['确定', '删除']} onSelected={onSelected} />)
      wrapper.find('button').trigger('click')
      expect(onSelected).toHaveBeenCalledTimes(1)
      expect(onSelected).toHaveBeenLastCalledWith('确定', 0)
      wrapper.findAll('button')[1].trigger('click')
      expect(onSelected).toHaveBeenCalledTimes(2)
      expect(onSelected).toHaveBeenLastCalledWith('删除', 1)
    })

    it('onCancel', () => {
      const onCancel = vi.fn()
      const wrapper = mount(() => <ActionSheet visible items={['确定', '删除']} onCancel={onCancel} />)
      wrapper.find('.t-action-sheet__action').trigger('click')
      expect(onCancel).toHaveBeenCalledTimes(1)
    })

    it('onClose', () => {
      const onClose = vi.fn()
      const wrapper = mount(() => <ActionSheet visible items={['确定', '删除']} onClose={onClose} />)
      wrapper.find('.t-overlay').trigger('click')
      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })
})

describe('MenuGrid', () => {
  function triggerTouchEvent (event, ele, clientX) {
    ele.trigger(event, {
      touches: [
        {
          clientX
        }
      ],
      changedTouches: [
        {
          clientX
        }
      ]
    })
  }
  async function simulateSwipe(ele, dir) {
    await triggerTouchEvent('touchstart', ele, 0)
    const distance = 51
    await triggerTouchEvent('touchend', ele, dir === 'prev' ? distance : -distance)
  }

  it ('count', async () => {
    const wrapper = mount(MenuGrid, {
      props: {
        items: [{
          label: '1'
        }, {
          label: '2'
        }, {
          label: '3'
        }],
        count: 1
      }
    })
    expect(wrapper.findAll('.t-action-sheet__menu')).toHaveLength(3)
    await wrapper.setProps({
      count: 2
    })
    expect(wrapper.findAll('.t-action-sheet__menu')).toHaveLength(2)
  })

  it ('touch move', async () => {
    const wrapper = mount(MenuGrid, {
      props: {
        items: [{
          label: '1'
        }, {
          label: '2'
        }, {
          label: '3'
        }],
        count: 1
      }
    })

    Object.defineProperty(wrapper.element, 'offsetWidth', { configurable: true, value: 500 })
    const slider = wrapper.find('.t-action-sheet__menu-slider')
    await simulateSwipe(slider, 'next')
    expect(getComputedStyle(slider.element).transform).toEqual('translate3d(-500px, 0, 0)')
    await simulateSwipe(slider, 'prev')
    expect(getComputedStyle(slider.element).transform).toEqual('translate3d(0px, 0, 0)')
  })
})

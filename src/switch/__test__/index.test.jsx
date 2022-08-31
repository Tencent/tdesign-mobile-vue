import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { nextTick } from 'vue';
import Switch from '../switch.vue';
import { ref } from 'vue';

describe('switch', () => {
  describe('props', () => {
    it(': customValue', async () => {
      const onChange = (val) => {
        value.value = val
      };
      const value = ref(true);
      const customValue = ref([1, 0])
      const wrapper = mount({
        render() {
          return <Switch v-model={value.value} customValue={customValue.value} onChange={onChange} />
        }
      })
      const $node = wrapper.find('.t-switch__node')
      await $node.trigger('click')
      expect(value.value).toBe(0)
    })

    it(': color', async () => {
			const wrapper = mount(Switch, {
        props: {
          disabled: false,
					colors: ['blue', 'gray'],
				},
      });
      const $node = wrapper.find('.t-switch__node')
      expect(getComputedStyle($node.element, null).backgroundColor).toBe('gray')
    })

    it(': label', async () => {
			const wrapper = mount(Switch, {
				props: {
					label: '描述信息1',
				},
      });
      const $label = wrapper.find('.t-switch__text')
      expect($label.text()).toBe('描述信息1')

			await wrapper.setProps({
				label: '描述信息2',
			})
      expect($label.text()).toBe('描述信息2')
    })

		it(': disabled', async () => {
			const wrapper = mount(Switch, {
				props: {
					disabled: true,
				},
			});
			expect(wrapper.classes()).toContain('t-is-disabled');

			// 更新已挂载组件的 props
			await wrapper.setProps({
				disabled: false,
			})
			expect(wrapper.classes()).not.toContain('t-is-disabled');
		})
  })

  describe('events', () => {
    it(': change', async () => {
      const onChange = (val) => {
        value.value = val
      };
      const value = ref(true);
      const colors = ref(['blue', 'gray']);
      const wrapper = mount({
        render() {
          return <Switch v-model={value.value} colors={colors.value} onChange={onChange} />
        }
      })
      const $node = wrapper.find('.t-switch__node')
      expect(getComputedStyle($node.element, null).backgroundColor).toBe('blue')

      await $node.trigger('click')
      expect(getComputedStyle($node.element, null).backgroundColor).toBe('gray')

    })

  })

})

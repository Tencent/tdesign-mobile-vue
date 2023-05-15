import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Switch from '../switch.vue';
import { ref } from 'vue';

describe('switch', () => {
  describe('props', () => {
    it(':customValue', async () => {
      const onChange = (val) => {
        value.value = val;
      };
      const value = ref(true);
      const customValue = ref([1, 0]);
      const wrapper = mount({
        render() {
          return <Switch v-model={value.value} customValue={customValue.value} onChange={onChange} />;
        },
      });
      const $node = wrapper.find('.t-switch');
      await $node.trigger('click');
      expect(value.value).toBe(0);
    });

    it(':label', async () => {
      const wrapper = mount(Switch, {
        props: {
          label: ['open', 'close'],
        },
      });
      const $label = wrapper.find('.t-switch__label');
      expect($label.text()).toBe('close');

      await wrapper.trigger('click');
      expect($label.text()).toBe('open');
    });

    it(':disabled', async () => {
      const wrapper = mount(Switch, {
        props: {
          disabled: true,
        },
      });
      expect(wrapper.classes()).toContain('t-switch--disabled');

      await wrapper.setProps({
        disabled: false,
      });
      expect(wrapper.classes()).not.toContain('t-switch--disabled');
    });
  });
});

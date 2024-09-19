import { ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Switch from '../switch';

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

    it(':label=Array<string>', async () => {
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

    it(':label=Array<TNode>', async () => {
      const TNodeOpen = () => <span id="switch_open">open</span>;
      const TNodeClose = () => <span id="switch_close">close</span>;
      const label = [TNodeOpen, TNodeClose];
      const wrapper = mount({
        render() {
          return <Switch disabled label={label} />;
        },
      });
      const contentEle = wrapper.find('.t-switch__label');
      const text = contentEle.find('#switch_close').element.innerHTML;
      expect(text === 'close').toBe(true);
    });

    it(':label={TNode<value>}', () => {
      const label = (val) => (val ? <span id="switch_open">open</span> : <span id="switch_close">close</span>);
      const wrapper = mount({
        render() {
          return <Switch disabled label={label} />;
        },
      });
      const contentEle = wrapper.find('.t-switch__label');
      const text = contentEle.find('#switch_open').element.innerHTML;
      expect(text === 'open').toBe(true);
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

    it(': size', async () => {
      const wrapper = mount(Switch, {
        props: {
          size: '',
        },
      });
      expect(wrapper.classes()).toContain('t-switch--');
      await wrapper.setProps({
        size: 'small',
      });

      expect(wrapper.classes()).toContain('t-switch--small');
    });
  });

  describe('event', () => {
    it(': onChange', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Switch, {
        props: {
          onChange,
        },
      });
      const $switch = wrapper.find('.t-switch');
      await $switch.trigger('click');
      expect(onChange).toHaveBeenCalled();
    });
  });
});

import { h, ref, Ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import useDefaultValue from '../useDefaultValue';
import useExpose from '../useExpose';
import useVModel from '../useVModel';
import createTestComponent from './createTestComponent';

describe('hooks', () => {
  describe('useDefaultValue and useVModel', () => {
    it('updates internal default state in uncontrolled mode', () => {
      let result: [Ref<string>, (value: string) => void];
      const wrapper = mount(
        createTestComponent({
          setup() {
            const value = ref('initial');
            result = useDefaultValue<string, []>(value, 'default', vi.fn(), 'value');
            return () => h('div');
          },
        }),
      );
      if (!result) throw new Error('useDefaultValue result was not initialized');
      result[1]('changed');
      expect(result[0].value).toBe('changed');
      wrapper.unmount();
    });

    it('emits update:value in controlled mode', () => {
      const onChange = vi.fn();
      let update: (value: string, extra?: string) => void;
      const wrapper = mount(
        createTestComponent({
          props: { value: String },
          emits: ['update:value'],
          setup() {
            const [value, change] = useDefaultValue(ref('initial'), 'default', onChange, 'value');
            update = change;
            return () => h('span', value.value);
          },
        }),
        { props: { value: 'controlled' } },
      );
      if (!update) throw new Error('useDefaultValue change handler was not initialized');
      update('next', 'extra');
      expect(wrapper.emitted('update:value')).toEqual([['next']]);
      expect(onChange).toHaveBeenCalledWith('next', 'extra');
    });

    it('selects prop value, modelValue, or default in useVModel', () => {
      let selected: any;
      const Probe = createTestComponent({
        props: { value: String, modelValue: String },
        emits: ['update:value', 'update:modelValue'],
        setup(props: { value?: string; modelValue?: string }) {
          selected = useVModel(ref<string>(), ref(props.modelValue), 'default');
          return () => h('div');
        },
      });
      const uncontrolled = mount(Probe);
      expect(selected[0].value).toBe('default');
      uncontrolled.unmount();
      const controlled = mount(Probe, { props: { modelValue: 'model' } });
      expect(selected[0].value).toBe('model');
      controlled.unmount();
    });
  });

  describe('useExpose', () => {
    it('exposes APIs on the component public instance', () => {
      const exposed = vi.fn();
      const wrapper = mount(
        createTestComponent({
          setup() {
            useExpose({ exposed });
            return () => h('div');
          },
        }),
      );
      (wrapper.vm as any).exposed();
      expect(exposed).toHaveBeenCalledOnce();
    });
  });
});

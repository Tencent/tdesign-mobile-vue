import { h, ref } from 'vue';
import { enableAutoUnmount, mount } from '@vue/test-utils';
import { afterEach, describe, it, expect } from 'vitest';
import { Form } from '../index';
import { useFormDisabled, useReadonly } from '../hooks';

enableAutoUnmount(afterEach);

const mountProbe = (
  hook: typeof useFormDisabled,
  key: 'disabled' | 'readonly',
  ownValue?: boolean,
  extended = ref<boolean>(),
  formValue = ref<boolean>(),
) =>
  mount(
    {
      props: { disabled: { type: Boolean, default: undefined }, readonly: { type: Boolean, default: undefined } },
      setup() {
        const state = hook(extended);
        return () => h('span', String(state.value));
      },
    },
    {
      props: { [key]: ownValue },
      global: { provide: { formDisabled: { disabled: formValue }, formReadonly: { readonly: formValue } } },
    },
  );

describe('Form hooks', () => {
  describe('useFormDisabled', () => {
    it('defaults to false without a provider', () => {
      const wrapper = mount({
        setup() {
          const disabled = useFormDisabled();
          return () => h('span', String(disabled.value));
        },
      });
      expect(wrapper.text()).toBe('false');
    });

    it('component props override group and form state', async () => {
      const wrapper = mountProbe(useFormDisabled, 'disabled', false, ref(true), ref(true));
      expect(wrapper.text()).toBe('false');
      await wrapper.setProps({ disabled: true });
      expect(wrapper.text()).toBe('true');
    });

    it('inherits reactive form state when component and group are unspecified', async () => {
      const formValue = ref(true);
      const wrapper = mountProbe(useFormDisabled, 'disabled', undefined, ref(), formValue);
      expect(wrapper.text()).toBe('true');
      formValue.value = false;
      await wrapper.vm.$nextTick();
      expect(wrapper.text()).toBe('false');
    });

    it('disabled', async () => {
      const extendedDisabled = ref(false);
      let actualDisabled = ref(false);

      const wrapper = mount(Form, {
        props: {
          disabled: false,
        },
        slots: {
          default: () =>
            h({
              setup() {
                actualDisabled = useFormDisabled(extendedDisabled);
                return (): null => null;
              },
            }),
        },
      });

      expect(actualDisabled.value).toBeFalsy();

      extendedDisabled.value = true;
      expect(actualDisabled.value).toBeTruthy();

      await wrapper.setProps({ disabled: true });
      extendedDisabled.value = false;
      expect(actualDisabled.value).toBeFalsy();
    });
  });

  describe('useReadonly', () => {
    it('defaults to false without a provider', () => {
      const wrapper = mount({
        setup() {
          const readonly = useReadonly();
          return () => h('span', String(readonly.value));
        },
      });
      expect(wrapper.text()).toBe('false');
    });

    it('component props override group and form state', async () => {
      const wrapper = mountProbe(useReadonly, 'readonly', false, ref(true), ref(true));
      expect(wrapper.text()).toBe('false');
      await wrapper.setProps({ readonly: true });
      expect(wrapper.text()).toBe('true');
    });

    it('inherits reactive form state when component and group are unspecified', async () => {
      const formValue = ref(true);
      const wrapper = mountProbe(useReadonly, 'readonly', undefined, ref(), formValue);
      expect(wrapper.text()).toBe('true');
      formValue.value = false;
      await wrapper.vm.$nextTick();
      expect(wrapper.text()).toBe('false');
    });

    it('readonly', async () => {
      const extendedReadonly = ref(false);
      let actualReadonly = ref(false);

      const wrapper = mount(Form, {
        props: {
          readonly: false,
        },
        slots: {
          default: () =>
            h({
              setup() {
                actualReadonly = useReadonly(extendedReadonly);
                return (): null => null;
              },
            }),
        },
      });

      expect(actualReadonly.value).toBeFalsy();

      // 组件组优先级高于表单
      extendedReadonly.value = true;
      expect(actualReadonly.value).toBeTruthy();

      // 组件组为 false 时，以组件组的值为准
      await wrapper.setProps({ readonly: true });
      extendedReadonly.value = false;
      expect(actualReadonly.value).toBeFalsy();
    });
  });
});

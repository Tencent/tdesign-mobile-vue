import { ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { Form } from '../index.ts';
import { useFormDisabled, useReadonly } from '../hooks';

describe('Form hooks', () => {
  describe('useFormDisabled', () => {
    it('disabled', async () => {
      const extendedDisabled = ref(false);
      let actualDisabled = ref(false);

      const wrapper = mount(Form, {
        props: {
          disabled: false,
        },
        slots: {
          default: {
            setup() {
              actualDisabled = useFormDisabled(extendedDisabled);
              return () => null;
            },
          },
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
    it('readonly', async () => {
      const extendedReadonly = ref(false);
      let actualReadonly = ref(false);

      const wrapper = mount(Form, {
        props: {
          readonly: false,
        },
        slots: {
          default: {
            setup() {
              actualReadonly = useReadonly(extendedReadonly);
              return () => null;
            },
          },
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

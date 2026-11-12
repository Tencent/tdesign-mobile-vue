import { computed, h, nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import useLengthLimit from '../useLengthLimit';
import { useLockScroll } from '../useLockScroll';
import useGesture from '../useGesture';
import createTestComponent from './createTestComponent';

describe('hooks', () => {
  describe('useLengthLimit', () => {
    it('limits unicode input and reports the current length', () => {
      const state = ref({ value: 'ab😊c', maxlength: 4, maxcharacter: 0, allowInputOverMax: false });
      let api: ReturnType<typeof useLengthLimit>;
      mount(
        createTestComponent({
          setup() {
            api = useLengthLimit(computed(() => state.value));
            return () => h('div');
          },
        }),
      );

      if (!api) throw new Error('useLengthLimit API was not initialized');
      expect(api.getValueByLimitNumber('ab😊cde')).toBe('ab😊c');
      expect(api.limitNumber.value).toBe('4/4');
    });

    it('does not truncate when over-max input is allowed', () => {
      const state = ref({ value: 'abc', maxlength: 2, maxcharacter: 0, allowInputOverMax: true });
      let api: ReturnType<typeof useLengthLimit>;
      mount(
        createTestComponent({
          setup() {
            api = useLengthLimit(computed(() => state.value));
            return () => h('div');
          },
        }),
      );
      if (!api) throw new Error('useLengthLimit API was not initialized');
      expect(api.getValueByLimitNumber('abcdef')).toBe('abcdef');
      expect(api.limitNumber.value).toBe('3/2');
    });
  });

  describe('useLockScroll', () => {
    it('adds and removes the body lock class according to shouldLock', async () => {
      const locked = ref(true);
      const wrapper = mount(
        createTestComponent({
          setup() {
            useLockScroll(ref(document.createElement('div')), () => locked.value, 'dialog');
            return () => h('div');
          },
        }),
      );
      await nextTick();
      expect(document.body.classList.contains('dialog--lock')).toBe(true);
      locked.value = false;
      await nextTick();
      expect(document.body.classList.contains('dialog--lock')).toBe(false);
      wrapper.unmount();
    });
  });

  describe('useGesture', () => {
    it('creates and destroys a gesture instance', () => {
      let api: ReturnType<typeof useGesture>;
      const target = document.createElement('div');
      const wrapper = mount(
        createTestComponent({
          setup() {
            api = useGesture({});
            return () => h('div');
          },
        }),
      );
      if (!api) throw new Error('useGesture API was not initialized');
      api.create(target, {});
      expect(api.gesture).toBeTruthy();
      api.destroy();
      wrapper.unmount();
    });
  });
});

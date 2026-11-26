import { mount } from '@vue/test-utils';
import { defineComponent, h, KeepAlive, nextTick, ref } from 'vue';
import { describe, expect, it } from 'vitest';
import { useLockScroll } from '../useLockScroll';

const createLock = (name: string, initialVisibility = true) => {
  const visible = ref(initialVisibility);
  const Lock = defineComponent({
    setup() {
      useLockScroll(ref(), () => visible.value, name);
      return () => null;
    },
  });
  return { visible, Lock };
};

const mountLock = (name: string) => {
  const { visible, Lock } = createLock(name);
  return { visible, wrapper: mount(Lock) };
};

describe('useLockScroll', () => {
  it('releases its lock if unmounted before the visibility watcher runs', () => {
    const { visible, wrapper } = mountLock('scroll-lock-unmount');
    const body = document.body.classList;

    expect(body.contains('scroll-lock-unmount--lock')).toBe(true);
    visible.value = false;
    wrapper.unmount();

    expect(body.contains('scroll-lock-unmount--lock')).toBe(false);
  });

  it('preserves a sibling lock until the last owner unmounts', () => {
    const first = mountLock('scroll-lock-shared');
    const second = mountLock('scroll-lock-shared');
    const body = document.body.classList;

    first.visible.value = false;
    first.wrapper.unmount();
    try {
      expect(body.contains('scroll-lock-shared--lock')).toBe(true);
    } finally {
      second.wrapper.unmount();
    }

    expect(body.contains('scroll-lock-shared--lock')).toBe(false);
  });

  it('does not release a sibling lock when a deactivated owner is unmounted', async () => {
    const name = 'scroll-lock-cache';
    const body = document.body.classList;
    const active = ref(true);
    const { visible, Lock } = createLock(name, false);
    const sibling = mountLock(name);
    const owner = mount(() => h(KeepAlive, null, { default: () => (active.value ? h(Lock) : null) }));

    try {
      visible.value = true;
      await nextTick();
      active.value = false;
      await nextTick();
      owner.unmount();
      expect(body.contains(`${name}--lock`)).toBe(true);
    } finally {
      sibling.wrapper.unmount();
    }

    expect(body.contains(`${name}--lock`)).toBe(false);
  });
});

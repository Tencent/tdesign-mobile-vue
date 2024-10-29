import { Ref, watch, onMounted, onActivated, onBeforeUnmount, onDeactivated, nextTick } from 'vue';
import { useTouch } from '../_util/useTouch';
import getScrollParent from '../_util/getScrollParent';
import { supportsPassive } from '../_util/supportsPassive';

const totalLockCount = new Map<String, number>();
let mounted: boolean = null;

// 移植自vant：https://github.com/youzan/vant/blob/HEAD/src/composables/use-lock-scroll.ts
export function useLockScroll(rootRef: Ref<HTMLElement | undefined>, shouldLock: () => boolean, componentName: string) {
  const touch = useTouch();
  const BODY_LOCK_CLASS = `${componentName}--lock`;

  const onTouchMove = (event: TouchEvent) => {
    touch.move(event);

    const direction = touch.deltaY.value > 0 ? '10' : '01';
    const el = getScrollParent(event.target as Element, rootRef.value) as HTMLElement;
    if (!el) return;
    const { scrollHeight, offsetHeight, scrollTop } = el;
    let status = '11';

    if (scrollTop === 0) {
      status = offsetHeight >= scrollHeight ? '00' : '01';
    } else if (scrollTop + offsetHeight >= scrollHeight) {
      status = '10';
    }

    if (status !== '11' && touch.isVertical() && !(parseInt(status, 2) & parseInt(direction, 2))) {
      if (event.cancelable) {
        event.preventDefault();
      }
    }
  };

  const lock = () => {
    document.addEventListener('touchstart', touch.start);
    document.addEventListener('touchmove', onTouchMove, supportsPassive.value ? { passive: false } : false);

    if (!totalLockCount.get(BODY_LOCK_CLASS)) {
      document.body.classList.add(BODY_LOCK_CLASS);
    }

    totalLockCount.set(BODY_LOCK_CLASS, (totalLockCount.get(BODY_LOCK_CLASS) ?? 0) + 1);
  };

  const unlock = () => {
    const sum = Array.from(totalLockCount.values()).reduce((acc, val) => acc + val, 0);
    if (sum) {
      document.removeEventListener('touchstart', touch.start);
      document.removeEventListener('touchmove', onTouchMove);

      totalLockCount.set(BODY_LOCK_CLASS, Math.max((totalLockCount.get(BODY_LOCK_CLASS) ?? 0) - 1, 0));

      if (!totalLockCount.get(BODY_LOCK_CLASS)) {
        document.body.classList.remove(BODY_LOCK_CLASS);
      }
    }
  };

  const init = () => shouldLock() && lock();

  const destroy = () => shouldLock() && unlock();

  onMounted(() => {
    init();
    nextTick(() => {
      mounted = true;
    });
  });

  onActivated(() => {
    if (mounted) {
      init();
    }
  });

  onDeactivated(destroy);
  onBeforeUnmount(destroy);

  watch(shouldLock, (value) => {
    value ? lock() : unlock();
  });
}

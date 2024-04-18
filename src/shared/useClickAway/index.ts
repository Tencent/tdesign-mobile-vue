import { MaybeElementRef, UnRefElementReturn, unrefElement, useEventListener } from '@vueuse/core';
import isArray from 'lodash/isArray';
import { isBrowser } from '../util';

export interface UseClickAwayOptions {
  /**
   * The name of the trigger event.
   * @default 'touchstart'
   */
  eventName?: string;
  /**
   * Use capturing phase for internal event listener.
   * @default true
   */
  capture?: boolean;
  /**
   * List of elements that should not trigger the event.
   */
  ignore?: Array<MaybeElementRef>;
  /**
   * Run handler function if focus moves to an iframe.
   * @default false
   */
  detectIframe?: boolean;
}

export type UseClickAwayHandler<
  T extends { detectIframe: UseClickAwayOptions['detectIframe'] } = { detectIframe: false },
> = (evt: T['detectIframe'] extends true ? PointerEvent | FocusEvent : PointerEvent) => void;

/**
 * Listen for clicks outside of a collection of elements.
 * @param target
 * @param fn
 * @param options
 */
export function useClickAway<T extends UseClickAwayOptions>(
  target: MaybeElementRef | Array<MaybeElementRef>,
  fn: UseClickAwayHandler<{ detectIframe: T['detectIframe'] }>,
  options: T = {} as T,
) {
  if (!isBrowser) return;

  const { eventName = 'touchstart', capture = true, ignore = [], detectIframe = false } = options;

  const listenerOptions = {
    passive: true,
    capture,
  };

  // el是否包含在event.target
  const checkElInEvtTarget = (el: UnRefElementReturn, event: PointerEvent) => {
    return el && (event.target === el || event.composedPath().includes(el));
  };

  const shouldIgnore = (event: PointerEvent) => {
    return ignore.some((ignoreTarget) => checkElInEvtTarget(unrefElement(ignoreTarget), event));
  };

  const eventHandler = (event: PointerEvent) => {
    const targets = isArray(target) ? [...target] : [target];

    let shouldTrigger = targets.every((targetItem) => !checkElInEvtTarget(unrefElement(targetItem), event));

    if (!shouldTrigger) return;

    shouldTrigger = !shouldIgnore(event);

    if (!shouldTrigger) return;

    fn(event);
  };

  const cleanup = [useEventListener(window, eventName, eventHandler, listenerOptions)];

  if (detectIframe) {
    cleanup.push(
      useEventListener(window, 'blur', (event: PointerEvent) => {
        setTimeout(() => {
          const targets = isArray(target) ? [...target] : [target];

          if (
            targets.every((targetItem) => {
              const el = unrefElement(targetItem);
              return (
                window.document.activeElement?.tagName === 'IFRAME' && !el?.contains(window.document.activeElement)
              );
            })
          ) {
            fn(event);
          }
        }, 0);
      }),
    );
  }

  return () => cleanup.forEach((clean) => clean());
}

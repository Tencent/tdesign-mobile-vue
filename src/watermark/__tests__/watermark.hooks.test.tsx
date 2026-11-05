import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { effectScope, nextTick, ref, shallowRef } from 'vue';
import type { EffectScope } from 'vue';
import { tryOnScopeDispose, unrefElement, useMutationObserver } from '../hooks';

enableAutoUnmount(afterEach);

const scopes: EffectScope[] = [];
const createScope = () => {
  const scope = effectScope();
  scopes.push(scope);
  return scope;
};
const observe = (...args: Parameters<typeof useMutationObserver>) => {
  const observer = createScope().run(() => useMutationObserver(...args));
  if (!observer) throw new Error('Expected an active effect scope');
  return observer;
};

afterEach(() => {
  scopes.splice(0).forEach((scope) => scope.stop());
});

describe('unrefElement', () => {
  it('returns DOM elements and empty targets unchanged', () => {
    const element = document.createElement('div');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    expect(unrefElement(element)).toBe(element);
    expect(unrefElement(svg)).toBe(svg);
    expect(unrefElement(null)).toBeNull();
    expect(unrefElement(undefined)).toBeUndefined();
  });

  it('unwraps a reactive element reference', () => {
    const element = document.createElement('div');
    expect(unrefElement(ref(element))).toBe(element);
  });

  it('returns the root element of a Vue component instance', () => {
    const wrapper = mount({ render: () => <div>目标组件</div> });
    expect(unrefElement(wrapper.vm)).toBe(wrapper.element);
    expect(unrefElement(shallowRef(wrapper.vm))).toBe(wrapper.element);
  });
});

describe('tryOnScopeDispose', () => {
  it('returns false outside an active scope', () => {
    const cleanup = vi.fn();
    expect(tryOnScopeDispose(cleanup)).toBe(false);
    expect(cleanup).not.toHaveBeenCalled();
  });

  it('runs the registered callback once when the scope is disposed', () => {
    const scope = createScope();
    const cleanup = vi.fn();
    expect(scope.run(() => tryOnScopeDispose(cleanup))).toBe(true);
    expect(cleanup).not.toHaveBeenCalled();
    scope.stop();
    scope.stop();
    expect(cleanup).toHaveBeenCalledTimes(1);
  });
});

describe('useMutationObserver', () => {
  it('observes child mutations immediately after registration', async () => {
    const target = document.createElement('div');
    const callback = vi.fn();
    const observer = observe(target, callback, { childList: true });
    expect(observer.isSupported).toBe(true);
    const child = document.createElement('span');
    target.append(child);
    await flushPromises();

    expect(callback).toHaveBeenCalledTimes(1);
    const [records, mutationObserver] = callback.mock.calls[0];
    expect(records).toHaveLength(1);
    expect(records[0].type).toBe('childList');
    expect(records[0].target).toBe(target);
    expect(Array.from(records[0].addedNodes)).toEqual([child]);
    expect(mutationObserver).toBeInstanceOf(MutationObserver);
  });

  it('respects subtree and attribute filtering options', async () => {
    const target = document.createElement('div');
    const child = document.createElement('span');
    target.append(child);
    const callback = vi.fn();
    observe(target, callback, { attributes: true, subtree: true, attributeFilter: ['title'] });

    child.setAttribute('class', 'ignored');
    await flushPromises();
    expect(callback).not.toHaveBeenCalled();
    child.setAttribute('title', '观察属性');
    await flushPromises();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback.mock.calls[0][0][0].target).toBe(child);
    expect(callback.mock.calls[0][0][0].attributeName).toBe('title');
  });

  it('starts observing when an initially empty ref receives an element', async () => {
    const target = shallowRef<HTMLElement>();
    const callback = vi.fn();
    observe(target, callback, { childList: true });
    expect(callback).not.toHaveBeenCalled();

    const element = document.createElement('div');
    target.value = element;
    await nextTick();
    element.append(document.createElement('span'));
    await flushPromises();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback.mock.calls[0][0][0].target).toBe(element);
  });

  it('disconnects the previous target when the ref changes', async () => {
    const previous = document.createElement('div');
    const current = document.createElement('div');
    const target = shallowRef<HTMLElement | null>(previous);
    const callback = vi.fn();
    observe(target, callback, { childList: true });

    target.value = current;
    await nextTick();
    previous.append(document.createElement('span'));
    await flushPromises();
    expect(callback).not.toHaveBeenCalled();
    current.append(document.createElement('span'));
    await flushPromises();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback.mock.calls[0][0][0].target).toBe(current);

    callback.mockClear();
    target.value = null;
    await nextTick();
    current.append(document.createElement('span'));
    await flushPromises();
    expect(callback).not.toHaveBeenCalled();
  });

  it('stop disconnects the observer and prevents observing subsequent targets', async () => {
    const previous = document.createElement('div');
    const current = document.createElement('div');
    const target = shallowRef(previous);
    const callback = vi.fn();
    const observer = observe(target, callback, { childList: true });
    previous.append(document.createElement('span'));
    await flushPromises();
    expect(callback).toHaveBeenCalledTimes(1);

    callback.mockClear();
    observer.stop();
    observer.stop();
    target.value = current;
    await nextTick();
    previous.append(document.createElement('span'));
    current.append(document.createElement('span'));
    await flushPromises();
    expect(callback).not.toHaveBeenCalled();
  });

  it('disconnects the observer when its effect scope is disposed', async () => {
    const target = document.createElement('div');
    const callback = vi.fn();
    const scope = createScope();
    scope.run(() => useMutationObserver(target, callback, { childList: true }));
    target.append(document.createElement('span'));
    await flushPromises();
    expect(callback).toHaveBeenCalledTimes(1);

    callback.mockClear();
    scope.stop();
    target.append(document.createElement('span'));
    await flushPromises();
    expect(callback).not.toHaveBeenCalled();
  });

  it('does not observe mutations when MutationObserver is unsupported', async () => {
    const target = document.createElement('div');
    const callback = vi.fn();
    const observer = observe(target, callback, { window: {} as Window, childList: true });
    expect(observer.isSupported).toBe(false);
    target.append(document.createElement('span'));
    await flushPromises();
    expect(callback).not.toHaveBeenCalled();
    expect(() => observer.stop()).not.toThrow();
  });
});

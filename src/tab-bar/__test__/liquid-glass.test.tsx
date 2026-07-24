import { computed, createSSRApp, h, nextTick, provide, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { renderToString } from 'vue/server-renderer';
import { afterEach, describe, expect, it, vi } from 'vitest';
import TabBar from '../tab-bar';
import TabBarItem from '../tab-bar-item';
import { tabBarGlassDevContextKey } from '../useTabBarGlassFilter';

interface RuntimeOptions {
  canvasContextFails?: boolean;
  includeResizeObserver?: boolean;
  toDataURLFails?: boolean;
}

type AnimationFrameCallback = (timestamp: number) => void;
type ObserverCallback = (entries: unknown[], observer: unknown) => void;

function installGlassRuntime(options: RuntimeOptions = {}) {
  const { canvasContextFails = false, includeResizeObserver = true, toDataURLFails = false } = options;
  const frames = new Map<number, AnimationFrameCallback>();
  const observers: MockResizeObserver[] = [];
  let frameId = 0;
  let rect = { width: 390, height: 64 };

  class MockResizeObserver {
    callback: ObserverCallback;

    observe = vi.fn();

    disconnect = vi.fn();

    constructor(callback: ObserverCallback) {
      this.callback = callback;
      observers.push(this);
    }

    trigger() {
      this.callback([], this);
    }
  }

  function MockImageData(this: ImageData, data: Uint8ClampedArray, width: number, height: number) {
    Object.assign(this, { data, width, height });
  }

  const requestAnimationFrame = vi.fn((callback: AnimationFrameCallback) => {
    frameId += 1;
    frames.set(frameId, callback);
    return frameId;
  });
  const cancelAnimationFrame = vi.fn((id: number) => frames.delete(id));
  const context = { putImageData: vi.fn() };
  const getContext = vi
    .spyOn(HTMLCanvasElement.prototype, 'getContext')
    .mockImplementation(() => (canvasContextFails ? null : (context as unknown as CanvasRenderingContext2D)));
  const toDataURL = vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockImplementation(function toDataURL(
    this: HTMLCanvasElement,
  ) {
    if (toDataURLFails) throw new Error('encoding failed');
    return `data:image/png;base64,${this.width}x${this.height}`;
  });

  vi.stubGlobal('requestAnimationFrame', requestAnimationFrame);
  vi.stubGlobal('cancelAnimationFrame', cancelAnimationFrame);
  vi.stubGlobal('ImageData', MockImageData);
  vi.stubGlobal('CSS', { supports: vi.fn(() => true) });
  if (includeResizeObserver) vi.stubGlobal('ResizeObserver', MockResizeObserver);
  else vi.stubGlobal('ResizeObserver', undefined);

  Object.defineProperty(window, 'devicePixelRatio', { configurable: true, value: 1 });
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(
    () =>
      ({
        width: rect.width,
        height: rect.height,
        x: 0,
        y: 0,
        top: 0,
        right: rect.width,
        bottom: rect.height,
        left: 0,
        toJSON: () => ({}),
      }) as DOMRect,
  );

  return {
    observers,
    requestAnimationFrame,
    cancelAnimationFrame,
    getContext,
    toDataURL,
    runFrames() {
      const callbacks = [...frames.values()];
      frames.clear();
      callbacks.forEach((callback) => callback(performance.now()));
    },
    setRect(width: number, height: number) {
      rect = { width, height };
    },
  };
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  document.body.innerHTML = '';
});

describe('TabBar Liquid Glass runtime', () => {
  it('keeps the default mode free of glass runtime DOM', () => {
    const wrapper = mount(TabBar, { props: { fixed: false } });

    expect(wrapper.classes()).not.toContain('t-tab-bar--glass');
    expect(wrapper.find('[class*="__glass-"]').exists()).toBe(false);
  });

  it('mounts glass layers and creates an SVG filter after enhancement succeeds', async () => {
    const runtime = installGlassRuntime();
    const wrapper = mount(TabBar, { props: { effect: 'glass', fixed: false } });

    expect(wrapper.find('.t-tab-bar__glass-base').exists()).toBe(true);
    expect(wrapper.find('filter').exists()).toBe(false);
    runtime.runFrames();
    await nextTick();

    expect(wrapper.find('filter').exists()).toBe(true);
    expect(wrapper.find('.t-tab-bar__glass-refraction').attributes('style')).toContain('url');
  });

  it('renders one independent liquid-glass filter for the selected item and moves it on selection', async () => {
    const runtime = installGlassRuntime();
    const value = ref('home');
    const Host = {
      setup() {
        return () =>
          h(
            TabBar,
            {
              effect: 'glass',
              shape: 'round',
              fixed: false,
              modelValue: value.value,
              'onUpdate:modelValue': (nextValue: string) => {
                value.value = nextValue;
              },
            },
            {
              default: () => [
                h(TabBarItem, { value: 'home' }, () => 'Home'),
                h(TabBarItem, { value: 'discover' }, () => 'Discover'),
              ],
            },
          );
      },
    };
    const wrapper = mount(Host);
    runtime.runFrames();
    await nextTick();

    expect(wrapper.findAll('filter')).toHaveLength(2);
    expect(wrapper.findAll('.t-tab-bar-item__selected-glass-refraction')).toHaveLength(1);
    const firstFilterId = wrapper.find('.t-tab-bar-item__selected-glass-filter filter').attributes('id');

    await wrapper.findAll('[role="tab"]')[1].trigger('click');
    await nextTick();
    runtime.runFrames();
    await nextTick();

    expect(value.value).toBe('discover');
    expect(wrapper.findAll('.t-tab-bar-item__selected-glass-refraction')).toHaveLength(1);
    expect(wrapper.find('.t-tab-bar-item__selected-glass-filter filter').attributes('id')).not.toBe(firstFilterId);
  });

  it('renders only the CSS glass baseline during SSR', async () => {
    const html = await renderToString(h(TabBar, { effect: 'glass', fixed: false }));

    expect(html).toContain('t-tab-bar--glass');
    expect(html).toContain('t-tab-bar__glass-base');
    expect(html).not.toContain('t-tab-bar__glass-filter');
    expect(html).not.toContain('<filter');
  });

  it('builds the complete optical SVG filter graph in a stable order', async () => {
    const runtime = installGlassRuntime();
    const wrapper = mount(TabBar, { props: { effect: 'glass', fixed: false } });
    runtime.runFrames();
    await nextTick();

    const filter = wrapper.find('filter').element;
    expect(Array.from(filter.children).map((node) => node.tagName)).toEqual([
      'feGaussianBlur',
      'feImage',
      'feDisplacementMap',
      'feColorMatrix',
      'feImage',
      'feComposite',
      'feComponentTransfer',
      'feBlend',
      'feBlend',
    ]);
  });

  it('hydrates the glass baseline without a structure mismatch', async () => {
    vi.stubGlobal('ResizeObserver', undefined);
    const App = { render: () => h(TabBar, { effect: 'glass', fixed: false }) };
    const html = await renderToString(h(App));
    const container = document.createElement('div');
    container.innerHTML = html;
    document.body.append(container);
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    const app = createSSRApp(App);
    app.mount(container);
    await nextTick();

    expect(warning.mock.calls.flat().join(' ')).not.toContain('Hydration');
    app.unmount();
  });

  it('uses a unique filter ID for each instance', async () => {
    const runtime = installGlassRuntime();
    const Host = {
      render: () =>
        h('div', [h(TabBar, { effect: 'glass', fixed: false }), h(TabBar, { effect: 'glass', fixed: false })]),
    };
    const wrapper = mount(Host);
    runtime.runFrames();
    await nextTick();

    const ids = wrapper.findAll('filter').map((filter) => filter.attributes('id'));
    expect(ids).toHaveLength(2);
    expect(new Set(ids).size).toBe(2);
  });

  it('coalesces repeated resize notifications into one rebuild', async () => {
    const runtime = installGlassRuntime();
    const wrapper = mount(TabBar, { props: { effect: 'glass', fixed: false } });
    runtime.runFrames();
    await nextTick();
    runtime.requestAnimationFrame.mockClear();
    runtime.toDataURL.mockClear();
    runtime.setRect(430, 64);

    runtime.observers[0].trigger();
    runtime.observers[0].trigger();
    runtime.observers[0].trigger();

    expect(runtime.requestAnimationFrame).toHaveBeenCalledTimes(1);
    runtime.runFrames();
    await nextTick();
    expect(runtime.toDataURL).toHaveBeenCalledTimes(2);
    wrapper.unmount();
  });

  it('rebuilds once when private calibration tuning changes', async () => {
    const runtime = installGlassRuntime();
    const tuning = ref({ displacementGain: 1, textureDpr: 1 });
    const onRebuild = vi.fn();
    const Host = {
      setup() {
        provide(tabBarGlassDevContextKey, { tuning: computed(() => tuning.value), onRebuild });
        return () => h(TabBar, { effect: 'glass', fixed: false });
      },
    };
    const wrapper = mount(Host);
    runtime.runFrames();
    await nextTick();
    runtime.requestAnimationFrame.mockClear();

    tuning.value = { displacementGain: 1.5, textureDpr: 2 };
    await nextTick();

    expect(runtime.requestAnimationFrame).toHaveBeenCalledTimes(1);
    runtime.runFrames();
    await nextTick();
    expect(onRebuild).toHaveBeenCalledTimes(2);
    expect(onRebuild.mock.lastCall?.[0]).toMatchObject({ textureWidth: 780, textureHeight: 128 });
    wrapper.unmount();
  });

  it('rebuilds the texture when shape changes', async () => {
    const runtime = installGlassRuntime();
    const wrapper = mount(TabBar, { props: { effect: 'glass', fixed: false, shape: 'normal' } });
    runtime.runFrames();
    await nextTick();
    runtime.toDataURL.mockClear();

    await wrapper.setProps({ shape: 'round' });
    await nextTick();
    runtime.runFrames();
    await nextTick();

    expect(runtime.toDataURL).toHaveBeenCalledTimes(2);
  });

  it('creates and cleans resources when effect changes', async () => {
    const runtime = installGlassRuntime();
    const wrapper = mount(TabBar, { props: { effect: 'normal', fixed: false } });

    await wrapper.setProps({ effect: 'glass' });
    await nextTick();
    runtime.runFrames();
    await nextTick();
    expect(wrapper.find('filter').exists()).toBe(true);
    const glassObserver = runtime.observers.at(-1);

    await wrapper.setProps({ effect: 'normal' });
    await nextTick();
    expect(wrapper.find('[class*="__glass-"]').exists()).toBe(false);
    expect(glassObserver?.disconnect).toHaveBeenCalledTimes(1);
  });

  it('disconnects the observer and cancels a pending frame on unmount', () => {
    const runtime = installGlassRuntime();
    const wrapper = mount(TabBar, { props: { effect: 'glass', fixed: false } });

    wrapper.unmount();

    expect(runtime.observers[0].disconnect).toHaveBeenCalledTimes(1);
    expect(runtime.cancelAnimationFrame).toHaveBeenCalledTimes(1);
  });

  it('keeps the CSS fallback when Canvas context creation fails', async () => {
    const runtime = installGlassRuntime({ canvasContextFails: true });
    const wrapper = mount(TabBar, { props: { effect: 'glass', fixed: false } });
    runtime.runFrames();
    await nextTick();

    expect(wrapper.find('.t-tab-bar__glass-base').exists()).toBe(true);
    expect(wrapper.find('filter').exists()).toBe(false);
  });

  it('keeps the CSS fallback when texture encoding fails', async () => {
    const runtime = installGlassRuntime({ toDataURLFails: true });
    const wrapper = mount(TabBar, { props: { effect: 'glass', fixed: false } });
    runtime.runFrames();
    await nextTick();

    expect(wrapper.find('.t-tab-bar__glass-base').exists()).toBe(true);
    expect(wrapper.find('filter').exists()).toBe(false);
  });

  it('does not add a global resize listener without ResizeObserver', async () => {
    installGlassRuntime({ includeResizeObserver: false });
    const addEventListener = vi.spyOn(window, 'addEventListener');
    const wrapper = mount(TabBar, { props: { effect: 'glass', fixed: false } });
    await nextTick();

    expect(wrapper.find('.t-tab-bar__glass-base').exists()).toBe(true);
    expect(wrapper.find('filter').exists()).toBe(false);
    expect(addEventListener).not.toHaveBeenCalledWith('resize', expect.any(Function));
  });
});

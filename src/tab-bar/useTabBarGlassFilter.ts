import {
  ComputedRef,
  InjectionKey,
  Ref,
  ShallowRef,
  nextTick,
  onBeforeUnmount,
  onMounted,
  shallowRef,
  watch,
} from 'vue';
import { TabBarGlassTuning, createTabBarGlassTextures } from './liquid-glass-map';

export interface TabBarGlassFilterState {
  filterId: string;
  width: number;
  height: number;
  displacementScale: number;
  blur: number;
  specularOpacity: number;
  specularSaturation: number;
  displacementUrl: string;
  specularUrl: string;
}

interface TabBarGlassFilterOptions {
  root: Ref<HTMLElement | undefined>;
  enabled: ComputedRef<boolean>;
  shape: ComputedRef<'normal' | 'round'>;
  devContext?: TabBarGlassDevContext;
}

export interface TabBarGlassRuntimeTuning extends Partial<TabBarGlassTuning> {
  textureDpr?: number;
}

export interface TabBarGlassBuildStats {
  filterId: string;
  width: number;
  height: number;
  textureWidth: number;
  textureHeight: number;
  bezelWidth: number;
  generationDuration: number;
  totalDuration: number;
}

export interface TabBarGlassDevContext {
  tuning: ComputedRef<TabBarGlassRuntimeTuning>;
  onRebuild?: (stats: TabBarGlassBuildStats) => void;
  shouldEnhance?: (element: HTMLElement) => boolean;
}

export const tabBarGlassDevContextKey: InjectionKey<TabBarGlassDevContext> = Symbol('tab-bar-glass-dev-context');

let filterSequence = 0;

const createFilterId = () => {
  filterSequence += 1;
  return `t-tab-bar-glass-${filterSequence}`;
};

const isChromiumEngine = () => {
  const browserNavigator = navigator as Navigator & {
    userAgentData?: { brands?: Array<{ brand: string }> };
  };
  const brands = browserNavigator.userAgentData?.brands;
  if (brands?.some(({ brand }) => brand === 'Chromium')) return true;
  return /\b(?:Chromium|Chrome|Edg|OPR)\/\d/.test(browserNavigator.userAgent);
};

const canEnhance = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;
  if (!isChromiumEngine()) return false;
  if (typeof ResizeObserver === 'undefined') return false;
  if (typeof requestAnimationFrame !== 'function' || typeof cancelAnimationFrame !== 'function') return false;
  if (typeof ImageData === 'undefined') return false;
  if (typeof CSS === 'undefined' || typeof CSS.supports !== 'function') return false;
  return CSS.supports('backdrop-filter', 'url("#t-tab-bar-glass-test")');
};

const encodeTexture = (pixels: Uint8ClampedArray, width: number, height: number) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  try {
    const context = canvas.getContext('2d');
    if (!context) return '';
    const imageData = new Uint8ClampedArray(pixels.length);
    imageData.set(pixels);
    context.putImageData(new ImageData(imageData, width, height), 0, 0);
    return canvas.toDataURL('image/png');
  } finally {
    canvas.width = 0;
    canvas.height = 0;
  }
};

const resolveRadius = (element: HTMLElement, shape: 'normal' | 'round', width: number, height: number) => {
  const computedRadius = Number.parseFloat(window.getComputedStyle(element).borderTopLeftRadius);
  if (Number.isFinite(computedRadius)) return Math.min(computedRadius, width / 2, height / 2);
  return shape === 'round' ? Math.min(width, height) / 2 : 0;
};

export function useTabBarGlassFilter(options: TabBarGlassFilterOptions): ShallowRef<TabBarGlassFilterState | null> {
  const filterState = shallowRef<TabBarGlassFilterState | null>(null);
  let mounted = false;
  let filterId = '';
  let observer: ResizeObserver | null = null;
  let scheduledFrame = 0;
  let lastSignature = '';

  const clearEnhancement = () => {
    filterState.value = null;
    lastSignature = '';
  };

  const cancelScheduledFrame = () => {
    if (!scheduledFrame) return;
    cancelAnimationFrame(scheduledFrame);
    scheduledFrame = 0;
  };

  const stop = () => {
    observer?.disconnect();
    observer = null;
    cancelScheduledFrame();
    clearEnhancement();
  };

  const isEnhancementAllowed = (element: HTMLElement) => {
    return options.devContext?.shouldEnhance?.(element) !== false && canEnhance();
  };

  const rebuild = () => {
    scheduledFrame = 0;
    const element = options.root.value;
    if (!mounted || !options.enabled.value || !element) return;
    if (!isEnhancementAllowed(element)) {
      stop();
      return;
    }

    const startedAt = performance.now();
    const rect = element.getBoundingClientRect();
    const width = Math.max(0, rect.width);
    const height = Math.max(0, rect.height);
    const radius = resolveRadius(element, options.shape.value, width, height);
    const tuning = options.devContext?.tuning.value ?? {};
    const dpr = (tuning.textureDpr ?? window.devicePixelRatio) || 1;
    const signature = `${width}:${height}:${radius}:${dpr}:${JSON.stringify(tuning)}`;
    if (signature === lastSignature) return;

    try {
      const generationStartedAt = performance.now();
      const textures = createTabBarGlassTextures({ width, height, radius, dpr, tuning });
      const generationDuration = performance.now() - generationStartedAt;
      if (!textures) {
        clearEnhancement();
        return;
      }

      const displacementUrl = encodeTexture(textures.displacement, textures.width, textures.height);
      const specularUrl = encodeTexture(textures.specular, textures.width, textures.height);
      if (!displacementUrl || !specularUrl) {
        clearEnhancement();
        return;
      }

      if (!filterId) filterId = createFilterId();
      filterState.value = {
        filterId,
        width,
        height,
        displacementScale: textures.displacementScale,
        blur: textures.blur,
        specularOpacity: textures.specularOpacity,
        specularSaturation: textures.specularSaturation,
        displacementUrl,
        specularUrl,
      };
      lastSignature = signature;
      options.devContext?.onRebuild?.({
        filterId,
        width,
        height,
        textureWidth: textures.width,
        textureHeight: textures.height,
        bezelWidth: textures.bezelWidth,
        generationDuration,
        totalDuration: performance.now() - startedAt,
      });
    } catch {
      clearEnhancement();
    }
  };

  const scheduleRebuild = () => {
    if (scheduledFrame || !mounted || !options.enabled.value) return;
    const element = options.root.value;
    if (!element || !isEnhancementAllowed(element)) {
      stop();
      return;
    }
    scheduledFrame = requestAnimationFrame(rebuild);
  };

  const start = () => {
    const element = options.root.value;
    if (!mounted || !options.enabled.value || !element || !isEnhancementAllowed(element)) {
      stop();
      return;
    }

    if (!observer) {
      observer = new ResizeObserver(scheduleRebuild);
      observer.observe(element);
    }
    scheduleRebuild();
  };

  watch(options.enabled, async (enabled) => {
    if (!mounted) return;
    if (!enabled) {
      stop();
      return;
    }
    await nextTick();
    start();
  });

  watch(
    options.shape,
    async () => {
      if (!mounted || !options.enabled.value) return;
      await nextTick();
      lastSignature = '';
      scheduleRebuild();
    },
    { flush: 'post' },
  );

  if (options.devContext) {
    watch(
      options.devContext.tuning,
      () => {
        if (!mounted || !options.enabled.value) return;
        lastSignature = '';
        scheduleRebuild();
      },
      { deep: true },
    );
  }

  onMounted(() => {
    mounted = true;
    start();
  });

  onBeforeUnmount(() => {
    mounted = false;
    stop();
    filterId = '';
  });

  return filterState;
}

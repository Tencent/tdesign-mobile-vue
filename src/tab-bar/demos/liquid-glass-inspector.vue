<template>
  <section class="glass-inspector" :class="`glass-inspector--${theme}`" :style="demoVariables">
    <div ref="layoutElement" class="glass-inspector__layout" :class="{ 'is-stacked': stacked }">
      <aside class="glass-inspector__stage-column">
        <div class="glass-inspector__comparison">
          <article>
            <header>
              <strong>Final Glass reference</strong><span>{{ previewWidth }} px</span>
            </header>
            <div
              class="glass-inspector__stage"
              :class="{ 'is-dragging': backgroundDragging }"
              :style="stageStyle"
              data-testid="inspector-stage-final"
              role="group"
              aria-label="Final preview background"
              @pointerdown="startBackgroundDrag"
              @pointermove="moveBackground"
              @pointerup="stopBackgroundDrag"
              @pointercancel="stopBackgroundDrag"
              @wheel.prevent="zoomBackground"
            >
              <div
                class="glass-inspector__backdrop"
                :class="backdropClasses"
                :style="backgroundStyle"
                aria-hidden="true"
              >
                <div v-if="background === 'text'" class="glass-inspector__text-plane">
                  <strong>Layer inspection keeps optical evidence readable.</strong>
                  <span v-for="line in textLines" :key="line">{{ line }}</span>
                </div>
              </div>
              <div class="glass-inspector__bar-slot">
                <t-tab-bar v-model="selected" effect="glass" shape="round" :fixed="false" :bordered="true">
                  <t-tab-bar-item v-for="item in items" :key="item.value" :value="item.value">
                    {{ item.label }}
                    <template #icon><t-icon :name="item.icon" /></template>
                  </t-tab-bar-item>
                </t-tab-bar>
              </div>
            </div>
          </article>

          <article>
            <header>
              <strong>{{ activeModeLabel }}</strong
              ><span>isolated layer</span>
            </header>
            <div
              class="glass-inspector__stage"
              :class="{ 'is-dragging': backgroundDragging }"
              :style="stageStyle"
              data-testid="inspector-stage-isolated"
              role="group"
              aria-label="Isolated preview background"
              @pointerdown="startBackgroundDrag"
              @pointermove="moveBackground"
              @pointerup="stopBackgroundDrag"
              @pointercancel="stopBackgroundDrag"
              @wheel.prevent="zoomBackground"
            >
              <div
                class="glass-inspector__backdrop"
                :class="backdropClasses"
                :style="backgroundStyle"
                aria-hidden="true"
              >
                <div v-if="background === 'text'" class="glass-inspector__text-plane">
                  <strong>Layer inspection keeps optical evidence readable.</strong>
                  <span v-for="line in textLines" :key="line">{{ line }}</span>
                </div>
              </div>
              <div class="glass-inspector__bar-slot glass-inspector__bar-slot--diagnostic">
                <t-tab-bar
                  v-if="inspectionMode === 'fallback'"
                  v-model="selected"
                  class="glass-inspector__fallback-bar"
                  effect="glass"
                  shape="round"
                  :fixed="false"
                  :bordered="true"
                  data-testid="inspection-fallback-bar"
                >
                  <t-tab-bar-item v-for="item in items" :key="item.value" :value="item.value">
                    {{ item.label }}
                    <template #icon><t-icon :name="item.icon" /></template>
                  </t-tab-bar-item>
                </t-tab-bar>
                <div v-else class="glass-inspector__material">
                  <div
                    v-if="inspectionMode === 'refraction'"
                    class="glass-inspector__refraction"
                    :style="refractionStyle"
                    data-testid="inspection-refraction-layer"
                  ></div>
                  <img
                    v-else-if="inspectionMode === 'specular-overlay' && specularUrl"
                    class="glass-inspector__specular-overlay"
                    :src="specularUrl"
                    alt=""
                    :style="{ opacity: specularOpacity }"
                    data-testid="inspection-specular-overlay"
                  />
                  <div
                    v-else-if="inspectionMode === 'specular-map'"
                    class="glass-inspector__map-board"
                    data-testid="inspection-specular-map"
                  >
                    <img v-if="specularUrl" :src="specularUrl" alt="Raw specular alpha map" />
                    <span v-else>Waiting for Chromium texture…</span>
                  </div>
                  <div v-else class="glass-inspector__sheen"></div>

                  <div v-if="inspectionMode !== 'specular-map'" class="glass-inspector__items" aria-hidden="true">
                    <span v-for="item in items" :key="item.value">
                      <t-icon :name="item.icon" />
                      <small>{{ item.label }}</small>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>

        <p class="glass-inspector__stage-hint">
          <t-icon name="move" />
          <span>
            <span>在任一预览区域拖拽背景，使用滚轮或触控板缩放。</span>
            <span>网格、文本与图片共享同一组位置和缩放参数。</span>
          </span>
        </p>
      </aside>

      <div class="glass-inspector__panel">
        <header class="glass-inspector__header">
          <div>
            <span class="glass-inspector__eyebrow">Liquid Glass layer inspector / 分层检查</span>
            <h2>Separate refraction, specular and sheen</h2>
            <p>上方始终显示最终 Glass，下方只显示当前检查层；两个画面共享完全相同的背景位置和光学参数。</p>
          </div>
          <a href="#/tab-bar/liquid-glass">打开原始 Normal / Fallback / Final Demo</a>
        </header>

        <section class="glass-inspector__controls" aria-label="Layer inspector controls">
          <div class="glass-inspector__control glass-inspector__control--wide">
            <strong>Inspection mode / 检查模式</strong>
            <div class="glass-inspector__segments glass-inspector__segments--modes">
              <button
                v-for="option in inspectionModes"
                :key="option.value"
                type="button"
                :class="{ 'is-active': inspectionMode === option.value }"
                :aria-pressed="inspectionMode === option.value"
                :data-testid="`inspection-${option.value}`"
                @click="inspectionMode = option.value"
              >
                <span>{{ option.label }}</span>
                <span class="glass-inspector__segment-name">{{ option.name }}</span>
              </button>
            </div>
            <small>{{ activeModeDescription }}</small>
          </div>

          <div class="glass-inspector__control">
            <strong>Background / 背景</strong>
            <div class="glass-inspector__segments">
              <button
                v-for="option in backgrounds"
                :key="option.value"
                type="button"
                :class="{ 'is-active': background === option.value }"
                :aria-pressed="background === option.value"
                :data-testid="`background-${option.value}`"
                @click="background = option.value"
              >
                <span>{{ option.label }}</span>
                <span class="glass-inspector__segment-name">{{ option.name }}</span>
              </button>
            </div>
          </div>

          <div class="glass-inspector__control">
            <strong>Surface / 曲面</strong>
            <div class="glass-inspector__segments">
              <button
                v-for="option in surfaces"
                :key="option.value"
                type="button"
                :class="{ 'is-active': surface === option.value }"
                :aria-pressed="surface === option.value"
                :data-testid="`surface-${option.value}`"
                @click="surface = option.value"
              >
                <span>{{ option.label }}</span>
                <span class="glass-inspector__segment-name">{{ option.name }}</span>
              </button>
            </div>
          </div>

          <div class="glass-inspector__control">
            <strong>Theme / 主题</strong>
            <div class="glass-inspector__segments">
              <button
                v-for="option in themes"
                :key="option.value"
                type="button"
                :class="{ 'is-active': theme === option.value }"
                :aria-pressed="theme === option.value"
                :data-testid="`theme-${option.value}`"
                @click="theme = option.value"
              >
                <span>{{ option.label }}</span>
                <span class="glass-inspector__segment-name">{{ option.name }}</span>
              </button>
            </div>
          </div>

          <label class="glass-inspector__toggle">
            <input v-model="backgroundMoves" type="checkbox" data-testid="inspector-background-motion" />
            <span><strong>Move background</strong><small>只移动真实背景，不持续重建纹理。</small></span>
          </label>
        </section>

        <section class="glass-inspector__metrics" aria-live="polite">
          <template v-if="inspectionMode === 'fallback'">
            <div>
              <span>Base blur</span><strong>{{ fallbackBlur.toFixed(1) }} px</strong>
            </div>
            <div>
              <span>Center ×0.2</span
              ><strong data-testid="fallback-center-blur">{{ fallbackCenterBlur.toFixed(1) }} px</strong>
            </div>
            <div>
              <span>Mid ×0.5</span><strong data-testid="fallback-mid-blur">{{ fallbackMidBlur.toFixed(1) }} px</strong>
            </div>
            <div>
              <span>Edge ×0.9</span
              ><strong data-testid="fallback-edge-blur">{{ fallbackEdgeBlur.toFixed(1) }} px</strong>
            </div>
            <div><span>Mid mask</span><strong>28 / 22 px</strong></div>
            <div><span>Edge mask</span><strong>13 / 10 px</strong></div>
          </template>
          <template v-else>
            <div>
              <span>Texture</span><strong>{{ textureWidth }} × {{ textureHeight }}</strong>
            </div>
            <div>
              <span>Bezel</span><strong>{{ bezelWidth.toFixed(1) }} px</strong>
            </div>
            <div>
              <span>Displacement</span><strong>{{ displacementScale.toFixed(1) }} px</strong>
            </div>
            <div>
              <span>Max alpha</span><strong>{{ specularMaxAlpha }} / 255</strong>
            </div>
            <div>
              <span>Mean alpha</span><strong>{{ specularMeanAlpha.toFixed(2) }}</strong>
            </div>
            <div>
              <span>Coverage</span><strong>{{ (specularCoverage * 100).toFixed(1) }}%</strong>
            </div>
          </template>
        </section>

        <section class="glass-inspector__sliders">
          <header>
            <div>
              <span class="glass-inspector__eyebrow">Calibration / 参数校准</span>
              <h3>Runtime parameters / 实时参数</h3>
            </div>
            <button
              type="button"
              class="glass-inspector__reset"
              title="恢复默认参数"
              aria-label="恢复默认参数"
              data-testid="inspector-reset-parameters"
              @click="resetParameters"
            >
              <t-icon name="refresh" />
            </button>
          </header>
          <template v-for="group in parameterGroups" :key="group.key">
            <h4 class="glass-inspector__section-title">{{ group.title }}</h4>
            <div class="glass-inspector__slider-grid">
              <label v-for="parameter in group.parameters" :key="parameter.key">
                <span
                  ><strong>{{ parameter.label }}</strong
                  ><output>{{ parameter.value.value }}{{ parameter.unit }}</output></span
                >
                <small>{{ parameter.description }}</small>
                <input
                  v-model.number="parameter.value.value"
                  type="range"
                  :min="parameter.min"
                  :max="parameter.max"
                  :step="parameter.step"
                  :data-testid="`inspector-parameter-${parameter.key}`"
                />
                <span class="glass-inspector__parameter-meta">
                  <em class="glass-inspector__scope-label">{{ group.scope }}</em>
                  <span :data-testid="`inspector-meta-${parameter.key}`">
                    default {{ parameter.default }} · {{ parameter.min }}–{{ parameter.max }}
                  </span>
                </span>
              </label>
            </div>
          </template>
        </section>
      </div>
    </div>

    <svg class="glass-inspector__filter" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        <filter
          id="liquid-glass-inspector-refraction"
          :x="-displacementScale"
          :y="-displacementScale"
          :width="materialWidth + displacementScale * 2"
          :height="materialHeight + displacementScale * 2"
          filterUnits="userSpaceOnUse"
          primitiveUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feGaussianBlur in="SourceGraphic" :stdDeviation="blur" result="blurred-source" />
          <feImage
            v-if="displacementUrl"
            :href="displacementUrl"
            result="displacement-map"
            x="0"
            y="0"
            :width="materialWidth"
            :height="materialHeight"
            preserveAspectRatio="none"
          />
          <feDisplacementMap
            in="blurred-source"
            in2="displacement-map"
            :scale="displacementScale"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  </section>
</template>

<script setup lang="ts">
import { CSSProperties, computed, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue';
import { Icon as TIcon } from 'tdesign-icons-vue-next';
import { DEFAULT_TAB_BAR_GLASS_TUNING, TabBarGlassSurface } from '../liquid-glass-map';
import { TabBarGlassBuildStats, TabBarGlassRuntimeTuning, tabBarGlassDevContextKey } from '../useTabBarGlassFilter';

type InspectionMode = 'refraction' | 'fallback' | 'specular-overlay' | 'specular-map' | 'sheen';
type Background = 'grid' | 'text' | 'image';
type Theme = 'light' | 'dark';

const inspectionModes: Array<{ value: InspectionMode; label: string; name: string; description: string }> = [
  {
    value: 'refraction',
    label: 'Refraction',
    name: '折射层',
    description: '仅显示 blur 和 displacement，排除底色、边框与高光。',
  },
  {
    value: 'fallback',
    label: 'Fallback blur',
    name: '分层模糊',
    description: '使用真实 TabBar CSS，关闭 SVG 增强，检查中心、中环与外环的梯度模糊。',
  },
  {
    value: 'specular-overlay',
    label: 'Specular overlay',
    name: '高光叠加',
    description: '把原始方向性高光直接叠加到真实背景，用于判断最终亮度。',
  },
  {
    value: 'specular-map',
    label: 'Specular map',
    name: '高光贴图',
    description: '在棋盘底板上显示原始白色 RGBA 高光纹理。',
  },
  {
    value: 'sheen',
    label: 'CSS sheen',
    name: 'CSS 内侧高光',
    description: '只显示正上方的 2px CSS 内侧高光，并沿左右上角弧线向下逐渐衰减。',
  },
];
const backgrounds: Array<{ value: Background; label: string; name: string }> = [
  { value: 'grid', label: 'grid', name: '网格' },
  { value: 'text', label: 'text', name: '文字' },
  { value: 'image', label: 'image', name: '图片' },
];
const themes: Array<{ value: Theme; label: string; name: string }> = [
  { value: 'light', label: 'light', name: '浅色' },
  { value: 'dark', label: 'dark', name: '深色' },
];
const surfaces: Array<{ value: TabBarGlassSurface; label: string; name: string }> = [
  { value: 'squircle', label: 'squircle', name: '超椭圆凸面' },
  { value: 'lip', label: 'lip', name: '唇缘复合面' },
];
const imageUrl = 'https://tdesign.gtimg.com/demo/demo-image-1.png';

const inspectionMode = ref<InspectionMode>('specular-overlay');
const background = ref<Background>('grid');
const theme = ref<Theme>('light');
const surface = ref<TabBarGlassSurface>(DEFAULT_TAB_BAR_GLASS_TUNING.surface);
const previewWidth = ref(390);
const backgroundMoves = ref(false);
const backgroundDragging = ref(false);
const backgroundScale = ref(1);
const backgroundOffsetX = ref(0);
const backgroundOffsetY = ref(0);
const selected = ref('home');
const lightAngle = ref(DEFAULT_TAB_BAR_GLASS_TUNING.lightAngle);
const specularOpacity = ref(DEFAULT_TAB_BAR_GLASS_TUNING.specularOpacity);
const specularSaturation = ref(DEFAULT_TAB_BAR_GLASS_TUNING.specularSaturation);
const bezelRatio = ref(DEFAULT_TAB_BAR_GLASS_TUNING.bezelRatio);
const displacementGain = ref(DEFAULT_TAB_BAR_GLASS_TUNING.displacementGain);
const blur = ref(DEFAULT_TAB_BAR_GLASS_TUNING.blur);
const baselineOpacity = ref(0.5);
const fallbackBlur = ref(8);

const materialHeight = 64;
const materialWidth = computed(() => previewWidth.value - 24);
const displacementUrl = ref('');
const specularUrl = ref('');
const textureWidth = ref(0);
const textureHeight = ref(0);
const bezelWidth = ref(0);
const displacementScale = ref(0);
const specularMaxAlpha = ref(0);
const specularMeanAlpha = ref(0);
const specularCoverage = ref(0);

const items = [
  { value: 'home', label: 'Home', icon: 'home' },
  { value: 'discover', label: 'Discover', icon: 'search' },
  { value: 'library', label: 'Library', icon: 'folder' },
  { value: 'profile', label: 'Profile', icon: 'user' },
];
const textLines = [
  'Repeated baselines reveal whether the refraction moves real content.',
  'Direction, coverage and intensity should remain independently observable.',
  'Light angle rotates the specular response around the rounded material.',
  '1234567890 · Geometry · Contrast · Refraction · Highlight · Border',
];

const activeMode = computed(
  () => inspectionModes.find(({ value }) => value === inspectionMode.value) || inspectionModes[0],
);
const activeModeLabel = computed(() => activeMode.value.label);
const activeModeDescription = computed(() => activeMode.value.description);
const fallbackCenterBlur = computed(() => fallbackBlur.value * 0.2);
const fallbackMidBlur = computed(() => fallbackBlur.value * 0.5);
const fallbackEdgeBlur = computed(() => fallbackBlur.value * 0.9);
const backdropClasses = computed(() => [
  `glass-inspector__backdrop--${background.value}`,
  { 'is-moving': backgroundMoves.value },
]);
const stageStyle = computed<CSSProperties>(() => ({
  width: `${previewWidth.value}px`,
  '--inspector-image': `url(${imageUrl})`,
}));
const backgroundStyle = computed<CSSProperties>(() => ({
  '--inspector-background-scale': String(backgroundScale.value),
  '--inspector-background-x': `${backgroundOffsetX.value}px`,
  '--inspector-background-y': `${backgroundOffsetY.value}px`,
}));
const refractionStyle = computed<CSSProperties>(() => ({
  backdropFilter: displacementUrl.value ? 'url("#liquid-glass-inspector-refraction")' : 'blur(8px)',
}));
const demoVariables = computed<CSSProperties>(() => ({
  '--inspector-preview-width': `${previewWidth.value}px`,
  '--td-tab-bar-glass-bg-color': `rgba(255, 255, 255, ${baselineOpacity.value})`,
  '--td-tab-bar-glass-fallback-blur': `${fallbackBlur.value}px`,
}));

/* 左侧展示栏宽度由预览宽度约束；右侧参数区低于最小可用宽度时改为上下堆叠 */
const PANEL_MIN_WIDTH = 420;
const LAYOUT_GAP = 20;
const layoutElement = ref<HTMLElement>();
const stacked = ref(false);

const updateLayoutMode = () => {
  const element = layoutElement.value;
  if (!element) return;
  stacked.value = element.clientWidth - previewWidth.value - LAYOUT_GAP < PANEL_MIN_WIDTH;
};

let layoutObserver: ResizeObserver | undefined;
onMounted(() => {
  updateLayoutMode();
  window.addEventListener('resize', updateLayoutMode);
  if (!layoutElement.value || typeof ResizeObserver === 'undefined') return;
  layoutObserver = new ResizeObserver(updateLayoutMode);
  layoutObserver.observe(layoutElement.value);
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateLayoutMode);
  layoutObserver?.disconnect();
});
watch(previewWidth, updateLayoutMode);

const tuning = computed<TabBarGlassRuntimeTuning>(() => ({
  surface: surface.value,
  bezelRatio: bezelRatio.value,
  displacementGain: displacementGain.value,
  blur: blur.value,
  specularOpacity: specularOpacity.value,
  specularSaturation: specularSaturation.value,
  lightAngle: lightAngle.value,
  textureDpr: 1,
}));

const onRebuild = (stats: TabBarGlassBuildStats) => {
  displacementUrl.value = stats.displacementUrl;
  specularUrl.value = stats.specularUrl;
  textureWidth.value = stats.textureWidth;
  textureHeight.value = stats.textureHeight;
  bezelWidth.value = stats.bezelWidth;
  displacementScale.value = stats.displacementScale;
  specularMaxAlpha.value = stats.specularMaxAlpha;
  specularMeanAlpha.value = stats.specularMeanAlpha;
  specularCoverage.value = stats.specularCoverage;
};

provide(tabBarGlassDevContextKey, {
  tuning,
  onRebuild,
  shouldEnhance: (element) => !element.classList.contains('glass-inspector__fallback-bar'),
});

const previousTheme = typeof document === 'undefined' ? null : document.documentElement.getAttribute('theme-mode');

watch(
  theme,
  (value) => {
    document.documentElement.setAttribute('theme-mode', value);
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  if (previousTheme) document.documentElement.setAttribute('theme-mode', previousTheme);
  else document.documentElement.removeAttribute('theme-mode');
});

const clampBackgroundOffset = (value: number) => Math.min(Math.max(value, -160), 160);
const clampBackgroundScale = (value: number) => Math.min(Math.max(value, 0.6), 2.5);
let backgroundDrag: { pointerId: number; startX: number; startY: number; offsetX: number; offsetY: number } | undefined;

const startBackgroundDrag = (event: PointerEvent) => {
  if (event.target instanceof Element && event.target.closest('.t-tab-bar')) return;
  const target = event.currentTarget as HTMLElement;
  target.setPointerCapture(event.pointerId);
  backgroundDragging.value = true;
  backgroundDrag = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    offsetX: backgroundOffsetX.value,
    offsetY: backgroundOffsetY.value,
  };
};

const moveBackground = (event: PointerEvent) => {
  if (!backgroundDrag || backgroundDrag.pointerId !== event.pointerId) return;
  backgroundOffsetX.value = clampBackgroundOffset(backgroundDrag.offsetX + event.clientX - backgroundDrag.startX);
  backgroundOffsetY.value = clampBackgroundOffset(backgroundDrag.offsetY + event.clientY - backgroundDrag.startY);
};

const stopBackgroundDrag = (event: PointerEvent) => {
  if (!backgroundDrag || backgroundDrag.pointerId !== event.pointerId) return;
  const target = event.currentTarget as HTMLElement;
  if (target.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId);
  backgroundDragging.value = false;
  backgroundDrag = undefined;
};

const zoomBackground = (event: WheelEvent) => {
  const nextScale = backgroundScale.value - event.deltaY * 0.0015;
  backgroundScale.value = Math.round(clampBackgroundScale(nextScale) * 100) / 100;
};

const resetParameters = () => {
  surface.value = DEFAULT_TAB_BAR_GLASS_TUNING.surface;
  backgroundScale.value = 1;
  backgroundOffsetX.value = 0;
  backgroundOffsetY.value = 0;
  lightAngle.value = DEFAULT_TAB_BAR_GLASS_TUNING.lightAngle;
  specularOpacity.value = DEFAULT_TAB_BAR_GLASS_TUNING.specularOpacity;
  specularSaturation.value = DEFAULT_TAB_BAR_GLASS_TUNING.specularSaturation;
  bezelRatio.value = DEFAULT_TAB_BAR_GLASS_TUNING.bezelRatio;
  displacementGain.value = DEFAULT_TAB_BAR_GLASS_TUNING.displacementGain;
  blur.value = DEFAULT_TAB_BAR_GLASS_TUNING.blur;
  baselineOpacity.value = 0.5;
  fallbackBlur.value = 8;
  previewWidth.value = 390;
};

const refractionParameters = [
  {
    key: 'bezel',
    label: 'Bezel ratio / 高光覆盖比例',
    description: '相对圆角半径调整折射和方向性高光覆盖宽度。',
    value: bezelRatio,
    default: DEFAULT_TAB_BAR_GLASS_TUNING.bezelRatio,
    min: 0.1,
    max: 1,
    step: 0.05,
    unit: 'x',
  },
  {
    key: 'gain',
    label: 'Displacement gain / 位移增益',
    description: '仅用于对照折射层，不应改变原始高光贴图。',
    value: displacementGain,
    default: DEFAULT_TAB_BAR_GLASS_TUNING.displacementGain,
    min: 0,
    max: 2,
    step: 0.05,
    unit: 'x',
  },
  {
    key: 'blur',
    label: 'SVG blur / 折射模糊',
    description: '仅用于 Refraction 和 Final，不改变原始高光 Alpha。',
    value: blur,
    default: DEFAULT_TAB_BAR_GLASS_TUNING.blur,
    min: 0,
    max: 4,
    step: 0.1,
    unit: 'px',
  },
];

const specularParameters = [
  {
    key: 'light-angle',
    label: 'Light angle / 光源方向',
    description: '旋转方向性高光；不会改变折射位移。',
    value: lightAngle,
    default: DEFAULT_TAB_BAR_GLASS_TUNING.lightAngle,
    min: 0,
    max: 360,
    step: 5,
    unit: '°',
  },
  {
    key: 'specular-opacity',
    label: 'Specular opacity / 高光透明度',
    description: '只改变最终高光叠加强度；原始 Specular map 保持可见。',
    value: specularOpacity,
    default: DEFAULT_TAB_BAR_GLASS_TUNING.specularOpacity,
    min: 0,
    max: 1,
    step: 0.05,
    unit: '',
  },
  {
    key: 'specular-saturation',
    label: 'Specular saturation / 高光区域饱和度',
    description: '控制最终滤镜中高光遮罩范围内的背景饱和度。',
    value: specularSaturation,
    default: DEFAULT_TAB_BAR_GLASS_TUNING.specularSaturation,
    min: 1,
    max: 6,
    step: 0.25,
    unit: 'x',
  },
];

const materialParameters = [
  {
    key: 'fallback-blur',
    label: 'Fallback blur / 分层模糊基值',
    description: '仅控制 CSS fallback；中心、中环和外环分别使用 ×0.2、×0.5、×0.9。',
    value: fallbackBlur,
    default: 8,
    min: 0,
    max: 12,
    step: 0.1,
    unit: 'px',
  },
  {
    key: 'baseline-opacity',
    label: 'Baseline opacity / 基础材质透明度',
    description: '只影响 Final Glass；检查模式不会加入基础填充。',
    value: baselineOpacity,
    default: 0.5,
    min: 0.2,
    max: 0.9,
    step: 0.01,
    unit: '',
  },
];

const backgroundParameters = [
  {
    key: 'background-scale',
    label: 'Background scale / 背景缩放',
    description: '与滚轮或触控板缩放同步，适用于网格、文本和图片背景。',
    value: backgroundScale,
    default: 1,
    min: 0.6,
    max: 2.5,
    step: 0.05,
    unit: 'x',
  },
  {
    key: 'background-offset-x',
    label: 'Background X / 背景横向位置',
    description: '与预览区域内的横向拖拽同步。',
    value: backgroundOffsetX,
    default: 0,
    min: -160,
    max: 160,
    step: 1,
    unit: 'px',
  },
  {
    key: 'background-offset-y',
    label: 'Background Y / 背景纵向位置',
    description: '与预览区域内的纵向拖拽同步。',
    value: backgroundOffsetY,
    default: 0,
    min: -160,
    max: 160,
    step: 1,
    unit: 'px',
  },
];

const layoutParameters = [
  {
    key: 'preview-width',
    label: 'Preview width / 预览宽度',
    description: '同步改变两个画面并触发一次纹理重建。',
    value: previewWidth,
    default: 390,
    min: 320,
    max: 620,
    step: 10,
    unit: 'px',
  },
];

/* 参数按作用对象分组：折射几何、方向性高光、基础材质、验证背景与 Demo 布局 */
const parameterGroups = [
  {
    key: 'refraction',
    title: 'Refraction calibration / 折射校准',
    scope: '内部调参',
    parameters: refractionParameters,
  },
  {
    key: 'specular',
    title: 'Specular calibration / 高光校准',
    scope: '内部调参',
    parameters: specularParameters,
  },
  {
    key: 'material',
    title: 'Material calibration / 材质校准',
    scope: '材质外观',
    parameters: materialParameters,
  },
  {
    key: 'background',
    title: 'Background calibration / 背景变换',
    scope: 'Demo 验证背景',
    parameters: backgroundParameters,
  },
  {
    key: 'layout',
    title: 'Layout calibration / 尺寸校准',
    scope: 'Demo 布局',
    parameters: layoutParameters,
  },
];
</script>

<style scoped lang="less">
.glass-inspector {
  /* 站点顶栏高度，用于限制悬浮展示栏的可视高度 */
  --inspector-stage-max-height: calc(100vh - 50px);

  min-height: 100vh;
  padding: 20px;
  color: #1f2329;
  background: #f3f5f7;
  letter-spacing: 0;
  box-sizing: border-box;
}

.glass-inspector--dark {
  color: rgba(255, 255, 255, 90%);
  background: #111315;
}

.glass-inspector__layout {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

/* 左侧展示栏：宽度以预览宽度为约束，滚动时保持悬浮 */
.glass-inspector__stage-column {
  position: sticky;
  top: 0;
  z-index: 2;
  flex: 0 0 var(--inspector-preview-width);
  width: var(--inspector-preview-width);
  align-self: flex-start;
  max-width: 100%;
  max-height: var(--inspector-stage-max-height);
  overflow: hidden auto;
  overscroll-behavior: contain;
}

.glass-inspector__panel {
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
}

.glass-inspector__header,
.glass-inspector__controls,
.glass-inspector__metrics,
.glass-inspector__sliders {
  padding: 16px;
  background: var(--td-bg-color-container, #fff);
  border: 1px solid var(--td-component-border, #dcdfe6);
  border-radius: 8px;
}

.glass-inspector__header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px 24px;
}

.glass-inspector__header h2 {
  margin: 2px 0 6px;
  font-size: 18px;
}

.glass-inspector__header p {
  max-width: 760px;
  margin: 0;
  color: var(--td-text-color-secondary, #667085);
  font-size: 12px;
  line-height: 1.5;
}

.glass-inspector__header a {
  flex: none;
  color: var(--td-brand-color, #0052d9);
  font-size: 12px;
  text-decoration: none;
}

.glass-inspector__eyebrow {
  color: var(--td-brand-color, #0052d9);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
}

.glass-inspector__controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 14px;
}

.glass-inspector__control {
  display: flex;
  flex-direction: column;
  gap: 7px;
  font-size: 12px;
  font-weight: 600;
}

.glass-inspector__control--wide {
  grid-column: 1 / -1;
}

.glass-inspector__control small,
.glass-inspector__toggle small,
.glass-inspector__stage-hint,
.glass-inspector__sliders small {
  color: var(--td-text-color-secondary, #667085);
  font-size: 10px;
  font-weight: 400;
  line-height: 1.45;
}

.glass-inspector__segments {
  display: flex;
  min-height: 32px;
  overflow: hidden;
  border: 1px solid var(--td-component-border, #cfd3dc);
  border-radius: 6px;
}

/* 每个选项上下两行：英文取值在上，中文释义在下 */
.glass-inspector__segments button {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1px;
  min-width: 0;
  padding: 5px 6px;
  color: inherit;
  font-size: 12px;
  line-height: 1.25;
  background: transparent;
  border: 0;
  border-right: 1px solid var(--td-component-border, #cfd3dc);
  cursor: pointer;
}

.glass-inspector__segment-name {
  font-size: 10px;
  font-weight: 400;
  opacity: 72%;
}

.glass-inspector__segments button:last-child {
  border-right: 0;
}

.glass-inspector__segments button.is-active {
  color: #fff;
  background: var(--td-brand-color, #0052d9);
}

.glass-inspector__segments--modes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(112px, 1fr));
  gap: 6px;
  overflow: visible;
  border: 0;
}

.glass-inspector__segments--modes button,
.glass-inspector__segments--modes button:last-child {
  min-height: 42px;
  border: 1px solid var(--td-component-border, #cfd3dc);
  border-radius: 6px;
}

.glass-inspector__toggle {
  display: flex;
  align-items: flex-start;
  gap: 7px;
  font-size: 12px;
}

.glass-inspector__toggle input {
  width: 16px;
  height: 16px;
  margin: 1px 0 0;
  accent-color: var(--td-brand-color, #0052d9);
}

.glass-inspector__toggle span {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2px;
  font-weight: 600;
}

/* 两个对照画面在左栏内上下排列，宽度共享同一个预览宽度 */
.glass-inspector__comparison {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 4px;
}

.glass-inspector__comparison article {
  flex: 0 0 auto;
  min-width: 0;
}

.glass-inspector__comparison article > header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 12px;
}

.glass-inspector__comparison article > header span {
  color: var(--td-text-color-secondary, #667085);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}

/* 展示区底部的拖拽提示，中英文分行 */
.glass-inspector__stage-hint {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 10px 0 0;
  font-size: 11px;
  line-height: 1.5;
}

.glass-inspector__stage-hint > span {
  display: flex;
  flex-direction: column;
}

.glass-inspector__stage-hint :deep(.t-icon) {
  flex: 0 0 auto;
  font-size: 14px;
}

.glass-inspector__stage {
  position: relative;
  max-width: 100%;
  height: 150px;
  margin: 0 auto;
  overflow: hidden;
  background: #eef1f5;
  border: 1px solid var(--td-component-border, #cfd3dc);
  border-radius: 8px;
  cursor: grab;
  touch-action: none;
  box-sizing: border-box;
}

.glass-inspector__stage.is-dragging {
  cursor: grabbing;
}

.glass-inspector__backdrop {
  position: absolute;
  inset: -80px;
  pointer-events: none;
  transform: translate3d(var(--inspector-background-x), var(--inspector-background-y), 0)
    scale(var(--inspector-background-scale));
  transform-origin: center;
  transition: transform 120ms ease-out;
  will-change: transform;
}

.glass-inspector__backdrop.is-moving {
  animation: inspector-background-move 3s linear infinite alternate;
  transition: none;
}

.glass-inspector__backdrop--grid {
  background-color: #e7ebf5;
  background-image:
    linear-gradient(rgba(20, 24, 32, 64%) 2px, transparent 2px),
    linear-gradient(90deg, rgba(20, 24, 32, 64%) 2px, transparent 2px),
    linear-gradient(135deg, rgba(168, 190, 255, 45%), rgba(255, 196, 206, 45%));
  background-size:
    22px 22px,
    22px 22px,
    100% 100%;
}

.glass-inspector__backdrop--text {
  padding: 96px;
  background: linear-gradient(135deg, #e9efff, #ffe8ed);
  box-sizing: border-box;
}

.glass-inspector__backdrop--image {
  background: var(--inspector-image) center / cover;
}

.glass-inspector__text-plane {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 520px;
  color: rgba(17, 24, 39, 78%);
  font-size: 15px;
  line-height: 1.45;
}

.glass-inspector__bar-slot {
  position: absolute;
  right: 12px;
  bottom: 12px;
  left: 12px;
  height: 64px;
}

.glass-inspector__bar-slot :deep(.t-tab-bar) {
  width: 100%;
  height: 64px;
  margin: 0;
}

.glass-inspector__material,
.glass-inspector__refraction,
.glass-inspector__specular-overlay,
.glass-inspector__map-board,
.glass-inspector__sheen {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 32px;
  box-sizing: border-box;
}

.glass-inspector__specular-overlay {
  width: 100%;
  height: 100%;
  object-fit: fill;
  mix-blend-mode: screen;
}

.glass-inspector__map-board {
  display: grid;
  place-items: center;
  color: rgba(255, 255, 255, 72%);
  background-color: #111;
  background-image:
    linear-gradient(45deg, #282828 25%, transparent 25%), linear-gradient(-45deg, #282828 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #282828 75%), linear-gradient(-45deg, transparent 75%, #282828 75%);
  background-position:
    0 0,
    0 8px,
    8px -8px,
    -8px 0;
  background-size: 16px 16px;
}

.glass-inspector__map-board img {
  width: 100%;
  height: 100%;
}

.glass-inspector__sheen {
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 2px;
    border-radius: inherit;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 92%) 0%,
      rgba(255, 255, 255, 72%) 24%,
      rgba(255, 255, 255, 26%) 48%,
      transparent 68%
    );
    mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    mask-composite: exclude;
  }
}

.glass-inspector__items {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  height: 100%;
  pointer-events: none;
}

.glass-inspector__items span {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  color: rgba(17, 24, 39, 82%);
}

.glass-inspector__items small {
  font-size: 10px;
}

.glass-inspector__metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(90px, 1fr));
  gap: 10px;
}

.glass-inspector__metrics div {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px;
  background: var(--td-bg-color-secondarycontainer, #f3f5f7);
  border-radius: 6px;
}

.glass-inspector__metrics span {
  color: var(--td-text-color-secondary, #667085);
  font-size: 11px;
}

.glass-inspector__metrics strong {
  font:
    600 13px/1.2 ui-monospace,
    SFMono-Regular,
    Menlo,
    monospace;
}

.glass-inspector__sliders > header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
}

.glass-inspector__sliders h3 {
  margin: 2px 0 0;
  font-size: 18px;
}

.glass-inspector__reset {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  padding: 0;
  color: var(--td-text-color-primary, #1f2329);
  background: transparent;
  border: 1px solid var(--td-component-border, #cfd3dc);
  border-radius: 6px;
  cursor: pointer;
}

/* 分组之间留出更明显的间距 */
.glass-inspector__section-title {
  margin: 34px 0 12px;
  color: var(--td-text-color-primary, #1f2329);
  font-size: 12px;
}

.glass-inspector__section-title:first-of-type {
  margin-top: 20px;
}

.glass-inspector__slider-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 14px 24px;
}

.glass-inspector__slider-grid label {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.glass-inspector__slider-grid label > span:first-child {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  font-size: 12px;
  font-weight: 600;
}

.glass-inspector__slider-grid label small {
  min-height: 30px;
}

.glass-inspector__slider-grid input[type='range'] {
  width: 100%;
  accent-color: var(--td-brand-color, #0052d9);
}

.glass-inspector__sliders output {
  flex: 0 0 auto;
  color: var(--td-brand-color, #0052d9);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.glass-inspector__parameter-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 8px;
  color: var(--td-text-color-placeholder, #8b95a5);
  font-size: 10px;
}

.glass-inspector__scope-label {
  padding: 1px 6px;
  color: var(--td-text-color-secondary, #667085);
  font-style: normal;
  white-space: nowrap;
  background: var(--td-bg-color-secondarycontainer, #f3f5f7);
  border-radius: 999px;
}

.glass-inspector__filter {
  position: absolute;
}

@keyframes inspector-background-move {
  from {
    transform: translate3d(calc(var(--inspector-background-x) - 36px), var(--inspector-background-y), 0)
      scale(var(--inspector-background-scale));
  }
  to {
    transform: translate3d(calc(var(--inspector-background-x) + 36px), var(--inspector-background-y), 0)
      scale(var(--inspector-background-scale));
  }
}

/* 右侧参数区放不下时退回上下堆叠，展示栏不再悬浮 */
.glass-inspector__layout.is-stacked {
  flex-direction: column;
}

.glass-inspector__layout.is-stacked .glass-inspector__stage-column {
  position: static;
  flex: 0 0 auto;
  align-self: stretch;
  max-height: none;
  overflow: visible;
}

.glass-inspector__layout.is-stacked .glass-inspector__comparison {
  flex-direction: row;
  overflow-x: auto;
  padding-bottom: 8px;
}

@media (max-width: 560px) {
  .glass-inspector {
    padding: 12px;
  }

  .glass-inspector__controls,
  .glass-inspector__slider-grid {
    grid-template-columns: 1fr;
  }

  .glass-inspector__header {
    flex-direction: column;
  }

  .glass-inspector__metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>

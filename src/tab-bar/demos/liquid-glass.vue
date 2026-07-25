<template>
  <section class="glass-demo" :class="`glass-demo--${theme}`" :style="demoVariables">
    <header class="glass-demo__toolbar">
      <div class="glass-demo__modes">
        <div class="glass-demo__control-group">
          <span class="glass-demo__control-copy">
            <strong>Effect / 材质效果</strong>
            <small>切换普通模式与 Liquid Glass 增强模式，影响整个 TabBar 材质渲染路径。</small>
          </span>
          <div class="glass-demo__segments" role="group" aria-label="Effect">
            <button
              v-for="option in effects"
              :key="option"
              type="button"
              :class="{ 'is-active': effect === option }"
              :aria-pressed="effect === option"
              :data-testid="`effect-${option}`"
              @click="effect = option"
            >
              {{ option }}
            </button>
          </div>
        </div>
        <div class="glass-demo__control-group">
          <span class="glass-demo__control-copy">
            <strong>Shape / 外形</strong>
            <small>切换普通矩形与圆角胶囊；会改变圆角、边距和折射几何范围。</small>
          </span>
          <div class="glass-demo__segments" role="group" aria-label="Shape">
            <button
              v-for="option in shapes"
              :key="option"
              type="button"
              :class="{ 'is-active': shape === option }"
              :aria-pressed="shape === option"
              :data-testid="`shape-${option}`"
              @click="shape = option"
            >
              {{ option }}
            </button>
          </div>
        </div>
        <div class="glass-demo__control-group">
          <span class="glass-demo__control-copy">
            <strong>Background / 验证背景</strong>
            <small>切换网格、文字和图片，用于观察折射连续性、清晰度与背景相关性。</small>
          </span>
          <div class="glass-demo__segments" role="group" aria-label="Background">
            <button
              v-for="option in backgrounds"
              :key="option"
              type="button"
              :class="{ 'is-active': background === option }"
              :aria-pressed="background === option"
              :data-testid="`background-${option}`"
              @click="background = option"
            >
              {{ option }}
            </button>
          </div>
        </div>
        <div class="glass-demo__control-group">
          <span class="glass-demo__control-copy">
            <strong>Width / 预览宽度</strong>
            <small>改变预览容器宽度，用于验证响应式尺寸、纹理重建和边缘覆盖。</small>
          </span>
          <div class="glass-demo__segments" role="group" aria-label="Preview width">
            <button
              v-for="option in widths"
              :key="option"
              type="button"
              :class="{ 'is-active': previewWidth === option }"
              :aria-pressed="previewWidth === option"
              :data-testid="`width-${option}`"
              @click="previewWidth = option"
            >
              {{ option }}
            </button>
          </div>
        </div>
        <div class="glass-demo__control-group">
          <span class="glass-demo__control-copy">
            <strong>Theme / 主题</strong>
            <small>切换明暗主题，影响材质底色、边框对比度和文字可读性。</small>
          </span>
          <div class="glass-demo__segments" role="group" aria-label="Theme">
            <button
              v-for="option in themes"
              :key="option"
              type="button"
              :class="{ 'is-active': theme === option }"
              :aria-pressed="theme === option"
              :data-testid="`theme-${option}`"
              @click="theme = option"
            >
              {{ option }}
            </button>
          </div>
        </div>
      </div>

      <div class="glass-demo__toggles">
        <label v-for="toggle in stateToggles" :key="toggle.key">
          <input v-model="toggle.value.value" :data-testid="`toggle-${toggle.key}`" type="checkbox" />
          <span class="glass-demo__toggle-copy">
            <strong>{{ toggle.label }} / {{ toggle.name }}</strong>
            <small>{{ toggle.description }}</small>
          </span>
        </label>
      </div>
    </header>

    <div class="glass-demo__comparison" data-testid="comparison">
      <article v-for="mode in comparisonModes" :key="mode" class="glass-demo__preview">
        <div class="glass-demo__preview-title">
          <strong>{{ comparisonLabels[mode] }}</strong>
          <span>{{ previewWidth }} px</span>
        </div>
        <div
          class="glass-demo__device"
          :class="[`glass-demo__device--${background}`, { 'is-moving': backgroundMoves }]"
          :style="{ width: `${previewWidth}px`, '--demo-image': `url(${landscapeUrl})` }"
          :data-testid="`preview-${mode}`"
        >
          <div v-if="background === 'text'" class="glass-demo__backdrop-copy" aria-hidden="true">
            <strong>Design systems should preserve context.</strong>
            <span>Navigation remains readable above moving content.</span>
            <span>Edges, letterforms and spacing expose optical displacement.</span>
            <span>12:48 · Cupertino · 21 C</span>
          </div>
          <div v-else class="glass-demo__landmarks" aria-hidden="true">
            <span v-for="index in 6" :key="index">{{ index }}</span>
          </div>

          <div class="glass-demo__bar-frame">
            <t-tab-bar
              v-model="selected"
              :class="{ 'glass-demo__fallback-bar': mode === 'fallback' }"
              :effect="mode === 'normal' ? 'normal' : mode === 'fallback' ? 'glass' : effect"
              :shape="shape"
              :fixed="fixed"
              :placeholder="placeholder"
              :safe-area-inset-bottom="safeArea"
              :bordered="bordered"
            >
              <t-tab-bar-item v-for="item in items" :key="item.value" :value="item.value">
                {{ item.label }}
                <template #icon><t-icon :name="item.icon" /></template>
              </t-tab-bar-item>
            </t-tab-bar>
            <t-tab-bar
              v-if="multiple && mode === 'glass'"
              v-model="secondarySelected"
              class="glass-demo__secondary-bar"
              effect="glass"
              :shape="shape"
              :fixed="false"
              :safe-area-inset-bottom="false"
              :bordered="bordered"
            >
              <t-tab-bar-item v-for="item in secondaryItems" :key="item.value" :value="item.value">
                {{ item.label }}
                <template #icon><t-icon :name="item.icon" /></template>
              </t-tab-bar-item>
            </t-tab-bar>
          </div>
        </div>
      </article>
    </div>

    <section class="glass-demo__calibration">
      <header>
        <div>
          <span class="glass-demo__eyebrow">Optical calibration / 光学校准</span>
          <h3>Runtime parameters / 实时参数</h3>
        </div>
        <button
          type="button"
          class="glass-demo__reset"
          title="恢复默认参数"
          aria-label="恢复默认参数"
          data-testid="reset-parameters"
          @click="resetParameters"
        >
          <t-icon name="refresh" />
        </button>
      </header>

      <div class="glass-demo__metrics" aria-live="polite">
        <div>
          <span>Texture / 纹理尺寸</span><strong data-testid="metric-texture">{{ textureLabel }}</strong>
        </div>
        <div>
          <span>Pixels / 像素数</span><strong data-testid="metric-pixels">{{ texturePixels }}</strong>
        </div>
        <div>
          <span>Bezel / 实际覆盖</span><strong data-testid="metric-bezel">{{ bezelWidth.toFixed(1) }} px</strong>
        </div>
        <div>
          <span>Generate / 生成耗时</span
          ><strong data-testid="metric-generation">{{ generationDuration.toFixed(2) }} ms</strong>
        </div>
        <div>
          <span>Total / 总耗时</span><strong data-testid="metric-total">{{ totalDuration.toFixed(2) }} ms</strong>
        </div>
        <div>
          <span>Rebuilds / 重建次数</span><strong data-testid="metric-rebuilds">{{ rebuildCount }}</strong>
        </div>
      </div>

      <h4 class="glass-demo__section-title">Layout calibration / 尺寸校准</h4>
      <div class="glass-demo__sliders">
        <label v-for="parameter in layoutParameters" :key="parameter.key">
          <span class="glass-demo__parameter-title">
            <span>{{ parameter.label }} / {{ parameter.name }} <small>Demo 布局</small></span>
            <output>{{ parameter.value.value }}{{ parameter.unit }}</output>
          </span>
          <span class="glass-demo__parameter-description">{{ parameter.description }}</span>
          <input
            v-model.number="parameter.value.value"
            type="range"
            :min="parameter.min"
            :max="parameter.max"
            :step="parameter.step"
            :data-testid="`parameter-${parameter.key}`"
          />
          <span class="glass-demo__parameter-meta"
            >default {{ parameter.default }} · {{ parameter.min }}–{{ parameter.max }}</span
          >
        </label>
      </div>

      <h4 class="glass-demo__section-title">Selection calibration / 选中态校准</h4>
      <div class="glass-demo__sliders">
        <label v-for="parameter in selectionParameters" :key="parameter.key">
          <span class="glass-demo__parameter-title">
            <span>{{ parameter.label }} / {{ parameter.name }} <small>组件主题参数</small></span>
            <output>{{ parameter.value.value }}{{ parameter.unit }}</output>
          </span>
          <span class="glass-demo__parameter-description">{{ parameter.description }}</span>
          <input
            v-model.number="parameter.value.value"
            type="range"
            :min="parameter.min"
            :max="parameter.max"
            :step="parameter.step"
            :data-testid="`parameter-${parameter.key}`"
          />
          <span class="glass-demo__parameter-meta"
            >default {{ parameter.default }} · {{ parameter.min }}–{{ parameter.max }}</span
          >
        </label>
      </div>

      <h4 class="glass-demo__section-title">Optical calibration / 光学校准</h4>
      <div class="glass-demo__sliders">
        <label v-for="parameter in opticalParameters" :key="parameter.key">
          <span class="glass-demo__parameter-title">
            <span
              >{{ parameter.label }} / {{ parameter.name }} <small>{{ scopeLabels[parameter.scope] }}</small></span
            >
            <output>{{ formatParameter(parameter) }}</output>
          </span>
          <span class="glass-demo__parameter-description">{{ parameter.description }}</span>
          <input
            v-model.number="parameter.value.value"
            type="range"
            :min="parameter.min"
            :max="parameter.max"
            :step="parameter.step"
            :data-testid="`parameter-${parameter.key}`"
          />
          <span class="glass-demo__parameter-meta"
            >default {{ parameter.default }} · {{ parameter.min }}–{{ parameter.max }}</span
          >
        </label>
      </div>

      <div class="glass-demo__material-controls">
        <label>
          <span>Surface profile / 表面轮廓 <small>内部调参</small></span>
          <small class="glass-demo__control-description"
            >选择折射截面的曲线形态；会改变边缘弯曲走势，不改变组件尺寸。</small
          >
          <select v-model="surface" data-testid="optics-surface">
            <option v-for="option in surfaceOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </label>
        <label>
          <span>Background color / 材质底色 <small>材质外观</small></span>
          <small class="glass-demo__control-description">设置玻璃基线填充色；影响整体色调，不改变折射几何。</small>
          <input v-model="backgroundColor" data-testid="material-background-color" type="color" />
        </label>
        <label>
          <span>Border color / 边框颜色 <small>材质外观</small></span>
          <small class="glass-demo__control-description">设置材质外轮廓颜色；影响边缘辨识度，不改变位移。</small>
          <input v-model="borderColor" data-testid="material-border-color" type="color" />
        </label>
        <label>
          <span>Shadow / 阴影预设 <small>材质外观</small></span>
          <small class="glass-demo__control-description">切换悬浮、紧凑或无阴影；只影响层级感和外部投影。</small>
          <select v-model="shadowPreset" data-testid="material-shadow">
            <option v-for="option in shadowOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </label>
      </div>
    </section>

    <section class="glass-demo__presets">
      <span class="glass-demo__eyebrow">Fixed presets</span>
      <div>
        <article v-for="preset in fixedPresets" :key="preset.name">
          <strong>{{ preset.name }}</strong>
          <p>{{ preset.reason }}</p>
        </article>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { CSSProperties, computed, onBeforeUnmount, provide, ref, watch } from 'vue';
import { Icon as TIcon } from 'tdesign-icons-vue-next';
import { DEFAULT_TAB_BAR_GLASS_TUNING } from '../liquid-glass-map';
import { TabBarGlassBuildStats, TabBarGlassRuntimeTuning, tabBarGlassDevContextKey } from '../useTabBarGlassFilter';

type Effect = 'normal' | 'glass';
type Shape = 'normal' | 'round';
type Background = 'grid' | 'text' | 'image';
type Theme = 'light' | 'dark';

const effects: Effect[] = ['normal', 'glass'];
const shapes: Shape[] = ['normal', 'round'];
const backgrounds: Background[] = ['grid', 'text', 'image'];
const themes: Theme[] = ['light', 'dark'];
const widths = [320, 390, 430, 620];
const comparisonModes = ['normal', 'fallback', 'glass'] as const;
const comparisonLabels = {
  normal: 'Normal regression baseline',
  fallback: 'CSS fallback',
  glass: 'Liquid Glass enhancement',
} as const;
const landscapeUrl = 'https://tdesign.gtimg.com/demo/demo-image-1.png';
const effect = ref<Effect>('glass');
const shape = ref<Shape>('round');
const background = ref<Background>('grid');
const theme = ref<Theme>('light');
const previewWidth = ref(390);
const tabBarHeight = ref(64);
const fixed = ref(false);
const placeholder = ref(false);
const safeArea = ref(false);
const bordered = ref(true);
const multiple = ref(false);
const backgroundMoves = ref(false);
const selected = ref('home');
const secondarySelected = ref('listen');

const surface = ref(DEFAULT_TAB_BAR_GLASS_TUNING.surface);
const thicknessRatio = ref(DEFAULT_TAB_BAR_GLASS_TUNING.thicknessRatio);
const bezelRatio = ref(DEFAULT_TAB_BAR_GLASS_TUNING.bezelRatio);
const refractiveIndex = ref(DEFAULT_TAB_BAR_GLASS_TUNING.refractiveIndex);
const displacementGain = ref(DEFAULT_TAB_BAR_GLASS_TUNING.displacementGain);
const specularOpacity = ref(DEFAULT_TAB_BAR_GLASS_TUNING.specularOpacity);
const specularSaturation = ref(DEFAULT_TAB_BAR_GLASS_TUNING.specularSaturation);
const lightAngle = ref(DEFAULT_TAB_BAR_GLASS_TUNING.lightAngle);
const textureDpr = ref(1);
const backgroundAlpha = ref(0.42);
const borderAlpha = ref(0.62);
const blur = ref(DEFAULT_TAB_BAR_GLASS_TUNING.blur);
const backgroundColor = ref('#ffffff');
const borderColor = ref('#ffffff');
const shadowPreset = ref<'floating' | 'compact' | 'none'>('floating');
const selectedBackgroundHue = ref(216);
const selectedBackgroundOpacity = ref(0.16);

const textureWidth = ref(0);
const textureHeight = ref(0);
const bezelWidth = ref(0);
const generationDuration = ref(0);
const totalDuration = ref(0);
const rebuildCount = ref(0);
const textureLabel = computed(() => `${textureWidth.value} x ${textureHeight.value}`);
const texturePixels = computed(() => textureWidth.value * textureHeight.value);

const items = [
  { value: 'home', label: 'Home', icon: 'home' },
  { value: 'discover', label: 'Discover', icon: 'search' },
  { value: 'library', label: 'Library', icon: 'folder' },
  { value: 'profile', label: 'Profile', icon: 'user' },
];
const secondaryItems = [
  { value: 'listen', label: 'Listen', icon: 'play-circle' },
  { value: 'saved', label: 'Saved', icon: 'bookmark' },
  { value: 'recent', label: 'Recent', icon: 'time' },
];

const stateToggles = [
  {
    key: 'fixed',
    label: 'Fixed',
    name: '固定定位',
    description: '模拟吸附在视口底部的 TabBar 定位方式。',
    value: fixed,
  },
  {
    key: 'placeholder',
    label: 'Placeholder',
    name: '占位空间',
    description: '固定定位时保留等高占位，避免页面内容被 TabBar 遮挡。',
    value: placeholder,
  },
  {
    key: 'safe',
    label: 'Safe area',
    name: '安全区',
    description: '增加底部安全区间距，模拟全面屏设备。',
    value: safeArea,
  },
  {
    key: 'bordered',
    label: 'Bordered',
    name: '顶部边框',
    description: '切换组件原有的分隔边框样式。',
    value: bordered,
  },
  {
    key: 'multiple',
    label: 'Multi-instance',
    name: '多实例',
    description: '同时渲染两个玻璃 TabBar，用于检查 filter ID 与纹理是否串用。',
    value: multiple,
  },
  {
    key: 'motion',
    label: 'Move background',
    name: '移动背景',
    description: '持续移动验证背景，检查折射是否跟随真实背景内容变化。',
    value: backgroundMoves,
  },
];

const surfaceOptions = [
  { label: 'Squircle / 超椭圆凸面', value: 'squircle' },
  { label: 'Lip / 唇缘复合面', value: 'lip' },
] as const;

const layoutParameters = [
  {
    key: 'tab-bar-width',
    label: 'TabBar width',
    name: 'TabBar 宽度',
    description: '连续调整预览与组件可用宽度；round 外形会再扣除左右 margin，并触发纹理重新生成。',
    value: previewWidth,
    default: 390,
    min: 280,
    max: 620,
    step: 10,
    unit: 'px',
  },
  {
    key: 'tab-bar-height',
    label: 'TabBar height',
    name: 'TabBar 高度',
    description: '调整材质、圆角和内部项目高度；同时改变 radius、实际 bezel 像素与纹理尺寸。',
    value: tabBarHeight,
    default: 64,
    min: 52,
    max: 88,
    step: 2,
    unit: 'px',
  },
];

const selectionParameters = [
  {
    key: 'selected-background-hue',
    label: 'Selected background hue',
    name: '选中态色相',
    description: '调整选中态胶囊的基础色相；normal 与 glass 使用同一颜色参数。',
    value: selectedBackgroundHue,
    default: 216,
    min: 0,
    max: 360,
    step: 1,
    unit: 'deg',
  },
  {
    key: 'selected-background-opacity',
    label: 'Selected background opacity',
    name: '选中态透明度',
    description: '调整选中态胶囊颜色的混合比例；0 为完全透明，1 为完全不透明。',
    value: selectedBackgroundOpacity,
    default: 0.16,
    min: 0,
    max: 1,
    step: 0.01,
    unit: '',
  },
];

const opticalParameters = [
  {
    key: 'thickness',
    label: 'Glass thickness',
    name: '玻璃厚度',
    description: '控制光学截面的等效厚度；主要改变折射曲线幅度，不改变折射覆盖范围。',
    value: thicknessRatio,
    default: DEFAULT_TAB_BAR_GLASS_TUNING.thicknessRatio,
    min: 0,
    max: 2,
    step: 0.05,
    unit: 'x',
    scope: 'internal',
  },
  {
    key: 'bezel',
    label: 'Bezel ratio',
    name: '边缘折射覆盖比例',
    description: '相对于圆角半径的覆盖比例；改变折射从边缘向中心延伸的范围，右侧同步显示实际 px。',
    value: bezelRatio,
    default: DEFAULT_TAB_BAR_GLASS_TUNING.bezelRatio,
    min: 0.1,
    max: 1,
    step: 0.05,
    unit: 'x',
    scope: 'internal',
  },
  {
    key: 'ior',
    label: 'Refractive index',
    name: '折射率',
    description: '控制空气与玻璃之间的折射率差；数值越高，背景光线的弯折通常越明显。',
    value: refractiveIndex,
    default: DEFAULT_TAB_BAR_GLASS_TUNING.refractiveIndex,
    min: 1,
    max: 2.5,
    step: 0.05,
    unit: '',
    scope: 'internal',
  },
  {
    key: 'gain',
    label: 'Displacement gain',
    name: '位移增益',
    description: '缩放最终 SVG 位移强度；整体放大或减弱背景扭曲，不改变折射带宽度。',
    value: displacementGain,
    default: DEFAULT_TAB_BAR_GLASS_TUNING.displacementGain,
    min: 0,
    max: 2,
    step: 0.05,
    unit: 'x',
    scope: 'internal',
  },
  {
    key: 'blur',
    label: 'SVG blur',
    name: 'SVG 模糊',
    description: '在执行位移前模糊背景采样；影响玻璃内部清晰度，不改变几何弯曲方向。',
    value: blur,
    default: DEFAULT_TAB_BAR_GLASS_TUNING.blur,
    min: 0,
    max: 4,
    step: 0.1,
    unit: 'px',
    scope: 'internal',
  },
  {
    key: 'specular-opacity',
    label: 'Specular opacity',
    name: '高光透明度',
    description: '控制边缘镜面高光层的可见程度；只影响高光明暗，不改变背景折射。',
    value: specularOpacity,
    default: DEFAULT_TAB_BAR_GLASS_TUNING.specularOpacity,
    min: 0,
    max: 1,
    step: 0.05,
    unit: '',
    scope: 'internal',
  },
  {
    key: 'specular-saturation',
    label: 'Specular saturation',
    name: '高光饱和度',
    description: '控制高光区域内折射背景的色彩浓度；影响色彩表现，不改变位移范围。',
    value: specularSaturation,
    default: DEFAULT_TAB_BAR_GLASS_TUNING.specularSaturation,
    min: 1,
    max: 6,
    step: 0.25,
    unit: 'x',
    scope: 'internal',
  },
  {
    key: 'light-angle',
    label: 'Light angle',
    name: '光源角度',
    description: '改变镜面高光出现的方向；影响材质受光位置，不改变折射曲线。',
    value: lightAngle,
    default: DEFAULT_TAB_BAR_GLASS_TUNING.lightAngle,
    min: 0,
    max: 360,
    step: 5,
    unit: 'deg',
    scope: 'internal',
  },
  {
    key: 'background-alpha',
    label: 'Baseline opacity',
    name: '基线不透明度',
    description: '控制玻璃底色的遮盖程度；越高越易读，但背景与折射会越不明显。',
    value: backgroundAlpha,
    default: 0.42,
    min: 0.35,
    max: 0.95,
    step: 0.01,
    unit: '',
    scope: 'public',
  },
  {
    key: 'border-alpha',
    label: 'Border opacity',
    name: '边框不透明度',
    description: '控制材质外轮廓的透明度；影响边缘识别和对比度，不改变折射。',
    value: borderAlpha,
    default: 0.62,
    min: 0,
    max: 1,
    step: 0.01,
    unit: '',
    scope: 'public',
  },
  {
    key: 'texture-dpr',
    label: 'Texture DPR',
    name: '纹理像素倍率',
    description: '控制位移与高光纹理的采样分辨率；越高边缘越细腻，但生成耗时和内存占用更高。',
    value: textureDpr,
    default: 1,
    min: 1,
    max: 2,
    step: 0.25,
    unit: 'x',
    scope: 'internal',
  },
];

const scopeLabels = {
  internal: '内部调参',
  public: '材质外观',
} as const;

const shadowOptions = [
  { label: 'Floating / 悬浮', value: 'floating' },
  { label: 'Compact / 紧凑', value: 'compact' },
  { label: 'None / 无阴影', value: 'none' },
];
const shadowValues = {
  floating: '0 8px 30px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
  compact: '0 4px 12px rgba(0, 0, 0, 0.14)',
  none: 'none',
};

const fixedPresets = [
  {
    name: 'Surface profile',
    reason: 'The profile function and Snell calculation are selected as a single physical model.',
  },
  {
    name: 'Bezel ratio',
    reason: 'The ratio is measured against the corner radius, or half of the short side when the radius is zero.',
  },
  {
    name: 'RGBA displacement encoding',
    reason: 'R/G displacement and alpha clipping remain an internal filter contract.',
  },
  {
    name: 'SVG filter graph',
    reason: 'Blur, displacement, saturation, masked specular and blend order are validated together.',
  },
  {
    name: '512K adaptive budget',
    reason: 'Sampling dimensions are resolved together to preserve aspect ratio and memory limits.',
  },
  {
    name: 'CSS fallback ladder',
    reason: 'Capability failure must retain the same readable baseline and interaction surface.',
  },
];

const toRgba = (hex: string, alpha: number) => {
  const value = Number.parseInt(hex.slice(1), 16);
  return `rgba(${value >> 16}, ${(value >> 8) & 255}, ${value & 255}, ${alpha})`;
};

const tuning = computed<TabBarGlassRuntimeTuning>(() => ({
  surface: surface.value,
  thicknessRatio: thicknessRatio.value,
  bezelRatio: bezelRatio.value,
  refractiveIndex: refractiveIndex.value,
  displacementGain: displacementGain.value,
  blur: blur.value,
  specularOpacity: specularOpacity.value,
  specularSaturation: specularSaturation.value,
  lightAngle: lightAngle.value,
  textureDpr: textureDpr.value,
}));

const onRebuild = (stats: TabBarGlassBuildStats) => {
  textureWidth.value = stats.textureWidth;
  textureHeight.value = stats.textureHeight;
  bezelWidth.value = stats.bezelWidth;
  generationDuration.value = stats.generationDuration;
  totalDuration.value = stats.totalDuration;
  rebuildCount.value += 1;
};

provide(tabBarGlassDevContextKey, {
  tuning,
  onRebuild,
  shouldEnhance: (element) => !element.classList.contains('glass-demo__fallback-bar'),
});

const demoVariables = computed<CSSProperties>(() => ({
  '--td-tab-bar-glass-bg-color': toRgba(backgroundColor.value, backgroundAlpha.value),
  '--td-tab-bar-glass-border-color': toRgba(borderColor.value, borderAlpha.value),
  '--td-tab-bar-glass-shadow': shadowValues[shadowPreset.value],
  '--td-tab-bar-selected-bg-color': `hsl(${selectedBackgroundHue.value} 100% 50%)`,
  '--td-tab-bar-selected-bg-opacity': `${selectedBackgroundOpacity.value * 100}%`,
  '--demo-tab-bar-height': `${tabBarHeight.value}px`,
  '--demo-tab-bar-radius': `${tabBarHeight.value / 2}px`,
  '--demo-tab-bar-item-height': `${tabBarHeight.value - 8}px`,
  '--demo-tab-bar-item-radius': `${(tabBarHeight.value - 8) / 2}px`,
  '--demo-tab-bar-frame-height': `${tabBarHeight.value + 18}px`,
  '--demo-secondary-bottom': `${tabBarHeight.value + 14}px`,
}));

const formatParameter = (parameter: (typeof opticalParameters)[number]) => {
  const value = `${parameter.value.value}${parameter.unit}`;
  return parameter.key === 'bezel' ? `${value} · ${bezelWidth.value.toFixed(1)}px` : value;
};

const resetParameters = () => {
  surface.value = DEFAULT_TAB_BAR_GLASS_TUNING.surface;
  thicknessRatio.value = DEFAULT_TAB_BAR_GLASS_TUNING.thicknessRatio;
  bezelRatio.value = DEFAULT_TAB_BAR_GLASS_TUNING.bezelRatio;
  refractiveIndex.value = DEFAULT_TAB_BAR_GLASS_TUNING.refractiveIndex;
  displacementGain.value = DEFAULT_TAB_BAR_GLASS_TUNING.displacementGain;
  blur.value = DEFAULT_TAB_BAR_GLASS_TUNING.blur;
  specularOpacity.value = DEFAULT_TAB_BAR_GLASS_TUNING.specularOpacity;
  specularSaturation.value = DEFAULT_TAB_BAR_GLASS_TUNING.specularSaturation;
  lightAngle.value = DEFAULT_TAB_BAR_GLASS_TUNING.lightAngle;
  textureDpr.value = 1;
  previewWidth.value = 390;
  tabBarHeight.value = 64;
  backgroundAlpha.value = 0.42;
  borderAlpha.value = theme.value === 'dark' ? 0.3 : 0.62;
  backgroundColor.value = theme.value === 'dark' ? '#242424' : '#ffffff';
  borderColor.value = '#ffffff';
  shadowPreset.value = 'floating';
  selectedBackgroundHue.value = 216;
  selectedBackgroundOpacity.value = 0.16;
};

const previousTheme = typeof document === 'undefined' ? null : document.documentElement.getAttribute('theme-mode');
watch(theme, (value) => {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('theme-mode', value);
  backgroundColor.value = value === 'dark' ? '#242424' : '#ffffff';
  borderAlpha.value = value === 'dark' ? 0.3 : 0.62;
});
onBeforeUnmount(() => {
  if (typeof document === 'undefined') return;
  if (previousTheme) document.documentElement.setAttribute('theme-mode', previousTheme);
  else document.documentElement.removeAttribute('theme-mode');
});
</script>

<style scoped lang="less">
.glass-demo {
  padding: 20px;
  color: #1f2329;
  background: #f3f5f7;
  letter-spacing: 0;
}

.glass-demo--dark {
  color: rgba(255, 255, 255, 90%);
  background: #111315;
}

.glass-demo__toolbar,
.glass-demo__calibration,
.glass-demo__presets {
  padding: 16px;
  background: var(--td-bg-color-container, #fff);
  border: 1px solid var(--td-component-border, #dcdfe6);
  border-radius: 8px;
}

.glass-demo__modes {
  display: grid;
  grid-template-columns: repeat(5, minmax(130px, 1fr));
  gap: 14px;
}

.glass-demo__control-group > span,
.glass-demo__parameter-title,
.glass-demo__material-controls label > span {
  display: flex;
  justify-content: space-between;
  margin-bottom: 7px;
  font-size: 12px;
  font-weight: 600;
}

.glass-demo__control-copy {
  display: block !important;
  min-height: 58px;
}

.glass-demo__control-copy strong,
.glass-demo__control-copy small,
.glass-demo__toggle-copy strong,
.glass-demo__toggle-copy small {
  display: block;
}

.glass-demo__control-copy small,
.glass-demo__toggle-copy small,
.glass-demo__control-description,
.glass-demo__parameter-description {
  color: var(--td-text-color-secondary, #667085);
  font-size: 10px;
  font-weight: 400;
  line-height: 1.45;
}

.glass-demo__control-copy small {
  margin-top: 4px;
}

.glass-demo__segments {
  display: flex;
  min-height: 32px;
  overflow: hidden;
  border: 1px solid var(--td-component-border, #cfd3dc);
  border-radius: 6px;
}

.glass-demo__segments button {
  flex: 1;
  min-width: 42px;
  padding: 0 9px;
  color: inherit;
  background: transparent;
  border: 0;
  border-right: 1px solid var(--td-component-border, #cfd3dc);
  cursor: pointer;
}

.glass-demo__segments button:last-child {
  border-right: 0;
}

.glass-demo__segments button.is-active {
  color: #fff;
  background: var(--td-brand-color, #0052d9);
}

.glass-demo__toggles {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid var(--td-component-stroke, #e7e9ee);
}

.glass-demo__toggles label {
  display: flex;
  align-items: flex-start;
  gap: 7px;
  width: min(260px, 100%);
  font-size: 12px;
}

.glass-demo__toggle-copy {
  flex: 1;
}

.glass-demo__toggle-copy small {
  margin-top: 2px;
}

.glass-demo__toggles input {
  width: 16px;
  height: 16px;
  accent-color: var(--td-brand-color, #0052d9);
}

.glass-demo__comparison {
  display: flex;
  gap: 20px;
  margin: 20px 0;
  overflow-x: auto;
  padding-bottom: 8px;
}

.glass-demo__preview {
  flex: 0 0 auto;
}

.glass-demo__preview-title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 12px;
}

.glass-demo__preview-title span {
  color: var(--td-text-color-secondary, #667085);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}

.glass-demo__device {
  position: relative;
  height: 310px;
  overflow: hidden;
  background-color: #eef1f5;
  background-position: 3px 3px;
  border: 1px solid var(--td-component-border, #cfd3dc);
  border-radius: 8px;
}

.glass-demo__device--grid {
  background-image:
    linear-gradient(90deg, rgba(20, 24, 32, 70%) 1px, transparent 1px),
    linear-gradient(rgba(20, 24, 32, 70%) 1px, transparent 1px),
    linear-gradient(135deg, rgba(0, 82, 217, 22%), rgba(208, 68, 58, 20%));
  background-size:
    8px 8px,
    8px 8px,
    100% 100%;
}

.glass-demo__device--text {
  background: linear-gradient(160deg, #f7f2e9, #dce8e2);
}

.glass-demo__device--image {
  background-image: var(--demo-image);
  background-size: cover;
}

.glass-demo__device.is-moving {
  animation: glass-demo-background 3s linear infinite;
}

.glass-demo__backdrop-copy {
  display: grid;
  gap: 18px;
  padding: 30px 22px;
  color: #17202a;
  font-size: 15px;
  line-height: 1.45;
}

.glass-demo__backdrop-copy strong {
  max-width: 280px;
  font-size: 24px;
  line-height: 1.15;
}

.glass-demo__landmarks {
  display: flex;
  justify-content: space-between;
  padding: 24px 14px;
  color: rgba(255, 255, 255, 88%);
  font:
    600 16px/1 ui-monospace,
    SFMono-Regular,
    Menlo,
    monospace;
}

.glass-demo__bar-frame {
  position: absolute;
  inset: auto 0 0;
  min-height: var(--demo-tab-bar-frame-height);
}

.glass-demo__bar-frame :deep(.t-tab-bar) {
  min-height: var(--demo-tab-bar-height);
}

.glass-demo__bar-frame :deep(.t-tab-bar-item) {
  height: var(--demo-tab-bar-item-height);
}

.glass-demo__bar-frame :deep(.t-tab-bar--glass.t-tab-bar--round) {
  min-height: var(--demo-tab-bar-height);
  border-radius: var(--demo-tab-bar-radius);
}

.glass-demo__bar-frame :deep(.t-tab-bar--glass.t-tab-bar--round .t-tab-bar-item) {
  height: var(--demo-tab-bar-item-height);
}

.glass-demo__bar-frame :deep(.t-tab-bar--glass.t-tab-bar--round .t-tab-bar-item__content) {
  border-radius: var(--demo-tab-bar-item-radius);
}

.glass-demo__bar-frame :deep(.t-tab-bar--fixed) {
  position: absolute;
  inset: auto 0 0;
}

.glass-demo__secondary-bar {
  position: absolute;
  right: 0;
  bottom: var(--demo-secondary-bottom);
  left: 0;
}

.glass-demo__calibration > header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.glass-demo__calibration h3 {
  margin: 2px 0 0;
  font-size: 18px;
}

.glass-demo__eyebrow {
  color: var(--td-brand-color, #0052d9);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
}

.glass-demo__reset {
  width: 32px;
  height: 32px;
  overflow: hidden;
  color: var(--td-text-color-primary, #1f2329);
  background: transparent;
  border: 1px solid var(--td-component-border, #cfd3dc);
  border-radius: 6px;
  cursor: pointer;
}

.glass-demo__metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(90px, 1fr));
  gap: 10px;
  margin: 16px 0;
}

.glass-demo__metrics div {
  padding: 10px;
  background: var(--td-bg-color-secondarycontainer, #f3f5f7);
  border-radius: 6px;
}

.glass-demo__metrics span,
.glass-demo__metrics strong {
  display: block;
}

.glass-demo__metrics span {
  color: var(--td-text-color-secondary, #667085);
  font-size: 11px;
}

.glass-demo__metrics strong {
  margin-top: 4px;
  font:
    600 13px/1.2 ui-monospace,
    SFMono-Regular,
    Menlo,
    monospace;
}

.glass-demo__sliders {
  display: grid;
  grid-template-columns: repeat(2, minmax(220px, 1fr));
  gap: 14px 24px;
}

.glass-demo__section-title {
  margin: 18px 0 10px;
  color: var(--td-text-color-primary, #1f2329);
  font-size: 12px;
}

.glass-demo__parameter-title small,
.glass-demo__material-controls small {
  color: var(--td-text-color-secondary, #667085);
  font-weight: 400;
}

.glass-demo__parameter-title output {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}

.glass-demo__parameter-description {
  display: block;
  min-height: 30px;
  margin: -3px 0 6px;
}

.glass-demo__sliders input[type='range'] {
  width: 100%;
  accent-color: var(--td-brand-color, #0052d9);
}

.glass-demo__parameter-meta {
  display: block;
  margin-top: 3px;
  color: var(--td-text-color-placeholder, #8b95a5);
  font-size: 10px;
}

.glass-demo__material-controls {
  display: grid;
  grid-template-columns: repeat(3, minmax(140px, 1fr));
  gap: 18px;
  margin-top: 20px;
  padding-top: 18px;
  border-top: 1px solid var(--td-component-stroke, #e7e9ee);
}

.glass-demo__material-controls input[type='color'],
.glass-demo__material-controls select {
  width: 100%;
  height: 34px;
  color: inherit;
  background: transparent;
  border: 1px solid var(--td-component-border, #cfd3dc);
  border-radius: 6px;
}

.glass-demo__control-description {
  display: block;
  min-height: 30px;
  margin: -2px 0 6px;
}

.glass-demo__presets {
  margin-top: 20px;
}

.glass-demo__presets > div {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 12px;
}

.glass-demo__presets article {
  padding-left: 12px;
  border-left: 2px solid var(--td-brand-color, #0052d9);
}

.glass-demo__presets strong {
  font-size: 12px;
}

.glass-demo__presets p {
  margin: 5px 0 0;
  color: var(--td-text-color-secondary, #667085);
  font-size: 11px;
  line-height: 1.45;
}

@keyframes glass-demo-background {
  from {
    background-position: 3px 3px;
  }
  to {
    background-position: 35px 3px;
  }
}

@media (max-width: 920px) {
  .glass-demo__modes {
    grid-template-columns: repeat(2, minmax(130px, 1fr));
  }

  .glass-demo__presets > div {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .glass-demo {
    padding: 12px 8px;
  }

  .glass-demo__modes,
  .glass-demo__sliders,
  .glass-demo__material-controls,
  .glass-demo__presets > div {
    grid-template-columns: 1fr;
  }

  .glass-demo__metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>

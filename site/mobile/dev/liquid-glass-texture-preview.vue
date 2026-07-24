<template>
  <section class="texture-lab" aria-labelledby="texture-lab-title">
    <header class="texture-lab__header">
      <div>
        <p class="texture-lab__eyebrow">Stage 3 acceptance</p>
        <h2 id="texture-lab-title">Liquid Glass live texture diagnostics</h2>
      </div>
      <dl class="texture-lab__metrics" aria-live="polite">
        <div>
          <dt>Texture</dt>
          <dd data-testid="texture-size">{{ textures.width }} x {{ textures.height }}</dd>
        </div>
        <div>
          <dt>Pixels</dt>
          <dd>{{ textures.width * textures.height }}</dd>
        </div>
        <div>
          <dt>Generation</dt>
          <dd data-testid="generation-duration">{{ generationDuration.toFixed(2) }} ms</dd>
        </div>
        <div>
          <dt>Rebuilds</dt>
          <dd data-testid="rebuild-count">{{ rebuildCount }}</dd>
        </div>
      </dl>
    </header>

    <div class="texture-lab__controls" aria-label="Texture controls">
      <label>
        <span
          >Width <output>{{ width }} px</output></span
        >
        <input v-model.number="width" data-testid="width-control" type="range" min="320" max="620" step="10" />
      </label>
      <label>
        <span
          >Height <output>{{ height }} px</output></span
        >
        <input v-model.number="height" data-testid="height-control" type="range" min="48" max="96" step="4" />
      </label>
      <label>
        <span
          >Radius <output>{{ effectiveRadius }} px</output></span
        >
        <input
          v-model.number="radius"
          data-testid="radius-control"
          type="range"
          min="0"
          :max="Math.floor(height / 2)"
          step="2"
        />
      </label>
      <fieldset>
        <legend>DPR</legend>
        <div class="texture-lab__segments">
          <button
            v-for="option in dprOptions"
            :key="option"
            type="button"
            :class="{ 'is-active': dpr === option }"
            :aria-pressed="dpr === option"
            :data-testid="`dpr-${option}`"
            @click="dpr = option"
          >
            {{ option }}x
          </button>
        </div>
      </fieldset>
      <label class="texture-lab__toggle">
        <input v-model="backgroundMoves" data-testid="motion-control" type="checkbox" />
        <span>Move background</span>
      </label>
    </div>

    <div class="texture-lab__previews">
      <figure>
        <canvas ref="displacementCanvas" aria-label="Displacement texture"></canvas>
        <figcaption>R/G displacement</figcaption>
      </figure>
      <figure>
        <canvas ref="highlightCanvas" aria-label="Highlight texture"></canvas>
        <figcaption>Edge highlight</figcaption>
      </figure>
    </div>

    <figure class="texture-lab__composition">
      <div class="texture-lab__stage" :style="previewStyle">
        <svg :viewBox="`0 0 ${width} ${height}`" role="img" aria-label="Live SVG composition preview">
          <defs>
            <pattern id="texture-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <animateTransform
                v-if="backgroundMoves"
                attributeName="patternTransform"
                type="translate"
                from="0 0"
                to="24 0"
                dur="1.2s"
                repeatCount="indefinite"
              />
              <rect width="24" height="24" fill="#f7f8fa" />
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#1f2329" stroke-width="2" />
              <rect width="12" height="12" fill="#187a62" />
              <rect x="12" y="12" width="12" height="12" fill="#d0443a" />
            </pattern>
            <clipPath id="texture-preview-clip">
              <rect width="100%" height="100%" :rx="effectiveRadius" />
            </clipPath>
            <filter
              id="texture-preview-filter"
              :x="-textures.displacementScale"
              :y="-textures.displacementScale"
              :width="width + textures.displacementScale * 2"
              :height="height + textures.displacementScale * 2"
              filterUnits="userSpaceOnUse"
              primitiveUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feImage
                :href="displacementUrl"
                result="displacement-map"
                x="0"
                y="0"
                :width="width"
                :height="height"
                preserveAspectRatio="none"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="displacement-map"
                :scale="textures.displacementScale"
                xChannelSelector="R"
                yChannelSelector="G"
                result="refracted"
              />
              <feImage
                :href="highlightUrl"
                result="highlight-map"
                x="0"
                y="0"
                :width="width"
                :height="height"
                preserveAspectRatio="none"
              />
              <feBlend in="refracted" in2="highlight-map" mode="screen" />
            </filter>
          </defs>
          <rect
            width="100%"
            height="100%"
            :rx="effectiveRadius"
            fill="url(#texture-grid)"
            filter="url(#texture-preview-filter)"
            clip-path="url(#texture-preview-clip)"
          />
        </svg>
      </div>
      <figcaption>Live SVG composition. Background motion does not rebuild the texture.</figcaption>
    </figure>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { createTabBarGlassTextures, type TabBarGlassTextures } from '../../../src/tab-bar/liquid-glass-map';

const dprOptions = [1, 1.5, 2];
const width = ref(390);
const height = ref(64);
const radius = ref(32);
const dpr = ref(1);
const backgroundMoves = ref(false);
const displacementCanvas = ref<HTMLCanvasElement>();
const highlightCanvas = ref<HTMLCanvasElement>();
const displacementUrl = ref('');
const highlightUrl = ref('');
const generationDuration = ref(0);
const rebuildCount = ref(0);
const effectiveRadius = computed(() => Math.min(radius.value, height.value / 2));
const previewStyle = computed(() => ({ width: `${width.value}px`, aspectRatio: `${width.value} / ${height.value}` }));

const initialTextures = createTabBarGlassTextures({
  width: width.value,
  height: height.value,
  radius: effectiveRadius.value,
  dpr: dpr.value,
});
if (!initialTextures) throw new Error('Unable to create texture preview');

const textures = ref<TabBarGlassTextures>(initialTextures);
let scheduledFrame = 0;

const drawTexture = (
  canvas: HTMLCanvasElement | undefined,
  texture: TabBarGlassTextures,
  pixels: Uint8ClampedArray,
) => {
  if (!canvas) return '';

  canvas.width = texture.width;
  canvas.height = texture.height;
  const context = canvas.getContext('2d');
  if (!context) return '';

  context.putImageData(new ImageData(pixels, texture.width, texture.height), 0, 0);
  return canvas.toDataURL();
};

const rebuild = async () => {
  scheduledFrame = 0;
  const startedAt = performance.now();
  const generated = createTabBarGlassTextures({
    width: width.value,
    height: height.value,
    radius: effectiveRadius.value,
    dpr: dpr.value,
  });
  if (!generated) return;

  textures.value = generated;
  generationDuration.value = performance.now() - startedAt;
  rebuildCount.value += 1;
  await nextTick();
  displacementUrl.value = drawTexture(displacementCanvas.value, generated, generated.displacement);
  highlightUrl.value = drawTexture(highlightCanvas.value, generated, generated.highlight);
};

const scheduleRebuild = () => {
  if (scheduledFrame) cancelAnimationFrame(scheduledFrame);
  scheduledFrame = requestAnimationFrame(rebuild);
};

watch([width, height, effectiveRadius, dpr], scheduleRebuild);
onMounted(scheduleRebuild);
onBeforeUnmount(() => {
  if (scheduledFrame) cancelAnimationFrame(scheduledFrame);
});
</script>

<style scoped lang="less">
.texture-lab {
  margin: 24px 16px;
  padding: 20px;
  color: #1f2329;
  background: #fff;
  border: 1px solid #d7dce5;
  border-radius: 8px;
}

.texture-lab__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
}

.texture-lab__eyebrow {
  margin: 0 0 6px;
  color: #187a62;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

h2 {
  margin: 0;
  font-size: 20px;
  letter-spacing: 0;
}

.texture-lab__metrics {
  display: grid;
  grid-template-columns: repeat(4, minmax(72px, auto));
  gap: 12px;
  margin: 0;

  div {
    padding-left: 12px;
    border-left: 2px solid #d7dce5;
  }

  dt {
    color: #667085;
    font-size: 11px;
  }

  dd {
    margin: 3px 0 0;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 13px;
  }
}

.texture-lab__controls {
  display: grid;
  grid-template-columns: repeat(3, minmax(130px, 1fr)) auto auto;
  align-items: end;
  gap: 16px;
  padding: 16px 0 20px;
  border-top: 1px solid #e7eaf0;

  label > span,
  legend {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    color: #4b5565;
    font-size: 12px;
  }

  output {
    color: #1f2329;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  }

  input[type='range'] {
    width: 100%;
    accent-color: #187a62;
  }

  fieldset {
    min-width: 142px;
    margin: 0;
    padding: 0;
    border: 0;
  }
}

.texture-lab__segments {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  overflow: hidden;
  border: 1px solid #c5ccd8;
  border-radius: 6px;

  button {
    min-width: 44px;
    height: 30px;
    padding: 0 10px;
    color: #4b5565;
    background: #fff;
    border: 0;
    border-right: 1px solid #c5ccd8;
    cursor: pointer;

    &:last-child {
      border-right: 0;
    }

    &.is-active {
      color: #fff;
      background: #187a62;
    }
  }
}

.texture-lab__toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 30px;
  white-space: nowrap;

  input {
    width: 16px;
    height: 16px;
    accent-color: #187a62;
  }

  span {
    margin: 0;
  }
}

.texture-lab__previews {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

figure {
  margin: 0;
}

canvas {
  display: block;
  width: 100%;
  aspect-ratio: 5 / 1;
  background: #20242c;
  border: 1px solid #c5ccd8;
  border-radius: 6px;
}

figcaption {
  margin-top: 8px;
  color: #667085;
  font-size: 12px;
}

.texture-lab__composition {
  margin-top: 18px;
}

.texture-lab__stage {
  max-width: 100%;

  svg {
    display: block;
    width: 100%;
    height: 100%;
    background: #20242c;
    border: 1px solid #c5ccd8;
    border-radius: 6px;
  }
}

@media (max-width: 900px) {
  .texture-lab__header {
    display: block;
  }

  .texture-lab__metrics {
    margin-top: 16px;
  }

  .texture-lab__controls {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .texture-lab {
    margin: 12px 8px;
    padding: 16px;
  }

  .texture-lab__metrics,
  .texture-lab__controls,
  .texture-lab__previews {
    grid-template-columns: 1fr;
  }
}
</style>

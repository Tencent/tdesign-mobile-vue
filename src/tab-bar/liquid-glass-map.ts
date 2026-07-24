export const MAX_TAB_BAR_GLASS_DPR = 2;
export const MAX_TAB_BAR_GLASS_TEXTURE_PIXELS = 512 * 1024;

export type TabBarGlassSurface = 'squircle' | 'lip';

export interface TabBarGlassTuning {
  surface: TabBarGlassSurface;
  thicknessRatio: number;
  bezelRatio: number;
  refractiveIndex: number;
  displacementGain: number;
  blur: number;
  specularOpacity: number;
  specularSaturation: number;
  lightAngle: number;
}

export interface TabBarGlassTextureOptions {
  width: number;
  height: number;
  radius: number;
  dpr: number;
  tuning?: Partial<TabBarGlassTuning>;
}

export const DEFAULT_TAB_BAR_GLASS_TUNING: Readonly<TabBarGlassTuning> = Object.freeze({
  surface: 'squircle',
  thicknessRatio: 0.7,
  bezelRatio: 0.85,
  refractiveIndex: 1.5,
  displacementGain: 1,
  blur: 0.4,
  specularOpacity: 0.5,
  specularSaturation: 2,
  lightAngle: 225,
});

export interface TabBarGlassTextures {
  width: number;
  height: number;
  radius: number;
  dpr: number;
  bezelWidth: number;
  displacementScale: number;
  blur: number;
  specularOpacity: number;
  specularSaturation: number;
  displacement: Uint8ClampedArray;
  specular: Uint8ClampedArray;
}

const CHANNEL_NEUTRAL = 128;
const CHANNEL_RANGE = 127;
const PROFILE_SAMPLES = 96;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const smoothstep = (edge0: number, edge1: number, value: number) => {
  const position = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return position * position * (3 - 2 * position);
};

const sampleProfile = (profile: Float64Array, position: number) => {
  const sample = clamp(position, 0, 1) * (profile.length - 1);
  const lowerIndex = Math.floor(sample);
  const upperIndex = Math.min(lowerIndex + 1, profile.length - 1);
  const fraction = sample - lowerIndex;
  return profile[lowerIndex] * (1 - fraction) + profile[upperIndex] * fraction;
};

function resolveTextureSize(width: number, height: number, dpr: number) {
  const desiredWidth = Math.max(1, Math.ceil(width * dpr));
  const desiredHeight = Math.max(1, Math.ceil(height * dpr));
  const pixels = desiredWidth * desiredHeight;
  const scale = pixels > MAX_TAB_BAR_GLASS_TEXTURE_PIXELS ? Math.sqrt(MAX_TAB_BAR_GLASS_TEXTURE_PIXELS / pixels) : 1;
  return {
    width: Math.max(1, Math.floor(desiredWidth * scale)),
    height: Math.max(1, Math.floor(desiredHeight * scale)),
  };
}

function surfaceHeight(surface: TabBarGlassSurface, position: number) {
  const x = clamp(position, 0, 1);
  const squircle = (1 - (1 - x) ** 4) ** 0.25;
  if (surface === 'squircle') return squircle;

  const inner = (1 - (1 - Math.min(x * 2, 1)) ** 4) ** 0.25;
  const outer = 1 - Math.sqrt(Math.max(0, 1 - (1 - x) ** 2));
  const transition = x * x * x * (x * (x * 6 - 15) + 10);
  return inner * (1 - transition) + (outer + 0.1) * transition;
}

export function createRefractionProfile(
  tuning: Pick<TabBarGlassTuning, 'surface' | 'thicknessRatio' | 'refractiveIndex'>,
) {
  const index = clamp(tuning.refractiveIndex, 1, 2.5);
  const thickness = clamp(tuning.thicknessRatio, 0, 2);
  const eta = 1 / index;
  const profile = new Float64Array(PROFILE_SAMPLES);

  for (let sample = 0; sample < PROFILE_SAMPLES; sample += 1) {
    const x = sample / (PROFILE_SAMPLES - 1);
    const height = surfaceHeight(tuning.surface, x);
    const nextHeight = surfaceHeight(tuning.surface, Math.min(1, x + 1 / PROFILE_SAMPLES));
    const slope = (nextHeight - height) * PROFILE_SAMPLES;
    const normalLength = Math.hypot(slope, 1);
    const normalX = -slope / normalLength;
    const normalY = -1 / normalLength;
    const incidentDot = normalY;
    const discriminant = 1 - eta * eta * (1 - incidentDot * incidentDot);

    if (discriminant <= 0) continue;
    const root = Math.sqrt(discriminant);
    const refractedX = -(eta * incidentDot + root) * normalX;
    const refractedY = eta - (eta * incidentDot + root) * normalY;
    profile[sample] = refractedY === 0 ? 0 : refractedX * ((height + thickness) / refractedY);
  }

  return profile;
}

function roundedRectangleField(x: number, y: number, width: number, height: number, radius: number) {
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const centeredX = x - halfWidth;
  const centeredY = y - halfHeight;
  const localX = Math.abs(centeredX) - (halfWidth - radius);
  const localY = Math.abs(centeredY) - (halfHeight - radius);
  const outsideX = Math.max(localX, 0);
  const outsideY = Math.max(localY, 0);
  const outside = Math.hypot(outsideX, outsideY);
  const inside = Math.min(Math.max(localX, localY), 0);

  if (outside > 0) {
    return {
      distance: outside + inside - radius,
      normalX: (Math.sign(centeredX) * outsideX) / outside,
      normalY: (Math.sign(centeredY) * outsideY) / outside,
    };
  }

  return {
    distance: inside - radius,
    normalX: localX > localY ? Math.sign(centeredX) : 0,
    normalY: localX > localY ? 0 : Math.sign(centeredY),
  };
}

export function createTabBarGlassTextures(options: TabBarGlassTextureOptions): TabBarGlassTextures | null {
  const cssWidth = Number.isFinite(options.width) ? Math.max(0, options.width) : 0;
  const cssHeight = Number.isFinite(options.height) ? Math.max(0, options.height) : 0;
  if (!cssWidth || !cssHeight) return null;

  const dpr = clamp(Number.isFinite(options.dpr) ? options.dpr : 1, 1, MAX_TAB_BAR_GLASS_DPR);
  const radius = clamp(Number.isFinite(options.radius) ? options.radius : 0, 0, Math.min(cssWidth, cssHeight) / 2);
  const tuning = { ...DEFAULT_TAB_BAR_GLASS_TUNING, ...options.tuning };
  const bezelExtent = radius || Math.min(cssWidth, cssHeight) / 2;
  const bezelWidth = bezelExtent * clamp(tuning.bezelRatio, 0.1, 1);
  const profile = createRefractionProfile(tuning);
  const maxProfile = Math.max(...profile.map(Math.abs), 0.0001);
  const scale = clamp(cssHeight * 0.2 * clamp(tuning.displacementGain, 0, 2), 0, 18);
  const { width, height } = resolveTextureSize(cssWidth, cssHeight, dpr);
  const scaleX = width / cssWidth;
  const scaleY = height / cssHeight;
  const displacement = new Uint8ClampedArray(width * height * 4);
  const specular = new Uint8ClampedArray(width * height * 4);
  const lightAngle = clamp(tuning.lightAngle, 0, 360) * (Math.PI / 180);
  const lightX = Math.cos(lightAngle);
  const lightY = Math.sin(lightAngle);

  for (let pixelY = 0; pixelY < height; pixelY += 1) {
    const y = (pixelY + 0.5) / scaleY;
    for (let pixelX = 0; pixelX < width; pixelX += 1) {
      const x = (pixelX + 0.5) / scaleX;
      const offset = (pixelY * width + pixelX) * 4;
      const field = roundedRectangleField(x, y, cssWidth, cssHeight, radius);
      displacement[offset] = CHANNEL_NEUTRAL;
      displacement[offset + 1] = CHANNEL_NEUTRAL;

      if (field.distance > 0) continue;
      displacement[offset + 3] = 255;
      if (field.distance < -bezelWidth) continue;

      const edgePosition = clamp(-field.distance / bezelWidth, 0, 1);
      const innerFade = 1 - smoothstep(0.82, 1, edgePosition);
      const refraction = (sampleProfile(profile, edgePosition) / maxProfile) * innerFade;
      displacement[offset] = Math.round(CHANNEL_NEUTRAL - field.normalX * refraction * CHANNEL_RANGE);
      displacement[offset + 1] = Math.round(CHANNEL_NEUTRAL - field.normalY * refraction * CHANNEL_RANGE);

      const light = Math.max(0, field.normalX * lightX + field.normalY * lightY);
      const edge = Math.sqrt(Math.max(0, 1 - (1 - edgePosition) ** 2));
      const intensity = clamp(light * edge, 0, 1);
      specular[offset] = 255;
      specular[offset + 1] = 255;
      specular[offset + 2] = 255;
      specular[offset + 3] = Math.round(255 * intensity * intensity);
    }
  }

  return {
    width,
    height,
    radius,
    dpr,
    bezelWidth,
    displacementScale: scale,
    blur: clamp(tuning.blur, 0, 4),
    specularOpacity: clamp(tuning.specularOpacity, 0, 1),
    specularSaturation: clamp(tuning.specularSaturation, 1, 6),
    displacement,
    specular,
  };
}

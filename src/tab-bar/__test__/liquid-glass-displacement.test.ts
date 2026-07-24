import { describe, expect, it } from 'vitest';
import { DEFAULT_TAB_BAR_GLASS_TUNING, TabBarGlassTextures, createTabBarGlassTextures } from '../liquid-glass-map';

const SVG_CHANNEL_MIDPOINT = 0.5;
const CHANNEL_MAX = 255;

interface DisplacementMetrics {
  width: number;
  dpr: number;
  edgeDisplacement: number;
  centerDrift: number;
  disabledDifference: number;
}

function channelOffset(channel: number, scale: number) {
  return (channel / CHANNEL_MAX - SVG_CHANNEL_MIDPOINT) * scale;
}

function measureTexture(textures: TabBarGlassTextures, cssWidth: number): DisplacementMetrics {
  let edgeDisplacement = 0;
  let centerDrift = 0;

  for (let offset = 0; offset < textures.displacement.length; offset += 4) {
    if (!textures.displacement[offset + 3]) continue;

    const red = textures.displacement[offset];
    const green = textures.displacement[offset + 1];
    const displacement = Math.hypot(
      channelOffset(red, textures.displacementScale),
      channelOffset(green, textures.displacementScale),
    );
    const isNeutralCenter = red === 128 && green === 128;

    if (isNeutralCenter) centerDrift = Math.max(centerDrift, displacement);
    else edgeDisplacement = Math.max(edgeDisplacement, displacement);
  }

  return {
    width: cssWidth,
    dpr: textures.dpr,
    edgeDisplacement,
    centerDrift,
    disabledDifference: edgeDisplacement,
  };
}

function createMetrics(width: number, dpr: number) {
  const height = 64;
  const textures = createTabBarGlassTextures({
    width,
    height,
    radius: height / 2,
    dpr,
    tuning: DEFAULT_TAB_BAR_GLASS_TUNING,
  });

  if (!textures) throw new Error(`Failed to build ${width}px DPR${dpr} displacement texture.`);
  return measureTexture(textures, width);
}

describe('TabBar Liquid Glass displacement acceptance', () => {
  it('quantifies edge displacement, center stability, and the disabled A/B difference', () => {
    const metrics = [320, 390, 430, 620].flatMap((width) => [1, 2].map((dpr) => createMetrics(width, dpr)));

    metrics.forEach((entry) => {
      expect(entry.edgeDisplacement).toBeGreaterThanOrEqual(6);
      expect(entry.edgeDisplacement).toBeLessThanOrEqual(12);
      expect(entry.centerDrift).toBeLessThanOrEqual(1);
      expect(entry.disabledDifference).toBeGreaterThanOrEqual(6);
    });

    process.stdout.write(
      `${JSON.stringify(
        metrics.map((entry) => ({
          width: entry.width,
          dpr: entry.dpr,
          edgeDisplacement: Number(entry.edgeDisplacement.toFixed(3)),
          centerDrift: Number(entry.centerDrift.toFixed(3)),
          disabledDifference: Number(entry.disabledDifference.toFixed(3)),
        })),
        null,
        2,
      )}\n`,
    );
  });
});

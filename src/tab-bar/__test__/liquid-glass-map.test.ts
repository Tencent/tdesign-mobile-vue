import { describe, expect, it } from 'vitest';
import {
  createRefractionProfile,
  createTabBarGlassTextures,
  DEFAULT_TAB_BAR_GLASS_TUNING,
  MAX_TAB_BAR_GLASS_DPR,
  MAX_TAB_BAR_GLASS_TEXTURE_PIXELS,
} from '../liquid-glass-map';

const getPixel = (data: Uint8ClampedArray, width: number, x: number, y: number) => {
  const offset = (y * width + x) * 4;
  return Array.from(data.slice(offset, offset + 4));
};

const createFixture = () => {
  const textures = createTabBarGlassTextures({ width: 100, height: 40, radius: 20, dpr: 1 });
  if (!textures) throw new Error('Expected texture fixture');
  return textures;
};

describe('createRefractionProfile', () => {
  it('is deterministic and neutral at an index of refraction of one', () => {
    const neutral = createRefractionProfile({ surface: 'squircle', thicknessRatio: 1, refractiveIndex: 1 });

    expect(createRefractionProfile({ surface: 'squircle', thicknessRatio: 1, refractiveIndex: 1.5 })).toEqual(
      createRefractionProfile({ surface: 'squircle', thicknessRatio: 1, refractiveIndex: 1.5 }),
    );
    expect(Math.max(...neutral.map(Math.abs))).toBeLessThan(0.000001);
  });

  it('increases profile magnitude when thickness increases', () => {
    const thin = createRefractionProfile({ surface: 'squircle', thicknessRatio: 0.2, refractiveIndex: 1.5 });
    const thick = createRefractionProfile({ surface: 'squircle', thicknessRatio: 1.2, refractiveIndex: 1.5 });

    expect(Math.max(...thick.map(Math.abs))).toBeGreaterThan(Math.max(...thin.map(Math.abs)));
  });
});

describe('createTabBarGlassTextures', () => {
  it('keeps explicit defaults byte-identical to implicit defaults', () => {
    expect(
      createTabBarGlassTextures({ width: 100, height: 40, radius: 20, dpr: 1, tuning: DEFAULT_TAB_BAR_GLASS_TUNING }),
    ).toEqual(createFixture());
  });

  it('keeps the center neutral and limits displacement to the bezel', () => {
    const textures = createFixture();

    expect(getPixel(textures.displacement, textures.width, 50, 20)).toEqual([128, 128, 0, 255]);
    expect(getPixel(textures.displacement, textures.width, 50, 1)[1]).not.toBe(128);
  });

  it('maps the full bezel ratio range to the radius without early saturation', () => {
    const ratios = [0.5, 0.8, 0.9, 1];
    const textures = ratios.map((bezelRatio) =>
      createTabBarGlassTextures({ width: 100, height: 40, radius: 20, dpr: 1, tuning: { bezelRatio } }),
    );

    expect(textures.map((texture) => texture?.bezelWidth)).toEqual([10, 16, 18, 20]);
    expect(new Set(textures.map((texture) => Array.from(texture?.displacement ?? []).join(','))).size).toBe(
      ratios.length,
    );
  });

  it('fades continuously to a neutral center at a full-width bezel', () => {
    const textures = createTabBarGlassTextures({
      width: 100,
      height: 40,
      radius: 20,
      dpr: 1,
      tuning: { bezelRatio: 1 },
    });
    if (!textures) throw new Error('Expected full-width bezel fixture');

    const innerPixels = [16, 17, 18, 19, 20].map((y) => getPixel(textures.displacement, textures.width, 50, y));
    const adjacentDeltas = innerPixels.slice(1).map((pixel, index) => Math.abs(pixel[1] - innerPixels[index][1]));

    expect(Math.max(...adjacentDeltas)).toBeLessThanOrEqual(2);
    expect(innerPixels.at(-1)).toEqual([128, 128, 0, 255]);
  });

  it('encodes opposite directions on opposing bezel edges', () => {
    const textures = createFixture();

    expect(getPixel(textures.displacement, textures.width, 1, 20)[0]).not.toBe(
      getPixel(textures.displacement, textures.width, 98, 20)[0],
    );
    expect(getPixel(textures.displacement, textures.width, 50, 1)[1]).not.toBe(
      getPixel(textures.displacement, textures.width, 50, 38)[1],
    );
  });

  it('changes geometry with the physical calibration values', () => {
    const base = createFixture();
    const varied = createTabBarGlassTextures({
      width: 100,
      height: 40,
      radius: 20,
      dpr: 1,
      tuning: { thicknessRatio: 1.2, bezelRatio: 0.7, refractiveIndex: 2, displacementGain: 1.5, surface: 'lip' },
    });

    expect(varied?.bezelWidth).not.toBe(base.bezelWidth);
    expect(varied?.displacement).not.toEqual(base.displacement);
  });

  it('keeps specular alpha in the bezel and responds to its direction', () => {
    const northWest = createFixture();
    const southEast = createTabBarGlassTextures({
      width: 100,
      height: 40,
      radius: 20,
      dpr: 1,
      tuning: { lightAngle: 45 },
    });

    expect(getPixel(northWest.specular, northWest.width, 50, 20)[3]).toBe(0);
    expect(southEast?.specular).not.toEqual(northWest.specular);
  });

  it('fades specular continuously into the neutral center', () => {
    const textures = createFixture();
    const innerEdgeAlpha = [14, 15, 16, 17, 18].map((x) => getPixel(textures.specular, textures.width, x, 20)[3]);

    expect(innerEdgeAlpha.slice(1).every((alpha, index) => alpha <= innerEdgeAlpha[index])).toBe(true);
    expect(innerEdgeAlpha.at(-1)).toBe(0);
    expect(Math.abs(innerEdgeAlpha[2] - innerEdgeAlpha[3])).toBeLessThanOrEqual(2);
  });

  it('returns null for zero-sized textures and respects DPR and pixel limits', () => {
    expect(createTabBarGlassTextures({ width: 0, height: 40, radius: 20, dpr: 1 })).toBeNull();
    const dpr = createTabBarGlassTextures({ width: 100, height: 40, radius: 20, dpr: 4 });
    const budgeted = createTabBarGlassTextures({ width: 4000, height: 1000, radius: 500, dpr: 2 });

    expect(dpr?.dpr).toBe(MAX_TAB_BAR_GLASS_DPR);
    expect(budgeted?.width && budgeted.height).toBeDefined();
    expect((budgeted?.width ?? 0) * (budgeted?.height ?? 0)).toBeLessThanOrEqual(MAX_TAB_BAR_GLASS_TEXTURE_PIXELS);
  });
});

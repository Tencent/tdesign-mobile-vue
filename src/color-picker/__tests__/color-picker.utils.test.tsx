import { describe, expect, it } from 'vitest';
import { getCoordinate, getFormatList, genSwatchList } from '../helper';
import { Color } from '../../_common/js/color-picker';

describe('ColorPicker utils', () => {
  describe('getCoordinate', () => {
    it('uses pageY normally and clientY when fixed', () => {
      const rect = { left: 10, top: 20, width: 100, height: 50 } as DOMRect;
      const event = { changedTouches: [{ pageX: 80, pageY: 80, clientY: 30 }] } as unknown as TouchEvent;
      expect(getCoordinate(event, rect)).toEqual({ x: 70, y: 50 });
      expect(getCoordinate(event, rect, true)).toEqual({ x: 70, y: 10 });
    });

    it('clamps coordinates to the rectangle', () => {
      const rect = { left: 10, top: 20, width: 100, height: 50 } as DOMRect;
      const event = { changedTouches: [{ pageX: -1, pageY: 1000 }] } as unknown as TouchEvent;
      expect(getCoordinate(event, rect)).toEqual({ x: 0, y: 50 });
    });
  });

  describe('getFormatList', () => {
    it('returns the requested format and alpha percentage', () => {
      const color = new Color('rgba(255, 0, 0, 0.5)');
      expect(getFormatList('RGB', color)).toEqual(['RGB', [255, 0, 0, '50%']]);
      expect(getFormatList('HEX', color)).toEqual(['HEX', [color.hex, '50%']]);
      expect(getFormatList(undefined, color)[0]).toBe('RGB');
    });
  });

  describe('genSwatchList', () => {
    it('uses defaults only for undefined', () => {
      expect(genSwatchList(undefined)).toHaveLength(10);
      expect(genSwatchList(null)).toEqual([]);
      expect(genSwatchList([])).toEqual([]);
      expect(genSwatchList(['red'])).toEqual(['red']);
    });
  });
});

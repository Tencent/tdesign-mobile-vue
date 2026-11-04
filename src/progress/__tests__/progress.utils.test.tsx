import { describe, it, expect } from 'vitest';
import { getBackgroundColor } from '../utils';

describe('Progress utils', () => {
  // jsdom 不支持 linear-gradient 等 css 样式 https://github.com/jsdom/jsdom/issues/2166
  //  这里对 getBackgroundColor 方法单独验证
  describe('getBackgroundColor', () => {
    it('returns the color directly for string input', () => {
      expect(getBackgroundColor('red')).toEqual('red');
    });

    it('prepends 90deg for array input starting with a hex color', () => {
      expect(getBackgroundColor(['#000', '#fff'])).toEqual('linear-gradient( 90deg,#000,#fff )');
    });

    it('keeps the array order when the first item is not a hex color', () => {
      expect(getBackgroundColor(['red', '#fff'])).toEqual('linear-gradient( red,#fff )');
    });

    it('builds gradient with percentage stops sorted ascending', () => {
      expect(
        getBackgroundColor({
          '100%': '#0ff',
          '0%': '#f00',
        }),
      ).toEqual('linear-gradient(to right, #f00 0%,#0ff 100%)');
    });

    it('supports custom direction with percentage stops', () => {
      expect(
        getBackgroundColor({
          direction: 'to left',
          '0%': '#f00',
          '50%': '#0f0',
          '100%': '#0ff',
        }),
      ).toEqual('linear-gradient(to left, #f00 0%,#0f0 50%,#0ff 100%)');
    });

    it('falls back to from/to when no percentage stops are provided', () => {
      expect(getBackgroundColor({ from: '#000', to: '#fff' })).toEqual('linear-gradient(to right, #000, #fff)');
    });
  });
});

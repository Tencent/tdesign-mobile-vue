import { describe, it, expect } from 'vitest';
import { getBackgroundColor } from '../utils';

describe('Progress utils', () => {
  // jsdom 不支持 linear-gradient 等 css 样式 https://github.com/jsdom/jsdom/issues/2166
  //  这里对 getBackgroundColor 方法单独验证
  describe('getBackgroundColor', () => {
    it('color types', () => {
      expect(getBackgroundColor('red')).toEqual('red');

      expect(getBackgroundColor(['#000', '#fff'])).toEqual('linear-gradient( 90deg,#000,#fff )');

      expect(
        getBackgroundColor({
          '0%': '#f00',
          '100%': '#0ff',
        }),
      ).toEqual('linear-gradient(to right, #f00 0%,#0ff 100%)');
    });
  });
});

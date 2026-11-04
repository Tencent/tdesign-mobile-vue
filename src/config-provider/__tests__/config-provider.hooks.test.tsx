import { describe, it, expect } from 'vitest';
import { useConfig, provideConfig } from '../useConfig';
import type { GlobalConfigProvider } from '../type';

describe('ConfigProvider hooks', () => {
  describe('useConfig', () => {
    it('diff config', () => {
      const testConfig = (
        config: GlobalConfigProvider['calendar'],
        target: Record<string, unknown>,
        targetClassPrefix: string,
      ) => {
        const { globalConfig, global, classPrefix } = useConfig('calendar', config);
        expect(globalConfig.value).toMatchObject(target);
        expect(global.value).toMatchObject(target);
        expect(classPrefix.value).toBe(targetClassPrefix);
      };
      testConfig(undefined, {}, 't');
      testConfig({}, {}, 't');
      provideConfig({ globalConfig: { classPrefix: 'tdesign' } });
      testConfig({}, {}, 'tdesign');
    });
  });
});

import { describe, it, expect, vi, afterEach } from 'vitest';
import { useConfig, provideConfig } from '../useConfig';
import type { GlobalConfigProvider } from '../type';

describe('ConfigProvider hooks', () => {
  // 在 setup 外调用 provideConfig 以模拟非组件环境，静音 Vue 对 provide() 的警告
  vi.spyOn(console, 'warn').mockImplementation(() => {});

  afterEach(() => {
    vi.restoreAllMocks();
  });

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

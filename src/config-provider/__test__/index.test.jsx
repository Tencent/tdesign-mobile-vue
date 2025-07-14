import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { useConfig, t, provideConfig } from '../useConfig';
import { mergeWith } from '../context';
import ConfigProvider from '../config-provider';

describe('useConfig', () => {
  it('diff config', () => {
    const testConfig = (config, target, targetClassPrefix) => {
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

describe('t', () => {
  it('string pattern', () => {
    expect(t('{a}', { a: 'hello' })).toBe('hello');
  });

  it('empty data', () => {
    expect(t('{a}')).toBe('{a}');
  });

  it('function pattern', () => {
    expect(t(() => 'a')).toBe('a');
    expect(t((a, b) => `${a}${b}`, 'hello ', 'tdesign')).toBe('hello tdesign');
  });

  it('other type', () => {
    expect(t(null)).toBe('');
  });
});

describe('mergeWith', () => {
  it('array type', () => {
    expect(mergeWith({ a: ['1'] }, { a: 1 })).toStrictEqual({ a: 1 });
  });

  it('object type', () => {
    expect(mergeWith({ a: { b: 1, c: 3 } }, { a: { b: 2 } })).toStrictEqual({ a: { b: 2, c: 3 } });
  });
});

describe('ConfigProvider', () => {
  it('render default slot', () => {
    const wrapper = mount(() => <ConfigProvider>tdesign</ConfigProvider>, {});

    expect(wrapper.element.innerHTML).toBe('tdesign');
  });

  it('provide config', () => {
    const testConfig = (props, expectTarget) => {
      const ChildComponent = {
        setup() {
          const { globalConfig } = useConfig('table');
          return () => <div class="t-child">{globalConfig.value.empty}</div>;
        },
      };

      const wrapper = mount(
        <ConfigProvider>
          <ChildComponent />
        </ConfigProvider>,
        {
          props,
        },
      );

      const dom = wrapper.find('.t-child');
      expect(dom.element.innerHTML).toBe(expectTarget);
    };

    testConfig({}, '暂无数据');

    const empty = 'Empty Data Test';
    testConfig(
      {
        globalConfig: {
          table: {
            empty,
          },
        },
      },
      empty,
    );
  });
});

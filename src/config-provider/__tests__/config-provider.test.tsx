import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { useConfig } from '../useConfig';
import ConfigProvider from '../index';

describe('ConfigProvider', () => {
  describe('slots', () => {
    it('default', () => {
      const wrapper = mount(() => <ConfigProvider>tdesign</ConfigProvider>, {});

      expect(wrapper.element.innerHTML).toBe('tdesign');
    });
  });

  describe('scenarios', () => {
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
});

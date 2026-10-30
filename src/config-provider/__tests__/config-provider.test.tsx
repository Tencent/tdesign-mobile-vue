import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { useConfig } from '../useConfig';
import ConfigProvider from '../index';

describe('ConfigProvider', () => {
  describe('props', () => {
    it('globalConfig[object]', () => {
      const ChildComponent = {
        setup() {
          const { globalConfig, classPrefix } = useConfig('calendar');
          return () => (
            <div class="t-child">{`${globalConfig.value.title}|${globalConfig.value.confirm}|${classPrefix.value}`}</div>
          );
        },
      };

      const wrapper = mount(() => (
        <ConfigProvider globalConfig={{ classPrefix: 'tdesign', calendar: { title: '自定义日历标题' } }}>
          <ChildComponent />
        </ConfigProvider>
      ));

      // 注入的配置覆盖默认语言包对应字段，未覆盖字段（confirm）回退默认值
      expect(wrapper.find('.t-child').text()).toBe('自定义日历标题|确认|tdesign');
    });
  });

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

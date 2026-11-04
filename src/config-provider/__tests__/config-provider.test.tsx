/* eslint-disable vue/one-component-per-file -- 测试文件中内联 defineComponent 构造子组件 */
import { describe, it, expect } from 'vitest';
import { defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import { useConfig } from '../useConfig';
import ConfigProvider from '../index';

describe('ConfigProvider', () => {
  describe('props', () => {
    it('globalConfig[object]', () => {
      const ChildComponent = defineComponent({
        setup() {
          const { globalConfig, classPrefix } = useConfig('calendar');
          return () => (
            <div class="t-child">{`${globalConfig.value.title}|${globalConfig.value.confirm}|${classPrefix.value}`}</div>
          );
        },
      });

      const wrapper = mount(() => (
        <ConfigProvider globalConfig={{ classPrefix: 'tdesign', calendar: { title: '自定义日历标题' } }}>
          <ChildComponent />
        </ConfigProvider>
      ));

      // 注入的配置覆盖默认语言包对应字段，未覆盖字段（confirm）回退默认值
      expect(wrapper.find('.t-child').text()).toBe('自定义日历标题|确认|tdesign');
    });

    it('default[slot]', () => {
      const wrapper = mount(() => <ConfigProvider>tdesign</ConfigProvider>, {});

      expect(wrapper.element.innerHTML).toBe('tdesign');
    });
  });

  describe('scenarios', () => {
    it('falls back to default locale when globalConfig is not provided', () => {
      const ChildComponent = defineComponent({
        setup() {
          const { globalConfig } = useConfig('table');
          return () => <div class="t-child">{globalConfig.value.empty}</div>;
        },
      });

      const wrapper = mount(
        <ConfigProvider>
          <ChildComponent />
        </ConfigProvider>,
      );

      expect(wrapper.find('.t-child').element.innerHTML).toBe('暂无数据');
    });
  });
});

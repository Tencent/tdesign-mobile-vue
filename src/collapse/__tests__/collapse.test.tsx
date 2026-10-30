import { ref } from 'vue';
import { vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { Collapse, CollapsePanel } from '../index';
import type { TdCollapseProps } from '../type';

const themeList: TdCollapseProps['theme'][] = ['default', 'card'];

describe('Collapse', () => {
  describe('props', () => {
    test('defaultExpandAll[boolean]', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse defaultExpandAll={true}>
              <CollapsePanel ref="1" value="1" header="标题1" content="内容1" />
              <CollapsePanel ref="2" value="2" header="标题2" content="内容2" />
            </Collapse>
          );
        },
      });

      // onMounted 中展开需要等待 tick
      await wrapper.vm.$nextTick();

      const panel1 = wrapper.findComponent({ ref: '1' });
      const panel2 = wrapper.findComponent({ ref: '2' });

      // defaultExpandAll = true 时所有面板初始展开
      expect(panel1.classes()).toContain('t-collapse-panel--expanded');
      expect(panel2.classes()).toContain('t-collapse-panel--expanded');
    });

    test('disabled[boolean]', async () => {
      const disabled = ref(false);
      const handleChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse disabled={disabled.value} onChange={handleChange}>
              <CollapsePanel ref="1" value="1" header="标题" content="内容" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });
      await panel.find('.t-collapse-panel__header').trigger('click');

      expect(handleChange).toHaveBeenCalled();

      disabled.value = true;
      await wrapper.vm.$nextTick();
      await panel.find('.t-collapse-panel__header').trigger('click');

      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    test('expandIcon[boolean]', async () => {
      // 默认渲染默认展开图标
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel ref="1" value="1" header="标题" content="内容" />
            </Collapse>
          );
        },
      });
      expect(wrapper.find('.t-collapse-panel__header-icon svg').exists()).toBe(true);

      // expandIcon 为 false 时所有面板不渲染展开图标
      const wrapper2 = mount({
        setup() {
          return () => (
            <Collapse expandIcon={false}>
              <CollapsePanel ref="1" value="1" header="标题" content="内容" />
            </Collapse>
          );
        },
      });
      expect(wrapper2.find('.t-collapse-panel__header-icon svg').exists()).toBe(false);
    });

    test('expandIcon[function]', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse expandIcon={() => <span class="custom-expand-icon">更多</span>}>
              <CollapsePanel ref="1" value="1" header="标题" content="内容" />
            </Collapse>
          );
        },
      });
      // 函数图标透传至子面板
      expect(wrapper.find('.t-collapse-panel__header-icon .custom-expand-icon').exists()).toBe(true);
      expect(wrapper.find('.t-collapse-panel__header-icon .custom-expand-icon').text()).toBe('更多');
    });

    test('expandMutex[boolean]', async () => {
      const val = ref([]);
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse expandMutex v-model={val.value}>
              <CollapsePanel ref="1" value="1" header="标题1" content="内容1" />
              <CollapsePanel ref="2" value="2" header="标题2" content="内容2" />
            </Collapse>
          );
        },
      });

      const panel1 = wrapper.findComponent({ ref: '1' });
      const panel2 = wrapper.findComponent({ ref: '2' });
      await panel1.find('.t-collapse-panel__header').trigger('click');

      expect(val.value).toHaveLength(1);
      expect(val.value).toContain('1');

      await panel2.find('.t-collapse-panel__header').trigger('click');

      expect(val.value).toHaveLength(1);
      expect(val.value).toContain('2');
    });

    test('theme[default/card]', async () => {
      themeList.forEach((theme) => {
        const wrapper = mount({
          setup() {
            return () => (
              <Collapse theme={theme}>
                <CollapsePanel ref="1" value="1" />
              </Collapse>
            );
          },
        });
        if (theme) {
          expect(wrapper.classes()).toContain(`t-collapse--${theme}`);
        }
      });
    });

    test('value[array]', async () => {
      const val = ref([]);
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse v-model={val.value}>
              <CollapsePanel ref="1" value="1" header="标题1" content="内容1" />
              <CollapsePanel ref="2" value="2" header="标题2" content="内容2" />
            </Collapse>
          );
        },
      });

      const panel1 = wrapper.findComponent({ ref: '1' });
      const panel2 = wrapper.findComponent({ ref: '2' });
      await panel1.find('.t-collapse-panel__header').trigger('click');

      expect(val.value).toHaveLength(1);
      expect(val.value).toContain('1');

      await panel2.find('.t-collapse-panel__header').trigger('click');

      expect(val.value).toHaveLength(2);
      expect(val.value).toContain('2');
    });

    test('defaultValue[array]', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse default-value={['1']}>
              <CollapsePanel ref="1" value="1" header="标题1" content="内容1" />
              <CollapsePanel ref="2" value="2" header="标题2" content="内容2" />
            </Collapse>
          );
        },
      });

      const panel1 = wrapper.findComponent({ ref: '1' });
      const panel2 = wrapper.findComponent({ ref: '2' });

      expect(panel1.classes()).toContain('t-collapse-panel--expanded');
      expect(panel2.classes()).not.toContain('t-collapse-panel--expanded');
    });
  });

  describe('events', () => {
    test('change', async () => {
      const handleChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse onChange={handleChange}>
              <CollapsePanel ref="1" value="1" header="标题" content="内容" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });
      await panel.find('.t-collapse-panel__header').trigger('click');

      expect(handleChange).toHaveBeenCalled();
    });
  });
});

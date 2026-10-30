import { ref, reexpanded } from 'vue';
import { vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { Collapse, CollapsePanel } from '../index';

const themeList = ['', 'default', 'card'];

describe('Collapse', () => {
  describe('props', () => {
    test('defaultExpandAll[boolean]', async () => {
      const defaultExpandAll = ref(false);
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse defaultExpandAll={defaultExpandAll}>
              <CollapsePanel ref="1" value="1" header="标题1" content="内容1" />
              <CollapsePanel ref="2" value="2" header="标题2" content="内容2" />
            </Collapse>
          );
        },
      });

      const panel1 = wrapper.findComponent({ ref: '1' });
      const panel2 = wrapper.findComponent({ ref: '2' });

      expect(panel1.classes()).not.toContain('t-collapse-panel--expanded');
      expect(panel2.classes()).not.toContain('t-collapse-panel--expanded');

      defaultExpandAll.value = true;
      await wrapper.vm.$nextTick();

      expect(panel1.classes()).toContain('t-collapse-panel--expanded');
      expect(panel2.classes()).toContain('t-collapse-panel--expanded');
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

    test('theme[string]', async () => {
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

    // expandIcon 自定义展开图标/关闭展开图标，与面板图标渲染联动
    it.todo('expandIcon[boolean/function]');
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

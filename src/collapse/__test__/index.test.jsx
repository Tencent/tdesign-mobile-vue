import { ref, reactive } from 'vue';
import { mount } from '@vue/test-utils';
import { Collapse, CollapsePanel } from '../index';

const placementList = ['bottom', 'top'];
const themeList = ['default', 'card'];

describe('Collapse', () => {
  describe('collapse props', () => {
    test('defaultExpandAll', async () => {
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

      expect(panel1.classes()).not.toContain('t-collapse-panel--active');
      expect(panel2.classes()).not.toContain('t-collapse-panel--active');

      defaultExpandAll.value = true;
      await wrapper.vm.$nextTick();

      expect(panel1.classes()).toContain('t-collapse-panel--active');
      expect(panel2.classes()).toContain('t-collapse-panel--active');
    });

    test('default-value', async () => {
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

      expect(panel1.classes()).toContain('t-collapse-panel--active');
      expect(panel2.classes()).not.toContain('t-collapse-panel--active');
    });

    test('value', async () => {
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

    test('expandMutex', async () => {
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

    test('onChange', async () => {
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

    test('disabled', async () => {
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

    test('theme', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse theme="">
              <CollapsePanel ref="1" value="1"/>
            </Collapse>
          );
        },
      });
      const $Collapse = wrapper.findComponent(Collapse);
      themeList.map((item) => {
        expect($Collapse.classes().includes(`t-collapse--${item}`)).toBeFalsy();
      });
    });
  });

  describe('collapse-panel props', () => {
    test('header and content', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel ref="1" value="1" header="标题" content="内容" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });

      expect(panel.find('.t-collapse-panel__title').text()).toBe('标题');
      expect(panel.find('.t-collapse-panel__content').text()).toBe('内容');
    });

    test('disabled', async () => {
      const handleChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse onChange={handleChange}>
              <CollapsePanel ref="1" value="1" disabled header="标题" content="内容" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });

      await panel.find('.t-collapse-panel__header').trigger('click');

      expect(handleChange).not.toHaveBeenCalled();
    });

    test('headerRightContent', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel ref="1" value="1" headerRightContent="操作" header="标题" content="内容" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });

      expect(panel.find('.t-collapse-panel__header .t-cell__note').text()).toBe('操作');
    });

    test('slot', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel ref="1" value="1">
                {{
                  header: () => <h4>标题</h4>,
                  headerRightContent: () => <span>操作</span>,
                  default: () => <div>内容</div>,
                }}
              </CollapsePanel>
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });

      expect(panel.find('.t-collapse-panel__title .t-cell__title h4').html()).toBe('<h4>标题</h4>');
      expect(panel.find('.t-collapse-panel__title .t-cell__note > span').html()).toBe('<span>操作</span>');
      expect(panel.find('.t-collapse-panel__content > div').html()).toBe('<div>内容</div>');
    });

    test('placement', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel ref="1" value="1" placement=""/>
            </Collapse>
          );
        },
      });
      const $CollapsePanel = wrapper.findComponent(CollapsePanel);
      placementList.map((item) => {
        expect($CollapsePanel.classes().includes(`t-collapse-panel--${item}`)).toBeFalsy();
      });
    });
  });
});

import { vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { Collapse, CollapsePanel } from '../index';
import type { TdCollapsePanelProps } from '../type';

const placementList: TdCollapsePanelProps['placement'][] = ['bottom', 'top'];

describe('CollapsePanel', () => {
  describe('props', () => {
    test('destroyOnCollapse[boolean]', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel ref="1" value="1" destroyOnCollapse />
              <CollapsePanel ref="2" value="2" destroyOnCollapse />
            </Collapse>
          );
        },
      });
      expect(wrapper.findAll('.t-collapse-panel__content')).toHaveLength(0);
      const panel = wrapper.findComponent({ ref: '1' });

      await panel.find('.t-collapse-panel__header').trigger('click');
      expect(wrapper.findAll('.t-collapse-panel__content')).toHaveLength(1);
    });

    test('disabled[boolean]', async () => {
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
      const panel = wrapper.findComponent({ ref: '1' });
      expect(panel.find('.t-collapse-panel__header-icon svg').exists()).toBe(true);

      // expandIcon 为 false 时不渲染展开图标
      const wrapper2 = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel ref="1" value="1" header="标题" content="内容" expandIcon={false} />
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
            <Collapse>
              <CollapsePanel
                ref="1"
                value="1"
                header="标题"
                content="内容"
                expandIcon={() => <span class="custom-expand-icon">更多</span>}
              />
            </Collapse>
          );
        },
      });
      expect(wrapper.find('.t-collapse-panel__header-icon .custom-expand-icon').exists()).toBe(true);
      expect(wrapper.find('.t-collapse-panel__header-icon .custom-expand-icon').text()).toBe('更多');
    });

    test('header[string] & content[string]', async () => {
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

    test('headerLeftIcon[function]', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel
                ref="1"
                value="1"
                header="标题"
                content="内容"
                headerLeftIcon={() => <span class="custom-left-icon">图标</span>}
              />
            </Collapse>
          );
        },
      });
      const panel = wrapper.findComponent({ ref: '1' });
      expect(panel.find('.t-collapse-panel__header .custom-left-icon').exists()).toBe(true);
      expect(panel.find('.t-collapse-panel__header .custom-left-icon').text()).toBe('图标');
    });

    test('headerRightContent[string]', async () => {
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

    test('placement[bottom/top]', async () => {
      placementList.forEach((placement) => {
        const wrapper = mount({
          setup() {
            return () => (
              <Collapse>
                <CollapsePanel ref="1" value="1" placement={placement} />
              </Collapse>
            );
          },
        });
        const $CollapsePanel = wrapper.findComponent(CollapsePanel);
        expect($CollapsePanel.classes()).toContain(`t-collapse-panel--${placement}`);
      });
    });
  });

  describe('slots', () => {
    test('header & headerRightContent & default', async () => {
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
  });
});

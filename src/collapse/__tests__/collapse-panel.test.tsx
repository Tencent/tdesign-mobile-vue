import { describe, test, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { h, type Slots } from 'vue';
import { Collapse, CollapsePanel } from '../index';
import type { TdCollapsePanelProps, TdCollapseProps } from '../type';

const placementList: TdCollapsePanelProps['placement'][] = ['bottom', 'top'];

const mountPanel = (props: TdCollapsePanelProps = {}, slots: Slots = {}, parentProps: TdCollapseProps = {}) =>
  mount(Collapse, {
    props: parentProps,
    slots: { default: () => h(CollapsePanel, { value: 'one', ...props }, slots) },
  });

describe('CollapsePanel', () => {
  describe('props', () => {
    test('content[string]', () => {
      const wrapper = mountPanel({ content: '内容' });
      expect(wrapper.find('.t-collapse-panel__content').text()).toBe('内容');
    });

    test('content[function]', () => {
      const wrapper = mountPanel({ content: () => <span>函数内容</span> });
      expect(wrapper.find('.t-collapse-panel__content').text()).toBe('函数内容');
    });

    test('content[slot]', () => {
      const wrapper = mountPanel({}, { content: () => [<div>具名内容</div>] });
      expect(wrapper.find('.t-collapse-panel__content').text()).toBe('具名内容');
    });

    test('default[string]', () => {
      const wrapper = mountPanel({ default: '别名内容' });
      expect(wrapper.find('.t-collapse-panel__content').text()).toBe('别名内容');
    });

    test('default[function]', () => {
      const wrapper = mountPanel({ default: () => <span>函数别名内容</span> });
      expect(wrapper.find('.t-collapse-panel__content').text()).toBe('函数别名内容');
    });

    test('default[slot]', () => {
      const wrapper = mountPanel({}, { default: () => [<div>内容</div>] });
      expect(wrapper.find('.t-collapse-panel__content > div').html()).toBe('<div>内容</div>');
    });

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
      await panel.find('.t-collapse-panel__header').trigger('click');
      expect(wrapper.findAll('.t-collapse-panel__content')).toHaveLength(0);

      const retained = mountPanel({ content: '保留内容', destroyOnCollapse: false });
      const retainedContent = retained.find('.t-collapse-panel__content');
      expect(retainedContent.exists()).toBe(true);
      expect(retainedContent.text()).toBe('保留内容');
      expect(retained.find('.t-collapse-panel__body').attributes('style')).toContain('grid-template-rows: 0fr');
      await retained.find('.t-collapse-panel__header').trigger('click');
      expect(retained.find('.t-collapse-panel__body').attributes('style')).toContain('grid-template-rows: 1fr');
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

    test('expandIcon[slot]', () => {
      const wrapper = mountPanel({}, { expandIcon: () => [<span class="slot-expand">展开</span>] });
      expect(wrapper.find('.t-collapse-panel__header-icon .slot-expand').text()).toBe('展开');
    });

    test('header[string]', async () => {
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

    test('header[function]', () => {
      const wrapper = mountPanel({ header: () => <span>函数标题</span> });
      expect(wrapper.find('.t-cell__title-text').text()).toBe('函数标题');
    });

    test('header[slot]', () => {
      const wrapper = mountPanel({}, { header: () => [<h4>标题</h4>] });
      expect(wrapper.find('.t-cell__title h4').html()).toBe('<h4>标题</h4>');
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

    test('headerLeftIcon[slot]', () => {
      const wrapper = mountPanel({}, { headerLeftIcon: () => [<span class="slot-left">左图标</span>] });
      expect(wrapper.find('.t-cell__left-icon .slot-left').text()).toBe('左图标');
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

    test('headerRightContent[function]', () => {
      const wrapper = mountPanel({ headerRightContent: () => <span>函数操作</span> });
      expect(wrapper.find('.t-cell__note').text()).toBe('函数操作');
    });

    test('headerRightContent[slot]', () => {
      const wrapper = mountPanel({}, { headerRightContent: () => [<span>操作</span>] });
      expect(wrapper.find('.t-cell__note > span').html()).toBe('<span>操作</span>');
    });

    test('placement[bottom/top]', async () => {
      await Promise.all(
        placementList.map(async (placement) => {
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
          expect($CollapsePanel.find(`.t-icon-chevron-${placement === 'bottom' ? 'down' : 'up'}`).exists()).toBe(true);
          await $CollapsePanel.find('.t-collapse-panel__header').trigger('click');
          expect($CollapsePanel.find(`.t-icon-chevron-${placement === 'bottom' ? 'up' : 'down'}`).exists()).toBe(true);
        }),
      );
    });

    test('value[string]', async () => {
      const onChange = vi.fn();
      const wrapper = mountPanel({ value: 'one' }, {}, { onChange });
      await wrapper.find('.t-collapse-panel__header').trigger('click');
      expect(onChange).toHaveBeenCalledWith(['one'], { e: expect.any(MouseEvent) });
    });

    test('value[number]', async () => {
      const onChange = vi.fn();
      const wrapper = mountPanel({ value: 0 }, {}, { onChange });
      await wrapper.find('.t-collapse-panel__header').trigger('click');
      expect(onChange).toHaveBeenCalledWith([0], { e: expect.any(MouseEvent) });
    });
  });
});

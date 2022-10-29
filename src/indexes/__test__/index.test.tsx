import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { Indexes as TIndexes, IndexesCell as TIndexesCell } from '../index';
import { number } from '../demos/data';
import config from '@/config';
import { trigger } from '@/image-viewer/__test__/touch';

const { prefix } = config;

const componentName = `${prefix}-indexes`;
describe('Indexes', () => {
  describe('props', () => {
    it(': height', async () => {
      const wrapper = mount(TIndexes, {
        props: {
          height: 100,
          list: number,
        },
      });
      expect(wrapper.vm.height).toBe(100); // 测试 props
      expect(wrapper.find(`.${componentName}`).attributes('style')).toEqual(expect.stringContaining('height: 100px')); // 测试渲染出来的
    });

    it(': list', () => {
      const wrapper = mount(TIndexes, {
        props: {
          list: number,
        },
      });
      expect(wrapper.findAll(`.${componentName}__sidebar-item`).length).toBe(number.length); // 侧边栏数量
      wrapper.find(`.${componentName}__sidebar-item`).trigger('click'); // 覆盖侧边栏点击
      expect(wrapper.findAllComponents(TIndexesCell).length).toBe(
        number.reduce((count, item) => count + item.children.length, 0),
      ); // 渲染出来的单元格数量
    });
    it(': sticky be true', async () => {
      const containerDiv = document.createElement('div');
      containerDiv.setAttribute('style', 'width: 200px; height:200px; border:1px solid red; overflow: auto');
      document.body.appendChild(containerDiv);
      const wrapper = mount(TIndexes, {
        props: {
          list: number,
          sticky: true,
        },
        // attachTo: containerDiv,
      });
      const getBoundingClientRect = vi.fn();
      getBoundingClientRect.mockImplementation(() => ({
        x: 0,
        y: 0,
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 1000,
        width: 200,
      }));
      wrapper.element.getBoundingClientRect = getBoundingClientRect;
      expect(wrapper.element).toEqual(wrapper.vm.indexesRoot);
      await wrapper.findComponent(TIndexes).element.dispatchEvent(new CustomEvent('scroll', { detail: 20 }));
      expect(wrapper.html().includes('position: fixed;')).toEqual(true);
    });
    it(': sticky be false', async () => {
      const containerDiv = document.createElement('div');
      containerDiv.setAttribute('style', 'width: 200px; height:200px; border:1px solid red; overflow: auto');
      document.body.appendChild(containerDiv);
      const wrapper = mount(TIndexes, {
        props: {
          list: number,
          sticky: false,
        },
        attachTo: containerDiv,
      });
      const getBoundingClientRect = vi.fn();
      getBoundingClientRect.mockImplementation(() => ({
        x: 0,
        y: 0,
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 1000,
        width: 200,
      }));
      wrapper.element.getBoundingClientRect = getBoundingClientRect;
      expect(wrapper.element).toEqual(wrapper.vm.indexesRoot);
      await wrapper.findComponent(TIndexes).element.dispatchEvent(new CustomEvent('scroll', { detail: 20 }));
      expect(wrapper.html().includes('position: fixed;')).toEqual(false);
    });
  });
  describe('event', () => {
    it(': select', async () => {
      const log = vi.fn((info) => {
        return info.childrenIndex;
      });
      const selectFn = vi.fn();
      const wrapper = mount(TIndexes, {
        props: {
          list: number,
          onSelect: selectFn,
        },
      });
      wrapper.findComponent(TIndexesCell).trigger('click'); // 模拟点击第一个单元格
      expect(selectFn).toBeCalledWith({
        groupIndex: '1',
        childrenIndex: 0,
      }); // 检查onSelect 是否被按指定参数调用
    });
    it(': touch sidebar show tips', async () => {
      const wrapper = mount(TIndexes, {
        props: {
          list: number,
        },
      });
      await wrapper.find('.t-indexes__sidebar-item').trigger('click');
      expect(wrapper.find('.t-indexes__sidebar-tip')).toBeDefined();
      wrapper.unmount(); // 销毁触发 onBeforeUnmount
    });
    it(': sidebar touchmove', async () => {
      const wrapper = mount(TIndexes, {
        props: {
          list: number,
          sticky: false,
        },
      });
      const sidebar = wrapper.find(`.${componentName}__sidebar`);
      document.elementFromPoint = function () {
        // document.elementFromPoint is not defined
        return sidebar.findAll(`.${componentName}__sidebar-item`)[0].element;
      };
      await trigger(sidebar, 'touchstart', 20, 20);
      await trigger(sidebar, 'touchmove', 20, 60);
      await trigger(sidebar, 'touchend', 20, 310);
    });
  });
});

import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { Indexes as TIndexes, IndexesCell as TIndexesCell } from '../index';
import { number } from '../demos/data';
import config from '@/config';

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
    it(': sticky', () => {
      const wrapper = mount(TIndexes, {
        props: {
          list: number,
          sticky: false,
        },
      });
      expect(wrapper.vm.sticky).toBe(false);
    });
  });
  describe('event', () => {
    it(': select', async () => {
      const log = vi.fn((info) => {
        return info.childrenIndex;
      });
      const wrapper = mount(TIndexes, {
        props: {
          list: number,
          onSelect: (i: { groupIndex: number; childrenIndex: number }) => {
            const info = log(i);
            console.log('selected info :>> ', info);
          },
        },
      });
      wrapper.findComponent(TIndexesCell).trigger('click'); // 模拟点击第一个单元格
      expect(log).toHaveBeenCalled(); // 检查是否被调用
      expect(log).toHaveNthReturnedWith(1, 0); // 第一次调用返回0
    });
  });
});

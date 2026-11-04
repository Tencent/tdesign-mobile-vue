import { h, type VNodeChild } from 'vue';
import { mount, type DOMWrapper, type VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import { vi, afterEach, describe, expect, it } from 'vitest';
import TCell from '../../cell/index';
import { Indexes, IndexesAnchor } from '../index';
import type { TdIndexesProps } from '../type';
import config from '@/config';
import { sleep } from '../../shared/util';
import { trigger } from '@/image-viewer/__tests__/touch';

const { prefix } = config;

const indexesClass = `${prefix}-indexes`;
const indexesAnchorClass = `${prefix}-indexes-anchor`;

const children = new Array(5).fill('列表内容');
const list = [
  { index: 1, children },
  { index: 3, children },
  { index: 5, children },
  { index: 7, children },
  { index: 8, children },
  { index: 10, children },
  { index: '#', children },
];
const indexList = list.map((item) => item.index);

const move = async (target: VueWrapper | DOMWrapper<Element>, distance: number) => {
  await trigger(target, 'touchstart', 0, 0);
  await trigger(target, 'touchmove', 0, distance);
  await trigger(target, 'touchend', 0, distance);
};

// type.ts 中 showFullIndex/sticky 误声明为大写 Boolean（包装对象类型），
// 此处修正为 boolean 以匹配组件运行时 props 的推断类型
type IndexesMountProps = Omit<TdIndexesProps, 'showFullIndex' | 'sticky'> & {
  showFullIndex?: boolean;
  sticky?: boolean;
};

const renderAnchors = (): VNodeChild =>
  list.map((item, listIndex) => [
    h(IndexesAnchor, { index: item.index, key: `anchor-${listIndex}` }),
    ...item.children.map((val, childIndex) =>
      h(TCell, { class: 'indexes-cell', key: `cell-${listIndex}-${childIndex}` }, () => val),
    ),
  ]);

// 挂载带锚点的索引列表，便于复用；事件处理器通过 props 传入（组件 props 已声明 onX）
const mountIndexes = (props: IndexesMountProps = {}) => {
  // 先落变量再传入，避免字面量触发对推断缺失属性的冗余检查
  const mergedProps = { indexList, ...props };
  return mount(Indexes, {
    props: mergedProps,
    slots: { default: renderAnchors },
  });
};

afterEach(() => {
  vi.restoreAllMocks();
  document.elementFromPoint = Document.prototype.elementFromPoint;
});

describe('Indexes', () => {
  describe('props', () => {
    it('current[string]', async () => {
      const wrapper = mountIndexes({ current: '#' });
      await sleep(0);
      // 点击侧边栏索引后通过 update:current 同步受控值
      await wrapper.findAll(`.${indexesClass}__sidebar-item`)[1].trigger('click');
      const emittedList = wrapper.findComponent(Indexes).emitted('update:current');
      expect(emittedList[emittedList.length - 1]).toEqual([list[1].index]);
    });

    it('current[number]', async () => {
      const wrapper = mountIndexes({ current: 5 });
      await sleep(0);
      await wrapper.findAll(`.${indexesClass}__sidebar-item`)[2].trigger('click');
      const emittedList = wrapper.findComponent(Indexes).emitted('update:current');
      expect(emittedList[emittedList.length - 1]).toEqual([list[2].index]);
    });

    it('modelValue[string]', async () => {
      // 组件 emits 未声明 update:modelValue（会在控制台产生 Vue warn），此处验证 v-model 通道的事件同步
      const wrapper = mountIndexes({ modelValue: '#' });
      await sleep(0);
      const items = wrapper.findAll(`.${indexesClass}__sidebar-item`);
      await items[items.length - 1].trigger('click');
      const emittedList = wrapper.findComponent(Indexes).emitted('update:modelValue');
      expect(emittedList[emittedList.length - 1]).toEqual(['#']);
    });

    it('modelValue[number]', async () => {
      const wrapper = mountIndexes({ modelValue: 1 });
      await sleep(0);
      await wrapper.findAll(`.${indexesClass}__sidebar-item`)[3].trigger('click');
      const emittedList = wrapper.findComponent(Indexes).emitted('update:modelValue');
      expect(emittedList[emittedList.length - 1]).toEqual([list[3].index]);
    });

    // defaultCurrent 仅决定初始滚动定位（scrollTo 位置），jsdom 中无法观测滚动联动
    it.todo('defaultCurrent[string]');
    it.todo('defaultCurrent[number]');

    it('indexList[array]', () => {
      const wrapper = mountIndexes();

      // 不传 indexList 时侧边栏默认渲染 A-Z
      const wrapper1 = mount(Indexes, { slots: { default: renderAnchors } });
      expect(wrapper.findAll(`.${indexesClass}__sidebar-item`).map((item) => item.text())).toEqual(
        indexList.map((index) => String(index).charAt(0)),
      );
      expect(wrapper.findAllComponents(TCell).length).toBe(
        list.reduce((count, item) => count + item.children.length, 0),
      );
      expect(wrapper1.findAll(`.${indexesClass}__sidebar-item`)).toHaveLength(26);
    });

    it('showFullIndex[boolean]', () => {
      const wordList = ['Admin', 'Beta'];
      const mountWordIndexes = (props: IndexesMountProps) => {
        const mergedProps = { indexList: wordList, ...props };
        return mount(Indexes, {
          props: mergedProps,
          slots: {
            default: () =>
              wordList.map((item) => [
                h(IndexesAnchor, { index: item, key: item }),
                h(TCell, { class: 'indexes-cell', key: `${item}-cell` }, () => item),
              ]),
          },
        });
      };

      // 默认只显示首字符
      expect(
        mountWordIndexes({})
          .findAll(`.${indexesClass}__sidebar-item`)
          .map((item) => item.text()),
      ).toEqual(['A', 'B']);
      // showFullIndex = true：显示完整索引文本
      expect(
        mountWordIndexes({ showFullIndex: true })
          .findAll(`.${indexesClass}__sidebar-item`)
          .map((item) => item.text()),
      ).toEqual(['Admin', 'Beta']);
    });

    it('sticky[boolean]', async () => {
      // sticky 默认 true：滚动计算后首个锚点带激活态类名与吸顶定位样式
      const wrapper = mountIndexes({});
      await sleep(0);
      const $wrapper = wrapper.find(`.${indexesAnchorClass}__wrapper`);
      expect($wrapper.classes()).toContain(`${indexesAnchorClass}__wrapper--active`);
      expect($wrapper.attributes('style')).toContain('top: 0px');

      // sticky = false：不添加吸顶激活类名与定位样式
      const wrapper2 = mountIndexes({ sticky: false });
      await sleep(0);
      const $wrapper2 = wrapper2.find(`.${indexesAnchorClass}__wrapper`);
      expect($wrapper2.classes()).not.toContain(`${indexesAnchorClass}__wrapper--active`);
      expect($wrapper2.attributes('style')).toBeUndefined();
    });

    it('stickyOffset[number]', async () => {
      const wrapper = mountIndexes({ stickyOffset: 10 });
      await sleep(0);
      expect(wrapper.find(`.${indexesAnchorClass}__wrapper`).attributes('style')).toContain('top: 10px');
    });
  });

  describe('events', () => {
    it('select', async () => {
      const onSelect = vi.fn();
      const wrapper = mountIndexes({ onSelect });
      await wrapper.find(`.${indexesClass}__sidebar-item`).trigger('click');
      expect(onSelect).toBeCalledTimes(1);
      expect(onSelect).toBeCalledWith(list[0].index);
    });

    it('change', async () => {
      const onChange = vi.fn();
      const wrapper = mountIndexes({ onChange });
      // 等待初始化完成：初始化将激活项置为第一项，并触发一次 change
      await sleep(0);
      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toBeCalledWith(list[0].index);

      const $items = wrapper.findAll(`.${indexesClass}__sidebar-item`);
      // 重复点击当前激活索引：索引未变化，不额外触发 change
      await $items[0].trigger('click');
      expect(onChange).toBeCalledTimes(1);

      // 切换到新索引：再次触发 change
      await $items[1].trigger('click');
      expect(onChange).toBeCalledTimes(2);
      expect(onChange).toHaveBeenLastCalledWith(list[1].index);

      // 再次点击已激活索引：不重复触发
      await $items[1].trigger('click');
      expect(onChange).toBeCalledTimes(2);
    });
  });

  describe('scenarios', () => {
    it('renders the sidebar and anchor sections from indexList', () => {
      const wrapper = mountIndexes({ showFullIndex: true });
      // 侧边栏按 indexList 逐项渲染
      const sidebarItems = wrapper.findAll(`.${indexesClass}__sidebar-item`);
      expect(sidebarItems.map((item) => item.text())).toEqual(indexList.map(String));
      sidebarItems.forEach((item, index) => {
        expect(item.attributes('data-index')).toBe(String(indexList[index]));
      });
      // 每个锚点对应一组单元格
      expect(wrapper.findAll(`.${indexesAnchorClass}`)).toHaveLength(list.length);
      expect(wrapper.findAll('.indexes-cell')).toHaveLength(list.length * children.length);
    });

    it('swiping the sidebar switches indexes without emitting select', async () => {
      const onSelect = vi.fn();
      const onChange = vi.fn();
      const wrapper = mountIndexes({ onSelect, onChange });

      const $sideBarItems = wrapper.findAll(`.${indexesClass}__sidebar-item`);
      // 模拟点击第一项 item, 此时第一项为激活态，两个事件均被触发
      await $sideBarItems[0].trigger('click');
      expect(onChange).toBeCalledTimes(1);
      expect(onSelect).toBeCalledTimes(1);
      expect($sideBarItems[0].classes()).toContain(`${indexesClass}__sidebar-item--active`);

      // mock document.elementFromPoint
      document.elementFromPoint = () => wrapper.findAll(`.${indexesClass}__sidebar-item`)[2].element;

      // 每一项的高度是20，这里以第0项为起始点，模拟滑动 40，此时第3项转为激活态，只会触发 change 事件
      await move($sideBarItems[0], 40);
      expect(wrapper.findAll(`.${indexesClass}__sidebar-item`)[2].classes()).toContain(
        `${indexesClass}__sidebar-item--active`,
      );
      expect(onSelect).toBeCalledTimes(1);
      expect(onChange).toBeCalledTimes(2);
    });

    it('shows the sidebar tips after selecting and hides them after one second', async () => {
      vi.useFakeTimers();
      try {
        const wrapper = mountIndexes();
        await wrapper.findAll(`.${indexesClass}__sidebar-item`)[1].trigger('click');
        await nextTick();
        const tips = wrapper.find(`.${indexesClass}__sidebar-tips`);
        expect(tips.exists()).toBe(true);
        expect(tips.text()).toBe(String(list[1].index));

        vi.advanceTimersByTime(1000);
        await nextTick();
        expect(wrapper.find(`.${indexesClass}__sidebar-tips`).exists()).toBe(false);
      } finally {
        vi.useRealTimers();
      }
    });

    it('scrolling the list activates the anchor covering the scroll position', async () => {
      const onChange = vi.fn();
      // jsdom 无布局：按 data-index 为每个锚点提供确定性的 top/height
      const topByIndex = new Map(list.map((item, i) => [String(item.index), i * 100]));
      vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
        const top = this.dataset?.index ? (topByIndex.get(this.dataset.index) ?? 0) : 0;
        return { top, bottom: top + 20, height: 20, width: 100, left: 0, right: 100, x: 0, y: top } as DOMRect;
      });

      const wrapper = mountIndexes({ current: 1, onChange });
      await sleep(0);

      const root = wrapper.get(`.${indexesClass}`);
      (root.element as HTMLElement).scrollTop = 250;
      await root.trigger('scroll');
      await nextTick();

      const activeItem = wrapper
        .findAll(`.${indexesClass}__sidebar-item`)
        .find((item) => item.classes().includes(`${indexesClass}__sidebar-item--active`));
      expect(activeItem?.text()).toBe(String(list[2].index));
      expect(onChange).toHaveBeenLastCalledWith(list[2].index);
      const emittedList = wrapper.findComponent(Indexes).emitted('update:current');
      expect(emittedList[emittedList.length - 1]).toEqual([list[2].index]);
    });
  });
});

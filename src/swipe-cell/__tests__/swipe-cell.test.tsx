import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { nextTick } from 'vue';
import { AppIcon as TIconApp } from 'tdesign-icons-vue-next';
import SwipeCell from '../swipe-cell';
import type { SwipeActionItem, SwipeCellInstanceFunctions } from '../type';
import { trigger } from '@/test/touch';

const BUTTON_WIDTH = 80;
/** 右侧菜单：两个操作按钮 */
const RIGHT_ACTIONS: SwipeActionItem[] = [
  { text: '编辑', className: 'edit-btn' },
  { text: '删除', className: 'delete-btn' },
];
/** 左侧菜单：单个操作按钮 */
const LEFT_ACTIONS: SwipeActionItem[] = [{ text: '选择', className: 'favor-btn' }];
const RIGHT_WIDTH = BUTTON_WIDTH * 2;
const LEFT_WIDTH = BUTTON_WIDTH;

type SwipeTarget = Parameters<typeof trigger>[0];

/**
 * jsdom 中 clientWidth 恒为 0，菜单测宽（setPanelWidth）与回弹阈值计算（threshold）无法触发。
 * 按元素 class 映射确定宽度：操作按钮 80px，菜单宽度 = 实际渲染的按钮数 × 按钮宽度（空菜单为 0），
 * 滑动位移与回弹位置由此可精确换算。
 */
function mockPanelWidth() {
  return vi.spyOn(Element.prototype, 'clientWidth', 'get').mockImplementation(function (this: HTMLElement) {
    if (this.classList.contains('t-swipe-cell__left') || this.classList.contains('t-swipe-cell__right')) {
      return this.querySelectorAll('.t-swipe-cell__content').length * BUTTON_WIDTH;
    }
    if (this.classList.contains('t-swipe-cell__content')) return BUTTON_WIDTH;
    return 0;
  });
}

/**
 * 模拟一次完整手势：touchstart(0,0) → touchmove(dx,dy) → touchend(dx,dy)。
 * 先等待一个 tick，确保 useSwipe 通过 post-flush watcher 挂载的触摸监听已生效。
 */
async function swipeBy(target: SwipeTarget, dx: number, dy = 0) {
  await nextTick();
  await trigger(target, 'touchstart', 0, 0);
  await trigger(target, 'touchmove', dx, dy);
  await trigger(target, 'touchend', dx, dy);
}

/** 当前单元格主体位移（wrapper 的 transform） */
function getTransform(wrapper: ReturnType<typeof mount>) {
  return (wrapper.find('.t-swipe-cell__wrapper').element as HTMLElement).style.transform;
}

/** 右侧二次确认内容容器（右侧菜单最后一个子元素） */
function getSureRightEl(wrapper: ReturnType<typeof mount>) {
  return wrapper.find('.t-swipe-cell__right').element.lastElementChild as HTMLElement;
}

describe('SwipeCell', () => {
  afterEach(() => {
    // 还原 clientWidth mock 与 vi.fn，避免影响其它用例
    vi.restoreAllMocks();
  });

  describe('props', () => {
    it('content[string]', () => {
      const content = 'content is a string';
      const wrapper = mount(<SwipeCell content={content} />);

      expect(wrapper.text()).toBe(content);
    });

    it('content[function]', () => {
      const content = 'content is a string';
      const wrapper = mount(<SwipeCell content={() => <div class="custom-content">{content}</div>} />);

      expect(wrapper.find('.custom-content').text()).toBe(content);
    });

    it('content[slot]', () => {
      const wrapper = mount(SwipeCell, {
        slots: {
          content: () => <TIconApp />,
        },
      });

      expect(wrapper.findComponent(TIconApp).exists()).toBeTruthy();
    });

    it('default[string]', () => {
      const content = 'default prop content';
      const wrapper = mount(<SwipeCell default={content} />);

      // default prop 通道同样渲染单元格内容
      expect(wrapper.text()).toBe(content);
    });

    it('default[function]', () => {
      const wrapper = mount(<SwipeCell default={() => <div class="custom-default">default fn content</div>} />);

      expect(wrapper.find('.custom-default').exists()).toBeTruthy();
      expect(wrapper.text()).toContain('default fn content');
    });

    it('default[slot]', () => {
      const wrapper = mount(SwipeCell, {
        slots: {
          default: () => <div class="cell-body">单元格内容</div>,
        },
      });

      expect(wrapper.find('.cell-body').exists()).toBeTruthy();
      expect(wrapper.text()).toContain('单元格内容');
    });

    it('disabled[boolean]', async () => {
      mockPanelWidth();
      const onChange = vi.fn();
      const onDragstart = vi.fn();
      const wrapper = mount(
        <SwipeCell content="内容" right={RIGHT_ACTIONS} disabled onChange={onChange} onDragstart={onDragstart} />,
      );
      const $cell = wrapper.find('.t-swipe-cell');

      // 禁用滑动：位移不变、不触发滑动事件
      await swipeBy($cell, -100);
      expect(onDragstart).not.toHaveBeenCalled();
      expect(onChange).not.toHaveBeenCalled();
      expect(getTransform(wrapper)).toBe('translate3d(0px, 0, 0)');

      // 恢复启用后同一手势可以正常打开菜单
      await wrapper.setProps({ disabled: false });
      await swipeBy($cell, -100);
      expect(onDragstart).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith('right');
      expect(getTransform(wrapper)).toBe(`translate3d(-${RIGHT_WIDTH}px, 0, 0)`);
    });

    it('left[array]', () => {
      const wrapper = mount(
        <SwipeCell
          content="内容"
          left={[{ text: '编辑', className: 'left-btn', icon: <TIconApp />, style: { backgroundColor: 'red' } }]}
        />,
      );

      const $btn = wrapper.find('.t-swipe-cell__left .left-btn');
      expect($btn.exists()).toBeTruthy();
      expect($btn.find('.t-swipe-cell__text').text()).toBe('编辑');
      // icon 渲染为操作项图标节点
      expect($btn.find('.t-swipe-cell__icon').exists()).toBeTruthy();
      // 自定义 style 透传到操作项
      expect($btn.attributes('style')).toContain('background-color: red');
    });

    it('left[function]', () => {
      const wrapper = mount(<SwipeCell content="内容" left={() => <div class="custom-left-btn">左侧操作</div>} />);

      expect(wrapper.find('.t-swipe-cell__left .custom-left-btn').exists()).toBeTruthy();
    });

    it('left[slot]', async () => {
      const onSlotClick = vi.fn();
      const onClick = vi.fn();
      const wrapper = mount(SwipeCell, {
        props: {
          content: '内容',
          onClick,
        },
        slots: {
          left: () => (
            <div class="left-slot-btn" onClick={onSlotClick}>
              选择
            </div>
          ),
        },
      });

      expect(wrapper.find('.t-swipe-cell__left .left-slot-btn').exists()).toBeTruthy();

      // 插槽自定义内容与事件生效，组件 click 事件不触发（插槽写法组件不触发）
      await wrapper.find('.left-slot-btn').trigger('click');
      expect(onSlotClick).toHaveBeenCalledTimes(1);
      expect(onClick).not.toHaveBeenCalled();
    });

    it('opened[boolean]', async () => {
      mockPanelWidth();
      const onChange = vi.fn();
      const wrapper = mount(
        <SwipeCell content="内容" left={LEFT_ACTIONS} right={RIGHT_ACTIONS} opened onChange={onChange} />,
      );
      await nextTick();

      // 同时配置左右菜单时优先打开右侧
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith('right');
      expect(getTransform(wrapper)).toBe(`translate3d(-${RIGHT_WIDTH}px, 0, 0)`);

      // 置为 false 收起菜单
      await wrapper.setProps({ opened: false });
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenLastCalledWith(undefined);
      expect(getTransform(wrapper)).toBe('translate3d(0px, 0, 0)');

      // 仅配置左侧菜单时打开左侧
      const leftOnly = mount(<SwipeCell content="内容" left={LEFT_ACTIONS} opened onChange={vi.fn()} />);
      await nextTick();
      expect(getTransform(leftOnly)).toBe(`translate3d(${LEFT_WIDTH}px, 0, 0)`);
    });

    it('opened[array]', async () => {
      mockPanelWidth();

      // [left, right] = [false, true] 打开右侧菜单
      const rightChange = vi.fn();
      const rightCase = mount(
        <SwipeCell
          content="内容"
          left={LEFT_ACTIONS}
          right={RIGHT_ACTIONS}
          opened={[false, true]}
          onChange={rightChange}
        />,
      );
      await nextTick();
      expect(rightChange).toHaveBeenCalledWith('right');
      expect(getTransform(rightCase)).toBe(`translate3d(-${RIGHT_WIDTH}px, 0, 0)`);

      // [left, right] = [true, false] 打开左侧菜单
      const leftChange = vi.fn();
      const leftCase = mount(
        <SwipeCell
          content="内容"
          left={LEFT_ACTIONS}
          right={RIGHT_ACTIONS}
          opened={[true, false]}
          onChange={leftChange}
        />,
      );
      await nextTick();
      expect(leftChange).toHaveBeenCalledWith('left');
      expect(getTransform(leftCase)).toBe(`translate3d(${LEFT_WIDTH}px, 0, 0)`);

      // 两侧均为 true 时优先右侧
      const bothChange = vi.fn();
      const bothCase = mount(
        <SwipeCell
          content="内容"
          left={LEFT_ACTIONS}
          right={RIGHT_ACTIONS}
          opened={[true, true]}
          onChange={bothChange}
        />,
      );
      await nextTick();
      expect(bothChange).toHaveBeenCalledTimes(1);
      expect(bothChange).toHaveBeenCalledWith('right');
      expect(getTransform(bothCase)).toBe(`translate3d(-${RIGHT_WIDTH}px, 0, 0)`);

      // 从打开态切回 [false, false] 收起菜单
      await bothCase.setProps({ opened: [false, false] });
      expect(bothChange).toHaveBeenCalledTimes(2);
      expect(bothChange).toHaveBeenLastCalledWith(undefined);
      expect(getTransform(bothCase)).toBe('translate3d(0px, 0, 0)');
    });

    it('right[array]', () => {
      const wrapper = mount(<SwipeCell content="内容" right={RIGHT_ACTIONS} />);

      const $btns = wrapper.findAll('.t-swipe-cell__right .t-swipe-cell__content');
      expect($btns).toHaveLength(2);
      expect($btns[0].text()).toBe('编辑');
      expect($btns[1].text()).toBe('删除');
      // 未传 style 时兜底 height: 100%
      expect($btns[0].attributes('style')).toContain('height: 100%');
    });

    it('right[function]', () => {
      const wrapper = mount(<SwipeCell content="内容" right={() => <div class="custom-right-btn">右侧操作</div>} />);

      expect(wrapper.find('.t-swipe-cell__right .custom-right-btn').exists()).toBeTruthy();
    });

    it('right[slot]', async () => {
      const onSlotClick = vi.fn();
      const onClick = vi.fn();
      const wrapper = mount(SwipeCell, {
        props: {
          content: '内容',
          onClick,
        },
        slots: {
          right: () => (
            <div class="right-slot-btn" onClick={onSlotClick}>
              删除
            </div>
          ),
        },
      });

      expect(wrapper.find('.t-swipe-cell__right .right-slot-btn').exists()).toBeTruthy();

      // 插槽自定义内容与事件生效，组件 click 事件不触发（插槽写法组件不触发）
      await wrapper.find('.right-slot-btn').trigger('click');
      expect(onSlotClick).toHaveBeenCalledTimes(1);
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('events', () => {
    it('change', async () => {
      mockPanelWidth();
      const onChange = vi.fn();
      const wrapper = mount(<SwipeCell content="内容" left={LEFT_ACTIONS} right={RIGHT_ACTIONS} onChange={onChange} />);
      const $cell = wrapper.find('.t-swipe-cell');

      // 左滑打开右侧菜单
      await swipeBy($cell, -100);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith('right');

      // 已打开状态再次左滑（回弹）不重复触发
      await swipeBy($cell, -20);
      expect(onChange).toHaveBeenCalledTimes(1);

      // 点击操作项自动收回菜单
      await wrapper.find('.t-swipe-cell__right .edit-btn').trigger('click');
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenLastCalledWith(undefined);

      // 右滑打开左侧菜单
      await swipeBy($cell, 60);
      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onChange).toHaveBeenLastCalledWith('left');
    });

    it('click', async () => {
      mockPanelWidth();
      const onClick = vi.fn();
      const actionOnClick = vi.fn();
      const rightActions: SwipeActionItem[] = [{ text: '编辑' }, { text: '删除', onClick: actionOnClick }];
      const wrapper = mount(<SwipeCell content="内容" left={LEFT_ACTIONS} right={rightActions} onClick={onClick} />);

      // 点击操作项透传 action 与 source
      const $rightBtns = wrapper.findAll('.t-swipe-cell__right .t-swipe-cell__content');
      await $rightBtns[0].trigger('click');
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenLastCalledWith(expect.objectContaining({ text: '编辑' }), 'right');
      expect(actionOnClick).not.toHaveBeenCalled();

      // 操作项自带 onClick 时执行自身回调，组件 click 事件不再触发
      await $rightBtns[1].trigger('click');
      expect(actionOnClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledTimes(1);

      // 左侧操作项 source 为 left
      await wrapper.find('.t-swipe-cell__left .t-swipe-cell__content').trigger('click');
      expect(onClick).toHaveBeenCalledTimes(2);
      expect(onClick).toHaveBeenLastCalledWith(expect.objectContaining({ text: '选择' }), 'left');
    });

    it('dragend', async () => {
      mockPanelWidth();
      const onDragend = vi.fn();
      const wrapper = mount(<SwipeCell content="内容" right={RIGHT_ACTIONS} onDragend={onDragend} />);
      const $cell = wrapper.find('.t-swipe-cell');
      await nextTick();

      // 完整水平滑动松手后触发一次
      await swipeBy($cell, -100);
      expect(onDragend).toHaveBeenCalledTimes(1);

      // 轻微移动（未达到拖拽阈值）后抬起不触发
      await swipeBy($cell, -2);
      expect(onDragend).toHaveBeenCalledTimes(1);

      // 垂直滑动不触发
      await swipeBy($cell, 0, -50);
      expect(onDragend).toHaveBeenCalledTimes(1);

      // 禁用状态滑动不触发；恢复后正常触发且不继承禁用期间的拖拽状态
      await wrapper.setProps({ disabled: true });
      await swipeBy($cell, -100);
      expect(onDragend).toHaveBeenCalledTimes(1);
      await wrapper.setProps({ disabled: false });
      await swipeBy($cell, -100);
      expect(onDragend).toHaveBeenCalledTimes(2);
    });

    it('dragstart', async () => {
      mockPanelWidth();
      const onDragstart = vi.fn();
      const wrapper = mount(<SwipeCell content="内容" right={RIGHT_ACTIONS} onDragstart={onDragstart} />);
      const $cell = wrapper.find('.t-swipe-cell');
      await nextTick();

      // 位移未达到 distance(10px) 前不触发
      await trigger($cell, 'touchstart', 0, 0);
      await trigger($cell, 'touchmove', -8, 0);
      expect(onDragstart).not.toHaveBeenCalled();

      // 达到后首次触发，同一手势内继续移动不重复触发
      await trigger($cell, 'touchmove', -20, 0);
      expect(onDragstart).toHaveBeenCalledTimes(1);
      await trigger($cell, 'touchmove', -60, 0);
      await trigger($cell, 'touchend', -60, 0);
      expect(onDragstart).toHaveBeenCalledTimes(1);

      // 垂直滑动不触发
      await swipeBy($cell, 0, -50);
      expect(onDragstart).toHaveBeenCalledTimes(1);

      // 禁用状态不触发
      await wrapper.setProps({ disabled: true });
      await swipeBy($cell, -100);
      expect(onDragstart).toHaveBeenCalledTimes(1);
    });
  });

  describe('instanceFunctions', () => {
    it('showSure', async () => {
      mockPanelWidth();
      const wrapper = mount(<SwipeCell content="内容" right={RIGHT_ACTIONS} />);
      const instance = wrapper.vm as unknown as SwipeCellInstanceFunctions;
      await nextTick();

      // 未显示时二次确认内容为空，位移在菜单宽度之外
      const $sure = getSureRightEl(wrapper);
      expect($sure.textContent).toBe('');
      expect($sure.style.transform).toBe(`translate3d(${RIGHT_WIDTH}px, 0, 0)`);

      // string 内容直接渲染
      instance.showSure?.('确认删除？');
      await nextTick();
      await nextTick();
      expect($sure.textContent).toBe('确认删除？');
      expect($sure.style.transform).toBe('translate3d(0, 0, 0)');

      // TNode 函数内容渲染为节点
      instance.showSure?.(() => <div class="sure-fn">函数确认内容</div>);
      await nextTick();
      await nextTick();
      expect(wrapper.find('.sure-fn').exists()).toBeTruthy();
      expect($sure.textContent).toBe('函数确认内容');
    });

    // 源码缺口：showSure 的第二参数 onClick 被存入 handleSureClick ref，
    // 但 swipe-cell.tsx 中二次确认容器的 onClick 写作 `(e) => handleSureClick`（返回 ref 本身，未执行 .value），
    // 点击二次确认内容不会执行回调、也不会收起菜单，待源码修复后补充断言。
    it.todo('showSure onClick callback executes on sure content click');
  });
});

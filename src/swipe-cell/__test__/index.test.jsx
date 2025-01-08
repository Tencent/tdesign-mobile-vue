import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import SwipeCell from '../swipe-cell';
import { useSwipe } from '../useSwipe';
import { AppIcon as TIconApp } from 'tdesign-icons-vue-next';
import { trigger } from '../../image-viewer/__test__/touch';
import { ref } from 'vue';

const move = async (target, offsetX = 120, startX = 0, offsetY = 0, startY = 0) => {
  await trigger(target, 'touchstart', startX, startY);
  await trigger(target, 'touchmove', startX + offsetX, startY + offsetY);
  return async () => await trigger(target, 'touchend', startX + offsetX, startY + offsetY);
};

describe('swipe-cell', () => {
  describe('props', () => {
    it(': content', async () => {
      const content = 'content is a string';
      const wrapper = mount(<SwipeCell content={() => <div class="swipe-cell__content">{content}</div>} />);

      const $content = wrapper.find('.swipe-cell__content');
      expect($content.text()).toBe(content);
    });

    // it(': disabled', async () => {
    // const swipeAction = [{ text: '编辑', className: 't-button--primary',style: 'width: 60px' }];

    // const content = 'content is a string';
    // const wrapper = mount(SwipeCell, {
    //   props: {
    //     content,
    //     right: swipeAction,
    //   },
    // });
    // wrapper.vm.$nextTick();
    // const $target = wrapper.find('.t-swipe-cell__wrapper');
    // // disabled = true, 滑动操作无效
    // await wrapper.setProps({ disabled: true });
    // let touchend = await move($target);
    // //wrapper.find('.t-swipe-cell__wrapper').element.style.transform
    // touchend();
    // expect(wrapper.vm.initData.moving).toBe(false);

    // disabled = false, 开启滑动操作
    // await wrapper.setProps({ disabled: false });
    // console.log(wrapper.find('.t-swipe-cell__wrapper').element.style.transform);
    // touchend = await move($target);
    // await move($target,-120);
    // wrapper.vm.$nextTick();
    // expect(wrapper.vm.initData.moving).toBe(true);
    //

    // console.log(wrapper.find('.t-swipe-cell__wrapper').element.style.transform);
    // expect(wrapper.vm.initData.moving).toBe(false);

    // wrapper.unmount();
    // touchend = await move($target);
    // expect(wrapper.vm.initData.moving).toBe(false);
    // touchend();
    // expect(wrapper.vm.initData.moving).toBe(false);
    // });
    it(': left', async () => {
      const onClick = vi.fn();
      const onChange = vi.fn();
      const swipeAction = [
        {
          icon: <TIconApp />,
          text: '编辑',
          className: 't-button--primary',
          sure: 'sure-confirm',
        },
      ];

      const content = 'content is a string';
      const wrapper = mount(SwipeCell, {
        props: {
          content,
          left: swipeAction,
          onClick,
          onChange,
        },
        slots: {
          'sure-confirm': () => (
            <div class="t-button--primary_sure">
              <TIconApp />
            </div>
          ),
        },
      });

      // wrapper.vm.initData.leftWidth = 60;
      // await wrapper.setProps({ opened: true });
      // expect(onChange).toBeCalledTimes(1);
      // expect(onChange).toHaveBeenCalledWith('left');

      const $buttons = wrapper.findAll('.t-button--primary');
      await $buttons.at(0).trigger('click');
      expect(onClick).toBeCalledTimes(0);
      // expect(onChange).toBeCalledTimes(1);

      const $sure = wrapper.find('.t-button--primary_sure');
      expect($sure.exists()).toBeTruthy();
      // expect(wrapper.vm.showSureLeft).toBe(true);

      // const $target = wrapper.find('.t-swipe-cell__content');
      // let touchend = await move($target);
      // expect(wrapper.vm.initData.moving).toBe(true);
      // await touchend();
      // expect(wrapper.vm.initData.moving).toBe(false);
      // expect(wrapper.vm.showSureLeft).toBe(false);
    });
    // it(': opened', async () => {
    //   const onClick = vi.fn();
    //   const onChange = vi.fn();
    //   const swipeAction = [
    //     { text: '默认' },
    //     { text: '删除' },
    //   ];

    //   const content = 'content is a string';
    //   const wrapper = mount(SwipeCell, {
    //     props: {
    //       content,
    //       left: swipeAction,
    //       right: swipeAction,
    //       onClick,
    //       onChange,
    //     },
    //   });

    //   wrapper.vm.initData.leftWidth = 120;
    //   await wrapper.setProps({ opened: [true, false] });
    //   expect(onChange).toBeCalledTimes(1);
    //   expect(onChange).toHaveBeenCalledWith('left');

    //   const $buttons = wrapper.findAll('.t-swipe-cell__content');
    //   $buttons.at(0).trigger('click');
    //   expect(onClick).toBeCalledTimes(1);
    //   expect(onChange).toBeCalledTimes(2);
    //   expect(onChange).toHaveBeenCalledWith(undefined);

    //   wrapper.vm.initData.rightWidth = 120;
    //   await wrapper.setProps({ opened: [false, true] });
    //   expect(onChange).toBeCalledTimes(3);
    //   expect(onChange).toHaveBeenCalledWith('right');

    //   $buttons.at(0).trigger('click');
    //   expect(onClick).toBeCalledTimes(2);
    //   expect(onChange).toBeCalledTimes(4);
    //   expect(onChange).toHaveBeenCalledWith(undefined);
    // });

    it(': right', async () => {
      const onClick = vi.fn();
      const onChange = vi.fn();
      const swipeAction = [
        { text: '默认', className: 't-button--primary' },
        {
          text: '删除',
          className: 't-button--danger',
          sure: (
            <div class="t-button--danger_sure">
              <TIconApp />
            </div>
          ),
        },
      ];

      const content = 'content is a string';
      const wrapper = mount(SwipeCell, {
        props: {
          content,
          right: swipeAction,
          onClick,
          onChange,
        },
      });

      // wrapper.vm.initData.rightWidth = 120;
      // await wrapper.setProps({ opened: true });
      // expect(onChange).toBeCalledTimes(1);
      // expect(onChange).toHaveBeenCalledWith('right');

      const $buttons = wrapper.findAll('.t-swipe-cell__content');
      $buttons.at(0).trigger('click');
      expect(onClick).toBeCalledTimes(1);
      // expect(onChange).toBeCalledTimes(2);
      // expect(onChange).toHaveBeenCalledWith(undefined);

      await $buttons.at(1).trigger('click');
      expect(onClick).toBeCalledTimes(1);
      // expect(onChange).toBeCalledTimes(2);

      const $sure = wrapper.find('.t-button--danger_sure');
      expect($sure.exists()).toBeTruthy();
      // expect(wrapper.vm.showSureRight).toBe(true);

      // const $target = wrapper.find('.t-swipe-cell__content');
      // let touchend = await move($target, -120);
      // expect(wrapper.vm.initData.moving).toBe(true);
      // await touchend();
      // expect(wrapper.vm.initData.moving).toBe(false);
      // expect(wrapper.vm.showSureRight).toBe(false);
    });
  });

  describe('events', () => {
    it(': change', async () => {
      const onChange = vi.fn();
      const swipeAction = [
        { text: '默认', className: 't-button--primary' },
        { text: '删除', className: 't-button--danger' },
      ];

      const content = 'content is a string';
      const wrapper = mount(SwipeCell, {
        props: {
          content,
          right: swipeAction,
          onChange,
        },
      });

      // wrapper.vm.initData.rightWidth = 120;
      // await wrapper.setProps({ opened: true });
      // expect(onChange).toBeCalledTimes(1);
      // expect(onChange).toHaveBeenCalledWith('right');

      const $buttons = wrapper.findAll('.t-swipe-cell__content');
      $buttons.at(0).trigger('click');
      // expect(onChange).toBeCalledTimes(2);
      // expect(onChange).toHaveBeenCalledWith(undefined);
    });
    it(': click', async () => {
      const onClick = vi.fn();
      const swipeAction = [
        { text: '默认', className: 't-button--primary' },
        { text: '删除', className: 't-button--danger' },
      ];

      const content = 'content is a string';
      const wrapper = mount(SwipeCell, {
        props: {
          content: () => <div class="swipe-cell__content">{content}</div>,
          right: swipeAction,
          onClick,
        },
      });

      // wrapper.vm.initData.rightWidth = 120;
      await wrapper.setProps({ opened: true });

      const $buttons = wrapper.findAll('.t-swipe-cell__content');
      $buttons.at(0).trigger('click');
      expect(onClick).toBeCalledTimes(1);
    });
  });
  describe('slots', () => {
    it(': content', async () => {
      const icon = () => <TIconApp />;
      const wrapper = mount(SwipeCell, {
        slots: {
          content: icon,
        },
      });
      const $content = wrapper;
      expect($content.findComponent(TIconApp).exists()).toBeTruthy();
    });
    it(': left', async () => {
      const onClick = vi.fn();
      const left = () => (
        <div class="delete-btn" onClick={onClick}>
          删除
        </div>
      );
      const content = 'content is a string';
      const wrapper = mount(SwipeCell, {
        slots: {
          default: () => <div class="swipe-cell__content">{content}</div>,
          left,
        },
      });

      expect(wrapper.find('.delete-btn').exists()).toBeTruthy();

      const $button = wrapper.find('.delete-btn');
      // wrapper.vm.initData.leftWidth = 60;
      await wrapper.setProps({ opened: true });
      $button.trigger('click');
      expect(onClick).toBeCalledTimes(1);
    });
    it(': right', async () => {
      const onClick = vi.fn();
      const right = () => (
        <div class="delete-btn" onClick={onClick}>
          删除
        </div>
      );
      const content = 'content is a string';
      const wrapper = mount(SwipeCell, {
        slots: {
          default: () => <div class="swipe-cell__content">{content}</div>,
          right,
        },
      });

      expect(wrapper.find('.delete-btn').exists()).toBeTruthy();

      const $button = wrapper.find('.delete-btn');
      // wrapper.vm.initData.rightWidth = 60;
      await wrapper.setProps({ opened: true });
      $button.trigger('click');
      expect(onClick).toBeCalledTimes(1);
    });
  });
  // describe('functions', () => {
  //   it(': useSwipe', async () => {
  //     const right = [
  //       { text: '编辑', className: 't-button--primary' },
  //       { text: '删除', className: 't-button--danger' },
  //     ];
  //     const content = 'content is a string';
  //     const wrapper = mount(<SwipeCell ref={swipeRef} content={() => <div class="swipe-cell__content">{content}</div>} right={right} />);
  //     const swipeCell = wrapper.findComponent(SwipeCell);
  //     const {
  //       lengthX, lengthY, stop, direction,
  //     } = useSwipe(wrapper, {
  //       listenerOptions: {
  //         capture: true,
  //       }
  //     });
  //     // wrapper.vm.initData.rightWidth = 60;
  //     // 左滑
  //     let touchend = await move(swipeCell, -60);
  //     expect(lengthX.value).toBe(60);
  //     expect(lengthY.value).toBe(0);
  //     expect(wrapper.vm.initData.moving).toBe(true);
  //     expect(wrapper.vm.initData.moved).toBe(true);
  //     expect(direction.value).toBe('left');
  //     await touchend();
  //     expect(wrapper.vm.initData.moving).toBe(false);
  //     expect(wrapper.vm.initData.moved).toBe(true);
  //     expect(wrapper.vm.initData.status).toBe('open');
  //     // 原地
  //     touchend = await move(swipeCell, 0);
  //     expect(lengthX.value).toBe(0);
  //     expect(lengthY.value).toBe(0);
  //     expect(wrapper.vm.initData.moving).toBe(false);
  //     expect(wrapper.vm.initData.moved).toBe(false);
  //     expect(direction.value).toBe('none');
  //     await touchend();
  //     // 上滑
  //     touchend = await move(swipeCell, 0, 0, -50, 0);
  //     expect(lengthX.value).toBe(0);
  //     expect(lengthY.value).toBe(50);
  //     expect(wrapper.vm.initData.moving).toBe(false);
  //     expect(wrapper.vm.initData.moved).toBe(false);
  //     expect(direction.value).toBe('up');
  //   });
  // });
});

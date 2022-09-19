import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import SwipeCell from '../swipe-cell.vue';
import Button from '../../button/button.vue';
import { AppIcon as TIconApp } from 'tdesign-icons-vue-next';
import { trigger } from '../../image-viewer/__test__/touch';

const move = async (target) => {
  await trigger(target, 'touchstart', 0, 0);
  await trigger(target, 'touchmove', 120, 0);
  await trigger(target, 'touchend', 120, 0);
};

describe('swipe-cell', () => {
  describe('props', () => {
    it(': content', async () => {
      const handleEdit = vi.fn();
      const handleDelete = vi.fn();
      const right = [
        { text: '编辑', className: 't-button--primary', onClick: handleEdit },
        { text: '删除', className: 't-button--danger', onClick: handleDelete },
      ];
      const expanded = 'right';
      const content = 'content is a string';
      const wrapper = mount(<SwipeCell content={content} expanded={expanded} right={right}/>);
      // expect(wrapper).toMatchSnapshot()

      // content
      const $content = wrapper.find('.t-swipe-cell__content');
      expect($content.text()).toBe(content);

      // right：
      const $right = wrapper.find('.t-swipe-cell__right');
      const $buttons = wrapper.findAllComponents(Button);
      expect($buttons).toHaveLength(right.length);
      right.map(async (item, index)=> {
        expect($buttons.at(index).text()).toBe(right[index].text);
      });

      // handleEdit
      wrapper.find(`.${right[0].className}`).trigger('click');
      expect(handleEdit).toHaveBeenCalledTimes(1)
      // handleDelete
      wrapper.find(`.${right[1].className}`).trigger('click');
      expect(handleDelete).toHaveBeenCalledTimes(1)

    });

    it(': left', async () => {
      const onClick = vi.fn();
      let SwipeDirection;
      const onChange = vi.fn((direction) => {
        SwipeDirection = direction;
      });
      const swipeAction = [
        { text: '编辑', className: 't-button--primary'}
      ];

      const content = 'content is a string';
      const wrapper = mount(SwipeCell, {
        props: {
          content,
          left: swipeAction,
          onClick,
          onChange
        },
      });

      wrapper.vm.initData.leftWidth = 40;
      wrapper.vm.initData.status = 'open';
      await wrapper.setProps({ expanded: 'left' });

      const $buttons = wrapper.findAllComponents(Button);
      $buttons.at(0).trigger('click');
      expect(onClick).toBeCalledTimes(1);

      expect(onChange).toBeCalledTimes(1);
      expect(SwipeDirection).toBe(undefined);

      const $target = wrapper.find('.t-swipe-cell__content');
      // disabled = true, 滑动操作无效
      await wrapper.setProps({ disabled: true });
      move($target);

      // disabled = false, 开启滑动操作
      await wrapper.setProps({ disabled: false });
      move($target);
      expect(wrapper.vm.initData.moving).toBe(true);
    })

    it(': right', async () => {
      const onClick = vi.fn();
      let SwipeDirection;
      const onChange = vi.fn((direction) => {
        SwipeDirection = direction;
      });
      const swipeAction = [
        { text: '默认', className: 't-button--primary'},
        { text: '删除', className: 't-button--danger'},
      ];

      const content = 'content is a string';
      const wrapper = mount(SwipeCell, {
        props: {
          content,
          right: swipeAction,
          onClick,
          onChange
        },
      });

      wrapper.vm.initData.rightWidth = 40;
      await wrapper.setProps({ expanded: 'right' });
      expect(onChange).toBeCalledTimes(1);
      expect(SwipeDirection).toBe('right');

      const $buttons = wrapper.findAllComponents(Button);
      $buttons.at(0).trigger('click');
      expect(onClick).toBeCalledTimes(1);

      $buttons.at(1).trigger('click');
      expect(onClick).toBeCalledTimes(2);
      expect(onChange).toBeCalledTimes(2);
      expect(SwipeDirection).toBe(undefined);

      const $target = wrapper.find('.t-swipe-cell__content');
      move($target);
      expect(wrapper.vm.initData.moving).toBe(true);
    })


  });

  describe('slots', () => {
    it(': content', async () => {
      const icon = () => <TIconApp />;
      const wrapper = mount(SwipeCell, {
        slots: {
          content: icon,
        },
      });
      const $content = wrapper.find('.t-swipe-cell__content');
      expect($content.findComponent(TIconApp).exists()).toBeTruthy();
    });
  })
})

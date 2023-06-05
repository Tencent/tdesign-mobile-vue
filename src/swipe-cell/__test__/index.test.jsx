import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import SwipeCell from '../swipe-cell.vue';
import { AppIcon as TIconApp } from 'tdesign-icons-vue-next';
import { trigger } from '../../image-viewer/__test__/touch';

const move = async (target, offset = 120, start = 0) => {
  await trigger(target, 'touchstart', start, 0);
  await trigger(target, 'touchmove', start + offset, 0);
  return async () => await trigger(target, 'touchend', start + offset, 0);
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
      const content = 'content is a string';
      const wrapper = mount(<SwipeCell content={() => <div class="swipe-cell__content">{content}</div>} right={right} />);

      // content
      const $content = wrapper.find('.swipe-cell__content');
      expect($content.text()).toBe(content);

      // right：
      const $right = wrapper.findAll('.t-swipe-cell__right');
      const $buttons = wrapper.findAll('.t-swipe-cell__content');
      console.log($buttons.length, right.length)
      expect($buttons).toHaveLength(right.length);

      right.forEach((item, index) => {
        expect($buttons.at(index).find('.t-swipe-cell__text').text()).toBe(right[index].text);
      });

      wrapper.vm.initData.rightWidth = 120;
      await wrapper.setProps({ opened: true });
      // handleEdit
      wrapper.find(`.${right[0].className}`).trigger('click');
      expect(handleEdit).toHaveBeenCalledTimes(1);

      await wrapper.setProps({ opened: false });
      wrapper.vm.initData.rightWidth = 120;
      await wrapper.setProps({ opened: true });
      // handleDelete
      wrapper.find(`.${right[1].className}`).trigger('click');
      expect(handleDelete).toHaveBeenCalledTimes(1);
    });

    it(': left', async () => {
      const onClick = vi.fn();
      const onChange = vi.fn();
      const swipeAction = [{ text: '编辑', className: 't-button--primary' }];

      const content = 'content is a string';
      const wrapper = mount(SwipeCell, {
        props: {
          content,
          left: swipeAction,
          onClick,
          onChange,
        },
      });

      wrapper.vm.initData.leftWidth = 60;
      await wrapper.setProps({ opened: true });
      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith('left');

      const $buttons = wrapper.findAll('.t-swipe-cell__content');
      $buttons.at(0).trigger('click');
      expect(onClick).toBeCalledTimes(1);
      expect(onChange).toBeCalledTimes(2);
      expect(onChange).toHaveBeenCalledWith(undefined);

      const $target = wrapper.find('.t-swipe-cell__content');
      // disabled = true, 滑动操作无效
      await wrapper.setProps({ disabled: true });
      let touchend = await move($target);
      expect(wrapper.vm.initData.moving).toBe(false);
      touchend();
      expect(wrapper.vm.initData.moving).toBe(false);

      // disabled = false, 开启滑动操作
      await wrapper.setProps({ disabled: false });
      touchend = await move($target);
      expect(wrapper.vm.initData.moving).toBe(true);
      touchend();
      expect(wrapper.vm.initData.moving).toBe(false);
    });

    it(': right', async () => {
      const onClick = vi.fn();
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
          onClick,
          onChange,
        },
      });

      wrapper.vm.initData.rightWidth = 120;
      await wrapper.setProps({ opened: true });
      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith('right');

      const $buttons = wrapper.findAll('.t-swipe-cell__content');
      $buttons.at(0).trigger('click');
      expect(onClick).toBeCalledTimes(1);
      expect(onChange).toBeCalledTimes(2);
      expect(onChange).toHaveBeenCalledWith(undefined);

      await wrapper.setProps({ opened: false });
      wrapper.vm.initData.rightWidth = 120;
      await wrapper.setProps({ opened: true });
      expect(onChange).toBeCalledTimes(3);
      expect(onChange).toHaveBeenCalledWith('right');

      $buttons.at(1).trigger('click');
      expect(onClick).toBeCalledTimes(2);
      expect(onChange).toBeCalledTimes(4);
      expect(onChange).toHaveBeenCalledWith(undefined);

      const $target = wrapper.find('.t-swipe-cell__content');
      let touchend = await move($target, 9);
      expect(wrapper.vm.initData.moving).toBe(false);
      await touchend();
      expect(wrapper.vm.initData.moving).toBe(false);

      touchend = await move($target);
      expect(wrapper.vm.initData.moving).toBe(true);
      await touchend();
      expect(wrapper.vm.initData.moving).toBe(false);
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
  });
});

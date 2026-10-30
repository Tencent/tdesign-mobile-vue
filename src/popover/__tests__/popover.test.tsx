import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { nextTick } from 'vue';
import Popover from '../popover';

describe('Popover', () => {
  describe('props', () => {
    it('closeOnClickOutside[boolean]', async () => {
      const onVisibleChange = vi.fn();
      const wrapper = mount(() => (
        <Popover
          defaultVisible
          content="气泡内容"
          onVisibleChange={onVisibleChange}
          v-slots={{ default: () => '触发元素' }}
        />
      ));
      expect(wrapper.find('.t-popover').exists()).toBeTruthy();

      // 点击气泡与触发元素以外的区域后关闭
      document.body.dispatchEvent(new Event('touchstart', { bubbles: true }));
      await nextTick();
      expect(onVisibleChange).toHaveBeenCalledWith(false);
      expect(wrapper.find('.t-popover').exists()).toBe(false);
    });

    it('content[string]', () => {
      const wrapper = mount(() => <Popover visible={true} content="气泡内容" />);
      expect(wrapper.find('.t-popover__content').text()).toBe('气泡内容');
    });

    it('content[function]', () => {
      const wrapper = mount(() => <Popover visible={true} content={() => '函数气泡内容'} />);
      expect(wrapper.find('.t-popover__content').text()).toBe('函数气泡内容');
    });

    it('placement[top/left/right/bottom/top-left/top-right/bottom-left/bottom-right/left-top/left-bottom/right-top/right-bottom]', () => {
      const wrapper = mount(() => <Popover visible={true} content="气泡内容" placement="bottom-left" />);
      // data-popper-placement 的实际值由 popper 运行时基于真实布局计算，jsdom 下只能断言属性存在
      expect(wrapper.find('.t-popover').attributes('data-popper-placement')).toBeDefined();
    });

    it('showArrow[boolean]', () => {
      const wrapper = mount(() => <Popover visible={true} content="气泡内容" />);
      expect(wrapper.find('.t-popover__arrow').exists()).toBeTruthy();

      const wrapper2 = mount(() => <Popover visible={true} content="气泡内容" showArrow={false} />);
      expect(wrapper2.find('.t-popover__arrow').exists()).toBeFalsy();
    });

    it('theme[dark/light/brand/success/warning/error]', () => {
      const wrapper = mount(() => <Popover visible={true} content="气泡内容" theme="light" />);
      expect(wrapper.find('.t-popover--light').exists()).toBeTruthy();
    });

    it('triggerElement[function]', () => {
      const wrapper = mount(() => <Popover content="气泡内容" triggerElement={() => '点击触发'} />);
      expect(wrapper.find('.t-popover__wrapper').text()).toBe('点击触发');
    });

    it('visible[boolean]', () => {
      const wrapper = mount(() => <Popover visible={false} content="气泡内容" />);
      expect(wrapper.find('.t-popover').exists()).toBeFalsy();

      const wrapper2 = mount(() => <Popover visible={true} content="气泡内容" />);
      expect(wrapper2.find('.t-popover').exists()).toBeTruthy();
    });

    it('defaultVisible[boolean]', () => {
      const wrapper = mount(() => <Popover defaultVisible content="气泡内容" />);
      expect(wrapper.find('.t-popover').exists()).toBeTruthy();
    });
  });

  describe('slots', () => {
    it('default', () => {
      const wrapper = mount(() => (
        <Popover content="气泡内容" v-slots={{ default: () => <button class="trigger-btn">触发按钮</button> }} />
      ));
      expect(wrapper.find('.t-popover__wrapper .trigger-btn').exists()).toBeTruthy();
    });
  });

  describe('events', () => {
    it('visibleChange', async () => {
      const onVisibleChange = vi.fn();
      const wrapper = mount(() => (
        <Popover content="气泡内容" onVisibleChange={onVisibleChange} v-slots={{ default: () => '触发元素' }} />
      ));
      expect(wrapper.find('.t-popover').exists()).toBeFalsy();

      await wrapper.find('.t-popover__wrapper').trigger('click');
      expect(wrapper.find('.t-popover').exists()).toBeTruthy();
      expect(onVisibleChange).toHaveBeenCalledTimes(1);
      expect(onVisibleChange).toHaveBeenLastCalledWith(true);

      await wrapper.find('.t-popover__wrapper').trigger('click');
      expect(wrapper.find('.t-popover').exists()).toBeFalsy();
      expect(onVisibleChange).toHaveBeenCalledTimes(2);
      expect(onVisibleChange).toHaveBeenLastCalledWith(false);
    });
  });

  describe('scenarios', () => {
    it('click trigger toggles popover', async () => {
      const wrapper = mount(() => <Popover content="气泡内容" v-slots={{ default: () => '触发元素' }} />);
      expect(wrapper.find('.t-popover').exists()).toBeFalsy();

      await wrapper.find('.t-popover__wrapper').trigger('click');
      expect(wrapper.find('.t-popover').exists()).toBeTruthy();

      await wrapper.find('.t-popover__wrapper').trigger('click');
      expect(wrapper.find('.t-popover').exists()).toBeFalsy();
    });
  });
});

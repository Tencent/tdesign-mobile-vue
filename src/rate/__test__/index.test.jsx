import { ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { StarFilledIcon, StarIcon } from 'tdesign-icons-vue-next';
import Rate from '../rate.vue';
import { trigger } from '../../image-viewer/__test__/touch';

const move = async (target) => {
  await trigger(target, 'touchstart', 0, 0);
  await trigger(target, 'touchmove', 1, 0);
  await trigger(target, 'touchend', 1, 0);
};

const prefix = 't';
const name = `${prefix}-rate`;

describe('Rate', () => {
  describe('Rate', () => {
    it('create', async () => {
      const wrapper = mount(() => <Rate />);
      expect(wrapper.classes()).toContain('t-rate');
      const items = wrapper.findAll('.t-rate--item');
      expect(items.length).toBe(5);
      const icon = wrapper.findComponent(StarFilledIcon);
      expect(icon.exists()).toBeTruthy();
    });

    it(': count', async () => {
      const wrapper = mount(() => <Rate count={10} />);
      const items = wrapper.findAll('.t-rate--item');
      expect(items.length).toBe(10);
    });

    it(': gap', async () => {
      const wrapper = mount(() => <Rate gap={10} />);
      const items = wrapper.findAll('.t-rate--item');
      for (let i = 0; i < items.length - 1; i++) {
        expect(getComputedStyle(items[i].element, null).marginRight).toBe('10px');
      }
      expect(getComputedStyle(items[items.length - 1].element, null).marginRight).toBe('0px');
    });

    it(': variant', async () => {
      const wrapper = mount(() => <Rate variant="outline" />);
      const icon = wrapper.findComponent(StarIcon);
      expect(icon.exists()).toBeTruthy();
    });

    it(': allowHalf', async () => {
      const value = ref(0);
      const showText = true;
      const texts = ['很差', '差', '一般', '好评', '优秀'];
      const onChange = vi.fn();
      const wrapper = mount(() => <Rate v-model={value.value} allowHalf showText texts={texts} onChange={onChange} />);
      const leftIcons = wrapper.findAll('.t-rate--icon-left');
      const rightIcons = wrapper.findAll('.t-rate--icon-right');
      await leftIcons[0].trigger('click');
      let popover = wrapper.find('.t-rate--popover')
      expect(popover.exists()).toBeTruthy();
      let popoverItem = popover.findAll('.t-rate--popover-item');
      await popoverItem[0].trigger('click');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(leftIcons[0].exists()).toBeTruthy();
      expect(value.value).toBe(0.5);
      await rightIcons[0].trigger('click');
      popover = wrapper.find('.t-rate--popover')
      expect(popover.exists()).toBeTruthy();
      popoverItem = popover.findAll('.t-rate--popover-item');
      await popoverItem[1].trigger('click');
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(rightIcons[0].exists()).toBeTruthy();
      expect(value.value).toBe(1);
      const $target = wrapper.find(`.${name}--list`);
      await move($target);
      expect(onChange).toHaveBeenCalledTimes(3);
    });

    it(': clearable', async () => {
      const value = ref(1);
      const wrapper = mount(() => <Rate v-model={value.value} clearable />);
      const icons = wrapper.findAll('.t-rate--icon');
      await icons[1].trigger('click');
      expect(value.value).toBe(2);
      await icons[1].trigger('click');
      expect(value.value).toBe(0);
    });

    it(': showText && texts', async () => {
      const defaultValue = 3;
      const showText = true;
      const texts = ['很差', '差', '一般', '好评', '优秀'];
      const onChange = vi.fn();
      const wrapper = mount(Rate, {
        props: {
          defaultValue,
          showText,
          texts,
          onChange,
        },
      });
      const $text = wrapper.find(`.${name}--text`);
      expect($text.text()).toEqual(texts[defaultValue - 1]);

      const icons = wrapper.findAll(`.${name}--icon`);
      const index = 3;
      await icons[index].trigger('click');
      expect(onChange).toHaveBeenLastCalledWith(index + 1);
    });

    it(': disabled', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Rate, {
        props: {
          disabled: true,
          onChange,
        },
      });
      // disabled = true, 不触发 change， touch 无效
      const $target = wrapper.find(`.${name}--list`);
      const icons = wrapper.findAll(`.${name}--icon`);
      const index = 3;

      await icons[index].trigger('click');
      expect(onChange).toHaveBeenCalledTimes(0);
      await move($target);
      expect(onChange).toHaveBeenCalledTimes(0);

      // disabled = false
      await wrapper.setProps({
        disabled: false,
      });

      await icons[index].trigger('click');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith(index + 1);
      await move($target);
      expect(onChange).toHaveBeenCalledTimes(2);
    });
  });
});

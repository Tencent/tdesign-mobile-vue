import { ref, nextTick } from 'vue';
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
      expect(wrapper.classes()).toContain(`${name}`);
      const items = wrapper.findAll(`.${name}__icon`);
      expect(items.length).toBe(5);
      const icon = wrapper.findComponent(StarIcon);
      expect(icon.exists()).toBeTruthy();
    });

    it(': count', async () => {
      const wrapper = mount(() => <Rate count={10} />);
      const items = wrapper.findAll(`.${name}__icon`);
      expect(items.length).toBe(10);
    });

    it(': gap', async () => {
      const wrapper = mount(() => <Rate gap={10} />);
      const items = wrapper.findAll(`.${name}__icon`);
      for (let i = 0; i < items.length - 1; i++) {
        expect(getComputedStyle(items[i].element, null).marginRight).toBe('10px');
      }
      expect(getComputedStyle(items[items.length - 1].element, null).marginRight).toBe('0px');
    });

    it(': allowHalf', async () => {
      const value = ref(0);
      const showText = true;
      const texts = ['很差', '差', '一般', '好评', '优秀'];
      const onChange = vi.fn();
      const wrapper = mount(() => <Rate v-model={value.value} allowHalf showText texts={texts} onChange={onChange} />);
      const icons = wrapper.findAll(`.${name}__icon`);
      await icons[0].trigger('click');
      let tips = wrapper.find(`.${name}__tips`)
      expect(tips.exists()).toBeTruthy();
      let tipsItem = tips.findAll(`.${name}__tips-item`);
      await tipsItem[0].trigger('click');
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(icons[0].exists()).toBeTruthy();
      value.value = 0.5;
      await nextTick()
      const half = wrapper.findAll(`.${name}__icon-left--selected`);
      expect(half.length).toBe(1);
      const $target = wrapper.find(`.${name}__wrapper`);
      await move($target);
      expect(onChange).toHaveBeenCalledTimes(2);
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
      const $text = wrapper.find(`.${name}__text`);
      expect($text.text()).toEqual(texts[defaultValue - 1]);
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
      const $target = wrapper.find(`.${name}__wrapper`);
      const icons = wrapper.findAll(`.${name}__icon`);
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
      // expect(onChange).toHaveBeenLastCalledWith(index + 1);
      await move($target);
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });
});

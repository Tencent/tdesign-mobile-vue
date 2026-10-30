import { ref, nextTick, markRaw } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { ThumbUpIcon, ThumbDownIcon, StarFilledIcon } from 'tdesign-icons-vue-next';
import Rate from '../rate';
import { trigger } from '../../image-viewer/__tests__/touch';

const move = async (target) => {
  await trigger(target, 'touchstart', 10, 10);
  await trigger(target, 'touchmove', 120, 10);
  await trigger(target, 'touchend', 120, 10);
};

const prefix = 't';
const name = `${prefix}-rate`;

describe('Rate', () => {
  describe('props', () => {
    it('allowHalf[boolean]', async () => {
      const value = ref(0);
      const texts = ['很差', '差', '一般', '好评', '优秀'];
      const onChange = vi.fn();
      const wrapper = mount(() => <Rate v-model={value.value} allowHalf showText texts={texts} onChange={onChange} />);
      const icons = wrapper.findAll(`.${name}__icon`);
      await icons[0].trigger('click');
      const tips = wrapper.find(`.${name}__tips`);
      expect(tips.exists()).toBeTruthy();
      const tipsItem = tips.findAll(`.${name}__tips-item`);
      await tipsItem[0].trigger('click');
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(icons[0].exists()).toBeTruthy();
      value.value = 0.5;
      await nextTick();
      const half = wrapper.findAll(`.${name}__icon-left--selected`);
      expect(half.length).toBe(1);
      const $target = wrapper.find(`.${name}__wrapper`);
      await move($target);
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it('count[number]', async () => {
      const wrapper = mount(() => <Rate count={10} />);
      const items = wrapper.findAll(`.${name}__icon`);
      expect(items.length).toBe(10);
    });

    it('disabled[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(<Rate disabled onChange={onChange} />);
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
      await move($target);
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('gap[number]', async () => {
      const wrapper = mount(() => <Rate gap={10} />);
      const items = wrapper.findAll(`.${name}__icon`);
      for (let i = 0; i < items.length - 1; i++) {
        expect(getComputedStyle(items[i].element, null).marginRight).toBe('10px');
      }
      expect(getComputedStyle(items[items.length - 1].element, null).marginRight).toBe('0px');
    });

    it('gap[string]', async () => {
      const wrapper = mount(() => <Rate gap="10" />);
      const items = wrapper.findAll(`.${name}__icon`);
      for (let i = 0; i < items.length - 1; i++) {
        expect(getComputedStyle(items[i].element, null).marginRight).toBe('10px');
      }
    });

    it('icon & color', async () => {
      const wrapper = mount(Rate, {
        props: {
          value: 3,
          icon: [markRaw(ThumbUpIcon), markRaw(ThumbDownIcon)],
          color: ['#ED7B2F', '#E3E6EB'],
        },
      });
      const $selectIcon = wrapper.findComponent(ThumbUpIcon);
      expect($selectIcon.exists()).toBeTruthy();

      const $unselectIcon = wrapper.findComponent(ThumbDownIcon);
      expect($unselectIcon.exists()).toBeTruthy();
    });

    it('placement[default]', async () => {
      const wrapper = mount(() => <Rate />);
      const icons = wrapper.findAll(`.${name}__icon`);
      await icons[0].trigger('click');
      const tips = wrapper.find(`.${name}__tips`);
      expect(tips.exists()).toBeTruthy();
      const placement = wrapper.find(`.${name}__tips--top`);
      expect(placement.exists()).toBeTruthy();
    });

    it('placement[top]', async () => {
      const wrapper = mount(() => <Rate placement="top" />);
      const icons = wrapper.findAll(`.${name}__icon`);
      await icons[0].trigger('click');
      const tips = wrapper.find(`.${name}__tips`);
      expect(tips.exists()).toBeTruthy();
      const placement = wrapper.find(`.${name}__tips--top`);
      expect(placement.exists()).toBeTruthy();
    });

    it('placement[bottom]', async () => {
      const wrapper = mount(() => <Rate placement="bottom" />);
      const icons = wrapper.findAll(`.${name}__icon`);
      await icons[0].trigger('click');
      const tips = wrapper.find(`.${name}__tips`);
      expect(tips.exists()).toBeTruthy();
      const placement = wrapper.find(`.${name}__tips--bottom`);
      expect(placement.exists()).toBeTruthy();
    });

    it('placement[empty]', async () => {
      const wrapper = mount(() => <Rate placement="" />);
      const icons = wrapper.findAll(`.${name}__icon`);
      await icons[0].trigger('click');
      const tips = wrapper.find(`.${name}__tips`);
      expect(tips.exists()).toBeFalsy();
    });

    it('showText & texts', async () => {
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

    it('size[string]', async () => {
      const wrapper = mount(<Rate size={'20px'} icon={[() => markRaw(ThumbUpIcon), () => markRaw(ThumbDownIcon)]} />);
      const items = wrapper.findAll(`.${name}__icon`);
      for (let i = 0; i < items.length; i++) {
        expect(getComputedStyle(items[i].element, null).fontSize).toBe('20px');
      }
    });

    it('value[number]', async () => {
      const onChange = vi.fn();
      const original = window.HTMLElement.prototype.getBoundingClientRect;
      // mock 容器宽度，使点击坐标可换算为确定分值
      window.HTMLElement.prototype.getBoundingClientRect = () => ({ left: 0, right: 343, width: 343 });

      try {
        const wrapper = mount(Rate, {
          props: {
            value: 3,
            onChange,
          },
        });
        expect(wrapper.findAll(`.${name}__wrapper .${name}__icon--selected`)).toHaveLength(3);

        // 受控模式：外部未更新 value 时，点击仅抛出 onChange，选中态保持不变
        await wrapper.findAll(`.${name}__icon`)[4].trigger('click', { pageX: 300 });
        expect(onChange).toHaveBeenCalledWith(5);
        expect(wrapper.findAll(`.${name}__wrapper .${name}__icon--selected`)).toHaveLength(3);
      } finally {
        window.HTMLElement.prototype.getBoundingClientRect = original;
      }
    });

    it('defaultValue[number]', async () => {
      const onChange = vi.fn();
      const original = window.HTMLElement.prototype.getBoundingClientRect;
      window.HTMLElement.prototype.getBoundingClientRect = () => ({ left: 0, right: 343, width: 343 });

      try {
        const wrapper = mount(Rate, {
          props: {
            defaultValue: 2,
            onChange,
          },
        });
        expect(wrapper.findAll(`.${name}__wrapper .${name}__icon--selected`)).toHaveLength(2);

        // 非受控模式：点击后内部值自行更新
        await wrapper.findAll(`.${name}__icon`)[4].trigger('click', { pageX: 300 });
        expect(onChange).toHaveBeenCalledWith(5);
        expect(wrapper.findAll(`.${name}__wrapper .${name}__icon--selected`)).toHaveLength(5);
      } finally {
        window.HTMLElement.prototype.getBoundingClientRect = original;
      }
    });
  });

  describe('scenarios', () => {
    it('default render and touch interactions', async () => {
      const wrapper = mount(() => <Rate />);
      expect(wrapper.classes()).toContain(`${name}`);
      const items = wrapper.findAll(`.${name}__icon`);
      expect(items.length).toBe(5);
      const icon = wrapper.findComponent(StarFilledIcon);
      expect(icon.exists()).toBeTruthy();

      const $target = wrapper.find(`.${name}__wrapper`);
      await move($target);
      const icons = wrapper.findAll(`.${name}__icon`);
      await icons[4].trigger('click'); // hideTips(true)

      await trigger($target, 'touchstart', 200, 10);
      await trigger($target, 'touchmove', 220, 10);
      await trigger($target, 'touchend', 220, 10);
      await trigger($target, 'touchcancel', 220, 10); // onTouchEnd
    });
  });
});

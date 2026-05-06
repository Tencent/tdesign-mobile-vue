import { ref, h } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Segmented from '../segmented';
import { HomeIcon } from 'tdesign-icons-vue-next';

const prefix = 't';
const name = `${prefix}-segmented`;

describe('Segmented', () => {
  describe('props', () => {
    it(':options with strings', async () => {
      const wrapper = mount(Segmented, {
        props: {
          options: ['选项一', '选项二', '选项三'],
          defaultValue: '选项一',
        },
      });

      const $items = wrapper.findAll(`.${name}__item`);
      expect($items.length).toBe(3);
      expect($items[0].classes()).toContain(`${name}__item--active`);
    });

    it(':options with numbers', async () => {
      const wrapper = mount(Segmented, {
        props: {
          options: [1, 2, 3],
          defaultValue: 2,
        },
      });

      const $items = wrapper.findAll(`.${name}__item`);
      expect($items.length).toBe(3);
      expect($items[1].classes()).toContain(`${name}__item--active`);
    });

    it(':options with objects', async () => {
      const wrapper = mount(Segmented, {
        props: {
          options: [
            { value: 0, label: 'home' },
            { value: 1, label: 'category' },
            { value: 2, label: 'mine' },
          ],
          defaultValue: 1,
        },
      });

      const $items = wrapper.findAll(`.${name}__item`);
      expect($items.length).toBe(3);
      expect($items[1].classes()).toContain(`${name}__item--active`);
    });

    it(':block', () => {
      const wrapper = mount(Segmented, {
        props: {
          block: true,
          options: ['选项一', '选项二'],
        },
      });

      expect(wrapper.classes()).toContain(`${name}--block`);
    });

    it(':disabled', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Segmented, {
        props: {
          disabled: true,
          options: ['选项一', '选项二', '选项三'],
          defaultValue: '选项一',
          onChange,
        },
      });

      const $items = wrapper.findAll(`.${name}__item`);
      expect($items[0].classes()).toContain(`${name}__item--disabled`);
      expect($items[1].classes()).toContain(`${name}__item--disabled`);

      // 点击禁用项不应触发 change 事件
      await $items[1].trigger('click');
      expect(onChange).not.toBeCalled();
    });

    it(':disabled individual item', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Segmented, {
        props: {
          options: [
            { value: 0, label: '周一' },
            { value: 1, label: '周二' },
            { value: 2, label: '周三', disabled: true },
          ],
          defaultValue: 0,
          onChange,
        },
      });

      const $items = wrapper.findAll(`.${name}__item`);
      expect($items[2].classes()).toContain(`${name}__item--disabled`);

      // 点击禁用项不应触发 change 事件
      await $items[2].trigger('click');
      expect(onChange).not.toBeCalled();

      // 点击非禁用项应触发 change 事件
      await $items[1].trigger('click');
      expect(onChange).toBeCalledTimes(1);
    });
  });

  describe('events', () => {
    it(':change', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Segmented, {
        props: {
          options: ['选项一', '选项二', '选项三'],
          defaultValue: '选项一',
          onChange,
        },
      });

      const $items = wrapper.findAll(`.${name}__item`);
      await $items[1].trigger('click');

      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toBeCalledWith('选项二', { value: '选项二', label: '选项二' });
    });

    it('v-model', async () => {
      const value = ref('选项一');
      const wrapper = mount(() => <Segmented v-model={value.value} options={['选项一', '选项二', '选项三']} />);

      const $items = wrapper.findAll(`.${name}__item`);
      expect($items[0].classes()).toContain(`${name}__item--active`);

      await $items[1].trigger('click');
      expect(value.value).toBe('选项二');
      expect($items[1].classes()).toContain(`${name}__item--active`);
    });
  });

  describe('rendering', () => {
    it('renders thumb element', () => {
      const wrapper = mount(Segmented, {
        props: {
          options: ['选项一', '选项二'],
          defaultValue: '选项一',
        },
      });

      const $thumb = wrapper.find(`.${name}__thumb`);
      expect($thumb.exists()).toBeTruthy();
    });

    it('updates thumb on value change', async () => {
      const value = ref('选项一');
      const wrapper = mount(() => <Segmented v-model={value.value} options={['选项一', '选项二', '选项三']} />);

      const $thumb = wrapper.find(`.${name}__thumb`);
      expect($thumb.exists()).toBeTruthy();

      // 切换选项
      const $items = wrapper.findAll(`.${name}__item`);
      await $items[2].trigger('click');

      // 等待 DOM 更新
      await wrapper.vm.$nextTick();
      expect(value.value).toBe('选项三');
    });
  });
});

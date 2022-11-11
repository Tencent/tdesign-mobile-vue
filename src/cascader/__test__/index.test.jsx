import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Cascader from '../cascader.vue';
import { AppIcon as TIconApp, CloseIcon } from 'tdesign-icons-vue-next';
import CascaderItem from '../cascader-item.vue';
import CascaderSteps from '../steps.vue';

const prefix = 't';
const name = `${prefix}-cascader`;

const TEXT = 'tdesign-mobile-vue';
const iconFunc = () => h(TIconApp);
const options = [
  {
    label: '广东省',
    value: 'gd',
    children: [
      {
        label: '深圳市',
        value: 'sz',
        children: [
          {
            label: '南山区',
            value: 'ns',
          },
          {
            label: '福田区',
            value: 'ft',
          },
        ],
      },
      {
        label: '广州市',
        value: 'gz',
        children: [
          {
            label: '白云区',
            value: 'by',
          },
          {
            label: '海珠区',
            value: 'hz',
          },
        ],
      },
    ],
  },
  {
    label: '福建省',
    value: 'fj',
    children: [
      {
        label: '厦门市',
        value: 'xm',
      },
      {
        label: '泉州市',
        value: 'qz',
      },
    ],
  },
];
describe('cascader', () => {
  describe('props', () => {
    it(': title', async () => {
      const wrapper = mount(<Cascader options={options} />);
      const $title = wrapper.find(`.${name}__title`);

      const title = TEXT;
      const newTitle = 'Cascader 级联选择器';
      await wrapper.setProps({
        title,
      });
      expect($title.text()).toBe(TEXT);
      await wrapper.setProps({
        title: newTitle,
      });
    });

    it(': closeIcon', async () => {
      const wrapper = mount(<Cascader options={options} />);
      // 默认
      expect(wrapper.findComponent(CloseIcon).exists()).toBeTruthy();
    });
  });

  describe('slots', () => {
    it(': title', () => {
      const title = 'Cascader 级联选择器';
      const wrapper = mount(<Cascader options={options} />, {
        slots: {
          title,
        },
      });
      const $title = wrapper.find(`.${name}__title`);
      expect($title.text()).toBe(title);
    });

    it(': closeIcon', () => {
      const wrapper = mount(<Cascader options={options} />, {
        slots: {
          closeIcon: iconFunc,
        },
      });
      expect(wrapper.findComponent(TIconApp).exists()).toBeTruthy();
    });
  });

  describe('events', () => {
    it(': cancel', async () => {
      const onCancel = vi.fn();
      const wrapper = mount(<Cascader options={options} onCancel={onCancel} />);
      const $closeBtn = wrapper.find(`.${name}__close-btn`);
      await $closeBtn.trigger('click');
      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it(': pick && click-tab', async () => {
      const onClickTab = vi.fn();
      const onPick = vi.fn();
      const wrapper = mount(<Cascader options={options} onPick={onPick} onClickTab={onClickTab} />);
      const $cascaderItems = wrapper.findAllComponents(CascaderItem);
      const $cascaderSteps = wrapper.findAll(`.${name}__step`);
      expect($cascaderItems).toHaveLength(2);

      // 模拟点击 第1项 CascaderItem
      const clickIndex = 0;
      // await $cascaderItems[clickIndex].find(`.${name}-item`).trigger('click')
      await $cascaderItems[clickIndex].trigger('click');
      expect(onPick).toHaveBeenCalledTimes(1);
      expect($cascaderItems[clickIndex].findAll(`.${name}-item-active-icon`)).toHaveLength(1);
      expect($cascaderSteps[clickIndex].text()).toEqual(options[clickIndex].label);

      // 模拟点击 第1项，step，触发 click-tab 事件名
      await $cascaderSteps[clickIndex].trigger('click');
      expect(onClickTab).toHaveBeenCalledTimes(1);

      const $stepDot = wrapper.findAll(`.${name}__step-dot`);
      expect($stepDot[clickIndex].attributes('class').includes(`${name}__step-dot--active`));
    });
  });
});

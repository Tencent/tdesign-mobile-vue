import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Cascader from '../cascader.vue';
import { AppIcon as TIconApp, CloseIcon } from 'tdesign-icons-vue-next';
import Radio from '../../radio/index';
import { on } from 'events';

const prefix = 't';
const name = `${prefix}-cascader`;

const TEXT = 'tdesign-mobile-vue';
const iconFunc = () => h(TIconApp);
const options = [
  {
    label: '北京市',
    value: '110000',
    children: [
      {
        value: '110100',
        label: '北京市',
        children: [
          { value: '110101', label: '东城区' },
          { value: '110102', label: '西城区' },
          { value: '110105', label: '朝阳区' },
          { value: '110106', label: '丰台区' },
          { value: '110107', label: '石景山区' },
          { value: '110108', label: '海淀区' },
          { value: '110109', label: '门头沟区' },
          { value: '110111', label: '房山区' },
          { value: '110112', label: '通州区' },
          { value: '110113', label: '顺义区' },
          { value: '110114', label: '昌平区' },
          { value: '110115', label: '大兴区' },
          { value: '110116', label: '怀柔区' },
          { value: '110117', label: '平谷区' },
          { value: '110118', label: '密云区' },
          { value: '110119', label: '延庆区' },
        ],
      },
    ],
  },
  {
    label: '天津市',
    value: '120000',
    children: [
      {
        value: '120100',
        label: '天津市',
        children: [
          { value: '120101', label: '和平区' },
          { value: '120102', label: '河东区' },
          { value: '120103', label: '河西区' },
          { value: '120104', label: '南开区' },
          { value: '120105', label: '河北区' },
          { value: '120106', label: '红桥区' },
          { value: '120110', label: '东丽区' },
          { value: '120111', label: '西青区' },
          { value: '120112', label: '津南区' },
          { value: '120113', label: '北辰区' },
          { value: '120114', label: '武清区' },
          { value: '120115', label: '宝坻区' },
          { value: '120116', label: '滨海新区' },
          { value: '120117', label: '宁河区' },
          { value: '120118', label: '静海区' },
          { value: '120119', label: '蓟州区' },
        ],
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
  });

  describe('events', () => {
    it(': cancel', async () => {
      const onClose = vi.fn();
      const wrapper = mount(<Cascader options={options} onClose={onClose} />);
      const $closeBtn = wrapper.find(`.${name}__close-btn`);
      await $closeBtn.trigger('click');
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it(': pick', async () => {
      let selectedValue = [];
      const onPick = vi.fn((e) => {
        selectedValue.push(e.value);
      });
      const wrapper = mount(<Cascader options={options} onPick={onPick} />);
      expect(wrapper.element).toMatchSnapshot();
      const $cascaderSteps = wrapper.findAll(`.${name}__step`);
      // 无默认 value 值，初始化时 steps.length = 1
      expect($cascaderSteps).toHaveLength(1);
      const $radios = wrapper.findAllComponents(Radio);
      expect( $radios).toHaveLength(options.length);

      // 模拟点击 第1项
      const clickIndex = 0;
      await $radios[clickIndex].find(`.t-radio`).trigger('click')
      expect(onPick).toHaveBeenCalledTimes(1);
      expect($radios[clickIndex].findAll(`.t-radio__icon--checked`)).toHaveLength(1);
      expect (selectedValue[0]).toBe(options[0].value);
    });
  });
});

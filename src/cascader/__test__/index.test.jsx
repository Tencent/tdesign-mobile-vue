import { ref, h, nextTick } from 'vue';
import { config, mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Cascader from '../cascader';
import { AppIcon as TIconApp, CloseIcon } from 'tdesign-icons-vue-next';
import Radio from '../../radio/index';
import { Tabs as TTabs, TabPanel as TTabPanel } from '../../tabs';
import prefixConfig from '../../config';

const { prefix } = prefixConfig;

config.global.stubs = {
  teleport: true,
};

const name = `${prefix}-cascader`;

const TEXT = 'tdesign-mobile-vue';
const iconFunc = () => h(TIconApp);
const address = ref('120119');
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
const keys = {
  label: 'name',
  value: 'id',
  children: 'sub',
};

const areaList = [
  {
    name: '北京市',
    id: '110000',
    sub: [
      {
        id: '110100',
        name: '北京市',
        sub: [
          { id: '110101', name: '东城区' },
          { id: '110102', name: '西城区' },
          { id: '110105', name: '朝阳区' },
          { id: '110106', name: '丰台区' },
          { id: '110107', name: '石景山区' },
          { id: '110108', name: '海淀区' },
          { id: '110109', name: '门头沟区' },
          { id: '110111', name: '房山区' },
          { id: '110112', name: '通州区' },
          { id: '110113', name: '顺义区' },
          { id: '110114', name: '昌平区' },
          { id: '110115', name: '大兴区' },
          { id: '110116', name: '怀柔区' },
          { id: '110117', name: '平谷区' },
          { id: '110118', name: '密云区' },
          { id: '110119', name: '延庆区' },
        ],
      },
    ],
  },
  {
    name: '天津市',
    id: '120000',
    sub: [
      {
        id: '120100',
        name: '天津市',
        sub: [
          { id: '120101', name: '和平区' },
          { id: '120102', name: '河东区' },
          { id: '120103', name: '河西区' },
          { id: '120104', name: '南开区' },
          { id: '120105', name: '河北区' },
          { id: '120106', name: '红桥区' },
          { id: '120110', name: '东丽区' },
          { id: '120111', name: '西青区' },
          { id: '120112', name: '津南区' },
          { id: '120113', name: '北辰区' },
          { id: '120114', name: '武清区' },
          { id: '120115', name: '宝坻区' },
          { id: '120116', name: '滨海新区' },
          { id: '120117', name: '宁河区' },
          { id: '120118', name: '静海区' },
          { id: '120119', name: '蓟州区' },
        ],
      },
    ],
  },
];

const itemList = [
  {
    label: '北京市',
    value: '110000',
    disabled: true,
    children: [
      {
        value: '110100',
        label: '北京市',
        children: [{ value: '110101', label: '东城区' }],
      },
    ],
  },
];

const subTitles = ['请选择省份', '请选择城市', '请选择区/县'];

const defaultPlaceholder = "默认选项标签";

describe('cascader', () => {
  describe('props', () => {
    it(':visible	', async () => {
      const onPick = vi.fn();
      const wrapper = mount(Cascader, {
        props: {
          visible: false,
          options: itemList,
          onPick,
        },
      });
      expect(wrapper.find(`.${name}`).isVisible()).toBe(false);
      await wrapper.setProps({
        visible: true,
      });
      expect(wrapper.find(`.${name}`).isVisible()).toBe(true);

      const $radios = wrapper.findAllComponents(Radio);

      // 模拟点击 第1项，禁用态，点击不会触发pick事件
      await $radios[0].find(`.${prefix}-radio`).trigger('click');
      expect(onPick).toHaveBeenCalledTimes(0);
    });

    it(': keys', async () => {
      const wrapper = mount(<Cascader visible={true} options={areaList} keys={keys} value={address} theme="tab" />);
      expect(wrapper.findComponent(TTabs).exists()).toBeTruthy();
      await nextTick();
      const $tabs = wrapper.find(`.${prefix}-tabs`);
      expect($tabs.text()).toEqual('天津市天津市蓟州区');
    });

    it(': value', async () => {
      const address = ref('120119');
      const wrapper = mount(<Cascader visible={true} options={options} value={address} theme="tab" />);
      expect(wrapper.findComponent(TTabs).exists()).toBeTruthy();
      await nextTick();
      const $tabs = wrapper.find(`.${prefix}-tabs`);
      expect($tabs.text()).toEqual('天津市天津市蓟州区');
    });

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

    it(': placeholder', async () => {
      const wrapper = mount(<Cascader options={options} placeholder={defaultPlaceholder} />);
      const $placeholder = wrapper.find(`.${name}__step-label`);
      expect($placeholder.text()).toEqual(defaultPlaceholder);
    });

    it(': subTitles', async () => {
      const wrapper = mount(<Cascader options={options} subTitles={subTitles} />);
      const $subTitles = wrapper.find(`.${name}__options-title`);
      expect($subTitles.exists()).toBeTruthy();
    });

    it(': closeIcon', async () => {
      const wrapper = mount(<Cascader options={options} />);
      // 默认
      expect(wrapper.findComponent(CloseIcon).exists()).toBeTruthy();
    });

    it(': theme', async () => {
      const themeList = ['', 'step', 'tab'];
      themeList.map((theme, index) => {
        const wrapper = mount(() => (
          <Cascader visible={true} options={options} value={address} theme={theme}></Cascader>
        ));
        if (theme === 'step') {
          expect(wrapper.find(`.${name}__steps`).exists()).toBeTruthy();
          expect(wrapper.findComponent(TTabs).exists()).toBeFalsy();
        }
        if (theme === 'tab') {
          expect(wrapper.find(`.${name}__steps`).exists()).toBeFalsy();
          expect(wrapper.findComponent(TTabs).exists()).toBeTruthy();
        }
      });
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

    it(': placeholder', () => {
      const wrapper = mount(<Cascader options={options} />, {
        slots: {
          placeholder: defaultPlaceholder,
        },
      });
      const $placeholder = wrapper.find(`.${name}__step-label`);
      expect($placeholder.text()).toBe(defaultPlaceholder);
    });

    it(': closeBtn', () => {
      const closeBtn = '关闭';
      const wrapper = mount(<Cascader options={options} />, {
        slots: {
          closeBtn,
        },
      });
      const $closeBtn = wrapper.find(`.${name}__close-btn`);
      expect($closeBtn.text()).toBe(closeBtn);
    });
  });

  describe('events', () => {
    it(': close trigger closeBtn', async () => {
      const onClose = vi.fn();
      const wrapper = mount(<Cascader options={options} onClose={onClose} />);
      const $closeBtn = wrapper.find(`.${name}__close-btn`);
      await $closeBtn.trigger('click');
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenLastCalledWith('close-btn');


    });

    it(': close trigger overlay', async () => {
      const onClose = vi.fn();
      const wrapper = mount(<Cascader options={options} onClose={onClose} visible={true}/>);
      // overlay
      const $overlay = wrapper.find(`.${prefix}-overlay--active`);
      expect($overlay.exists()).toBeTruthy()
      $overlay.trigger('click');
      expect(onClose).toBeCalledTimes(1);
      expect(onClose).toHaveBeenLastCalledWith('overlay');
    });

    it(': pick', async () => {
      const onPick = vi.fn();
      const wrapper = mount(<Cascader options={options} onPick={onPick} />);
      expect(wrapper.element).toMatchSnapshot();
      const $cascaderSteps = wrapper.findAll(`.${name}__step`);
      // 无默认 value 值，初始化时 steps.length = 1
      expect($cascaderSteps).toHaveLength(1);
      const $radios = wrapper.findAllComponents(Radio);
      expect($radios).toHaveLength(options.length);

      // 模拟点击 第1项
      const clickIndex = 0;
      await $radios[clickIndex].find(`.t-radio`).trigger('click');
      expect(onPick).toHaveBeenCalledTimes(1);
      expect(wrapper.findAll('.t-radio-group')[0].findAll(`.t-radio__icon--checked`)).toHaveLength(1);
      expect(onPick).toHaveBeenCalledWith({ level: 0, index: 0, value: '110000' });
      const $step = wrapper.findAll(`.${name}__step`);
      expect($step).toHaveLength(2);

      // 此时 label 激活项为第二项
      expect($step[1].find(`.${name}__step-label`).classes().includes(`${name}__step-label--active`)).toBeTruthy();
      // 模拟点击 第一项 step内容，此时激活项变更为第一项
      await $step[0].trigger('click');
      expect($step[0].find(`.${name}__step-label`).classes().includes(`${name}__step-label--active`)).toBeTruthy();
    });
  });
});

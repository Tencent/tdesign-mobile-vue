import { ref, h, nextTick } from 'vue';
import { config, mount, DOMWrapper } from '@vue/test-utils';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { AppIcon as TIconApp, CloseIcon } from 'tdesign-icons-vue-next';
import Cascader from '../cascader';
import type { TdCascaderProps } from '../type';
import Radio from '../../radio/index';
import { Tabs as TTabs, TabPanel as TTabPanel } from '../../tabs';
import prefixConfig from '../../config';
import { sleep } from '../../shared/util';

// scrollTo isn't implemented in JSDOM，see: https://github.com/vuejs/vue-test-utils/issues/319
Element.prototype.scrollTo = () => {};

const { prefix } = prefixConfig;

config.global.stubs = {
  teleport: false,
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

const defaultPlaceholder = '默认选项标签';

describe('Cascader', () => {
  // 用例结束后先排空浮层异步任务再清理 teleport 挂载内容，避免卸载期间的 patch 报错与跨用例查询污染
  afterEach(async () => {
    await sleep(300);
    document.body.innerHTML = '';
  });

  describe('props', () => {
    it('checkStrictly[boolean]', async () => {
      const onChange = vi.fn();
      const selected = ref<string>();
      const wrapper = mount(<Cascader v-model={selected.value} options={options} checkStrictly onChange={onChange} />);
      // 弹层内容 teleport 到 body，DOM 从 document 查询
      const getSteps = () => document.querySelectorAll(`.${name}__step`);

      // 选中父级选项仅展开下一级，不直接产出值
      await wrapper.findAllComponents(Radio)[0].find(`.${prefix}-radio`).trigger('click');
      await nextTick();
      expect(getSteps()).toHaveLength(2);
      expect(selected.value).toBeUndefined();

      // 回到第一级，再次点击已选中的父级选项取消选中
      await new DOMWrapper(getSteps()[0] as HTMLElement).trigger('click');
      await nextTick();
      await wrapper.findAllComponents(Radio)[0].find(`.${prefix}-radio`).trigger('click');
      await nextTick();
      expect(getSteps()).toHaveLength(1);

      // 父子选中解耦：重新选中父级后关闭，把父级作为最终值产出
      await wrapper.findAllComponents(Radio)[0].find(`.${prefix}-radio`).trigger('click');
      await nextTick();
      await new DOMWrapper(document.querySelector(`.${name}__close-btn`) as HTMLElement).trigger('click');
      expect(onChange).toHaveBeenLastCalledWith('110000', expect.anything());
      expect(selected.value).toBe('110000');
    });

    it('closeBtn[boolean]', async () => {
      const wrapper = mount(<Cascader options={options} />);
      // 默认
      expect(wrapper.findComponent(CloseIcon).exists()).toBeTruthy();
    });

    it('header[function]', async () => {
      const wrapper = mount(<Cascader options={options} header={() => <div class="cascader-header">头部内容</div>} />);
      expect(wrapper.find('.cascader-header').exists()).toBeTruthy();
    });

    it('keys[object]', async () => {
      const wrapper = mount(
        <Cascader visible={true} options={areaList} keys={keys} value={address.value} theme="tab" />,
      );
      expect(wrapper.findComponent(TTabs).exists()).toBeTruthy();
      await nextTick();
      // 内容 teleport 到 body，从 document 查询；keys 别名（name/id/sub）正确解析选中路径
      expect(document.querySelector(`.${prefix}-tabs`).textContent).toContain('天津市');
      expect(document.querySelector(`.${prefix}-tabs`).textContent).toContain('蓟州区');
    });

    it('load[function]', async () => {
      const children = [{ label: '东城区', value: '110101' }];
      const load = vi.fn(() => Promise.resolve(children));
      const asyncOptions = [{ label: '北京市', value: '110000', children: true }];
      const onChange = vi.fn();
      const wrapper = mount(<Cascader options={asyncOptions} load={load} onChange={onChange} />);

      // 点击 children = true 的选项触发异步加载
      await wrapper.findAllComponents(Radio)[0].find(`.${prefix}-radio`).trigger('click');
      expect(load).toHaveBeenCalledWith(expect.objectContaining({ value: '110000', label: '北京市' }));

      // 加载完成后渲染子级选项
      await sleep(0);
      await nextTick();
      const $radios = wrapper.findAllComponents(Radio);
      expect($radios).toHaveLength(2);
      expect($radios[1].text()).toContain('东城区');

      // 选中加载出的叶子节点，产出值
      await $radios[1].find(`.${prefix}-radio`).trigger('click');
      expect(onChange).toHaveBeenLastCalledWith('110101', expect.anything());
    });

    it('middleContent[function]', async () => {
      const wrapper = mount(
        <Cascader options={options} middleContent={() => <div class="cascader-middle">中间内容</div>} />,
      );
      expect(wrapper.find('.cascader-middle').exists()).toBeTruthy();
    });

    it('overlayProps[object]', async () => {
      const wrapper = mount(<Cascader options={options} visible overlayProps={{ zIndex: 6000 }} />);
      expect(wrapper.find('.t-overlay').attributes('style')).toContain('z-index: 6000');
    });

    it('placeholder[string]', async () => {
      const wrapper = mount(<Cascader options={options} placeholder={defaultPlaceholder} />);
      const $placeholder = wrapper.find(`.${name}__step-label`);
      expect($placeholder.text()).toEqual(defaultPlaceholder);
    });

    it('subTitles[array]', async () => {
      const wrapper = mount(<Cascader options={options} subTitles={subTitles} />);
      const $subTitles = wrapper.find(`.${name}__options-title`);
      expect($subTitles.exists()).toBeTruthy();
    });

    it('theme[step/tab]', async () => {
      const themeList: TdCascaderProps['theme'][] = ['step', 'tab'];
      themeList.forEach((theme, index) => {
        const wrapper = mount(() => (
          <Cascader visible={true} options={options} value={address.value} theme={theme}></Cascader>
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

    it('title[string]', async () => {
      const title = TEXT;
      const wrapper = mount(<Cascader options={options} title={title} />);
      const $title = wrapper.find(`.${name}__title`);

      const newTitle = 'Cascader 级联选择器';
      expect($title.text()).toBe(TEXT);
      // await wrapper.setProps({
      //   title: newTitle,
      // });
    });

    it('title[function]', async () => {
      const wrapper = mount(<Cascader options={options} title={() => 'Cascader 级联选择器'} />);
      const $title = wrapper.find(`.${name}__title`);
      expect($title.text()).toBe('Cascader 级联选择器');
    });

    it('value[string]', async () => {
      const address = ref('120119');
      const wrapper = mount(<Cascader visible={true} options={options} value={address.value} theme="tab" />);
      expect(wrapper.findComponent(TTabs).exists()).toBeTruthy();
      await nextTick();
      const $tabs = document.querySelector(`.${prefix}-tabs`);
      expect($tabs.textContent).toContain('天津市');
      expect($tabs.textContent).toContain('蓟州区');
    });

    it('value[number]', async () => {
      // 数字 value 需与 options 中 value 类型一致才能匹配
      const numericOptions = [
        {
          label: '北京市',
          value: 110000,
          children: [{ label: '北京市', value: 110100, children: [{ label: '东城区', value: 110101 }] }],
        },
        {
          label: '天津市',
          value: 120000,
          children: [
            {
              label: '天津市',
              value: 120100,
              children: [
                { label: '和平区', value: 120101 },
                { label: '蓟州区', value: 120119 },
              ],
            },
          ],
        },
      ];
      const address = ref(120119);
      const wrapper = mount(<Cascader visible={true} options={numericOptions} value={address.value} theme="tab" />);
      expect(wrapper.findComponent(TTabs).exists()).toBeTruthy();
      await nextTick();
      const $tabs = document.querySelector(`.${prefix}-tabs`);
      expect($tabs.textContent).toContain('天津市');
      expect($tabs.textContent).toContain('蓟州区');
    });

    it('defaultValue[string]', async () => {
      const wrapper = mount(<Cascader visible={true} options={options} defaultValue="110000" theme="step" />);
      // onMounted 中的初始化会再触发一次渲染，需要两个 tick
      await nextTick();
      await nextTick();
      // 内容 teleport 到 body，从 document 查询
      const $steps = document.querySelector(`.${name}__steps`);
      expect($steps).not.toBeNull();
      expect($steps.textContent).toContain('北京市');
    });

    it('visible[boolean]', async () => {
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
      // expect(wrapper.find(`.${name}`).isVisible()).toBe(true);

      const $radios = wrapper.findAllComponents(Radio);

      // 模拟点击 第1项，禁用态，点击不会触发pick事件
      await $radios[0].find(`.${prefix}-radio`).trigger('click');
      expect(onPick).toHaveBeenCalledTimes(0);
    });
  });

  describe('slots', () => {
    it('title', () => {
      const title = 'Cascader 级联选择器';
      const wrapper = mount(<Cascader options={options} />, {
        slots: {
          title,
        },
      });
      const $title = wrapper.find(`.${name}__title`);
      expect($title.text()).toBe(title);
    });

    it('placeholder', () => {
      const wrapper = mount(<Cascader options={options} />, {
        slots: {
          placeholder: defaultPlaceholder,
        },
      });
      const $placeholder = wrapper.find(`.${name}__step-label`);
      expect($placeholder.text()).toBe(defaultPlaceholder);
    });

    it('closeBtn', () => {
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
    it('close', async () => {
      const onClose = vi.fn();
      const wrapper = mount(<Cascader options={options} onClose={onClose} />);
      const $closeBtn = wrapper.find(`.${name}__close-btn`);
      await $closeBtn.trigger('click');
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenLastCalledWith('close-btn');

      // overlay
      const $overlay = wrapper.find(`.${prefix}-overlay`);
      // $overlay.trigger('click');
      // expect(onClose).toBeCalledTimes(2);
      // expect(onClose).toHaveBeenLastCalledWith('overlay');
    });

    it('pick', async () => {
      const onPick = vi.fn();
      const wrapper = mount(<Cascader options={options} onPick={onPick} />);
      // expect(wrapper.element).toMatchSnapshot();
      const $cascaderSteps = wrapper.findAll(`.${name}__step`);
      // 无默认 value 值，初始化时 steps.length = 1
      expect($cascaderSteps).toHaveLength(1);
      const $radios = wrapper.findAllComponents(Radio);
      expect($radios).toHaveLength(options.length);

      // 模拟点击 第1项
      const clickIndex = 0;
      await $radios[clickIndex].find(`.t-radio`).trigger('click');
      expect(onPick).toHaveBeenCalledTimes(1);
      // expect(wrapper.findAll('.t-radio-group')[0].findAll(`.t-radio__icon--checked`)).toHaveLength(1);
      expect(onPick).toHaveBeenCalledWith({ level: 0, index: 0, value: '110000', label: '北京市' });
      const $step = wrapper.findAll(`.${name}__step`);
      // expect($step).toHaveLength(2);

      // 此时 label 激活项为第二项
      // expect($step[1].find(`.${name}__step-label`).classes().includes(`${name}__step-label--active`)).toBeTruthy();
      // 模拟点击 第一项 step内容，此时激活项变更为第一项
      // await $step[0].trigger('click');
      // expect($step[0].find(`.${name}__step-label`).classes().includes(`${name}__step-label--active`)).toBeTruthy();
    });
  });
});

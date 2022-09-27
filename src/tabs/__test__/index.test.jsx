import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import {Tabs, TabPanel} from '../index';
import TTabNav from '../tab-nav-item.vue';

const prefix = 't'
const name = `${prefix}-tabs`;
const list = [
  {
    value: '1',
    label: '标签页一',
    panel: '标签一内容区',
  },
  {
    value: '2',
    label: '标签页二',
    panel: '标签二内容区',
  },
];

describe('Tabs', () => {
  describe('props', () => {
    it(': placement', async () => {
      const currentValue = ref('1');
      const placement = 'left';
      const onChange = vi.fn((value) => {
        currentValue.value = value;
      });
      const wrapper = mount({
        setup() {
          return () => (
            <Tabs value={currentValue.value} placement={placement} onChange={onChange}>
              <TabPanel value="1" label="标签页一" panel="标签一内容区" />
              <TabPanel value="2" label="标签页二" panel="标签二内容区" />
            </Tabs>
          );
        },
      });
      const $tabs = wrapper.findComponent(Tabs);
      expect($tabs.attributes('class').includes(`${prefix}-is-${placement}`)).toBeTruthy();

      const navWrap = wrapper.find(`.${name}__nav-wrap`);
      const $tabNavItems = navWrap.findAllComponents(TTabNav);
      const $navLine = wrapper.find(`.${name}__nav-line`);
      const linWidth = 56;
      const navWidth = 88;
      $tabNavItems.map(async (item, index)=> {
        await item.trigger('click');
        expect($navLine.attributes('style').includes(`transform: translateY(${navWidth * index + navWidth / 2 - linWidth / 2}px);`))
      });

      // t-tab-nav 首项为激活态，点击激活态的 tab-nav 不会触发 change 事件
      expect(onChange).toHaveBeenCalledTimes($tabNavItems.length - 1);
    });

    it(': animation', async () => {
      const animation = ref({ duration: 500 });
      const currentValue = ref('1');
      const onChange = vi.fn((value) => {
        currentValue.value = value;
      });
      const wrapper = mount({
        setup() {
          return () => (
            <Tabs value={currentValue.value} animation={animation.value} onChange={onChange}>
              <TabPanel value="1" label="标签页一" panel="标签一内容区" />
              <TabPanel value="2" label="标签页二" panel="标签二内容区" />
              <TabPanel value="3" label="标签页三" panel="标签一内容区" />
              <TabPanel value="4" label="标签页四" panel="标签二内容区" />
              <TabPanel value="5" label="标签页五" panel="标签一内容区" />
              <TabPanel value="6" label="标签页六" panel="标签二内容区" />
            </Tabs>
          );
        },
      });

      const navWrap = wrapper.find(`.${name}__nav-wrap`);
      const $tabNavItems = navWrap.findAllComponents(TTabNav);
      const $navLine = wrapper.find(`.${name}__nav-line`);
      const linWidth = 56;
      const navWidth = 88;
      $tabNavItems.map(async (item, index) => {
        await item.trigger('click');
        expect($navLine.attributes('style').includes(`transform: translateX(${navWidth * index + navWidth / 2 - linWidth / 2}px); transition-duration: ${animation.value}ms;`))
      });
      expect(onChange).toHaveBeenCalledTimes($tabNavItems.length - 1);

    });
    it(': list', async () => {
      const defaultValue = list[0].value;
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <Tabs defaultValue={defaultValue} list={list} onChange={onChange} />
          );
        },
      });

      const navWrap = wrapper.find(`.${name}__nav-wrap`);
      const $tabNavItems = navWrap.findAllComponents(TTabNav);
      $tabNavItems.map(async (item, index) => {
        await item.trigger('click');
        expect(item.text()).toEqual(list[index].label)
      });
      // 非受控模式，也能触发 change 事件
      expect(onChange).toHaveBeenCalledTimes($tabNavItems.length - 1);
    });

    it(': size', async () => {
      const SIZE_CLASSNAMES = {
        small: `${prefix}-size-s`,
        medium: `${prefix}-size-m`,
        large: `${prefix}-size-l`,
      };
      const wrapper = mount(Tabs);
      const $tabs = wrapper.findComponent(Tabs);

      // size 默认为 medium
      expect($tabs.attributes('class').includes(`${SIZE_CLASSNAMES['medium']}`)).toBeTruthy();

      const size = 'large';
      await wrapper.setProps({
        size,
      })
      expect($tabs.attributes('class').includes(`${SIZE_CLASSNAMES[size]}`)).toBeTruthy();
    });

  });

  describe('slots', () => {
    it(': panel', () => {
      const label = ref('标签一');
      const wrapper = mount({
        setup() {
          return () => (
            <Tabs defaultValue="1">
              <TabPanel value="1" label={label.value}>
                {{
                  panel: () => <p>标签一内容</p>,
                }}
              </TabPanel>
            </Tabs>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
      const navWrap = wrapper.find(`.${name}__nav-wrap`);
      const $tabNavItems = navWrap.findAllComponents(TTabNav);
      const $panels = wrapper.findAllComponents(TabPanel);
      expect($panels.at(0).text()).toEqual('标签一内容');
      expect($tabNavItems.at(0).text()).toEqual('标签一');
    });
  });

  describe('event', () => {
    it(': change', async () => {
      const currentValue = ref('1');
      const onChange = vi.fn((value) => {
        currentValue.value = value;
      });
      const wrapper = mount({
        setup() {
          return () => (
            <Tabs v-model={currentValue.value} onChange={onChange}>
              <TabPanel value="1" label="标签页一" panel="标签一内容区" />
              <TabPanel value="2" label="标签页二" panel="标签二内容区" />
            </Tabs>
          );
        },
      });

      const navWrap = wrapper.find(`.${name}__nav-wrap`);
      const $tabNavItems = navWrap.findAllComponents(TTabNav);

      $tabNavItems.map(async (item, index) => {
        await item.trigger('click');
      });
      expect(onChange).toHaveBeenCalledTimes($tabNavItems.length - 1);
    });
  });
})

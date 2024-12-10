import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import { Tabs, TabPanel } from '../index';
import TTabNav from '../tab-nav-item';
import { sleep } from '../../shared/util';
import Sticky from '../../sticky/index';
import { trigger } from '../../image-viewer/__test__/touch';

const prefix = 't';
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
const tabPanelList = [
  {
    value: '1',
    label: '标签页一',
    panel: '标签一内容区',
    destroyOnHide: false,
  },
  {
    value: '2',
    label: '标签页二',
    panel: '标签二内容区',
    destroyOnHide: true,
  },
];

describe('Tabs', () => {
  describe('props', () => {
    it(': spaceEvenly', async () => {
      const wrapper = mount(Tabs);
      const navWrap = wrapper.find(`.${name}__wrapper`);
      const $tabNavItems = navWrap.findAllComponents(TTabNav);

      $tabNavItems.forEach((item, index) => {
        expect(item.attributes('class').includes(`${prefix}-tabs-item-evenly`)).toBeFalsy();
      });

      await wrapper.setProps({
        spaceEvenly: false,
      });

      $tabNavItems.forEach((item) => {
        expect(item.attributes('class').includes(`${prefix}-tabs-item-evenly`)).toBeTruthy();
      });
    });

    it(': theme', async () => {
      let theme = '';
      const wrapper = mount(Tabs, {
        props: {
          theme: theme,
        },
      });
      const navWrap = wrapper.find(`.${name}__wrapper`);
      const $tabNavItems = navWrap.findAllComponents(TTabNav);

      theme = 'line';
      await wrapper.setProps({
        theme,
      });
      $tabNavItems.forEach((item) => {
        expect($tabs.attributes('class').includes(`${prefix}-tabs-item-${theme}`)).toBeTruthy();
      });

      theme = 'tag';
      await wrapper.setProps({
        theme,
      });
      $tabNavItems.forEach((item) => {
        expect($tabs.attributes('class').includes(`${prefix}-tabs-item-${theme}`)).toBeTruthy();
      });

      theme = 'card';
      await wrapper.setProps({
        theme,
      });
      $tabNavItems.forEach((item) => {
        expect($tabs.attributes('class').includes(`${prefix}-tabs-item-${theme}`)).toBeTruthy();
      });
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

      const navWrap = wrapper.find(`.${name}__wrapper`);
      const $tabNavItems = navWrap.findAllComponents(TTabNav);
      const $navLine = wrapper.find(`.${name}__track`);
      const linWidth = 56;
      const navWidth = 88;
      $tabNavItems.map(async (item, index) => {
        await item.trigger('click');
        expect(
          $navLine
            .attributes('style')
            .includes(
              `transform: translateX(${navWidth * index + navWidth / 2 - linWidth / 2}px); transition-duration: ${
                animation.value
              }ms;`,
            ),
        );
      });
      expect(onChange).toHaveBeenCalledTimes($tabNavItems.length - 1);
    });

    it(': list', async () => {
      const defaultValue = list[0].value;
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => <Tabs defaultValue={defaultValue} list={list} onChange={onChange} />;
        },
      });

      const navWrap = wrapper.find(`.${name}__wrapper`);
      const $tabNavItems = navWrap.findAllComponents(TTabNav);
      $tabNavItems.map(async (item, index) => {
        await item.trigger('click');
        expect(item.text()).toEqual(list[index].label);
      });
      // 非受控模式，也能触发 change 事件
      expect(onChange).toHaveBeenCalledTimes($tabNavItems.length - 1);
    });

    it(': size', async () => {
      let size = '';
      const SIZE_CLASSNAMES = {
        small: `${prefix}-size-s`,
        medium: `${prefix}-size-m`,
        large: `${prefix}-size-l`,
      };
      const wrapper = mount(Tabs, {
        props: {
          size: size,
        },
      });
      const $tabs = wrapper.findComponent(Tabs);

      size = 'medium';
      await wrapper.setProps({
        size,
      });

      // size 默认为 medium
      expect($tabs.attributes('class').includes(`${SIZE_CLASSNAMES[size]}`)).toBeTruthy();

      size = 'large';
      await wrapper.setProps({
        size,
      });
      expect($tabs.attributes('class').includes(`${SIZE_CLASSNAMES[size]}`)).toBeTruthy();
    });

    it(': showBottomLine', async () => {
      const currentValue = ref('1');
      const showBottomLine = ref(true);
      const animation = ref({ duration: 500 });

      const wrapper = mount({
        setup() {
          return () => (
            <Tabs value={currentValue.value} animation={animation.value} showBottomLine={showBottomLine.value}>
              {/* <TabPanel value="1" label="标签页一" panel="标签一内容区" />
              <TabPanel value="2" label="标签页二" panel="标签二内容区" /> */}
              {tabPanelList.map((item) => {
                return <TabPanel {...item}>{item.panel}</TabPanel>;
              })}
            </Tabs>
          );
        },
      });

      // 触发moveToActiveTab()
      currentValue.value = '2';

      // 等待组件异步更新样式
      await sleep(0);

      const navWrap = wrapper.find(`.${name}__wrapper`);
      const navLine = navWrap.find(`.${name}__track`);
      const tab = navWrap.find(`.${name}__item--active`);

      expect(
        navLine
          .attributes('style')
          .includes(
            `transform: translateX(${
              Number(tab.element.offsetLeft) + Number(tab.element.offsetWidth) / 2 - navLine.element.offsetWidth / 2
            }px); ${animation.value ? `transition-duration: ${animation.value.duration}ms` : ''}`,
          ),
      ).toBeTruthy();
    });

    it(': swipeable', async () => {
      const currentValue = ref('3');
      const onClick = vi.fn((value) => {
        currentValue.value = value;
      });
      const wrapper = mount({
        setup() {
          return () => (
            <Tabs v-model={currentValue.value} onClick={onClick}>
              <TabPanel value="1" label="标签页1" panel="标签一内容区" />
              <TabPanel value="2" label="标签页2" panel="标签二内容区" />
              <TabPanel value="3" label="标签页3" panel="标签三内容区" />
              <TabPanel value="4" label="标签页4" panel="标签四内容区" />
              <TabPanel value="5" label="标签页5" panel="标签五内容区" />
              <TabPanel value="6" label="标签页6" panel="标签六内容区" />
            </Tabs>
          );
        },
      });
      const $content = wrapper.find(`.${name}__content`);

      // 滚动 <= 40
      await trigger($content, 'touchstart', 0, 0);
      await trigger($content, 'touchmove', 40, 0);
      await trigger($content, 'touchend', 40, 0);

      // 向右划
      await trigger($content, 'touchstart', 0, 0);
      await trigger($content, 'touchmove', 120, 0);
      await trigger($content, 'touchend', 120, 0);

      expect(onClick).toBeCalled();

      // 向左划
      await trigger($content, 'touchstart', 120, 0);
      await trigger($content, 'touchmove', 0, 0);
      await trigger($content, 'touchend', 0, 0);

      expect(onClick).toBeCalled();
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
      const navWrap = wrapper.find(`.${name}__wrapper`);
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

      const navWrap = wrapper.find(`.${name}__wrapper`);
      const $tabNavItems = navWrap.findAllComponents(TTabNav);

      $tabNavItems.map(async (item, index) => {
        await item.trigger('click');
      });
      expect(onChange).toHaveBeenCalledTimes($tabNavItems.length - 1);
    });

    it(': click', async () => {
      const currentValue = ref('1');
      const currentLabel = ref('');
      const onClick = vi.fn((value, label) => {
        currentValue.value = value;
        currentLabel.value = label;
      });
      const wrapper = mount({
        setup() {
          return () => (
            <Tabs v-model={currentValue.value} onClick={onClick}>
              <TabPanel value="1" label="标签页1" panel="标签一内容区" />
              <TabPanel value="2" label="标签页2" panel="标签二内容区" />
            </Tabs>
          );
        },
      });

      const navWrap = wrapper.find(`.${name}__wrapper`);
      const $tabNavItems = navWrap.findAllComponents(TTabNav);

      $tabNavItems.map(async (item, index) => {
        await item.trigger('click');
      });
      for (let i = 0; i < $tabNavItems.length - 1; i++) {
        expect(onClick);
        expect(currentLabel.value).toBe(`标签页${currentValue.value}`);
      }
    });

    it(': scroll', async () => {
      const sticky = true;
      const stickyProps = ref({ zIndex: 99 });
      const onScroll = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <Tabs sticky={sticky} stickyProps={stickyProps.value} onScroll={onScroll}>
              <TabPanel value="1" label="标签页1" panel="标签一内容区" />
              <TabPanel value="2" label="标签页2" panel="标签二内容区" />
            </Tabs>
          );
        },
      });
      const $sticky = wrapper.findComponent(Sticky);
      await $sticky.trigger('scroll');
      expect(onScroll).toBeCalled();
    });
  });
});

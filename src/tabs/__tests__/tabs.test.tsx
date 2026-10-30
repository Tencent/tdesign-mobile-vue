import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { ref, nextTick } from 'vue';
import { Tabs, TabPanel } from '../index';
import type { TdTabsProps } from '../type';
import TTabNav from '../tab-nav-item';
import { sleep } from '../../shared/util';
import Sticky from '../../sticky/index';
import { trigger } from '../../image-viewer/__tests__/touch';

// scrollTo isn't implemented in JSDOM，see: https://github.com/vuejs/vue-test-utils/issues/319
Element.prototype.scrollTo = () => {};

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
    it('animation[boolean]', async () => {
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

    it('bottomLineMode[fixed/auto/full]', async () => {
      // jsdom 无真实布局，mock 导航元素尺寸后断言下划线定位样式的计算规则
      const widthDesc = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth');
      const leftDesc = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetLeft');
      Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, get: () => 100 });
      Object.defineProperty(HTMLElement.prototype, 'offsetLeft', { configurable: true, get: () => 100 });

      const mountTabs = async (bottomLineMode?: string) => {
        const currentValue = ref('1');
        const wrapper = mount({
          setup() {
            return () => (
              <Tabs
                value={currentValue.value}
                bottomLineMode={bottomLineMode}
                list={[
                  { value: '1', label: '标签页一' },
                  { value: '2', label: '标签页二' },
                ]}
              />
            );
          },
        });
        // 值变化触发下划线重新定位
        currentValue.value = '2';
        await sleep(0);
        await sleep(0);
        return wrapper;
      };

      try {
        // fixed（默认）：下划线宽度固定，居中于激活项
        const $fixed = (await mountTabs()).find(`.${name}__track`);
        expect($fixed.attributes('style')).toContain('transform: translateX(100px)');
        expect($fixed.attributes('style')).not.toContain('width');

        // auto：下划线宽度与激活项内容一致，按内容偏移定位
        const $auto = (await mountTabs('auto')).find(`.${name}__track`);
        expect($auto.attributes('style')).toContain('width: 100px');
        expect($auto.attributes('style')).toContain('transform: translateX(200px)');

        // full：下划线宽度与激活项整项一致
        const $full = (await mountTabs('full')).find(`.${name}__track`);
        expect($full.attributes('style')).toContain('width: 100px');
        expect($full.attributes('style')).toContain('transform: translateX(100px)');
      } finally {
        if (widthDesc) Object.defineProperty(HTMLElement.prototype, 'offsetWidth', widthDesc);
        if (leftDesc) Object.defineProperty(HTMLElement.prototype, 'offsetLeft', leftDesc);
      }
    });

    it('list[array]', async () => {
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

    it('middle[function]', async () => {
      const wrapper = mount(<Tabs list={list} middle={() => <div class="tabs-middle">中间内容</div>}></Tabs>);
      expect(wrapper.find('.tabs-middle').exists()).toBeTruthy();
    });

    it('showBottomLine[boolean]', async () => {
      const currentValue = ref('1');
      const showBottomLine = ref(true);
      const animation = ref({ duration: 500 });

      const wrapper = mount({
        setup() {
          return () => (
            <Tabs value={currentValue.value} animation={animation.value} showBottomLine={showBottomLine.value}>
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

      currentValue.value = '1';
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

    it('size[medium/large]', async () => {
      let size: TdTabsProps['size'] = 'medium';
      const SIZE_CLASSNAMES = {
        small: `${prefix}-size-s`,
        medium: `${prefix}-size-m`,
        large: `${prefix}-size-l`,
      };
      const wrapper = mount(Tabs, {
        props: {
          size,
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

    it('spaceEvenly[boolean]', async () => {
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

    it('split[boolean]', async () => {
      const wrapper = mount(<Tabs list={list} split></Tabs>);
      expect(wrapper.find('.t-tabs__nav--split').exists()).toBeTruthy();
    });

    it('sticky[boolean]', () => {
      // 默认不开启粘性布局，内部 Sticky 被禁用
      const wrapper = mount(<Tabs list={list} />);
      expect(wrapper.findComponent(Sticky).props('disabled')).toBe(true);

      const stickyWrapper = mount(<Tabs sticky list={list} />);
      expect(stickyWrapper.findComponent(Sticky).props('disabled')).toBe(false);
      // 粘性布局开启后导航区域被 TSticky 包装
      expect(stickyWrapper.findComponent(Sticky).find(`.${name}__nav`).exists()).toBe(true);
    });

    it('stickyProps[object]', () => {
      const wrapper = mount(<Tabs sticky list={list} stickyProps={{ offsetTop: 50, zIndex: 100 }} />);
      // stickyProps 透传至内部 TSticky
      const $sticky = wrapper.findComponent(Sticky);
      expect($sticky.props('offsetTop')).toBe(50);
      expect($sticky.props('zIndex')).toBe(100);
    });

    it('swipeable[boolean]', async () => {
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

    it('theme[line/tag/card]', async () => {
      let theme: TdTabsProps['theme'] = 'line';
      const wrapper = mount(Tabs, {
        props: {
          theme,
        },
      });
      const navWrap = wrapper.find(`.${name}__wrapper`);
      const $tabNavItems = navWrap.findAllComponents(TTabNav);

      const $tabs = wrapper.findComponent(Tabs);

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

    it('value[string]', async () => {
      const value = ref('2');
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => <Tabs value={value.value} list={list} onChange={onChange} />;
        },
      });
      const $items = wrapper.findAll(`.${name}__item`);
      expect($items[1].classes()).toContain(`${name}__item--active`);

      // 受控模式：外部修改 value 后激活项切换
      value.value = '1';
      await nextTick();
      expect($items[0].classes()).toContain(`${name}__item--active`);
      expect($items[1].classes()).not.toContain(`${name}__item--active`);

      // 外部值未响应时，点击仅抛出 change，激活项保持
      await $items[1].trigger('click');
      expect(onChange).toHaveBeenCalledWith('2', '标签页二');
      expect($items[0].classes()).toContain(`${name}__item--active`);
    });

    it('panel disabled[boolean]', async () => {
      const wrapper = mount(
        <Tabs
          list={[
            { value: '1', label: '标签一', disabled: true },
            { value: '2', label: '标签二' },
          ]}
        ></Tabs>,
      );
      expect(wrapper.find('.t-tabs__item--disabled').exists()).toBeTruthy();
    });

    it('panel badgeProps[object]', async () => {
      const wrapper = mount(
        <Tabs
          list={[
            { value: '1', label: '标签一', badgeProps: { count: 6 } },
            { value: '2', label: '标签二' },
          ]}
        ></Tabs>,
      );
      expect(wrapper.find('.t-badge').exists()).toBeTruthy();
      expect(wrapper.find('.t-badge').text()).toContain('6');
    });

    it('panel lazy[boolean]', async () => {
      const currentValue = ref('1');
      // 面板内容仅支持 slot 通道（renderTNodeJSX('default')），slot 调用警告与同文件其他用例同源
      const wrapper = mount({
        setup() {
          return () => (
            <Tabs v-model={currentValue.value}>
              <TabPanel value="1" label="标签页一">
                标签一内容区
              </TabPanel>
              <TabPanel value="2" label="标签页二" lazy destroyOnHide={false}>
                标签二内容区
              </TabPanel>
            </Tabs>
          );
        },
      });
      // 懒加载面板初始不渲染
      expect(wrapper.findAll('.t-tab-panel')).toHaveLength(1);
      expect(wrapper.text()).not.toContain('标签二内容区');

      // 切换到懒加载面板后才开始渲染（panel1 默认 destroyOnHide，切走即销毁）
      await wrapper.findAll(`.${name}__item`)[1].trigger('click');
      expect(wrapper.findAll('.t-tab-panel')).toHaveLength(1);
      expect(wrapper.text()).toContain('标签二内容区');
      expect(wrapper.text()).not.toContain('标签一内容区');

      // 懒加载面板 destroyOnHide = false，切走后保持挂载，仅隐藏
      await wrapper.findAll(`.${name}__item`)[0].trigger('click');
      expect(wrapper.findAll('.t-tab-panel')).toHaveLength(2);
      expect(wrapper.findAll('.t-tab-panel')[1].isVisible()).toBe(false);
      expect(wrapper.text()).toContain('标签一内容区');
    });
  });

  describe('slots', () => {
    it('panel', () => {
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

  describe('events', () => {
    it('change', async () => {
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

    it('click', async () => {
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

    it('scroll', async () => {
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

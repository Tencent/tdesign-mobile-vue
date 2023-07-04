import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { default as TCell } from '../../cell/index';
import { Indexes, IndexesAnchor } from '../index';
import config from '@/config';
import { trigger } from '@/image-viewer/__test__/touch';

const { prefix } = config;

const indexesClass = `${prefix}-indexes`;
const indexesAnchorClass = `${prefix}-indexes-anchor`;

const move = async (target, distance) => {
  await trigger(target, 'touchstart', 0, 0);
  await trigger(target, 'touchmove', 0, distance);
  await trigger(target, 'touchend', 0, distance);
};

const children = new Array(5).fill('列表内容');
const list = [
  {
    index: 1,
    children,
  },
  {
    index: 3,
    children,
  },
  {
    index: 5,
    children,
  },
  {
    index: 7,
    children,
  },
  {
    index: 8,
    children,
  },
  {
    index: 10,
    children,
  },
  {
    index: '#',
    children,
  },
];
const indexList = list.map((item) => item.index);

const componentName = `${prefix}-indexes`;
describe('Indexes', () => {
  describe('props', () => {
    it(':indexList', () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Indexes indexList={indexList}>
              {{
                default: list.map((item, index) => (
                  <template>
                    <IndexesAnchor index={item.index} key={index}></IndexesAnchor>
                    {item.children.map((val) => (
                      <TCell className="indexes-cell">{val}</TCell>
                    ))}
                  </template>
                )),
              }}
            </Indexes>
          );
        },
      });
      expect(wrapper.findAll(`.${componentName}__sidebar-item`).length).toBe(indexList.length);
      wrapper.find(`.${componentName}__sidebar-item`).trigger('click');
      expect(wrapper.findAllComponents(TCell).length).toBe(
        list.reduce((count, item) => count + item.children.length, 0),
      );

      const wrapper1 = mount({
        setup() {
          return () => (
            <Indexes>
              {{
                default: list.map((item, index) => (
                  <template>
                    <IndexesAnchor index={item.index} key={index}></IndexesAnchor>
                    {item.children.map((val) => (
                      <TCell className="indexes-cell">{val}</TCell>
                    ))}
                  </template>
                )),
              }}
            </Indexes>
          );
        },
      });
      expect(wrapper1.findAll(`.${componentName}__sidebar-item`).length).toBe(26);
    });
  });
  describe('event', () => {
    it(': select', async () => {
      const selectFn = vi.fn();
      const wrapper = mount({
        components: { Indexes, IndexesAnchor, TCell },
        template: `
          <Indexes :indexList="indexList" @select="select">
            <template v-for="(item, index) in list" :slot="item.index" :key="index">
              <IndexesAnchor :index="item.index"></IndexesAnchor>
              <TCell v-for="val in item.children" class="indexes-cell">{{val}}</TCell>
            </template>
          </Indexes>
        `,
        data() {
          return {
            indexList,
            list,
          };
        },
        methods: {
          select(index) {
            selectFn(index);
          },
        },
      });
      await wrapper.find('.t-indexes__sidebar-item').trigger('click');
      expect(selectFn).toBeCalledWith(list[0].index);
    });

    it(': change', async () => {
      const selectFn = vi.fn();
      const changeFn = vi.fn();
      const wrapper = mount({
        components: { Indexes, IndexesAnchor, TCell },
        template: `
          <Indexes :indexList="indexList" @select="select" @change="change">
            <template v-for="(item, index) in list" :slot="item.index" :key="index">
              <IndexesAnchor :index="item.index"></IndexesAnchor>
              <TCell v-for="val in item.children" class="indexes-cell">{{val}}</TCell>
            </template>
          </Indexes>
        `,
        data() {
          return {
            indexList,
            list,
          };
        },
        methods: {
          select(index) {
            selectFn(index);
          },
          change(index) {
            changeFn(index);
          },
        },
      });
      await wrapper.find(`.${indexesClass}__sidebar-item`).trigger('click');
      expect(selectFn).toBeCalledWith(list[0].index);

      const items = wrapper.findAll(`.${indexesClass}__sidebar-item`);
      await items[1].trigger('click');
      expect(selectFn).toBeCalledWith(list[1].index);
      expect(changeFn).toBeCalledWith(list[1].index);
    });

    it(': touch sidebar show tips', async () => {
      const selectFn = vi.fn();
      const wrapper = mount({
        components: { Indexes, IndexesAnchor, TCell },
        template: `
          <Indexes :indexList="indexList" @select="select">
            <template v-for="(item, index) in list" :slot="item.index" :key="index">
              <IndexesAnchor :index="item.index"></IndexesAnchor>
              <TCell v-for="val in item.children" class="indexes-cell">{{val}}</TCell>
            </template>
          </Indexes>
        `,
        data() {
          return {
            indexList,
            list,
          };
        },
        methods: {
          select(index) {
            selectFn(index);
          },
        },
      });
      await wrapper.find('.t-indexes__sidebar-item').trigger('click');
      expect(selectFn).toBeCalledWith(list[0].index);
      expect(wrapper.find('.t-indexes__sidebar-tip')).toBeDefined();
      wrapper.unmount();
    });

    it(': sidebar touchmove', async () => {
      const wrapper = mount({
        components: { Indexes, IndexesAnchor, TCell },
        template: `
          <Indexes :indexList="indexList">
            <template v-for="(item, index) in list" :slot="item.index" :key="index">
              <IndexesAnchor :index="item.index"></IndexesAnchor>
              <TCell v-for="val in item.children" class="indexes-cell">{{val}}</TCell>
            </template>
          </Indexes>
        `,
        data() {
          return {
            indexList,
            list,
          };
        },
      });
      const sidebar = wrapper.find(`.${componentName}__sidebar`);
      document.elementFromPoint = function () {
        return sidebar.findAll(`.${componentName}__sidebar-item`)[0].element;
      };
      await trigger(sidebar, 'touchstart', 20, 20);
      await trigger(sidebar, 'touchmove', 20, 60);
      await trigger(sidebar, 'touchend', 20, 310);
    });
  });
});

describe('Indexes & IndexesAnchor', () => {
  it('render', () => {
    const wrapper = mount({
      setup() {
        return () => (
          <Indexes indexList={indexList}>
            {{
              default: list.map((item, index) => (
                <template>
                  <IndexesAnchor index={item.index} key={index}></IndexesAnchor>
                  {item.children.map((val) => (
                    <TCell className="indexes-cell">{val}</TCell>
                  ))}
                </template>
              )),
            }}
          </Indexes>
        );
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe('event', () => {
  it('@touch', async () => {
    const onSelect = vi.fn();
    const onChange = vi.fn();
    const wrapper = mount(Indexes, {
      props: {
        indexList,
        onSelect,
        onChange,
      },
    });

    const sidebar = wrapper.find(`.${componentName}__sidebar`);

    const $sideBarItems = wrapper.findAll(`.${componentName}__sidebar-item`);
    // 模拟点击第一项 item, 此时第一项为激活态，两个事件均被触发
    await $sideBarItems[0].trigger('click');
    expect(onChange).toBeCalledTimes(1);
    expect(onSelect).toBeCalledTimes(1);
    expect($sideBarItems[0].classes()).toContain(`${componentName}__sidebar-item--active`);

    // mock document.elementFromPoint
    document.elementFromPoint = function () {
      return sidebar.findAll(`.${componentName}__sidebar-item`)[2].element;
    };

    // 每一项的高度是20，这里以第0项为起始点，模拟滑动 40，此时第3项转为激活态，只会触发 change 事件
    await move($sideBarItems[0], 40);
    expect(wrapper.findAll(`.${componentName}__sidebar-item`)[2].classes()).toContain(
      `${componentName}__sidebar-item--active`,
    );
    expect(onSelect).toBeCalledTimes(1);
    expect(onChange).toBeCalledTimes(2);
  });
});

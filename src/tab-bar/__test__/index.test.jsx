import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import TabBar from '../tab-bar';
import TabBarItem from '../tab-bar-item';

const list = [
  {
    name: 'label_1',
    text: '标签一',
    icon: undefined,
    value: '1',
  },
  {
    name: 'label_2',
    text: '标签二',
    icon: undefined,
    value: '2',
  },
  {
    name: 'label_3',
    text: '此处展开',
    icon: undefined,
    value: '3',
    subTabBar: [
      {
        name: 'spread_1',
        text: '展开项一',
        icon: undefined,
        value: '3-1',
      },
      {
        name: 'spread_2',
        text: '展开项二',
        icon: undefined,
        value: '3-2',
      },
      {
        name: 'spread_3',
        text: '展开项三',
        icon: undefined,
        value: '3-3',
      },
    ],
  },
];

describe('TabBar', () => {
  describe('effect contract', () => {
    it('uses normal as the default effect', () => {
      expect(TabBar.props.effect.default).toBe('normal');
    });

    it('accepts normal and glass effects', () => {
      expect(TabBar.props.effect.validator('normal')).toBe(true);
      expect(TabBar.props.effect.validator('glass')).toBe(true);
    });

    it('rejects unsupported effects', () => {
      expect(TabBar.props.effect.validator('other')).toBe(false);
    });
  });

  describe('props', () => {
    it('moves one shared glass selection capsule between round items', async () => {
      const value = ref('1');
      const wrapper = mount({
        render: () => (
          <TabBar v-model={value.value} effect="glass" shape="round" fixed={false}>
            {list.map((item) => (
              <TabBarItem {...item}>{item.text}</TabBarItem>
            ))}
          </TabBar>
        ),
      });

      const indicator = wrapper.get('.t-tab-bar__selection-indicator');
      expect(wrapper.findAll('.t-tab-bar__selection-indicator')).toHaveLength(1);
      expect(indicator.element.style.width).toBe(`${100 / list.length}%`);
      expect(indicator.element.style.transform).toBe('translate3d(0%, 0, 0)');

      await wrapper.get('[name="label_2"] > .t-tab-bar-item__content').trigger('click');
      expect(indicator.element.style.transform).toBe('translate3d(100%, 0, 0)');
    });

    it('scales the pressed item and shared capsule until the press ends', async () => {
      const value = ref('1');
      const wrapper = mount({
        render: () => (
          <TabBar v-model={value.value} effect="glass" shape="round" fixed={false}>
            {list.map((item) => (
              <TabBarItem {...item}>{item.text}</TabBarItem>
            ))}
          </TabBar>
        ),
      });

      const indicator = wrapper.get('.t-tab-bar__selection-indicator');
      const firstItem = wrapper.get('[name="label_1"] > .t-tab-bar-item__content');
      const secondItem = wrapper.get('[name="label_2"] > .t-tab-bar-item__content');

      await secondItem.trigger('pointerdown', { button: 0 });
      expect(firstItem.classes()).not.toContain('t-tab-bar-item__content--checked');
      expect(secondItem.classes()).toContain('t-tab-bar-item__content--checked');
      expect(secondItem.classes()).toContain('t-tab-bar-item__content--pressed');
      expect(indicator.classes()).toContain('t-tab-bar__selection-indicator--pressed');
      expect(indicator.element.style.transform).toBe('translate3d(100%, 0, 0)');

      await secondItem.trigger('pointercancel');
      expect(firstItem.classes()).toContain('t-tab-bar-item__content--checked');
      expect(secondItem.classes()).not.toContain('t-tab-bar-item__content--checked');
      expect(secondItem.classes()).not.toContain('t-tab-bar-item__content--pressed');
      expect(indicator.classes()).not.toContain('t-tab-bar__selection-indicator--pressed');
      expect(indicator.element.style.transform).toBe('translate3d(0%, 0, 0)');
    });

    it('does not render the shared capsule outside glass round mode', () => {
      const wrapper = mount({
        render: () => (
          <TabBar value="1" effect="glass" shape="normal" fixed={false}>
            {list.map((item) => (
              <TabBarItem {...item}>{item.text}</TabBarItem>
            ))}
          </TabBar>
        ),
      });

      expect(wrapper.find('.t-tab-bar__selection-track').exists()).toBe(false);
    });

    it('bordered', async () => {
      const wrapper = mount(TabBar, {
        shallow: true,
      });
      expect(wrapper.classes()).toContain('t-tab-bar--bordered');

      await wrapper.setProps({ bordered: false });
      expect(wrapper.classes()).not.toContain('t-tab-bar--bordered');
    });

    it('fixed', async () => {
      const wrapper = mount(TabBar, {
        shallow: true,
      });
      expect(wrapper.classes()).toContain('t-tab-bar--fixed');

      await wrapper.setProps({ fixed: false });
      expect(wrapper.classes()).not.toContain('t-tab-bar--fixed');
    });

    it('defaultValue', async () => {
      const wrapper = mount({
        render: () => (
          <TabBar defaultValue={'2'}>
            {list.map((item) => {
              return <TabBarItem {...item}>{item.text}</TabBarItem>;
            })}
          </TabBar>
        ),
      });

      expect(wrapper.findAll('.t-tab-bar-item')).toHaveLength(list.length);
      // expect(
      //   wrapper
      //     .findAllComponents(TabBarItem)
      //     .find((item) => item.vm.isChecked)
      //     .text(),
      // ).toEqual('标签二');
    });

    it('item without value', async () => {
      const wrapper = mount({
        render() {
          return (
            <TabBar value={0}>
              <TabBarItem></TabBarItem>
            </TabBar>
          );
        },
      });

      const item = wrapper.findComponent('.t-tab-bar-item');
      // expect(item.vm.isChecked).toBeTruthy();
    });
  });

  describe('events', () => {
    it('click', async () => {
      const onChange = vi.fn();
      const value = ref('1');
      const wrapper = mount({
        render: () => (
          <TabBar v-model={value.value} onChange={onChange}>
            {list.map((item) => {
              return <TabBarItem {...item} />;
            })}
          </TabBar>
        ),
      });

      // 从 bar1 切到 bar2
      const bar2 = wrapper.find('[name="label_2"] > .t-tab-bar-item__content');
      expect(onChange).toHaveBeenCalledTimes(0);
      await bar2.trigger('click');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith('2');

      // 从 bar2 切到 bar3
      const bar3 = wrapper.find('[name="label_3"] > .t-tab-bar-item__content');
      await bar3.trigger('click');
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenLastCalledWith(['3']);

      // 点击 spread
      const bar3_1 = wrapper.find('[name="label_3"] .t-tab-bar-item__spread-item');
      await bar3_1.trigger('click');
      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onChange).toHaveBeenLastCalledWith(['3', '3-1']);
      expect(wrapper.find('[name="label_3"]').find('.t-tab-bar-item__spread-item').exists()).toBe(false);
    });
  });
});

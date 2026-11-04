import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { h } from 'vue';

import SideBar from '../index';
import SideBarItem from '../side-bar-item';
import Badge from '../../badge';
import type { BadgeProps } from '../../badge';

const prefix = 't';
const name = `${prefix}-side-bar-item`;
const badgeName = `${prefix}-badge`;

describe('SideBarItem', () => {
  describe('props', () => {
    it('badgeProps[object]', () => {
      const testBadge = (badgeProps: BadgeProps | null | undefined, result: boolean) => {
        const wrapper = mount(
          <SideBar>
            <SideBarItem value={0} label="选项一" badgeProps={badgeProps} />
          </SideBar>,
        );
        expect(wrapper.findComponent(Badge).exists()).toBe(result);
      };

      testBadge(undefined, false);
      testBadge(null, false);
      testBadge({ dot: true }, true);
      testBadge({ count: 6 }, true);

      // label 作为 Badge 的 content 渲染，圆点正常展示
      const dotWrapper = mount(
        <SideBar>
          <SideBarItem value={0} label="选项一" badgeProps={{ dot: true }} />
        </SideBar>,
      );
      expect(dotWrapper.find(`.${badgeName}--dot`).exists()).toBe(true);
      expect(dotWrapper.find(`.${badgeName}__content-text`).text()).toBe('选项一');

      // 透传 count 至 Badge
      const countWrapper = mount(
        <SideBar>
          <SideBarItem value={0} label="选项一" badgeProps={{ count: 6 }} />
        </SideBar>,
      );
      expect(countWrapper.find(`.${badgeName}--count`).exists()).toBe(true);
      expect(countWrapper.find(`.${badgeName}__count`).text()).toBe('6');

      // 未传 badgeProps 时以纯文本渲染 label，不渲染徽标
      const plainWrapper = mount(
        <SideBar>
          <SideBarItem value={0} label="选项一" />
        </SideBar>,
      );
      expect(plainWrapper.find(`.${badgeName}`).exists()).toBe(false);
      expect(plainWrapper.find(`.${name}`).text()).toBe('选项一');
    });

    it('disabled[boolean]', async () => {
      const testDisabled = (disabled: boolean, result: boolean) => {
        const wrapper = mount(
          <SideBar>
            <SideBarItem value={0} label="选项一" disabled={disabled} />
          </SideBar>,
        );
        expect(wrapper.find(`.${name}--disabled`).exists()).toBe(result);
      };

      testDisabled(true, true);
      testDisabled(false, false);

      // 禁用项点击不触发 SideBar 的 click/change，激活态保持
      const onClick = vi.fn();
      const onChange = vi.fn();
      const wrapper = mount(
        <SideBar defaultValue={1} onClick={onClick} onChange={onChange}>
          <SideBarItem value={0} label="选项一" disabled />
          <SideBarItem value={1} label="选项二" />
        </SideBar>,
      );

      await wrapper.findAll(`.${name}`)[0].trigger('click');
      expect(onClick).not.toHaveBeenCalled();
      expect(onChange).not.toHaveBeenCalled();
      expect(wrapper.findAll(`.${name}`)[1].classes()).toContain(`${name}--active`);
    });

    it('icon[function]', () => {
      const wrapper = mount(
        <SideBar>
          <SideBarItem value={0} icon={() => h('div', { class: 'custom-icon' })} />
        </SideBar>,
      );
      expect(wrapper.find(`.${name}__icon`).exists()).toBe(true);
      expect(wrapper.find(`.${name}__icon .custom-icon`).exists()).toBe(true);

      // 未传 icon 时不渲染图标节点
      const wrapper2 = mount(
        <SideBar>
          <SideBarItem value={0} />
        </SideBar>,
      );
      expect(wrapper2.find(`.${name}__icon`).exists()).toBe(false);
    });

    it('label[string]', () => {
      const wrapper = mount(
        <SideBar>
          <SideBarItem value={0} label="tdesign mobile vue" />
        </SideBar>,
      );
      expect(wrapper.find(`.${name}`).text()).toBe('tdesign mobile vue');

      // 未传 label 时默认值为空字符串
      const emptyWrapper = mount(
        <SideBar>
          <SideBarItem value={0} />
        </SideBar>,
      );
      expect(emptyWrapper.find(`.${name}`).text()).toBe('');
    });

    it('value[string]', () => {
      const wrapper = mount(
        <SideBar value="b">
          <SideBarItem value="a" label="第一项" />
          <SideBarItem value="b" label="第二项" />
        </SideBar>,
      );
      const $items = wrapper.findAll(`.${name}`);
      // value 与分组当前值匹配的子项为选中态
      expect($items[0].classes()).not.toContain(`${name}--active`);
      expect($items[1].classes()).toContain(`${name}--active`);
      expect($items[1].find(`.${name}__line`).exists()).toBe(true);
      expect($items[0].find(`.${name}__line`).exists()).toBe(false);
    });

    it('value[number]', () => {
      const wrapper = mount(
        <SideBar value={1}>
          <SideBarItem value={0} label="第一项" />
          <SideBarItem value={1} label="第二项" />
        </SideBar>,
      );
      const $items = wrapper.findAll(`.${name}`);
      expect($items[0].classes()).not.toContain(`${name}--active`);
      expect($items[1].classes()).toContain(`${name}--active`);
      expect($items[1].find(`.${name}__line`).exists()).toBe(true);
      expect($items[0].find(`.${name}__line`).exists()).toBe(false);
    });
  });

  describe('slots', () => {
    it('icon', () => {
      const wrapper = mount(
        <SideBar>
          <SideBarItem value={0} label="选项一" v-slots={{ icon: () => <div class="slot-icon">插槽图标</div> }} />
        </SideBar>,
      );

      const $icon = wrapper.find(`.${name}__icon`);
      expect($icon.exists()).toBe(true);
      expect($icon.find('.slot-icon').text()).toBe('插槽图标');
    });
  });

  describe('scenarios', () => {
    describe('active indicator', () => {
      it('renders line prefix suffix only on the active item', () => {
        const wrapper = mount(
          <SideBar value={1}>
            <SideBarItem value={0} label="选项一" />
            <SideBarItem value={1} label="选项二" />
          </SideBar>,
        );

        const $items = wrapper.findAll(`.${name}`);
        expect($items[1].find(`.${name}__line`).exists()).toBe(true);
        expect($items[1].find(`.${name}__prefix`).exists()).toBe(true);
        expect($items[1].find(`.${name}__suffix`).exists()).toBe(true);
        expect($items[0].find(`.${name}__line`).exists()).toBe(false);
        expect($items[0].find(`.${name}__prefix`).exists()).toBe(false);
        expect($items[0].find(`.${name}__suffix`).exists()).toBe(false);
      });

      it('moves the indicator after clicking another item', async () => {
        const wrapper = mount(
          <SideBar defaultValue={0}>
            <SideBarItem value={0} label="选项一" />
            <SideBarItem value={1} label="选项二" />
          </SideBar>,
        );

        let $items = wrapper.findAll(`.${name}`);
        expect($items[0].find(`.${name}__line`).exists()).toBe(true);

        await $items[1].trigger('click');
        $items = wrapper.findAll(`.${name}`);
        expect($items[1].find(`.${name}__line`).exists()).toBe(true);
        expect($items[0].find(`.${name}__line`).exists()).toBe(false);
      });
    });

    describe('icon priority', () => {
      it('icon prop takes priority over icon slot', () => {
        const wrapper = mount(
          <SideBar>
            <SideBarItem
              value={0}
              label="选项一"
              icon={() => h('div', { class: 'prop-icon' })}
              v-slots={{ icon: () => <div class="slot-icon">插槽图标</div> }}
            />
          </SideBar>,
        );

        expect(wrapper.find(`.${name}__icon .prop-icon`).exists()).toBe(true);
        expect(wrapper.find('.slot-icon').exists()).toBe(false);
      });
    });
  });
});

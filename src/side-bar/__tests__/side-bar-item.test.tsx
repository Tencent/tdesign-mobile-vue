import { mount } from '@vue/test-utils';
import { h } from 'vue';

import SideBar from '../index';
import SideBarItem from '../side-bar-item';
import Badge from '../../badge';

describe('SideBarItem', () => {
  describe('props', () => {
    it('icon[function]', () => {
      const wrapper = mount(
        <SideBar>
          <SideBarItem value={0} icon={() => h('div', { class: 'custom-icon' })} />
        </SideBar>,
      );
      expect(wrapper.find('.t-side-bar-item__icon').exists()).toBe(true);
      expect(wrapper.find('.t-side-bar-item__icon .custom-icon').exists()).toBe(true);

      // 未传 icon 时不渲染图标节点
      const wrapper2 = mount(
        <SideBar>
          <SideBarItem value={0} />
        </SideBar>,
      );
      expect(wrapper2.find('.t-side-bar-item__icon').exists()).toBe(false);
    });

    it('badgeProps[object]', () => {
      const testBadge = (badgeProps, result) => {
        const wrapper = mount(
          <SideBar>
            <SideBarItem value={0} badgeProps={badgeProps} />
          </SideBar>,
        );
        expect(wrapper.findComponent(Badge).exists()).toBe(result);
      };

      testBadge(undefined, false);
      testBadge(null, false);
      testBadge({ dot: true }, true);
    });

    it('disabled[boolean]', () => {
      const testDisabled = (disabled, result) => {
        const wrapper = mount(
          <SideBar>
            <SideBarItem value={0} disabled={disabled} />
          </SideBar>,
        );
        expect(wrapper.find('.t-side-bar-item--disabled').exists()).toBe(result);
      };

      testDisabled(true, true);
      testDisabled(false, false);
    });

    it('label[string]', () => {
      const testLabel = (label) => {
        expect(document.body.textContent.includes(label)).toBe(false);
        const wrapper = mount(
          <SideBar>
            <SideBarItem value={0} label={label} />
          </SideBar>,
          {
            attachTo: 'body',
          },
        );
        expect(document.body.textContent.includes(label)).toBe(true);
        expect(wrapper.element.textContent.includes(label)).toBe(true);
      };

      testLabel('tdesign mobile vue');
    });
  });
});

import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { onMounted, ref } from 'vue';

import SideBar from '../index';
import SideBarItem from '../side-bar-item';
import Badge from '../../badge';
import { sleep } from '../../shared/util';

describe('side-bar', () => {
  describe('props', () => {
    it(':value', () => {
      const testValue = (value, result) => {
        const wrapper = mount(
          <SideBar value={value}>
            <SideBarItem value={0} />
          </SideBar>,
        );
        expect(wrapper.find('.t-side-bar-item__line').exists()).toBe(result);
      };
      testValue(1, false);
      testValue(0, true);
    });

    it(':icon', () => {
      const testIcon = (icon, result) => {
        const wrapper = mount(
          <SideBar>
            <SideBarItem value={0} icon={icon} />
          </SideBar>,
        );
        expect(wrapper.find('.t-side-bar-item__icon').exists()).toBe(result);
      };
      testIcon('', false);
      testIcon('app', true);
    });

    it(':badge', () => {
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
      testBadge('', false);
      testBadge({ dot: true }, true);
    });

    it(':disabled', () => {
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

    it(':label', () => {
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

  describe('event', () => {
    it(':click', () => {
      const testClick = (disabled) => {
        const onClick = vi.fn();
        const value = 0;
        const label = 'tdesign-mobile-vue';
        const wrapper = mount(
          <SideBar onClick={onClick}>
            <SideBarItem value={value} label={label} disabled={disabled} />
          </SideBar>,
        );

        const item = wrapper.find('.t-side-bar-item');
        expect(item.exists()).toBeTruthy();
        item.trigger('click');
        expect(onClick).toHaveBeenCalledTimes(disabled ? 0 : 1);
        if (!disabled) {
          expect(onClick).toHaveBeenLastCalledWith(value, label);
        }
      };
      testClick();
      testClick(true);
    });
  });

  describe('child unmount', () => {
    it('child unmount', async () => {
      const wrapper = mount({
        setup() {
          const showFirstItem = ref(true);
          onMounted(() => {
            setTimeout(() => {
              showFirstItem.value = false;
            }, 1000);
          });

          return () => (
            <SideBar>
              {showFirstItem.value && <SideBarItem value={0} />}
              <SideBarItem value={1} />
            </SideBar>
          );
        },
      });

      expect(wrapper.findAllComponents(SideBarItem).length).toBe(2);
      await sleep(1000);
      expect(wrapper.findAllComponents(SideBarItem).length).toBe(1);
    });
  });
});

import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { onMounted, ref } from 'vue';

import SideBar from '../index';
import SideBarItem from '../side-bar-item';
import { sleep } from '../../shared/util';

describe('SideBar', () => {
  describe('props', () => {
    it('value[number]', () => {
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

    it('value[string]', () => {
      const wrapper = mount(
        <SideBar value={'0'}>
          <SideBarItem value={'0'} />
        </SideBar>,
      );
      expect(wrapper.find('.t-side-bar-item__line').exists()).toBe(true);
    });

    it('defaultValue[number]', () => {
      const wrapper = mount(
        <SideBar defaultValue={0}>
          <SideBarItem value={0} />
        </SideBar>,
      );
      expect(wrapper.find('.t-side-bar-item__line').exists()).toBe(true);
    });
  });

  describe('events', () => {
    it('click', () => {
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

  describe('scenarios', () => {
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

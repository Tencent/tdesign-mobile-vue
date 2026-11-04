import { h, ref, defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import useChildSlots from '../useChildSlots';
import { useIcon } from '../icon';
import { useCommonClassName } from '../useCommonClassName';
import { usePrefixClass } from '../useClass';
import useToggle from '../useToggle';

describe('hooks', () => {
  describe('useToggle', () => {
    it('uses the second value by default and toggles between values', () => {
      const { state, toggle } = useToggle(['on', 'off']);
      expect(state.value).toBe('off');
      toggle();
      expect(state.value).toBe('on');
      toggle('off');
      expect(state.value).toBe('off');
    });

    it('supports a ref as the initial value', () => {
      const initial = ref(true);
      const { state } = useToggle([true, false], initial);
      expect(state).toBe(initial);
    });
  });

  describe('useClass and useCommonClassName', () => {
    it('creates a prefixed component class', () => {
      expect(usePrefixClass('button').value).toBe('t-button');
      expect(usePrefixClass().value).toBe('t');
    });

    it('provides the common size and status classes', () => {
      const classes = useCommonClassName();
      expect(classes.SIZE.value).toMatchObject({ small: 't-size-s', block: 't-size-full-width', default: '' });
      expect(classes.STATUS.value).toMatchObject({ loading: 't-is-loading', disabled: 't-is-disabled' });
    });
  });

  describe('useIcon', () => {
    const IconTester = defineComponent({
      props: { icon: [String, Function], theme: { type: String, default: 'default' } },
      setup(props) {
        const renderIcon = useIcon();
        return () => <div>{renderIcon('icon', { default: h('span', 'default icon') })}</div>;
      },
    });

    it('renders an icon function with h', () => {
      const icon = vi.fn(() => <span>function icon</span>);
      const wrapper = mount(IconTester, { props: { icon } });
      expect(wrapper.text()).toBe('function icon');
      expect(icon).toHaveBeenCalledWith(expect.any(Function));
    });

    it('renders an icon slot before the default icon', () => {
      const wrapper = mount(IconTester, { slots: { icon: () => [h('span', 'slot icon')] } });
      expect(wrapper.text()).toBe('slot icon');
    });

    it('renders the default icon for the current theme', () => {
      const wrapper = mount(IconTester, { props: { icon: undefined } });
      expect(wrapper.text()).toBe('default icon');
    });
  });

  describe('useChildSlots', () => {
    it('returns only direct children with the requested component name', () => {
      const Child = defineComponent({ name: 'TargetChild', setup: () => () => h('span') });
      const Other = defineComponent({ name: 'OtherChild', setup: () => () => h('span') });
      const children = [h(Child), h(Other), h(Child)];
      const result = useChildSlots('TargetChild', children);
      expect(result).toHaveLength(2);
      expect(result.every((item) => item.type === Child)).toBe(true);
    });

    it('returns an empty list for non-VNode children', () => {
      expect(useChildSlots('TargetChild', ['text', null] as any)).toEqual([]);
    });
  });
});

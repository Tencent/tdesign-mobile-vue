import { computed, reactive, ref } from 'vue';
import { describe, expect, it } from 'vitest';
import { getOptions, getOptionListBySlots } from '../hooks/getOptions';
import { setCheckAllStatus } from '../hooks/setCheckAllStatus';
import Checkbox from '../checkbox';

describe('Checkbox hooks', () => {
  describe('getOptionListBySlots', () => {
    it('extracts values and normalizes check-all', () => {
      const options = getOptionListBySlots([
        <Checkbox check-all="" label="全选" />,
        <Checkbox value="one" label="选项一" />,
        <span />,
      ]);
      expect(options).toHaveLength(2);
      expect(options[0]).toMatchObject({ checkAll: true, label: '全选' });
      expect(options[1]).toMatchObject({ value: 'one', label: '选项一' });
    });

    it('preserves explicit true and false check-all flags', () => {
      const options = getOptionListBySlots([<Checkbox check-all={true} />, <Checkbox check-all={false} value="one" />]);
      expect(options[0].checkAll).toBe(true);
      expect(options[1].checkAll).toBeUndefined();
      expect(options[1]).toHaveProperty('check-all', false);
    });
  });

  describe('getOptions', () => {
    it('normalizes primitive options and copies object options', () => {
      const option = { value: 'three', label: '选项三' };
      const props = reactive({ options: ['one', 2, option] });
      const result = getOptions(props, {});
      expect(result.value).toEqual([{ label: 'one', value: 'one' }, { label: '2', value: 2 }, option]);
      expect(result.value[2]).not.toBe(props.options[2]);
      props.options = [];
      expect(result.value).toEqual([]);
    });

    it('falls back to Checkbox slots when options are empty', () => {
      const props = reactive({ options: ['configured'] });
      const result = getOptions(props, {
        default: () => [
          <div>
            <Checkbox value="slot" label="插槽选项" />
          </div>,
          <span>非选项节点</span>,
        ],
      });
      expect(result.value).toEqual([{ value: 'configured', label: 'configured' }]);
      props.options = [];
      expect(result.value).toHaveLength(1);
      expect(result.value[0]).toMatchObject({ value: 'slot', label: '插槽选项' });
    });
  });

  describe('setCheckAllStatus', () => {
    it('tracks unchecked, indeterminate and checked states using valid options', () => {
      const options = ref([{ checkAll: true }, { value: 'one' }, { value: 'two' }, { label: '无值' }]);
      const value = ref<string[]>([]);
      const checkedSet = computed(() => new Set(value.value));
      const status = setCheckAllStatus(options, value, checkedSet);
      expect(status.value).toBe('uncheck');
      value.value = ['one'];
      expect(status.value).toBe('indeterminate');
      value.value = ['one', 'two', 'stale'];
      expect(status.value).toBe('checked');
      value.value = ['stale'];
      expect(status.value).toBe('uncheck');
      options.value = [];
      expect(status.value).toBe('uncheck');
    });

    it('does not treat duplicate or stale values as all checked', () => {
      const options = ref([{ value: 0 }, { value: false }]);
      const value = ref<Array<number | boolean | string>>([0, 0, 'stale']);
      const status = setCheckAllStatus(
        options,
        value,
        computed(() => new Set(value.value)),
      );
      expect(status.value).toBe('indeterminate');
      value.value = [0, false, 'stale'];
      expect(status.value).toBe('checked');
    });

    it('returns unchecked for non-array values', () => {
      const options = ref([{ value: 'one' }]);
      const value = ref('one');
      const status = setCheckAllStatus(
        options,
        value,
        computed(() => new Set(['one'])),
      );
      expect(status.value).toBe('uncheck');
    });
  });
});

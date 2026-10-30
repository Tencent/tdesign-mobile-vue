import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import PickerItem from '../picker-item';

const seasonOptions = [
  { label: '春', value: 'spring' },
  { label: '夏', value: 'summer' },
  { label: '秋', value: 'autumn' },
  { label: '冬', value: 'winter' },
];

describe('PickerItem', () => {
  describe('instanceFunctions', () => {
    it('setIndex', async () => {
      const pickerItemRef = ref(null);
      const wrapper = mount({
        render() {
          return <PickerItem ref={pickerItemRef} options={seasonOptions} />;
        },
      });

      pickerItemRef.value.setIndex(2);
      await nextTick();

      const textContainer = wrapper.find('.t-picker-item__item--active');
      expect(textContainer.text()).toBe(seasonOptions[2].label);
    });

    it('setValue', async () => {
      const pickerItemRef = ref(null);
      const wrapper = mount({
        render() {
          return <PickerItem ref={pickerItemRef} options={seasonOptions} />;
        },
      });

      pickerItemRef.value.setValue(seasonOptions[2].value);
      await nextTick();

      const textContainer = wrapper.find('.t-picker-item__item--active');
      expect(textContainer.text()).toBe(seasonOptions[2].label);
    });

    it('setOptions', async () => {
      const pickerItemRef = ref(null);
      const optionsRef = ref(seasonOptions);
      const wrapper = mount({
        render() {
          return <PickerItem ref={pickerItemRef} options={optionsRef.value} />;
        },
      });

      let itemContainers = wrapper.findAll('.t-picker-item__item');
      expect(itemContainers).toHaveLength(optionsRef.value.length);

      optionsRef.value = [seasonOptions[0]];
      pickerItemRef.value.setOptions();
      await nextTick();

      itemContainers = wrapper.findAll('.t-picker-item__item');
      expect(itemContainers).toHaveLength(optionsRef.value.length);
    });
  });
});

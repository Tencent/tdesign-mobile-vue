import { ref, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import Checkbox, { CheckboxGroup } from '../index';

describe('Checkbox', () => {
  describe('with group', () => {
    test('on change', async () => {
      const checked = ref([]);
      const wrapper = mount({
        setup() {
          return () => (
            <CheckboxGroup v-model={checked.value}>
              <Checkbox value="1" ref="1" />
              <Checkbox value="2" ref="2" />
            </CheckboxGroup>
          )
        }
      });

      expect(checked.value.length).toBe(0);

      const target = wrapper.findComponent({ ref: '1'});     
      await target.find('.t-checkbox__original-left').trigger('click')
      
      expect(wrapper.findComponent({ ref: '1'}).vm.isChecked).toBe(true);
      expect(checked.value).toContain('1');

      await target.find('.t-checkbox__original-left').trigger('click')

      expect(wrapper.findComponent({ ref: '1'}).vm.isChecked).toBe(false);
      expect(checked.value.length).toBe(0);
    });

    test('checkall', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <CheckboxGroup default-value={[]}>
              <Checkbox value="1" ref="1" check-all />
              <Checkbox value="2" ref="2" />
              <Checkbox value="3" ref="3" />
            </CheckboxGroup>
          )
        }
      });

      await wrapper.findComponent({ ref: '1'}).find('.t-checkbox__original-left').trigger('click')
      
      expect(wrapper.findComponent({ ref: '2'}).vm.isChecked).toBe(true);
      expect(wrapper.findComponent({ ref: '3'}).vm.isChecked).toBe(true);

      await wrapper.findComponent({ ref: '1'}).find('.t-checkbox__original-left').trigger('click')

      expect(wrapper.findComponent({ ref: '2'}).vm.isChecked).toBe(false);
      expect(wrapper.findComponent({ ref: '3'}).vm.isChecked).toBe(false);
    })

    test('max', async () => {
      const checked = ref([]);
      const wrapper = mount({
        setup() {
          return () => (
            <CheckboxGroup v-model={checked.value} max={2}>
              <Checkbox value="1" ref="1" />
              <Checkbox value="2" ref="2" />
              <Checkbox value="3" ref="3" />
            </CheckboxGroup>
          )
        }
      });

      await wrapper.findComponent({ ref: '1'}).find('.t-checkbox__original-left').trigger('click')
      
      expect(wrapper.findComponent({ ref: '1'}).vm.isChecked).toBe(true);

      await wrapper.findComponent({ ref: '2'}).find('.t-checkbox__original-left').trigger('click')

      expect(wrapper.findComponent({ ref: '2'}).vm.isChecked).toBe(true);
      expect(wrapper.findComponent({ ref: '3'}).vm.isDisabled).toBe(true);
    })
  })
})

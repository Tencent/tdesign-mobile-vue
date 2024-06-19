import { ref, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import Checkbox, { CheckboxGroup } from '../index';
import config from '../../config';

const { prefix } = config;
const name = `${prefix}-checkbox`;

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
          );
        },
      });

      expect(checked.value.length).toBe(0);

      const target = wrapper.findComponent({ ref: '1' });
      await target.find(`.${name}--left`).trigger('click');

      // expect(wrapper.findComponent({ ref: '1' }).vm.isChecked).toBe(true);
      expect(checked.value).toContain('1');

      await target.find(`.${name}--left`).trigger('click');

      // expect(wrapper.findComponent({ ref: '1' }).vm.isChecked).toBe(false);
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
          );
        },
      });

      await wrapper.findComponent({ ref: '1' }).find(`.${name}--left`).trigger('click');

      // expect(wrapper.findComponent({ ref: '2' }).vm.isChecked).toBe(true);
      // expect(wrapper.findComponent({ ref: '3' }).vm.isChecked).toBe(true);

      await wrapper.findComponent({ ref: '1' }).find(`.${name}--left`).trigger('click');

      // expect(wrapper.findComponent({ ref: '2' }).vm.isChecked).toBe(false);
      // expect(wrapper.findComponent({ ref: '3' }).vm.isChecked).toBe(false);
    });

    test(':options', () => {
      const defaultValue = ref(['1']);
      const options = [
        {
          label: '选项一',
          value: '1',
        },
        {
          label: '选项二',
          value: '2',
        },
      ];
      const wrapper = mount(() => <CheckboxGroup defaultValue={defaultValue.value} options={options} />);
      const $checkboxs = wrapper.findAllComponents(Checkbox);
      expect($checkboxs.length).toBe(2);
      // expect($checkboxs[0].vm.isChecked).toBeTruthy();
      // expect($checkboxs[1].vm.isChecked).toBeFalsy();
    });

    test(':value bad', async () => {
      const checked = ref('1');
      const wrapper = mount(() => (
        <CheckboxGroup v-model={checked}>
          <Checkbox value="1" />
          <Checkbox value="2" />
        </CheckboxGroup>
      ));
      const logSpy = vi.spyOn(global.console, 'warn');
      const target = wrapper.findAllComponents(Checkbox)[0];
      await target.trigger('click');
      // expect(logSpy).toHaveBeenCalled();
      expect(logSpy.mock.calls[0][0]).toContain('TDesign CheckboxGroup Warn');
      logSpy.mockRestore();
    });

    test(':value undefined', async () => {
      const defaultValue = ref([]);
      const options = [
        {
          label: '选项一',
          value: undefined,
        },
        {
          label: '选项二',
          value: '2',
        },
      ];
      const wrapper = mount(() => <CheckboxGroup defaultValue={defaultValue.value} options={options} />);
      const target = wrapper.findAllComponents(Checkbox)[0];
      await target.trigger('click');
      // expect(target.vm.isChecked).toBeFalsy();
    });

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
          );
        },
      });

      await wrapper.findComponent({ ref: '1' }).find(`.${name}--left`).trigger('click');

      // expect(wrapper.findComponent({ ref: '1' }).vm.isChecked).toBe(true);

      await wrapper.findComponent({ ref: '2' }).find(`.${name}--left`).trigger('click');

      // expect(wrapper.findComponent({ ref: '2' }).vm.isChecked).toBe(true);
      // expect(wrapper.findComponent({ ref: '3' }).vm.isDisabled).toBe(true);
    });
  });

  describe('single checkbox', () => {
    test(':type custom', async () => {
      const activeImage = 'https://tdesign.gtimg.com/miniprogram/checkbox-checked.png';
      const inActiveImage = 'https://tdesign.gtimg.com/miniprogram/checkbox.png';
      const wrapper = mount(() => <Checkbox icon={[activeImage, inActiveImage]} />);
      const $checkbox = wrapper.findComponent(Checkbox);
      await $checkbox.trigger('click');
      // expect($checkbox.vm.isChecked).toBe(true);
      await $checkbox.trigger('click');
      // expect($checkbox.vm.isChecked).toBe(false);
    });

    test(':type custom2', async () => {
      const wrapper = mount(() => <Checkbox icon={['']} />);
      const $checkbox = wrapper.findComponent(Checkbox);
      await $checkbox.trigger('click');
      expect($checkbox.findComponent('t-icon-check-circle-filled')).exist;
    });

    test(':type rectangle', async () => {
      const wrapper = mount(() => <Checkbox icon="rectangle" />);
      const $checkbox = wrapper.findComponent(Checkbox);
      expect($checkbox.findComponent(`${name}__icon-rectangle`)).exist;
      await $checkbox.trigger('click');
      expect($checkbox.findComponent('t-icon-check-rectangle-filled')).exist;
      // expect($checkbox.vm.isChecked).toBe(true);
    });

    test(':type line', async () => {
      const wrapper = mount(() => <Checkbox icon="line" />);
      const $checkbox = wrapper.findComponent(Checkbox);
      expect($checkbox.findComponent(`${name}__icon-line`)).exist;
      await $checkbox.trigger('click');
    });

    test(':placement right', async () => {
      const wrapper = mount(() => <Checkbox placement="right" />);
      const $checkbox = wrapper.findComponent(Checkbox);
      expect($checkbox.findComponent(`${name}--right`)).exist;
      // expect($checkbox).toMatchSnapshot();
    });

    test(':placement null', async () => {
      const wrapper = mount(() => <Checkbox placement="" />);
      const $checkbox = wrapper.findComponent(Checkbox);
      expect($checkbox.findComponent(`${name}--left`)).exist;
    });

    test(':indeterminate', async () => {
      const wrapper = mount(() => <Checkbox indeterminate default="checkbox" />);
      const $checkbox = wrapper.findComponent(Checkbox);
      await $checkbox.trigger('click');
      expect($checkbox.findComponent('t-icon-minus-circle-filled')).exist;
    });
  });
});

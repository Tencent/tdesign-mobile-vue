import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import { DropdownMenu, DropdownItem } from '../index';

const sleep = (duration) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, duration),
  );

const prefix = 't';
const name = `${prefix}-dropdown-menu`;

const chineseMap = '一二';
const emptyArr = new Array(2).fill(null);
const options = emptyArr.map((_, i) => ({
  label: `选项${chineseMap[i]}`,
  value: `option_${i}`,
  disabled: false,
}));

options.push({
  label: '禁用选项',
  value: 'disabled-item',
  disabled: true,
});

describe('dropdown-menu', () => {
  describe('props', () => {
    it(': button', async () => {
      // 底部 button 仅在 multiple/optionsLayout === 'tree'时，有效
      const value1 = ref(['option_1']);
      const items = [
        {
          value: value1,
          label: '菜单',
          multiple: true,
          options: options,
        },
      ];
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <DropdownMenu>
              {{
                default: items.map((item, index) => {
                  return (
                    <DropdownItem
                      value={item.value.value}
                      label={item.label}
                      multiple={item.multiple}
                      options={item.options}
                      onChange={onChange}
                    />
                  );
                }),
              }}
            </DropdownMenu>
          );
        },
      });
      // todo new dropdown-menu update
      // const $menuLabels = wrapper.findAll(`.${name}__item`);
      // $menuLabels.map((item, index) => {
      //   item.trigger('click', { item, index });
      // });
      // await sleep(200);
      //
      // const $dropdownItems = wrapper.findAll(`.${prefix}-dropdown-item`);
      // expect($dropdownItems[0].attributes('class').includes(`${prefix}-is-expanded`)).toBeTruthy();
      // expect(wrapper.findAllComponents(Button).length).toEqual(2);
      //
      // // 初始化，选中1项
      // expect(wrapper.findAll(`.${prefix}-checkbox-checked`).length).toEqual(1);
      // const $buttons = wrapper.findAll(`.${prefix}-button`);
      // // 重置, 清空,不触发 change, 选中项为 0
      // await $buttons[0].trigger('click');
      // expect(wrapper.findAll(`.${prefix}-checkbox-checked`).length).toEqual(0);
      //
      // // 模拟点击，选中第1项
      // const $checkbox = wrapper.findAll(`.t-checkbox`);
      // await $checkbox[0].find(`.${prefix}-checkbox--left`).trigger('click');
      // // 确定, 触发 change, 返回选中值 [value]
      // await $buttons[1].trigger('click');
      // expect(onChange).toBeCalledTimes(1);
      // expect(onChange).toHaveBeenCalledWith(['option_0']);
    });
  });

  describe('DropdownItem Props', () => {
    it(': label', () => {
      const value1 = ref('option_2');
      const value2 = ref('option_2');
      const items = [
        {
          value: value1,
          label: '菜单',
          disabled: true,
          options: options,
        },
        {
          value: value2,
          label: '菜单',
          disabled: false,
          options: options,
        },
      ];

      const wrapper = mount({
        setup() {
          return () => (
            <DropdownMenu>
              {{
                default: items.map((item, index) => {
                  return (
                    <DropdownItem
                      value={item.value.value}
                      label={item.label}
                      disabled={item.disabled}
                      options={item.options}
                    />
                  );
                }),
              }}
            </DropdownMenu>
          );
        },
      });

      const $menuLabels = wrapper.findAll(`.${name}__item`);
      $menuLabels.map(async (item, index) => {
        expect(item.attributes('class').includes(`${name}__item--disabled`)).toEqual(items[index].disabled);
        expect(item.text()).toEqual(items[index].label);
        await item.trigger('click', { item, index });
      });
    });

    it(': keys', async () => {
      const value1 = ref('option_2');
      const value2 = ref('option_2');

      const options2 = emptyArr.map((_, i) => ({
        name: `选项${chineseMap[i]}`,
        val: `option_${i}`,
        disabled: false,
      }));
      const keys = {
        value: 'val',
        label: 'name',
      };

      const items = [
        {
          value: value1,
          label: '菜单',
          disabled: true,
          options: options2,
        },
        {
          value: value2,
          label: '菜单',
          disabled: false,
          options: options2,
        },
      ];

      const wrapper = mount({
        setup() {
          return () => (
            <DropdownMenu>
              {{
                default: items.map((item, index) => {
                  return (
                    <DropdownItem
                      value={item.value.value}
                      label={item.label}
                      keys={keys}
                      disabled={item.disabled}
                      options={item.options}
                    />
                  );
                }),
              }}
            </DropdownMenu>
          );
        },
      });

      const $menuLabels = wrapper.findAll(`.${name}__item`);
      $menuLabels.map(async (item, index) => {
        expect(item.attributes('class').includes(`${name}__item--disabled`)).toEqual(items[index].disabled);
        expect(item.text()).toEqual(items[index].label);
      });
    });

    it(': optionsColumns', async () => {
      // options-columns值为[1,3]区间内，仅在 multiple = true 时，有效
      const value1 = ref(['option_1']);
      const items = [
        {
          value: value1,
          label: '菜单',
          options: options,
          multiple: true,
          optionsColumns: 2,
        },
      ];
      const wrapper = mount({
        setup() {
          return () => (
            <DropdownMenu>
              {{
                default: items.map((item, index) => {
                  return (
                    <DropdownItem
                      value={item.value.value}
                      label={item.label}
                      multiple={item.multiple}
                      options={item.options}
                      optionsColumns={item.optionsColumns}
                    />
                  );
                }),
              }}
            </DropdownMenu>
          );
        },
      });
      const $menuLabels = wrapper.findAll(`.${name}__item`);
      $menuLabels.map((item, index) => {
        item.trigger('click', { item, index });
      });
      await sleep(200);
      expect(wrapper.find(`.${prefix}-dropdown-item__content`).attributes('class')).toBeTruthy();
    });

    it(': onChange', async () => {
      const value1 = ref(['option_1']);
      const items = [
        {
          value: value1,
          label: '菜单',
          options: options,
        },
      ];
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <DropdownMenu>
              {{
                default: items.map((item, index) => {
                  return (
                    <DropdownItem
                      value={item.value.value}
                      label={item.label}
                      options={item.options}
                      onChange={onChange}
                    />
                  );
                }),
              }}
            </DropdownMenu>
          );
        },
      });
      const $menuLabels = wrapper.findAll(`.${name}__item`);
      $menuLabels.map((item, index) => {
        item.trigger('click', { item, index });
      });
      await sleep(200);
      const $radios = wrapper.findAll(`.t-radio`);
      await $radios[0].trigger('click');
      expect(onChange).toHaveBeenCalledTimes(1);
      // 单选列表，原本为选中态的，再次点击时，不会触发 change
      await $radios[1].trigger('click');
      expect(onChange).toHaveBeenCalledTimes(1);
      // 禁用态按钮，不触发 change
      await $radios[2].trigger('click');
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it(': resetSelect confirmSelect', async () => {
      let value1 = ref(['option_1']);
      const items = [
        {
          value: value1,
          label: '菜单',
          options: options,
          multiple: true,
          optionsColumns: 2,
        },
      ];
      const onReset = vi.fn();
      const onConfirm = vi.fn();
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <DropdownMenu>
              {{
                default: items.map((item, index) => {
                  return (
                    <DropdownItem
                      value={item.value.value}
                      label={item.label}
                      multiple={item.multiple}
                      options={item.options}
                      optionsColumns={item.optionsColumns}
                      onReset={onReset}
                      onConfirm={onConfirm}
                      onChange={onChange}
                    />
                  );
                }),
              }}
            </DropdownMenu>
          );
        },
      });
      const $menuLabels = wrapper.findAll(`.${name}__item`);
      $menuLabels.map((item, index) => {
        item.trigger('click', { item, index });
      });
      await sleep(200);
      const $resetButton = wrapper.find(`.${prefix}-dropdown-item__reset-btn`);
      await $resetButton.trigger('click');
      expect(onReset).toHaveBeenCalledTimes(1);

      const $confirmButton = wrapper.find(`.${prefix}-dropdown-item__confirm-btn`);
      await $confirmButton.trigger('click');
      expect(onConfirm).toHaveBeenCalledTimes(0);

      const $checkbox = wrapper.findAll(`.t-checkbox`);
      await $checkbox[0].trigger('click');
      expect(onChange).toHaveBeenCalledTimes(2);
      await $confirmButton.trigger('click');
      expect(onConfirm).toHaveBeenCalledTimes(1);
    });
  });
});

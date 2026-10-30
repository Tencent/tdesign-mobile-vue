import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import { DropdownMenu, DropdownItem } from '../index';

const sleep = (duration) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });

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

describe('DropdownItem', () => {
  describe('props', () => {
    it('label[string] & disabled[boolean]', () => {
      const value1 = ref('option_2');
      const value2 = ref('option_2');
      const items = [
        {
          value: value1,
          label: '菜单',
          disabled: true,
          options,
        },
        {
          value: value2,
          label: '菜单',
          disabled: false,
          options,
        },
      ];

      const wrapper = mount({
        setup() {
          return () => (
            <DropdownMenu>
              {{
                default: () =>
                  items.map((item, index) => {
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

    it('keys[object]', async () => {
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
                default: () =>
                  items.map((item, index) => {
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

    it('optionsColumns[number]', async () => {
      // options-columns值为[1,3]区间内，仅在 multiple = true 时，有效
      const value1 = ref(['option_1']);
      const items = [
        {
          value: value1,
          label: '菜单',
          options,
          multiple: true,
          optionsColumns: 2,
        },
      ];
      const wrapper = mount({
        setup() {
          return () => (
            <DropdownMenu>
              {{
                default: () =>
                  items.map((item, index) => {
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
      $menuLabels.forEach((item, index) => {
        item.trigger('click', { item, index });
      });
      await sleep(200);
      expect(wrapper.find(`.${prefix}-dropdown-item__content`).attributes('class')).toBeTruthy();
    });

    it('keepLabelActive[boolean]', async () => {
      // keepLabelActive 仅在 multiple = true 且有选中项时生效，保持标题高亮（含菜单收起态）
      const value1 = ref(['option_1']);
      const value2 = ref(['option_1']);
      const value3 = ref([]);
      const items = [
        {
          value: value1,
          label: '保持高亮',
          options,
          multiple: true,
          keepLabelActive: true,
        },
        {
          value: value2,
          label: '不保持高亮',
          options,
          multiple: true,
          keepLabelActive: false,
        },
        {
          value: value3,
          label: '无选中项',
          options,
          multiple: true,
          keepLabelActive: true,
        },
      ];
      const wrapper = mount({
        setup() {
          return () => (
            <DropdownMenu>
              {{
                default: () =>
                  items.map((item) => {
                    return (
                      <DropdownItem
                        value={item.value.value}
                        label={item.label}
                        multiple={item.multiple}
                        options={item.options}
                        keepLabelActive={item.keepLabelActive}
                      />
                    );
                  }),
              }}
            </DropdownMenu>
          );
        },
      });
      await sleep(0);
      const $menuLabels = wrapper.findAll(`.${name}__item`);
      // 菜单收起态下：multiple + keepLabelActive + 有选中项 → 保持高亮
      expect($menuLabels[0].classes()).toContain(`${name}__item--active`);
      // keepLabelActive = false → 收起态不高亮
      expect($menuLabels[1].classes()).not.toContain(`${name}__item--active`);
      // keepLabelActive = true 但无选中项 → 不高亮
      expect($menuLabels[2].classes()).not.toContain(`${name}__item--active`);
    });
  });

  describe('events', () => {
    it('change', async () => {
      const value1 = ref(['option_1']);
      const items = [
        {
          value: value1,
          label: '菜单',
          options,
        },
      ];
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <DropdownMenu>
              {{
                default: () =>
                  items.map((item, index) => {
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
      $menuLabels.forEach((item, index) => {
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
  });

  describe('scenarios', () => {
    it('reset & confirm', async () => {
      const value1 = ref(['option_1']);
      const items = [
        {
          value: value1,
          label: '菜单',
          options,
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
                default: () =>
                  items.map((item, index) => {
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
      $menuLabels.forEach((item, index) => {
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

    // icon 自定义菜单项图标
    it.todo('icon[function]');
    // placement 菜单弹出方向
    it.todo('placement[string]');
    // 受控值 v-model 联动
    it.todo('modelValue[string/number/array]');
    it.todo('defaultValue[string/number/array]');
  });
});

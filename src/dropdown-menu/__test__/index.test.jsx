import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import { DropdownMenu, DropdownItem } from '../index';
import Radio, { RadioGroup } from '../../radio';
import CheckBox, { CheckboxGroup } from '../../checkbox';
import Button from '../../button';

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
  title: `选项${chineseMap[i]}`,
  value: `option_${i}`,
  disabled: false,
}));

options.push({
  title: '禁用选项',
  value: 'disabled-item',
  disabled: true,
});

describe('dropdown-menu', () => {
  describe('props', () => {
    // TODO：overlay 遮罩相关
    it(': duration', async () => {
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
      const duration = 500;
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <DropdownMenu duration={duration}>
              {{
                default: items.map((item, index) => {
                  return (
                    <DropdownItem
                      v-model={item.value.value}
                      label={item.label}
                      disabled={item.disabled}
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
      $menuLabels.map(async (item, index) => {
        expect(item.attributes('class').includes(`${prefix}-is-disabled`)).toEqual(items[index].disabled);
        expect(item.text()).toEqual(items[index].label);
        await item.trigger('click', { item, index });
      });
      // 动画延迟时间
      await sleep(duration ?? 200);
      expect(wrapper.element).toMatchSnapshot();
      expect(
        wrapper
          .find(`.${prefix}-dropdown-item__content`)
          .attributes('style')
          .includes(`transition: transform ${duration}ms ease;`),
      ).toBeTruthy();

      // 此时，$menuLabels[1]为激活态，再次点击时收起
      const index = 1;
      const itemTemp = items[index];
      expect($menuLabels[index].attributes('class').includes(`${prefix}-is-active`)).toBeTruthy();
      $menuLabels[1].trigger('click', { itemTemp, index });
      await sleep(duration ?? 200);
      expect($menuLabels[index].attributes('class').includes(`${prefix}-is-active`)).toBeFalsy();
    });

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
      const $menuLabels = wrapper.findAll(`.${name}__item`);
      $menuLabels.map((item, index) => {
        item.trigger('click', { item, index });
      });
      await sleep(200);

      const $dropdownItems = wrapper.findAll(`.${prefix}-dropdown-item`);
      expect($dropdownItems[0].attributes('class').includes(`${prefix}-is-expanded`)).toBeTruthy();
      expect(wrapper.findAllComponents(Button).length).toEqual(2);

      // 初始化，选中1项
      expect(wrapper.findAll(`.${prefix}-is-checked`).length).toEqual(1);
      const $buttons = wrapper.findAll(`.${prefix}-button`);
      // 重置, 清空,不触发 change, 选中项为 0
      await $buttons[0].trigger('click');
      expect(wrapper.findAll(`.${prefix}-is-checked`).length).toEqual(0);

      // 模拟点击，选中第1项
      const $checkbox = wrapper.findAll(`.t-checkbox`);
      await $checkbox[0].find(`.${prefix}-checkbox__original-left`).trigger('click');
      // 确定, 触发 change, 返回选中值 [value]
      await $buttons[1].trigger('click');
      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(['option_0']);
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
        expect(item.attributes('class').includes(`${prefix}-is-disabled`)).toEqual(items[index].disabled);
        expect(item.text()).toEqual(items[index].label);
        await item.trigger('click', { item, index });
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
      expect(
        wrapper
          .find(`.${prefix}-dropdown-item__content`)
          .attributes('class')
          .includes(`${prefix}-is-col${items[0].optionsColumns}`),
      ).toBeTruthy();
    });

    it(': optionsLayout', async () => {
      const buildTree = (length, ...childLengths) => {
        const tree = [];
        for (let i = 0; i < length; i++) {
          const item = {
            title: `选项 ${i + 1}`,
            value: `options_${i}`,
          };
          if (childLengths.length > 0) {
            const [childLength, ...moreChildLenthes] = childLengths;
            item.options = buildTree(childLength, ...moreChildLenthes);
          }
          tree.push(item);
        }
        return tree;
      };
      const radioLength = 3;
      const checkboxLength = 2;

      const optionsT1 = ref(buildTree(radioLength, checkboxLength)); // 树形列表 - 叶子节点（单选）
      const optionsT2 = ref(buildTree(radioLength, radioLength, checkboxLength)); // 树形列表 - 叶子节点（多选）
      const treeValue1 = ref(['options_0', ['options_0', 'options_1']]);
      const treeValue2 = ref(['options_0', 'options_2', ['options_0', 'options_1']]);

      const wrapper = mount({
        setup() {
          return () => (
            <DropdownMenu>
              <DropdownItem
                v-model={treeValue1}
                label="树形双列"
                options={optionsT1.value}
                optionsLayout="tree"
                multiple={true}
              />
              <DropdownItem
                v-model={treeValue2}
                label="树形三列"
                options={optionsT2.value}
                optionsLayout="tree"
                multiple={true}
              />
            </DropdownMenu>
          );
        },
      });

      expect(wrapper.element).toMatchSnapshot();
      const $menuLabels = wrapper.findAll(`.${name}__item`);
      const index0 = 0;
      await $menuLabels[0].trigger('click', { optionsT1, index0 });

      // 初始化: Radio 有 radioLength 项, 选中 1 项; checkbox 有 checkboxLength 项, 选中 2 项
      expect(wrapper.findAllComponents(Radio).length).toEqual(3);
      expect(wrapper.findAllComponents(CheckBox).length).toEqual(2);

      expect(wrapper.find(`.${prefix}-radio-group`).findAll(`.${prefix}-is-checked`).length).toEqual(1);
      expect(wrapper.find(`.${prefix}-checkbox-group`).findAll(`.${prefix}-is-checked`).length).toEqual(2);

      const $buttons = wrapper.findAll(`.${prefix}-button`);
      // 重置, 清空,不触发 change, 选中项为 0
      await $buttons[0].trigger('click');
      expect(wrapper.find(`.${prefix}-radio-group`).findAll(`.${prefix}-is-checked`).length).toEqual(0);
      expect(wrapper.find(`.${prefix}-checkbox-group`).findAll(`.${prefix}-is-checked`).length).toEqual(0);
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
  });
});

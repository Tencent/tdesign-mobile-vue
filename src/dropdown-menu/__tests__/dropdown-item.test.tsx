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

const numberOptions = [
  { label: '数量一', value: 1, disabled: false },
  { label: '数量二', value: 2, disabled: false },
];

describe('DropdownItem', () => {
  describe('props', () => {
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
      // 多选列表按 optionsColumns 生成网格列
      expect(wrapper.find(`.${prefix}-dropdown-item__checkbox-group`).attributes('style')).toContain(
        'grid-template-columns: repeat(2, 1fr)',
      );
    });
  });

  describe('events', () => {
    it('change', async () => {
      const value1 = ref('option_1');
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
    it('icon[function]', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <DropdownMenu>
              <DropdownItem
                label="菜单"
                options={options}
                icon={() => <span class="custom-menu-icon">custom-icon</span>}
              />
            </DropdownMenu>
          );
        },
      });
      const $icon = wrapper.find(`.${name}__icon`);
      expect($icon.exists()).toBe(true);
      // 函数图标替换默认的箭头图标
      expect($icon.find('.custom-menu-icon').exists()).toBe(true);
      expect($icon.text()).toBe('custom-icon');
      expect(wrapper.find('.t-icon-caret-down-small').exists()).toBe(false);
    });

    // placement 菜单弹出方向
    it('placement[string]', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <DropdownMenu>
              <DropdownItem label="菜单" options={options} placement="right" />
            </DropdownMenu>
          );
        },
      });
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      const $radios = wrapper.findAll(`.${prefix}-dropdown-item__radio-item`);
      expect($radios.length).toBe(options.length);
      // 仅单选菜单栏有效，placement 透传给选项，图标与内容相对位置为 right
      $radios.forEach((radio) => {
        expect(radio.classes()).toContain(`${prefix}-radio--right`);
      });
    });

    // 受控值 v-model 联动
    it('modelValue[string]', async () => {
      const value = ref('option_1');
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <DropdownMenu>
              <DropdownItem v-model={value.value} options={options} onChange={onChange} />
            </DropdownMenu>
          );
        },
      });
      // modelValue 决定标题栏展示选中项 label
      expect(wrapper.find(`.${name}__title`).text()).toBe('选项二');

      // 打开面板，对应选项选中
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      const $radios = wrapper.findAll(`.${prefix}-dropdown-item__radio-item`);
      expect($radios[1].classes()).toContain(`${prefix}-is-checked`);
      expect($radios[0].classes()).not.toContain(`${prefix}-is-checked`);

      // 切换选项后 v-model 与标题联动更新
      await $radios[0].trigger('click');
      expect(onChange).toHaveBeenCalledWith('option_0');
      expect(value.value).toBe('option_0');
      expect(wrapper.find(`.${name}__title`).text()).toBe('选项一');
    });

    it('modelValue[number]', async () => {
      const value = ref(2);
      const wrapper = mount({
        setup() {
          return () => (
            <DropdownMenu>
              <DropdownItem v-model={value.value} options={numberOptions} />
            </DropdownMenu>
          );
        },
      });
      expect(wrapper.find(`.${name}__title`).text()).toBe('数量二');

      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      const $radios = wrapper.findAll(`.${prefix}-dropdown-item__radio-item`);
      expect($radios[1].classes()).toContain(`${prefix}-is-checked`);

      await $radios[0].trigger('click');
      expect(value.value).toBe(1);
      expect(wrapper.find(`.${name}__title`).text()).toBe('数量一');
    });

    it('modelValue[array]', async () => {
      const value = ref(['option_1']);
      const wrapper = mount({
        setup() {
          return () => (
            <DropdownMenu>
              <DropdownItem v-model={value.value} label="菜单" multiple options={options} />
            </DropdownMenu>
          );
        },
      });
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      const $checkboxes = wrapper.findAll(`.${prefix}-checkbox`);
      // 初始选中 modelValue 指定的 1 项
      expect($checkboxes[1].classes()).toContain(`${prefix}-checkbox--checked`);
      expect(wrapper.findAll(`.${prefix}-checkbox--checked`)).toHaveLength(1);

      // 勾选后确认，v-model 更新为两项
      await $checkboxes[0].trigger('click');
      await wrapper.find(`.${prefix}-dropdown-item__confirm-btn`).trigger('click');
      expect(value.value).toHaveLength(2);
      expect(value.value).toEqual(expect.arrayContaining(['option_0', 'option_1']));
    });

    it('defaultValue[string]', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <DropdownMenu>
              <DropdownItem defaultValue="option_1" options={options} />
            </DropdownMenu>
          );
        },
      });
      expect(wrapper.find(`.${name}__title`).text()).toBe('选项二');

      // 非受控：切换选项后内部值与标题自行更新
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      const $radios = wrapper.findAll(`.${prefix}-dropdown-item__radio-item`);
      await $radios[0].trigger('click');
      expect(wrapper.find(`.${name}__title`).text()).toBe('选项一');
    });

    it('defaultValue[number]', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <DropdownMenu>
              <DropdownItem defaultValue={1} options={numberOptions} />
            </DropdownMenu>
          );
        },
      });
      expect(wrapper.find(`.${name}__title`).text()).toBe('数量一');

      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      const $radios = wrapper.findAll(`.${prefix}-dropdown-item__radio-item`);
      await $radios[1].trigger('click');
      expect(wrapper.find(`.${name}__title`).text()).toBe('数量二');
    });

    it('defaultValue[array]', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <DropdownMenu>
              <DropdownItem defaultValue={['option_1']} label="菜单" multiple options={options} />
            </DropdownMenu>
          );
        },
      });
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      // 初始选中 defaultValue 指定的 1 项
      expect(wrapper.findAll(`.${prefix}-checkbox--checked`)).toHaveLength(1);

      // 非受控：勾选第 1 项后选中数自行更新为 2（无需确认）
      await wrapper.findAll(`.${prefix}-checkbox`)[0].trigger('click');
      expect(wrapper.findAll(`.${prefix}-checkbox--checked`)).toHaveLength(2);
    });
  });
});

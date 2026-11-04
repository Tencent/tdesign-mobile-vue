import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import { DropdownMenu, DropdownItem } from '../index';
import { sleep } from '../../shared/util';
import ConfigProvider from '../../config-provider';
import type { DropdownOption } from '../type';

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
    it('disabled[boolean]', async () => {
      const disabled = ref(true);
      const wrapper = mount(() => (
        <DropdownMenu>
          <DropdownItem label="菜单" options={options} disabled={disabled.value} />
        </DropdownMenu>
      ));
      expect(wrapper.find(`.${name}__item`).classes()).toContain(`${name}__item--disabled`);
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      expect(wrapper.find(`.${prefix}-dropdown-item`).exists()).toBe(false);
      disabled.value = false;
      await sleep(0);
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      expect(wrapper.find(`.${name}__item`).classes()).not.toContain(`${name}__item--disabled`);
      expect(wrapper.find(`.${prefix}-dropdown-item`).isVisible()).toBe(true);
    });

    it('footer[function]', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <DropdownMenu>
              <DropdownItem
                label="菜单"
                multiple
                options={options}
                footer={() => <div class="custom-footer">自定义底部</div>}
              />
            </DropdownMenu>
          );
        },
      });
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      // 自定义 footer 渲染在面板底部，并替换默认的重置/确认按钮
      expect(wrapper.find('.custom-footer').text()).toBe('自定义底部');
      expect(wrapper.find(`.${prefix}-dropdown-item__reset-btn`).exists()).toBe(false);
      expect(wrapper.find(`.${prefix}-dropdown-item__confirm-btn`).exists()).toBe(false);
    });

    it('footer[slot]', async () => {
      const wrapper = mount(() => (
        <DropdownMenu>
          <DropdownItem label="菜单" multiple options={options}>
            {{ footer: () => <div class="slot-footer">插槽底部</div> }}
          </DropdownItem>
        </DropdownMenu>
      ));
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      expect(wrapper.find('.slot-footer').text()).toBe('插槽底部');
      expect(wrapper.find(`.${prefix}-dropdown-item__reset-btn`).exists()).toBe(false);
      expect(wrapper.find(`.${prefix}-dropdown-item__confirm-btn`).exists()).toBe(false);
    });

    it('icon[function]', () => {
      const wrapper = mount(() => (
        <DropdownMenu>
          <DropdownItem label="菜单" options={options} icon={() => <span class="custom-menu-icon">custom-icon</span>} />
        </DropdownMenu>
      ));
      expect(wrapper.find(`.${name}__icon .custom-menu-icon`).text()).toBe('custom-icon');
      expect(wrapper.find('.t-icon-caret-down-small').exists()).toBe(false);
    });

    it('icon[array]', async () => {
      const icon = ref([() => <span class="open-icon">打开</span>, () => <span class="closed-icon">关闭</span>]);
      const wrapper = mount(() => (
        <DropdownMenu>
          <DropdownItem label="菜单" options={options} icon={icon.value} />
        </DropdownMenu>
      ));
      expect(wrapper.find('.closed-icon').exists()).toBe(true);
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      expect(wrapper.find('.open-icon').exists()).toBe(true);
      expect(wrapper.find('.closed-icon').exists()).toBe(false);
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      expect(wrapper.find('.closed-icon').exists()).toBe(true);
      icon.value = [() => <span class="single-icon">单个图标</span>];
      await sleep(0);
      expect(wrapper.find('.single-icon').exists()).toBe(true);
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      expect(wrapper.find('.single-icon').exists()).toBe(true);
    });

    // 文档声明 icon 插槽，但组件只读取 icon prop，没有消费该插槽。
    it.todo('icon[slot]');

    it('keepLabelActive[boolean]', async () => {
      // keepLabelActive 仅在 multiple = true 且有选中项时生效，保持标题高亮（含菜单收起态）
      const value1 = ref(['option_1']);
      const value2 = ref(['option_1']);
      const value3 = ref([]);
      const value4 = ref('option_1');
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
        {
          value: value4,
          label: '单选不保持高亮',
          options,
          multiple: false,
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
      expect($menuLabels[3].classes()).not.toContain(`${name}__item--active`);
    });

    it('keys[object]', async () => {
      const onChange = vi.fn();
      const customOptions = [
        { name: '映射一', id: 'mapped_0', blocked: false },
        { name: '映射二', id: 'mapped_1', blocked: false },
        { name: '映射禁用项', id: 'mapped_2', blocked: true },
      ];
      const wrapper = mount(() => (
        <DropdownMenu>
          <DropdownItem
            defaultValue="mapped_1"
            keys={{ label: 'name', value: 'id', disabled: 'blocked' }}
            options={customOptions as unknown as DropdownOption[]}
            onChange={onChange}
          />
        </DropdownMenu>
      ));
      expect(wrapper.find(`.${name}__title`).text()).toBe('映射二');
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      const radios = wrapper.findAll(`.${prefix}-dropdown-item__radio-item`);
      expect(radios.map((item) => item.text())).toEqual(['映射一', '映射二', '映射禁用项']);
      expect(radios[1].classes()).toContain(`${prefix}-is-checked`);
      expect(radios[2].find(`.${prefix}-radio__title--disabled`).exists()).toBe(true);
      await radios[2].trigger('click');
      expect(onChange).not.toHaveBeenCalled();
      await radios[0].trigger('click');
      expect(onChange).toHaveBeenCalledExactlyOnceWith('mapped_0');
      expect(wrapper.find(`.${name}__title`).text()).toBe('映射一');
    });

    it('label[string]', async () => {
      const label = ref('菜单标题');
      const wrapper = mount(() => (
        <DropdownMenu>
          <DropdownItem label={label.value} options={options} />
        </DropdownMenu>
      ));
      expect(wrapper.find(`.${name}__title`).text()).toBe('菜单标题');
      label.value = '更新标题';
      await sleep(0);
      expect(wrapper.find(`.${name}__title`).text()).toBe('更新标题');
    });

    it('multiple[boolean]', async () => {
      // 单选：面板渲染 Radio 列表，无底部操作栏
      const singleWrapper = mount({
        setup() {
          return () => (
            <DropdownMenu>
              <DropdownItem label="菜单" options={options} />
            </DropdownMenu>
          );
        },
      });
      await singleWrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      expect(singleWrapper.find(`.${prefix}-dropdown-item__radio-group`).exists()).toBe(true);
      expect(singleWrapper.find(`.${prefix}-dropdown-item__checkbox-group`).exists()).toBe(false);
      expect(singleWrapper.find(`.${prefix}-dropdown-item__footer`).exists()).toBe(false);

      // 多选：面板渲染 Checkbox 列表与重置/确认操作栏
      const multipleWrapper = mount({
        setup() {
          return () => (
            <DropdownMenu>
              <DropdownItem label="菜单" multiple options={options} />
            </DropdownMenu>
          );
        },
      });
      await multipleWrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      expect(multipleWrapper.find(`.${prefix}-dropdown-item__checkbox-group`).exists()).toBe(true);
      expect(multipleWrapper.find(`.${prefix}-dropdown-item__radio-group`).exists()).toBe(false);
      expect(multipleWrapper.find(`.${prefix}-dropdown-item__reset-btn`).exists()).toBe(true);
      expect(multipleWrapper.find(`.${prefix}-dropdown-item__confirm-btn`).exists()).toBe(true);
    });

    it('options[array]', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <DropdownMenu>
              <DropdownItem label="菜单" options={options} />
            </DropdownMenu>
          );
        },
      });
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      // 选项按 options 顺序渲染为单选列表，label 与选项一致
      const $radios = wrapper.findAll(`.${prefix}-dropdown-item__radio-item`);
      expect($radios).toHaveLength(options.length);
      options.forEach((option, index) => {
        expect($radios[index].text()).toBe(option.label);
      });

      const emptyWrapper = mount(() => (
        <DropdownMenu>
          <DropdownItem label="空菜单" />
        </DropdownMenu>
      ));
      await emptyWrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      expect(emptyWrapper.findAll(`.${prefix}-dropdown-item__radio-item`)).toHaveLength(0);
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
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      // 多选列表按 optionsColumns 生成网格列
      expect(wrapper.find(`.${prefix}-dropdown-item__checkbox-group`).attributes('style')).toContain(
        'grid-template-columns: repeat(2, 1fr)',
      );
    });

    it('optionsColumns[string]', async () => {
      const wrapper = mount(() => (
        <DropdownMenu>
          <DropdownItem label="菜单" multiple options={options} optionsColumns="3" />
        </DropdownMenu>
      ));
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      expect(wrapper.find(`.${prefix}-dropdown-item__checkbox-group`).attributes('style')).toContain(
        'grid-template-columns: repeat(3, 1fr)',
      );
    });

    it.each(['left', 'right'] as const)('placement[%s]', async (placement) => {
      const wrapper = mount(() => (
        <DropdownMenu>
          <DropdownItem label="菜单" options={options} placement={placement} />
        </DropdownMenu>
      ));
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      const radios = wrapper.findAll(`.${prefix}-dropdown-item__radio-item`);
      expect(radios).toHaveLength(options.length);
      radios.forEach((radio) => expect(radio.classes()).toContain(`${prefix}-radio--${placement}`));
    });

    it('value[string]', async () => {
      const value = ref('option_1');
      const wrapper = mount(() => (
        <DropdownMenu>
          <DropdownItem v-model={[value.value, 'value']} options={options} />
        </DropdownMenu>
      ));
      expect(wrapper.find(`.${name}__title`).text()).toBe('选项二');
      value.value = 'option_0';
      await sleep(0);
      expect(wrapper.find(`.${name}__title`).text()).toBe('选项一');
      value.value = 'option_1';
      await sleep(0);
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      expect(wrapper.findAll(`.${prefix}-dropdown-item__radio-item`)[1].classes()).toContain(`${prefix}-is-checked`);
      await wrapper.find(`.${prefix}-dropdown-item__radio-item`).trigger('click');
      expect(value.value).toBe('option_0');
      expect(wrapper.find(`.${name}__title`).text()).toBe('选项一');
    });

    it('value[number]', async () => {
      const value = ref(2);
      const wrapper = mount(() => (
        <DropdownMenu>
          <DropdownItem v-model={[value.value, 'value']} options={numberOptions} />
        </DropdownMenu>
      ));
      expect(wrapper.find(`.${name}__title`).text()).toBe('数量二');
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      expect(wrapper.findAll(`.${prefix}-dropdown-item__radio-item`)[1].classes()).toContain(`${prefix}-is-checked`);
      await wrapper.find(`.${prefix}-dropdown-item__radio-item`).trigger('click');
      expect(value.value).toBe(1);
      expect(wrapper.find(`.${name}__title`).text()).toBe('数量一');
    });

    it('value[array]', async () => {
      const value = ref(['option_1']);
      const wrapper = mount(() => (
        <DropdownMenu>
          <DropdownItem v-model={[value.value, 'value']} label="菜单" multiple options={options} />
        </DropdownMenu>
      ));
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      const checkboxes = wrapper.findAll(`.${prefix}-checkbox`);
      expect(checkboxes[1].classes()).toContain(`${prefix}-checkbox--checked`);
      await checkboxes[0].trigger('click');
      expect(value.value).toEqual(['option_1']);
      await wrapper.find(`.${prefix}-dropdown-item__confirm-btn`).trigger('click');
      expect(value.value).toHaveLength(2);
      expect(value.value).toEqual(expect.arrayContaining(['option_0', 'option_1']));
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
      value.value = 'option_0';
      await sleep(0);
      expect(wrapper.find(`.${name}__title`).text()).toBe('选项一');
      value.value = 'option_1';
      await sleep(0);

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

    it('default[slot]', async () => {
      const wrapper = mount(() => (
        <DropdownMenu>
          <DropdownItem label="菜单" options={options}>
            {{ default: () => <div class="custom-content">自定义内容</div> }}
          </DropdownItem>
        </DropdownMenu>
      ));
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      expect(wrapper.find(`.${prefix}-dropdown-item__body .custom-content`).text()).toBe('自定义内容');
      expect(wrapper.find(`.${prefix}-dropdown-item__radio-group`).exists()).toBe(false);
    });
  });

  describe('events', () => {
    it('change', async () => {
      const onChange = vi.fn();
      const wrapper = mount(() => (
        <DropdownMenu>
          <DropdownItem value="option_1" label="菜单" options={options} onChange={onChange} />
        </DropdownMenu>
      ));
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      const radios = wrapper.findAll(`.${prefix}-dropdown-item__radio-item`);
      // 在面板仍打开时验证已选项、禁用项，避免对关闭后的旧 DOM 触发点击。
      await radios[1].trigger('click');
      await radios[2].trigger('click');
      expect(onChange).not.toHaveBeenCalled();
      await radios[0].trigger('click');
      expect(onChange).toHaveBeenCalledExactlyOnceWith('option_0');
    });

    it('close', async () => {
      const onClose = vi.fn();
      const wrapper = mount(DropdownMenu, {
        slots: { default: () => <DropdownItem options={options} onClose={onClose} /> },
      });
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      expect(onClose).not.toHaveBeenCalled();
      await wrapper.find(`.${name}__item`).trigger('click');
      expect(onClose).toHaveBeenCalledExactlyOnceWith();
    });

    it('closed', async () => {
      const onClosed = vi.fn();
      const wrapper = mount(DropdownMenu, {
        slots: { default: () => <DropdownItem options={options} onClosed={onClosed} /> },
        global: { stubs: { transition: false } },
      });
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(300);
      await wrapper.find(`.${name}__item`).trigger('click');
      expect(onClosed).not.toHaveBeenCalled();
      await sleep(300);
      expect(onClosed).toHaveBeenCalledExactlyOnceWith();
      expect(wrapper.find(`.${prefix}-dropdown-item`).exists()).toBe(false);
    });

    it('confirm', async () => {
      const onConfirm = vi.fn();
      const wrapper = mount(() => (
        <DropdownMenu>
          <DropdownItem multiple defaultValue={['option_1']} options={options} onConfirm={onConfirm} />
        </DropdownMenu>
      ));
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      expect(onConfirm).not.toHaveBeenCalled();
      await wrapper.find(`.${prefix}-dropdown-item__confirm-btn`).trigger('click');
      expect(onConfirm).toHaveBeenCalledExactlyOnceWith(['option_1']);
      expect(wrapper.find(`.${name}__item--active`).exists()).toBe(false);
    });

    it('open', async () => {
      const onOpen = vi.fn();
      const wrapper = mount(DropdownMenu, {
        slots: { default: () => <DropdownItem options={options} onOpen={onOpen} /> },
      });
      expect(onOpen).not.toHaveBeenCalled();
      await wrapper.find(`.${name}__item`).trigger('click');
      expect(onOpen).toHaveBeenCalledExactlyOnceWith();
    });

    it('opened', async () => {
      const onOpened = vi.fn();
      const wrapper = mount(DropdownMenu, {
        slots: { default: () => <DropdownItem options={options} onOpened={onOpened} /> },
        global: { stubs: { transition: false } },
      });
      await wrapper.find(`.${name}__item`).trigger('click');
      expect(onOpened).not.toHaveBeenCalled();
      await sleep(300);
      expect(onOpened).toHaveBeenCalledExactlyOnceWith();
      expect(wrapper.find(`.${prefix}-dropdown-item`).isVisible()).toBe(true);
    });

    it('reset', async () => {
      const onReset = vi.fn();
      const initial = ['option_1'];
      const wrapper = mount(() => (
        <DropdownMenu>
          <DropdownItem multiple defaultValue={initial} options={options} onReset={onReset} />
        </DropdownMenu>
      ));
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      await wrapper.find(`.${prefix}-dropdown-item__reset-btn`).trigger('click');
      expect(onReset).toHaveBeenCalledExactlyOnceWith([]);
      expect(wrapper.findAll(`.${prefix}-checkbox--checked`)).toHaveLength(0);
      expect(initial).toEqual(['option_1']);
    });
  });

  describe('globalConfig', () => {
    it('dropdownMenu', async () => {
      const wrapper = mount(() => (
        <ConfigProvider globalConfig={{ dropdownMenu: { reset: 'Reset', confirm: 'Done' } }}>
          <DropdownMenu>
            <DropdownItem label="菜单" multiple options={options} />
          </DropdownMenu>
        </ConfigProvider>
      ));
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      expect(wrapper.find(`.${prefix}-dropdown-item__reset-btn`).text()).toBe('Reset');
      expect(wrapper.find(`.${prefix}-dropdown-item__confirm-btn`).text()).toBe('Done');
    });
  });

  describe('scenarios', () => {
    it('reset & confirm', async () => {
      const onReset = vi.fn();
      const onConfirm = vi.fn();
      const onChange = vi.fn();
      const value = ref(['option_1']);
      const wrapper = mount(() => (
        <DropdownMenu>
          <DropdownItem
            v-model={value.value}
            label="菜单"
            multiple
            options={options}
            onReset={onReset}
            onConfirm={onConfirm}
            onChange={onChange}
          />
        </DropdownMenu>
      ));
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);
      await wrapper.find(`.${prefix}-dropdown-item__reset-btn`).trigger('click');
      expect(onReset).toHaveBeenCalledExactlyOnceWith([]);
      expect(onChange).toHaveBeenNthCalledWith(1, []);
      const confirmButton = wrapper.find(`.${prefix}-dropdown-item__confirm-btn`);
      await confirmButton.trigger('click');
      expect(onConfirm).not.toHaveBeenCalled();
      expect(value.value).toEqual(['option_1']);
      await wrapper.find(`.${prefix}-dropdown-item__checkbox-item`).trigger('click');
      expect(onChange).toHaveBeenNthCalledWith(2, ['option_0']);
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(value.value).toEqual(['option_1']);
      await confirmButton.trigger('click');
      expect(onConfirm).toHaveBeenCalledExactlyOnceWith(['option_0']);
      expect(value.value).toEqual(['option_0']);
    });
  });
});

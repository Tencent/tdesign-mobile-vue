import { mount } from '@vue/test-utils';
import { describe, it } from 'vitest';
import { ref } from 'vue';
import { DropdownMenu, DropdownItem } from '../index';

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

describe('DropdownMenu', () => {
  describe('scenarios', () => {
    it('multiple item with footer buttons', async () => {
      // 底部 button 仅在 multiple/optionsLayout === 'tree'时，有效
      const value1 = ref(['option_1']);
      const items = [
        {
          value: value1,
          label: '菜单',
          multiple: true,
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
                        multiple={item.multiple}
                        options={item.options}
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

    // closeOnClickOverlay/direction/showOverlay/zIndex 菜单浮层行为
    it.todo('closeOnClickOverlay[boolean]');
    it.todo('direction[string]');
    it.todo('showOverlay[boolean]');
    it.todo('zIndex[number]');
  });
});

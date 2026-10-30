import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import { DropdownMenu, DropdownItem } from '../index';
import { sleep } from '../../shared/util';

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
      // 底部 button 仅在 multiple/optionsLayout === 'tree' 时有效
      const onReset = vi.fn();
      const onConfirm = vi.fn();
      const onChange = vi.fn();
      const selected = ref(['option_1']);
      const wrapper = mount({
        setup() {
          return () => (
            <DropdownMenu>
              <DropdownItem
                v-model={selected.value}
                label="菜单"
                multiple
                options={options}
                onReset={onReset}
                onConfirm={onConfirm}
                onChange={onChange}
              />
            </DropdownMenu>
          );
        },
      });

      // 打开菜单面板
      await wrapper.find(`.${name}__item`).trigger('click');
      await sleep(200);

      // 初始选中 1 项
      expect(wrapper.findAll(`.${prefix}-checkbox--checked`).length).toBe(1);

      // 重置：清空选中
      await wrapper.find(`.${prefix}-dropdown-item__reset-btn`).trigger('click');
      expect(wrapper.findAll(`.${prefix}-checkbox--checked`).length).toBe(0);
      expect(onReset).toHaveBeenCalledTimes(1);

      // 勾选第 1 项后确认
      await wrapper.find(`.${prefix}-dropdown-item__checkbox-item`).trigger('click');
      await wrapper.find(`.${prefix}-dropdown-item__confirm-btn`).trigger('click');
      expect(onConfirm).toHaveBeenCalledWith(['option_0']);
      expect(onChange).toHaveBeenCalledWith(['option_0']);
      expect(selected.value).toEqual(['option_0']);
    });

    // closeOnClickOverlay/direction/showOverlay/zIndex 菜单浮层行为
    it.todo('closeOnClickOverlay[boolean]');
    it.todo('direction[string]');
    it.todo('showOverlay[boolean]');
    it.todo('zIndex[number]');
  });
});

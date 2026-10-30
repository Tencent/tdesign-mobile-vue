import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import Checkbox, { CheckboxGroup } from '../index';
import config from '../../config';

const { prefix } = config;
const name = `${prefix}-checkbox`;

describe('Checkbox', () => {
  describe('props', () => {
    it('block[boolean]', async () => {
      const wrapper = mount(() => <Checkbox block>选项</Checkbox>);
      expect(wrapper.classes()).toContain('t-checkbox--block');
    });

    it('borderless[boolean]', async () => {
      const wrapper = mount(() => <Checkbox>选项</Checkbox>);
      expect(wrapper.find('.t-checkbox__border').exists()).toBeTruthy();

      const wrapper2 = mount(() => <Checkbox borderless>选项</Checkbox>);
      expect(wrapper2.find('.t-checkbox__border').exists()).toBeFalsy();
    });

    it('checkAll[boolean]', async () => {
      // checkAll 单独使用无效，需在 CheckboxGroup 中使用；不走 .vm，用 DOM 类名断言全选联动
      const wrapper = mount(() => (
        <CheckboxGroup>
          <Checkbox checkAll label="全选" />
          <Checkbox value="1" label="选项一" />
          <Checkbox value="2" label="选项二" />
        </CheckboxGroup>
      ));
      const $checkboxes = wrapper.findAll(`.${name}`);
      expect($checkboxes).toHaveLength(3);
      // 初始全部未选中
      $checkboxes.forEach((item) => {
        expect(item.classes()).not.toContain(`${name}--checked`);
      });

      // 点击全选选项，选中所有子选项
      await $checkboxes[0].trigger('click');
      $checkboxes.forEach((item) => {
        expect(item.classes()).toContain(`${name}--checked`);
      });

      // 取消一个子选项后，全选选项变为半选态
      await $checkboxes[2].trigger('click');
      expect($checkboxes[2].classes()).not.toContain(`${name}--checked`);
      expect($checkboxes[1].classes()).toContain(`${name}--checked`);
      expect($checkboxes[0].find('.t-icon-minus-circle-filled').exists()).toBe(true);

      // 半选态再次点击全选选项，清空所有选中
      await $checkboxes[0].trigger('click');
      $checkboxes.forEach((item) => {
        expect(item.classes()).not.toContain(`${name}--checked`);
      });
    });

    it('defaultChecked[boolean]', async () => {
      const wrapper = mount(() => <Checkbox defaultChecked>选项</Checkbox>);
      expect(wrapper.classes()).toContain('t-checkbox--checked');
    });

    it('content[function]', async () => {
      const wrapper = mount(() => <Checkbox content={() => <div class="checkbox-desc">描述内容</div>}>选项</Checkbox>);
      expect(wrapper.find('.checkbox-desc').exists()).toBeTruthy();
    });

    it('contentDisabled[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(() => (
        <Checkbox contentDisabled onChange={onChange}>
          选项
        </Checkbox>
      ));
      // 点击内容区域不触发选中
      await wrapper.find(`.${name}__content`).trigger('click');
      expect(wrapper.classes()).not.toContain(`${name}--checked`);
      expect(onChange).toHaveBeenCalledTimes(0);

      // 点击组件其余区域（图标）仍可正常选中
      await wrapper.find(`.${name}`).trigger('click');
      expect(wrapper.classes()).toContain(`${name}--checked`);
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('icon[array]', async () => {
      const activeImage = 'https://tdesign.gtimg.com/miniprogram/checkbox-checked.png';
      const inActiveImage = 'https://tdesign.gtimg.com/miniprogram/checkbox.png';
      const wrapper = mount(() => <Checkbox icon={[activeImage, inActiveImage]} />);
      expect(wrapper.find(`.${name}__icon-image`).attributes('src')).toBe(inActiveImage);
      await wrapper.trigger('click');
      expect(wrapper.find(`.${name}__icon-image`).attributes('src')).toBe(activeImage);
    });

    it('icon[empty-array]', async () => {
      const wrapper = mount(() => <Checkbox icon={['']} />);
      expect(wrapper.find('.t-icon-circle').exists()).toBe(true);
      await wrapper.trigger('click');
      expect(wrapper.find('.t-icon-check-circle-filled').exists()).toBe(true);
    });

    it('icon[rectangle]', async () => {
      const wrapper = mount(() => <Checkbox icon="rectangle" />);
      expect(wrapper.find(`.${name}__icon-rectangle`).exists()).toBe(true);
      await wrapper.trigger('click');
      expect(wrapper.find('.t-icon-check-rectangle-filled').exists()).toBe(true);
    });

    it('icon[line]', async () => {
      const wrapper = mount(() => <Checkbox icon="line" />);
      expect(wrapper.find(`.${name}__icon .placeholder`).exists()).toBe(true);
      await wrapper.trigger('click');
      expect(wrapper.find('.t-icon-check').exists()).toBe(true);
    });

    it('indeterminate[boolean]', async () => {
      const wrapper = mount(() => <Checkbox indeterminate>选项</Checkbox>);
      await wrapper.trigger('click');
      expect(wrapper.find('.t-icon-minus-circle-filled').exists()).toBe(true);
    });

    // -webkit-line-clamp 依赖 webkit 私有样式，jsdom/cssstyle 会丢弃该样式，无法断言行数
    it.todo('maxContentRow[number]');

    // -webkit-line-clamp 依赖 webkit 私有样式，jsdom/cssstyle 会丢弃该样式，无法断言行数
    it.todo('maxLabelRow[number]');

    it('placement[right]', async () => {
      const wrapper = mount(() => <Checkbox placement="right">选项</Checkbox>);
      expect(wrapper.classes()).toContain(`${name}--right`);
    });

    it('placement[default]', async () => {
      const wrapper = mount(() => <Checkbox>选项</Checkbox>);
      expect(wrapper.classes()).toContain(`${name}--left`);
    });

    it('readonly[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(() => (
        <Checkbox readonly onChange={onChange}>
          选项
        </Checkbox>
      ));
      // 只读状态下点击不切换选中态，也不触发 change
      await wrapper.find(`.${name}`).trigger('click');
      expect(wrapper.classes()).not.toContain(`${name}--checked`);
      expect(onChange).toHaveBeenCalledTimes(0);
    });
  });
});

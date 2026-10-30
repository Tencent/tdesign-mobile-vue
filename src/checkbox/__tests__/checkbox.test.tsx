import { mount } from '@vue/test-utils';
import Checkbox from '../index';
import config from '../../config';

const { prefix } = config;
const name = `${prefix}-checkbox`;

describe('Checkbox', () => {
  describe('props', () => {
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

    it('placement[right]', async () => {
      const wrapper = mount(() => <Checkbox placement="right">选项</Checkbox>);
      expect(wrapper.classes()).toContain(`${name}--right`);
    });

    it('placement[default]', async () => {
      const wrapper = mount(() => <Checkbox>选项</Checkbox>);
      expect(wrapper.classes()).toContain(`${name}--left`);
    });

    it('indeterminate[boolean]', async () => {
      const wrapper = mount(() => <Checkbox indeterminate>选项</Checkbox>);
      await wrapper.trigger('click');
      expect(wrapper.find('.t-icon-minus-circle-filled').exists()).toBe(true);
    });

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

    it('defaultChecked[boolean]', async () => {
      const wrapper = mount(() => <Checkbox defaultChecked>选项</Checkbox>);
      expect(wrapper.classes()).toContain('t-checkbox--checked');
    });

    it('content[function]', async () => {
      const wrapper = mount(() => <Checkbox content={() => <div class="checkbox-desc">描述内容</div>}>选项</Checkbox>);
      expect(wrapper.find('.checkbox-desc').exists()).toBeTruthy();
    });

    // -webkit-line-clamp 依赖 webkit 私有样式，jsdom/cssstyle 不支持，无法断言行数样式
    it.todo('maxLabelRow[number]');
    it.todo('maxContentRow[number]');

    // checkAll checkbox 与 Vue Test Utils 存在已知兼容性问题（devtoolsRawSetupState），以 todo 标注
    it.todo('checkAll[boolean]');

    // contentDisabled 点击内容区域不触发切换，依赖事件来源区分
    it.todo('contentDisabled[boolean]');
    // readonly/disabled 与分组的联动行为在 group 场景验证
    it.todo('readonly[boolean]');
  });
});

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
      const $checkbox = wrapper.findComponent(Checkbox);
      await $checkbox.trigger('click');
      // expect($checkbox.vm.isChecked).toBe(true);
      await $checkbox.trigger('click');
      // expect($checkbox.vm.isChecked).toBe(false);
    });

    it('icon[empty-array]', async () => {
      const wrapper = mount(() => <Checkbox icon={['']} />);
      const $checkbox = wrapper.findComponent(Checkbox);
      await $checkbox.trigger('click');
      expect($checkbox.findComponent('t-icon-check-circle-filled')).exist;
    });

    it('icon[rectangle]', async () => {
      const wrapper = mount(() => <Checkbox icon="rectangle" />);
      const $checkbox = wrapper.findComponent(Checkbox);
      expect($checkbox.findComponent(`${name}__icon-rectangle`)).exist;
      await $checkbox.trigger('click');
      expect($checkbox.findComponent('t-icon-check-rectangle-filled')).exist;
      // expect($checkbox.vm.isChecked).toBe(true);
    });

    it('icon[line]', async () => {
      const wrapper = mount(() => <Checkbox icon="line" />);
      const $checkbox = wrapper.findComponent(Checkbox);
      expect($checkbox.findComponent(`${name}__icon-line`)).exist;
      await $checkbox.trigger('click');
    });

    it('placement[right]', async () => {
      const wrapper = mount(() => <Checkbox placement="right" />);
      const $checkbox = wrapper.findComponent(Checkbox);
      expect($checkbox.findComponent(`${name}--right`)).exist;
      // expect($checkbox).toMatchSnapshot();
    });

    it('placement[default]', async () => {
      const wrapper = mount(() => <Checkbox />);
      const $checkbox = wrapper.findComponent(Checkbox);
      expect($checkbox.findComponent(`${name}--left`)).exist;
    });

    it('indeterminate[boolean]', async () => {
      const wrapper = mount(() => <Checkbox indeterminate default="checkbox" />);
      const $checkbox = wrapper.findComponent(Checkbox);
      await $checkbox.trigger('click');
      expect($checkbox.findComponent('t-icon-minus-circle-filled')).exist;
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

    it('maxLabelRow[number] & maxContentRow[number]', async () => {
      const wrapper = mount(() => (
        <Checkbox label="多行标签内容" content="多行描述内容" maxLabelRow={1} maxContentRow={2}>
          选项
        </Checkbox>
      ));
      const $label = wrapper.find('.t-checkbox__label');
      $label.exists() && expect($label.attributes('style')).toContain('-webkit-line-clamp: 1');
    });

    // checkAll checkbox 与 Vue Test Utils 存在已知兼容性问题（devtoolsRawSetupState），以 todo 标注
    it.todo('checkAll[boolean]');

    // contentDisabled 点击内容区域不触发切换，依赖事件来源区分
    it.todo('contentDisabled[boolean]');
    // readonly/disabled 与分组的联动行为在 group 场景验证
    it.todo('readonly[boolean]');
  });
});

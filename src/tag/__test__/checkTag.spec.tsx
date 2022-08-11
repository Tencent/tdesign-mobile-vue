import { h, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { AppIcon as TIconApp } from 'tdesign-icons-vue-next';
import TCheckTag from '../check-tag.vue';
import { TdCheckTagProps } from '../type';

const TEXT = 'tdesign-mobile-vue';
const iconFunc = () => h(TIconApp);

const sizeList: TdCheckTagProps['size'][] = ['large', 'medium', 'small'];
const shapeList: TdCheckTagProps['shape'][] = ['mark', 'round', 'square'];

describe('CheckTag render', async () => {
  it('create', async () => {
    const wrapper = mount(() => <TCheckTag>{TEXT}</TCheckTag>);
    expect(wrapper.classes()).toContain('t-tag');
    expect(wrapper.classes()).toContain('t-tag--checkable');
  });

  it('checked render', async () => {
    const wrapper = mount(() => <TCheckTag modelValue={true}>{TEXT}</TCheckTag>);
    expect(wrapper.classes()).toContain('t-tag--checked');
  });

  it('disabled render', async () => {
    const wrapper = mount(() => <TCheckTag disabled>{TEXT}</TCheckTag>);
    expect(wrapper.classes()).toContain('t-is-disabled');
  });

  it('icon render', async () => {
    const wrapper = mount(() => <TCheckTag icon={iconFunc}>{TEXT}</TCheckTag>);
    expect(wrapper.findComponent(TIconApp)).toBeTruthy();
  });

  it('size render', async () => {
    sizeList.forEach((s) => {
      const wrapper = mount(() => <TCheckTag size={s}>{TEXT}</TCheckTag>);
      expect(wrapper.classes()).toContain(`t-tag--size-${s}`);
    });
  });

  it('shape render', async () => {
    shapeList.forEach((s) => {
      const wrapper = mount(() => <TCheckTag shape={s}>{TEXT}</TCheckTag>);
      expect(wrapper.classes()).toContain(`t-tag--shape-${s}`);
    });
  });

  it('click render', async () => {
    const wrapper = mount(() => <TCheckTag>{TEXT}</TCheckTag>);
    await wrapper.trigger('click');
    expect(wrapper.emitted().click).toBeTruthy();
  });

  it('change render', async () => {
    const wrapper = mount({
      data() {
        return {
          checked: false,
        };
      },
      render() {
        return (
          <TCheckTag onChange={() => (this.checked = !this.checked)} checked={this.checked}>
            {TEXT}
          </TCheckTag>
        );
      },
    });
    await wrapper.trigger('click');
    expect(wrapper.vm.checked).toBe(true);
    await wrapper.trigger('click');
    expect(wrapper.vm.checked).toBe(false);
  });
});

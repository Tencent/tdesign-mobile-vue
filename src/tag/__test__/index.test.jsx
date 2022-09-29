import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { AppIcon as TIconApp } from 'tdesign-icons-vue-next';
import Tag from '../tag.vue';
import TCheckTag from '../check-tag.vue';

const TEXT = 'tdesign-mobile-vue';
const iconFunc = () => h(TIconApp);

const themeList = ['danger', 'default', 'primary', 'success', 'warning'];
const variantList = ['dark', 'light', 'light-outline', 'outline'];
const sizeList = ['large', 'medium', 'small'];
const shapeList = ['mark', 'round', 'square'];

describe('Tag.vue', async () => {
  it('create', async () => {
    const wrapper = mount(() => <Tag>{TEXT}</Tag>);
    expect(wrapper.text()).toBe(TEXT);
    expect(wrapper.classes()).toContain('t-tag');
  });

  it('theme render', async () => {
    themeList.forEach((t) => {
      const wrapper = mount(() => <Tag theme={t}>{TEXT}</Tag>);
      expect(wrapper.classes()).toContain(`t-tag--theme-${t}`);
    });
  });

  it('variant render', async () => {
    variantList.forEach((v) => {
      const wrapper = mount(() => <Tag variant={v}>{TEXT}</Tag>);
      expect(wrapper.classes()).toContain(`t-tag--variant-${v}`);
    });
  });

  it('size render', async () => {
    sizeList.forEach((s) => {
      const wrapper = mount(() => <Tag size={s}>{TEXT}</Tag>);
      expect(wrapper.classes()).toContain(`t-tag--size-${s}`);
    });
  });

  it('shape render', async () => {
    shapeList.forEach((s) => {
      const wrapper = mount(() => <Tag shape={s}>{TEXT}</Tag>);
      expect(wrapper.classes()).toContain(`t-tag--shape-${s}`);
    });
  });

  it('icon render', async () => {
    const wrapper = mount(() => <Tag icon={iconFunc}>{TEXT}</Tag>);
    expect(wrapper.findComponent(TIconApp)).toBeTruthy();
  });

  it('disabled render', async () => {
    const wrapper = mount(() => <Tag disabled>{TEXT}</Tag>);
    expect(wrapper.classes()).toContain('t-is-disabled');
  });

  it('maxWidth render', async () => {
    const wrapper = mount(() => <Tag maxWidth="130px">{TEXT}</Tag>);
    expect(getComputedStyle(wrapper.element, null).maxWidth).toBe('130px');
  });

  it('click render', async () => {
    const wrapper = mount(() => <Tag>{TEXT}</Tag>);
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('close render', async () => {
    const wrapper = mount(() => <Tag closable>{TEXT}</Tag>);
    const com = wrapper.findComponent(Tag);
    expect(wrapper.classes()).toContain('t-tag--closable');
    const closeBtn = com.find('.t-tag__icon-close');
    expect(closeBtn.exists()).toBeTruthy();

    await closeBtn.trigger('click');
    expect(com.emitted('close')).toBeTruthy();
  });
});

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
    expect(wrapper.emitted('click')).toBeTruthy();
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

import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { AppIcon as TIconApp } from 'tdesign-icons-vue-next';
import Tag from '../tag.tsx';
import TCheckTag from '../check-tag';

const TEXT = 'tdesign-mobile-vue';
const iconFunc = () => h(TIconApp);

const themeList = ['danger', 'default', 'primary', 'success', 'warning', ''];
const variantList = ['dark', 'light', 'light-outline', 'outline', ''];
const sizeList = ['large', 'medium', 'small', ''];
const shapeList = ['mark', 'round', 'square', ''];

describe('Tag.vue', async () => {
  it('create', async () => {
    const wrapper = mount(() => <Tag>{TEXT}</Tag>);
    expect(wrapper.text()).toBe(TEXT);
    expect(wrapper.classes()).toContain('t-tag');
  });

  it('theme render', async () => {
    themeList.forEach((t) => {
      const wrapper = mount(() => <Tag theme={t}>{TEXT}</Tag>);
      if (!t) {
        expect(wrapper.classes()).toContain(`t-tag`);
      } else {
        expect(wrapper.classes()).toContain(`t-tag--${t}`);
      }
    });
  });

  it('variant render', async () => {
    variantList.forEach((v) => {
      const wrapper = mount(() => <Tag variant={v}>{TEXT}</Tag>);
      if (!v) {
        expect(wrapper.classes()).toContain(`t-tag--${'default'}`);
      } else {
        expect(wrapper.classes()).toContain(`t-tag--${v}`);
      }
    });
  });

  it('size render', async () => {
    sizeList.forEach((s) => {
      const wrapper = mount(() => <Tag size={s}>{TEXT}</Tag>);
      if (!s) {
        expect(wrapper.classes()).toContain(`t-tag--${'default'}`);
      } else {
        expect(wrapper.classes()).toContain(`t-tag--${s}`);
      }
    });
  });

  it('shape render', async () => {
    shapeList.forEach((s) => {
      const wrapper = mount(() => <Tag shape={s}>{TEXT}</Tag>);
      if (!s) {
        expect(wrapper.classes()).toContain(`t-tag--${'default'}`);
      } else {
        expect(wrapper.classes()).toContain(`t-tag--${s}`);
      }
    });
  });

  it('icon render', async () => {
    const wrapper = mount(() => <Tag icon={iconFunc}>{TEXT}</Tag>);
    expect(wrapper.findComponent(TIconApp)).toBeTruthy();
  });

  it('disabled render', async () => {
    const wrapper = mount(() => <Tag disabled>{TEXT}</Tag>);
    expect(wrapper.classes()).toContain('t-tag--disabled');
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
    const onClose = vi.fn();
    const wrapper = mount(() => (
      <Tag closable onClose={onClose}>
        {TEXT}
      </Tag>
    ));
    const com = wrapper.findComponent(Tag);
    expect(wrapper.classes()).toContain('t-tag--closable');
    const closeBtn = com.find('.t-tag__icon-close');
    expect(closeBtn.exists()).toBeTruthy();

    await closeBtn.trigger('click');
    expect(onClose).toBeCalledWith({ e: expect.any(MouseEvent) });
  });
});

describe('CheckTag render', async () => {
  it('create', async () => {
    const wrapper = mount(() => <TCheckTag>{TEXT}</TCheckTag>);
    expect(wrapper.classes()).toContain('t-tag');
    expect(wrapper.classes()).toContain('t-tag--checkable');
  });

  it('content render', async () => {
    const content = ['已选中态', '未选中态'];
    const wrapper = mount(() => <TCheckTag content={content}>{TEXT}</TCheckTag>);
    expect(wrapper.text()).toContain('未选中态');
    await wrapper.trigger('click');
    expect(wrapper.text()).toContain('已选中态');
    expect(wrapper.classes()).toContain('t-tag--checked');
  });

  it('checked render', async () => {
    const wrapper = mount(() => <TCheckTag modelValue={true}>{TEXT}</TCheckTag>);
    expect(wrapper.classes()).toContain('t-tag--checked');
  });

  it('disabled render', async () => {
    const wrapper = mount(() => <TCheckTag disabled>{TEXT}</TCheckTag>);
    expect(wrapper.classes()).toContain('t-tag--disabled');
  });

  it('icon render', async () => {
    const wrapper = mount(() => <TCheckTag icon={iconFunc}>{TEXT}</TCheckTag>);
    expect(wrapper.findComponent(TIconApp)).toBeTruthy();
  });

  it('size render', async () => {
    sizeList.forEach((s) => {
      const wrapper = mount(() => <TCheckTag size={s}>{TEXT}</TCheckTag>);
      expect(wrapper.classes()).toContain(`t-tag--${s}`);
    });
  });

  it('shape render', async () => {
    shapeList.forEach((s) => {
      const wrapper = mount(() => <TCheckTag shape={s}>{TEXT}</TCheckTag>);
      expect(wrapper.classes()).toContain(`t-tag--${s}`);
    });
  });

  it('variant render', async () => {
    variantList.forEach((v) => {
      const wrapper = mount(() => <TCheckTag variant={v}>{TEXT}</TCheckTag>);
      if (!v) {
        expect(wrapper.classes()).toContain(`t-tag--${'default'}`);
      } else {
        expect(wrapper.classes()).toContain(`t-tag--${v}`);
      }
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
  it('close render', async () => {
    const onClose = vi.fn();
    const wrapper = mount(() => (
      <TCheckTag closable onClose={onClose}>
        {TEXT}
      </TCheckTag>
    ));
    const com = wrapper.findComponent(TCheckTag);
    expect(wrapper.classes()).toContain('t-tag--closable');
    const closeBtn = com.find('.t-tag__icon-close');
    expect(closeBtn.exists()).toBeTruthy();

    await closeBtn.trigger('click');
    expect(onClose).toBeCalledWith({ e: expect.any(MouseEvent) });
  });
});

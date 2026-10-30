import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { AppIcon as TIconApp } from 'tdesign-icons-vue-next';
import TCheckTag from '../check-tag';

const TEXT = 'tdesign-mobile-vue';
const iconFunc = () => h(TIconApp);

const variantList = ['dark', 'light', 'light-outline', 'outline', ''];
const sizeList = ['large', 'medium', 'small', ''];
const shapeList = ['mark', 'round', 'square', ''];

describe('CheckTag', () => {
  describe('props', () => {
    it('content[array]', async () => {
      const content = ['已选中态', '未选中态'];
      const wrapper = mount(() => <TCheckTag content={content}>{TEXT}</TCheckTag>);
      expect(wrapper.text()).toContain('未选中态');
      await wrapper.trigger('click');
      expect(wrapper.text()).toContain('已选中态');
      expect(wrapper.classes()).toContain('t-tag--checked');
    });

    it('content[string]', async () => {
      const wrapper = mount(() => <TCheckTag content="自定义内容" />);
      expect(wrapper.text()).toContain('自定义内容');
    });

    it('checked[boolean]', async () => {
      const wrapper = mount(() => <TCheckTag modelValue={true}>{TEXT}</TCheckTag>);
      expect(wrapper.classes()).toContain('t-tag--checked');
    });

    it('disabled[boolean]', async () => {
      const wrapper = mount(() => <TCheckTag disabled>{TEXT}</TCheckTag>);
      expect(wrapper.classes()).toContain('t-tag--disabled');
    });

    it('icon[function]', async () => {
      const wrapper = mount(() => <TCheckTag icon={iconFunc}>{TEXT}</TCheckTag>);
      expect(wrapper.findComponent(TIconApp)).toBeTruthy();
    });

    it('size[string]', async () => {
      sizeList.forEach((s) => {
        const wrapper = mount(() => <TCheckTag size={s}>{TEXT}</TCheckTag>);
        expect(wrapper.classes()).toContain(`t-tag--${s}`);
      });
    });

    it('shape[string]', async () => {
      shapeList.forEach((s) => {
        const wrapper = mount(() => <TCheckTag shape={s}>{TEXT}</TCheckTag>);
        expect(wrapper.classes()).toContain(`t-tag--${s}`);
      });
    });

    it('variant[string]', async () => {
      variantList.forEach((v) => {
        const wrapper = mount(() => <TCheckTag variant={v}>{TEXT}</TCheckTag>);
        if (!v) {
          expect(wrapper.classes()).toContain(`t-tag--${'default'}`);
        } else {
          expect(wrapper.classes()).toContain(`t-tag--${v}`);
        }
      });
    });
  });

  describe('events', () => {
    it('click', async () => {
      const wrapper = mount(() => <TCheckTag>{TEXT}</TCheckTag>);
      await wrapper.trigger('click');
      expect(wrapper.emitted('click')).toBeTruthy();
    });

    it('change', async () => {
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

    it('close', async () => {
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

  describe('scenarios', () => {
    it('renders default checkable root class', async () => {
      const wrapper = mount(() => <TCheckTag>{TEXT}</TCheckTag>);
      expect(wrapper.classes()).toContain('t-tag');
      expect(wrapper.classes()).toContain('t-tag--checkable');
    });
  });
});

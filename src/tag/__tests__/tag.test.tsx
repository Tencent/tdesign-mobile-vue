import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { AppIcon as TIconApp } from 'tdesign-icons-vue-next';
import Tag from '../tag.tsx';

const TEXT = 'tdesign-mobile-vue';
const iconFunc = () => h(TIconApp);

const themeList = ['danger', 'default', 'primary', 'success', 'warning', ''];
const variantList = ['dark', 'light', 'light-outline', 'outline', ''];
const sizeList = ['large', 'medium', 'small', ''];
const shapeList = ['mark', 'round', 'square', ''];

describe('Tag', () => {
  describe('props', () => {
    it('theme[default/primary/warning/danger/success]', async () => {
      themeList.forEach((t) => {
        const wrapper = mount(() => <Tag theme={t}>{TEXT}</Tag>);
        if (!t) {
          expect(wrapper.classes()).toContain(`t-tag`);
        } else {
          expect(wrapper.classes()).toContain(`t-tag--${t}`);
        }
      });
    });

    it('variant[dark/light/outline/light-outline]', async () => {
      variantList.forEach((v) => {
        const wrapper = mount(() => <Tag variant={v}>{TEXT}</Tag>);
        if (!v) {
          expect(wrapper.classes()).toContain(`t-tag--${'default'}`);
        } else {
          expect(wrapper.classes()).toContain(`t-tag--${v}`);
        }
      });
    });

    it('size[small/medium/large/extra-large]', async () => {
      sizeList.forEach((s) => {
        const wrapper = mount(() => <Tag size={s}>{TEXT}</Tag>);
        if (!s) {
          expect(wrapper.classes()).toContain(`t-tag--${'default'}`);
        } else {
          expect(wrapper.classes()).toContain(`t-tag--${s}`);
        }
      });
    });

    it('shape[square/round/mark]', async () => {
      shapeList.forEach((s) => {
        const wrapper = mount(() => <Tag shape={s}>{TEXT}</Tag>);
        if (!s) {
          expect(wrapper.classes()).toContain(`t-tag--${'default'}`);
        } else {
          expect(wrapper.classes()).toContain(`t-tag--${s}`);
        }
      });
    });

    it('icon[function]', async () => {
      const wrapper = mount(() => <Tag icon={iconFunc}>{TEXT}</Tag>);
      expect(wrapper.findComponent(TIconApp)).toBeTruthy();
    });

    it('disabled[boolean]', async () => {
      const wrapper = mount(() => <Tag disabled>{TEXT}</Tag>);
      expect(wrapper.classes()).toContain('t-tag--disabled');
    });

    it('maxWidth[string]', async () => {
      const wrapper = mount(() => <Tag maxWidth="130px">{TEXT}</Tag>);
      expect(getComputedStyle(wrapper.element, null).maxWidth).toBe('130px');
    });

    it('maxWidth[number]', async () => {
      const wrapper = mount(() => <Tag maxWidth={130}>{TEXT}</Tag>);
      expect(getComputedStyle(wrapper.element, null).maxWidth).toBe('130px');
    });
  });

  describe('events', () => {
    it('click', async () => {
      const wrapper = mount(() => <Tag>{TEXT}</Tag>);
      await wrapper.trigger('click');
      expect(wrapper.emitted('click')).toBeTruthy();
    });

    it('close', async () => {
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

  describe('scenarios', () => {
    it('renders default content and root class', async () => {
      const wrapper = mount(() => <Tag>{TEXT}</Tag>);
      expect(wrapper.text()).toBe(TEXT);
      expect(wrapper.classes()).toContain('t-tag');
    });
  });
});

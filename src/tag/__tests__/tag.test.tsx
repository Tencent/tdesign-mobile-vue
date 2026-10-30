import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { AppIcon as TIconApp } from 'tdesign-icons-vue-next';
import Tag from '../tag.tsx';
import type { TdTagProps } from '../type';

const TEXT = 'tdesign-mobile-vue';
const iconFunc = () => h(TIconApp);

const themeList: TdTagProps['theme'][] = ['danger', 'default', 'primary', 'success', 'warning'];
const variantList: TdTagProps['variant'][] = ['dark', 'light', 'light-outline', 'outline'];
const sizeList: TdTagProps['size'][] = ['large', 'medium', 'small'];
const shapeList: TdTagProps['shape'][] = ['mark', 'round', 'square'];

describe('Tag', () => {
  describe('props', () => {
    it('closable[boolean]', () => {
      const wrapper = mount(() => <Tag closable>{TEXT}</Tag>);
      // 可关闭标签渲染关闭图标与对应类名
      expect(wrapper.classes()).toContain('t-tag--closable');
      expect(wrapper.find('.t-tag__icon-close').exists()).toBe(true);

      const wrapper2 = mount(() => <Tag>{TEXT}</Tag>);
      expect(wrapper2.classes()).not.toContain('t-tag--closable');
      expect(wrapper2.find('.t-tag__icon-close').exists()).toBe(false);
    });

    it('content[string]', async () => {
      const wrapper = mount(() => <Tag content="prop 内容" />);
      // content prop 通道渲染标签文本，与默认插槽区分
      expect(wrapper.find('.t-tag__text').text()).toBe('prop 内容');
    });
    it('content[function]', async () => {
      const wrapper = mount(() => <Tag content={() => '函数内容'} />);
      expect(wrapper.find('.t-tag__text').text()).toBe('函数内容');
    });

    it('default[string]', async () => {
      const wrapper = mount(Tag, {
        props: {
          default: 'default prop 内容',
        },
      });
      // default prop 通道优先于 content prop 渲染标签文本
      expect(wrapper.find('.t-tag__text').text()).toBe('default prop 内容');
    });

    it('disabled[boolean]', async () => {
      const wrapper = mount(() => <Tag disabled>{TEXT}</Tag>);
      expect(wrapper.classes()).toContain('t-tag--disabled');
    });

    it('icon[function]', async () => {
      const wrapper = mount(() => <Tag icon={iconFunc}>{TEXT}</Tag>);
      expect(wrapper.findComponent(TIconApp).exists()).toBeTruthy();
    });

    it('maxWidth[string]', async () => {
      const wrapper = mount(() => <Tag maxWidth="130px">{TEXT}</Tag>);
      expect(getComputedStyle(wrapper.element, null).maxWidth).toBe('130px');
    });

    it('maxWidth[number]', async () => {
      const wrapper = mount(() => <Tag maxWidth={130}>{TEXT}</Tag>);
      expect(getComputedStyle(wrapper.element, null).maxWidth).toBe('130px');
    });

    it('shape[square/round/mark]', async () => {
      shapeList.forEach((s) => {
        const wrapper = mount(() => <Tag shape={s}>{TEXT}</Tag>);
        expect(wrapper.classes()).toContain(`t-tag--${s}`);
      });
    });

    it('size[small/medium/large/extra-large]', async () => {
      sizeList.forEach((s) => {
        const wrapper = mount(() => <Tag size={s}>{TEXT}</Tag>);
        expect(wrapper.classes()).toContain(`t-tag--${s}`);
      });
    });

    it('theme[default/primary/warning/danger/success]', async () => {
      themeList.forEach((t) => {
        const wrapper = mount(() => <Tag theme={t}>{TEXT}</Tag>);
        expect(wrapper.classes()).toContain(`t-tag--${t}`);
      });
    });

    it('variant[dark/light/outline/light-outline]', async () => {
      variantList.forEach((v) => {
        const wrapper = mount(() => <Tag variant={v}>{TEXT}</Tag>);
        expect(wrapper.classes()).toContain(`t-tag--${v}`);
      });
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

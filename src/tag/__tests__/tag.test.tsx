import { h } from 'vue';
import { enableAutoUnmount, mount } from '@vue/test-utils';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { AppIcon as TIconApp } from 'tdesign-icons-vue-next';
import Tag from '../tag';
import type { TdTagProps } from '../type';

const TEXT = 'tdesign-mobile-vue';
const iconFunc = () => h(TIconApp);

const themeList: TdTagProps['theme'][] = ['danger', 'default', 'primary', 'success', 'warning'];
const variantList: TdTagProps['variant'][] = ['dark', 'light', 'light-outline', 'outline'];
const sizeList: TdTagProps['size'][] = ['large', 'medium', 'small', 'extra-large'];
const shapeList: TdTagProps['shape'][] = ['mark', 'round', 'square'];

enableAutoUnmount(afterEach);

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
      const wrapper = mount(() => <Tag content={() => <strong class="function-content">函数内容</strong>} />);
      expect(wrapper.get('.t-tag__text .function-content').text()).toBe('函数内容');
    });

    it('content[slot]', () => {
      const wrapper = mount(Tag, { slots: { content: () => <span>内容插槽</span> } });
      expect(wrapper.get('.t-tag__text').text()).toBe('内容插槽');
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

    it('default[function]', () => {
      const wrapper = mount(Tag, { props: { default: () => <span>默认函数内容</span> } });
      expect(wrapper.get('.t-tag__text').text()).toBe('默认函数内容');
    });

    it('default[slot]', () => {
      const wrapper = mount(Tag, { slots: { default: () => <span>默认插槽内容</span> } });
      expect(wrapper.get('.t-tag__text').text()).toBe('默认插槽内容');
    });

    it('disabled[boolean]', async () => {
      const onClick = vi.fn();
      const onClose = vi.fn();
      const onParentClick = vi.fn();
      const wrapper = mount(() => (
        <div onClick={onParentClick}>
          <Tag disabled closable onClick={onClick} onClose={onClose}>
            {TEXT}
          </Tag>
        </div>
      ));
      expect(wrapper.get('.t-tag').classes()).toContain('t-tag--disabled');
      expect(wrapper.get('.t-tag').attributes('aria-disabled')).toBe('true');
      await wrapper.get('.t-tag').trigger('click');
      await wrapper.get('.t-tag__icon-close').trigger('click');
      expect(onClick).not.toHaveBeenCalled();
      expect(onClose).not.toHaveBeenCalled();
      expect(onParentClick).toHaveBeenCalledTimes(1);
    });

    it('icon[function]', async () => {
      const wrapper = mount(() => <Tag icon={iconFunc}>{TEXT}</Tag>);
      expect(wrapper.findComponent(TIconApp).exists()).toBeTruthy();
    });

    it('icon[slot]', () => {
      const wrapper = mount(Tag, { slots: { icon: iconFunc } });
      expect(wrapper.findComponent(TIconApp).exists()).toBe(true);
    });

    it('maxWidth[string]', async () => {
      const wrapper = mount(() => <Tag maxWidth="130px">{TEXT}</Tag>);
      expect(getComputedStyle(wrapper.element, null).maxWidth).toBe('130px');
    });

    it('maxWidth[number]', async () => {
      const wrapper = mount(Tag, { props: { maxWidth: 130 } });
      expect(getComputedStyle(wrapper.element, null).maxWidth).toBe('130px');
      await wrapper.setProps({ maxWidth: 0 });
      expect((wrapper.element as HTMLElement).style.maxWidth).toBe('');
      await wrapper.setProps({ maxWidth: 'calc(100% - 16px)' });
      expect((wrapper.element as HTMLElement).style.maxWidth).toBe('calc(100% - 16px)');
    });

    it.each(shapeList)('shape[%s]', (shape) => {
      const wrapper = mount(() => <Tag shape={shape}>{TEXT}</Tag>);
      expect(wrapper.classes()).toContain(`t-tag--${shape}`);
    });

    it.each(sizeList)('size[%s]', (size) => {
      const wrapper = mount(() => <Tag size={size}>{TEXT}</Tag>);
      expect(wrapper.classes()).toContain(`t-tag--${size}`);
    });

    it.each(themeList)('theme[%s]', (theme) => {
      const wrapper = mount(() => <Tag theme={theme}>{TEXT}</Tag>);
      expect(wrapper.classes()).toContain(`t-tag--${theme}`);
    });

    it.each(variantList)('variant[%s]', (variant) => {
      const wrapper = mount(() => <Tag variant={variant}>{TEXT}</Tag>);
      expect(wrapper.classes()).toContain(`t-tag--${variant}`);
    });
  });

  describe('events', () => {
    it('click', async () => {
      const onClick = vi.fn();
      const wrapper = mount(() => <Tag>{TEXT}</Tag>);
      await wrapper.trigger('click');
      expect(wrapper.emitted('click')).toBeTruthy();

      const callbackWrapper = mount(Tag, { props: { onClick } });
      const event = new MouseEvent('click', { bubbles: true });
      callbackWrapper.element.dispatchEvent(event);
      expect(onClick).toHaveBeenCalledExactlyOnceWith({ e: event });
    });

    it('close', async () => {
      const onClose = vi.fn();
      const onClick = vi.fn();
      const wrapper = mount(() => (
        <Tag closable onClose={onClose} onClick={onClick}>
          {TEXT}
        </Tag>
      ));
      const com = wrapper.findComponent(Tag);
      expect(wrapper.classes()).toContain('t-tag--closable');
      const closeBtn = com.find('.t-tag__icon-close');
      expect(closeBtn.exists()).toBeTruthy();

      await closeBtn.trigger('click');
      expect(onClose).toHaveBeenCalledExactlyOnceWith({ e: expect.any(MouseEvent) });
      // 关闭按钮阻止事件冒泡到标签根节点
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('scenarios', () => {
    it('renders default content and root class', async () => {
      const wrapper = mount(() => <Tag>{TEXT}</Tag>);
      expect(wrapper.text()).toBe(TEXT);
      expect(wrapper.classes()).toContain('t-tag');
      expect(wrapper.attributes('aria-disabled')).toBe('false');
      expect(wrapper.attributes('role')).toBe('button');
    });

    it('updates tag classes and style when appearance props change', async () => {
      const wrapper = mount(Tag, { props: { theme: 'primary', size: 'small', variant: 'outline', shape: 'round' } });
      expect(wrapper.classes()).toEqual(
        expect.arrayContaining(['t-tag--primary', 't-tag--small', 't-tag--outline', 't-tag--round']),
      );
      await wrapper.setProps({ theme: 'success', size: 'large', variant: 'light', shape: 'mark', maxWidth: 96 });
      expect(wrapper.classes()).toEqual(
        expect.arrayContaining(['t-tag--success', 't-tag--large', 't-tag--light', 't-tag--mark']),
      );
      expect(wrapper.classes()).not.toContain('t-tag--primary');
      expect((wrapper.element as HTMLElement).style.maxWidth).toBe('96px');
    });
  });
});

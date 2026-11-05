import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { AppIcon as TIconApp } from 'tdesign-icons-vue-next';
import Button from '../button';

const prefix = 't';
const name = `${prefix}-button`;

const TEXT = 'tdesign-mobile-vue';
const iconFunc = () => h(TIconApp);

describe('Button', () => {
  describe('props', () => {
    it('block[boolean]', async () => {
      const block = true;
      const wrapper = mount(Button, {
        props: {
          block,
          content: TEXT,
        },
      });
      const $button = wrapper.findComponent(Button);

      // block = true
      expect($button.classes().includes(`${name}--block`)).toBeTruthy();
      // block = false
      await wrapper.setProps({
        block: false,
      });
      expect($button.classes().includes(`${name}--block`)).toBeFalsy();
    });

    it('content[string]', async () => {
      const wrapper = mount(Button, {
        props: {
          content: TEXT,
        },
      });
      const $button = wrapper.findComponent(Button);
      expect($button.text()).toBe(TEXT);

      const newContent = 'new content';
      await wrapper.setProps({
        content: newContent,
      });
      expect($button.text()).toBe(newContent);
    });

    it('content[function]', async () => {
      const wrapper = mount(Button, {
        props: {
          content: () => 'function content',
        },
      });
      const $button = wrapper.findComponent(Button);
      expect($button.text()).toBe('function content');
    });

    it('content[slot]', () => {
      const wrapper = mount(Button, { slots: { content: () => <span>具名内容</span> } });
      expect(wrapper.find(`.${name}__content`).text()).toBe('具名内容');
    });

    it('disabled[boolean]', async () => {
      const onClick = vi.fn();
      const disabled = true;
      const wrapper = mount(Button, {
        props: {
          disabled,
          content: TEXT,
          onClick,
        },
      });
      const $button = wrapper.findComponent(Button);
      // disabled = true, 不会触发 click
      expect($button.classes()).toContain(`${name}--disabled`);
      await $button.trigger('click');
      expect(onClick).not.toBeCalled();

      // disabled = false, 可以触发 click
      await wrapper.setProps({
        disabled: false,
      });
      await $button.trigger('click');
      expect(onClick).toBeCalled();
    });

    it('form[string]', async () => {
      const wrapper = mount(Button, {
        props: {
          content: TEXT,
          form: 'form-id',
        },
      });
      // 原生 button 输出 form 属性
      expect(wrapper.element.getAttribute('form')).toBe('form-id');

      // 非原生标签（a/div）不输出 form 属性
      await wrapper.setProps({ tag: 'div' });
      expect(wrapper.element.hasAttribute('form')).toBeFalsy();
    });

    it('ghost[boolean]', async () => {
      const ghost = true;
      const wrapper = mount(Button, {
        props: {
          ghost,
          content: TEXT,
        },
      });
      const $button = wrapper.findComponent(Button);

      // ghost = true
      expect($button.classes().includes(`${name}--ghost`)).toBeTruthy();
      // ghost = false
      await wrapper.setProps({
        ghost: false,
      });
      expect($button.classes().includes(`${name}--ghost`)).toBeFalsy();
    });

    it('href[string]', async () => {
      // 不传 tag，仅传 href 时默认使用 a 标签渲染
      const wrapper = mount(Button, {
        props: {
          content: TEXT,
          href: 'https://tdesign.tencent.com',
        },
      });
      expect(wrapper.element.tagName.toLowerCase()).toBe('a');
      expect(wrapper.element.getAttribute('href')).toBe('https://tdesign.tencent.com');

      // 显式指定 tag 时优先使用 tag
      await wrapper.setProps({
        tag: 'div',
      });
      expect(wrapper.element.tagName.toLowerCase()).toBe('div');
    });

    it('icon[function]', async () => {
      const wrapper = mount(Button, {
        props: {
          icon: iconFunc,
          content: TEXT,
        },
      });
      const $button = wrapper.findComponent(Button);
      expect($button.findComponent(TIconApp).exists()).toBeTruthy();
    });

    it('icon[slot]', () => {
      const wrapper = mount(Button, { slots: { icon: iconFunc } });
      expect(wrapper.findComponent(TIconApp).exists()).toBe(true);
    });

    it('loading[boolean]', async () => {
      const loading = true;
      const onClick = vi.fn();
      const wrapper = mount(Button, {
        props: {
          loading,
          content: TEXT,
          onClick,
        },
      });
      const $button = wrapper.findComponent(Button);

      // loading = true，带 loading 样式类且不触发 click
      expect($button.classes()).toContain(`${name}--loading`);
      await $button.trigger('click');
      expect(onClick).not.toBeCalled();
      // loading = false
      await wrapper.setProps({
        loading: false,
      });
      expect($button.classes()).not.toContain(`${name}--loading`);
      await $button.trigger('click');
      expect(onClick).toBeCalled();
    });

    it('loadingProps[object]', async () => {
      const wrapper = mount(Button, {
        props: {
          content: TEXT,
          loading: true,
          loadingProps: { indicator: false },
        },
      });
      expect(wrapper.find('.t-button').exists()).toBeTruthy();
      expect(wrapper.find('.t-icon-loading').exists()).toBeFalsy();
    });

    it.each(['rectangle', 'square', 'round', 'circle'] as const)('shape[%s]', (shape) => {
      const wrapper = mount(Button, { props: { content: TEXT, shape } });
      expect(wrapper.classes()).toContain(`${name}--${shape}`);
      expect(wrapper.text()).toBe(TEXT);
    });

    it.each(['extra-small', 'small', 'medium', 'large'] as const)('size[%s]', (size) => {
      const wrapper = mount(Button, { props: { content: TEXT, size } });
      expect(wrapper.classes()).toContain(`${name}--size-${size}`);
      expect(wrapper.text()).toBe(TEXT);
    });

    it('suffix[function]', async () => {
      const wrapper = mount(Button, {
        props: {
          content: TEXT,
          suffix: () => <span class="btn-suffix">后缀</span>,
        },
      });
      expect(wrapper.find('.btn-suffix').exists()).toBeTruthy();
    });

    it('suffix[slot]', () => {
      const wrapper = mount(Button, { slots: { suffix: () => <span class="slot-suffix">后缀</span> } });
      expect(wrapper.find('.slot-suffix').text()).toBe('后缀');
    });

    it.each(['button', 'a', 'div'] as const)('tag[%s]', (tag) => {
      const wrapper = mount(Button, { props: { content: TEXT, tag } });
      expect(wrapper.element.tagName.toLowerCase()).toBe(tag);
    });

    it.each(['default', 'primary', 'danger', 'light'] as const)('theme[%s]', (theme) => {
      const wrapper = mount(Button, { props: { content: TEXT, theme } });
      expect(wrapper.classes()).toContain(`${name}--${theme}`);
      expect(wrapper.text()).toBe(TEXT);
    });

    it.each(['submit', 'reset', 'button'] as const)('type[%s]', (type) => {
      const wrapper = mount(Button, { props: { content: TEXT, type } });
      expect(wrapper.element.getAttribute('type')).toBe(type);
    });

    it.each(['base', 'outline', 'dashed', 'text'] as const)('variant[%s]', (variant) => {
      const wrapper = mount(Button, { props: { content: TEXT, variant } });
      expect(wrapper.classes()).toContain(`${name}--${variant}`);
      expect(wrapper.text()).toBe(TEXT);
    });

    it('default[slot]', () => {
      const wrapper = mount(Button, { slots: { default: () => <span>默认内容</span> } });
      expect(wrapper.find(`.${name}__content`).text()).toBe('默认内容');
    });
  });

  describe('events', () => {
    it('click', async () => {
      const onClick = vi.fn();
      const wrapper = mount(Button, { props: { onClick } });

      await wrapper.trigger('click');

      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(expect.any(MouseEvent));
    });
  });
});

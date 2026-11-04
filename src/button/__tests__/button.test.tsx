import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { AppIcon as TIconApp } from 'tdesign-icons-vue-next';
import Button from '../button';
import Loading from '../../loading';

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

      // loading = true，不触发 click
      await $button.trigger('click');
      expect(onClick).not.toBeCalled();
      // loading = false
      await wrapper.setProps({
        loading: false,
      });
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

    it('shape[rectangle/square/round/circle]', async () => {
      const wrapper = mount(Button, {
        props: {
          content: TEXT,
        },
      });
      // shape 默认 rectangle
      const $button = wrapper.findComponent(Button);
      expect($button.classes()).toContain(`${name}--rectangle`);
      ['square', 'round', 'circle'].forEach((item) => {
        expect($button.classes().includes(`${name}--${item}`)).toBeFalsy();
      });
      expect(wrapper.text()).toBe(TEXT);
      const shape = 'square';
      await wrapper.setProps({
        shape,
      });
      // shape = 'square'
      expect($button.classes()).toContain(`${name}--${shape}`);
      (['rectangle', 'square', 'round', 'circle'] as const).forEach((value) => {
        const shapeWrapper = mount(Button, { props: { shape: value } });
        expect(shapeWrapper.classes()).toContain(`${name}--${value}`);
      });
    });

    it('size[extra-small/small/medium/large]', async () => {
      const wrapper = mount(Button, {
        props: {
          content: TEXT,
        },
      });
      // size 默认 medium
      const $button = wrapper.findComponent(Button);
      expect($button.classes()).toContain(`${name}--size-medium`);
      ['small', 'large'].forEach((item) => {
        expect($button.classes().includes(`${name}--size-${item}`)).toBeFalsy();
      });
      expect(wrapper.text()).toBe(TEXT);
      const size = 'small';
      await wrapper.setProps({
        size,
      });
      // size = 'small'
      expect($button.classes()).toContain(`${name}--size-small`);
      (['extra-small', 'small', 'medium', 'large'] as const).forEach((value) => {
        const sizeWrapper = mount(Button, { props: { size: value } });
        expect(sizeWrapper.classes()).toContain(`${name}--size-${value}`);
      });
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

    it('tag[button/a/div]', async () => {
      // 默认渲染为 button 标签
      const wrapper = mount(Button, {
        props: {
          content: TEXT,
        },
      });
      expect(wrapper.element.tagName.toLowerCase()).toBe('button');

      // tag = 'a'
      await wrapper.setProps({
        tag: 'a',
      });
      expect(wrapper.element.tagName.toLowerCase()).toBe('a');

      // tag = 'div'
      await wrapper.setProps({
        tag: 'div',
      });
      expect(wrapper.element.tagName.toLowerCase()).toBe('div');
    });

    it('theme[default/primary/danger/light]', async () => {
      const wrapper = mount(Button, {
        props: {
          content: TEXT,
        },
      });
      // theme 默认 default
      const $button = wrapper.findComponent(Button);
      expect($button.classes()).toContain(`${name}--default`);
      ['primary', 'danger'].forEach((item) => {
        expect($button.classes().includes(`${name}--${item}`)).toBeFalsy();
      });
      expect(wrapper.text()).toBe(TEXT);
      const theme = 'danger';
      await wrapper.setProps({
        theme,
      });
      // theme = 'danger'
      expect($button.classes()).toContain(`${name}--${theme}`);
      (['default', 'primary', 'danger', 'light'] as const).forEach((value) => {
        const themeWrapper = mount(Button, { props: { theme: value } });
        expect(themeWrapper.classes()).toContain(`${name}--${value}`);
      });
    });

    it('type[submit/reset/button]', async () => {
      const wrapper = mount(Button, {
        props: {
          content: TEXT,
        },
      });
      // type 默认 button，作为原生 button 标签的 type 属性输出
      expect(wrapper.element.getAttribute('type')).toBe('button');

      // 遍历枚举值，均输出到原生 type 属性
      await wrapper.setProps({ type: 'submit' });
      expect(wrapper.element.getAttribute('type')).toBe('submit');
      await wrapper.setProps({ type: 'reset' });
      expect(wrapper.element.getAttribute('type')).toBe('reset');
      await wrapper.setProps({ type: 'button' });
      expect(wrapper.element.getAttribute('type')).toBe('button');
    });

    it('variant[base/outline/dashed/text]', async () => {
      const wrapper = mount(Button, {
        props: {
          content: TEXT,
        },
      });
      // variant 默认 base
      const $button = wrapper.findComponent(Button);
      expect($button.classes()).toContain(`${name}--base`);
      ['outline', 'text'].forEach((item) => {
        expect($button.classes().includes(`${name}--${item}`)).toBeFalsy();
      });
      expect(wrapper.text()).toBe(TEXT);
      const variant = 'outline';
      await wrapper.setProps({
        variant,
      });
      // variant = 'outline'
      expect($button.classes()).toContain(`${name}--${variant}`);
      (['base', 'outline', 'dashed', 'text'] as const).forEach((value) => {
        const variantWrapper = mount(Button, { props: { variant: value } });
        expect(variantWrapper.classes()).toContain(`${name}--${value}`);
      });
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

  describe('scenarios', () => {
    describe('content priority', () => {
      it('default slot takes priority over content prop', () => {
        const wrapper = mount(Button, {
          props: { content: '属性内容' },
          slots: { default: () => <span>默认插槽</span> },
        });
        expect(wrapper.find(`.${name}__content`).text()).toBe('默认插槽');
      });

      it('content prop takes priority over content slot', () => {
        const wrapper = mount(Button, {
          props: { content: '属性内容' },
          slots: { content: () => <span>具名插槽</span> },
        });
        expect(wrapper.find(`.${name}__content`).text()).toBe('属性内容');
      });
    });

    it('icon prop takes priority over icon slot', () => {
      const wrapper = mount(Button, {
        props: { icon: iconFunc },
        slots: { icon: () => <span class="slot-icon">插槽图标</span> },
      });
      expect(wrapper.findComponent(TIconApp).exists()).toBe(true);
      expect(wrapper.find('.slot-icon').exists()).toBe(false);
    });

    it('suffix prop takes priority over suffix slot', () => {
      const wrapper = mount(Button, {
        props: { suffix: () => <span class="prop-suffix">属性后缀</span> },
        slots: { suffix: () => <span class="slot-suffix">插槽后缀</span> },
      });
      expect(wrapper.find('.prop-suffix').text()).toBe('属性后缀');
      expect(wrapper.find('.slot-suffix').exists()).toBe(false);
    });

    it('loading replaces icon and restores it when finished', async () => {
      const wrapper = mount(Button, { props: { loading: true, icon: iconFunc } });
      expect(wrapper.findComponent(Loading).exists()).toBe(true);
      expect(wrapper.findComponent(TIconApp).exists()).toBe(false);

      await wrapper.setProps({ loading: false });

      expect(wrapper.findComponent(Loading).exists()).toBe(false);
      expect(wrapper.findComponent(TIconApp).exists()).toBe(true);
    });

    describe('tag rendering', () => {
      it('native button: role/type', async () => {
        const wrapper = mount(Button, {
          props: {
            content: TEXT,
            type: 'submit',
          },
        });
        // 原生 button 隐含 role=button，不再冗余输出 role 属性
        expect(wrapper.element.tagName.toLowerCase()).toBe('button');
        expect(wrapper.element.hasAttribute('role')).toBeFalsy();
        // 原生 button 输出 type 属性
        expect(wrapper.element.getAttribute('type')).toBe('submit');
      });

      it('custom tag: role/type', async () => {
        const wrapper = mount(Button, {
          props: {
            content: TEXT,
            tag: 'div',
            type: 'submit',
          },
        });
        // 非原生标签显式输出 role=button
        expect(wrapper.element.getAttribute('role')).toBe('button');
        // 非原生标签不输出 type 属性
        expect(wrapper.element.hasAttribute('type')).toBeFalsy();
      });

      it('tag disabled', async () => {
        const onClick = vi.fn();
        // 非原生标签禁用时：不设置 disabled，改用 aria-disabled + tabindex="-1"
        const wrapper = mount(Button, {
          props: {
            content: TEXT,
            tag: 'a',
            disabled: true,
            onClick,
          },
        });
        expect(wrapper.element.tagName.toLowerCase()).toBe('a');
        expect(wrapper.element.hasAttribute('disabled')).toBeFalsy();
        expect(wrapper.element.getAttribute('aria-disabled')).toBe('true');
        expect(wrapper.element.getAttribute('tabindex')).toBe('-1');
        await wrapper.trigger('click');
        expect(onClick).not.toHaveBeenCalled();

        await wrapper.setProps({ disabled: false });
        expect(wrapper.element.hasAttribute('aria-disabled')).toBe(false);
        expect(wrapper.element.getAttribute('tabindex')).toBe('0');
        await wrapper.trigger('click');
        expect(onClick).toHaveBeenCalledTimes(1);
      });
    });
  });
});

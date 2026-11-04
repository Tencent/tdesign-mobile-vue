import { enableAutoUnmount, mount } from '@vue/test-utils';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import { Icon, AppIcon as TIconApp } from 'tdesign-icons-vue-next';
import Link from '../link';

enableAutoUnmount(afterEach);

describe('Link', () => {
  describe('props', () => {
    it('content[string]', () => {
      const wrapper = mount(() => <Link content="foo" />);
      expect(wrapper.get('.t-link__content').text()).toBe('foo');
    });

    it('content[function]', () => {
      const wrapper = mount(() => <Link content={() => <span class="fn-content">函数内容</span>} />);
      expect(wrapper.get('.t-link__content .fn-content').text()).toBe('函数内容');
    });

    it('content[slot]', () => {
      const wrapper = mount(Link, { slots: { content: () => <span class="slot-content">具名内容</span> } });
      expect(wrapper.get('.t-link__content .slot-content').text()).toBe('具名内容');
    });

    it('default[string]', () => {
      // default prop 与默认插槽同名，此处验证 prop 传入通道
      const wrapper = mount(Link, { props: { default: '默认内容' } });
      expect(wrapper.get('.t-link__content').text()).toBe('默认内容');
    });

    it('default[function]', () => {
      const wrapper = mount(Link, { props: { default: () => <span class="default-content">函数默认内容</span> } });
      expect(wrapper.get('.t-link__content .default-content').text()).toBe('函数默认内容');
    });

    it('default[slot]', () => {
      const wrapper = mount(Link, { slots: { default: () => <span>插槽内容</span> } });
      expect(wrapper.get('.t-link__content').text()).toBe('插槽内容');
    });

    it('disabled[boolean]', async () => {
      const onClick = vi.fn();
      const wrapper = mount(Link, {
        props: { disabled: true, href: 'https://tdesign.tencent.com', onClick },
        slots: { default: () => '链接' },
      });
      expect(wrapper.classes()).toContain('t-link--disabled');
      // 禁用时不输出 href，并以 aria-disabled 标识
      expect(wrapper.attributes('href')).toBeUndefined();
      expect(wrapper.attributes('aria-disabled')).toBe('true');
      await wrapper.trigger('click');
      expect(onClick).not.toHaveBeenCalled();

      await wrapper.setProps({ disabled: false });
      expect(wrapper.classes()).not.toContain('t-link--disabled');
      expect(wrapper.attributes('href')).toBe('https://tdesign.tencent.com');
      expect(wrapper.attributes('aria-disabled')).toBe('false');
      await wrapper.trigger('click');
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('hover[boolean]', async () => {
      const wrapper = mount(Link, { props: { hover: true }, slots: { default: () => '链接' } });
      expect(wrapper.classes()).toContain('t-link--hover');

      // 禁用状态下关闭点击反馈
      await wrapper.setProps({ disabled: true });
      expect(wrapper.classes()).not.toContain('t-link--hover');
    });

    it('href[string]', () => {
      const wrapper = mount(Link, {
        props: { href: 'https://tdesign.tencent.com', target: '_blank' },
        slots: { default: () => '链接' },
      });
      expect(wrapper.element.tagName.toLowerCase()).toBe('a');
      expect(wrapper.attributes('href')).toBe('https://tdesign.tencent.com');
      expect(wrapper.attributes('target')).toBe('_blank');

      // 未设置 href 时不输出 href 属性
      expect(mount(Link, { slots: { default: () => '链接' } }).attributes('href')).toBeUndefined();
    });

    it('prefixIcon[function]', () => {
      const wrapper = mount(Link, { props: { prefixIcon: () => <Icon /> } });
      expect(wrapper.get('.t-link__prefix-icon').findComponent(Icon).exists()).toBe(true);
    });

    it('prefixIcon[slot]', () => {
      const wrapper = mount(Link, { slots: { prefixIcon: () => <Icon /> } });
      expect(wrapper.get('.t-link__prefix-icon').findComponent(Icon).exists()).toBe(true);
    });

    it('size[small/medium/large]', () => {
      (['small', 'medium', 'large'] as const).forEach((size) => {
        const wrapper = mount(Link, { props: { size }, slots: { default: () => '链接' } });
        expect(wrapper.classes()).toContain(`t-link--${size}`);
      });
    });

    it('suffixIcon[function]', () => {
      const wrapper = mount(Link, { props: { suffixIcon: () => <Icon /> } });
      expect(wrapper.get('.t-link__suffix-icon').findComponent(Icon).exists()).toBe(true);
    });

    it('suffixIcon[slot]', () => {
      const wrapper = mount(Link, { slots: { suffixIcon: () => <TIconApp /> } });
      expect(wrapper.get('.t-link__suffix-icon').findComponent(TIconApp).exists()).toBe(true);
    });

    it('target[string]', () => {
      const wrapper = mount(Link, {
        props: { href: 'https://tdesign.tencent.com', target: '_self' },
        slots: { default: () => '链接' },
      });
      // target 透传给原生 a 元素
      expect(wrapper.attributes('target')).toBe('_self');
    });

    it('theme[default/primary/danger/warning/success]', () => {
      (['default', 'primary', 'danger', 'warning', 'success'] as const).forEach((theme) => {
        const wrapper = mount(Link, { props: { theme }, slots: { default: () => '链接' } });
        expect(wrapper.classes()).toContain(`t-link--${theme}`);
      });
    });

    it('underline[boolean]', async () => {
      const wrapper = mount(Link, { slots: { default: () => '链接' } });
      expect(wrapper.classes()).not.toContain('t-link--underline');
      await wrapper.setProps({ underline: true });
      expect(wrapper.classes()).toContain('t-link--underline');
    });
  });

  describe('events', () => {
    it('click', async () => {
      const onClick = vi.fn();
      const wrapper = mount(Link, { props: { onClick }, slots: { default: () => '链接' } });
      await wrapper.trigger('click');
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(expect.any(MouseEvent));
      expect(wrapper.emitted('click')).toHaveLength(1);
    });
  });

  describe('scenarios', () => {
    it('default slot takes priority over content prop', () => {
      const wrapper = mount(Link, { props: { content: '属性内容' }, slots: { default: () => '插槽内容' } });
      expect(wrapper.get('.t-link__content').text()).toBe('插槽内容');
    });

    it('content prop takes priority over content slot', () => {
      const wrapper = mount(Link, {
        props: { content: '属性内容' },
        slots: { content: () => <span class="slot-content">具名内容</span> },
      });
      expect(wrapper.get('.t-link__content').text()).toBe('属性内容');
      expect(wrapper.find('.slot-content').exists()).toBe(false);
    });

    it('prefixIcon prop takes priority over prefixIcon slot', () => {
      const wrapper = mount(Link, {
        props: { prefixIcon: () => <Icon /> },
        slots: { prefixIcon: () => <TIconApp /> },
      });
      expect(wrapper.get('.t-link__prefix-icon').findComponent(Icon).exists()).toBe(true);
      expect(wrapper.findComponent(TIconApp).exists()).toBe(false);
    });

    it('suffixIcon prop takes priority over suffixIcon slot', () => {
      const wrapper = mount(Link, {
        props: { suffixIcon: () => <Icon /> },
        slots: { suffixIcon: () => <TIconApp /> },
      });
      expect(wrapper.get('.t-link__suffix-icon').findComponent(Icon).exists()).toBe(true);
      expect(wrapper.findComponent(TIconApp).exists()).toBe(false);
    });

    it('renders prefix, content and suffix together', () => {
      const wrapper = mount(Link, {
        props: { prefixIcon: () => <Icon />, suffixIcon: () => <TIconApp /> },
        slots: { default: () => '链接内容' },
      });
      expect(Array.from(wrapper.element.children).map((el) => el.className)).toEqual([
        't-link__prefix-icon',
        't-link__content',
        't-link__suffix-icon',
      ]);
    });

    it('inherits form disabled state for href and aria-disabled', async () => {
      const disabled = ref(true);
      const onClick = vi.fn();
      const wrapper = mount(Link, {
        props: { href: 'https://tdesign.tencent.com', onClick },
        slots: { default: () => '链接' },
        global: { provide: { formDisabled: { disabled } } },
      });
      // 表单禁用：移除 href 并标记 aria-disabled
      expect(wrapper.attributes('href')).toBeUndefined();
      expect(wrapper.attributes('aria-disabled')).toBe('true');

      // handleClick 仅判断自身 disabled，表单禁用仍会触发点击
      await wrapper.trigger('click');
      expect(onClick).toHaveBeenCalledTimes(1);

      disabled.value = false;
      await wrapper.vm.$nextTick();
      expect(wrapper.attributes('href')).toBe('https://tdesign.tencent.com');
      expect(wrapper.attributes('aria-disabled')).toBe('false');
    });

    // 表单禁用时点击仍触发（handleClick 只判断 props.disabled），与 href/aria 行为不一致。
    it.todo('form disabled state also blocks click');
  });
});

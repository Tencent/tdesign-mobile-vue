import { h, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { AppIcon as TIconApp, LoadingIcon } from 'tdesign-icons-vue-next';
import Button from '../button.vue';
import ButtonGroup from '../../button-group/button-group.vue';

const prefix = 't';
const name = `${prefix}-button`;
const SIZE_CLASSNAMES = {
  small: `${prefix}-size-s`,
  medium: `${prefix}-size-m`,
  large: `${prefix}-size-l`,
};
const TEXT = 'tdesign-mobile-vue';
const iconFunc = () => h(TIconApp);

describe('button', () => {
  describe('props', () => {
    it(': theme', async () => {
      const wrapper = mount(Button, {
        props: {
          theme: '',
          content: TEXT,
        },
      });
      // theme = ''
      const $button = wrapper.findComponent(Button);
      ['default', 'primary', 'danger'].map((item) => {
        expect($button.classes().includes(`${name}--${item}`)).toBeFalsy();
      });
      expect(wrapper.text()).toBe(TEXT);
      const theme = 'danger';
      await wrapper.setProps({
        theme,
      });
      // theme = 'danger'
      expect($button.classes()).toContain(`${name}--${theme}`);
    });

    it(': content', async () => {
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

    it(': shape', async () => {
      const wrapper = mount(Button, {
        props: {
          shape: '',
          content: TEXT,
        },
      });
      // shape = ''
      const $button = wrapper.findComponent(Button);
      ['rectangle', 'square', 'round', 'circle'].map((item) => {
        expect($button.classes().includes(`${name}--shape-${item}`)).toBeFalsy();
      });
      expect(wrapper.text()).toBe(TEXT);
      const shape = 'square';
      await wrapper.setProps({
        shape,
      });
      // shape = 'square'
      expect($button.classes()).toContain(`${name}--shape-${shape}`);
    });

    it(': size', async () => {
      const wrapper = mount(Button, {
        props: {
          size: '',
          content: TEXT,
        },
      });
      // size = ''
      const $button = wrapper.findComponent(Button);
      ['small', 'medium', 'large'].map((item) => {
        expect($button.classes().includes(`${SIZE_CLASSNAMES[item]}`)).toBeFalsy();
      });
      expect(wrapper.text()).toBe(TEXT);
      const size = 'small';
      await wrapper.setProps({
        size,
      });
      // size = 'small'
      expect($button.classes()).toContain(`${SIZE_CLASSNAMES[size]}`);
    });

    it(': variant', async () => {
      const wrapper = mount(Button, {
        props: {
          variant: '',
          content: TEXT,
        },
      });
      // variant = ''
      const $button = wrapper.findComponent(Button);
      ['base', 'outline', 'text'].map((item) => {
        expect($button.classes().includes(`${name}--${item}`)).toBeFalsy();
      });
      expect(wrapper.text()).toBe(TEXT);
      const variant = 'outline';
      await wrapper.setProps({
        variant,
      });
      // variant = 'outline'
      expect($button.classes()).toContain(`${name}--${variant}`);
    });

    it(': disabled', async () => {
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
      expect($button.classes()).toContain('t-is-disabled');
      await $button.trigger('click');
      expect(onClick).not.toBeCalled();

      // disabled = false, 可以触发 click
      await wrapper.setProps({
        disabled: false,
      });
      await $button.trigger('click');
      expect(onClick).toBeCalled();
    });

    it(': loading', async () => {
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
      expect($button.classes()).toContain('t-is-loading');
      expect($button.findComponent(LoadingIcon).exists()).toBeTruthy();
      await $button.trigger('click');
      expect(onClick).not.toBeCalled();
      // loading = false
      await wrapper.setProps({
        loading: false,
      });
      expect($button.findComponent(LoadingIcon).exists()).toBeFalsy();
      await $button.trigger('click');
      expect(onClick).toBeCalled();
    });

    it(': icon', async () => {
      const wrapper = mount(Button, {
        props: {
          loading: true,
          icon: iconFunc,
          content: TEXT,
        },
      });
      const $button = wrapper.findComponent(Button);
      expect($button.classes()).toContain('t-is-loading');
      expect($button.findComponent(LoadingIcon).exists()).toBeTruthy();
      expect($button.findComponent(TIconApp).exists()).toBeFalsy();
    });

    it(': ghost', async () => {
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

    it(': block', async () => {
      const block = true;
      const wrapper = mount(Button, {
        props: {
          block,
          content: TEXT,
        },
      });
      const $button = wrapper.findComponent(Button);

      // block = true
      expect($button.classes().includes(`${prefix}-is-block`)).toBeTruthy();
      // block = false
      await wrapper.setProps({
        block: false,
      });
      expect($button.classes().includes(`${prefix}-is-block`)).toBeFalsy();
    });
  });

  describe('button-group', () => {
    it('button group render', async () => {
      const items = [
        {
          content: TEXT,
        },
        {
          content: TEXT,
        },
      ];
      const wrapper = mount({
        setup() {
          return () => (
            <ButtonGroup>
              {{
                default: items.map((item, index) => {
                  return <Button content={item.content} />;
                }),
              }}
            </ButtonGroup>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
      const $buttonGroup = wrapper.findComponent(ButtonGroup);
      expect($buttonGroup.exists()).toBeTruthy();
      expect(wrapper.findAllComponents(Button).length).toEqual(items.length);
    });
  });
});

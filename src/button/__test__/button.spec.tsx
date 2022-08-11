import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { AppIcon as TIconApp } from 'tdesign-icons-vue-next';
import Button from '../button.vue';
import { TdButtonProps } from '../type';

const TEXT = 'tdesign-mobile-vue';
const iconFunc = () => h(TIconApp);
const themeList: TdButtonProps['theme'][] = ['default', 'primary', 'danger'];
const shapeList: TdButtonProps['shape'][] = ['rectangle', 'square', 'round', 'circle'];
const sizeList: TdButtonProps['size'][] = ['small', 'medium', 'large'];
const variantList: TdButtonProps['variant'][] = ['base', 'outline', 'text'];

describe('Button.vue', () => {
  it('create render', async () => {
    const wrapper = mount(() => <Button>{TEXT}</Button>);
    expect(wrapper.text()).toBe(TEXT);
  });

  it('theme render', async () => {
    themeList.forEach((t) => {
      const wrapper = mount(() => <Button theme={t}>{TEXT}</Button>);
      expect(wrapper.classes()).toContain(`t-button--${t}`);
    });
  });

  it('shape render', async () => {
    shapeList.forEach((s) => {
      const wrapper = mount(() => <Button shape={s}>{TEXT}</Button>);
      expect(wrapper.classes()).toContain(`t-button--shape-${s}`);
    });
  });

  it('size render', async () => {
    sizeList.forEach((s) => {
      const wrapper = mount(() => <Button size={s}>{TEXT}</Button>);
      expect(wrapper.classes()).toContain(`t-size-${s?.slice(0, 1)}`);
    });
  });

  it('variant render', async () => {
    variantList.forEach((v) => {
      const wrapper = mount(() => <Button variant={v}>{TEXT}</Button>);
      expect(wrapper.classes()).toContain(`t-button--${v}`);
    });
  });

  it('disabled render', async () => {
    const wrapper = mount(() => <Button disabled>{TEXT}</Button>);
    expect(wrapper.classes()).toContain('t-is-disabled');
  });

  it('loading render', async () => {
    const wrapper = mount(() => <Button loading>{TEXT}</Button>);
    expect(wrapper.classes()).toContain('t-is-loading');
  });

  it('ghost render', async () => {
    const wrapper = mount(() => <Button ghost>{TEXT}</Button>);
    expect(wrapper.classes()).toContain('t-button--ghost');
  });

  it('icon render', async () => {
    const wrapper = mount(() => <Button icon={iconFunc}>{TEXT}</Button>);
    expect(wrapper.findComponent(TIconApp)).toBeTruthy();
  });

  it('click emit', async () => {
    const wrapper = mount(() => <Button>{TEXT}</Button>);
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeDefined;
  });
});

import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { AppIcon as TIconApp, LoadingIcon } from 'tdesign-icons-vue-next';
import Button from '../button.vue';
import ButtonGroup from '../../button-group/button-group.vue';
import { vi } from 'vitest';

const TEXT = 'tdesign-mobile-vue';
const iconFunc = () => h(TIconApp);

describe('Button.vue', () => {
  it('create render', async () => {
    const wrapper = mount(() => <Button>{TEXT}</Button>);
    expect(wrapper.classes()).toContain('t-button');
    expect(wrapper.text()).toBe(TEXT);
  });

  it('content render', async () => {
    const wrapper = mount(() => <Button content={TEXT}></Button>);
    expect(wrapper.classes()).toContain('t-button');
    expect(wrapper.text()).toBe(TEXT);
  });

  it('theme render', async () => {
    const wrapper1 = mount(() => <Button theme="default">{TEXT}</Button>);
    expect(wrapper1.classes()).toContain(`t-button--default`);
    const wrapper2 = mount(() => <Button theme="primary">{TEXT}</Button>);
    expect(wrapper2.classes()).toContain(`t-button--primary`);
    const wrapper3 = mount(() => <Button theme="danger">{TEXT}</Button>);
    expect(wrapper3.classes()).toContain(`t-button--danger`);
  });

  it('shape render', async () => {
    const wrapper1 = mount(() => <Button shape="rectangle">{TEXT}</Button>);
    expect(wrapper1.classes()).toContain(`t-button--shape-rectangle`);
    const wrapper2 = mount(() => <Button shape="square">{TEXT}</Button>);
    expect(wrapper2.classes()).toContain(`t-button--shape-square`);
    const wrapper3 = mount(() => <Button shape="round">{TEXT}</Button>);
    expect(wrapper3.classes()).toContain(`t-button--shape-round`);
    const wrapper4 = mount(() => <Button shape="circle">{TEXT}</Button>);
    expect(wrapper4.classes()).toContain(`t-button--shape-circle`);
  });

  it('size render', async () => {
    const wrapper1 = mount(() => <Button size="small">{TEXT}</Button>);
    expect(wrapper1.classes()).toContain(`t-size-s`);
    const wrapper2 = mount(() => <Button size="medium">{TEXT}</Button>);
    expect(wrapper2.classes()).toContain(`t-size-m`);
    const wrapper3 = mount(() => <Button size="large">{TEXT}</Button>);
    expect(wrapper3.classes()).toContain(`t-size-l`);
  });

  it('variant render', async () => {
    const wrapper1 = mount(() => <Button variant="base">{TEXT}</Button>);
    expect(wrapper1.classes()).toContain(`t-button--base`);
    const wrapper2 = mount(() => <Button variant="outline">{TEXT}</Button>);
    expect(wrapper2.classes()).toContain(`t-button--outline`);
    const wrapper3 = mount(() => <Button variant="text">{TEXT}</Button>);
    expect(wrapper3.classes()).toContain(`t-button--text`);
  });

  it('disabled render', async () => {
    const wrapper = mount(() => <Button disabled>{TEXT}</Button>);
    expect(wrapper.classes()).toContain('t-is-disabled');
  });

  it('loading render', async () => {
    const wrapper = mount(() => <Button loading>{TEXT}</Button>);
    expect(wrapper.classes()).toContain('t-is-loading');
    expect(wrapper.findComponent(LoadingIcon).exists()).toBeTruthy();
  });

  it('loading icon render', async () => {
    const wrapper = mount(() => (
      <Button icon={iconFunc} loading>
        {TEXT}
      </Button>
    ));
    expect(wrapper.classes()).toContain('t-is-loading');
    expect(wrapper.findComponent(LoadingIcon).exists()).toBeTruthy();
    expect(wrapper.findComponent(TIconApp).exists()).toBeFalsy();
  });

  it('ghost render', async () => {
    const wrapper = mount(() => <Button ghost>{TEXT}</Button>);
    expect(wrapper.classes()).toContain('t-button--ghost');
  });

  it('icon render', async () => {
    const wrapper = mount(() => <Button icon={iconFunc}>{TEXT}</Button>);
    expect(wrapper.findComponent(TIconApp).exists()).toBeTruthy();
  });

  it('block render', async () => {
    const wrapper = mount(() => <Button block>{TEXT}</Button>);
    expect(wrapper.classes()).toContain('t-is-block');
  });

  it('click emit', async () => {
    const onClick = vi.fn();
    const wrapper = mount(() => <Button onClick={onClick}>{TEXT}</Button>);
    const button = wrapper.find('button');
    await button.trigger('click');
    expect(onClick).toBeCalled();
  });

  it('loading click', async () => {
    const onClick = vi.fn();
    const wrapper = mount(() => (
      <Button loading onClick={onClick}>
        {TEXT}
      </Button>
    ));
    const button = wrapper.find('button');
    await button.trigger('click');
    expect(onClick).not.toBeCalled();
  });

  it('disabled click', async () => {
    const onClick = vi.fn();
    const wrapper = mount(() => (
      <Button disabled onClick={onClick}>
        {TEXT}
      </Button>
    ));
    const button = wrapper.find('button');
    await button.trigger('click');
    expect(onClick).not.toBeCalled();
  });

  it('button group render', async () => {
    const wrapper = mount(() => (
      <ButtonGroup>
        <Button>{TEXT}</Button>
        <Button>{TEXT}</Button>
      </ButtonGroup>
    ));
    expect(wrapper.classes()).toContain('t-button-group');
    expect(wrapper.findAllComponents(Button).length).toBe(2);
  });
});

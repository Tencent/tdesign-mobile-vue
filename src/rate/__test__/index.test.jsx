import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Rate from '../rate.vue';
import { StarFilledIcon, StarIcon } from 'tdesign-icons-vue-next';

describe('Rate.vue', () => {
  it('create', async () => {
    const wrapper = mount(() => <Rate />);
    expect(wrapper.classes()).toContain('t-rate');
    const items = wrapper.findAll('.t-rate--item');
    expect(items.length).toBe(5);
    const icon = wrapper.findComponent(StarFilledIcon);
    expect(icon.exists()).toBeTruthy();
  });

  it('count render', async () => {
    const wrapper = mount(() => <Rate count={10} />);
    const items = wrapper.findAll('.t-rate--item');
    expect(items.length).toBe(10);
  });

  it('gap', async () => {
    const wrapper = mount(() => <Rate gap={10} />);
    const items = wrapper.findAll('.t-rate--item');
    for (let i = 0; i < items.length - 1; i++) {
      expect(getComputedStyle(items[i].element, null).marginRight).toBe('10px');
    }
    expect(getComputedStyle(items[items.length - 1].element, null).marginRight).toBe('0px');
  });

  it('variant render', async () => {
    const wrapper = mount(() => <Rate variant="outline" />);
    const icon = wrapper.findComponent(StarIcon);
    expect(icon.exists()).toBeTruthy();
  });

  it('change event', async () => {
    const value = ref(1);
    const wrapper = mount(() => <Rate v-model={value.value} />);
    const icons = wrapper.findAll('.t-rate--icon');
    await icons[1].trigger('click');
    await nextTick();
    expect(value.value).toBe(2);
  });

  it('allowHalf event', async () => {
    const value = ref(0);
    const wrapper = mount(() => <Rate v-model={value.value} allowHalf />);
    const leftIcons = wrapper.findAll('.t-rate--icon-left');
    const rightIcons = wrapper.findAll('.t-rate--icon-right');
    await leftIcons[0].trigger('click');
    await nextTick();
    expect(leftIcons[0].exists()).toBeTruthy();
    expect(value.value).toBe(0.5);
    await rightIcons[0].trigger('click');
    await nextTick();
    expect(rightIcons[0].exists()).toBeTruthy();
    expect(value.value).toBe(1);
  });

  it('clearable', async () => {
    const value = ref(1);
    const wrapper = mount(() => <Rate v-model={value.value} clearable />);
    const icons = wrapper.findAll('.t-rate--icon');
    await icons[1].trigger('click');
    await nextTick();
    expect(value.value).toBe(2);
    await icons[1].trigger('click');
    await nextTick();
    expect(value.value).toBe(0);
  });

  it('disabled render', async () => {
    const value = ref(1);
    const wrapper = mount(() => <Rate v-model={value.value} disabled />);
    const icons = wrapper.findAll('.t-rate--icon');
    await icons[1].trigger('click');
    await nextTick();
    expect(value.value).toBe(1);
  });
});

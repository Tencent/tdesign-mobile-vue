import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { ChevronRightIcon, AppIcon } from 'tdesign-icons-vue-next';
import Cell from '../cell';
import Avatar from '../../avatar/avatar';

const appIcon = () => h(AppIcon);
const chevronRightIcon = () => h(ChevronRightIcon);
const alignList = ['bottom', 'middle', 'top'];
const avatarUrl = 'https://tdesign.gtimg.com/mobile/demos/avatar_1.png';

describe('Cell', () => {
  describe('props', () => {
    it('title[string]', async () => {
      const wrapper = mount(() => <Cell title="单行标题"></Cell>);
      expect(wrapper.classes()).toContain('t-cell');
      const title = wrapper.find('.t-cell__title');
      expect(title.exists()).toBeTruthy();
      expect(title.text()).toBe('单行标题');
    });

    it('required[boolean]', async () => {
      const wrapper = mount(() => <Cell title="单行标题" required></Cell>);
      const required = wrapper.find('.t-cell__title > .t-cell__title-text > .t-cell--required');
      expect(required.exists()).toBeTruthy();
      expect(required.text()).toContain('*');
    });

    it('arrow[boolean]', async () => {
      const wrapper = mount(() => <Cell title="单行标题" arrow></Cell>);
      const icon = wrapper.find('.t-cell__right-icon');
      expect(icon.exists()).toBeTruthy();
      expect(wrapper.findComponent(ChevronRightIcon).exists()).toBeTruthy();
    });

    it('note[string]', async () => {
      const wrapper = mount(() => <Cell title="单行标题" note="辅助信息"></Cell>);
      const note = wrapper.find('.t-cell__note');
      expect(note.exists()).toBeTruthy();
      expect(note.text()).toBe('辅助信息');
    });

    it('leftIcon[function]', async () => {
      const wrapper = mount(() => <Cell title="单行标题" leftIcon={appIcon}></Cell>);
      const icon = wrapper.find('.t-cell__left-icon');
      expect(icon.exists()).toBeTruthy();
      expect(wrapper.findComponent(AppIcon).exists()).toBeTruthy();
    });

    it('bordered[boolean]', async () => {
      const wrapper1 = mount(() => <Cell title="单行标题" bordered={false}></Cell>);
      expect(wrapper1.classes()).toContain('t-cell--borderless');
      const wrapper2 = mount(() => <Cell title="单行标题"></Cell>);
      expect(wrapper2.classes('t-cell--bordered')).toBeFalsy();
    });

    it('align[string]', async () => {
      alignList.forEach((a) => {
        const wrapper = mount(() => <Cell title="单行标题" align={a} arrow></Cell>);
        const rightAlign = wrapper.find(`.t-cell__right--${a}`);
        expect(rightAlign.exists()).toBeTruthy();
      });
    });

    it('description[string]', async () => {
      const wrapper = mount(() => <Cell title="单行标题" description="描述信息"></Cell>);
      const desc = wrapper.find('.t-cell__description');
      expect(desc.exists()).toBeTruthy();
      expect(desc.text()).toBe('描述信息');
    });

    it('image[string]', async () => {
      const wrapper = mount(() => <Cell title="单行标题" image={avatarUrl}></Cell>);
      const img = wrapper.find('.t-cell__left-image');
      expect(img.exists()).toBeTruthy();
      expect(img.attributes('src')).toBe(avatarUrl);
    });

    // hover 点击态样式依赖交互反馈
    it.todo('hover[boolean]');
  });

  describe('events', () => {
    it('click', async () => {
      const wrapper = mount(() => <Cell title="单行标题"></Cell>);
      await wrapper.trigger('click');
      expect(wrapper.emitted('click')).toBeDefined();
    });
  });

  describe('slots', () => {
    it('leftIcon[slot] & rightIcon[slot]', async () => {
      const slots = {
        leftIcon: () => <Avatar shape="circle" image={avatarUrl}></Avatar>,
        rightIcon: () => <chevronRightIcon />,
      };
      const wrapper = mount(() => <Cell title="单行标题" v-slots={slots}></Cell>);
      const leftIcon = wrapper.find('.t-cell__left-icon');
      expect(leftIcon.exists()).toBeTruthy();
      expect(leftIcon.findComponent(Avatar).exists()).toBeTruthy();
      const rightIcon = wrapper.find('.t-cell__right-icon');
      expect(rightIcon.exists()).toBeTruthy();
      expect(rightIcon.findComponent(chevronRightIcon).exists()).toBeTruthy();
    });
  });
});

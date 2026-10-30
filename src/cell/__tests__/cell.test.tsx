import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { ChevronRightIcon, AppIcon } from 'tdesign-icons-vue-next';
import Cell from '../cell';
import type { TdCellProps } from '../type';
import Avatar from '../../avatar/avatar';
import { trigger } from '@/image-viewer/__tests__/touch';

const appIcon = () => h(AppIcon);
const chevronRightIcon = () => h(ChevronRightIcon);
const alignList: TdCellProps['align'][] = ['bottom', 'middle', 'top'];
const avatarUrl = 'https://tdesign.gtimg.com/mobile/demos/avatar_1.png';

const sleep = (timeout: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

describe('Cell', () => {
  describe('props', () => {
    it('align[top/middle/bottom]', async () => {
      alignList.forEach((a) => {
        const wrapper = mount(() => <Cell title="单行标题" align={a} arrow></Cell>);
        const rightAlign = wrapper.find(`.t-cell__right--${a}`);
        expect(rightAlign.exists()).toBeTruthy();
      });
    });

    it('arrow[boolean]', async () => {
      const wrapper = mount(() => <Cell title="单行标题" arrow></Cell>);
      const icon = wrapper.find('.t-cell__right-icon');
      expect(icon.exists()).toBeTruthy();
      expect(wrapper.findComponent(ChevronRightIcon).exists()).toBeTruthy();
    });

    it('bordered[boolean]', async () => {
      const wrapper1 = mount(() => <Cell title="单行标题" bordered={false}></Cell>);
      expect(wrapper1.classes()).toContain('t-cell--borderless');
      const wrapper2 = mount(() => <Cell title="单行标题"></Cell>);
      expect(wrapper2.classes('t-cell--bordered')).toBeFalsy();
    });

    it('description[string]', async () => {
      const wrapper = mount(() => <Cell title="单行标题" description="描述信息"></Cell>);
      const desc = wrapper.find('.t-cell__description');
      expect(desc.exists()).toBeTruthy();
      expect(desc.text()).toBe('描述信息');
    });

    it('hover[boolean]', async () => {
      // hover 为 true 时，触摸按下短暂延迟后出现点击态类名，松开一段时间后移除
      const wrapper = mount(() => <Cell title="单行标题" hover></Cell>);
      const $cell = wrapper.find('.t-cell');
      await trigger($cell, 'touchstart');
      await sleep(60);
      expect($cell.classes()).toContain('t-cell--hover');

      await trigger($cell, 'touchend');
      await sleep(80);
      expect($cell.classes()).not.toContain('t-cell--hover');

      // 默认关闭 hover，按下不出现点击态类名
      const wrapper2 = mount(() => <Cell title="单行标题"></Cell>);
      const $cell2 = wrapper2.find('.t-cell');
      await trigger($cell2, 'touchstart');
      await sleep(60);
      expect($cell2.classes()).not.toContain('t-cell--hover');
    });

    it('image[string]', async () => {
      const wrapper = mount(() => <Cell title="单行标题" image={avatarUrl}></Cell>);
      const img = wrapper.find('.t-cell__left-image');
      expect(img.exists()).toBeTruthy();
      expect(img.attributes('src')).toBe(avatarUrl);
    });

    it('leftIcon[function]', async () => {
      const wrapper = mount(() => <Cell title="单行标题" leftIcon={appIcon}></Cell>);
      const icon = wrapper.find('.t-cell__left-icon');
      expect(icon.exists()).toBeTruthy();
      expect(wrapper.findComponent(AppIcon).exists()).toBeTruthy();
    });

    it('note[string]', async () => {
      const wrapper = mount(() => <Cell title="单行标题" note="辅助信息"></Cell>);
      const note = wrapper.find('.t-cell__note');
      expect(note.exists()).toBeTruthy();
      expect(note.text()).toBe('辅助信息');
    });

    it('required[boolean]', async () => {
      const wrapper = mount(() => <Cell title="单行标题" required></Cell>);
      const required = wrapper.find('.t-cell__title > .t-cell__title-text > .t-cell--required');
      expect(required.exists()).toBeTruthy();
      expect(required.text()).toContain('*');
    });

    it('title[string]', async () => {
      const wrapper = mount(() => <Cell title="单行标题"></Cell>);
      expect(wrapper.classes()).toContain('t-cell');
      const title = wrapper.find('.t-cell__title');
      expect(title.exists()).toBeTruthy();
      expect(title.text()).toBe('单行标题');
    });
  });

  describe('events', () => {
    it('click', async () => {
      const wrapper = mount(() => <Cell title="单行标题"></Cell>);
      await wrapper.trigger('click');
      expect(wrapper.emitted('click')).toBeDefined();
    });
  });

  describe('slots', () => {
    it('leftIcon & rightIcon', async () => {
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

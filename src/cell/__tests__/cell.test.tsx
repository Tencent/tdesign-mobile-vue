import { h, nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
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
      expect(wrapper2.classes()).not.toContain('t-cell--borderless');
    });

    it('description[string]', async () => {
      const wrapper = mount(() => <Cell title="单行标题" description="描述信息"></Cell>);
      const desc = wrapper.find('.t-cell__description');
      expect(desc.exists()).toBeTruthy();
      expect(desc.text()).toBe('描述信息');
    });

    it('description[function]', () => {
      const wrapper = mount(Cell, {
        props: { title: '标题', description: () => <span class="custom-description">描述节点</span> },
      });
      expect(wrapper.find('.t-cell__description .custom-description').text()).toBe('描述节点');
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

    it('image[function]', () => {
      const wrapper = mount(Cell, { props: { image: () => <span class="custom-image">主图节点</span> } });
      expect(wrapper.find('.t-cell__left .custom-image').text()).toBe('主图节点');
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

    it('note[function]', () => {
      const wrapper = mount(Cell, { props: { note: () => <span>辅助节点</span> } });
      expect(wrapper.find('.t-cell__note').text()).toBe('辅助节点');
    });

    it('required[boolean]', async () => {
      const wrapper = mount(() => <Cell title="单行标题" required></Cell>);
      const required = wrapper.find('.t-cell__title > .t-cell__title-text > .t-cell--required');
      expect(required.exists()).toBeTruthy();
      expect(required.text()).toContain('*');
    });

    it('rightIcon[function]', () => {
      const wrapper = mount(Cell, { props: { rightIcon: appIcon } });
      expect(wrapper.find('.t-cell__right-icon').findComponent(AppIcon).exists()).toBe(true);
    });

    it('title[string]', async () => {
      const wrapper = mount(() => <Cell title="单行标题"></Cell>);
      expect(wrapper.classes()).toContain('t-cell');
      const title = wrapper.find('.t-cell__title');
      expect(title.exists()).toBeTruthy();
      expect(title.text()).toBe('单行标题');
    });

    it('title[function]', () => {
      const wrapper = mount(Cell, { props: { title: () => <span class="custom-title">标题节点</span> } });
      expect(wrapper.find('.t-cell__title-text .custom-title').text()).toBe('标题节点');
    });
  });

  describe('events', () => {
    it('click', async () => {
      const onClick = vi.fn();
      const wrapper = mount(Cell, { props: { title: '单行标题', onClick } });
      await wrapper.trigger('click');
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith({ e: expect.any(MouseEvent) });
    });
  });

  describe('slots', () => {
    it('leftIcon', () => {
      const wrapper = mount(Cell, { slots: { leftIcon: () => <Avatar image={avatarUrl} /> } });
      expect(wrapper.find('.t-cell__left-icon').findComponent(Avatar).exists()).toBe(true);
    });

    it('rightIcon', () => {
      const wrapper = mount(Cell, { slots: { rightIcon: chevronRightIcon } });
      expect(wrapper.find('.t-cell__right-icon').findComponent(ChevronRightIcon).exists()).toBe(true);
    });

    it('title', () => {
      const wrapper = mount(Cell, { slots: { title: () => <span>插槽标题</span> } });
      expect(wrapper.find('.t-cell__title-text').text()).toBe('插槽标题');
    });

    it('description', () => {
      const wrapper = mount(Cell, {
        props: { title: '标题' },
        slots: { description: () => <span>插槽描述</span> },
      });
      expect(wrapper.find('.t-cell__description').text()).toBe('插槽描述');
    });

    it('image', () => {
      const wrapper = mount(Cell, { slots: { image: () => <img class="slot-image" src={avatarUrl} /> } });
      expect(wrapper.find('.t-cell__left .slot-image').attributes('src')).toBe(avatarUrl);
    });

    it('note', () => {
      const wrapper = mount(Cell, { slots: { note: () => <span>插槽辅助内容</span> } });
      expect(wrapper.find('.t-cell__note').text()).toBe('插槽辅助内容');
    });

    it('default', () => {
      const wrapper = mount(Cell, { slots: { default: () => <span>默认插槽内容</span> } });
      expect(wrapper.find('.t-cell__note').text()).toBe('默认插槽内容');
    });
  });

  describe('scenarios', () => {
    it('form disabled state prevents clicks and restores them when enabled', async () => {
      const disabled = ref(true);
      const onClick = vi.fn();
      const wrapper = mount(Cell, {
        props: { title: '标题', onClick },
        global: { provide: { formDisabled: { disabled } } },
      });

      await wrapper.trigger('click');
      expect(onClick).not.toHaveBeenCalled();

      disabled.value = false;
      await nextTick();
      await wrapper.trigger('click');
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith({ e: expect.any(MouseEvent) });
    });

    it('default slot takes priority over note prop', () => {
      const wrapper = mount(Cell, {
        props: { note: '属性辅助内容' },
        slots: { default: () => <span>默认插槽内容</span> },
      });
      expect(wrapper.find('.t-cell__note').text()).toBe('默认插槽内容');
    });

    it('note prop takes priority over note slot', () => {
      const wrapper = mount(Cell, {
        props: { note: '属性辅助内容' },
        slots: { note: () => <span>插槽辅助内容</span> },
      });
      expect(wrapper.find('.t-cell__note').text()).toBe('属性辅助内容');
    });

    it('title prop takes priority over title slot', () => {
      const wrapper = mount(Cell, {
        props: { title: '属性标题' },
        slots: { title: () => <span>插槽标题</span> },
      });
      expect(wrapper.find('.t-cell__title-text').text()).toBe('属性标题');
    });

    it('description prop takes priority over description slot', () => {
      const wrapper = mount(Cell, {
        props: { title: '标题', description: '属性描述' },
        slots: { description: () => <span>插槽描述</span> },
      });
      expect(wrapper.find('.t-cell__description').text()).toBe('属性描述');
    });

    it('description and required marker need a title', () => {
      const wrapper = mount(Cell, { props: { description: '描述', required: true } });
      expect(wrapper.find('.t-cell__description').exists()).toBe(false);
      expect(wrapper.find('.t-cell--required').exists()).toBe(false);
    });

    it('image prop takes priority over image slot', () => {
      const wrapper = mount(Cell, {
        props: { image: avatarUrl },
        slots: { image: () => <span class="slot-image">插槽主图</span> },
      });
      expect(wrapper.find('.t-cell__left-image').attributes('src')).toBe(avatarUrl);
      expect(wrapper.find('.slot-image').exists()).toBe(false);
    });

    it('leftIcon prop takes priority over leftIcon slot', () => {
      const wrapper = mount(Cell, {
        props: { leftIcon: appIcon },
        slots: { leftIcon: () => <span class="slot-icon">插槽图标</span> },
      });
      expect(wrapper.find('.t-cell__left-icon').findComponent(AppIcon).exists()).toBe(true);
      expect(wrapper.find('.slot-icon').exists()).toBe(false);
    });

    it('rightIcon prop takes priority over rightIcon slot', () => {
      const wrapper = mount(Cell, {
        props: { rightIcon: appIcon },
        slots: { rightIcon: () => <span class="slot-icon">插槽图标</span> },
      });
      expect(wrapper.find('.t-cell__right-icon').findComponent(AppIcon).exists()).toBe(true);
      expect(wrapper.find('.slot-icon').exists()).toBe(false);
    });

    it('arrow overrides rightIcon', async () => {
      const wrapper = mount(Cell, { props: { arrow: true, rightIcon: appIcon } });
      expect(wrapper.findComponent(ChevronRightIcon).exists()).toBe(true);
      expect(wrapper.findComponent(AppIcon).exists()).toBe(false);
      await wrapper.setProps({ arrow: false });
      expect(wrapper.findComponent(ChevronRightIcon).exists()).toBe(false);
      expect(wrapper.findComponent(AppIcon).exists()).toBe(true);
    });
  });
});

import { h, ref, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { AppIcon as TIconApp } from 'tdesign-icons-vue-next';
import TCheckTag from '../check-tag';
import type { TdCheckTagProps } from '../type';

const TEXT = 'tdesign-mobile-vue';
const iconFunc = () => h(TIconApp);

const variantList: TdCheckTagProps['variant'][] = ['dark', 'light', 'light-outline', 'outline'];
const sizeList: TdCheckTagProps['size'][] = ['large', 'medium', 'small'];
const shapeList: TdCheckTagProps['shape'][] = ['mark', 'round', 'square'];

describe('CheckTag', () => {
  describe('props', () => {
    it('checked[boolean]', async () => {
      const wrapper = mount(() => <TCheckTag modelValue={true}>{TEXT}</TCheckTag>);
      expect(wrapper.classes()).toContain('t-tag--checked');
    });

    it('modelValue[boolean]', async () => {
      const checked = ref(false);
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <TCheckTag v-model={checked.value} onChange={onChange}>
              {TEXT}
            </TCheckTag>
          );
        },
      });
      expect(wrapper.classes()).not.toContain('t-tag--checked');

      // v-model 双向绑定：点击后选中态与外部值同步取反
      await wrapper.trigger('click');
      expect(checked.value).toBe(true);
      expect(wrapper.classes()).toContain('t-tag--checked');
      expect(onChange).toHaveBeenLastCalledWith(true);

      // 外部受控更新
      checked.value = false;
      await nextTick();
      expect(wrapper.classes()).not.toContain('t-tag--checked');
    });

    it('closable[boolean]', () => {
      const wrapper = mount(() => <TCheckTag closable>{TEXT}</TCheckTag>);
      // 可关闭标签渲染关闭图标与对应类名
      expect(wrapper.classes()).toContain('t-tag--closable');
      expect(wrapper.find('.t-tag__icon-close').exists()).toBe(true);

      // 默认不渲染关闭图标
      const wrapper2 = mount(() => <TCheckTag>{TEXT}</TCheckTag>);
      expect(wrapper2.classes()).not.toContain('t-tag--closable');
      expect(wrapper2.find('.t-tag__icon-close').exists()).toBe(false);
    });

    it('content[array]', async () => {
      const content = ['已选中态', '未选中态'];
      const wrapper = mount(() => <TCheckTag content={content}>{TEXT}</TCheckTag>);
      expect(wrapper.text()).toContain('未选中态');
      await wrapper.trigger('click');
      expect(wrapper.text()).toContain('已选中态');
      expect(wrapper.classes()).toContain('t-tag--checked');
    });

    it('content[string]', async () => {
      const wrapper = mount(() => <TCheckTag content="自定义内容" />);
      expect(wrapper.text()).toContain('自定义内容');
    });

    it('disabled[boolean]', async () => {
      const wrapper = mount(() => <TCheckTag disabled>{TEXT}</TCheckTag>);
      expect(wrapper.classes()).toContain('t-tag--disabled');
    });

    it('icon[function]', async () => {
      const wrapper = mount(() => <TCheckTag icon={iconFunc}>{TEXT}</TCheckTag>);
      expect(wrapper.findComponent(TIconApp).exists()).toBeTruthy();
    });

    it('shape[square/round/mark]', async () => {
      shapeList.forEach((s) => {
        const wrapper = mount(() => <TCheckTag shape={s}>{TEXT}</TCheckTag>);
        expect(wrapper.classes()).toContain(`t-tag--${s}`);
      });
    });

    it('size[small/medium/large/extra-large]', async () => {
      sizeList.forEach((s) => {
        const wrapper = mount(() => <TCheckTag size={s}>{TEXT}</TCheckTag>);
        expect(wrapper.classes()).toContain(`t-tag--${s}`);
      });
    });

    it('variant[dark/light/outline/light-outline]', async () => {
      variantList.forEach((v) => {
        const wrapper = mount(() => <TCheckTag variant={v}>{TEXT}</TCheckTag>);
        expect(wrapper.classes()).toContain(`t-tag--${v}`);
      });
    });
  });

  describe('events', () => {
    it('click', async () => {
      const wrapper = mount(() => <TCheckTag>{TEXT}</TCheckTag>);
      await wrapper.trigger('click');
      expect(wrapper.emitted('click')).toBeTruthy();
    });

    it('change', async () => {
      const wrapper = mount({
        data() {
          return {
            checked: false,
          };
        },
        render() {
          return (
            <TCheckTag onChange={() => (this.checked = !this.checked)} checked={this.checked}>
              {TEXT}
            </TCheckTag>
          );
        },
      });
      await wrapper.trigger('click');
      expect(wrapper.vm.checked).toBe(true);
      await wrapper.trigger('click');
      expect(wrapper.vm.checked).toBe(false);
    });

    it('close', async () => {
      const onClose = vi.fn();
      const wrapper = mount(() => (
        <TCheckTag closable onClose={onClose}>
          {TEXT}
        </TCheckTag>
      ));
      const com = wrapper.findComponent(TCheckTag);
      expect(wrapper.classes()).toContain('t-tag--closable');
      const closeBtn = com.find('.t-tag__icon-close');
      expect(closeBtn.exists()).toBeTruthy();

      await closeBtn.trigger('click');
      expect(onClose).toBeCalledWith({ e: expect.any(MouseEvent) });
    });
  });

  describe('scenarios', () => {
    it('renders default checkable root class', async () => {
      const wrapper = mount(() => <TCheckTag>{TEXT}</TCheckTag>);
      expect(wrapper.classes()).toContain('t-tag');
      expect(wrapper.classes()).toContain('t-tag--checkable');
    });
  });
});

import { defineComponent, h, ref, nextTick } from 'vue';
import { enableAutoUnmount, mount } from '@vue/test-utils';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { AppIcon as TIconApp } from 'tdesign-icons-vue-next';
import TCheckTag from '../check-tag';
import type { TdCheckTagProps } from '../type';

const TEXT = 'tdesign-mobile-vue';
const iconFunc = () => h(TIconApp);

const variantList: TdCheckTagProps['variant'][] = ['dark', 'light', 'light-outline', 'outline'];
const sizeList: TdCheckTagProps['size'][] = ['large', 'medium', 'small'];
const shapeList: TdCheckTagProps['shape'][] = ['mark', 'round', 'square'];

enableAutoUnmount(afterEach);

describe('CheckTag', () => {
  describe('props', () => {
    it('checked[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(TCheckTag, { props: { checked: true, onChange } });
      expect(wrapper.classes()).toContain('t-tag--checked');
      await wrapper.setProps({ checked: false });
      expect(wrapper.classes()).not.toContain('t-tag--checked');
      expect(onChange).not.toHaveBeenCalled();
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

    it('defaultChecked[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(TCheckTag, { props: { defaultChecked: true, onChange } });
      expect(wrapper.classes()).toContain('t-tag--checked');
      await wrapper.trigger('click');
      expect(wrapper.classes()).not.toContain('t-tag--checked');
      expect(onChange).toHaveBeenCalledExactlyOnceWith(false);
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
      await wrapper.trigger('click');
      expect(wrapper.text()).toContain('未选中态');
      expect(wrapper.classes()).not.toContain('t-tag--checked');
    });

    it('content[string]', async () => {
      const wrapper = mount(() => <TCheckTag content="自定义内容" />);
      expect(wrapper.text()).toContain('自定义内容');
    });

    it('content[number]', () => {
      const wrapper = mount(TCheckTag, { props: { content: 42 } });
      expect(wrapper.get('.t-tag__text').text()).toBe('42');
    });

    it('content[function]', () => {
      const wrapper = mount(TCheckTag, { props: { content: () => <span>函数内容</span> } });
      expect(wrapper.get('.t-tag__text').text()).toBe('函数内容');
    });

    it('content[slot]', () => {
      const wrapper = mount(TCheckTag, { slots: { content: () => <span>内容插槽</span> } });
      expect(wrapper.get('.t-tag__text').text()).toBe('内容插槽');
    });

    it('default[string]', () => {
      const wrapper = mount(TCheckTag, { props: { default: '默认属性内容' } });
      expect(wrapper.get('.t-tag__text').text()).toBe('默认属性内容');
    });

    it('default[function]', () => {
      const wrapper = mount(TCheckTag, { props: { default: () => <span>默认函数内容</span> } });
      expect(wrapper.get('.t-tag__text').text()).toBe('默认函数内容');
    });

    it('default[slot]', () => {
      const wrapper = mount(TCheckTag, { slots: { default: () => <span>默认插槽内容</span> } });
      expect(wrapper.get('.t-tag__text').text()).toBe('默认插槽内容');
    });

    it('disabled[boolean]', async () => {
      const onClick = vi.fn();
      const onChange = vi.fn();
      const wrapper = mount(TCheckTag, { props: { disabled: true, defaultChecked: true, onClick, onChange } });
      expect(wrapper.classes()).toContain('t-tag--disabled');
      expect(wrapper.classes()).not.toContain('t-tag--checked');
      expect(wrapper.attributes('aria-disabled')).toBe('true');
      await wrapper.trigger('click');
      expect(wrapper.classes()).not.toContain('t-tag--checked');
      expect(onClick).not.toHaveBeenCalled();
      expect(onChange).not.toHaveBeenCalled();
      expect(wrapper.emitted('update:checked')).toBeUndefined();
      expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    });

    it('icon[function]', async () => {
      const wrapper = mount(() => <TCheckTag icon={iconFunc}>{TEXT}</TCheckTag>);
      expect(wrapper.findComponent(TIconApp).exists()).toBeTruthy();
    });

    it('icon[slot]', () => {
      const wrapper = mount(TCheckTag, { slots: { icon: iconFunc } });
      expect(wrapper.findComponent(TIconApp).exists()).toBe(true);
    });

    it.each(shapeList)('shape[%s]', (shape) => {
      const wrapper = mount(() => <TCheckTag shape={shape}>{TEXT}</TCheckTag>);
      expect(wrapper.classes()).toContain(`t-tag--${shape}`);
    });

    it.each(sizeList)('size[%s]', (size) => {
      const wrapper = mount(() => <TCheckTag size={size}>{TEXT}</TCheckTag>);
      expect(wrapper.classes()).toContain(`t-tag--${size}`);
    });

    it.each(variantList)('variant[%s]', (variant) => {
      const wrapper = mount(() => <TCheckTag variant={variant}>{TEXT}</TCheckTag>);
      expect(wrapper.classes()).toContain(`t-tag--${variant}`);
    });
  });

  describe('events', () => {
    it('click', async () => {
      const wrapper = mount(() => <TCheckTag>{TEXT}</TCheckTag>);
      await wrapper.trigger('click');
      expect(wrapper.emitted('click')).toBeTruthy();
      const onClick = vi.fn();
      const event = new MouseEvent('click', { bubbles: true });
      const callbackWrapper = mount(TCheckTag, { props: { onClick } });
      callbackWrapper.element.dispatchEvent(event);
      expect(onClick).toHaveBeenCalledExactlyOnceWith({ e: event });
    });

    it('change', async () => {
      // defineComponent 仅为补充 data 的 this 类型标注，运行时返回原 options 对象
      const wrapper = mount(
        defineComponent({
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
        }),
      );
      await wrapper.trigger('click');
      expect(wrapper.vm.checked).toBe(true);
      await wrapper.trigger('click');
      expect(wrapper.vm.checked).toBe(false);
    });

    it('close', async () => {
      const onClose = vi.fn();
      const onClick = vi.fn();
      const wrapper = mount(() => (
        <TCheckTag closable onClose={onClose} onClick={onClick}>
          {TEXT}
        </TCheckTag>
      ));
      const com = wrapper.findComponent(TCheckTag);
      expect(wrapper.classes()).toContain('t-tag--closable');
      const closeBtn = com.find('.t-tag__icon-close');
      expect(closeBtn.exists()).toBeTruthy();

      await closeBtn.trigger('click');
      expect(onClose).toHaveBeenCalledExactlyOnceWith({ e: expect.any(MouseEvent) });
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('scenarios', () => {
    it('renders default checkable root class', async () => {
      const wrapper = mount(() => <TCheckTag>{TEXT}</TCheckTag>);
      expect(wrapper.classes()).toContain('t-tag');
      expect(wrapper.classes()).toContain('t-tag--checkable');
      expect(wrapper.attributes('aria-disabled')).toBe('false');
      expect(wrapper.attributes('role')).toBe('button');
    });

    it('keeps the selected state controlled until the parent updates it', async () => {
      const wrapper = mount(TCheckTag, { props: { checked: false } });
      await wrapper.trigger('click');
      expect(wrapper.emitted('update:checked')).toEqual([[true]]);
      expect(wrapper.classes()).not.toContain('t-tag--checked');

      await wrapper.setProps({ checked: true });
      expect(wrapper.classes()).toContain('t-tag--checked');
      await wrapper.trigger('click');
      expect(wrapper.emitted('update:checked')).toEqual([[true], [false]]);
      expect(wrapper.classes()).toContain('t-tag--checked');
    });

    it('toggles the change callback and selected style in uncontrolled mode', async () => {
      const onChange = vi.fn();
      const wrapper = mount(TCheckTag, { props: { defaultChecked: false, onChange } });
      await wrapper.trigger('click');
      expect(onChange).toHaveBeenCalledExactlyOnceWith(true);
      expect(wrapper.classes()).toContain('t-tag--checked');
      await wrapper.trigger('click');
      expect(onChange).toHaveBeenLastCalledWith(false);
      expect(wrapper.classes()).not.toContain('t-tag--checked');
    });
  });
});

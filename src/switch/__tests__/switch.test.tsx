import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { CheckIcon, CloseIcon } from 'tdesign-icons-vue-next';
import Switch from '../switch';
import Form from '../../form';
import type { SwitchValue, TdSwitchProps } from '../type';

// 运行时支持 VNode 数组作为双态图标，类型声明为 TNode[]，按仓库惯例统一断言
const iconNodes = (): TdSwitchProps['icon'] =>
  [<CheckIcon key="open" />, <CloseIcon key="close" />] as unknown as TdSwitchProps['icon'];

describe('Switch', () => {
  describe('props', () => {
    it('customValue[array]', async () => {
      const onChange = vi.fn();
      const value = ref(1);
      const wrapper = mount(() => <Switch v-model={value.value} customValue={[1, 0]} onChange={onChange} />);
      const $switch = wrapper.find('.t-switch');
      // 值等于打开值时渲染选中态
      expect($switch.classes()).toContain('t-switch--checked');

      await $switch.trigger('click');
      // 点击后切换为关闭值 0
      expect(value.value).toBe(0);
      expect(onChange).toHaveBeenCalledWith(0);
      expect($switch.classes()).not.toContain('t-switch--checked');
    });

    it('disabled[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Switch, {
        props: {
          disabled: true,
          onChange,
        },
      });
      // 禁用态：根节点与圆点带禁用修饰类
      expect(wrapper.classes()).toContain('t-switch--disabled');
      expect(wrapper.find('.t-switch__dot').classes()).toContain('t-switch__dot--disabled');

      // 禁用时点击不切换也不触发 change
      await wrapper.trigger('click');
      expect(onChange).not.toHaveBeenCalled();
      expect(wrapper.classes()).not.toContain('t-switch--checked');

      await wrapper.setProps({ disabled: false });
      expect(wrapper.classes()).not.toContain('t-switch--disabled');

      await wrapper.trigger('click');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(wrapper.classes()).toContain('t-switch--checked');
    });

    it('icon[array]', async () => {
      const wrapper = mount(Switch, {
        props: {
          value: true,
          icon: iconNodes(),
        },
      });
      // 选中态渲染打开图标
      expect(wrapper.findComponent(CheckIcon).exists()).toBe(true);
      expect(wrapper.findComponent(CloseIcon).exists()).toBe(false);
      // 配置图标时圆点不带 plain 修饰类
      expect(wrapper.find('.t-switch__dot').classes()).not.toContain('t-switch__dot--plain');

      await wrapper.setProps({ value: false });
      // 关闭态渲染关闭图标
      expect(wrapper.findComponent(CheckIcon).exists()).toBe(false);
      expect(wrapper.findComponent(CloseIcon).exists()).toBe(true);
    });

    it('label[array]', async () => {
      const wrapper = mount(Switch, {
        props: {
          defaultValue: true,
          label: ['开', '关'],
        },
      });
      const $label = wrapper.find('.t-switch__label');
      // 选中时展示开启文案
      expect($label.text()).toBe('开');
      expect($label.classes()).toContain('t-switch__label--checked');
      // 配置双态文案时圆点不带 plain 修饰类
      expect(wrapper.find('.t-switch__dot').classes()).not.toContain('t-switch__dot--plain');

      await wrapper.trigger('click');
      expect($label.text()).toBe('关');
      expect($label.classes()).not.toContain('t-switch__label--checked');
    });

    it('label[array<TNode>]', async () => {
      const label = [() => <span id="switch-open">open</span>, () => <span id="switch-close">close</span>];
      const wrapper = mount(Switch, {
        props: {
          defaultValue: true,
          label,
        },
      });
      // 选中时渲染数组第一项 TNode
      expect(wrapper.find('.t-switch__label #switch-open').exists()).toBe(true);
      expect(wrapper.find('.t-switch__label #switch-close').exists()).toBe(false);

      await wrapper.trigger('click');
      // 关闭时渲染数组第二项 TNode
      expect(wrapper.find('.t-switch__label #switch-open').exists()).toBe(false);
      expect(wrapper.find('.t-switch__label #switch-close').exists()).toBe(true);
    });

    it('label[function]', async () => {
      const label = (_h: unknown, { value }: { value: SwitchValue }) =>
        value ? <span id="switch-open">open</span> : <span id="switch-close">close</span>;
      const wrapper = mount(Switch, {
        props: {
          defaultValue: true,
          label,
        },
      });
      // 函数入参收到当前开关值并渲染对应内容
      expect(wrapper.find('.t-switch__label #switch-open').exists()).toBe(true);

      await wrapper.trigger('click');
      expect(wrapper.find('.t-switch__label #switch-close').exists()).toBe(true);
    });

    it('label[slot]', async () => {
      // 静态插槽内容渲染在圆点内
      const wrapper = mount(Switch, {
        props: {
          defaultValue: true,
        },
        slots: {
          label: '<span id="switch-label-slot">custom label</span>',
        },
      });
      expect(wrapper.find('.t-switch__label #switch-label-slot').exists()).toBe(true);

      // 作用域插槽接收当前开关值
      const scoped = mount(Switch, {
        props: {
          defaultValue: true,
        },
        slots: {
          label: ({ value }: { value: SwitchValue }) =>
            value ? <span id="switch-slot-open">开</span> : <span id="switch-slot-close">关</span>,
        },
      });
      expect(scoped.find('.t-switch__label #switch-slot-open').exists()).toBe(true);

      await scoped.trigger('click');
      expect(scoped.find('.t-switch__label #switch-slot-open').exists()).toBe(false);
      expect(scoped.find('.t-switch__label #switch-slot-close').exists()).toBe(true);
    });

    it('loading[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Switch, {
        props: {
          loading: true,
          onChange,
          label: ['开', '关'],
          icon: iconNodes(),
        },
      });
      // 加载态渲染 loading 并带禁用样式
      expect(wrapper.find('.t-switch__loading').exists()).toBe(true);
      expect(wrapper.classes()).toContain('t-switch--disabled');
      expect(wrapper.find('.t-switch__dot').classes()).toContain('t-switch__dot--disabled');
      expect(wrapper.find('.t-switch__dot').classes()).not.toContain('t-switch__dot--plain');
      // 加载态优先于 label 与 icon
      expect(wrapper.find('.t-switch__label').text()).toBe('');
      expect(wrapper.findComponent(CheckIcon).exists()).toBe(false);

      await wrapper.trigger('click');
      expect(onChange).not.toHaveBeenCalled();

      await wrapper.setProps({ loading: false });
      expect(wrapper.find('.t-switch__loading').exists()).toBe(false);
      expect(wrapper.classes()).not.toContain('t-switch--disabled');
      // 默认值为 false，解除加载后展示关闭文案
      expect(wrapper.find('.t-switch__label').text()).toBe('关');
    });

    it.each(['small', 'medium', 'large'] as const)('size[%s]', (size) => {
      const wrapper = mount(Switch, { props: { size } });
      expect(wrapper.classes()).toContain(`t-switch--${size}`);
      expect(wrapper.find('.t-switch__dot').classes()).toContain(`t-switch__dot--${size}`);
      expect(wrapper.find('.t-switch__label').classes()).toContain(`t-switch__label--${size}`);
    });

    it('value[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Switch, {
        props: {
          value: true,
          onChange,
        },
      });
      expect(wrapper.classes()).toContain('t-switch--checked');

      await wrapper.trigger('click');
      // 受控模式派发 update:value 交由外部更新
      expect(wrapper.emitted('update:value')).toHaveLength(1);
      expect(wrapper.emitted('update:value')?.[0]).toEqual([false]);
      expect(onChange).toHaveBeenCalledWith(false);
      // 外部未回写时保持选中
      expect(wrapper.classes()).toContain('t-switch--checked');
    });

    it('value[string] & customValue[array]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Switch, {
        props: {
          customValue: ['open', 'close'],
          value: 'open',
          onChange,
        },
      });
      expect(wrapper.classes()).toContain('t-switch--checked');

      await wrapper.trigger('click');
      expect(wrapper.emitted('update:value')?.[0]).toEqual(['close']);
      expect(onChange).toHaveBeenCalledWith('close');
    });

    it('value[number] & customValue[array]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Switch, {
        props: {
          customValue: [1, 0],
          value: 1,
          onChange,
        },
      });
      expect(wrapper.classes()).toContain('t-switch--checked');

      await wrapper.trigger('click');
      expect(wrapper.emitted('update:value')?.[0]).toEqual([0]);
      expect(onChange).toHaveBeenCalledWith(0);
    });

    it('modelValue[boolean]', async () => {
      const value = ref(false);
      const wrapper = mount(() => <Switch v-model={value.value} />);
      const $switch = wrapper.find('.t-switch');
      expect($switch.classes()).not.toContain('t-switch--checked');

      await $switch.trigger('click');
      // v-model 双向绑定：点击后同步为 true
      expect(value.value).toBe(true);
      expect($switch.classes()).toContain('t-switch--checked');
    });

    it('modelValue[string] & customValue[array]', async () => {
      const value = ref('open');
      const wrapper = mount(() => <Switch v-model={value.value} customValue={['open', 'close']} />);
      const $switch = wrapper.find('.t-switch');
      expect($switch.classes()).toContain('t-switch--checked');

      await $switch.trigger('click');
      expect(value.value).toBe('close');
      expect($switch.classes()).not.toContain('t-switch--checked');
    });

    it('modelValue[number] & customValue[array]', async () => {
      const value = ref(1);
      const wrapper = mount(() => <Switch v-model={value.value} customValue={[1, 0]} />);
      const $switch = wrapper.find('.t-switch');
      expect($switch.classes()).toContain('t-switch--checked');

      await $switch.trigger('click');
      expect(value.value).toBe(0);
      expect($switch.classes()).not.toContain('t-switch--checked');
    });

    it('defaultValue[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Switch, {
        props: {
          defaultValue: true,
          onChange,
        },
      });
      expect(wrapper.classes()).toContain('t-switch--checked');

      // 非受控：点击直接翻转内部状态，仅触发 change，不派发 update 事件
      await wrapper.trigger('click');
      expect(onChange).toHaveBeenCalledWith(false);
      expect(wrapper.classes()).not.toContain('t-switch--checked');
      expect(wrapper.emitted('update:value')).toBeUndefined();
      expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    });

    it('defaultValue[string] & customValue[array]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Switch, {
        props: {
          customValue: ['open', 'close'],
          defaultValue: 'open',
          onChange,
        },
      });
      expect(wrapper.classes()).toContain('t-switch--checked');

      await wrapper.trigger('click');
      expect(onChange).toHaveBeenCalledWith('close');
      expect(wrapper.classes()).not.toContain('t-switch--checked');
    });

    it('defaultValue[number] & customValue[array]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Switch, {
        props: {
          customValue: [1, 0],
          defaultValue: 1,
          onChange,
        },
      });
      expect(wrapper.classes()).toContain('t-switch--checked');

      await wrapper.trigger('click');
      expect(onChange).toHaveBeenCalledWith(0);
      expect(wrapper.classes()).not.toContain('t-switch--checked');
    });
  });

  describe('events', () => {
    it('change', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Switch, {
        props: {
          onChange,
        },
      });
      expect(onChange).not.toHaveBeenCalled();

      await wrapper.trigger('click');
      // 未选中点击后切换为选中，回调参数为切换后的值
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('update:value', async () => {
      const value = ref(false);
      const wrapper = mount(() => <Switch v-model:value={value.value} />);
      expect(value.value).toBe(false);

      await wrapper.find('.t-switch').trigger('click');
      expect(value.value).toBe(true);
    });

    it('update:modelValue', async () => {
      const value = ref(false);
      const wrapper = mount(() => <Switch v-model={value.value} />);
      expect(value.value).toBe(false);

      await wrapper.find('.t-switch').trigger('click');
      expect(value.value).toBe(true);
    });

    // 源码缺口：switch.tsx 的 handleToggle 调用 setInnerValue(state.value) 时未透传点击事件对象，
    // onChange 实际只收到 value 一个参数，文档声明的 context.e（{ e: MouseEvent }）未实现
    it.todo('change context');
  });

  describe('scenarios', () => {
    describe('form context', () => {
      it('inherits disabled from form', async () => {
        const onChange = vi.fn();
        const switchDisabled = ref<boolean | undefined>(undefined);
        const wrapper = mount(() => (
          <Form disabled>
            <Switch disabled={switchDisabled.value} onChange={onChange} />
          </Form>
        ));
        const getSwitch = () => wrapper.findComponent(Switch);

        // 跟随表单禁用：带禁用样式且点击无效
        expect(getSwitch().classes()).toContain('t-switch--disabled');

        await getSwitch().trigger('click');
        expect(onChange).not.toHaveBeenCalled();

        // 组件自身 disabled=false 优先于表单禁用
        switchDisabled.value = false;
        await nextTick();
        expect(getSwitch().classes()).not.toContain('t-switch--disabled');

        await getSwitch().trigger('click');
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(getSwitch().classes()).toContain('t-switch--checked');
      });

      it('inherits readonly from form', async () => {
        const onChange = vi.fn();
        const wrapper = mount(() => (
          <Form readonly>
            <Switch defaultValue onChange={onChange} />
          </Form>
        ));
        // 只读不添加禁用样式，但不可切换
        expect(wrapper.findComponent(Switch).classes()).not.toContain('t-switch--disabled');

        await wrapper.findComponent(Switch).trigger('click');
        expect(onChange).not.toHaveBeenCalled();
        expect(wrapper.findComponent(Switch).classes()).toContain('t-switch--checked');
      });
    });

    describe('content priority', () => {
      it('label array takes precedence over label slot', async () => {
        const wrapper = mount(Switch, {
          props: {
            defaultValue: true,
            label: ['开', '关'],
          },
          slots: {
            label: () => <span id="switch-slot">slot content</span>,
          },
        });
        expect(wrapper.find('.t-switch__label').text()).toBe('开');
        expect(wrapper.find('#switch-slot').exists()).toBe(false);
      });

      it('label function takes precedence over label slot', async () => {
        const wrapper = mount(Switch, {
          props: {
            defaultValue: true,
            label: () => <span id="switch-function">function content</span>,
          },
          slots: {
            label: () => <span id="switch-slot">slot content</span>,
          },
        });
        expect(wrapper.find('.t-switch__label #switch-function').exists()).toBe(true);
        expect(wrapper.find('#switch-slot').exists()).toBe(false);
      });

      it('label slot takes precedence over icon', async () => {
        const wrapper = mount(Switch, {
          props: {
            defaultValue: true,
            icon: iconNodes(),
          },
          slots: {
            label: () => <span id="switch-slot">slot content</span>,
          },
        });
        expect(wrapper.find('.t-switch__label #switch-slot').exists()).toBe(true);
        expect(wrapper.findComponent(CheckIcon).exists()).toBe(false);
      });
    });

    describe('v-model', () => {
      it('controlled value stays unchanged until parent updates it', async () => {
        const onChange = vi.fn();
        const wrapper = mount(Switch, {
          props: {
            value: true,
            onChange,
          },
        });
        await wrapper.trigger('click');
        // 外部未回写 update:value 前保持选中态
        expect(wrapper.emitted('update:value')).toHaveLength(1);
        expect(wrapper.classes()).toContain('t-switch--checked');

        // 外部回写后 UI 同步
        await wrapper.setProps({ value: false });
        expect(wrapper.classes()).not.toContain('t-switch--checked');
      });

      it('round trip with customValue', async () => {
        const value = ref('open');
        const wrapper = mount(() => <Switch v-model={value.value} customValue={['open', 'close']} />);
        const $switch = wrapper.find('.t-switch');
        expect($switch.classes()).toContain('t-switch--checked');

        await $switch.trigger('click');
        expect(value.value).toBe('close');
        expect($switch.classes()).not.toContain('t-switch--checked');

        await $switch.trigger('click');
        expect(value.value).toBe('open');
        expect($switch.classes()).toContain('t-switch--checked');
      });
    });

    describe('edge cases', () => {
      it('toggles repeatedly in uncontrolled mode', async () => {
        const onChange = vi.fn();
        const wrapper = mount(Switch, {
          props: {
            defaultValue: true,
            onChange,
          },
        });
        await wrapper.trigger('click');
        expect(onChange).toHaveBeenNthCalledWith(1, false);
        expect(wrapper.classes()).not.toContain('t-switch--checked');

        await wrapper.trigger('click');
        expect(onChange).toHaveBeenNthCalledWith(2, true);
        expect(wrapper.classes()).toContain('t-switch--checked');
        // 非受控模式不派发 update 事件
        expect(wrapper.emitted('update:value')).toBeUndefined();
        expect(wrapper.emitted('update:modelValue')).toBeUndefined();
      });

      it('dot plain class depends on label icon and loading', async () => {
        const wrapper = mount(Switch);
        // 未配置双态内容时圆点带 plain 修饰类
        expect(wrapper.find('.t-switch__dot').classes()).toContain('t-switch__dot--plain');

        await wrapper.setProps({ label: ['开', '关'] });
        expect(wrapper.find('.t-switch__dot').classes()).not.toContain('t-switch__dot--plain');

        await wrapper.setProps({
          label: [],
          icon: iconNodes(),
        });
        expect(wrapper.find('.t-switch__dot').classes()).not.toContain('t-switch__dot--plain');

        await wrapper.setProps({ icon: [], loading: true });
        expect(wrapper.find('.t-switch__dot').classes()).not.toContain('t-switch__dot--plain');

        await wrapper.setProps({ loading: false });
        expect(wrapper.find('.t-switch__dot').classes()).toContain('t-switch__dot--plain');
      });

      it('incomplete label array falls back to icon', async () => {
        const wrapper = mount(Switch, {
          props: {
            defaultValue: true,
            label: ['开'],
            icon: iconNodes(),
          },
        });
        // label 数组长度不足 2 时视为未配置，回落到图标
        expect(wrapper.find('.t-switch__label').text()).toBe('');
        expect(wrapper.findComponent(CheckIcon).exists()).toBe(true);
        // 图标配置为双态时圆点不带 plain 修饰类
        expect(wrapper.find('.t-switch__dot').classes()).not.toContain('t-switch__dot--plain');

        // 移除图标后，单元素 label 不影响 plain 样式
        await wrapper.setProps({ icon: [] });
        expect(wrapper.find('.t-switch__dot').classes()).toContain('t-switch__dot--plain');
      });

      // 源码缺口：switch.tsx 中 switchValues 在 setup 阶段一次性读取 props.customValue（非 computed），
      // 挂载后更新 customValue 不会生效，待源码改为响应式后补充断言
      it.todo('customValue updates after mount');
    });
  });
});

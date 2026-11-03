import { h, nextTick, ref } from 'vue';
import { enableAutoUnmount, mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { CloseIcon, InfoCircleFilledIcon, AppIcon as TIconApp } from 'tdesign-icons-vue-next';
import Message from '../message';
import type { TdMessageProps } from '../type';

const prefix = 't';
const name = `${prefix}-message`;

enableAutoUnmount(afterEach);
afterEach(() => {
  vi.useRealTimers();
});

describe('Message', () => {
  describe('props', () => {
    it('align[left/center]', () => {
      (['left', 'center'] as const).forEach((align) => {
        const wrapper = mount(<Message visible align={align} />);
        expect(wrapper.get(`.${name}`).classes()).toContain(`${name}-align--${align}`);
      });
    });

    it('closeBtn[boolean]', () => {
      const wrapper = mount(<Message visible closeBtn />);
      expect(wrapper.get(`.${name}__close-wrap`).findComponent(CloseIcon).exists()).toBe(true);

      const hidden = mount(<Message visible closeBtn={false} />);
      expect(hidden.find(`.${name}__close-wrap`).exists()).toBe(false);
    });

    it('closeBtn[string]', () => {
      const wrapper = mount(<Message visible closeBtn="关闭" />);
      expect(wrapper.get(`.${name}__close-wrap`).text()).toBe('关闭');
    });

    it('closeBtn[function]', () => {
      const wrapper = mount(<Message visible closeBtn={() => h(TIconApp)} />);
      expect(wrapper.get(`.${name}__close-wrap`).findComponent(TIconApp).exists()).toBe(true);
    });

    it('content[string]', () => {
      const wrapper = mount(<Message visible content="这是一条消息通知" />);
      expect(wrapper.get(`.${name}__text`).text()).toBe('这是一条消息通知');
    });

    it('content[function]', () => {
      const wrapper = mount(<Message visible content={() => <span class="custom-content">自定义消息</span>} />);
      expect(wrapper.get(`.${name}__text .custom-content`).text()).toBe('自定义消息');
    });

    it('duration[number]', async () => {
      vi.useFakeTimers();
      const onDurationEnd = vi.fn();
      const wrapper = mount(<Message visible={false} duration={3000} onDurationEnd={onDurationEnd} />);
      await wrapper.setProps({ visible: true });
      expect(onDurationEnd).not.toHaveBeenCalled();
      vi.advanceTimersByTime(3000);
      expect(onDurationEnd).toHaveBeenCalledTimes(1);
      // useVModel 未传 propName，受控通道实际发出 update:value（应为 update:visible）；
      // watch 进入加载态时先回写 true，计时结束再回写 false
      expect(wrapper.emitted('update:value')).toEqual([[true], [false]]);

      // duration = 0 表示没有计时器
      const noTimer = vi.fn();
      const wrapper2 = mount(<Message visible={false} duration={0} onDurationEnd={noTimer} />);
      await wrapper2.setProps({ visible: true });
      vi.advanceTimersByTime(10000);
      expect(noTimer).not.toHaveBeenCalled();
    });

    // gap 只在多条消息堆叠时生效（需 single=false）：messageIndex 为模块级计数，这里通过两个先后出现的消息 top 差值验证
    const mountStackedMessage = async (extraProps: Partial<TdMessageProps> = {}) => {
      const wrapper = mount(<Message visible={false} offset={[0, 0]} single={false} {...extraProps} />);
      await wrapper.setProps({ visible: true });
      return wrapper;
    };

    const getMessageTop = (wrapper: VueWrapper<any>) => {
      const style = wrapper.find(`.${name}`).attributes('style');
      const matched = style?.match(/top: (-?[\d.]+)px/);
      return matched ? Number(matched[1]) : Number.NaN;
    };

    it('gap[number]', async () => {
      const first = await mountStackedMessage({ gap: 20 });
      const second = await mountStackedMessage({ gap: 20 });
      expect(getMessageTop(second) - getMessageTop(first)).toBe(20);
    });

    it('gap[string]', async () => {
      const first = await mountStackedMessage({ gap: '15' });
      const second = await mountStackedMessage({ gap: '15' });
      expect(getMessageTop(second) - getMessageTop(first)).toBe(15);
    });

    it('gap[boolean]', async () => {
      // gap = true 时取默认间距 12
      const first = await mountStackedMessage({ gap: true });
      const second = await mountStackedMessage({ gap: true });
      expect(getMessageTop(second) - getMessageTop(first)).toBe(12);

      // gap = false 时不堆叠间距
      const third = await mountStackedMessage({ gap: false });
      const fourth = await mountStackedMessage({ gap: false });
      expect(getMessageTop(fourth)).toBe(getMessageTop(third));
    });

    it('icon[boolean]', () => {
      const wrapper = mount(<Message visible icon={false} content="这是一条消息通知" />);
      expect(wrapper.find('.t-icon').exists()).toBe(false);

      // 默认 icon = true 显示主题对应图标
      const themed = mount(<Message visible content="这是一条消息通知" />);
      expect(themed.get(`.${name}__icon--left`).findComponent(InfoCircleFilledIcon).exists()).toBe(true);
    });

    it('icon[function]', () => {
      const wrapper = mount(<Message visible content="这是一条消息通知" icon={() => h(TIconApp)} />);
      expect(wrapper.get(`.${name}__icon--left`).findComponent(TIconApp).exists()).toBe(true);
    });

    it('link[string]', () => {
      const wrapper = mount(<Message visible content="这是一条消息通知" link="查看详情" />);
      expect(wrapper.get(`.${name}__link`).text()).toBe('查看详情');
    });

    it('link[object]', () => {
      const wrapper = mount(
        <Message visible content="这是一条消息通知" link={{ content: '详情', href: 'https://tdesign.tencent.com' }} />,
      );
      const link = wrapper.get(`.${name}__link a`);
      expect(link.text()).toBe('详情');
      expect(link.attributes('href')).toBe('https://tdesign.tencent.com');
    });

    it('link[function]', () => {
      const wrapper = mount(<Message visible content="这是一条消息通知" link={() => h(TIconApp)} />);
      expect(wrapper.get(`.${name}__link`).findComponent(TIconApp).exists()).toBe(true);
    });

    it('offset[array]', () => {
      const wrapper = mount(<Message visible offset={[-10, 20]} />);
      expect(wrapper.get(`.${name}`).attributes('style')).toContain('top: -10px');
      expect(wrapper.get(`.${name}`).attributes('style')).toContain('right: 20px');
      expect(wrapper.get(`.${name}`).attributes('style')).toContain('left: 20px');

      // 带单位字符串保持 calc 叠加（single 默认 true，gap 为 0，直接透传）
      const unit = mount(<Message visible offset={['10vh', '2rem']} />);
      expect(unit.get(`.${name}`).attributes('style')).toContain('top: 10vh');
    });

    it('single[boolean]', async () => {
      // single 为 true 时不参与多条消息堆叠，即使设置 gap 也不叠加间距
      const first = await mountStackedMessage({ gap: 20, single: true });
      const second = await mountStackedMessage({ gap: 20, single: true });
      expect(getMessageTop(second)).toBe(getMessageTop(first));
      expect(getMessageTop(first)).toBe(0);
    });

    it('theme[info/success/warning/error]', () => {
      (['info', 'success', 'warning', 'error'] as const).forEach((theme) => {
        const wrapper = mount(<Message visible theme={theme} />);
        expect(wrapper.get(`.${name}`).classes()).toContain(`${name}--${theme}`);
      });
    });

    it('visible[boolean]', async () => {
      const wrapper = mount(<Message visible={false} />);
      expect(wrapper.find(`.${name}`).exists()).toBe(false);

      await wrapper.setProps({ visible: true });
      expect(wrapper.find(`.${name}`).exists()).toBe(true);
    });

    it('modelValue[boolean]', async () => {
      const show = ref(false);
      const wrapper = mount({
        setup() {
          return () => <Message v-model={show.value} />;
        },
      });
      expect(wrapper.find(`.${name}`).exists()).toBe(false);

      // v-model 受控通道控制消息显隐
      show.value = true;
      await nextTick();
      expect(wrapper.find(`.${name}`).exists()).toBe(true);
    });

    it('defaultVisible[boolean]', async () => {
      const wrapper = mount(<Message defaultVisible content="非受控消息" closeBtn />);
      expect(wrapper.get(`.${name}__text`).text()).toBe('非受控消息');

      // 点击关闭按钮在非受控模式下直接隐藏
      await wrapper.get(`.${name}__close-wrap`).trigger('click');
      expect(wrapper.find(`.${name}`).exists()).toBe(false);
    });

    it('zIndex[number]', () => {
      const wrapper = mount(<Message visible zIndex={99} />);
      expect(wrapper.get(`.${name}`).attributes('style')).toContain('z-index: 99');
    });
  });

  describe('slots', () => {
    it('default', () => {
      const wrapper = mount(
        <Message visible v-slots={{ default: () => <span class="slot-content">插槽消息</span> }} />,
      );
      expect(wrapper.get(`.${name}__text .slot-content`).text()).toBe('插槽消息');
    });

    it('content', () => {
      const wrapper = mount(<Message visible v-slots={{ content: () => <span class="slot-text">具名消息</span> }} />);
      expect(wrapper.get(`.${name}__text .slot-text`).text()).toBe('具名消息');
    });

    it('icon', () => {
      const wrapper = mount(<Message visible content="这是一条消息通知" v-slots={{ icon: () => h(TIconApp) }} />);
      expect(wrapper.get(`.${name}__icon--left`).findComponent(TIconApp).exists()).toBe(true);
    });

    it('link', () => {
      const wrapper = mount(<Message visible content="这是一条消息通知" v-slots={{ link: () => h(TIconApp) }} />);
      expect(wrapper.get(`.${name}__link`).findComponent(TIconApp).exists()).toBe(true);
    });

    it('closeBtn', () => {
      const wrapper = mount(<Message visible v-slots={{ closeBtn: () => <span class="slot-close">插槽关闭</span> }} />);
      expect(wrapper.get(`.${name}__close-wrap .slot-close`).text()).toBe('插槽关闭');
    });
  });

  describe('events', () => {
    it('closeBtnClick', async () => {
      const onCloseBtnClick = vi.fn();
      const wrapper = mount(
        <Message visible content="这是一条带关闭的消息通知" closeBtn onCloseBtnClick={onCloseBtnClick} />,
      );
      await wrapper.get(`.${name}__close-wrap`).trigger('click');
      expect(onCloseBtnClick).toHaveBeenCalledTimes(1);
      expect(onCloseBtnClick).toHaveBeenCalledWith({ e: expect.any(MouseEvent) });
      // useVModel 未传 propName，受控通道实际发出 update:value（应为 update:visible）
      expect(wrapper.emitted('update:value')).toEqual([[false]]);
    });

    it('linkClick', async () => {
      const onLinkClick = vi.fn();
      const wrapper = mount(<Message visible content="这是一条消息通知" link="链接" onLinkClick={onLinkClick} />);
      await wrapper.get(`.${name}__link`).trigger('click');
      expect(onLinkClick).toHaveBeenCalledTimes(1);
      expect(onLinkClick).toHaveBeenCalledWith({ e: expect.any(MouseEvent) });
    });

    it('durationEnd', async () => {
      vi.useFakeTimers();
      const onDurationEnd = vi.fn();
      const wrapper = mount(<Message visible={false} duration={1000} onDurationEnd={onDurationEnd} />);
      await wrapper.setProps({ visible: true });
      vi.advanceTimersByTime(1000);
      expect(onDurationEnd).toHaveBeenCalledTimes(1);
    });
  });

  describe('scenarios', () => {
    it('marquee[boolean] applies nowrap and animation after delay', async () => {
      vi.useFakeTimers();
      const wrapper = mount(<Message visible={false} marquee content="滚动消息" />);
      expect(wrapper.find(`.${name}__text-nowrap`).exists()).toBe(false);

      await wrapper.setProps({ visible: true });
      // 文本立即换行约束，动画延迟后启动
      expect(wrapper.get(`.${name}__text-wrap`).classes()).toContain(`${name}__text-nowrap`);
      expect(wrapper.get(`.${name}__text`).attributes('style') || '').not.toContain('transition-duration');

      vi.advanceTimersByTime(300);
      await nextTick();
      expect(wrapper.get(`.${name}__text`).attributes('style')).toContain('transition-duration: 0s');
      expect(wrapper.get(`.${name}__text`).attributes('style')).toContain('transition-timing-function: linear');
    });

    it('marquee[loop 0] never starts scrolling', async () => {
      vi.useFakeTimers();
      const wrapper = mount(<Message visible={false} marquee={{ loop: 0 }} content="不滚动" />);
      await wrapper.setProps({ visible: true });
      vi.advanceTimersByTime(1000);
      await nextTick();
      expect(wrapper.get(`.${name}__text`).attributes('style') || '').not.toContain('transition-duration');
    });

    it('marquee stops after the configured loops', async () => {
      vi.useFakeTimers();
      const wrapper = mount(<Message visible={false} marquee={{ loop: 1 }} content="滚动一次" />);
      await wrapper.setProps({ visible: true });
      vi.advanceTimersByTime(300);
      await nextTick();
      expect(wrapper.get(`.${name}__text`).attributes('style')).toContain('transition-duration');

      await wrapper.get(`.${name}__text`).trigger('transitionend');
      expect(wrapper.get(`.${name}__text`).attributes('style') || '').not.toContain('transition-duration');
    });

    it('icon prop takes priority over icon slot', () => {
      const wrapper = mount(
        <Message visible icon={() => h(TIconApp)} v-slots={{ icon: () => <span class="slot-icon">插槽图标</span> }} />,
      );
      expect(wrapper.get(`.${name}__icon--left`).findComponent(TIconApp).exists()).toBe(true);
      expect(wrapper.find('.slot-icon').exists()).toBe(false);
    });

    it('default slot takes priority over content prop', () => {
      const wrapper = mount(
        <Message visible content="属性内容" v-slots={{ default: () => <span class="slot-content">插槽内容</span> }} />,
      );
      expect(wrapper.get(`.${name}__text .slot-content`).text()).toBe('插槽内容');
    });

    it('content prop takes priority over content slot', () => {
      const wrapper = mount(
        <Message visible content="属性内容" v-slots={{ content: () => <span class="slot-text">具名插槽</span> }} />,
      );
      expect(wrapper.get(`.${name}__text`).text()).toBe('属性内容');
      expect(wrapper.find('.slot-text').exists()).toBe(false);
    });

    it('link function takes priority over link slot', () => {
      const wrapper = mount(
        <Message visible link={() => h(TIconApp)} v-slots={{ link: () => <span class="slot-link">插槽链接</span> }} />,
      );
      expect(wrapper.get(`.${name}__link`).findComponent(TIconApp).exists()).toBe(true);
      expect(wrapper.find('.slot-link').exists()).toBe(false);
    });

    it('closeBtn function takes priority over closeBtn slot', () => {
      const wrapper = mount(
        <Message
          visible
          closeBtn={() => <span class="prop-close">属性关闭</span>}
          v-slots={{ closeBtn: () => <span class="slot-close">插槽关闭</span> }}
        />,
      );
      expect(wrapper.get(`.${name}__close-wrap .prop-close`).text()).toBe('属性关闭');
      expect(wrapper.find('.slot-close').exists()).toBe(false);
    });

    // useVModel 未传 propName='visible'，受控通道事件名实际为 update:value。
    it.todo('visible channel emits update:visible');
  });
});

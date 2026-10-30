import { h, nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { AppIcon, AppIcon as TIconApp } from 'tdesign-icons-vue-next';
import Message from '../message';
import type { TdMessageProps } from '../type';

const prefix = 't';
const name = `${prefix}-message`;

describe('Message', () => {
  describe('props', () => {
    // marquee 跑马灯滚动行为
    // it(' marquee', async () => {
    //   const wrapper = mount(<Message visible />);
    //   expect(wrapper.vm.scroll.marquee).toBe(false);

    //   const wrapper1 = mount(<Message visible marquee />);
    //   expect(wrapper1.vm.scroll.marquee).toBe(false);

    //   const wrapper2 = mount(<Message visible marquee={true} />);
    //   await nextTick();
    //   expect(wrapper2.vm.scroll.marquee).toBe(true);

    //   const wrapper3 = mount(<Message visible marquee={{ loop: 1 }} />);
    //   await nextTick();
    //   expect(wrapper3.vm.scroll.marquee).toBe(true);
    //   wrapper3.vm.handleTransitionend();
    //   expect(wrapper3.vm.scroll.loop).toBe(0);
    //   wrapper3.vm.handleTransitionend();
    //   expect(wrapper3.vm.scroll.marquee).toBe(false);

    //   const wrapper4 = mount(<Message visible marquee={{ loop: -1 }} />);
    //   await nextTick();
    //   expect(wrapper4.vm.scroll.marquee).toBe(true);
    //   wrapper4.vm.handleTransitionend();
    // });

    it('align[string]', () => {
      const alignList: TdMessageProps['align'][] = ['left', 'center'];
      alignList.forEach((align) => {
        const wrapper = mount(<Message visible align={align} />);
        expect(wrapper.find(`.${name}`).classes().includes(`${name}-align--${align}`)).toBeTruthy();
      });
    });

    it('closeBtn[function]', () => {
      const closeBtn = () => h(TIconApp);
      const wrapper = mount(<Message visible closeBtn={closeBtn} />);
      expect(wrapper.findComponent(TIconApp).exists()).toBeTruthy();
    });

    it('content[string]', () => {
      const wrapper = mount(<Message visible content="这是一条消息通知" />);
      expect(wrapper.find(`.${name}__text`).text()).toBe('这是一条消息通知');
    });

    it('content[function]', () => {
      const wrapper = mount(<Message visible content={() => <span class="custom-content">自定义消息</span>} />);
      const $text = wrapper.find(`.${name}__text`);
      expect($text.find('.custom-content').text()).toBe('自定义消息');
    });

    it('duration[number]', () => {
      function timer(callback) {
        setTimeout(() => {
          callback();
        }, 5000);
      }
      vi.useFakeTimers();
      const fn = vi.fn();
      timer(fn);
      const wrapper = mount(<Message defaultVisible duration={5000} onCloseBtnClick={fn} />);
      vi.advanceTimersByTime(5000);
      expect(fn).toBeCalledTimes(1);
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
      // icon = false
      const wrapper0 = mount(() => <Message visible={true} icon={false} content="这是一条消息通知" />);
      expect(wrapper0.find('.t-icon').exists()).toBeFalsy();

      // icon 使用内置主题icon
      const wrapper1 = mount(() => <Message visible={true} content="这是一条消息通知" theme={'success'} />);
      const successIcon = wrapper1.find('.t-icon-check-circle-filled');
      expect(successIcon).toBeTruthy();
    });

    it('icon[function]', () => {
      const appIcon = () => h(TIconApp);
      const wrapper2 = mount(() => <Message visible={true} content="这是一条消息通知" icon={appIcon} />);
      expect(wrapper2.find(`.${name}__icon--left`).findComponent(TIconApp).exists()).toBeTruthy();
    });

    it('link[string]', () => {
      const wrapper0 = mount(() => <Message visible={true} content="这是一条消息通知" />);
      expect(wrapper0.find(`.${name}__link`).exists()).toBeFalsy();

      // lin is string
      const wrapper1 = mount(() => <Message visible={true} content="这是一条消息通知" link={'link'} />);
      expect(wrapper1.find(`.${name}__link`).exists()).toBeTruthy();
      expect(wrapper1.find(`.${name}__link`).text()).toEqual('link');
    });

    it('link[object]', () => {
      const wrapper2 = mount(() => <Message visible={true} content="这是一条消息通知" link={{ content: 'content' }} />);
      expect(wrapper2.find(`.${name}__link`).exists()).toBeTruthy();
      expect(wrapper2.find(`.${name}__link`).text()).toEqual('content');
    });

    it('link[function]', () => {
      const appIcon = () => h(TIconApp);
      const wrapper3 = mount(() => <Message visible={true} content="这是一条消息通知" link={appIcon} />);
      expect(wrapper3.find(`.${name}__link`).exists()).toBeTruthy();
      expect(wrapper3.find(`.${name}__link`).findComponent(TIconApp).exists()).toBeTruthy();
    });

    it('offset[array]', () => {
      const offset = [-10, 20];
      const wrapper = mount(<Message visible offset={offset} />);
      const $message = wrapper.find(`.${name}`);
      expect(
        $message.attributes('style').includes(`top: ${offset[0]}px; right: ${offset[1]}px; left: ${offset[1]}px`),
      ).toBeTruthy();
    });

    it('single[boolean]', async () => {
      // single 为 true 时不参与多条消息堆叠，即使设置 gap 也不叠加间距
      const first = await mountStackedMessage({ gap: 20, single: true });
      const second = await mountStackedMessage({ gap: 20, single: true });
      expect(getMessageTop(second)).toBe(getMessageTop(first));
      expect(getMessageTop(first)).toBe(0);
    });

    it('theme[info/success/warning/error]', () => {
      const themeList: TdMessageProps['theme'][] = ['info', 'success', 'warning', 'error'];
      themeList.forEach((theme) => {
        const wrapper = mount(<Message visible theme={theme} />);
        expect(wrapper.find(`.${name}`).classes()).toContain(`${name}--${theme}`);
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
    it('zIndex[number]', () => {
      const wrapper = mount(<Message visible zIndex={99} />);
      const $message = wrapper.find(`.${name}`);
      expect($message.attributes('style')).toContain('z-index: 99');
    });
  });

  describe('slots', () => {
    it('icon', () => {
      const slots = {
        icon: () => h(TIconApp),
      };
      const wrapper = mount(<Message visible={true} content="这是一条消息通知" v-slots={slots} />);
      expect(wrapper.find(`.${name}__icon--left`).findComponent(TIconApp).exists()).toBeTruthy();
    });

    it('link', () => {
      const slots = {
        link: () => h(TIconApp),
      };
      const wrapper = mount(<Message visible={true} content="这是一条消息通知" v-slots={slots} />);
      expect(wrapper.find(`.${name}__link`).exists()).toBeTruthy();
      expect(wrapper.find(`.${name}__link`).findComponent(TIconApp).exists()).toBeTruthy();
    });
  });

  describe('events', () => {
    it('closeBtn', () => {
      const fn = vi.fn();
      const wrapper = mount(() => (
        <Message visible={true} content="这是一条带关闭的消息通知，常驻可关闭" closeBtn={true} onCloseBtnClick={fn} />
      ));
      const closeBtn = wrapper.find('.t-message__close-wrap');
      closeBtn.trigger('click');
      expect(fn).toBeCalledTimes(1);
    });

    it('linkClick', () => {
      const fn = vi.fn();
      const wrapper = mount(() => <Message visible={true} content="这是一条消息通知" link={'链接'} onLinkClick={fn} />);
      const _link = wrapper.find(`.${name}__link`);
      _link.trigger('click');
      expect(fn).toBeCalledTimes(1);
    });
  });
});

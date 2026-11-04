import { mount, enableAutoUnmount } from '@vue/test-utils';
import { afterEach, describe, it, expect, vi } from 'vitest';
import Loading from '../index';

// attach/fullscreen 用例会 teleport 到 body，统一清理残留节点
afterEach(() => {
  document.body.innerHTML = '';
  document.body.className = '';
});
enableAutoUnmount(afterEach);

const mountAttachContainer = (id: string) => {
  const container = document.createElement('div');
  container.id = id;
  document.body.appendChild(container);
  return container;
};

describe('Loading', () => {
  describe('props', () => {
    it('attach[string]', async () => {
      mountAttachContainer('loading-attach');
      const wrapper = mount(<Loading attach="#loading-attach" />);
      await wrapper.vm.$nextTick();

      // 字符串选择器：Loading 挂载到目标容器，且带全屏遮罩类名
      expect(document.querySelector('#loading-attach .t-loading')).toBeTruthy();
      expect(document.querySelector('#loading-attach .t-loading--full')).toBeTruthy();
      expect(wrapper.find('.t-loading').exists()).toBe(false);
    });

    it('attach[function]', async () => {
      const container = mountAttachContainer('loading-attach-fn');
      const wrapper = mount(<Loading attach={() => container} />);
      await wrapper.vm.$nextTick();

      // 函数返回挂载节点：同样 teleport 到目标容器
      expect(container.querySelector('.t-loading')).toBeTruthy();
      expect(wrapper.find('.t-loading').exists()).toBe(false);
    });

    it('content[string]', () => {
      const wrapper = mount(<Loading content="加载中..." />);
      // content 作为子元素渲染在 loading 根节点内
      expect(wrapper.text()).toContain('加载中...');
    });

    it('content[function]', () => {
      const wrapper = mount(<Loading content={() => <div class="custom-content">自定义内容</div>} />);
      expect(wrapper.get('.custom-content').text()).toBe('自定义内容');
    });

    it('default[string]', () => {
      // default prop 与默认插槽同名，此处验证 prop 传入通道
      const wrapper = mount(Loading, { props: { default: '默认子元素' } });
      expect(wrapper.text()).toContain('默认子元素');
    });

    it('default[function]', () => {
      const wrapper = mount(Loading, { props: { default: () => <span class="fn-default">函数默认子元素</span> } });
      expect(wrapper.get('.fn-default').text()).toBe('函数默认子元素');
    });

    it('default[slot]', () => {
      const wrapper = mount(Loading, { slots: { default: () => <span class="slot-content">插槽子元素</span> } });
      expect(wrapper.get('.slot-content').text()).toBe('插槽子元素');
    });

    it('delay[number]', async () => {
      vi.useFakeTimers();
      try {
        const wrapper = mount(Loading, { props: { delay: 500 } });
        // 延迟窗口内不渲染指示符
        expect(wrapper.find('.t-loading__gradient').exists()).toBe(false);
        vi.advanceTimersByTime(500);
        await wrapper.vm.$nextTick();
        expect(wrapper.find('.t-loading__gradient').exists()).toBe(true);

        // 重新进入 loading 状态时再次延迟
        await wrapper.setProps({ loading: false });
        await wrapper.setProps({ loading: true });
        expect(wrapper.find('.t-loading__gradient').exists()).toBe(false);
        vi.advanceTimersByTime(500);
        await wrapper.vm.$nextTick();
        expect(wrapper.find('.t-loading__gradient').exists()).toBe(true);
      } finally {
        vi.useRealTimers();
      }
    });

    it('duration[number]', () => {
      const wrapper = mount(Loading, { props: { duration: 1200 } });
      expect(wrapper.get('.t-loading__gradient').attributes('style')).toContain('1200ms');

      // dots 主题下容器与每个点均应用 duration
      const dots = mount(Loading, { props: { theme: 'dots', duration: 600 } });
      expect(dots.get('.t-loading__dots').attributes('style')).toContain('600ms');
      dots.findAll('.t-loading__dot').forEach((dot, index) => {
        expect(dot.attributes('style')).toContain('animation-duration: 0.6s');
        expect(dot.attributes('style')).toContain(`animation-delay: ${(600 * index) / 3000}s`);
      });
    });

    it('fullscreen[boolean]', async () => {
      // 未设置 attach 时 Teleport 处于禁用态，全屏内容原位渲染并带 fullscreen 类名
      const wrapper = mount(<Loading fullscreen />);
      expect(wrapper.find('.t-loading--fullscreen').exists()).toBe(true);

      // fullscreen 模式下 loading = false 不渲染
      await wrapper.setProps({ loading: false });
      expect(wrapper.find('.t-loading').exists()).toBe(false);
    });

    it('indicator[boolean]', async () => {
      const wrapper = mount(Loading, { props: { indicator: false, text: '加载中' } });
      expect(wrapper.find('.t-loading__gradient').exists()).toBe(false);
      // 无指示符时文案使用独立样式
      expect(wrapper.get('.t-loading__text').classes()).toContain('t-loading__text--only');

      await wrapper.setProps({ indicator: true });
      expect(wrapper.find('.t-loading__gradient').exists()).toBe(true);
      expect(wrapper.get('.t-loading__text').classes()).not.toContain('t-loading__text--only');
    });

    it('indicator[function]', () => {
      const wrapper = mount(Loading, { props: { indicator: () => <span class="custom-indicator">指示符</span> } });
      expect(wrapper.get('.custom-indicator').text()).toBe('指示符');
      expect(wrapper.find('.t-loading__gradient').exists()).toBe(false);
    });

    it('indicator[slot]', () => {
      const wrapper = mount(Loading, { slots: { indicator: () => <span class="slot-indicator">插槽指示符</span> } });
      expect(wrapper.get('.slot-indicator').text()).toBe('插槽指示符');
      expect(wrapper.find('.t-loading__gradient').exists()).toBe(false);
    });

    // 组件会输出 `color: inherit`，但 jsdom 的 cssstyle 序列化会丢弃该值，无法在单测中断言。
    it.todo('inheritColor[boolean]');

    it('layout[horizontal/vertical]', async () => {
      const wrapper = mount(Loading, { props: { text: '加载中' } });
      // 默认水平布局不添加修饰类
      expect(wrapper.classes()).not.toContain('t-loading--vertical');
      await wrapper.setProps({ layout: 'vertical' });
      expect(wrapper.classes()).toContain('t-loading--vertical');
    });

    it('loading[boolean]', async () => {
      const wrapper = mount(Loading);
      expect(wrapper.find('.t-loading__gradient').exists()).toBe(true);
      expect(document.body.classList.contains('t-loading--lock')).toBe(false);

      await wrapper.setProps({ loading: false });
      expect(wrapper.find('.t-loading__gradient').exists()).toBe(false);

      // fullscreen 开启时进入加载态会锁定 body 滚动
      await wrapper.setProps({ loading: true, fullscreen: true });
      expect(document.body.classList.contains('t-loading--lock')).toBe(true);

      await wrapper.setProps({ loading: false });
      expect(document.body.classList.contains('t-loading--lock')).toBe(false);
    });

    it('pause[boolean]', async () => {
      const wrapper = mount(Loading);
      expect(wrapper.get('.t-loading__gradient').attributes('style')).not.toContain('animation-play-state');
      await wrapper.setProps({ pause: true });
      expect(wrapper.get('.t-loading__gradient').attributes('style')).toContain('animation-play-state: paused');
    });

    it('reverse[boolean]', async () => {
      const wrapper = mount(Loading);
      expect(wrapper.get('.t-loading__gradient').attributes('style')).not.toContain('animation-direction');
      await wrapper.setProps({ reverse: true });
      expect(wrapper.get('.t-loading__gradient').attributes('style')).toContain('animation-direction: reverse');
    });

    it('size[string]', async () => {
      const wrapper = mount(Loading);
      expect(wrapper.attributes('style')).toContain('font-size: 20px');
      await wrapper.setProps({ size: '40px' });
      expect(wrapper.attributes('style')).toContain('font-size: 40px');
      expect(wrapper.get('.t-loading__gradient').attributes('style')).toContain('width: 40px');
      expect(wrapper.get('.t-loading__gradient').attributes('style')).toContain('height: 40px');
    });

    it('text[string]', () => {
      const wrapper = mount(Loading, { props: { text: '加载中' } });
      expect(wrapper.get('.t-loading__text').text()).toBe('加载中');
    });

    it('text[function]', () => {
      const wrapper = mount(Loading, { props: { text: () => <span class="fn-text">函数文案</span> } });
      expect(wrapper.get('.t-loading__text .fn-text').text()).toBe('函数文案');
    });

    it('text[slot]', () => {
      const wrapper = mount(Loading, { slots: { text: () => <span class="slot-text">插槽文案</span> } });
      expect(wrapper.get('.t-loading__text .slot-text').text()).toBe('插槽文案');
    });

    it('theme[circular/spinner/dots]', () => {
      const circular = mount(Loading, { props: { theme: 'circular' } });
      expect(circular.find('.t-loading__gradient').exists()).toBe(true);

      const spinner = mount(Loading, { props: { theme: 'spinner' } });
      expect(spinner.find('.t-loading__spinner').exists()).toBe(true);
      expect(spinner.find('.t-loading__gradient').exists()).toBe(false);

      const dots = mount(Loading, { props: { theme: 'dots' } });
      expect(dots.findAll('.t-loading__dot')).toHaveLength(3);
      expect(dots.find('.t-loading__gradient').exists()).toBe(false);
    });
  });

  describe('scenarios', () => {
    it('default slot takes priority over content prop', () => {
      const wrapper = mount(Loading, {
        props: { content: '属性内容' },
        slots: { default: () => <span class="slot-content">插槽内容</span> },
      });
      expect(wrapper.get('.slot-content').text()).toBe('插槽内容');
    });

    it('content prop takes priority over content slot', () => {
      const wrapper = mount(Loading, {
        props: { content: '属性内容' },
        slots: { content: () => <span class="slot-content">具名插槽</span> },
      });
      expect(wrapper.text()).toContain('属性内容');
      expect(wrapper.find('.slot-content').exists()).toBe(false);
    });

    it('indicator function takes priority over indicator slot', () => {
      const wrapper = mount(Loading, {
        props: { indicator: () => <span class="prop-indicator">属性指示符</span> },
        slots: { indicator: () => <span class="slot-indicator">插槽指示符</span> },
      });
      expect(wrapper.get('.prop-indicator').text()).toBe('属性指示符');
      expect(wrapper.find('.slot-indicator').exists()).toBe(false);
    });

    it('text prop takes priority over text slot', () => {
      const wrapper = mount(Loading, {
        props: { text: '属性文案' },
        slots: { text: () => <span class="slot-text">插槽文案</span> },
      });
      expect(wrapper.get('.t-loading__text').text()).toBe('属性文案');
      expect(wrapper.find('.slot-text').exists()).toBe(false);
    });

    it('hides indicator and text while delayed loading is pending', async () => {
      vi.useFakeTimers();
      try {
        const wrapper = mount(Loading, { props: { delay: 300, text: '加载中' } });
        expect(wrapper.find('.t-loading__gradient').exists()).toBe(false);
        expect(wrapper.find('.t-loading__text').exists()).toBe(false);
        vi.advanceTimersByTime(300);
        await wrapper.vm.$nextTick();
        expect(wrapper.find('.t-loading__gradient').exists()).toBe(true);
        expect(wrapper.get('.t-loading__text').text()).toBe('加载中');
      } finally {
        vi.useRealTimers();
      }
    });

    it('logs an error when the attach target does not exist', () => {
      const error = vi.spyOn(console, 'error').mockImplementation(() => {});
      try {
        const wrapper = mount(Loading, { props: { attach: '#not-exist' } });
        expect(error).toHaveBeenCalledWith('attach is not exist');
        expect(wrapper.find('.t-loading').exists()).toBe(true);
      } finally {
        error.mockRestore();
      }
    });
  });
});

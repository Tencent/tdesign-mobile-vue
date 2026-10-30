import { mount } from '@vue/test-utils';
import { describe, it, expect, afterEach } from 'vitest';
import { nextTick } from 'vue';
import Loading, { LoadingPlugin } from '../index';
import Spinner from '../icon/spinner';
import Gradient from '../icon/gradient';

// attach/fullscreen 用例会 teleport 到 body，统一清理残留节点
afterEach(() => {
  document.body.innerHTML = '';
});

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
      await nextTick();

      // 字符串选择器：Loading 挂载到目标容器，且带全屏遮罩类名
      expect(document.querySelector('#loading-attach .t-loading')).toBeTruthy();
      expect(document.querySelector('#loading-attach .t-loading--full')).toBeTruthy();
      expect(wrapper.find('.t-loading').exists()).toBe(false);
    });

    it('attach[function]', async () => {
      const container = mountAttachContainer('loading-attach-fn');
      const wrapper = mount(<Loading attach={() => container} />);
      await nextTick();

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
      expect(wrapper.find('.custom-content').text()).toBe('自定义内容');
    });

    it('default[string]', () => {
      // default prop 与默认插槽同名，此处验证 prop 传入通道
      const wrapper = mount(Loading, {
        props: {
          default: '默认子元素',
        },
      });
      expect(wrapper.text()).toContain('默认子元素');
    });

    it('delay[number]', () => {
      const wrapper = mount(() => <Loading delay={1000}></Loading>);
      const loading = wrapper.find('.t-loading');
      setTimeout(() => {
        expect(loading.exists()).toBeTruthy();
      }, 1000);
    });

    it('duration[number]', () => {
      const wrapper = mount(Loading, {
        props: {
          duration: 1200,
        },
      });
      expect(wrapper.find('.t-loading__gradient').attributes('style')).toContain('1200ms');
    });

    it('fullscreen[boolean]', async () => {
      const wrapper = mount(<Loading fullscreen />);
      // 全屏加载带 fullscreen 类名
      expect(wrapper.find('.t-loading--fullscreen').exists()).toBe(true);

      // fullscreen 模式下 loading = false 不渲染
      await wrapper.setProps({ loading: false });
      expect(wrapper.find('.t-loading').exists()).toBe(false);
    });

    it('indicator[boolean]', () => {
      const wrapper = mount(Loading, {
        props: {
          indicator: false,
        },
      });
      expect(wrapper.find('.t-loading__gradient').exists()).toBeFalsy();
    });

    it('inheritColor[boolean]', () => {
      const wrapper = mount(Loading, {
        props: {
          inheritColor: true,
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('layout[string]', () => {
      const wrapper = mount(<Loading text="t" layout="vertical" />);
      expect(wrapper.find('.t-loading--vertical').exists()).toBeTruthy();
    });

    it('loading[boolean]', async () => {
      const wrapper = mount(Loading);

      expect(document.body.classList.contains('t-loading--lock')).toBe(false);
      await wrapper.setProps({
        loading: false,
      });
      await wrapper.setProps({
        loading: true,
        fullscreen: true,
      });
      expect(document.body.classList.contains('t-loading--lock')).toBe(true);

      await wrapper.setProps({
        loading: false,
      });
      expect(document.body.classList.contains('t-loading--lock')).toBe(false);
    });

    it('pause[boolean]', () => {
      const wrapper = mount(Loading, {
        props: {
          pause: true,
        },
      });
      expect(wrapper.element).toMatchSnapshot();
      const iconWrapper = wrapper.find('.t-loading__gradient');
      const iconWrapperStyle = iconWrapper.attributes().style;
      expect(iconWrapperStyle).toContain('animation-play-state: paused');
    });

    it('reverse[boolean]', () => {
      const wrapper = mount(() => <Loading reverse={true} />);
      expect(wrapper.element).toMatchSnapshot();
      const iconWrapper = wrapper.find('.t-loading__gradient');
      const iconWrapperStyle = iconWrapper.attributes().style;
      expect(iconWrapperStyle).toContain('animation-direction: reverse');
    });

    it('size[string]', () => {
      const wrapper = mount(<Loading size="20px" />);
      expect(wrapper.find('.t-loading').attributes('style')).toContain('font-size: 20px');
    });

    it('text[string]', () => {
      const wrapper = mount(Loading, {
        props: {
          text: 't',
        },
      });
      expect(wrapper.find('.t-loading__text').exists()).toBeTruthy();
    });

    it('theme[circular/spinner/dots]', async () => {
      const testTheme = (theme, component) => {
        const wrapper = mount(() => <Loading theme={theme} />);
        const icon = wrapper.findComponent(component);
        expect(icon.exists()).toBeTruthy();
      };

      testTheme('spinner', Spinner);
      testTheme('', Gradient);
    });
  });

  describe('slots', () => {
    it('text', () => {
      const customLoading = 'custom-loading-text';
      const wrapper = mount(() => (
        <Loading>{{ text: () => <p className={customLoading}>{customLoading}</p> }}</Loading>
      ));
      const text = wrapper.find('.t-loading__text');
      expect(text.exists()).toBeTruthy();
      expect(text.element.innerHTML).toBe(`<p class="${customLoading}">${customLoading}</p>`);
    });
  });

  describe('scenarios', () => {
    describe('plugin', () => {
      it('show', async () => {
        expect(document.body.querySelector('.t-loading')).toBeFalsy();

        const handler = await LoadingPlugin({
          content: 'hello',
          loading: true,
        });

        expect(document.body.querySelector('.t-loading')).toBeTruthy();

        await handler.hide();
        expect(document.body.querySelector('.t-loading')).toBeFalsy();
      });

      it('use plugin', async () => {
        const wrapper = mount(() => <div></div>, { global: { plugins: [LoadingPlugin] } });
        expect(document.body.textContent).not.toContain('测试');
        await wrapper.vm.$loading({ content: '测试' });
        expect(document.body.textContent).toContain('测试');

        await wrapper.vm.$loading(true);
        expect(document.body.querySelector('.t-loading--fullscreen')).toBeTruthy();

        await wrapper.vm.$loading(false);
        expect(document.body.querySelector('.t-loading--fullscreen')).toBeFalsy();
      });
    });
  });
});

import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { nextTick } from 'vue';
import Loading, { LoadingPlugin } from '../index';
import Spinner from '../icon/spinner';
import Gradient from '../icon/gradient';

describe('Loading.vue', () => {
  describe('props', () => {
    it(':delay', () => {
      const wrapper = mount(() => <Loading delay={1000}></Loading>);
      const loading = wrapper.find('.t-loading');
      setTimeout(() => {
        expect(loading.exists()).toBeTruthy();
      }, 1000);
    });

    it(':inheritColor', () => {
      const wrapper = mount(Loading, {
        props: {
          inheritColor: true,
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':pause', () => {
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

    it(':reverse', () => {
      const wrapper = mount(() => <Loading reverse={true} />);
      expect(wrapper.element).toMatchSnapshot();
      const iconWrapper = wrapper.find('.t-loading__gradient');
      const iconWrapperStyle = iconWrapper.attributes().style;
      expect(iconWrapperStyle).toContain('animation-direction: reverse');
    });

    it(':theme', async () => {
      const testTheme = (theme, component) => {
        const wrapper = mount(() => <Loading theme={theme} />);
        const icon = wrapper.findComponent(component);
        expect(icon.exists()).toBeTruthy();
      };

      testTheme('spinner', Spinner);
      testTheme('', Gradient);
    });

    it(':loading', async () => {
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

    it(':text', () => {
      const wrapper = mount(Loading, {
        props: {
          text: 't',
        },
      });
      expect(wrapper.find('.t-loading__text').exists()).toBeTruthy();
    });
  });

  describe('slots', () => {
    it(':text', () => {
      const customLoading = 'custom-loading-text';
      const wrapper = mount(() => (
        <Loading>{{ text: () => <p className={customLoading}>{customLoading}</p> }}</Loading>
      ));
      const text = wrapper.find('.t-loading__text');
      expect(text.exists()).toBeTruthy();
      expect(text.element.innerHTML).toBe(`<p class="${customLoading}">${customLoading}</p>`);
    });
  });
});

describe('spinner.vue', () => {
  describe('render', () => {
    it(':text', () => {
      const wrapper = mount(() => <Spinner />);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

describe('Loading Plugin', () => {
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

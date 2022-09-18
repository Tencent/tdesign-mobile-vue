import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Loading from '../loading.vue';
import Spinner from '../icon/spinner.vue';
import { nextTick } from "vue";

describe('Loading.vue', () => {
  describe('props', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    it(':progress', () => {
      const wrapper = mount(() => (
          <Loading theme="bar" progress={0.5} />
      ));

      const shadow = wrapper.find('.t-loading__shadow');
      expect(shadow.exists()).toBeTruthy();
    });

    it(':delay', async () => {
      const wrapper = mount(() => (
          <Loading delay={1000} />
      ));
      expect(wrapper.find('.t-icon-loading').exists()).not.toBeTruthy();
      vi.runAllTimers();
      await nextTick();
      expect(wrapper.find('.t-icon-loading').exists()).toBeTruthy();
    });

    it(':error', () => {
      const wrapper = mount(() => (
          <Loading theme="error"/>
      ));
      const errorBlock = wrapper.find('.t-loading__text');
      expect(errorBlock.element.innerHTML).toBe('加载失败');
    });

    it(':inheritColor', () => {
      const wrapper = mount(Loading, {
        props: {
          inheritColor: true
        },
      });
      expect(wrapper.vm.rootStyle).toBe('color: inherit')
    });

    it(':pause', () => {
      const wrapper = mount(Loading, {
        props: {
          pause: true
        },
      });
      expect(wrapper.element).toMatchSnapshot();
      const iconWrapper = wrapper.find('.t-loading__gradient')
      const iconWrapperStyle = iconWrapper.attributes().style;
      expect(iconWrapperStyle).toContain('animation-play-state: paused')
    });

    it(':reverse', () => {
      const wrapper = mount(() => (
          <Loading reverse={true}/>
      ));
      expect(wrapper.element).toMatchSnapshot();
      const iconWrapper = wrapper.find('.t-loading__gradient')
      const iconWrapperStyle = iconWrapper.attributes().style;
      expect(iconWrapperStyle).toContain('animation-direction: reverse')
    });
  })

  describe('slots', () => {
    it(':text', () => {
      const customLoading = 'custom-loading-text'
      const wrapper = mount(() => (
          <Loading>{{ text: () => <p className={customLoading}>{customLoading}</p> }}</Loading>
      ));
      const text = wrapper.find('.t-loading__text');
      expect(text.exists()).toBeTruthy();
      expect(text.element.innerHTML).toBe(`<p class="${customLoading}">${customLoading}</p>`);
    });
  })
})

describe('spinner.vue', () => {
  describe('render', () => {
    it(':text', () => {
      const wrapper = mount(() => (
          <Spinner/>
      ));
      expect(wrapper.element).toMatchSnapshot();
    });
  })
})

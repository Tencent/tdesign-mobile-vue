import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Loading from '../loading';
import Spinner from '../icon/spinner';
import { nextTick } from 'vue';

const sleep = (duration) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, duration),
  );

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

    it(':theme', () => {
      const wrapper = mount(() => <Loading theme={'spinner'} />);
      const icon = wrapper.findComponent(Spinner);
      expect(icon.exists()).toBeTruthy();
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

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
      expect(errorBlock.element.innerHTML).toBeTruthy('加载失败');
    });

    it(':inheritColor', () => {
      const wrapper = mount(() => (
        <div style={{ color: 'red' }}>
          <Loading inheritColor={true}/>
        </div>
      ));
      const block = wrapper.find('.t-loadin')
      // 这里是希望获取到元素的样式，但是获取不到，看 issue 中也有类似的问题，这里先保留
    });

    it(':pause', () => {
      const wrapper = mount(() => (
          <Loading pause={true}/>
      ));
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':reverse', () => {
      const wrapper = mount(() => (
          <Loading reverse={true}/>
      ));
      expect(wrapper.element).toMatchSnapshot();
    });
  })

  describe('slots', () => {
    it(':text', () => {
      const wrapper = mount(() => (
          <Loading text="text"/>
      ));
      const text = wrapper.find('.t-loading__text');
      expect(text.exists()).toBeTruthy();
    });
  })

  describe('functions', () => {
    it(':toBarPerc', () => {
      const wrapper = mount(() => (
          <Loading text="text"/>
      ));
      const text = wrapper.find('.t-loading');
    });
    // 同上
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

import { mount } from '@vue/test-utils';
import { vi, describe, it, expect } from 'vitest';
import { LoadingIcon } from 'tdesign-icons-vue-next';
import { nextTick } from 'vue';
import Image from '../image.vue';
import { MockIntersectionObserver } from './utils';

const prefix = 't'
const name = `${prefix}-image`;
const IMAGE = 'https://tdesign.gtimg.com/site/upload1.png';
const FAIL_IMAGE = 'https://123.jpg';
const fitList = ['fill', 'contain', 'cover', 'none', 'scale-down'];
const shapeList = ['circle', 'round', 'square'];
const positionList = ['top', 'bottom', 'center', 'left', 'right'];

describe('Image', () => {
  beforeAll(() => {
    window.IntersectionObserver = MockIntersectionObserver;
  });

  describe('props', () => {
    it(': lazy', async () => {
      const wrapper = mount(() => <Image src={IMAGE} lazy />);
      await nextTick();
      const $image = wrapper.find(`.${name}__img`);
      expect(wrapper.find(`.${name}__status`).exists()).toBeTruthy();
      // 触发 IntersectionObserver , 但图片加载完成不会触发 load 回调,
      $image.trigger('resize');
      await nextTick();
      expect($image.attributes('src')).toBe(IMAGE);
      // 手动触发 图片加载完成的回调函数
      await $image.trigger('load');
      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.find(`.${name}__status`).exists()).toBeFalsy();
    });

    it(': alt', async () => {
      const wrapper = mount(() => <Image src={IMAGE} alt="图片" />);
      const $image = wrapper.find(`.${name}__img`);
      expect(wrapper.classes()).toContain(`${name}`);
      expect($image.attributes('alt')).toBe('图片');
    });

    it(': fit', async () => {
      const wrapper = mount(Image, {
        props: {
          fit: '',
          src: IMAGE,
        }
      })
      const $image = wrapper.find(`.${name}__img`);
      // fit = ''
      fitList.forEach(item => {
        expect($image.attributes('style').includes(`object-fit: ${item}`)).toBeFalsy();
      })

      const fit = 'cover';
      await wrapper.setProps({
        fit,
      });
      // fit = 'square'
      expect($image.attributes('style')).toContain(`object-fit: ${fit}`);
    });

    it(': shape', async () => {
      const wrapper = mount(Image, {
        props: {
          shape: '',
          src: IMAGE,
        }
      })
      const $image = wrapper.findComponent(Image);

      // shape = ''
      shapeList.forEach(item => {
        expect($image.classes().includes(`${name}--${item}`)).toBeFalsy();
      })

      const shape = 'square';
      await wrapper.setProps({
        shape,
      });
      // shape = 'square'
      expect($image.classes()).toContain(`${name}--${shape}`);
    });

    it(': position', async () => {
      positionList.forEach((position) => {
        const wrapper = mount(() => <Image src={IMAGE} position={position} />);
        const $image = wrapper.find('.t-image__img');
        expect($image.attributes('style')).toContain(`object-position: ${position}`);
      });
    });

    it(': loading', async () => {
      const slots = {
        loading: () => <LoadingIcon />,
      };
      const wrapper = mount(() => <Image src={IMAGE} v-slots={slots} />);
      const $status = wrapper.find(`.${name}__status`);
      expect($status.exists()).toBeTruthy();
      expect(wrapper.findComponent(LoadingIcon).exists()).toBeTruthy();
    });

    it(': src', async () => {
      const onError = vi.fn();
      const wrapper = mount(() => <Image src='' onError={onError} />);
      await nextTick();
      const $image = wrapper.find(`.${name}__img`);
      // 手动触发 图片加载失败的回调函数
      await $image.trigger('error');
      expect(wrapper.find(`.${name}__status`).exists()).toBeTruthy();
      // src = ''，不会触发 error
      expect(onError).toBeCalledTimes(0);
    });

    it(': onError', async () => {
      const onError = vi.fn();
      const slots = {
        error: () => '加载失败',
      };
      const wrapper = mount(() => <Image src={FAIL_IMAGE} v-slots={slots} onError={onError} />);
      await nextTick();
      const $image = wrapper.find(`.${name}__img`);
      // 手动触发 图片加载失败的回调函数
      await $image.trigger('error');
      const status = wrapper.find(`.${name}__status`);
      expect(status.exists()).toBeTruthy();
      expect(status.text()).toBe('加载失败');
      expect(onError).toBeCalledTimes(1);
    });

    it(': onLoad', async () => {
      const onLoad = vi.fn();
      const wrapper = mount(() => <Image src={IMAGE} onLoad={onLoad} />);
      await nextTick();
      const $image = wrapper.find(`.${name}__img`);
      expect($image.attributes('src')).toBe(IMAGE);
      // 手动触发 图片加载完成的回调函数
      await $image.trigger('load');
      expect(onLoad).toBeCalledTimes(1);
    });
  });
});

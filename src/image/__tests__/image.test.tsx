import { mount } from '@vue/test-utils';
import { vi, describe, it, expect, beforeAll } from 'vitest';
import { LoadingIcon, CloseIcon } from 'tdesign-icons-vue-next';
import { nextTick } from 'vue';
import Image from '../image';

const prefix = 't';
const name = `${prefix}-image`;
const IMAGE = 'https://tdesign.gtimg.com/site/upload1.png';
const FAIL_IMAGE = 'https://123.jpg';
const fitList = ['fill', 'contain', 'cover', 'none', 'scale-down'];
const shapeList = ['circle', 'round', 'square'];
const positionList = ['top', 'bottom', 'center', 'left', 'right'];

class MockIntersectionObserver {
  _callback: Function;

  _element!: HTMLElement;

  constructor(callback: Function) {
    this._callback = callback;
  }

  observe(element: HTMLElement) {
    this._element = element;
    this._element.addEventListener('resize', this.trigger);
  }

  unobserve() {
    this._element.removeEventListener('resize', this.trigger);
  }

  disconnect() {
    this._element.removeEventListener('resize', this.trigger);
  }

  trigger = (event: UIEvent) => {
    this._callback([
      {
        isIntersecting: true,
      },
    ]);
  };
}

describe('Image', () => {
  beforeAll(() => {
    window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
  });

  describe('props', () => {
    it('src[string]', async () => {
      const onError = vi.fn();
      const wrapper = mount(() => <Image src="" onError={onError} />);
      await nextTick();
      const $image = wrapper.find(`.${name}__img`);
      // 手动触发 图片加载失败的回调函数
      await $image.trigger('error');
      // src = ''，不进入失败态，保持加载中遮罩，也不会触发 error
      expect(wrapper.find(`.${name}__mask`).exists()).toBeTruthy();
      expect(onError).toBeCalledTimes(0);
    });

    it('alt[string]', async () => {
      const wrapper = mount(() => <Image src={IMAGE} alt="图片" />);
      const $image = wrapper.find(`.${name}__img`);
      expect(wrapper.classes()).toContain(`${name}`);
      expect($image.attributes('alt')).toBe('图片');
    });

    it('fit[contain/cover/fill/none/scale-down]', async () => {
      const wrapper = mount(Image, {
        props: {
          fit: '',
          src: IMAGE,
        },
      });
      const $image = wrapper.find(`.${name}__img`);
      // fit = ''
      fitList.forEach((item) => {
        expect($image.attributes('style').includes(`object-fit: ${item}`)).toBeFalsy();
      });

      const fit = 'cover';
      await wrapper.setProps({
        fit,
      });
      // fit = 'cover'
      expect($image.attributes('style')).toContain(`object-fit: ${fit}`);
    });

    it('shape[circle/round/square]', async () => {
      const wrapper = mount(Image, {
        props: {
          shape: '',
          src: IMAGE,
        },
      });
      const $image = wrapper.findComponent(Image);

      // shape = ''
      shapeList.forEach((item) => {
        expect($image.classes().includes(`${name}--${item}`)).toBeFalsy();
      });

      const shape = 'square';
      await wrapper.setProps({
        shape,
      });
      // shape = 'square'
      expect($image.classes()).toContain(`${name}--${shape}`);
    });

    it('position[string]', async () => {
      positionList.forEach((position) => {
        const wrapper = mount(() => <Image src={IMAGE} position={position} />);
        const $image = wrapper.find('.t-image__img');
        expect($image.attributes('style')).toContain(`object-position: ${position}`);
      });
    });

    it('referrerpolicy[no-referrer/origin/same-origin/unsafe-url/...]', () => {
      const wrapper = mount(() => <Image src={IMAGE} referrerpolicy="no-referrer" />);
      const $image = wrapper.find(`.${name}__img`);
      expect($image.attributes('referrerpolicy')).toBe('no-referrer');
    });

    it('srcset[object]', () => {
      const srcset = {
        'image/avif': 'https://tdesign.gtimg.com/site/upload1.avif',
        'image/webp': 'https://tdesign.gtimg.com/site/upload1.webp',
      };
      const wrapper = mount(() => <Image src={IMAGE} srcset={srcset} />);
      const $sources = wrapper.findAll('picture source');
      expect($sources).toHaveLength(2);
      expect($sources[0].attributes('type')).toBe('image/avif');
      expect($sources[0].attributes('srcset')).toBe(srcset['image/avif']);
      expect($sources[1].attributes('type')).toBe('image/webp');
      expect($sources[1].attributes('srcset')).toBe(srcset['image/webp']);
    });

    it('lazy[boolean]', async () => {
      const wrapper = mount(() => <Image src={IMAGE} lazy />);
      await nextTick();
      const $image = wrapper.find(`.${name}__img`);
      expect(wrapper.find(`.${name}__mask`).exists()).toBeFalsy();
      // 触发 IntersectionObserver , 但图片加载完成不会触发 load 回调,
      $image.trigger('resize');
      await nextTick();
      expect($image.attributes('src')).toBe(IMAGE);
      // 手动触发 图片加载完成的回调函数
      await $image.trigger('load');
      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.find(`.${name}__mask`).exists()).toBeFalsy();
    });

    it('fallback[string]', async () => {
      const onError = vi.fn();
      const wrapper = mount(() => <Image src={FAIL_IMAGE} fallback={IMAGE} onError={onError} />);
      await nextTick();
      const $image = wrapper.find(`.${name}__img`);
      // 手动触发 图片加载失败的回调函数
      await $image.trigger('error');
      expect($image.attributes('src')).toBe(IMAGE);
    });
    // TODO: loading/error 仅设置 prop 时组件不渲染（mask 以 slots 为门槛），待组件修复后补充 prop 通道用例
    it.todo(':loading[string]');
    it.todo(':loading[function]');
    it.todo(':error[string]');
    it.todo(':error[function]');
  });

  describe('events', () => {
    it('load', async () => {
      const onLoad = vi.fn();
      const wrapper = mount(() => <Image src={IMAGE} onLoad={onLoad} />);
      await nextTick();
      const $image = wrapper.find(`.${name}__img`);
      expect($image.attributes('src')).toBe(IMAGE);
      // 手动触发 图片加载完成的回调函数
      await $image.trigger('load');
      expect(onLoad).toBeCalledTimes(1);
    });

    it('error', async () => {
      const onError = vi.fn();
      const wrapper = mount(() => <Image src={FAIL_IMAGE} onError={onError} />);
      await nextTick();
      const $image = wrapper.find(`.${name}__img`);
      // 手动触发 图片加载失败的回调函数
      await $image.trigger('error');
      expect(onError).toBeCalledTimes(1);
    });
  });

  describe('slots', () => {
    it('loading', () => {
      const slots = {
        loading: () => <LoadingIcon />,
      };
      const wrapper = mount(() => <Image src={IMAGE} v-slots={slots} />);
      const $status = wrapper.find(`.${name}__mask`);
      expect($status.exists()).toBeTruthy();
      expect(wrapper.findComponent(LoadingIcon).exists()).toBeTruthy();
    });

    it('error', async () => {
      const slots = {
        error: () => '加载失败',
      };
      const wrapper = mount(() => <Image src={FAIL_IMAGE} v-slots={slots} />);
      await nextTick();
      const $image = wrapper.find(`.${name}__img`);
      // 手动触发 图片加载失败的回调函数
      await $image.trigger('error');
      const status = wrapper.find(`.${name}__mask`);
      expect(status.exists()).toBeTruthy();
      expect(status.text()).toBe('加载失败');
    });
  });

  describe('scenarios', () => {
    describe('状态流转', () => {
      it('默认加载中状态展示 loading 图标，加载完成后遮罩消失', async () => {
        const wrapper = mount(() => <Image src={IMAGE} />);
        await nextTick();
        const $image = wrapper.find(`.${name}__img`);
        expect(wrapper.find(`.${name}__mask`).exists()).toBeTruthy();
        await $image.trigger('load');
        expect(wrapper.find(`.${name}__mask`).exists()).toBeFalsy();
      });

      it('加载失败后默认展示关闭图标', async () => {
        const wrapper = mount(() => <Image src={FAIL_IMAGE} />);
        await nextTick();
        const $image = wrapper.find(`.${name}__img`);
        await $image.trigger('error');
        const $status = wrapper.find(`.${name}__mask`);
        expect($status.exists()).toBeTruthy();
        expect(wrapper.findComponent(CloseIcon).exists()).toBeTruthy();
      });
    });

    describe('prop 与 slot 优先级', () => {
      it('loading 同时设置 prop 与 slot 时优先渲染 prop 内容', () => {
        const slots = {
          loading: () => 'SLOT加载中',
        };
        const wrapper = mount(() => <Image src={IMAGE} loading="PROP加载中" v-slots={slots} />);
        const $status = wrapper.find(`.${name}__mask`);
        expect($status.exists()).toBeTruthy();
        expect($status.text()).toBe('PROP加载中');
      });

      it('error 同时设置 prop 与 slot 时优先渲染 prop 内容', async () => {
        const slots = {
          error: () => 'SLOT加载失败',
        };
        const wrapper = mount(() => <Image src={FAIL_IMAGE} error="PROP加载失败" v-slots={slots} />);
        await nextTick();
        await wrapper.find(`.${name}__img`).trigger('error');
        const $status = wrapper.find(`.${name}__mask`);
        expect($status.exists()).toBeTruthy();
        expect($status.text()).toBe('PROP加载失败');
      });
    });
  });
});

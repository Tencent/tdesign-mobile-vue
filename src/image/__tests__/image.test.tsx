import { enableAutoUnmount, mount } from '@vue/test-utils';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { LoadingIcon, CloseIcon } from 'tdesign-icons-vue-next';
import { nextTick } from 'vue';
import Image from '../image';
import type { TdImageProps } from '../type';

const prefix = 't';
const name = `${prefix}-image`;
const IMAGE = 'https://tdesign.gtimg.com/site/upload1.png';
const FAIL_IMAGE = 'https://123.jpg';
const fitList = ['fill', 'contain', 'cover', 'none', 'scale-down'] as const;
const shapeList = ['circle', 'round', 'square'] as const;
const positionList = ['top', 'bottom', 'center', 'left', 'right'];

const observers: MockIntersectionObserver[] = [];

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;

  readonly rootMargin = '0px';

  readonly scrollMargin = '0px';

  readonly thresholds = [0];

  readonly targets = new Set<Element>();

  constructor(private callback: (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void) {
    observers.push(this);
  }

  observe = vi.fn((element: Element) => {
    this.targets.add(element);
  });

  unobserve = vi.fn((element: Element) => {
    this.targets.delete(element);
  });

  disconnect = vi.fn(() => {
    this.targets.clear();
  });

  takeRecords = vi.fn((): IntersectionObserverEntry[] => []);

  intersect(element: Element, isIntersecting: boolean) {
    this.callback([{ target: element, isIntersecting } as IntersectionObserverEntry], this);
  }
}

enableAutoUnmount(afterEach);

describe('Image', () => {
  beforeEach(() => {
    observers.length = 0;
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('props', () => {
    it('alt[string]', async () => {
      const wrapper = mount(() => <Image src={IMAGE} alt="图片" />);
      const $image = wrapper.find(`.${name}__img`);
      expect(wrapper.classes()).toContain(`${name}`);
      expect($image.attributes('alt')).toBe('图片');
    });

    // mask 渲染以 slots 为门槛，仅设置 Prop 时仍展示默认图标。
    it.todo('error[string]');
    it.todo('error[function]');
    it('error[slot]', async () => {
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

    it('fallback[string]', async () => {
      const onError = vi.fn();
      const wrapper = mount(() => <Image src={FAIL_IMAGE} fallback={IMAGE} onError={onError} />);
      await nextTick();
      const $image = wrapper.find(`.${name}__img`);
      // 手动触发 图片加载失败的回调函数
      await $image.trigger('error');
      expect($image.attributes('src')).toBe(IMAGE);
      expect(onError).toHaveBeenCalledWith({ e: expect.any(Event) });
      expect(wrapper.find(`.${name}__mask`).exists()).toBe(false);
    });

    it('fit[contain/cover/fill/none/scale-down]', async () => {
      const wrapper = mount(Image, {
        props: {
          src: IMAGE,
        },
      });
      const $image = wrapper.find(`.${name}__img`);
      // fit 默认 fill
      expect($image.attributes('style')).toContain('object-fit: fill');
      fitList
        .filter((fit) => fit !== 'fill')
        .forEach((item) => {
          expect($image.attributes('style').includes(`object-fit: ${item}`)).toBeFalsy();
        });

      await Promise.all(
        fitList.map(async (fit) => {
          const fitted = mount(Image, { props: { src: IMAGE } });
          await fitted.setProps({ fit });
          expect(fitted.get('img').element.style.objectFit).toBe(fit);
        }),
      );
    });

    it('lazy[boolean]', async () => {
      const wrapper = mount(() => <Image src={IMAGE} lazy />);
      await nextTick();
      const $image = wrapper.find(`.${name}__img`);
      expect(wrapper.find(`.${name}__mask`).exists()).toBeFalsy();
      expect($image.attributes('src')).toBe('');
      const observer = observers.find((item) => item.targets.has($image.element));
      expect(observer).toBeDefined();
      observer.intersect($image.element, false);
      await nextTick();
      expect($image.attributes('src')).toBe('');
      observer.intersect($image.element, true);
      await nextTick();
      expect($image.attributes('src')).toBe(IMAGE);
      expect(observer.disconnect).toHaveBeenCalledTimes(1);
      expect(wrapper.find(`.${name}__mask`).exists()).toBe(true);
      // 手动触发 图片加载完成的回调函数
      await $image.trigger('load');
      expect(wrapper.find(`.${name}__mask`).exists()).toBeFalsy();
    });

    // mask 渲染以 slots 为门槛，组件未读取 loading 属性，仅设置 Prop 时仍展示默认图标。
    it.todo('loading[string]');
    it.todo('loading[function]');
    it('loading[slot]', () => {
      const slots = {
        loading: () => <LoadingIcon />,
      };
      const wrapper = mount(() => <Image src={IMAGE} v-slots={slots} />);
      const $status = wrapper.find(`.${name}__mask`);
      expect($status.exists()).toBeTruthy();
      expect(wrapper.findComponent(LoadingIcon).exists()).toBeTruthy();
    });

    it('position[string]', async () => {
      positionList.forEach((position) => {
        const wrapper = mount(() => <Image src={IMAGE} position={position} />);
        const $image = wrapper.find('.t-image__img');
        expect($image.attributes('style')).toContain(`object-position: ${position}`);
      });
    });

    it('referrerpolicy[string]', () => {
      const policies: TdImageProps['referrerpolicy'][] = [
        'no-referrer',
        'no-referrer-when-downgrade',
        'origin',
        'origin-when-cross-origin',
        'same-origin',
        'strict-origin',
        'strict-origin-when-cross-origin',
        'unsafe-url',
      ];
      policies.forEach((referrerpolicy) => {
        const wrapper = mount(Image, { props: { src: IMAGE, referrerpolicy } });
        expect(wrapper.get('img').attributes('referrerpolicy')).toBe(referrerpolicy);
      });
    });

    it('shape[circle/round/square]', async () => {
      const wrapper = mount(Image, {
        props: {
          src: IMAGE,
        },
      });
      const $image = wrapper.findComponent(Image);

      // shape 默认 square
      expect($image.classes()).toContain(`${name}--square`);
      shapeList
        .filter((shape) => shape !== 'square')
        .forEach((item) => {
          expect($image.classes().includes(`${name}--${item}`)).toBeFalsy();
        });

      await Promise.all(
        shapeList.map(async (shape) => {
          const shaped = mount(Image, { props: { src: IMAGE } });
          await shaped.setProps({ shape });
          expect(shaped.classes()).toContain(`${name}--${shape}`);
          shapeList
            .filter((value) => value !== shape)
            .forEach((value) => {
              expect(shaped.classes()).not.toContain(`${name}--${value}`);
            });
        }),
      );
    });

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

      const valid = mount(Image, { props: { src: IMAGE } });
      expect(valid.get('img').attributes('src')).toBe(IMAGE);
      await valid.setProps({ src: FAIL_IMAGE });
      expect(valid.get('img').attributes('src')).toBe(FAIL_IMAGE);
    });

    it('srcset[object]', async () => {
      const srcset = {
        'image/avif': 'https://tdesign.gtimg.com/site/upload1.avif',
        'image/webp': 'https://tdesign.gtimg.com/site/upload1.webp',
      };
      const wrapper = mount(Image, { props: { src: IMAGE, srcset } });
      const $sources = wrapper.findAll('picture source');
      expect($sources).toHaveLength(2);
      expect($sources[0].attributes('type')).toBe('image/avif');
      expect($sources[0].attributes('srcset')).toBe(srcset['image/avif']);
      expect($sources[1].attributes('type')).toBe('image/webp');
      expect($sources[1].attributes('srcset')).toBe(srcset['image/webp']);
      expect(wrapper.get('picture img').attributes('src')).toBe(IMAGE);
      await wrapper.setProps({ srcset: undefined });
      expect(wrapper.find('source').exists()).toBe(false);
      expect(wrapper.get('picture img').attributes('src')).toBe(IMAGE);
    });
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
      expect(onLoad).toHaveBeenCalledWith({ e: expect.any(Event) });
    });

    it('error', async () => {
      const onError = vi.fn();
      const wrapper = mount(() => <Image src={FAIL_IMAGE} onError={onError} />);
      await nextTick();
      const $image = wrapper.find(`.${name}__img`);
      // 手动触发 图片加载失败的回调函数
      await $image.trigger('error');
      expect(onError).toBeCalledTimes(1);
      expect(onError).toHaveBeenCalledWith({ e: expect.any(Event) });
    });
  });

  describe('scenarios', () => {
    it('shows loading and error slots only in their respective states', async () => {
      const wrapper = mount(Image, {
        props: { src: IMAGE },
        slots: {
          loading: () => <span class="custom-loading">正在加载</span>,
          error: () => <span class="custom-error">图片失败</span>,
        },
      });
      expect(wrapper.get('.custom-loading').text()).toBe('正在加载');
      expect(wrapper.find('.custom-error').exists()).toBe(false);
      await wrapper.get('img').trigger('error');
      expect(wrapper.find('.custom-loading').exists()).toBe(false);
      expect(wrapper.get('.custom-error').text()).toBe('图片失败');
    });

    it('fallback replaces a failed source instead of rendering the error slot', async () => {
      const wrapper = mount(Image, {
        props: { src: FAIL_IMAGE, fallback: IMAGE },
        slots: { error: () => <span class="custom-error">图片失败</span> },
      });
      await wrapper.get('img').trigger('error');
      expect(wrapper.get('img').attributes('src')).toBe(IMAGE);
      expect(wrapper.find('.custom-error').exists()).toBe(false);
      expect(wrapper.find(`.${name}__mask`).exists()).toBe(false);
    });

    it('does not report errors before a lazy image enters the viewport', async () => {
      const onError = vi.fn();
      const wrapper = mount(Image, { props: { src: IMAGE, lazy: true, onError } });
      await nextTick();
      await wrapper.get('img').trigger('error');
      expect(onError).not.toHaveBeenCalled();
      expect(wrapper.find(`.${name}__mask`).exists()).toBe(false);
    });

    it('disabling lazy loading loads the source without waiting for intersection', async () => {
      const wrapper = mount(Image, { props: { src: IMAGE, lazy: true } });
      expect(wrapper.get('img').attributes('src')).toBe('');
      await wrapper.setProps({ lazy: false });
      expect(wrapper.get('img').attributes('src')).toBe(IMAGE);
      expect(wrapper.find(`.${name}__mask`).exists()).toBe(true);
    });

    it('disconnects the observer when unmounted before intersection', async () => {
      const wrapper = mount(Image, { props: { src: IMAGE, lazy: true } });
      await nextTick();
      const observer = observers.find((item) => item.targets.has(wrapper.get('img').element));
      expect(observer).toBeDefined();
      wrapper.unmount();
      expect(observer.disconnect).toHaveBeenCalledTimes(1);
      expect(observer.targets.size).toBe(0);
    });

    // src 更新只修改 realSrc，没有重置 isLoading/isError。
    it.todo('resets loading and error state when the image source changes');

    describe('state transitions', () => {
      it('shows the loading icon while loading and hides the mask once loaded', async () => {
        const wrapper = mount(() => <Image src={IMAGE} />);
        await nextTick();
        const $image = wrapper.find(`.${name}__img`);
        expect(wrapper.find(`.${name}__mask`).exists()).toBeTruthy();
        await $image.trigger('load');
        expect(wrapper.find(`.${name}__mask`).exists()).toBeFalsy();
      });

      it('shows the close icon after loading fails', async () => {
        const wrapper = mount(() => <Image src={FAIL_IMAGE} />);
        await nextTick();
        const $image = wrapper.find(`.${name}__img`);
        await $image.trigger('error');
        const $status = wrapper.find(`.${name}__mask`);
        expect($status.exists()).toBeTruthy();
        expect(wrapper.findComponent(CloseIcon).exists()).toBeTruthy();
      });
    });
  });
});

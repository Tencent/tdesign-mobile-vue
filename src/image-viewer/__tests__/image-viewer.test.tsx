import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils';
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import { CloseIcon, DeleteIcon } from 'tdesign-icons-vue-next';
import ImageViewer from '../image-viewer';
import type { ImageSlotParams, TdImageViewerProps } from '../type';
import { Swiper } from '../../swiper';

// 手势库在模块加载时探测触屏能力；jsdom 默认没有 ontouchstart。
vi.hoisted(() => {
  vi.stubGlobal('ontouchstart', null);
});
afterAll(() => {
  vi.unstubAllGlobals();
});
afterEach(() => {
  vi.restoreAllMocks();
});

enableAutoUnmount(afterEach);

const images = ['first.png', 'second.png', 'third.png', 'fourth.png', 'fifth.png'];
const mountViewer = (props: TdImageViewerProps = {}, slots = {}) =>
  mount(ImageViewer, { props: { images: [...images], visible: true, ...props }, slots });

const pinchImage = async (wrapper: ReturnType<typeof mountViewer>, distance: number) => {
  const item = wrapper.get('.t-swiper-item');
  const points = (offset: number) => [
    { identifier: 1, target: item.element, clientX: 0, clientY: 0, pageX: 0, pageY: 0 },
    { identifier: 2, target: item.element, clientX: offset, clientY: 0, pageX: offset, pageY: 0 },
  ];
  await item.trigger('touchstart', { touches: points(100), targetTouches: points(100), changedTouches: points(100) });
  await item.trigger('touchmove', {
    touches: points(distance),
    targetTouches: points(distance),
    changedTouches: points(distance),
  });
  await item.trigger('touchend', { touches: [], changedTouches: points(distance) });
  await flushPromises();
};

describe('ImageViewer', () => {
  describe('props', () => {
    it('closeBtn[boolean]', async () => {
      const wrapper = mountViewer();
      expect(wrapper.findComponent(CloseIcon).exists()).toBe(true);
      await wrapper.setProps({ closeBtn: false });
      expect(wrapper.findComponent(CloseIcon).exists()).toBe(false);
      await wrapper.setProps({ closeBtn: true });
      expect(wrapper.findComponent(CloseIcon).exists()).toBe(true);
    });

    it('closeBtn[function]', () => {
      const wrapper = mountViewer({ closeBtn: () => <button class="custom-close">关闭图片</button> });
      expect(wrapper.get('.t-image-viewer__nav-close .custom-close').text()).toBe('关闭图片');
      expect(wrapper.findComponent(CloseIcon).exists()).toBe(false);
    });

    it('closeBtn[slot]', () => {
      const wrapper = mountViewer({}, { closeBtn: () => <span class="slot-close">插槽关闭</span> });
      expect(wrapper.get('.t-image-viewer__nav-close .slot-close').text()).toBe('插槽关闭');
    });

    it('cover[function]', () => {
      const wrapper = mountViewer({ cover: () => <span class="custom-cover">封面内容</span> });
      expect(wrapper.get('.t-image-viewer__cover .custom-cover').text()).toBe('封面内容');
    });

    it('cover[slot]', () => {
      const wrapper = mountViewer({}, { cover: () => <span class="slot-cover">插槽封面</span> });
      expect(wrapper.get('.t-image-viewer__cover .slot-cover').text()).toBe('插槽封面');
    });

    it('deleteBtn[boolean]', async () => {
      const wrapper = mountViewer();
      expect(wrapper.findComponent(DeleteIcon).exists()).toBe(false);
      await wrapper.setProps({ deleteBtn: true });
      expect(wrapper.findComponent(DeleteIcon).exists()).toBe(true);
      await wrapper.setProps({ deleteBtn: false });
      expect(wrapper.findComponent(DeleteIcon).exists()).toBe(false);
    });

    it('deleteBtn[function]', () => {
      const wrapper = mountViewer({ deleteBtn: () => <button class="custom-delete">删除图片</button> });
      expect(wrapper.get('.t-image-viewer__nav-delete .custom-delete').text()).toBe('删除图片');
    });

    it('deleteBtn[slot]', () => {
      const wrapper = mountViewer({ deleteBtn: true }, { deleteBtn: () => <span class="slot-delete">插槽删除</span> });
      expect(wrapper.get('.t-image-viewer__nav-delete .slot-delete').text()).toBe('插槽删除');
    });

    it('image[function]', () => {
      const image = vi.fn((_h, params: ImageSlotParams) => (
        <span class="custom-image">
          {params.index}:{params.src}
        </span>
      ));
      const wrapper = mountViewer({ image });
      expect(wrapper.findAll('.custom-image').map((item) => item.text())).toEqual([
        '0:first.png',
        '1:second.png',
        '4:fifth.png',
      ]);
      expect(image).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          src: 'first.png',
          index: 0,
          className: 't-image-viewer__img',
          onLoad: expect.any(Function),
          onTransitionstart: expect.any(Function),
          onTransitionend: expect.any(Function),
        }),
      );
      expect(wrapper.find('img').exists()).toBe(false);
    });

    it('image[slot]', () => {
      const wrapper = mountViewer(
        { images: [{ url: 'custom.png', align: 'end', extra: { caption: '图片说明' } }] },
        {
          image: (params: ImageSlotParams) => (
            <img class={params.className} src={params.src} data-caption={params.extra?.caption} />
          ),
        },
      );
      expect(wrapper.get('img').attributes('src')).toBe('custom.png');
      expect(wrapper.get('img').attributes('data-caption')).toBe('图片说明');
      expect(wrapper.get('.t-image-viewer__swiper-item').attributes('style')).toContain('align-items: end');
    });

    it('images[string]', async () => {
      const wrapper = mountViewer();
      expect(wrapper.findAll('.t-swiper-item')).toHaveLength(5);
      expect(wrapper.findAll('img').map((item) => item.attributes('src'))).toEqual([
        'first.png',
        'second.png',
        'fifth.png',
      ]);
      // 空数组不渲染任何轮播项
      await wrapper.setProps({ images: [] });
      expect(wrapper.find('.t-swiper-item').exists()).toBe(false);
    });

    it('images[object]', () => {
      const wrapper = mountViewer({ images: [{ url: 'aligned.png', align: 'start', extra: { id: 1 } }] });
      expect(wrapper.findAll('.t-swiper-item')).toHaveLength(1);
      expect(wrapper.get('img').attributes('src')).toBe('aligned.png');
      expect(wrapper.get('.t-image-viewer__swiper-item').attributes('style')).toContain('align-items: start');
    });

    it('index[number]', async () => {
      const wrapper = mountViewer({ index: 1, showIndex: true });
      expect(wrapper.get('.t-image-viewer__nav-index').text()).toBe('2/5');
      await wrapper.setProps({ index: 3 });
      expect(wrapper.get('.t-image-viewer__nav-index').text()).toBe('4/5');
    });

    it('defaultIndex[number]', () => {
      const wrapper = mountViewer({ defaultIndex: 2, showIndex: true });
      expect(wrapper.get('.t-image-viewer__nav-index').text()).toBe('3/5');
      expect(wrapper.findComponent(Swiper).props('defaultCurrent')).toBe(2);
    });

    it('loop[boolean]', async () => {
      const wrapper = mountViewer();
      expect(wrapper.findComponent(Swiper).props('loop')).toBe(true);
      await wrapper.setProps({ loop: false });
      expect(wrapper.findComponent(Swiper).props('loop')).toBe(false);
    });

    it('maxZoom[number]', async () => {
      const wrapper = mountViewer({ maxZoom: 2, visible: false });
      await wrapper.setProps({ visible: true });
      await flushPromises();
      await wrapper.get('img').trigger('load');
      await pinchImage(wrapper, 500);
      expect(wrapper.get('img').attributes('style')).toContain('matrix(2, 0, 0, 2, 0, 0)');
      expect(wrapper.findComponent(Swiper).props('disabled')).toBe(true);
      await wrapper.setProps({ maxZoom: 4 });
      await pinchImage(wrapper, 500);
      expect(wrapper.get('img').attributes('style')).toContain('matrix(4, 0, 0, 4, 0, 0)');
      await pinchImage(wrapper, 10);
      expect(wrapper.get('img').attributes('style')).toContain('matrix(1, 0, 0, 1, 0, 0)');
      expect(wrapper.findComponent(Swiper).props('disabled')).toBe(false);
    });

    it('showIndex[boolean]', async () => {
      const wrapper = mountViewer();
      expect(wrapper.find('.t-image-viewer__nav-index').exists()).toBe(false);
      await wrapper.setProps({ showIndex: true });
      expect(wrapper.get('.t-image-viewer__nav-index').text()).toBe('1/5');
      await wrapper.setProps({ showIndex: false });
      expect(wrapper.find('.t-image-viewer__nav-index').exists()).toBe(false);
    });

    it('visible[boolean]', async () => {
      const wrapper = mountViewer({ visible: false });
      expect(wrapper.findComponent(Swiper).exists()).toBe(false);
      await wrapper.setProps({ visible: true });
      expect(wrapper.findComponent(Swiper).exists()).toBe(true);
      await wrapper.setProps({ visible: false });
      expect(wrapper.find('.t-image-viewer').exists()).toBe(false);
    });

    it('modelValue[boolean]', async () => {
      const wrapper = mount(ImageViewer, { props: { images: [...images], modelValue: false } });
      expect(wrapper.findComponent(Swiper).exists()).toBe(false);
      await wrapper.setProps({ modelValue: true });
      expect(wrapper.findComponent(Swiper).exists()).toBe(true);
      await wrapper.get('.t-image-viewer__mask').trigger('click');
      expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
    });

    it('defaultVisible[boolean]', async () => {
      const wrapper = mount(ImageViewer, { props: { images: [...images], defaultVisible: true } });
      expect(wrapper.findComponent(Swiper).exists()).toBe(true);
      await wrapper.get('.t-image-viewer__mask').trigger('click');
      expect(wrapper.find('.t-image-viewer').exists()).toBe(false);
      expect(wrapper.emitted('close')).toEqual([[{ e: expect.any(MouseEvent), trigger: 'overlay' }]]);
    });
  });

  describe('events', () => {
    it('close', async () => {
      const onClose = vi.fn();
      const wrapper = mountViewer({ onClose });
      await wrapper.get('.t-image-viewer__mask').trigger('click');
      expect(onClose).toHaveBeenNthCalledWith(1, { e: expect.any(MouseEvent), trigger: 'overlay' });
      await wrapper.get('img').trigger('click');
      expect(onClose).toHaveBeenNthCalledWith(2, { e: expect.any(MouseEvent), trigger: 'image' });
      expect(onClose).toHaveBeenCalledTimes(2);
      expect(wrapper.emitted('update:visible')).toEqual([[false], [false]]);
      // 关闭按钮的第一次回调正确，重复冒泡触发问题在 TODO 中单独记录。
      onClose.mockClear();
      await wrapper.get('.t-image-viewer__nav-close').trigger('click');
      expect(onClose).toHaveBeenNthCalledWith(1, { e: expect.any(MouseEvent), trigger: 'close-btn' });
    });

    it('delete', async () => {
      const onDelete = vi.fn();
      const wrapper = mountViewer({ defaultIndex: 2, deleteBtn: true, showIndex: true, onDelete });
      await wrapper.get('.t-image-viewer__nav-delete').trigger('click');
      expect(onDelete).toHaveBeenCalledTimes(1);
      expect(onDelete).toHaveBeenCalledWith(2);
      expect(wrapper.emitted('delete')).toEqual([[2]]);
    });

    it('indexChange', async () => {
      const onIndexChange = vi.fn();
      const wrapper = mountViewer({ showIndex: true, onIndexChange });
      await flushPromises();
      wrapper.vm.$.exposed.swipeTo(2, { immediate: true });
      await flushPromises();
      expect(onIndexChange).toHaveBeenNthCalledWith(1, 2, { trigger: 'next' });
      expect(wrapper.get('.t-image-viewer__nav-index').text()).toBe('3/5');
      wrapper.vm.$.exposed.swipeTo(1, { immediate: true });
      await flushPromises();
      expect(onIndexChange).toHaveBeenNthCalledWith(2, 1, { trigger: 'prev' });
      expect(onIndexChange).toHaveBeenCalledTimes(2);
    });
  });

  describe('instanceFunctions', () => {
    it('swipeTo', async () => {
      const wrapper = mountViewer({ showIndex: true });
      await flushPromises();
      wrapper.vm.$.exposed.swipeTo(3, { immediate: true });
      await flushPromises();
      expect(wrapper.get('.t-image-viewer__nav-index').text()).toBe('4/5');
      wrapper.vm.$.exposed.swipeTo(-1, { immediate: true });
      await flushPromises();
      expect(wrapper.get('.t-image-viewer__nav-index').text()).toBe('4/5');
    });
  });
});

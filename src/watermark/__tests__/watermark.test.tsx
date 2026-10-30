import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import Watermark from '../watermark';

describe('Watermark', () => {
  beforeAll(() => {
    // mock canvas 2d context，使 generateBase64Url 同步回调并注入水印层
    const noop = () => {};
    const ctx = {
      translate: noop,
      rotate: noop,
      fillRect: noop,
      fillText: noop,
      drawImage: noop,
      save: noop,
      restore: noop,
    };
    HTMLCanvasElement.prototype.getContext = vi.fn(() => ctx as unknown as CanvasRenderingContext2D);
    HTMLCanvasElement.prototype.toDataURL = vi.fn(() => 'data:image/png;base64,mock');
  });

  describe('props', () => {
    it('alpha[number]', () => {
      const wrapper = mount(() => (
        <Watermark alpha={0.5} watermarkContent={[{ text: '水印文字' }]}>
          tdesign
        </Watermark>
      ));
      expect(wrapper.classes()).toContain('t-watermark');
    });

    it('content[string]', () => {
      const wrapper = mount(() => <Watermark content="水印覆盖的内容" />);
      expect(wrapper.classes()).toContain('t-watermark');
      expect(wrapper.text()).toContain('水印覆盖的内容');
    });

    it('content[function]', () => {
      const wrapper = mount(() => <Watermark content={() => '函数水印内容'} />);
      expect(wrapper.text()).toContain('函数水印内容');
    });

    it('isRepeat[boolean]', () => {
      const wrapper = mount(() => (
        <Watermark isRepeat={false} watermarkContent={[{ text: '水印文字' }]}>
          tdesign
        </Watermark>
      ));
      const $mark = wrapper.find('.t-watermark > div');
      expect($mark.attributes('style')).toContain('background-repeat: no-repeat');
    });

    it('layout[rectangular/hexagonal]', () => {
      const wrapper = mount(() => (
        <Watermark layout="hexagonal" watermarkContent={[{ text: '水印文字' }]}>
          tdesign
        </Watermark>
      ));
      expect(wrapper.classes()).toContain('t-watermark');
    });

    it('lineSpace[number]', () => {
      const wrapper = mount(() => (
        <Watermark lineSpace={10} watermarkContent={[{ text: '多行水印' }, { text: '第二行' }]}>
          tdesign
        </Watermark>
      ));
      expect(wrapper.classes()).toContain('t-watermark');
    });

    it('movable[boolean] & moveInterval[number]', () => {
      const wrapper = mount(() => (
        <Watermark movable moveInterval={1000} watermarkContent={[{ text: '水印文字' }]}>
          tdesign
        </Watermark>
      ));
      const $mark = wrapper.find('.t-watermark > div');
      expect($mark.attributes('style')).toContain('animation: watermark infinite');
    });

    it('offset[array]', () => {
      const wrapper = mount(() => (
        <Watermark offset={[10, 20]} watermarkContent={[{ text: '水印文字' }]}>
          tdesign
        </Watermark>
      ));
      expect(wrapper.classes()).toContain('t-watermark');
    });

    it('removable[boolean]', () => {
      const wrapper = mount(() => (
        <Watermark removable={false} watermarkContent={[{ text: '水印文字' }]}>
          tdesign
        </Watermark>
      ));
      expect(wrapper.classes()).toContain('t-watermark');
    });

    it('rotate[number]', () => {
      const wrapper = mount(() => (
        <Watermark rotate={-30} watermarkContent={[{ text: '水印文字' }]}>
          tdesign
        </Watermark>
      ));
      expect(wrapper.classes()).toContain('t-watermark');
    });

    it('watermarkContent', () => {
      // canvas 绘制内容在 jsdom 中无法断言，验证属性透传不崩溃
      const wrapper = mount(() => <Watermark watermarkContent={[{ text: '水印文字' }]}>tdesign</Watermark>);
      expect(wrapper.classes()).toContain('t-watermark');
    });

    it('width[number] & height[number]', () => {
      const wrapper = mount(() => (
        <Watermark width={120} height={64} watermarkContent={[{ text: '水印文字' }]}>
          tdesign
        </Watermark>
      ));
      // 尺寸参与 canvas 绘制，jsdom 下验证注入的水印层背景图生成
      const $mark = wrapper.find('.t-watermark > div');
      expect($mark.attributes('style')).toContain('background-image');
    });

    it('x[number]', () => {
      const wrapper = mount(() => (
        <Watermark x={24} width={100} height={40} watermarkContent={[{ text: '水印文字' }]}>
          tdesign
        </Watermark>
      ));
      // 水平间距参与水印层背景尺寸计算：background-size = x + width
      const $mark = wrapper.find('.t-watermark > div');
      expect($mark.attributes('style')).toContain('background-size: 124px');
    });

    it('y[number]', () => {
      // 垂直间距参与水印画布高度计算，通过 createElement 捕获内部 canvas 断言
      const createElementSpy = vi.spyOn(document, 'createElement');
      mount(() => (
        <Watermark x={24} y={48} width={100} height={40} watermarkContent={[{ text: '水印文字' }]}>
          tdesign
        </Watermark>
      ));
      const canvas = createElementSpy.mock.results
        .map((result) => result.value)
        .find((el) => el instanceof HTMLCanvasElement);
      // 画布高度 = y + height
      expect(canvas.style.height).toBe('88px');
      createElementSpy.mockRestore();
    });

    it('zIndex[number]', () => {
      const wrapper = mount(() => (
        <Watermark zIndex={100} watermarkContent={[{ text: '水印文字' }]}>
          tdesign
        </Watermark>
      ));
      const $mark = wrapper.find('.t-watermark > div');
      expect($mark.attributes('style')).toContain('z-index: 100');
    });
  });

  describe('slots', () => {
    it('default', () => {
      const wrapper = mount(() => (
        <Watermark
          watermarkContent={[{ text: '水印文字' }]}
          v-slots={{ default: () => <div class="covered">被覆盖内容</div> }}
        />
      ));
      expect(wrapper.find('.covered').exists()).toBeTruthy();
    });
  });
});

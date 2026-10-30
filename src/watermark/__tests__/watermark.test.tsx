import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { h } from 'vue';
import Watermark from '../watermark';

describe('Watermark', () => {
  beforeAll(() => {
    HTMLCanvasElement.prototype.getContext = vi.fn();
  });

  describe('props', () => {
    it('content[string]', () => {
      const wrapper = mount(() => <Watermark content="水印覆盖的内容" />);
      expect(wrapper.classes()).toContain('t-watermark');
      expect(wrapper.text()).toContain('水印覆盖的内容');
    });

    it('content[function]', () => {
      const wrapper = mount(() => <Watermark content={() => '函数水印内容'} />);
      expect(wrapper.text()).toContain('函数水印内容');
    });

    it('watermarkContent', () => {
      // canvas 绘制内容在 jsdom 中无法断言，验证属性透传不崩溃
      const wrapper = mount(() => <Watermark watermarkContent={[{ text: '水印文字' }]}>tdesign</Watermark>);
      expect(wrapper.classes()).toContain('t-watermark');
    });

    it('alpha[number]', () => {
      const wrapper = mount(() => (
        <Watermark alpha={0.5} watermarkContent={[{ text: '水印文字' }]}>
          tdesign
        </Watermark>
      ));
      expect(wrapper.classes()).toContain('t-watermark');
    });

    it('width[number] & height[number]', () => {
      const wrapper = mount(() => (
        <Watermark width={120} height={64} watermarkContent={[{ text: '水印文字' }]}>
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

    it('offset[array]', () => {
      const wrapper = mount(() => (
        <Watermark offset={[10, 20]} watermarkContent={[{ text: '水印文字' }]}>
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

    it('layout[rectangular/hexagonal]', () => {
      const wrapper = mount(() => (
        <Watermark layout="hexagonal" watermarkContent={[{ text: '水印文字' }]}>
          tdesign
        </Watermark>
      ));
      expect(wrapper.classes()).toContain('t-watermark');
    });

    it('isRepeat[boolean]', () => {
      const wrapper = mount(() => (
        <Watermark isRepeat={false} watermarkContent={[{ text: '水印文字' }]}>
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

    it('zIndex[number]', () => {
      const wrapper = mount(() => (
        <Watermark zIndex={100} watermarkContent={[{ text: '水印文字' }]}>
          tdesign
        </Watermark>
      ));
      expect(wrapper.classes()).toContain('t-watermark');
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

import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { describe, it, expect, vi, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import Watermark from '../watermark';
import type { TdWatermarkProps } from '../type';

// mock canvas 2d 上下文，记录绘制调用与参数
const canvasContext = {
  globalAlpha: undefined as number | undefined,
  fillStyle: '',
  font: '',
  textAlign: '',
  textBaseline: '',
  translate: vi.fn(),
  rotate: vi.fn(),
  fillRect: vi.fn(),
  fillText: vi.fn(),
  drawImage: vi.fn(),
  save: vi.fn(),
  restore: vi.fn(),
  getImageData: vi.fn(() => ({ data: new Uint8ClampedArray([10, 20, 30, 255]) })),
  putImageData: vi.fn(),
};

const getContext = vi.fn(() => canvasContext as unknown as CanvasRenderingContext2D);
const toDataURL = vi.fn(() => 'data:image/png;base64,mock');
const originGetContext = HTMLCanvasElement.prototype.getContext;
const originToDataURL = HTMLCanvasElement.prototype.toDataURL;

// mock Image：src 赋值后在微任务中触发 onload，保证 onload 先注册后执行
class FakeImage {
  onload: (() => void) | null = null;

  private srcValue = '';

  get src() {
    return this.srcValue;
  }

  set src(value: string) {
    this.srcValue = value;
    Promise.resolve().then(() => this.onload?.());
  }
}

// 组件根节点内注入的水印层（带 background-image 的 div）
const findWatermarkLayer = (wrapper: VueWrapper) =>
  wrapper.findAll('.t-watermark > div').find((node) => (node.attributes('style') ?? '').includes('background-image'));

const getWatermarkLayer = (wrapper: VueWrapper) => {
  const layer = findWatermarkLayer(wrapper);
  if (!layer) throw new Error('Expected a watermark layer to be rendered');
  return layer;
};

// 最近一次绘制使用的 canvas 元素（通过 getContext 调用时的 this 捕获）
const lastCanvas = () => getContext.mock.contexts.at(-1) as HTMLCanvasElement;

// 统一的绘制几何参数：x=24、y=48、width=100、height=40
const geometry = { x: 24, y: 48, width: 100, height: 40 };

const mountWatermark = (props: TdWatermarkProps = {}) =>
  mount(() => (
    <Watermark {...geometry} watermarkContent={[{ text: '水印文字' }]} {...props}>
      tdesign
    </Watermark>
  ));

enableAutoUnmount(afterEach);

describe('Watermark', () => {
  let existingStyles: Set<HTMLStyleElement>;

  beforeAll(() => {
    HTMLCanvasElement.prototype.getContext = getContext as unknown as typeof originGetContext;
    HTMLCanvasElement.prototype.toDataURL = toDataURL as unknown as typeof originToDataURL;
  });

  afterAll(() => {
    HTMLCanvasElement.prototype.getContext = originGetContext;
    HTMLCanvasElement.prototype.toDataURL = originToDataURL;
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  beforeEach(() => {
    existingStyles = new Set(document.head.querySelectorAll('style'));
    vi.clearAllMocks();
    canvasContext.globalAlpha = undefined;
    canvasContext.fillStyle = '';
    canvasContext.font = '';
    canvasContext.textAlign = '';
    canvasContext.textBaseline = '';
  });

  afterEach(() => {
    document.head.querySelectorAll('style').forEach((style) => {
      if (!existingStyles.has(style)) style.remove();
    });
    vi.unstubAllGlobals();
  });

  describe('props', () => {
    it('alpha[number]', () => {
      // 默认透明度 1
      mountWatermark();
      expect(canvasContext.globalAlpha).toBe(1);
      // 自定义透明度透传给 canvas 全局透明度
      mountWatermark({ alpha: 0.5 });
      expect(canvasContext.globalAlpha).toBe(0.5);
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

    it('content[slot]', () => {
      const wrapper = mount(() => (
        <Watermark v-slots={{ content: () => <div class="covered">content 插槽内容</div> }} />
      ));
      expect(wrapper.find('.covered').text()).toBe('content 插槽内容');
    });

    it('default[string]', () => {
      const wrapper = mount(() => <Watermark default="默认覆盖内容" />);
      expect(wrapper.text()).toContain('默认覆盖内容');
    });

    it('default[function]', () => {
      const wrapper = mount(() => <Watermark default={() => '函数默认内容'} />);
      expect(wrapper.text()).toContain('函数默认内容');
    });

    it('default[slot]', () => {
      const wrapper = mount(() => (
        <Watermark
          {...geometry}
          watermarkContent={[{ text: '水印文字' }]}
          v-slots={{ default: () => <div class="covered">被覆盖内容</div> }}
        />
      ));
      expect(wrapper.find('.covered').exists()).toBeTruthy();
      expect(wrapper.text()).toContain('被覆盖内容');
      // 水印层注入在插槽内容之上
      expect(findWatermarkLayer(wrapper)).toBeTruthy();
    });

    it('height[number]', () => {
      // 画布高度 = y + height，填充区域高度 = height
      mountWatermark({ y: 10, height: 60 });
      expect(lastCanvas().style.height).toBe('70px');
      expect(lastCanvas().height).toBe(70);
      expect(canvasContext.fillRect).toHaveBeenCalledWith(0, 0, 100, 60);
    });

    it('isRepeat[boolean]', () => {
      // 默认重复铺满
      const repeatWrapper = mountWatermark();
      expect(findWatermarkLayer(repeatWrapper)?.attributes('style')).toContain('background-repeat: repeat');
      // 不重复：仅绘制一次
      const noRepeatWrapper = mountWatermark({ isRepeat: false });
      expect(findWatermarkLayer(noRepeatWrapper)?.attributes('style')).toContain('background-repeat: no-repeat');
    });

    it('layout[rectangular/hexagonal]', () => {
      // rectangular：内容绘制一次，画布宽度 = x + width
      mountWatermark({ layout: 'rectangular' });
      expect(canvasContext.fillText).toHaveBeenCalledTimes(1);
      expect(lastCanvas().width).toBe(124);
      canvasContext.fillText.mockClear();

      // hexagonal：画布宽高扩大一倍，内容错位绘制第二次，背景宽度 = x + width * 2 + width / 2
      const wrapper = mountWatermark({ layout: 'hexagonal' });
      expect(canvasContext.fillText).toHaveBeenCalledTimes(2);
      expect(canvasContext.fillText).toHaveBeenNthCalledWith(1, '水印文字', 0, 0);
      expect(canvasContext.fillText).toHaveBeenNthCalledWith(2, '水印文字', 124, 88);
      expect(lastCanvas().width).toBe(248);
      expect(findWatermarkLayer(wrapper)?.attributes('style')).toContain('background-size: 274px');
    });

    it('lineSpace[number]', () => {
      // 多行水印第二行的绘制 y 坐标 = lineSpace
      mountWatermark({ lineSpace: 24, watermarkContent: [{ text: '第一行' }, { text: '第二行' }] });
      expect(canvasContext.fillText).toHaveBeenNthCalledWith(1, '第一行', 0, 0);
      expect(canvasContext.fillText).toHaveBeenNthCalledWith(2, '第二行', 0, 24);
    });

    it('movable[boolean]', () => {
      // movable：间距与旋转重置为 0、不重复、注入动画与随机关键帧
      const wrapper = mountWatermark({ movable: true });
      const style = findWatermarkLayer(wrapper)?.attributes('style') ?? '';
      // 动画时长 = moveInterval * 4 / 60 = 3000 * 4 / 60
      expect(style).toContain('animation: watermark infinite 200s');
      expect(style).toContain('background-repeat: no-repeat');
      expect(style).toContain('background-size: 100px');
      expect(canvasContext.rotate).toHaveBeenCalledWith(0);
      const keyframesInjected = Array.from(document.styleSheets).some((sheet) =>
        Array.from(sheet.cssRules).some((rule) => rule.cssText.startsWith('@keyframes watermark')),
      );
      expect(keyframesInjected).toBeTruthy();

      // 默认静止：无动画，背景宽度 = x + width
      const staticWrapper = mountWatermark();
      const staticStyle = findWatermarkLayer(staticWrapper)?.attributes('style') ?? '';
      expect(staticStyle).toContain('animation: none');
      expect(staticStyle).toContain('background-size: 124px');
    });

    it('moveInterval[number]', () => {
      const wrapper = mountWatermark({ movable: true, moveInterval: 600 });
      // 动画时长 = 600 * 4 / 60
      expect(findWatermarkLayer(wrapper)?.attributes('style')).toContain('animation: watermark infinite 40s');
    });

    it('offset[array]', () => {
      // 未设置 offset 时默认取 [x / 2, y / 2]
      mountWatermark();
      expect(canvasContext.translate.mock.calls[0]).toEqual([12, 24]);
      canvasContext.translate.mockClear();

      // 设置 offset 后以 offset 作为绘制起点
      mountWatermark({ offset: [10, 20] });
      expect(canvasContext.translate.mock.calls[0]).toEqual([10, 20]);
    });

    it('removable[boolean]', async () => {
      // 默认 removable=true：水印层被删除后不恢复
      const removableWrapper = mountWatermark();
      findWatermarkLayer(removableWrapper)?.element.remove();
      await flushPromises();
      expect(findWatermarkLayer(removableWrapper)).toBeUndefined();

      // removable=false：水印层被删除后由 MutationObserver 触发重新注入
      const unremovableWrapper = mountWatermark({ removable: false });
      const removedLayer = findWatermarkLayer(unremovableWrapper);
      removedLayer?.element.remove();
      await vi.waitFor(() => {
        expect(findWatermarkLayer(unremovableWrapper)).toBeTruthy();
      });
      const reInjectedLayer = getWatermarkLayer(unremovableWrapper);
      expect(reInjectedLayer?.element).not.toBe(removedLayer?.element);

      // 不可删除的水印层被修改样式后，同样恢复为原始配置
      reInjectedLayer.element.setAttribute('style', 'display: none');
      await vi.waitFor(() => {
        expect(findWatermarkLayer(unremovableWrapper)?.element).not.toBe(reInjectedLayer?.element);
        expect(findWatermarkLayer(unremovableWrapper)?.attributes('style')).toContain('background-image');
      });

      const removableLayer = mountWatermark();
      const originalLayer = getWatermarkLayer(removableLayer);
      originalLayer.element.setAttribute('style', 'display: none');
      await flushPromises();
      expect(removableLayer.element.contains(originalLayer.element)).toBe(true);
      expect(originalLayer.attributes('style')).toBe('display: none');
    });

    it('rotate[number]', () => {
      // 以元素中心为旋转点执行旋转
      mountWatermark({ rotate: -30 });
      expect(canvasContext.rotate).toHaveBeenCalledWith((Math.PI / 180) * -30);
    });

    it('watermarkContent[object]', () => {
      // 单个文本对象：字体样式与文字颜色透传给 canvas
      mountWatermark({
        watermarkContent: {
          text: '单行水印',
          fontColor: 'rgba(255,0,0,0.2)',
          fontSize: 20,
          fontWeight: 'bold',
          fontFamily: 'Arial',
        },
      });
      expect(canvasContext.fillText).toHaveBeenCalledTimes(1);
      expect(canvasContext.fillText).toHaveBeenCalledWith('单行水印', 0, 0);
      // font = normal normal fontWeight fontSize/height fontFamily
      expect(canvasContext.font).toBe('normal normal bold 20px/40px Arial');
      expect(canvasContext.fillStyle).toBe('rgba(255,0,0,0.2)');
    });

    it('watermarkContent[array]', () => {
      // 文本数组：按顺序逐行绘制，默认行间距 16
      mountWatermark({ watermarkContent: [{ text: '第一行' }, { text: '第二行' }] });
      expect(canvasContext.fillText).toHaveBeenCalledTimes(2);
      expect(canvasContext.fillText).toHaveBeenNthCalledWith(1, '第一行', 0, 0);
      expect(canvasContext.fillText).toHaveBeenNthCalledWith(2, '第二行', 0, 16);
    });

    it('width[number]', () => {
      // 画布宽度 = x + width
      mountWatermark({ width: 120 });
      expect(lastCanvas().style.width).toBe('144px');
      expect(lastCanvas().width).toBe(144);
    });

    it('x[number]', () => {
      // 水平间距参与画布宽度与背景宽度计算
      const wrapper = mountWatermark({ x: 30 });
      expect(lastCanvas().width).toBe(130);
      expect(findWatermarkLayer(wrapper)?.attributes('style')).toContain('background-size: 130px');
    });

    it('y[number]', () => {
      // 垂直间距参与画布高度计算，默认 offsetTop = y / 2
      mountWatermark({ y: 20 });
      expect(lastCanvas().style.height).toBe('60px');
      expect(lastCanvas().height).toBe(60);
      expect(canvasContext.translate.mock.calls[0]).toEqual([12, 10]);
    });

    it('zIndex[number]', () => {
      const wrapper = mountWatermark({ zIndex: 100 });
      expect(findWatermarkLayer(wrapper)?.attributes('style')).toContain('z-index: 100');
    });
  });

  describe('scenarios', () => {
    it('regenerates the watermark layer after props change', async () => {
      const wrapper = mount(Watermark, {
        props: { ...geometry, watermarkContent: [{ text: '初始水印' }] },
      });
      const layer = getWatermarkLayer(wrapper);
      expect(canvasContext.fillText).toHaveBeenCalledWith('初始水印', 0, 0);
      const generatedCount = toDataURL.mock.calls.length;

      await wrapper.setProps({ watermarkContent: [{ text: '更新后的水印' }] });
      expect(canvasContext.fillText).toHaveBeenCalledWith('更新后的水印', 0, 0);
      // 旧水印层被移除，重新注入新水印层
      const newLayer = findWatermarkLayer(wrapper);
      expect(newLayer?.element).not.toBe(layer?.element);
      expect(wrapper.element.contains(layer.element)).toBe(false);
      // 水印图被重新生成
      expect(toDataURL.mock.calls.length).toBeGreaterThan(generatedCount);
    });

    it('default prop takes precedence over content prop when both are set', () => {
      const wrapper = mount(() => <Watermark default="default 内容" content="content 内容" />);
      expect(wrapper.text()).toContain('default 内容');
      expect(wrapper.text()).not.toContain('content 内容');
    });

    it('default slot takes precedence over content prop', () => {
      const wrapper = mount(() => (
        <Watermark content="content 内容" v-slots={{ default: () => <div class="covered">插槽内容</div> }} />
      ));
      expect(wrapper.find('.covered').exists()).toBeTruthy();
      expect(wrapper.text()).toContain('插槽内容');
      expect(wrapper.text()).not.toContain('content 内容');
    });

    it('explicit content prop takes precedence over content slot', () => {
      const wrapper = mount(() => (
        <Watermark content="content 属性" v-slots={{ content: () => <span>content 插槽</span> }} />
      ));
      expect(wrapper.text()).toBe('content 属性');
    });

    it('falls back to content slot when the default slot is empty', () => {
      const wrapper = mount(() => (
        <Watermark v-slots={{ default: () => null, content: () => <span>后备内容</span> }} />
      ));
      expect(wrapper.text()).toBe('后备内容');
    });

    it('ignores changes to covered content when protecting the watermark layer', async () => {
      const wrapper = mount(Watermark, {
        props: { ...geometry, watermarkContent: { text: '水印文字' }, removable: false },
        slots: { default: () => <div class="covered">被覆盖内容</div> },
      });
      const layer = getWatermarkLayer(wrapper);
      const generatedCount = toDataURL.mock.calls.length;
      wrapper.find('.covered').element.setAttribute('title', '更新内容');
      wrapper.find('.covered').element.append(document.createElement('span'));
      await flushPromises();

      expect(findWatermarkLayer(wrapper)?.element).toBe(layer.element);
      expect(toDataURL).toHaveBeenCalledTimes(generatedCount);
    });

    it('stops protecting the watermark layer after unmount', async () => {
      const wrapper = mountWatermark({ removable: false });
      const layer = getWatermarkLayer(wrapper);
      const generatedCount = toDataURL.mock.calls.length;
      wrapper.unmount();
      layer.element.setAttribute('style', 'display: none');
      layer.element.remove();
      await flushPromises();
      expect(toDataURL).toHaveBeenCalledTimes(generatedCount);
    });

    it('scales drawing dimensions without changing the background size on high-density screens', () => {
      vi.stubGlobal('devicePixelRatio', 2);
      const wrapper = mountWatermark();
      expect(lastCanvas().width).toBe(248);
      expect(lastCanvas().height).toBe(176);
      expect(lastCanvas().style.width).toBe('124px');
      expect(lastCanvas().style.height).toBe('88px');
      expect(canvasContext.translate).toHaveBeenNthCalledWith(1, 24, 48);
      expect(canvasContext.fillRect).toHaveBeenCalledWith(0, 0, 200, 80);
      expect(findWatermarkLayer(wrapper)?.attributes('style')).toContain('background-size: 124px');
    });

    it('draws and injects the image watermark after the image loads', async () => {
      vi.stubGlobal('Image', FakeImage);
      const wrapper = mountWatermark({ watermarkContent: { url: 'https://tdesign.gtimg.com/watermark.png' } });
      // 图片加载完成前不生成水印层
      expect(findWatermarkLayer(wrapper)).toBeUndefined();

      await flushPromises();
      expect(canvasContext.drawImage).toHaveBeenCalledWith(expect.anything(), 0, 0, 100, 40);
      expect(toDataURL).toHaveBeenCalledTimes(1);
      expect(findWatermarkLayer(wrapper)?.attributes('style')).toContain('background-image');
    });

    it('processes grayscale image watermark pixels through a temporary canvas', async () => {
      vi.stubGlobal('Image', FakeImage);
      mountWatermark({ watermarkContent: { url: 'https://tdesign.gtimg.com/watermark.png', isGrayscale: true } });
      await flushPromises();
      // 像素灰度化：lightness = (10 + 20 + 30) / 3 = 20
      const imgData = canvasContext.getImageData.mock.results[0]?.value;
      expect(Array.from(imgData.data as Uint8ClampedArray)).toEqual([20, 20, 20, 255]);
      expect(canvasContext.putImageData).toHaveBeenCalledWith(imgData, 0, 0);
      // 第一次将原图绘制到临时画布，第二次将灰度画布绘制到水印画布
      expect(canvasContext.drawImage).toHaveBeenCalledTimes(2);
      expect(canvasContext.drawImage.mock.calls[1][0]).toBeInstanceOf(HTMLCanvasElement);
    });

    it('draws the image watermark twice with staggered offsets in hexagonal layout', async () => {
      vi.stubGlobal('Image', FakeImage);
      mountWatermark({ layout: 'hexagonal', watermarkContent: { url: 'https://tdesign.gtimg.com/watermark.png' } });
      await flushPromises();
      // 第二次绘制起点为 (x + width, y + height)
      expect(canvasContext.drawImage).toHaveBeenNthCalledWith(1, expect.anything(), 0, 0, 100, 40);
      expect(canvasContext.drawImage).toHaveBeenNthCalledWith(2, expect.anything(), 124, 88, 100, 40);
      // 两张图片均加载完成后仅生成一次水印图
      expect(toDataURL).toHaveBeenCalledTimes(1);
    });

    it('draws mixed text and image content before injecting a single watermark layer', async () => {
      vi.stubGlobal('Image', FakeImage);
      const wrapper = mountWatermark({
        watermarkContent: [
          { text: '第一行文字' },
          { url: 'https://tdesign.gtimg.com/watermark.png', isGrayscale: true },
          { text: '第二行文字' },
          { url: 'https://tdesign.gtimg.com/watermark-second.png' },
        ],
      });
      expect(canvasContext.fillText).toHaveBeenNthCalledWith(1, '第一行文字', 0, 0);
      expect(canvasContext.fillText).toHaveBeenNthCalledWith(2, '第二行文字', 0, 56);
      expect(findWatermarkLayer(wrapper)).toBeUndefined();
      expect(toDataURL).not.toHaveBeenCalled();

      await flushPromises();
      expect(canvasContext.drawImage).toHaveBeenNthCalledWith(2, expect.any(HTMLCanvasElement), 0, 16, 100, 40);
      expect(canvasContext.drawImage).toHaveBeenNthCalledWith(3, expect.any(FakeImage), 0, 72, 100, 40);
      expect(canvasContext.getImageData).toHaveBeenCalledTimes(1);
      expect(canvasContext.putImageData).toHaveBeenCalledTimes(1);
      expect(toDataURL).toHaveBeenCalledTimes(1);
      expect(findWatermarkLayer(wrapper)).toBeTruthy();
    });
  });
});

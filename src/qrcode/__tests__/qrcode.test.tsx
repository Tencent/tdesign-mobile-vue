import { mount } from '@vue/test-utils';
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { QRCode, TdQRCodeProps } from '../index';
import type { StatusRenderInfo } from '../type';
import QRCodeCanvas from '../components/qrcode-canvas';
import QRCodeSVG from '../components/qrcode-svg';
import Loading from '../../loading';
import ConfigProvider from '../../config-provider';

const VALUE = 'https://tdesign.tencent.com/';
const ICON_SRC = 'https://tdesign.gtimg.com/site/tdesign-logo.png';
const defaultSize = 160;

// jsdom 未实现 canvas 2d context，这里以可断言的 mock 替代，验证绘制行为（结束后恢复）
const fillStyleHistory: string[] = [];
const mockCtx = {
  globalAlpha: 1,
  scale: vi.fn(),
  fill: vi.fn(),
  fillRect: vi.fn(),
  drawImage: vi.fn(),
};
Object.defineProperty(mockCtx, 'fillStyle', {
  get: () => fillStyleHistory[fillStyleHistory.length - 1],
  set: (value: string) => {
    fillStyleHistory.push(value);
  },
});

const mockGetContext = () =>
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(mockCtx as unknown as CanvasRenderingContext2D);

let getContextSpy: ReturnType<typeof mockGetContext>;

beforeAll(() => {
  getContextSpy = mockGetContext();
});

afterAll(() => {
  getContextSpy.mockRestore();
});

// ctx.scale 以 (size / numCells) * pixelRatio 调用，据此反推二维码模块数
const getCanvasNumCells = (size = defaultSize) => {
  const calls = mockCtx.scale.mock.calls as number[][];
  const [scaleX] = calls[calls.length - 1];
  const pixelRatio = window.devicePixelRatio || 1;
  return (size * pixelRatio) / scaleX;
};

describe('QRCode', () => {
  beforeEach(() => {
    fillStyleHistory.length = 0;
    mockCtx.scale.mockClear();
    mockCtx.fill.mockClear();
    mockCtx.fillRect.mockClear();
    mockCtx.drawImage.mockClear();
    mockCtx.globalAlpha = 1;
  });

  describe('props', () => {
    // 因单测环境下无法获取主题色，若未定义颜色，组件将由默认颜色兜底。所以单测的颜色要为默认颜色。
    // 颜色优先级如下：
    // bgColor：自定义颜色 > 主题色适配 > 透明[transparent]
    // color[fgColor]：自定义颜色 > 主题色适配 > 默认颜色[#000000]
    const defaultBgColor = 'transparent'; // 实际使用时为 rgb(255, 255, 255)
    const defaultFgColor = '#000000'; // 实际使用时为 rgba(0, 0, 0, .9)

    it('bgColor[string]', async () => {
      const wrapper = mount(QRCode, { props: { value: VALUE } });
      expect(wrapper.find('.t-qrcode').attributes('style')).eq(
        `background-color: ${defaultBgColor}; width: 160px; height: 160px;`,
      );
      const bgColor = 'rgb(7, 193, 96)';
      await wrapper.setProps({ bgColor });
      expect(wrapper.find('.t-qrcode').attributes('style')).eq(
        `background-color: ${bgColor}; width: 160px; height: 160px;`,
      );
      // svg 模式下自定义背景色写入背景 path 的 fill
      await wrapper.setProps({ type: 'svg' });
      expect(wrapper.findAll('path')[0].attributes('fill')).eq(bgColor);
    });

    it('borderless[boolean]', async () => {
      const wrapper = mount(QRCode, { props: { value: VALUE } });
      expect(wrapper.find('.t-qrcode').classes('t-borderless')).eq(false);
      await wrapper.setProps({ borderless: true });
      expect(wrapper.find('.t-qrcode').classes('t-borderless')).eq(true);
    });

    // color 只能通过 svg 的前景 path 验证（canvas 绘制断言见 scenarios/canvas rendering）
    it('color[string]', async () => {
      const wrapper = mount(QRCode, { props: { value: VALUE, type: 'svg' } });
      // [0] 是背景
      expect(wrapper.findAll('path')[1].attributes('fill')).eq(defaultFgColor);
      const color = 'rgb(7, 193, 96)';
      await wrapper.setProps({ color });
      expect(wrapper.findAll('path')[1].attributes('fill')).eq(color);
    });

    it('icon[string]', async () => {
      // canvas 模式：未设置 icon 时不渲染 img 节点
      const wrapper = mount(QRCode, { props: { value: VALUE } });
      expect(wrapper.find('img').exists()).eq(false);
      // 设置 icon 后渲染隐藏的 img 用于画布绘制
      await wrapper.setProps({ icon: ICON_SRC });
      const $img = wrapper.find('img');
      expect($img.attributes('src')).eq(ICON_SRC);
      expect($img.attributes('style')).contain('display: none');
      // svg 模式：icon 以 image 节点渲染
      await wrapper.setProps({ type: 'svg' });
      expect(wrapper.find('image').attributes('href')).eq(ICON_SRC);
    });

    it('iconSize[number]', () => {
      // 图标尺寸按 (iconSize / 二维码尺寸) * 模块数 缩放到 svg 坐标系
      const wrapper = mount(QRCode, {
        props: { value: VALUE, type: 'svg', icon: ICON_SRC, iconSize: 60 },
      });
      const numCells = Number(wrapper.find('svg').attributes('viewBox').split(' ')[2]);
      const $image = wrapper.find('image');
      expect(Number($image.attributes('width'))).toBeCloseTo((60 * numCells) / defaultSize);
      expect(Number($image.attributes('height'))).toBeCloseTo((60 * numCells) / defaultSize);
    });

    it('iconSize[object]', () => {
      const wrapper = mount(QRCode, {
        props: { value: VALUE, type: 'svg', icon: ICON_SRC, iconSize: { width: 30, height: 50 } },
      });
      const numCells = Number(wrapper.find('svg').attributes('viewBox').split(' ')[2]);
      const $image = wrapper.find('image');
      // 宽高分别按对象中的 width/height 缩放
      expect(Number($image.attributes('width'))).toBeCloseTo((30 * numCells) / defaultSize);
      expect(Number($image.attributes('height'))).toBeCloseTo((50 * numCells) / defaultSize);
    });

    const levels: TdQRCodeProps['level'][] = ['L', 'M', 'Q', 'H'];
    levels.forEach((item) => {
      it(`level[${item}]`, async () => {
        const wrapper = mount(QRCode, { props: { value: VALUE, level: item } });
        // 容错级别透传给 canvas 渲染组件
        expect(wrapper.findComponent(QRCodeCanvas).props('level')).eq(item);
        // svg 模式下同样透传
        await wrapper.setProps({ type: 'svg' });
        expect(wrapper.findComponent(QRCodeSVG).props('level')).eq(item);
      });
    });

    it('size[number]', async () => {
      const wrapper = mount(QRCode, { props: { value: VALUE } });
      expect(wrapper.find('.t-qrcode').attributes('style')).eq(
        `background-color: ${defaultBgColor}; width: ${defaultSize}px; height: ${defaultSize}px;`,
      );
      // svg 模式下 size 同步到 svg 元素宽高
      await wrapper.setProps({ type: 'svg' });
      expect(wrapper.find('svg').attributes('width')).eq(`${defaultSize}`);
      expect(wrapper.find('svg').attributes('height')).eq(`${defaultSize}`);
      const size = 380;
      await wrapper.setProps({ size });
      expect(wrapper.find('.t-qrcode').attributes('style')).eq(
        `background-color: ${defaultBgColor}; width: ${size}px; height: ${size}px;`,
      );
      expect(wrapper.find('svg').attributes('width')).eq(`${size}`);
      expect(wrapper.find('svg').attributes('height')).eq(`${size}`);
    });

    it('status[active]', async () => {
      // active（默认）：不渲染状态蒙层
      const wrapper = mount(QRCode, { props: { value: VALUE } });
      expect(wrapper.find('.t-mask').exists()).eq(false);
      // 从非 active 状态恢复后移除蒙层
      await wrapper.setProps({ status: 'expired' });
      expect(wrapper.find('.t-mask').exists()).eq(true);
      await wrapper.setProps({ status: 'active' });
      expect(wrapper.find('.t-mask').exists()).eq(false);
    });

    const statuses: TdQRCodeProps['status'][] = ['expired', 'loading', 'scanned'];
    statuses.forEach((item) => {
      it(`status[${item}]`, () => {
        const wrapper = mount(QRCode, { props: { value: VALUE, status: item } });
        const $qrcode = wrapper.find('.t-qrcode');
        expect($qrcode.find('.t-mask').exists()).eq(true);
        if (item === 'loading') {
          // loading 蒙层不带状态修饰类，内部渲染 Loading 组件
          expect($qrcode.find('.t-mask').classes('t-loading')).eq(false);
          expect($qrcode.find('.t-mask').findComponent(Loading).exists()).eq(true);
        } else {
          expect($qrcode.find(`.t-${item}`).exists()).eq(true);
        }
      });
    });

    it('statusRender[function]', () => {
      // 运行时以 (h, params) 调用渲染函数，params 携带 { status, onRefresh }
      // （与 type.ts 中 (info: StatusRenderInfo) => TNode 的声明不一致，见源码缺口）
      const statusRender = vi.fn((...args: unknown[]) => {
        const info = args[1] as StatusRenderInfo;
        return info.status === 'expired' ? <div class="custom-status">自定义过期态</div> : null;
      });
      const wrapper = mount(QRCode, {
        props: {
          value: VALUE,
          status: 'expired',
          statusRender: statusRender as unknown as TdQRCodeProps['statusRender'],
        },
      });
      expect(statusRender).toHaveBeenCalled();
      // 自定义渲染器替换默认过期文案与刷新按钮
      expect(wrapper.find('.custom-status').exists()).eq(true);
      expect(wrapper.find('.t-expired__text').exists()).eq(false);
      expect(wrapper.find('.t-expired__button').exists()).eq(false);
    });

    it('statusRender[slot]', async () => {
      const onRefresh = vi.fn();
      const wrapper = mount(QRCode, {
        props: { value: VALUE, status: 'expired', onRefresh },
        slots: {
          statusRender: ({ status, onRefresh: refresh }: StatusRenderInfo) => (
            <div class="slot-status" onClick={refresh}>
              自定义{status}
            </div>
          ),
        },
      });
      // 插槽内容替换默认过期态渲染
      expect(wrapper.find('.slot-status').exists()).eq(true);
      expect(wrapper.find('.slot-status').text()).eq('自定义expired');
      expect(wrapper.find('.t-expired__text').exists()).eq(false);
      // 作用域参数透传 status 与 onRefresh
      await wrapper.find('.slot-status').trigger('click');
      expect(onRefresh).toHaveBeenCalledTimes(1);
    });

    it('type[canvas]', () => {
      // canvas 模式（默认）：渲染 canvas 元素，根节点无 svg 类名
      const wrapper = mount(QRCode, { props: { value: VALUE } });
      expect(wrapper.find('.t-qrcode').classes('t-qrcode-svg')).eq(false);
      expect(wrapper.find('canvas').exists()).eq(true);
      expect(wrapper.find('svg').exists()).eq(false);
    });

    it('type[svg]', () => {
      const wrapper = mount(QRCode, { props: { value: VALUE, type: 'svg' } });
      expect(wrapper.find('.t-qrcode').classes('t-qrcode-svg')).eq(true);
      expect(wrapper.find('svg').exists()).eq(true);
      expect(wrapper.find('canvas').exists()).eq(false);
    });

    it('value[string]', async () => {
      // value 为二维码编码内容，透传给二维码生成组件
      const wrapper = mount(QRCode, { props: { value: VALUE } });
      expect(wrapper.findComponent(QRCodeCanvas).props('value')).eq(VALUE);

      // 更换编码内容后同步到二维码生成组件
      const nextValue = 'https://github.com/Tencent/tdesign-mobile-vue';
      await wrapper.setProps({ value: nextValue });
      expect(wrapper.findComponent(QRCodeCanvas).props('value')).eq(nextValue);
    });
  });

  describe('events', () => {
    it('refresh', async () => {
      // 仅当传入 onRefresh 时渲染“点击刷新”按钮
      const onRefresh = vi.fn();
      const wrapper = mount(QRCode, { props: { value: VALUE, status: 'expired' } });
      expect(wrapper.find('.t-expired__button').exists()).eq(false);

      await wrapper.setProps({ onRefresh });
      expect(wrapper.find('.t-expired__button').exists()).eq(true);
      await wrapper.find('.t-expired__button').trigger('click');
      expect(onRefresh).toHaveBeenCalledTimes(1);
      await wrapper.find('.t-expired__button').trigger('click');
      expect(onRefresh).toHaveBeenCalledTimes(2);
    });
  });

  describe('globalConfig', () => {
    it('qrcode', () => {
      const globalConfig = {
        qrcode: { expiredText: '二维码已失效', refreshText: '重新生成', scannedText: '已扫描过啦' },
      };
      const wrapper = mount(
        <ConfigProvider globalConfig={globalConfig}>
          <QRCode value={VALUE} status="expired" onRefresh={() => {}} />
        </ConfigProvider>,
      );
      expect(wrapper.find('.t-expired__text').text()).eq('二维码已失效');
      expect(wrapper.find('.t-expired__button').text()).contain('重新生成');

      const scannedWrapper = mount(
        <ConfigProvider globalConfig={globalConfig}>
          <QRCode value={VALUE} status="scanned" />
        </ConfigProvider>,
      );
      expect(scannedWrapper.find('.t-scanned').text()).contain('已扫描过啦');
    });
  });

  describe('scenarios', () => {
    // 默认使用全局配置（zh_CN 语言包）的状态文案
    it('renders default zh-CN status texts', () => {
      const wrapper = mount(QRCode, { props: { value: VALUE, status: 'expired', onRefresh: () => {} } });
      expect(wrapper.find('.t-expired__text').text()).eq('二维码过期');
      expect(wrapper.find('.t-expired__button').text()).contain('点击刷新');

      const scannedWrapper = mount(QRCode, { props: { value: VALUE, status: 'scanned' } });
      expect(scannedWrapper.find('.t-scanned').text()).contain('已扫描');
    });

    describe('status rendering', () => {
      it('statusRender prop takes precedence over statusRender slot', () => {
        // prop 与 slot 同时提供时，prop 优先（renderTNodeJSX 优先级：props > slot > 默认）
        const wrapper = mount(QRCode, {
          props: {
            value: VALUE,
            status: 'expired',
            statusRender: (() => <div class="prop-status">prop 渲染</div>) as unknown as TdQRCodeProps['statusRender'],
          },
          slots: {
            statusRender: () => <div class="slot-status">slot 渲染</div>,
          },
        });
        expect(wrapper.find('.prop-status').exists()).eq(true);
        expect(wrapper.find('.slot-status').exists()).eq(false);
      });

      it('switching status toggles the mask and its content', async () => {
        const wrapper = mount(QRCode, { props: { value: VALUE } });
        expect(wrapper.find('.t-mask').exists()).eq(false);

        await wrapper.setProps({ status: 'scanned' });
        expect(wrapper.find('.t-mask').exists()).eq(true);
        expect(wrapper.find('.t-scanned').text()).contain('已扫描');

        await wrapper.setProps({ status: 'expired' });
        expect(wrapper.find('.t-expired__text').exists()).eq(true);
      });
    });

    describe('canvas rendering', () => {
      it('value change re-encodes and redraws the canvas', async () => {
        // 更长的内容需要更高版本的二维码：模块数增加，画布按新模块数重新缩放绘制
        const wrapper = mount(QRCode, { props: { value: VALUE } });
        const prevNumCells = getCanvasNumCells();
        await wrapper.setProps({ value: 'https://github.com/Tencent/tdesign-mobile-vue' });
        const numCells = getCanvasNumCells();
        expect(numCells).toBeGreaterThan(prevNumCells);
      });

      it('draws background and modules onto the canvas', () => {
        const bgColor = 'rgb(240, 242, 245)';
        const fgColor = 'rgb(7, 193, 96)';
        const wrapper = mount(QRCode, { props: { value: VALUE, bgColor, color: fgColor } });
        const $canvas = wrapper.find('canvas');
        const pixelRatio = window.devicePixelRatio || 1;
        // 画布尺寸 = size * devicePixelRatio
        expect($canvas.attributes('width')).eq(`${defaultSize * pixelRatio}`);
        expect($canvas.attributes('height')).eq(`${defaultSize * pixelRatio}`);

        // 先以 bgColor 填充整个模块坐标系，再以 fgColor 逐模块绘制二维码
        const numCells = getCanvasNumCells();
        const fillRectCalls = mockCtx.fillRect.mock.calls as number[][];
        const [bgX, bgY, bgW, bgH] = fillRectCalls[0];
        expect(bgX).eq(0);
        expect(bgY).eq(0);
        expect(bgW).toBeCloseTo(numCells);
        expect(bgH).toBeCloseTo(numCells);
        expect(fillStyleHistory[0]).eq(bgColor);
        expect(fillStyleHistory[1]).eq(fgColor);
        const moduleCalls = fillRectCalls.slice(1);
        expect(moduleCalls.length).toBeGreaterThan(0);
        moduleCalls.forEach(([, , w, h]) => {
          expect(w).eq(1);
          expect(h).eq(1);
        });
        // 未设置 icon 时不绘制图片
        expect(mockCtx.drawImage).not.toHaveBeenCalled();
      });

      it('draws the icon onto the canvas after it loads', async () => {
        const wrapper = mount(QRCode, { props: { value: VALUE, icon: ICON_SRC, iconSize: 60 } });
        const $img = wrapper.find('img');
        // 图片加载完成前不绘制 icon
        expect(mockCtx.drawImage).not.toHaveBeenCalled();
        // 为支持画布导出，图片设置 crossOrigin 属性
        expect($img.element.crossOrigin).eq('anonymous');

        // 模拟图片异步加载完成（jsdom 不会请求真实图片资源）
        Object.defineProperty($img.element, 'complete', { value: true });
        Object.defineProperty($img.element, 'naturalWidth', { value: 320 });
        Object.defineProperty($img.element, 'naturalHeight', { value: 320 });
        await $img.trigger('load');

        const numCells = getCanvasNumCells();
        const drawImageCalls = mockCtx.drawImage.mock.calls;
        const [image, x, y, w, h] = drawImageCalls[drawImageCalls.length - 1];
        expect(image).eq($img.element);
        // iconSize 缩放到模块坐标系并居中绘制
        expect(w).toBeCloseTo((60 * numCells) / defaultSize);
        expect(h).toBeCloseTo((60 * numCells) / defaultSize);
        expect(x).toBeCloseTo(numCells / 2 - w / 2);
        expect(y).toBeCloseTo(numCells / 2 - h / 2);
        expect(mockCtx.globalAlpha).toBeCloseTo(1);
      });
    });

    describe('svg rendering', () => {
      it('icon excavates the modules beneath it', () => {
        // excavate 默认开启：icon 覆盖区域的模块被挖除，前景 path 与无 icon 时不一致
        const plain = mount(QRCode, { props: { value: VALUE, type: 'svg' } });
        const withIcon = mount(QRCode, { props: { value: VALUE, type: 'svg', icon: ICON_SRC } });
        expect(withIcon.findAll('path')[1].attributes('d')).not.eq(plain.findAll('path')[1].attributes('d'));
      });

      it('higher error correction level produces denser modules', () => {
        // 同一内容 L 与 H 纠错级别下的版本不同，模块矩阵大小不同
        const low = mount(QRCode, { props: { value: VALUE, type: 'svg', level: 'L' } });
        const high = mount(QRCode, { props: { value: VALUE, type: 'svg', level: 'H' } });
        expect(low.find('svg').attributes('viewBox')).not.eq(high.find('svg').attributes('viewBox'));
      });
    });

    describe('edge cases', () => {
      it('renders nothing when value is empty', async () => {
        // value 缺省为空字符串：组件不渲染任何内容
        const wrapper = mount(QRCode, { props: {} });
        expect(wrapper.find('.t-qrcode').exists()).eq(false);
        // 源码在 setup 阶段判断 value，为空时直接返回渲染函数为空，
        // 后续补传 value 也不会重新渲染（见源码缺口清单）
        await wrapper.setProps({ value: VALUE });
        expect(wrapper.find('.t-qrcode').exists()).eq(false);
      });

      // 源码缺口：qrcode-svg 在 setup 中调用 useQRCode 并一次性解构入参，computed 无法感知 props.value 变化，
      // value 更新后 svg 不会重新编码；canvas 模式每次渲染重新调用 useQRCode，可正常重绘（见 canvas rendering 分组）
      it.todo('value change updates the rendered svg path');
    });
  });
});

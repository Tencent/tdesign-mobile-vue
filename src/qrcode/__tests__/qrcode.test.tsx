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

    // color 只能通过 svg 的前景 path 验证（jsdom 不支持 canvas 绘制断言）
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
});

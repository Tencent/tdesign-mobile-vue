import { describe, it, expect, vi } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import Skeleton from '../skeleton';
import type { TdSkeletonProps } from '../type';
import config from '../../config';

const { prefix } = config;
const name = `${prefix}-skeleton`;

const getRows = (wrapper: VueWrapper) => wrapper.findAll(`.${name}__row`);
const getCols = (wrapper: VueWrapper) => wrapper.findAll(`.${name}__col`);

describe('Skeleton', () => {
  describe('props', () => {
    it.each(['gradient', 'flashed', 'none'] as const)('animation[%s]', (animation) => {
      // 默认值 none：列上仅携带 --animation-none，不带渐变/闪烁动画类
      const wrapper = mount(Skeleton, { props: { rowCol: [1, 1] } });
      expect(getCols(wrapper)).toHaveLength(2);
      expect(getCols(wrapper)[0].classes()).toEqual([`${name}__col`, `${name}--type-text`, `${name}--animation-none`]);

      const animationWrapper = mount(Skeleton, { props: { rowCol: [1, 1], animation } });
      getCols(animationWrapper).forEach(($col) => {
        expect($col.classes()).toContain(`${name}--animation-${animation}`);
      });
    });

    it('delay[number]', async () => {
      vi.useFakeTimers();
      try {
        const wrapper = mount(Skeleton, { props: { loading: true, delay: 100 } });
        // 延迟窗口内不渲染骨架屏，防止请求速度过快引起的加载闪烁
        expect(wrapper.find(`.${name}`).exists()).toBe(false);
        vi.advanceTimersByTime(99);
        await wrapper.vm.$nextTick();
        expect(wrapper.find(`.${name}`).exists()).toBe(false);
        vi.advanceTimersByTime(1);
        await wrapper.vm.$nextTick();
        expect(wrapper.find(`.${name}`).exists()).toBe(true);

        // 默认 delay 为 0：loading 立即生效，骨架屏直出
        const immediate = mount(Skeleton, { props: { loading: true, delay: 0 } });
        expect(immediate.find(`.${name}`).exists()).toBe(true);
      } finally {
        vi.useRealTimers();
      }
    });

    it('loading[boolean]', async () => {
      const wrapper = mount(Skeleton, { props: { loading: true } });
      // 加载中：渲染骨架屏，默认 theme=text 输出两行
      expect(wrapper.find(`.${name}`).exists()).toBe(true);
      expect(getRows(wrapper)).toHaveLength(2);

      // 加载完成：渲染空内容，不再输出骨架屏
      await wrapper.setProps({ loading: false });
      expect(wrapper.find(`.${name}`).exists()).toBe(false);
      expect(wrapper.text()).toBe('');

      // 重新进入加载态：骨架屏恢复
      await wrapper.setProps({ loading: true });
      expect(wrapper.find(`.${name}`).exists()).toBe(true);
      expect(getRows(wrapper)).toHaveLength(2);
    });

    it('rowCol[array]', () => {
      // 数字项表示该行的列数：三行，列数依次为 1/1/2，数字列默认 text 类型且无内联样式
      const wrapper = mount(Skeleton, { props: { rowCol: [1, 1, 2] } });
      const $rows = getRows(wrapper);
      expect($rows).toHaveLength(3);
      expect($rows[0].findAll(`.${name}__col`)).toHaveLength(1);
      expect($rows[1].findAll(`.${name}__col`)).toHaveLength(1);
      expect($rows[2].findAll(`.${name}__col`)).toHaveLength(2);
      expect($rows[0].find(`.${name}__col`).classes()).toContain(`${name}--type-text`);

      // 嵌套数组项：一行多列，列样式由列对象决定
      const wrapper2 = mount(Skeleton, {
        props: { rowCol: [[{ width: '24%' }, { width: '76%' }], 1] },
      });
      const $rows2 = getRows(wrapper2);
      expect($rows2).toHaveLength(2);
      const firstRowCols = $rows2[0].findAll(`.${name}__col`);
      expect(firstRowCols).toHaveLength(2);
      expect(firstRowCols[0].attributes('style')).toContain('width: 24%');
      expect(firstRowCols[1].attributes('style')).toContain('width: 76%');

      // 对象项：type 驱动列类型，数值样式自动补 px，size 同时作用于宽高
      const wrapper3 = mount(Skeleton, {
        props: {
          rowCol: [
            [
              { type: 'rect', width: 100, height: 16, margin: 8, borderRadius: 4, background: '#eeeeee' },
              {
                type: 'circle',
                size: 48,
                marginRight: '4px',
                marginLeft: '2px',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              },
            ],
          ] as unknown as TdSkeletonProps['rowCol'],
        },
      });
      const styledCols = getCols(wrapper3);
      expect(styledCols).toHaveLength(2);
      expect(styledCols[0].classes()).toContain(`${name}--type-rect`);
      expect(styledCols[0].attributes('style')).toContain('width: 100px');
      expect(styledCols[0].attributes('style')).toContain('height: 16px');
      expect(styledCols[0].attributes('style')).toContain('margin: 8px');
      expect(styledCols[0].attributes('style')).toContain('border-radius: 4px');
      // jsdom 会将十六进制颜色序列化为 rgb 形式
      expect(styledCols[0].attributes('style')).toContain('background: rgb(238, 238, 238)');
      expect(styledCols[1].classes()).toContain(`${name}--type-circle`);
      expect(styledCols[1].attributes('style')).toContain('width: 48px');
      expect(styledCols[1].attributes('style')).toContain('height: 48px');
      expect(styledCols[1].attributes('style')).toContain('margin-right: 4px');
      expect(styledCols[1].attributes('style')).toContain('margin-left: 2px');
      expect(styledCols[1].attributes('style')).toContain('background-color: rgba(0, 0, 0, 0.1)');

      // 对象项未传 type 时默认 text；content 支持字符串与渲染函数两种内容
      const wrapper4 = mount(Skeleton, {
        props: {
          rowCol: [{ content: 'TDesign' }, { content: () => <span class="rowcol-tnode">骨架图列内容</span> }],
        },
      });
      const contentCols = getCols(wrapper4);
      expect(contentCols).toHaveLength(2);
      expect(contentCols[0].classes()).toContain(`${name}--type-text`);
      expect(contentCols[0].text()).toBe('TDesign');
      expect(contentCols[1].text()).toBe('骨架图列内容');
      expect(wrapper4.find('.rowcol-tnode').exists()).toBe(true);
    });

    it('theme[text]', () => {
      // 默认值 text：首行两列（24%/76%）+ 次行一列，均为 text 类型
      const wrapper = mount(Skeleton);
      const $rows = getRows(wrapper);
      expect($rows).toHaveLength(2);
      const firstRowCols = $rows[0].findAll(`.${name}__col`);
      expect(firstRowCols).toHaveLength(2);
      expect(firstRowCols[0].attributes('style')).toContain('width: 24%');
      expect(firstRowCols[0].attributes('style')).toContain('margin-right: 16px');
      expect(firstRowCols[0].attributes('style')).toContain('height: 16px');
      expect(firstRowCols[1].attributes('style')).toContain('width: 76%');
      expect($rows[1].findAll(`.${name}__col`)).toHaveLength(1);
      getCols(wrapper).forEach(($col) => {
        expect($col.classes()).toContain(`${name}--type-text`);
      });
    });

    it('theme[paragraph]', () => {
      const paragraph = mount(Skeleton, { props: { theme: 'paragraph' } });
      const $paragraphRows = getRows(paragraph);
      expect($paragraphRows).toHaveLength(4);
      $paragraphRows.forEach(($row) => {
        expect($row.findAll(`.${name}__col`)).toHaveLength(1);
      });
      expect($paragraphRows[3].find(`.${name}__col`).attributes('style')).toContain('width: 55%');
    });

    it.each([
      ['avatar', 'circle', '48px'],
      ['image', 'rect', '72px'],
    ] as const)('theme[%s]', (theme, type, size) => {
      const wrapper = mount(Skeleton, { props: { theme } });
      expect(getRows(wrapper)).toHaveLength(1);
      const col = wrapper.find(`.${name}__col`);
      expect(col.classes()).toContain(`${name}--type-${type}`);
      expect(col.attributes('style')).toContain(`width: ${size}`);
      expect(col.attributes('style')).toContain(`height: ${size}`);
    });

    it('default[slot]', () => {
      const wrapper = mount(Skeleton, {
        slots: { default: () => <div class="slot-content">加载完成的内容</div> },
      });
      // 传入默认插槽后渲染插槽内容，骨架屏结构不再输出
      expect(wrapper.find('.slot-content').text()).toBe('加载完成的内容');
      expect(wrapper.find(`.${name}`).exists()).toBe(false);
    });
  });
});

import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Skeleton from '../skeleton';

const prefix = 't';
const name = `${prefix}-skeleton`;
const TEXT = 'tdesign-mobile-vue';

describe('Skeleton', () => {
  describe('props', () => {
    it('animation[gradient/flashed/none]', async () => {
      const rowCol = [1];
      const wrapper = mount(Skeleton, {
        props: {
          rowCol,
        },
      });
      // animation 默认 none, 没有渐变/闪烁动画
      const $skeleton = wrapper.findComponent(Skeleton);

      // 自定义 rowCol, 1行1列
      const $rows = $skeleton.findAll(`.${name}__row`);
      expect($rows.length).toEqual(rowCol.length);
      expect($rows[0].findAll(`.${name}__col`)[0].classes().includes(`${name}--animation-gradient`)).toBeFalsy();
      expect($rows[0].findAll(`.${name}__col`)[0].classes().includes(`${name}--animation-flashed`)).toBeFalsy();

      const animation = 'flashed';
      await wrapper.setProps({
        animation,
      });
      // animation = 'flashed'
      expect($rows[0].findAll(`.${name}__col`)[0].classes().includes(`${name}--animation-${animation}`)).toBeTruthy();
    });

    it('delay[number]', async () => {
      const wrapper = mount(Skeleton, {
        props: {
          loading: true,
          delay: 100,
        },
      });
      // 延迟未到时不渲染骨架屏，避免加载闪烁
      expect(wrapper.find(`.${name}`).exists()).toBe(false);
      await new Promise((resolve) => {
        setTimeout(resolve, 150);
      });
      expect(wrapper.find(`.${name}`).exists()).toBe(true);
    });

    it('loading[boolean]', async () => {
      const wrapper = mount(Skeleton, {
        props: {
          loading: true,
        },
      });
      const $skeleton = wrapper.findComponent(Skeleton);
      // loading = true, 加载状态, 默认取 theme = 'text', 2行
      const $rows = $skeleton.findAll(`.${name}__row`);
      expect($rows.length).toBe(2);
    });

    it('rowCol[array]', async () => {
      const wrapper = mount(Skeleton, {
        props: {
          rowCol: [1, 1, 2],
        },
      });
      // 数字项表示该行的列数：3 行，列数依次为 1/1/2
      const $rows = wrapper.findAll(`.${name}__row`);
      expect($rows).toHaveLength(3);
      expect($rows[0].findAll(`.${name}__col`)).toHaveLength(1);
      expect($rows[1].findAll(`.${name}__col`)).toHaveLength(1);
      expect($rows[2].findAll(`.${name}__col`)).toHaveLength(2);

      // 对象配置驱动列的类型与尺寸
      const wrapper2 = mount(Skeleton, {
        props: {
          rowCol: [{ type: 'rect', width: '100px', height: '20px' }],
        },
      });
      const $col = wrapper2.find(`.${name}__col`);
      expect($col.classes()).toContain(`${name}--type-rect`);
      expect($col.attributes('style')).toContain('width: 100px');
      expect($col.attributes('style')).toContain('height: 20px');
    });

    it('theme[avatar/image/text/paragraph]', async () => {
      const wrapper = mount(Skeleton);
      // theme 默认取 'text', 此时 rowCol = [1, [{ width: '24%', height: '16px', marginRight: '16px' },{ width: '76%', height: '16px' }]
      const $skeleton = wrapper.findComponent(Skeleton);
      const $rows = $skeleton.findAll(`.${name}__row`);
      // 2行
      expect($rows.length).toBe(2);
      // 第1行2列， 第2行1列
      const firstRowCol = $rows[0].findAll(`.${name}__col`);
      const secondRowCol = $rows[1].findAll(`.${name}__col`);
      expect(firstRowCol.length).toBe(2);
      expect(firstRowCol[0].classes()).toContain(`${name}--type-text`);
      expect(firstRowCol[1].classes()).toContain(`${name}--type-text`);
      expect(secondRowCol.length).toBe(1);
      expect(secondRowCol[0].classes()).toContain(`${name}--type-text`);

      const image = 'image';
      await wrapper.setProps({
        theme: image,
      });
      // rowCol = [{ type: 'rect', height: '64px', width: '64px' }],
      // 1行1列
      const thirdRowCol = $rows[0].findAll(`.${name}__col`);
      expect(thirdRowCol.length).toBe(1);
      expect(thirdRowCol[0].classes()).toContain(`${name}--type-rect`);
    });
  });
});

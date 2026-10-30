import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Grid from '../grid';
import GridItem from '../grid-item';
import Badge from '../../badge/badge';
import type { TdGridProps, TdGridItemProps } from '../type';
import { trigger } from '@/image-viewer/__tests__/touch';

const prefix = 't';
const name = `${prefix}-grid`;
const imgUrl = 'https://tdesign.gtimg.com/mobile/%E5%9B%BE%E7%89%87.png';

const sleep = (timeout: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
const items = [
  {
    text: '标题',
    image: imgUrl,
  },
  {
    text: '标题',
    image: imgUrl,
  },
];
const items2 = [
  {
    text: '标题',
    description: '内容 description',
    image: imgUrl,
  },
  {
    text: '标题',
    description: '内容 description',
    image: imgUrl,
  },
];
describe('Grid', () => {
  describe('props', () => {
    it('align[left/center]', async () => {
      const alignList: TdGridProps['align'][] = ['left', 'center'];
      alignList.forEach((a) => {
        const wrapper = mount(() => {
          return (
            <Grid align={a}>
              <GridItem />
            </Grid>
          );
        });
        const $gridItem = wrapper.find('.t-grid-item');
        if (a === 'left') {
          expect($gridItem.element.style.textAlign).toBe('left');
        } else {
          expect($gridItem.element.style.textAlign).toBe('center');
        }
      });
    });

    it('border[boolean]', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Grid border={true}>
              {{
                default: () =>
                  items.map((item, index) => {
                    return <GridItem text={item.text + index} image={item.image} />;
                  }),
              }}
            </Grid>
          );
        },
      });
      const $gridItems = wrapper.findAll(`.${name}-item`);
      // border: object
      $gridItems.forEach((item) => {
        expect(item.attributes('class').includes(`${name}-item--bordered`)).toBeTruthy(); // border
      });
    });

    it('column[number] & gutter[number]', async () => {
      const column = 5;
      const gutter = 10;
      const wrapper = mount({
        setup() {
          return () => (
            <Grid column={column}>
              {{
                default: () =>
                  items.map((item, index) => {
                    return <GridItem text={item.text + index} image={item.image} />;
                  }),
              }}
            </Grid>
          );
        },
      });
      expect(wrapper.findComponent(Grid).exists()).toBeTruthy();
      expect(wrapper.findAllComponents(GridItem).length).toEqual(items.length);
      const $grid = wrapper.find(`.${name}`);
      const $gridItems = wrapper.findAll(`.${name}-item`);
      // column = 4, gutter = 10 (自定义)
      $gridItems.forEach((item) => {
        expect(item.element.style.textAlign).toBe('center'); // align 默认为 center
        expect(item.element.style.flexBasis).toBe(`${100 / column}%`); // column
      });
    });

    it('column[zero]', async () => {
      const wrapper = mount(() => {
        return (
          <Grid column={0}>
            <GridItem></GridItem>
          </Grid>
        );
      });
      expect(wrapper.find('.t-grid--auto-size').exists()).toBeTruthy();
    });

    it('hover[boolean]', async () => {
      // hover 为 true 时，宫格项触摸按下短暂延迟后出现点击态类名，松开一段时间后移除
      const wrapper = mount(() => (
        <Grid hover>
          <GridItem text="标题" />
        </Grid>
      ));
      const $gridItem = wrapper.find(`.${name}-item`);
      await trigger($gridItem, 'touchstart');
      await sleep(60);
      expect($gridItem.classes()).toContain(`${name}-item--hover`);

      await trigger($gridItem, 'touchend');
      await sleep(80);
      expect($gridItem.classes()).not.toContain(`${name}-item--hover`);

      // 默认关闭 hover，按下不出现点击态类名
      const wrapper2 = mount(() => (
        <Grid>
          <GridItem text="标题" />
        </Grid>
      ));
      const $gridItem2 = wrapper2.find(`.${name}-item`);
      await trigger($gridItem2, 'touchstart');
      await sleep(60);
      expect($gridItem2.classes()).not.toContain(`${name}-item--hover`);
    });

    it('theme[default/card]', async () => {
      const themeList: TdGridProps['theme'][] = ['default', 'card'];
      themeList.forEach((t) => {
        const wrapper = mount(() => {
          return (
            <Grid theme={t}>
              <GridItem />
            </Grid>
          );
        });
        if (t === 'card') {
          expect(wrapper.find(`.t-grid--card`).exists()).toBe(true);
        } else {
          expect(wrapper.find(`.t-grid--card`).exists()).toBe(false);
        }
      });
    });
  });
});

import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Grid from '../grid';
import GridItem from '../grid-item';
import Badge from '../../badge/badge';

const prefix = 't';
const name = `${prefix}-grid`;
const imgUrl = 'https://tdesign.gtimg.com/mobile/%E5%9B%BE%E7%89%87.png';
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
    it('align[string]', async () => {
      const alignList = ['left', 'center', ''];
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

    it('theme[string]', async () => {
      const themeList = ['default', 'card', ''];
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

    it('border[boolean]', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Grid border={true}>
              {{
                default: items.map((item, index) => {
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
                default: items.map((item, index) => {
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

    // hover 点击态样式依赖交互反馈
    it.todo('hover[boolean]');
  });
});

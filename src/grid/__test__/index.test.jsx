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
describe('grid', () => {
  describe('props', () => {
    it(':align', async () => {
      const alignList = ['left', 'center', ''];
      alignList.map((a) => {
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

    it(':theme', async () => {
      const themeList = ['default', 'card', ''];
      themeList.map((t) => {
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

    it(':border ', async () => {
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
      $gridItems.map((item) => {
        expect(item.attributes('class').includes(`${name}-item--bordered`)).toBeTruthy(); // border
      });
    });

    it(':column & gutter ', async () => {
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
      $gridItems.map((item) => {
        expect(item.element.style.textAlign).toBe('center'); // align 默认为 center
        expect(item.element.style.flexBasis).toBe(`${100 / column}%`); // column
      });
    });

    it(':column = 0', async () => {
      const wrapper = mount(() => {
        return (
          <Grid column={0}>
            <GridItem></GridItem>
          </Grid>
        );
      });
      expect(wrapper.find('.t-grid--auto-size').exists()).toBeTruthy();
    });
  });
});

describe('grid-item', () => {
  describe('props', () => {
    it(':text & image & description', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Grid>
              {{
                default: items2.map((item, index) => {
                  return (
                    <GridItem text={item.text + index} description={item.description + index} image={item.image} />
                  );
                }),
              }}
            </Grid>
          );
        },
      });

      const $gridItems = wrapper.findAll(`.${name}-item`);
      $gridItems.map((item, index) => {
        expect(item.find(`.${name}-item__title`).text()).toEqual(items2[index].text + index);
        expect(item.find(`.${name}-item__description`).text()).toEqual(items2[index].description + index);
        const $img = item.find(`.${name}-item__image img`);
        expect($img.exists()).toBeTruthy();
        expect($img.attributes('src')).toBe(imgUrl);
      });
    });
  });

  it(':badge', async () => {
    const wrapper = mount(() => (
      <Grid>
        <GridItem badge={{ count: 1 }}></GridItem>
      </Grid>
    ));
    const badge = wrapper.find('.t-badge--basic ');
    expect(wrapper.findComponent(Badge).exists()).toBeTruthy();
    expect(badge.exists()).toBeTruthy();
    expect(badge.text()).toBe('1');
  });

  it(':layout', async () => {
    const layoutList = ['vertical', 'horizontal', ''];
    layoutList.map((l) => {
      const wrapper = mount(() => {
        return (
          <Grid>
            <GridItem layout={l} />
          </Grid>
        );
      });
      if (l) {
        expect(wrapper.find('.t-grid-item').classes()).toContain(`t-grid-item--${l}`);
      }
    });
  });
});

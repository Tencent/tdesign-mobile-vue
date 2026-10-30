import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Grid from '../grid';
import GridItem from '../grid-item';
import Badge from '../../badge/badge';
import type { TdGridItemProps } from '../type';

const prefix = 't';
const name = `${prefix}-grid`;
const imgUrl = 'https://tdesign.gtimg.com/mobile/%E5%9B%BE%E7%89%87.png';
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

describe('GridItem', () => {
  describe('props', () => {
    it('badge[object]', async () => {
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

    // icon 自定义宫格图标
    it.todo('icon[function]');

    it('layout[vertical/horizontal]', async () => {
      const layoutList: TdGridItemProps['layout'][] = ['vertical', 'horizontal'];
      layoutList.forEach((l) => {
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

    it('text & image & description', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Grid>
              {{
                default: () =>
                  items2.map((item, index) => {
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
      $gridItems.forEach((item, index) => {
        expect(item.find(`.${name}-item__title`).text()).toEqual(items2[index].text + index);
        expect(item.find(`.${name}-item__description`).text()).toEqual(items2[index].description + index);
        const $img = item.find(`.${name}-item__image img`);
        expect($img.exists()).toBeTruthy();
        expect($img.attributes('src')).toBe(imgUrl);
      });
    });
  });
});

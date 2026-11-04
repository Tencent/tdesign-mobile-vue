import { enableAutoUnmount, mount } from '@vue/test-utils';
import { afterEach, describe, it, expect, vi } from 'vitest';
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

enableAutoUnmount(afterEach);

describe('GridItem', () => {
  describe('props', () => {
    it('badge[object]', () => {
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

    it('description[string]', () => {
      const wrapper = mount(() => (
        <Grid>
          <GridItem text="标题" description="描述文本" />
        </Grid>
      ));
      expect(wrapper.get(`.${name}-item__description`).text()).toBe('描述文本');
    });

    it('description[function]', () => {
      const wrapper = mount(() => (
        <Grid>
          <GridItem description={() => <span>函数描述</span>} />
        </Grid>
      ));
      expect(wrapper.get(`.${name}-item__description`).text()).toBe('函数描述');
    });

    it('icon[function]', () => {
      const wrapper = mount(() => (
        <Grid>
          <GridItem icon={() => <span class="custom-grid-icon">自定义图标</span>} />
        </Grid>
      ));
      // icon 渲染在图片区域，且不再渲染默认 image
      expect(wrapper.find(`.${name}-item__image .custom-grid-icon`).exists()).toBe(true);
      expect(wrapper.find(`.${name}-item__image img`).exists()).toBe(false);
    });

    it('image[string]', () => {
      const wrapper = mount(() => (
        <Grid>
          <GridItem image={imgUrl} />
        </Grid>
      ));
      expect(wrapper.get(`.${name}-item__image img`).attributes('src')).toBe(imgUrl);
    });

    it('image[object]', () => {
      const wrapper = mount(() => (
        <Grid>
          <GridItem image={{ src: imgUrl, lazy: false }} />
        </Grid>
      ));
      expect(wrapper.findComponent({ name: 'TImage' }).props()).toMatchObject({ src: imgUrl, lazy: false });
    });

    it('image[function]', () => {
      const wrapper = mount(() => (
        <Grid>
          <GridItem image={() => <span class="custom-image">图片节点</span>} />
        </Grid>
      ));
      expect(wrapper.get(`.${name}-item__image .custom-image`).text()).toBe('图片节点');
    });

    it('layout[vertical/horizontal]', () => {
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

    it('text[string]', () => {
      const wrapper = mount(() => (
        <Grid>
          <GridItem text="文字标题" />
        </Grid>
      ));
      expect(wrapper.get(`.${name}-item__title`).text()).toBe('文字标题');
    });

    it('text[function]', () => {
      const wrapper = mount(() => (
        <Grid>
          <GridItem text={() => <span>函数标题</span>} />
        </Grid>
      ));
      expect(wrapper.get(`.${name}-item__title`).text()).toBe('函数标题');
    });
  });

  describe('events', () => {
    it('click', async () => {
      const onClick = vi.fn();
      const wrapper = mount(Grid, { slots: { default: () => <GridItem text="选项" onClick={onClick} /> } });
      await wrapper.get(`.${name}-item`).trigger('click');
      expect(onClick).toHaveBeenCalledWith(expect.any(MouseEvent));
      expect(wrapper.findComponent(GridItem).emitted('click')).toEqual([[expect.any(MouseEvent)]]);
    });
  });

  describe('slots', () => {
    it('text', () => {
      const wrapper = mount(Grid, { slots: { default: () => <GridItem v-slots={{ text: () => <b>标题插槽</b> }} /> } });
      expect(wrapper.get(`.${name}-item__title b`).text()).toBe('标题插槽');
    });

    it('description', () => {
      const wrapper = mount(Grid, {
        slots: { default: () => <GridItem v-slots={{ description: () => <i>描述插槽</i> }} /> },
      });
      expect(wrapper.get(`.${name}-item__description i`).text()).toBe('描述插槽');
    });

    // renderImage 先检查 props.icon；未传 icon Prop 时不调用 renderTNodeJSX('icon')，插槽路径不可达。
    it.todo('icon');

    it('image', () => {
      const wrapper = mount(Grid, {
        slots: { default: () => <GridItem v-slots={{ image: () => <b>图片插槽</b> }} /> },
      });
      expect(wrapper.get(`.${name}-item__image b`).text()).toBe('图片插槽');
    });
  });

  describe('scenarios', () => {
    it('image prop takes priority over image slot', () => {
      const wrapper = mount(Grid, {
        slots: { default: () => <GridItem image={imgUrl} v-slots={{ image: () => <b>图片插槽</b> }} /> },
      });
      expect(wrapper.get(`.${name}-item__image img`).attributes('src')).toBe(imgUrl);
      expect(wrapper.find('b').exists()).toBe(false);
    });

    it('icon prop takes priority over icon slot', () => {
      const wrapper = mount(Grid, {
        slots: { default: () => <GridItem icon={() => <b>属性图标</b>} v-slots={{ icon: () => <i>插槽图标</i> }} /> },
      });
      expect(wrapper.get(`.${name}-item__image b`).text()).toBe('属性图标');
      expect(wrapper.find('i').exists()).toBe(false);
    });

    it('text prop takes priority over text slot', () => {
      const wrapper = mount(Grid, {
        slots: { default: () => <GridItem text="属性标题" v-slots={{ text: () => <b>插槽标题</b> }} /> },
      });
      expect(wrapper.get(`.${name}-item__title`).text()).toBe('属性标题');
    });

    it('description prop takes priority over description slot', () => {
      const wrapper = mount(Grid, {
        slots: { default: () => <GridItem description="属性描述" v-slots={{ description: () => <b>插槽描述</b> }} /> },
      });
      expect(wrapper.get(`.${name}-item__description`).text()).toBe('属性描述');
    });

    it('renders text, image and description together', () => {
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

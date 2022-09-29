import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Grid from '../grid.vue';
import GridItem from '../grid-item.vue';
import Badge from '../../badge/badge.vue';

const imgUrl = 'https://tdesign.gtimg.com/mobile/%E5%9B%BE%E7%89%87.png';

describe('Grid.vue', () => {
  it('create', async () => {
    const wrapper = mount(() => (
      <Grid>
        <GridItem></GridItem>
        <GridItem></GridItem>
        <GridItem></GridItem>
      </Grid>
    ));
    expect(wrapper.classes()).toContain('t-grid');
    expect(wrapper.findAll('.t-grid-item').length).toBe(3);
  });

  it('align render', async () => {
    const wrapper = mount(() => (
      <Grid align="left">
        <GridItem></GridItem>
        <GridItem></GridItem>
        <GridItem></GridItem>
      </Grid>
    ));
    const item = wrapper.find('.t-grid-item');
    expect(item.element.style.textAlign).toBe('left');
  });

  it('border render', async () => {
    const wrapper = mount(() => (
      <Grid border>
        <GridItem></GridItem>
        <GridItem></GridItem>
        <GridItem></GridItem>
      </Grid>
    ));
    const borderItem = wrapper.findAll('.t-grid-item--bordered');
    expect(borderItem.length).toBe(3);
  });

  it('column render', async () => {
    const wrapper = mount(() => (
      <Grid column={1}>
        <GridItem></GridItem>
        <GridItem></GridItem>
        <GridItem></GridItem>
      </Grid>
    ));
    const item = wrapper.find('.t-grid-item');
    expect(item.element.style.flexBasis).toBe('100%');
  });
});

describe('GridItem.vue', () => {
  it('badgeProps render', async () => {
    const wrapper = mount(() => (
      <Grid>
        <GridItem badgeProps={{ count: 1 }}></GridItem>
      </Grid>
    ));
    const badge = wrapper.find('.t-badge__inner ');
    expect(wrapper.findComponent(Badge).exists()).toBeTruthy();
    expect(badge.exists()).toBeTruthy();
    expect(badge.text()).toBe('1');
  });

  it('text render', async () => {
    const wrapper = mount(() => (
      <Grid>
        <GridItem text="文字信息"></GridItem>
      </Grid>
    ));
    const item = wrapper.find('.t-grid-item');
    const title = item.find('.t-grid-item__title');
    expect(title.exists()).toBeTruthy();
    expect(title.text()).toBe('文字信息');
  });

  it('description render', async () => {
    const wrapper = mount(() => (
      <Grid>
        <GridItem description="描述信息"></GridItem>
      </Grid>
    ));
    const item = wrapper.find('.t-grid-item');
    const desc = item.find('.t-grid-item__description');
    expect(desc.exists()).toBeTruthy();
    expect(desc.text()).toBe('描述信息');
  });

  it('image render', async () => {
    const wrapper = mount(() => (
      <Grid>
        <GridItem image={imgUrl}></GridItem>
      </Grid>
    ));
    const item = wrapper.find('.t-grid-item');
    const img = item.find('.t-grid-item__image-box img');
    expect(img.exists()).toBeTruthy();
    expect(img.attributes('src')).toBe(imgUrl);
  });

  it('layout render', async () => {
    const wrapper = mount(() => (
      <Grid>
        <GridItem text="标题文字" image={imgUrl} description="描述" layout="horizontal"></GridItem>
      </Grid>
    ));
    const item = wrapper.find('.t-grid-item');
    expect(item.element.style.flexDirection).toBe('row');
  });
});

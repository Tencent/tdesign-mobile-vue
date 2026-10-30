import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Badge from '../badge';
import Button from '../../button/button';
import config from '../../config';

const { prefix } = config;
const name = `${prefix}-badge`;
const TEXT = 'Badge 徽标';

describe('Badge', () => {
  describe('props', () => {
    it('color[string]', () => {
      const wrapper = mount(() => (
        <Badge color="red" count={5}>
          <Button>按钮</Button>
        </Badge>
      ));
      const inner = wrapper.find(`.${name}--basic`);
      expect(inner.attributes('style')).toContain('background: red');
    });

    it('count[number]', () => {
      const wrapper = mount(() => (
        <Badge count={5}>
          <Button>按钮</Button>
        </Badge>
      ));
      const inner = wrapper.find(`.${name}--count`);
      expect(inner.text()).toEqual('5');
    });

    it('count[string]', () => {
      const wrapper = mount(() => (
        <Badge count="new">
          <Button>按钮</Button>
        </Badge>
      ));
      const inner = wrapper.find(`.${name}--count`);
      expect(inner.exists()).toBeTruthy();
      expect(inner.text()).toEqual('new');
    });

    it('count[function]', () => {
      const wrapper = mount(() => (
        <Badge count={() => 'hot'}>
          <Button>按钮</Button>
        </Badge>
      ));
      const inner = wrapper.find(`.${name}--count`);
      expect(inner.exists()).toBeTruthy();
      expect(inner.text()).toEqual('hot');
    });

    it('dot[boolean]', () => {
      const wrapper = mount(() => (
        <Badge dot>
          <Button>按钮</Button>
        </Badge>
      ));
      const dot = wrapper.find(`.${name}--dot`);
      expect(dot.exists()).toBeTruthy();
      expect(wrapper.findComponent(Button).text()).toEqual(`按钮`);
    });

    it('maxCount[number]', () => {
      const count = 100;
      const maxCount = 50;
      const wrapper = mount(() => (
        <Badge count={count} maxCount={maxCount}>
          <Button>按钮</Button>
        </Badge>
      ));
      const inner = wrapper.find(`.${name}--count`);
      expect(inner.exists()).toBeTruthy();
      expect(inner.text()).toEqual(`${maxCount}+`);
    });

    it('offset[array]', () => {
      const count = 100;
      const offset = [20, 30];
      const wrapper = mount(() => (
        <Badge count={count} offset={offset}>
          <Button>按钮</Button>
        </Badge>
      ));
      const inner = wrapper.find(`.${name}--basic`);
      expect(inner.attributes('style').includes(`left: calc(100% + ${offset[0]}px); top: ${offset[1]}px`)).toBeTruthy();
    });

    it('shape[circle/square/bubble/ribbon/ribbon-right/ribbon-left/triangle-right/triangle-left]', async () => {
      const count = 16;
      const wrapper = mount(Badge, {
        props: {
          count,
          content: TEXT,
        },
      });
      // shape 默认 circle
      const $badge = wrapper.findComponent(Badge);
      const inner = $badge.find(`.${name}--basic`);
      expect(inner.classes()).toContain(`${name}--circle`);
      ['ribbon', 'round'].forEach((s) => {
        expect(inner.classes().includes(`${name}--${s}`)).toBeFalsy();
      });
      expect($badge.text()).toEqual(`${TEXT}${count}`);

      const shape = 'ribbon';
      await wrapper.setProps({
        shape,
      });
      expect(inner.classes()).toContain(`${name}--${shape}`);
    });

    it('showZero[boolean]', () => {
      const wrapper = mount(() => (
        <Badge showZero>
          <Button>按钮</Button>
        </Badge>
      ));
      const inner = wrapper.find(`.${name}--basic`);
      expect(inner.exists()).toBeTruthy();
      expect(inner.text()).toEqual('0');
    });

    it('size[medium/large]', async () => {
      // size 默认 medium；large 增大尺寸
      const wrapper = mount(Badge, {
        props: {
          dot: true,
          content: TEXT,
        },
      });
      const $badge = wrapper.findComponent(Badge);
      const inner = $badge.find(`.${name}--basic`);
      expect(inner.classes()).toContain(`${name}--medium`);

      await wrapper.setProps({ size: 'large' });
      expect(inner.classes()).toContain(`${name}--large`);
    });
  });
});

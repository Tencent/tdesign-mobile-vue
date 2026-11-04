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

    it('content[string]', () => {
      const wrapper = mount(() => <Badge content={TEXT} />);
      // content 作为徽标主体内容渲染
      expect(wrapper.find(`.${name}__content-text`).text()).toEqual(TEXT);
      // count 默认 0 且未开启 showZero 时不渲染角标，但 content 内容区不受影响
      expect(wrapper.find(`.${name}--basic`).exists()).toEqual(false);
    });

    it('content[function]', () => {
      const wrapper = mount(() => <Badge content={() => TEXT} />);
      expect(wrapper.find(`.${name}__content-text`).text()).toEqual(TEXT);
    });

    it('content[slot]', () => {
      const wrapper = mount(Badge, {
        slots: {
          content: '插槽徽标内容',
        },
      });

      expect(wrapper.find(`.${name}__content`).text()).toBe('插槽徽标内容');
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

    it('offset[array<number>]', () => {
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

    it('offset[array<string>]', () => {
      const wrapper = mount(() => (
        <Badge count={1} offset={['10em', '8rem']}>
          <Button>按钮</Button>
        </Badge>
      ));
      const style = wrapper.find(`.${name}--basic`).attributes('style');
      expect(style).toContain('left: calc(100% + 10em)');
      expect(style).toContain('top: 8rem');
    });

    it('shape[circle/square/bubble/ribbon/ribbon-right/ribbon-left/triangle-right/triangle-left]', () => {
      const shapes = [
        'circle',
        'square',
        'bubble',
        'ribbon',
        'ribbon-right',
        'ribbon-left',
        'triangle-right',
        'triangle-left',
      ] as const;

      shapes.forEach((shape) => {
        const wrapper = mount(Badge, {
          props: {
            count: 16,
            shape,
          },
        });
        expect(wrapper.find(`.${name}--basic`).classes()).toContain(`${name}--${shape}`);
      });
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

    it('size[medium/large]', () => {
      (['medium', 'large'] as const).forEach((size) => {
        const wrapper = mount(Badge, {
          props: {
            count: 1,
            size,
          },
        });
        expect(wrapper.find(`.${name}--basic`).classes()).toContain(`${name}--${size}`);
      });
    });

    it('default[slot]', () => {
      const wrapper = mount(Badge, {
        slots: {
          default: '默认内容',
        },
      });

      expect(wrapper.find(`.${name}__content`).text()).toBe('默认内容');
    });
  });
});

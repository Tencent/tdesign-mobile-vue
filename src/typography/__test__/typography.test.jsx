import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { Typography, TypographyText, TypographyTitle, TypographyParagraph } from '../index';

const prefix = 't';
const COMPONENT_NAME = `${prefix}-typography`;

const longText =
  'TDesign 秉承开放的设计理念从创立之初就采用开源协作的方式进行设计和开发。协作方案讨论、组件设计以及 API 设计，包括源代码在内均在公司内部完全开放，赢得了内部开发者和设计师的广泛关注。TDesign 遵循平等、开放、严格的原则，不论参与者的角色如何。';
const shortText = 'TDesign 是腾讯各业务团队在服务业务过程中沉淀的一套企业级设计体系。';

describe('Typography', () => {
  describe('props', () => {
    it(':default slot', () => {
      const wrapper = mount(Typography, {
        slots: {
          default: () => longText,
        },
      });
      expect(wrapper.find(`.${COMPONENT_NAME}`).exists()).toBe(true);
      expect(wrapper.text()).toContain(longText);
    });

    it('renders as Text component wrapper', () => {
      const wrapper = mount(Typography, {
        slots: {
          default: () => shortText,
        },
      });
      expect(wrapper.find(`.${COMPONENT_NAME}`).exists()).toBe(true);
    });

    it('renders without default slot content', () => {
      const wrapper = mount(Typography);
      expect(wrapper.find(`.${COMPONENT_NAME}`).exists()).toBe(true);
    });
  });
});

describe('Typography exports', () => {
  it('exports all sub-components', () => {
    expect(Typography).toBeDefined();
    expect(TypographyText).toBeDefined();
    expect(TypographyTitle).toBeDefined();
    expect(TypographyParagraph).toBeDefined();
  });
});

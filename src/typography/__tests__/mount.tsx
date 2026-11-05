import { mount } from '@vue/test-utils';
import type { Component } from 'vue';

export const COMPONENT_NAME = 't-typography';

export const longText =
  'TDesign 秉承开放的设计理念从创立之初就采用开源协作的方式进行设计和开发。协作方案讨论、组件设计以及 API 设计，包括源代码在内均在公司内部完全开放，赢得了内部开发者和设计师的广泛关注。TDesign 遵循平等、开放、严格的原则，不论参与者的角色如何。';

export const shortText = 'TDesign 是腾讯各业务团队在服务业务过程中沉淀的一套企业级设计体系。';

export const mountWithEllipsis = (component: Component, ellipsis: boolean | Record<string, unknown>) =>
  mount(component, { props: { ellipsis }, slots: { default: () => longText } });

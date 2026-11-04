import { mount } from '@vue/test-utils';
import { Tabs } from '../index';
import type { TdTabPanelProps, TdTabsProps } from '../type';

// jsdom 未实现 scrollTo，组件定位激活项时会调用 navScroll.scrollTo
// see: https://github.com/vuejs/vue-test-utils/issues/319
Element.prototype.scrollTo = () => {};

export const prefix = 't';
export const name = `${prefix}-tabs`;
export const tabPanelName = `${prefix}-tab-panel`;

export const tabList: TdTabPanelProps[] = [
  { value: '1', label: '标签页一', panel: '标签一内容区' },
  { value: '2', label: '标签页二', panel: '标签二内容区' },
];

export const numericTabList: TdTabPanelProps[] = [
  { value: 1, label: '标签页一', panel: '标签一内容区' },
  { value: 2, label: '标签页二', panel: '标签二内容区' },
];

export const mountTabs = (props: TdTabsProps = {}) => mount(Tabs, { props: { list: tabList, ...props } });

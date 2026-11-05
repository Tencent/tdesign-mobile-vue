import { mount, VueWrapper } from '@vue/test-utils';
import TabBar from '../tab-bar';
import TabBarItem from '../tab-bar-item';
import type { SubTabBarItem } from '../type';

/** TabBarItem 挂载描述：value 缺省时子项按挂载顺序自动分配索引作为标识 */
export interface TabBarItemDesc {
  value?: string | number;
  label: string;
  subTabBar?: SubTabBarItem[];
}

/** 二级菜单数据 */
export const subTabBarItems: SubTabBarItem[] = [
  { value: '3-1', label: '展开项一' },
  { value: '3-2', label: '展开项二' },
  { value: '3-3', label: '展开项三' },
];

/** 三个子项：前两项为普通标签，第三项带二级菜单 */
const barItems: TabBarItemDesc[] = [
  { value: '1', label: '标签一' },
  { value: '2', label: '标签二' },
  { value: '3', label: '此处展开', subTabBar: subTabBarItems },
];

/** 数字 value 子项 */
export const numericBarItems: TabBarItemDesc[] = [
  { value: 1, label: '标签一' },
  { value: 2, label: '标签二' },
];

/** 以 TabBar 为根组件挂载，items 为子项描述 */
export const mountTabBar = (props: Record<string, any> = {}, items: TabBarItemDesc[] = barItems): VueWrapper =>
  mount(
    <TabBar {...props}>
      {items.map((item, index) => (
        <TabBarItem key={item.value ?? index} value={item.value} subTabBar={item.subTabBar}>
          {item.label}
        </TabBarItem>
      ))}
    </TabBar>,
  );

/** 当前选中子项的文本列表 */
export const checkedTexts = (wrapper: VueWrapper): string[] =>
  wrapper.findAll('.t-tab-bar-item__content--checked').map((item) => item.text());

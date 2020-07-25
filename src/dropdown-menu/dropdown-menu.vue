<template>
  <div :class="classes">
    <div ref="refBar" :class="styleBar">
      <div
        :class="styleBarItem(item)"
        v-for="item in itemProps"
        :key="item.itemId"
        @click="expandMenu(item)"
      >
        <div :class="`${name}__title`">{{item.title}}</div>
      </div>
    </div>
    <component :is="innerItems" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, ref, reactive, mergeProps, provide } from 'vue';

import { DropdownMenuProps, IDropdownMenuProps } from './dropdown.interface';
import config from '../config';
import TransAniControl from './trans-ani-control';

const { prefix } = config;
const name = `${prefix}-dropdown-menu`;

let expandedControl: any;

export const ItemInstanceManager = {
  usedIds: {},
  generateId() {
    const { usedIds } = this;
    let id;
    do {
      const r = String(Math.random()).substr(2);
      id = `item_${Date.now()}_${r}`;
    } while (usedIds[id]);
    usedIds[id] = true;
    return id;
  },
};

export default defineComponent({
  name,
  props: DropdownMenuProps,
  setup(props: IDropdownMenuProps, { slots }) {
    // 通过 slots.default 子成员，计算标题栏选项
    const { innerItems, itemProps } = (() => {
      const children = (slots.default ? slots.default() : [])
        .filter((child: any) => child.type.name === `${prefix}-dropdown-item`)
        .map((child: any) => {
          const newChild = child;
          const { itemId = ItemInstanceManager.generateId() } = child.props;
          newChild.props = mergeProps(child.props, { itemId });
          return newChild;
        });
      const itemProps = children.map((item: any) => ({ ...item.props }));
      return {
        innerItems: () => children,
        itemProps,
      };
    })();
    // 菜单状态
    const state = reactive({
      itemProps,
      activeId: null,
      barRect: {},
    });
    const aniControl = new TransAniControl();
    // 提供子组件访问
    provide('dropdownMenuProps', props);
    provide('dropdownMenuState', state);
    provide('dropdownAniControl', aniControl);
    // 根结点样式
    const classes = computed(() => [
      `${name}`,
    ]);
    // 标题栏结点引用
    const refBar = ref(null);
    // 标题栏样式
    const styleBar = computed(() => [
      `${name}__bar`,
      {
        [`${name}__bar ${name}__bar--open`]: state.activeId,
      },
    ]);
    const styleBarItem = computed(() => (item: any) => [
      `${name}__item`,
      {
        [`${prefix}-is-disabled`]: item.disabled,
        [`${prefix}-is-active`]: item.itemId === state.activeId,
      },
    ]);
    // 展开对应项目的菜单
    const expandMenu = (itemProps: any) => {
      const { itemId } = itemProps;

      if (state.activeId === itemId) {
        // 再次点击时收起
        state.activeId = null;
        return;
      }

      // 如果有已展开菜单，并且不是当前菜单，则收起它
      if (expandedControl && expandedControl !== control) {
        expandedControl.collapseMenu();
      }
      // 已展开状态记录
      expandedControl = control;

      state.activeId = itemId;

      // 获取菜单定位
      const bar = refBar.value as any;
      const barRect = bar.getBoundingClientRect();
      state.barRect = barRect;
    };
    const collapseMenu = () => {
      state.activeId = null;

      // 清除已展开状态记录
      if (expandedControl === control) {
        expandedControl = null;
      }
    };
    const control = { expandMenu, collapseMenu };
    // 提供子组件访问
    provide('dropdownMenuControl', control);
    return {
      name: ref(name),
      classes,
      refBar,
      styleBar,
      styleBarItem,
      ...toRefs(props),
      innerItems,
      ...toRefs(state),
      expandMenu,
    };
  },
});
</script>

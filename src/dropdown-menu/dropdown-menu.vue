<template>
  <div :class="classes">
    <div ref="refBar" :class="styleBar">
      <div v-for="(item, idx) in menuTitles" :key="idx" :class="styleBarItem(item, idx)" @click="expandMenu(item, idx)">
        <div :class="`${name}__title`">{{ item.title }}</div>
      </div>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, ref, reactive, onBeforeMount, provide } from 'vue';
import config from '../config';
import { context as menuContext, DropdownMenuState, DropdownMenuControl, DropdownMenuExpandState } from './context';
import TransAniControl from './trans-ani-control';
import { findRelativeRect, findRelativeContainer } from './dom-utils';
import { default as DropdownMenuProps } from './props';

const { prefix } = config;
const name = `${prefix}-dropdown-menu`;

export default defineComponent({
  name,
  props: DropdownMenuProps,
  setup(props, { slots }) {
    // 菜单状态
    const state = reactive<DropdownMenuState>({
      activeId: null,
      barRect: {},
      childCount: 0,
    });

    // 子成员处理
    const menuItems = ref<any>([]);
    const updateItems = () => {
      if (slots.default) {
        const itemName = `${prefix}-dropdown-item`;
        menuItems.value = slots.default()
          .filter((child: any) => child.type.name.includes(itemName));
      }
    };
    onBeforeMount(updateItems);

    // 通过 slots.default 子成员，计算标题栏选项
    const menuTitles = computed(() => menuItems.value
      .map((item: any) => {
        const {
          title,
          disabled,
        } = item.props;
        return {
          title,
          disabled: disabled !== undefined && disabled !== false,
        };
      }));

    const aniControl = new TransAniControl();
    // 提供子组件访问
    provide('dropdownMenuProps', props);
    provide('dropdownMenuState', state);
    provide('dropdownAniControl', aniControl);
    // 根结点样式
    const classes = computed(() => [`${name}`]);
    // 标题栏结点引用
    const refBar = ref(null);
    // 标题栏样式
    const styleBar = computed(() => [
      `${name}__bar`,
      {
        [`${name}__bar ${name}__bar--open`]: state.activeId,
      },
    ]);
    const styleBarItem = computed(() => (item: any, idx: number) => [
      `${name}__item`,
      {
        [`${prefix}-is-disabled`]: item.disabled,
        [`${prefix}-is-active`]: idx === state.activeId,
      },
    ]);
    // 展开对应项目的菜单
    const expandMenu = (item: any, idx: number) => {
      const { disabled } = item;

      if (disabled) return;

      if (state.activeId === idx) {
        // 再次点击时收起
        collapseMenu();
        return;
      }

      state.activeId = idx;

      // 获取菜单定位
      const bar = refBar.value as any;
      const barRect = findRelativeRect(bar);
      state.barRect = barRect;

      // 记录展开状态
      const container = findRelativeContainer(bar) || document.body;
      menuContext.recordMenuExpanded(container, control, DropdownMenuExpandState.expanded);
    };
    const collapseMenu = () => {
      state.activeId = null;

      // 清除已展开状态记录
      const bar = refBar.value as any;
      const container = findRelativeContainer(bar) || document.body;
      menuContext.recordMenuExpanded(container, control, DropdownMenuExpandState.collapsed);
    };
    const control: DropdownMenuControl = { expandMenu, collapseMenu };
    // 提供子组件访问
    provide('dropdownMenuControl', control);
    return {
      name: ref(name),
      classes,
      ...toRefs(props),
      refBar,
      state,
      styleBar,
      styleBarItem,
      menuItems,
      menuTitles,
      expandMenu,
    };
  },
});
</script>

<template>
  <div :class="classes">
    <div ref="refBar" :class="styleBar">
      <div
        :class="styleBarItem(item)"
        v-for="(item, idx) in itemProps"
        :key="item.itemId"
        @click="expandMenu({idx})"
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
const { prefix } = config;
const name = `${prefix}-dropdown-menu`;

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
          const { itemId = ItemInstanceManager.generateId() } = child.props;
          child.props = mergeProps(child.props, { itemId });
          return child;
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
      showOverlay: props.overlay,
    });
    // 提供子组件访问
    provide('dropdownMenuState', state);
    // 根结点样式
    const classes = computed(() => [
      `${name}`,
    ]);
    // 标题栏结点引用
    const refBar = ref(null);
    // 标题栏样式
    const styleBar = computed(() =>
      // if (props.showMenu) return `${name}__bar ${name}__bar--open`;
      `${name}__bar`);
    const styleBarItem = computed(() => (item: any) => [
      `${name}__item`,
      {
        [`${prefix}-is-disabled`]: item.disabled,
        [`${prefix}-is-active`]: item.itemId === state.activeId,
      },
    ]);
    // 展开对应项目的菜单
    const expandMenu = ({ idx }: { idx: number }) => {
      const props = itemProps[idx];
      const thisId = props.itemId;

      if (state.activeId === thisId) {
        // 再次点击时收起
        state.activeId = null;
        return;
      }

      state.activeId = thisId;

      const bar = refBar.value as any;
      const barRect = bar.getBoundingClientRect();
      state.barRect = barRect;
    };
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

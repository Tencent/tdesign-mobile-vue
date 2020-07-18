<template>
  <div :class="classes">
    <div :class="styleBar">
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
    <!-- <slot /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, ref, reactive, mergeProps, provide } from 'vue';

import { DropdownMenuProps, IDropdownMenuProps } from './dropdown.interface';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-dropdown-menu`;
const barName = `${prefix}-dropdown__bar`;

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
    const children = (slots.default ? slots.default() : [])
      .filter((child: any) => child.type.name === `${prefix}-dropdown-item`);
    const innerItems = () => children
      .map((child: any) => {
        const { itemId = ItemInstanceManager.generateId() } = child.props;
        child.props = mergeProps(child.props, { itemId });
        return child;
      });
    const state = reactive({
      itemProps: children.map((item: any) => ({ ...item.props })),
      activeId: null,
    });
    provide('dropdownMenuState', state);
    const classes = computed(() => [
      `${name}`,
    ]);
    const styleBar = computed(() =>
      // if (props.showMenu) return `${name}__bar ${name}__bar--open`;
      `${name}__bar`);
    const styleBarItem = computed(() => (item: any) => [
      `${name}__item`,
      {
        [`${prefix}-is-disabled`]: item.disabled,
        // [`${prefix}-is-active`]: item.barActive,
      },
    ]);
    const expandMenu = ({ idx }: { idx: number }) => {
      const item = children[idx];
      state.activeId = item.props!.itemId;
    };
    return {
      name: ref(name),
      classes,
      styleBar,
      barName,
      styleBarItem,
      ...toRefs(props),
      innerItems,
      ...toRefs(state),
      expandMenu,
    };
  },
});
</script>

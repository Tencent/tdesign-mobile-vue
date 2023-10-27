<template>
  <div ref="refBar" :class="classes">
    <div v-for="(item, idx) in menuTitles" :key="idx" :class="styleBarItem(item, idx)" @click="expandMenu(item, idx)">
      <div :class="`${name}__title`">
        {{ item.label }}
      </div>
      <caret-down-small-icon v-if="$props.direction === 'down'" :class="styleIcon(item, idx)" />
      <caret-up-small-icon v-else :class="styleIcon(item, idx)" />
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, ref, reactive, watch, provide } from 'vue';

import { CaretDownSmallIcon, CaretUpSmallIcon } from 'tdesign-icons-vue-next';
import camelCase from 'lodash/camelCase';

import config from '../config';
import {
  context as menuContext,
  DropdownMenuState,
  DropdownMenuControl,
  DropdownMenuExpandState,
  TriggerSource,
} from './context';
import { useExpose } from '../shared';
import { findRelativeRect, findRelativeContainer } from './dom-utils';
import DropdownMenuProps from './props';

const { prefix } = config;
const name = `${prefix}-dropdown-menu`;

export default defineComponent({
  name,
  components: { CaretDownSmallIcon, CaretUpSmallIcon },
  props: DropdownMenuProps,
  emits: ['menuOpened', 'menuClosed'],
  setup(props, { slots }) {
    // 菜单状态
    const state = reactive<DropdownMenuState>({
      activeId: null,
      barRect: {},
      childCount: 0,
      itemsLabel: [],
    });

    // 子成员处理
    const menuItems = ref<any>([]);
    const updateItems = () => {
      if (slots.default) {
        const itemName = `${prefix}-dropdown-item`;
        const children = slots.default();
        menuItems.value = children.filter((child: any) => {
          const childTypeName = child?.type?.name;
          return childTypeName?.includes && childTypeName.includes(itemName);
        });
      }
    };
    watch(() => slots?.default?.(), updateItems, {
      deep: true,
      immediate: true,
    });

    // 通过 slots.default 子成员，计算标题栏选项
    const menuTitles = computed(() =>
      menuItems.value.map((item: any, index: number) => {
        const { keys, label, value, modelValue, defaultValue, disabled, options } = item.props;
        const currentValue = value || modelValue || defaultValue;
        const target = options?.find((item: any) => item[keys?.value ?? 'value'] === currentValue);

        if (state.itemsLabel.length < index + 1) {
          if (!label) {
            state.itemsLabel.push((target && target[keys?.label ?? 'label']) || '');
          } else {
            state.itemsLabel.push(label || '');
          }
          const computedLabel = target?.[keys?.label ?? 'label'] || '';
          return {
            label: label || computedLabel,
            disabled: disabled !== undefined && disabled !== false,
          };
        }
        return {
          label: label || menuTitles.value[index].label,
          disabled: disabled !== undefined && disabled !== false,
        };
      }),
    );

    // 提供子组件访问
    provide('dropdownMenuProps', props);
    provide('dropdownMenuState', state);
    // 根结点样式
    const classes = computed(() => [`${name}`]);
    // 标题栏结点引用
    const refBar = ref(null);
    const styleBarItem = computed(() => (item: any, idx: number) => [
      `${name}__item`,
      {
        [`${name}__item--disabled`]: item.disabled,
        [`${name}__item--active`]: idx === state.activeId,
      },
    ]);
    const styleIcon = computed(() => (item: any, idx: number) => [
      `${name}__icon`,
      {
        [`${name}__icon--active`]: idx === state.activeId,
      },
    ]);

    // 展开对应项目的菜单
    const expandMenu = (item: any, idx: number) => {
      const { disabled } = item;

      if (disabled) return;

      if (state.activeId === idx) {
        // 再次点击时收起
        collapseMenu();
        props.onMenuClosed?.({ trigger: 'menu' });
        return;
      }
      props.onMenuOpened?.('menuOpened');
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
      menuTitles.value.forEach((item: any, index: number) => {
        item.label = state.itemsLabel[index];
      });
      state.activeId = null;

      // 清除已展开状态记录
      const bar = refBar.value as any;
      const container = findRelativeContainer(bar) || document.body;
      menuContext.recordMenuExpanded(container, control, DropdownMenuExpandState.collapsed);
    };
    const control: DropdownMenuControl = {
      expandMenu,
      collapseMenu,
      emitEvents(emit: string, trigger?: TriggerSource) {
        props[`on${camelCase(emit)}`]?.(trigger);
      },
    };
    // 提供子组件访问
    provide('dropdownMenuControl', control);
    useExpose({
      toggle(idx?: number) {
        if (idx != null) {
          const item = menuTitles.value[idx];
          expandMenu(item, idx);
        } else {
          collapseMenu();
        }
      },
    });

    useExpose({
      expandMenu,
      collapseMenu,
    });

    return {
      name: ref(name),
      classes,
      ...toRefs(props),
      refBar,
      state,
      styleBarItem,
      styleIcon,
      menuItems,
      menuTitles,
      expandMenu,
    };
  },
});
</script>

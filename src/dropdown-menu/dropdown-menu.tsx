import { defineComponent, computed, ref, reactive, watch, provide } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { CaretDownSmallIcon, CaretUpSmallIcon } from 'tdesign-icons-vue-next';
import { camelCase, get as lodashGet, isFunction } from 'lodash-es';
import config from '../config';
import {
  context as menuContext,
  DropdownMenuState,
  DropdownMenuControl,
  DropdownMenuExpandState,
  TriggerSource,
} from './context';
import useExpose from '../hooks/useExpose';
import { findRelativeRect, findRelativeContainer } from './dom-utils';
import { useContent } from '../hooks/tnode';
import DropdownMenuProps from './props';
import { TdDropdownItemProps } from './type';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-dropdown-menu`,
  components: { CaretDownSmallIcon, CaretUpSmallIcon },
  props: {
    onMenuOpened: Function,
    onMenuClosed: Function,
    ...DropdownMenuProps,
  },
  emits: ['menuOpened', 'menuClosed'],
  setup(props, { slots }) {
    const dropdownMenuClass = usePrefixClass('dropdown-menu');

    const renderContent = useContent();

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
      menuItems.value?.map((item: any, index: number) => {
        const { keys, label, value, modelValue, defaultValue, disabled, options, icon } =
          item.props as TdDropdownItemProps;
        const currentValue = value || modelValue || defaultValue;
        const target = options?.find((item: any) => lodashGet(item, keys?.value ?? 'value') === currentValue);
        if (state.itemsLabel.length < index + 1) {
          const targetLabel = (target && lodashGet(target, keys?.label ?? 'label')) || '';
          const computedLabel = label || targetLabel;

          state.itemsLabel.push(computedLabel);

          return {
            labelProps: label, // 优先级： label属性 > 选中项
            label: computedLabel,
            disabled: disabled !== undefined && disabled !== false,
            icon,
          };
        }
        return {
          labelProps: label,
          label: label || lodashGet(target, keys?.label ?? 'label'),
          disabled: disabled !== undefined && disabled !== false,
          icon,
        };
      }),
    );

    // 提供子组件访问
    provide('dropdownMenuProps', props);
    provide('dropdownMenuState', state);
    // 根结点样式
    const classes = computed(() => [`${dropdownMenuClass.value}`]);
    // 标题栏结点引用
    const refBar = ref();
    const styleBarItem = computed(() => (item: any, idx: number) => [
      `${dropdownMenuClass.value}__item`,
      {
        [`${dropdownMenuClass.value}__item--disabled`]: item.disabled,
        [`${dropdownMenuClass.value}__item--active`]: idx === state.activeId,
      },
    ]);
    const styleIcon = computed(() => (item: any, idx: number) => [
      `${dropdownMenuClass.value}__icon`,
      {
        [`${dropdownMenuClass.value}__icon--active`]: idx === state.activeId,
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
      state.itemsLabel[idx] = item.label;

      // 获取菜单定位
      const bar = refBar.value as any;
      const barRect = findRelativeRect(bar);
      state.barRect = barRect;

      // 记录展开状态
      const container = findRelativeContainer(bar) || document.body;
      menuContext.recordMenuExpanded(container, control, DropdownMenuExpandState.expanded);
    };
    const collapseMenu = () => {
      menuTitles.value.forEach((_item: any, index: number) => {
        menuTitles.value[index].label = state.itemsLabel[index];
      });
      state.activeId = null;

      // 清除已展开状态记录
      const bar = refBar.value as any;
      const container = findRelativeContainer(bar) || document.body;
      menuContext.recordMenuExpanded(container, control, DropdownMenuExpandState.collapsed);
    };

    // dropdown-menu外面点击触发dropdown下拉框收起
    onClickOutside(refBar, () => {
      if (state.activeId === null) return;
      collapseMenu();
      props.onMenuClosed?.({ trigger: 'outside' });
    });

    const control: DropdownMenuControl = {
      expandMenu,
      collapseMenu,
      emitEvents(emit: string, trigger?: TriggerSource) {
        const eventHandler = props[`on${camelCase(emit)}` as keyof typeof props] as Function;
        eventHandler?.(trigger);
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

    return () => {
      const defaultSlot = renderContent('default', 'content');

      const renderDropdownItemIcon = (item: any, idx: number) => {
        const { icon } = item;
        const isActive = idx === state.activeId; // 面板是否打开
        const iconClass = [styleIcon.value(item, idx)];

        // 使用自定义图标
        if (icon) {
          const isArray = Array.isArray(icon);
          const isTwoIcons = isArray && icon.length === 2;

          let selectedIcon;
          if (isTwoIcons) {
            selectedIcon = isActive ? icon[0] : icon[1];
          } else {
            selectedIcon = isArray ? icon[0] : icon;
          }

          const iconContent = isFunction(selectedIcon) ? selectedIcon() : selectedIcon;
          return <div class={iconClass}>{iconContent}</div>;
        }

        return props.direction === 'down' ? (
          <caret-down-small-icon class={iconClass} />
        ) : (
          <caret-up-small-icon class={iconClass} />
        );
      };

      return (
        <div ref={refBar} class={classes.value}>
          {(menuTitles.value || []).map(
            (item: { label: any; labelProps: TdDropdownItemProps['label'] }, idx: number) => (
              <div class={styleBarItem.value(item, idx)} onClick={() => expandMenu(item, idx)}>
                <div class={`${dropdownMenuClass.value}__title`}>{item.labelProps || item.label}</div>
                {renderDropdownItemIcon(item, idx)}
              </div>
            ),
          )}
          {defaultSlot}
        </div>
      );
    };
  },
});

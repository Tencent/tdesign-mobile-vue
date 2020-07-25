<template>
  <div :class="classes" v-if="isShowItems" :style="{...expandStyle}">
    <t-mask v-if="isShowItems && showOverlay" @click="onClickOverlay" />
    <div :class="styleContent" :style="{...transitionStyle}">
      <div :class="`${name}__bd`">
        <slot>
          <t-cell-group v-if="selectMode === 'single'">
            <t-radio-group v-model="radioSelect">
              <template v-for="option in options">
                <t-cell :key="option.value" value-align="left">
                  <t-radio
                    :name="option.value"
                    :title="option.title"
                    :class="styleDropRadio(option.value)"
                  >
                    <template v-slot:checkedIcon>
                      <t-icon icon="tick" v-if="isCheckedRadio(option.value)" />
                    </template>
                  </t-radio>
                </t-cell>
              </template>
            </t-radio-group>
          </t-cell-group>
          <t-cell-group v-else-if="selectMode === 'multi'">
            <t-check-group v-model="checkSelect">
              <template v-for="option in options">
                <t-cell :key="option.value" value-align="left">
                  <t-check-box :name="option.value" :title="option.title"></t-check-box>
                </t-cell>
              </template>
            </t-check-group>
          </t-cell-group>
          <template v-else-if="selectMode === 'tree'">
            <t-cell-group v-for="(options, level) in treeOptions" :key="level">
              <t-radio-group
                v-if="level < treeState.leafLevel"
                :modelValue="treeState.parentPath[level]"
                @update:modelValue="selectTreeParent(level, $event)"
                :data-value="treeState.parentPath[level]"
              >
                <template v-for="option in options">
                  <t-cell :key="option.value" value-align="left">
                    <t-radio
                      :class="styleTreeRadio(option.value, level)"
                      :name="option.value"
                      :title="option.title"
                    />
                  </t-cell>
                </template>
              </t-radio-group>
              <t-check-group v-else v-model="treeState.select">
                <template v-for="option in options">
                  <t-cell :key="option.value" value-align="left">
                    <t-check-box :name="option.value" :title="option.title"></t-check-box>
                  </t-cell>
                </template>
              </t-check-group>
            </t-cell-group>
          </template>
        </slot>
      </div>
      <div :class="`${name}__ft`" v-if="selectMode === 'multi' || selectMode === 'tree'">
        <t-button theme="default" :disabled="isBtnDisabled" @click="resetSelect">重置</t-button>
        <t-button theme="primary" :disabled="isBtnDisabled" @click="confirmSelect">确定</t-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, toRefs, ref, reactive, inject, watch, defineComponent, SetupContext } from 'vue';

import { IDropdownMenuProps, DropdownItemProps, IDropdownItemProps } from './dropdown.interface';
import config from '../config';
import TransAniControl from './trans-ani-control';

const { prefix } = config;
const name = `${prefix}-dropdown-item`;

export default defineComponent({
  name,
  props: DropdownItemProps,
  setup(props: IDropdownItemProps, context: SetupContext) {
    // 从父组件取属性、状态和控制函数
    const menuProps = inject('dropdownMenuProps') as IDropdownMenuProps;
    const menuState = inject('dropdownMenuState') as any;
    const { expandMenu, collapseMenu } = inject('dropdownMenuControl') as any;
    const menuAniControl = inject('dropdownAniControl') as TransAniControl;
    // 组件样式
    const classes = computed(() => [
      `${name}`,
      {
        [`${prefix}-is-expanded`]: state.isExpanded,
      },
    ]);
    const state = reactive({
      showOverlay: computed(() => menuProps.overlay),
      isShowItems: false,
      isExpanded: false,
      expandStyle: {},
      transitionStyle: computed(() => ({
        transition: `transform ${menuProps.duration}ms ease`,
        '-webkit-transition': `transform ${menuProps.duration}ms ease`,
      })),
      selectMode: computed(() => props.selectMode),
      optionsLayout: computed(() => props.optionsLayout),
      options: computed(() => props.options),
    });
    const isCheckedRadio = (value: string) => value === radioSelect.value;
    const styleDropRadio = (value: string) => [
      `${name}__radio`,
      {
        [`${prefix}-is-tick`]: props.selectMode === 'single',
        [`${prefix}-is-checked`]: isCheckedRadio(value),
      },
    ];
    const styleContent = computed(() => {
      const selectMode = props.selectMode;
      const layoutCol = props.optionsLayout;
      const treeCol = selectMode === 'tree' ? treeState.leafLevel + 1 : 0;
      return [
        `${name}__content`,
        {
          [`${prefix}-is-single`]: selectMode === 'single',
          [`${prefix}-is-multi`]: selectMode === 'multi',
          [`${prefix}-is-tree`]: selectMode === 'tree',
          [`${prefix}-is-col1`]: layoutCol === 'col1' || treeCol === 1,
          [`${prefix}-is-col2`]: layoutCol === 'col2' || treeCol === 2,
          [`${prefix}-is-col3`]: layoutCol === 'col3' || treeCol === 3,
        },
      ];
    });
    // 设置展开/收起状态
    const setExpand = (val: boolean) => {
      // 菜单定位
      const { bottom } = menuState.barRect;
      state.expandStyle = {
        zIndex: menuProps.zIndex,
        top: `${bottom}px`,
      };
      // console.log(`dropdown-item(${props.itemId}) changing state: `, val);
      const duration = menuProps.duration;
      // 动画状态控制
      menuAniControl.setTo(duration, () => {
        // Now do:
        context.emit(val ? 'open' : 'close');
        if (val) {
          state.isShowItems = val;
        }
        state.isExpanded = !val;
      }, () => { // Next tick do:
        state.isExpanded = val;
      }, () => { // Finally do:
        if (!val) {
          state.isShowItems = val;
        }
        context.emit(val ? 'opened' : 'closed');
      });
    };

    // 根据父组件状态，判断当前是否展开
    watch(
      () => (menuState.activeId === props.itemId),
      (val: boolean) => setExpand(val),
    );

    const radioSelect = ref(null);
    const checkSelect = ref([]);
    // const defaultTreeNode = computed(() => {
    //   const nodeList = [];
    //   let child: any = props.options;
    //   do {
    //     nodeList.push(child[0]);
    //     child = child.options;
    //   } while (child);
    //   return nodeList;
    // });
    const treeState = reactive({
      leafLevel: 0,
      parentPath: [],
      select: [],
    });
    const selectTreeParent = (level: number, value: any) => {
      // console.log('level:', level, 'value:', value);
      const tempValue: any = treeState.parentPath.slice(0, level);
      tempValue[level] = value;
      treeState.parentPath = tempValue;
      treeState.select = [];
    };
    const styleTreeRadio = computed(() => (value: string, level: number) => [
      `${name}__radio`,
      {
        [`${prefix}-is-checked`]: value === treeState.parentPath[level],
      },
    ]);
    // 处理后的树形选项列表
    const treeOptions = computed(() => {
      const options = props.options;
      const isLeafLevel = (list: any) => list.find((item: any) => !item.options);
      const treeOptions = [];
      let list = options;
      let level = 0;
      while (!isLeafLevel(list)) {
        treeOptions.push(list);
        const thisValue: string | number | null = treeState.parentPath[level];
        const child: any = thisValue && list.find((child: any) => child.value === thisValue);
        if (thisValue === undefined || !child) {
          const firstChild = list[0];
          selectTreeParent(level, firstChild.value);
          list = firstChild.options;
        } else {
          list = child.options;
        }
        level += 1;
      }
      treeState.leafLevel = level;
      treeOptions.push(list);
      return treeOptions;
    });
    // 根据传入值更新当前选中
    const updateSelectValue = (val: any) => {
      const valueList = val || [];
      switch (props.selectMode) {
        case 'single':
          {
            const firstChild = props.options[0] || {};
            radioSelect.value = val === undefined ? firstChild.value : val;
          }
          break;
        case 'multi':
          {
            checkSelect.value = valueList;
          }
          break;
        case 'tree':
          {
            treeState.select = valueList;
            const child = valueList[0];
            if (child) {
              const value = child.value;
              const findNode = (list: any[], condition: Function, passPath: any): boolean => {
                let isFound = false;
                list.forEach((item: any) => {
                  if (isFound) return;
                  if (condition(item)) {
                    isFound = true;
                  } else if (item.options) {
                    passPath.push(item.value);
                    isFound = findNode(item.props, condition, passPath);
                    if (isFound) return;
                    passPath.pop();
                  }
                });
                return isFound;
              };
              const parentPath: any = [];
              findNode(props.options, (item: any) => item.value === value, parentPath);
              treeState.parentPath = parentPath;
            }
          }
          break;
      }
    };
    // 初始值更新一次选中项
    updateSelectValue(props.modelValue);
    // 跟踪 modelValue 更新选项
    watch(() => props.modelValue, (val: any) => updateSelectValue(val));

    // 底部按键是否可用
    const isBtnDisabled = computed(() => {
      switch (props.selectMode) {
        case 'multi':
          return checkSelect.value.length <= 0;
        case 'tree':
          return treeState.select.length <= 0;
      }
      return true;
    });
    // 重置
    const resetSelect = () => {
      switch (props.selectMode) {
        case 'multi':
          checkSelect.value = [];
          break;
        case 'tree':
          treeState.select = [];
          treeState.parentPath = [];
          break;
      }
    };
    // 确认
    const confirmSelect = () => {
      let values;
      switch (props.selectMode) {
        case 'multi':
          values = checkSelect.value;
          break;
        case 'tree':
          values = treeState.select;
          break;
      }
      context.emit('update:modelValue', values);
      context.emit('change', values);
      collapseMenu();
    };
    // 单选值监控
    watch(radioSelect, (val: any) => {
      if (props.selectMode !== 'single') return;
      if (!state.isShowItems) return;
      const value = props.modelValue || [];
      if (value[0] === val) return;
      context.emit('update:modelValue', val);
      context.emit('change', val);
      collapseMenu();
    });
    // 点击遮罩层
    const onClickOverlay = () => {
      if (menuProps.closeOnClickOverlay) {
        collapseMenu();
      }
    };
    return {
      name: ref(name),
      classes,
      styleContent,
      styleDropRadio,
      isBtnDisabled,
      isCheckedRadio,
      radioSelect,
      checkSelect,
      treeOptions,
      treeState,
      selectTreeParent,
      styleTreeRadio,
      ...toRefs(props),
      ...toRefs(state),
      expandMenu,
      collapseMenu,
      resetSelect,
      confirmSelect,
      onClickOverlay,
    };
  },
});
</script>

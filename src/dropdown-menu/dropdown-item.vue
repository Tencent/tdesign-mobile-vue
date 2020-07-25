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
          <t-cell-group v-else-if="selectMode === 'tree'">
            <t-check-group v-model="checkSelect2">
              <template v-for="option in options">
                <t-cell :key="option.value" value-align="left">
                  <t-check-box :name="option.value" :title="option.title"></t-check-box>
                </t-cell>
              </template>
            </t-check-group>
          </t-cell-group>
        </slot>
      </div>
      <div :class="`${name}__ft`" v-if="selectMode === 'multi' || selectMode === 'tree'">
        <t-button theme="default">重置</t-button>
        <t-button theme="primary" @click="confirmSelect">确定</t-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, toRefs, ref, reactive, inject, watch, defineComponent } from 'vue';

import { IDropdownMenuProps, DropdownItemProps, IDropdownItemProps } from './dropdown.interface';
import config from '../config';
import TransAniControl from './trans-ani-control';

const { prefix } = config;
const name = `${prefix}-dropdown-item`;

export default defineComponent({
  name,
  props: DropdownItemProps,
  setup(props: IDropdownItemProps) {
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
    const styleContent = computed(() => [
      `${name}__content`,
      {
        [`${prefix}-is-single`]: props.selectMode === 'single',
        [`${prefix}-is-multi`]: props.selectMode === 'multi',
        [`${prefix}-is-tree`]: props.selectMode === 'tree',
        [`${prefix}-is-col1`]: props.optionsLayout === 'col1',
        [`${prefix}-is-col2`]: props.optionsLayout === 'col2',
        [`${prefix}-is-col3`]: props.optionsLayout === 'col3',
      },
    ]);
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
      });
    };

    // 根据父组件状态，判断当前是否展开
    watch(
      () => (menuState.activeId === props.itemId),
      (val: boolean) => setExpand(val),
    );
    const confirmSelect = () => {
      collapseMenu();
    };
    const onClickOverlay = () => {
      if (menuProps.closeOnClickOverlay) {
        collapseMenu();
      }
    };
    const radioSelect = ref(null);
    const checkSelect = ref([]);
    return {
      name: ref(name),
      classes,
      styleContent,
      styleDropRadio,
      radioSelect,
      checkSelect,
      isCheckedRadio,
      ...toRefs(props),
      ...toRefs(state),
      expandMenu,
      collapseMenu,
      confirmSelect,
      onClickOverlay,
    };
  },
});
</script>

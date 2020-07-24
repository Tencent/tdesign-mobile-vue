<template>
  <div :class="styleItem" v-if="isShowItems" :style="{...expandStyle}">
    <t-mask v-if="showOverlay" />
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
import { computed, toRefs, ref, reactive, inject, nextTick, watch, defineComponent } from 'vue';

import { DropdownItemProps, IDropdownItemProps } from './dropdown.interface';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-dropdown-item`;

interface ITransAnimation {
  timeout: number;
  interval: number;
  thenDo: Function | null;
  setTo(nowDo: Function, thenDo: Function): void;
};

let expandedMenu: any;

export default defineComponent({
  name,
  props: DropdownItemProps,
  setup(props: IDropdownItemProps) {
    const menuState = inject('dropdownMenuState') as any;
    const styleItem = computed(() => [
      `${name}`,
      {
        [`${prefix}-is-expanded`]: state.isExpanded,
      },
    ]);
    watch(() => (menuState.activeId === props.itemId), (val: boolean) => {
      setExpand(val);
    });
    const state = reactive({
      showOverlay: computed(() => menuState.showOverlay),
      isShowItems: false,
      isExpanded: false,
      expandStyle: {},
      transitionStyle: {
        transition: 'transform 300ms ease',
        '-webkit-transition': 'transform 300ms ease',
      },
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
    const transAnimation: ITransAnimation = {
      thenDo: null,
      timeout: 0,
      interval: 300,
      setTo(nowDo, thenDo) {
        if (this.timeout) {
          window.clearTimeout(this.timeout);
          this.thenDo && this.thenDo();
        }
        nextTick(() => window.setTimeout(nowDo, 0));
        this.timeout = window.setTimeout(() => {
          this.timeout = 0;
          thenDo();
        }, this.interval);
        this.thenDo = thenDo;
      },
    };
    const setExpand = (val: boolean) => {
      // 菜单定位
      const { bottom } = menuState.barRect;
      state.expandStyle = { top: `${bottom}px` };
      console.log(`dropdown-item(${props.itemId}) changing state: `, val);
      // 动画状态准备
      if (val) {
        if (expandedMenu && expandedMenu !== menuState) {
          // 关闭其他菜单
          expandedMenu.activeId = null;
        }
        expandedMenu = menuState;
        state.isShowItems = val;
      }
      state.isExpanded = !val;
      transAnimation.setTo(() => {
        state.isExpanded = val;
      }, () => {
        if (!val) {
          if (expandedMenu === menuState) {
            expandedMenu = null;
          }
          state.isShowItems = val;
        }
      });
    };
    const expandMenu = () => {
      menuState.activeId = props.itemId;
    };
    const collapseMenu = () => {
      menuState.activeId = null;
    };
    const confirmSelect = () => {
      collapseMenu();
    };
    const radioSelect = ref(null);
    const checkSelect = ref([]);
    return {
      name: ref(name),
      styleItem,
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
    };
  },
});
</script>

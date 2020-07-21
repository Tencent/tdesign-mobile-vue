<template>
  <div :class="styleItem" v-if="isShowItems" :style="{...expandStyle}">
    <t-mask v-show="showOverlay" />
    <div :class="styleContent" :style="{...transitionStyle}">
      <div :class="`${name}__bd`">
        <slot>
          <t-cell-group v-if="true">
            <t-radio-group v-model="radio">
              <t-cell value-align="left">
                <t-radio name="1" title="单选框1" :class="styleDropRadio" disabled>
                  <template #checkedIcon v-if="isChecked">
                    <t-icon icon="tick" />
                  </template>
                </t-radio>
              </t-cell>
              <t-cell value-align="left">
                <t-radio name="2" title="单选框2" :class="styleDropRadio">
                  <template #checkedIcon v-if="isChecked">
                    <t-icon icon="tick" />
                  </template>
                </t-radio>
              </t-cell>
            </t-radio-group>
          </t-cell-group>
          <t-cell-group>
            <t-check-group v-model="checkBoxes">
              <t-cell value-align="left">
                <t-check-box name="1" title="复选框1"></t-check-box>
              </t-cell>
              <t-cell value-align="left">
                <t-check-box name="2" title="复选框2" disabled></t-check-box>
              </t-cell>
              <t-cell value-align="left">
                <t-check-box name="3" title="复选框3"></t-check-box>
              </t-cell>
              <t-cell value-align="left">
                <t-check-box name="4" title="复选框4"></t-check-box>
              </t-cell>
              <t-cell value-align="left">
                <t-check-box name="5" title="复选框5"></t-check-box>
              </t-cell>
            </t-check-group>
          </t-cell-group>
          <t-cell-group v-if="true">
            <t-check-group v-model="checkBoxes">
              <t-cell value-align="left">
                <t-check-box name="1" title="复选框1"></t-check-box>
              </t-cell>
              <t-cell value-align="left">
                <t-check-box name="2" title="复选框2"></t-check-box>
              </t-cell>
            </t-check-group>
          </t-cell-group>
        </slot>
      </div>
      <div :class="`${name}__ft`">
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
  setTo(nowDo: Function, thenDo: Function): void;
};

const transAnimation: ITransAnimation = {
  timeout: 0,
  interval: 300,
  setTo(nowDo, thenDo) {
    if (this.timeout) window.clearTimeout(this.timeout);
    nextTick(() => window.setTimeout(nowDo, 0));
    this.timeout = window.setTimeout(() => {
      this.timeout = 0;
      thenDo();
    }, this.interval);
  },
};

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
    });
    // const styleDropRadio = computed(() => [
    // `${name}__radio`,
    // {
    // [`${prefix}-is-checked`]: props.isChecked,
    // },
    // ]);
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
    const setExpand = (val: boolean) => {
      // 菜单定位
      const { bottom } = menuState.barRect;
      state.expandStyle = { top: `${bottom}px` };
      // 动画状态准备
      if (val) state.isShowItems = val;
      state.isExpanded = !val;
      transAnimation.setTo(() => {
        state.isExpanded = val;
      }, () => {
        console.log('动画结束');
        if (!val) state.isShowItems = val;
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
    return {
      name: ref(name),
      styleItem,
      styleContent,
      ...toRefs({
        radio: '1',
        checkBoxes: ['1'],
        isExpanded: false,
      }),
      ...toRefs(props),
      ...toRefs(state),
      expandMenu,
      collapseMenu,
      confirmSelect,
    };
  },
});
</script>

<template>
  <div :class="styleItem" v-if="isExpanded" :style="{...expandStyle}">
    <t-mask v-show="showOverlay" style="position: absolute;" />
    <div :class="styleContent">
      <div :class="`${name}__bd`" style="overflow: auto;">
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
    nextTick(() => nowDo());
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
    ]);
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
    watch(() => (menuState.activeId === props.itemId), (val: boolean) => {
      setExpand(val);
    });
    const state = reactive({
      showOverlay: computed(() => menuState.showOverlay),
      isExpanded: false,
      expandStyle: {},
    });
    const setExpand = (val: boolean) => {
      state.isExpanded = val;
      const { bottom } = menuState.barRect;
      state.expandStyle = { top: `${bottom}px` };
      transAnimation.setTo(() => {
        // Todo: 动画开始时的样式设置
      }, () => {
        // Todo: 动画结束时的回调
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

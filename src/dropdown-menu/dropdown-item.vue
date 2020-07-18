<template>
  <div :class="styleItem" v-if="isExpanded">
    <t-mask v-show="showOverlay" />
    <div :class="styleContent">
      <div :class="`${itemName}__bd`">
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
      <div :class="`${itemName}__ft`">
        <t-button theme="default">重置</t-button>
        <t-button theme="primary" @click="confirmSelect">确定</t-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, toRefs, ref, reactive, inject, defineComponent } from 'vue';

import { DropdownItemProps, IDropdownItemProps } from './dropdown.interface';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-dropdown-item`;
const itemName = `${prefix}-dropdown-item`;

export default defineComponent({
  name,
  props: DropdownItemProps,
  setup(props: IDropdownItemProps) {
    const menuState = inject('dropdownMenuState') as any;
    const styleItem = computed(() => [
      `${itemName}`,
    ]);
    // const styleDropRadio = computed(() => [
    //   `${itemName}__radio`,
    //   {
    //     [`${prefix}-is-checked`]: props.isChecked,
    //   },
    // ]);
    const styleContent = computed(() => [
      `${itemName}__content`,
      {
        [`${prefix}-is-single`]: props.selectMode === 'single',
        [`${prefix}-is-multi`]: props.selectMode === 'multi',
        [`${prefix}-is-tree`]: props.selectMode === 'tree',
        [`${prefix}-is-col1`]: props.optionsLayout === 'col1',
        [`${prefix}-is-col2`]: props.optionsLayout === 'col2',
        [`${prefix}-is-col3`]: props.optionsLayout === 'col3',
      },
    ]);
    const isExpanded = computed(() => menuState.activeId === props.itemId);
    const state = reactive({
      isExpanded,
    });
    const confirmSelect = () => {
      // collapseMenu();
    };
    return {
      name: ref(name),
      itemName,
      styleItem,
      styleContent,
      ...toRefs({
        radio: '1',
        checkBoxes: ['1'],
        isExpanded: false,
      }),
      ...toRefs(props),
      ...toRefs(state),
      confirmSelect,
    };
  },
});
</script>

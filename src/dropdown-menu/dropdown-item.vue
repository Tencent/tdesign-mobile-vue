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
import { computed, toRefs, ref, reactive } from 'vue';

import TMask from '../mask';
import TIcon from '../icon';
import TButton from '../button';
import TCellGroup from '../cell-group';
import TCell from '../cell';
import TCheckGroup from '../check-group';
import TCheckBox from '../check-box';
import TRadioGroup from '../radio-group';
import TRadio from '../radio';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-dropdown-menu`;
const itemName = `${prefix}-dropdown-item`;
const barName = `${prefix}-dropdown__bar`;

interface DropdownItemProps {
  title?: string,
  value?: string | number,
  options: Array<any>,
  disabled?: boolean,
  selectMode: string,
  optionsLayout: string,
  optionsColumns: number,
}
export default {
  name,
  components: {
    TMask,
    TButton,
    TIcon,
    TCellGroup,
    TCell,
    TCheckGroup,
    TCheckBox,
    TRadioGroup,
    TRadio,
  },
  props: {
    /**
     * @description 标题
     * @attribute title
     */
    title: String,
    value: [String, Number],
    /**
     * @description 选项数据
     * @attribute options
     */
    options: {
      type: Array,
      default: () => [],
    },
    /**
     * @description 是否禁用
     * @attribute disabled
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 选取模式
     * @attribute selectMode
     */
    selectMode: {
      type: String,
      default: 'single',
    },
    /**
     * @description 选项排列
     * @attribute optionsLayout
     */
    optionsLayout: {
      type: String,
      default: 'column',
    },
    optionsColumns: {
      type: Number,
      default: 1,
    },
  },
  setup(props: DropdownItemProps) {
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
    const menuState = reactive({
      isExpanded: false,
    });
    const expandMenu = () => {
      menuState.isExpanded = true;
    };
    const collapseMenu = () => {
      menuState.isExpanded = false;
    };
    const confirmSelect = () => {
      collapseMenu();
    };
    return {
      name: ref(name),
      itemName,
      barName,
      styleItem,
      styleContent,
      ...toRefs(props),
      ...toRefs(menuState),
      expandMenu,
      collapseMenu,
      confirmSelect,
    };
  },
  data() {
    return {
      radio: '1',
      checkBoxes: ['1'],
      isExpanded: false,
    };
  },
};
</script>

<template>
  <div :class="classes">
    <div :class="styleBar">
      <div :class="styleBarItem(item)" v-for="item in list" :key="item">
        <div :class="`${name}__title`">{{item.title}}</div>
      </div>
    </div>
    <div :class="styleItem">
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
              <t-check-group v-model="checkBoxs">
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
              <t-check-group v-model="checkBoxs">
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
          <t-button theme="primary">确定</t-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, toRefs, ref } from 'vue';

import TMask from '../mask';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-dropdown-menu`;
const itemName = `${prefix}-dropdown-item`;
const barName = `${prefix}-dropdown__bar`;

interface DropdownMenuProps {
  title: string,
  disabled: boolean,
  barActive: boolean,
  selectMode:string,
  optionsLayout:string,
  isChecked:boolean,
}
export default {
  name,
  components: { TMask },
  props: {
    /**
     * @description 标题
     * @attribute title
     */
    title: String,
    /**
     * @description 是否显示背景遮罩
     * @attribute showOverlay
     */
    showOverlay: Boolean,
    /**
     * @description bar当前选中
     * @attribute barActive
     */
    barActive: Boolean,
    /**
     * @description disabled
     * @attribute disabled
     */
    disabled: Boolean,
    /**
     * @description barList
     * @attribute barList
     */
    list: Array,
    /**
     * @description 选取模式
     * @attribute selectMode
     */
    selectMode: String,
    /**
     * @description 选项排列
     * @attribute barList
     */
    optionsLayout: String,
    /**
     * @description dropradio
     * @attribute dropradio
     */
    isChecked: Boolean,
  },
  setup(props:DropdownMenuProps) {
    const classes = computed(() => [
      `${name}`,
    ]);
    const styleItem = computed(() => [
      `${itemName}`,
    ]);
    const styleBar = computed(() => {
      if (props.showMenu) return `${name}__bar ${name}__bar--open`;
      return `${name}__bar`;
    });
    const styleBarItem = computed(() => (item:any) => [
      `${name}__item`,
      {
        [`${prefix}-is-disabled`]: item.disabled,
        [`${prefix}-is-active`]: item.barActive,
      },
    ]);
    const styleDropRadio = computed(() => [
      `${itemName}__radio`,
      {
        [`${prefix}-is-checked`]: props.isChecked,
      },
    ]);
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
    return {
      name: ref(name),
      classes,
      styleBar,
      itemName,
      barName,
      styleBarItem,
      styleItem,
      styleContent,
      styleDropRadio,
      ...toRefs(props),
    };
  },
  data() {
    return {
      radio: '1',
      checkBoxs: ['1'],
    };
  },
};
</script>

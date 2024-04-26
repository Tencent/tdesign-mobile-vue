<template>
  <div :class="name" :style="rootStyle">
    <div
      v-for="(treeOption, level) in treeOptions"
      :key="level"
      :class="[`${name}__column`, `${name}__column--${getTreeClass(leafLevel - level, treeOptions.length)}`]"
    >
      <t-side-bar
        v-if="level === 0"
        v-model="innerValue[level]"
        :class="`${name}-cloum`"
        @change="onRootChange($event, level)"
      >
        <t-side-bar-item
          v-for="(item, index) in treeOption"
          :key="index"
          :label="item.label"
          :value="item.value"
        ></t-side-bar-item>
      </t-side-bar>
      <template v-else-if="level != leafLevel">
        <div
          v-for="item in treeOption"
          :key="item.value"
          :class="{ [`${name}__item`]: true, [`${name}__item--active`]: item.value === innerValue[level] }"
          @click="handleTreeClick(item.value, level)"
        >
          {{ item.label }}
        </div>
      </template>
      <t-radio-group
        v-else-if="!multiple"
        v-model="innerValue[level]"
        :class="`${name}__radio`"
        @change="onRootChange($event, level)"
      >
        <t-radio
          v-for="item in treeOption"
          :key="item.value"
          icon="line"
          :class="`${name}__radio-item`"
          :value="item.value"
          :max-label-row="1"
          borderless
          placement="right"
        >
          {{ item.label }}
        </t-radio>
      </t-radio-group>
      <t-checkbox-group
        v-else
        v-model="innerValue[level]"
        :class="`${name}__checkbox`"
        @change="onRootChange($event, level)"
      >
        <t-checkbox
          v-for="item in treeOption"
          :key="item.value"
          :class="`${name}__checkbox-item`"
          :value="item.value"
          :max-label-row="1"
          icon="line"
          borderless
          placement="right"
        >
          {{ item.label }}
        </t-checkbox>
      </t-checkbox-group>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, toRefs, watch } from 'vue';

import { SideBar, SideBarItem } from '../side-bar';
import TRadio, { RadioGroup } from '../radio';
import TCheckbox, { CheckboxGroup as TCheckboxGroup } from '../checkbox';
import config from '../config';
import { convertUnit, useDefault } from '../shared';
import TreeSelectProps from './props';
import { TdTreeSelectProps, TreeLevel, TreeSelectValue } from './type';
import { TreeOptionData } from '../_common/js/common';

const { prefix } = config;
const name = `${prefix}-tree-select`;

export default defineComponent({
  name,
  components: {
    TSideBar: SideBar,
    TSideBarItem: SideBarItem,
    TRadio,
    TRadioGroup: RadioGroup,
    TCheckbox,
    TCheckboxGroup,
  },
  props: TreeSelectProps,
  emits: ['update:value', 'update:modelValue', 'change'],
  setup(props: TdTreeSelectProps, context) {
    const { height, customStyle, value, options, keys, multiple } = toRefs(props);
    const [innerValue, setInnerValue] = useDefault<TreeSelectValue, TdTreeSelectProps>(
      props,
      context.emit,
      'value',
      'change',
    );
    const leafLevel = ref(0);
    const treeOptions = ref<TreeOptionData[][]>([]);
    const rootStyle = computed(() => ({
      height: convertUnit(height.value),
    }));

    const buildTreeOptions = () => {
      const { options, value, defaultValue, multiple, keys } = props;

      let level = -1;
      const tmpTreeOptions: TreeOptionData[][] = [];
      let node: TreeOptionData = { children: options };
      if (options.length === 0 || (Array.isArray(value) && value.length === 0)) return;
      while (node && node.children) {
        level += 1;
        const list = (node.children as TreeOptionData[]).map((item: TreeOptionData) => ({
          label: item[keys?.label || 'label'],
          value: item[keys?.value || 'value'],
          children: item.children,
        }));
        const thisValue = value?.[level];

        tmpTreeOptions.push([...list]);
        if (thisValue == null) {
          const [firstChild] = list;
          node = firstChild;
        } else {
          const child = list.find((child) => child.value === thisValue);
          node = child ?? list[0];
        }
      }
      leafLevel.value = Math.max(0, level);
      treeOptions.value = tmpTreeOptions;

      if (multiple) {
        const finalValue = value || defaultValue;
        if (finalValue[leafLevel.value] != null && !Array.isArray(finalValue[leafLevel.value])) {
          throw TypeError('应传入数组类型的 value');
        }
      }
    };

    const getTreeClass = (level: number, total: number) => {
      if (level === 0) return 'right';
      if (level === 1 && level !== total - 1) return 'middle';
      return 'left';
    };

    const onRootChange = (itemValue: string | number, level: TreeLevel) => {
      setInnerValue(innerValue.value, level);
    };

    const handleTreeClick = (itemValue: string | number, level: TreeLevel) => {
      innerValue.value[level] = itemValue;
      setInnerValue(innerValue.value, level);
    };

    watch(
      [innerValue, options, keys, multiple],
      () => {
        buildTreeOptions();
      },
      { immediate: true, deep: true },
    );
    return {
      ...toRefs(props),
      name,
      innerValue,
      rootStyle,
      treeOptions,
      leafLevel,
      getTreeClass,
      onRootChange,
      handleTreeClick,
    };
  },
});
</script>

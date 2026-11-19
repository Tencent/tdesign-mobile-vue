import { computed, defineComponent, ref, shallowReactive, toRaw, toRefs, watch } from 'vue';
import { SideBar as TSideBar, SideBarItem as TSideBarItem } from '../side-bar';
import TRadio, { RadioGroup as TRadioGroup } from '../radio';
import TCheckbox, { CheckboxGroup as TCheckboxGroup } from '../checkbox';
import { convertUnit } from '../shared';
import log from '../_common/js/log';
import props from './props';
import { TdTreeSelectProps, TreeLevel, TreeSelectValue } from './type';
import type { TreeOptionData } from '../common';
import { usePrefixClass } from '../hooks/useClass';
import useVModel from '../hooks/useVModel';

type OptionValue = string | number;
type SelectValue = OptionValue | OptionValue[];
type SelectValueGroup = Array<SelectValue | undefined>;
type RawOption = Record<string, unknown>;

interface ColumnOption {
  label: TreeOptionData['label'];
  value: OptionValue;
  disabled: boolean;
  children?: TreeOptionData['children'];
}

const isDef = (value: unknown): boolean => value !== undefined && value !== null;

const toGroup = (value?: TreeSelectValue): SelectValueGroup =>
  Array.isArray(value) ? (value as SelectValueGroup) : [];

// 深比较，替代 JSON.stringify 做快照比较
const isValueEqual = (a: unknown, b: unknown): boolean => {
  if (a === b) return true;
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((item, i) => isValueEqual(item, b[i]));
  }
  return false;
};

// 轻量深拷贝，用于记录 customValue 快照
const cloneValue = (value?: TreeSelectValue): TreeSelectValue | undefined =>
  Array.isArray(value) ? (value.map(cloneValue) as TreeSelectValue) : value;

export default defineComponent({
  name: 'TTreeSelect',
  components: {
    TSideBar,
    TSideBarItem,
    TRadio,
    TRadioGroup,
  },
  props,
  emits: ['update:value', 'update:modelValue', 'change'],
  setup(props: TdTreeSelectProps) {
    const treeSelectClass = usePrefixClass('tree-select');
    const { height, customStyle, value, modelValue, options, keys, multiple, customValue } = toRefs(props);
    const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

    const leafLevel = ref(0);
    const treeOptions = ref<ColumnOption[][]>([]);
    const innerDisplayValue = ref<SelectValueGroup>([]);
    const rootStyle = computed(() => [`height: ${convertUnit(height.value)}`, customStyle.value].join(';'));

    const buildTreeOptions = (nav: SelectValueGroup, config: { fill: boolean; display?: SelectValueGroup }) => {
      const source = options.value as TreeOptionData[];
      if (!source?.length) {
        treeOptions.value = [];
        innerDisplayValue.value = [];
        leafLevel.value = 0;
        return;
      }

      const labelKey = keys.value?.label || 'label';
      const valueKey = keys.value?.value || 'value';
      const disabledKey = keys.value?.disabled || 'disabled';
      const childrenKey = keys.value?.children || 'children';
      const isMultiple = multiple.value;

      let level = -1;
      const columns: ColumnOption[][] = [];
      let node: { children?: unknown } | undefined = { children: source };

      // 列数等于当前选中分支真实深度，不按全树最大深度补空列
      while (node && node.children) {
        level += 1;
        const children = Array.isArray(node.children) ? (node.children as RawOption[]) : [];
        const list: ColumnOption[] = children.map((record) => ({
          label: record[labelKey] as ColumnOption['label'],
          value: record[valueKey] as OptionValue,
          disabled: Boolean(record[disabledKey]),
          children: record[childrenKey] as TreeOptionData['children'],
        }));
        columns.push(list);

        const currentValue = nav[level];
        node = list.find((child) => isDef(currentValue) && child.value === currentValue) ?? list[0];
      }

      leafLevel.value = Math.max(0, level);
      treeOptions.value = columns;

      if (config.display) {
        innerDisplayValue.value = [...config.display];
      } else if (config.fill) {
        innerDisplayValue.value = columns.map((col, idx) => {
          const isLeaf = idx === columns.length - 1;
          const first = col[0]?.value;
          let fallback: SelectValue | undefined = first;
          if (isLeaf && isMultiple) {
            fallback = first == null ? [] : [first];
          }
          return nav[idx] ?? fallback;
        });
      } else {
        innerDisplayValue.value = [...nav];
      }

      if (isMultiple) {
        const leaf = innerDisplayValue.value[leafLevel.value];
        if (leaf != null && !Array.isArray(leaf)) {
          log.error('TreeSelect', `\`value\` should be an array when \`multiple\` is true, got \`${typeof leaf}\``);
        }
      }
    };

    // customValue 优先、value 兜底
    const getMergedValue = (custom: SelectValueGroup, base: SelectValueGroup): SelectValueGroup => {
      const len = Math.max(custom.length, base.length);
      return Array.from({ length: len }, (_, i) => custom[i] ?? base[i]);
    };

    // 仅 customValue 变化时重新接管，并跳过自身交互引起的二次构建
    let lastValue: SelectValueGroup | undefined;
    let lastCustom: TreeSelectValue | undefined;
    let hasBuilt = false;

    const rebuildTreeOptions = () => {
      const inCustomMode = customValue.value != null;
      const base = toGroup(innerValue.value);
      const customChanged = !hasBuilt || !isValueEqual(customValue.value, lastCustom);

      if (hasBuilt && !customChanged && lastValue && isValueEqual(base, lastValue)) return;

      hasBuilt = true;
      lastCustom = cloneValue(customValue.value);

      if (customChanged && inCustomMode) {
        const custom = toGroup(customValue.value);
        const mergedValue = getMergedValue(custom, base);
        lastValue = mergedValue;
        buildTreeOptions(mergedValue, { fill: false, display: custom });
        return;
      }

      lastValue = base;
      buildTreeOptions(base, { fill: !inCustomMode });
    };

    const updateValueByLevel = (next: SelectValueGroup, level: number) => {
      buildTreeOptions(next, { fill: customValue.value == null });
      const result = shallowReactive(innerDisplayValue.value.map((item) => toRaw(item))) as SelectValueGroup;
      lastValue = result;
      lastCustom = cloneValue(customValue.value);
      setInnerValue(result as TreeSelectValue, level as TreeLevel);
    };

    const onColumnChange = (level: number) => {
      updateValueByLevel([...innerDisplayValue.value], level);
    };

    const handleTreeClick = (itemValue: OptionValue, level: number, disabled: boolean) => {
      if (disabled) return;
      const next = [...innerDisplayValue.value];
      next[level] = itemValue;
      updateValueByLevel(next, level);
    };

    watch([innerValue, options, keys, multiple, customValue], rebuildTreeOptions, { immediate: true, deep: true });

    const getTreeClass = (level: number, total: number) => {
      if (level === 0) return 'right';
      if (level === 1 && level !== total - 1) return 'middle';
      return 'left';
    };

    const renderSideBar = (column: ColumnOption[]) => (
      <TSideBar
        v-model={innerDisplayValue.value[0]}
        class={`${treeSelectClass.value}-colum`}
        onChange={() => onColumnChange(0)}
      >
        {column.map((item, index) => (
          <TSideBarItem key={index} label={item.label as string} value={item.value} disabled={item.disabled} />
        ))}
      </TSideBar>
    );

    const renderMiddleLevel = (column: ColumnOption[], level: number) =>
      column.map((item) => (
        <div
          key={item.value}
          class={{
            [`${treeSelectClass.value}__item`]: true,
            [`${treeSelectClass.value}__item--active`]: item.value === innerDisplayValue.value[level],
            [`${treeSelectClass.value}__item--disabled`]: item.disabled,
          }}
          onClick={() => handleTreeClick(item.value, level, item.disabled)}
        >
          {item.label}
        </div>
      ));

    const renderLeafLevel = (column: ColumnOption[], level: number) => {
      if (multiple.value) {
        return (
          <TCheckboxGroup
            v-model={innerDisplayValue.value[level]}
            class={`${treeSelectClass.value}__checkbox`}
            onChange={() => onColumnChange(level)}
          >
            {column.map((item) => (
              <TCheckbox
                key={item.value}
                class={`${treeSelectClass.value}__checkbox-item`}
                value={item.value}
                maxLabelRow={1}
                icon="line"
                borderless
                placement="right"
                disabled={item.disabled}
              >
                {item.label}
              </TCheckbox>
            ))}
          </TCheckboxGroup>
        );
      }
      return (
        <TRadioGroup
          v-model={innerDisplayValue.value[level]}
          class={`${treeSelectClass.value}__radio`}
          onChange={() => onColumnChange(level)}
        >
          {column.map((item) => (
            <TRadio
              key={item.value}
              class={`${treeSelectClass.value}__radio-item`}
              value={item.value}
              icon="line"
              maxLabelRow={1}
              borderless
              placement="right"
              disabled={item.disabled}
            >
              {item.label}
            </TRadio>
          ))}
        </TRadioGroup>
      );
    };

    return () => (
      <div class={treeSelectClass.value} style={rootStyle.value}>
        {treeOptions.value.map((column, level) => {
          if (level !== 0 && column.length === 0) return null;

          let content;
          if (level === 0) {
            content = renderSideBar(column);
          } else if (level === leafLevel.value) {
            content = renderLeafLevel(column, level);
          } else {
            content = renderMiddleLevel(column, level);
          }

          return (
            <div
              key={level}
              class={[
                `${treeSelectClass.value}__column`,
                `${treeSelectClass.value}__column--${getTreeClass(leafLevel.value - level, treeOptions.value.length)}`,
              ]}
            >
              {content}
            </div>
          );
        })}
      </div>
    );
  },
});

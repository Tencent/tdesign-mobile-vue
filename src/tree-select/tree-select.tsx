import { computed, defineComponent, ref, toRefs, watch } from 'vue';
import { SideBar as TSideBar, SideBarItem as TSideBarItem } from '../side-bar';
import TRadio, { RadioGroup as TRadioGroup } from '../radio';
import TCheckbox, { CheckboxGroup as TCheckboxGroup } from '../checkbox';
import config from '../config';
import { convertUnit } from '../shared';
import log from '../_common/js/log';
import props from './props';
import { TdTreeSelectProps, TreeSelectValue, _TreeOptionData } from './type';
import { usePrefixClass } from '../hooks/useClass';
import useVModel from '../hooks/useVModel';

const { prefix } = config;

type TreeSelectValueGroup = TreeSelectValue[];

export default defineComponent({
  name: `${prefix}-tree-select`,
  components: {
    TSideBar,
    TSideBarItem,
    TRadio,
    TRadioGroup,
  },
  props,
  emits: ['update:value', 'update:modelValue', 'change'],
  setup(props: TdTreeSelectProps, context) {
    const treeSelectClass = usePrefixClass('tree-select');
    const { height, customStyle, value, modelValue, options, keys, multiple } = toRefs(props);
    const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

    const leafLevel = ref(0);
    const treeMaxLevel = ref(0);
    const treeOptions = ref<_TreeOptionData[][]>([]);
    const rootStyle = computed(() => [`height: ${convertUnit(height.value)}`, customStyle.value].join(';'));

    const buildTreeOptions = () => {
      const { options, multiple, keys } = props;

      let level = -1;
      const tmpTreeOptions: _TreeOptionData[][] = [];
      let node: _TreeOptionData = { children: options };
      if (options.length === 0 || (Array.isArray(value) && value.length === 0)) return;
      while (node && node.children) {
        level += 1;
        const list = (node.children as _TreeOptionData[]).map((item: _TreeOptionData) => ({
          label: item[keys?.label || 'label'],
          value: item[keys?.value || 'value'],
          disabled: item[keys?.disabled || 'disabled'],
          children: item.children,
          level: leafLevel.value,
        }));
        const thisValue = (innerValue.value as TreeSelectValueGroup)?.[level];

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
      if (leafLevel.value > treeMaxLevel.value) {
        treeMaxLevel.value = leafLevel.value;
      }
      treeOptions.value = tmpTreeOptions;

      if (multiple) {
        const finalValue = innerValue.value as TreeSelectValueGroup;
        if (finalValue[treeMaxLevel.value] != null && !Array.isArray(finalValue[treeMaxLevel.value])) {
          log.error(
            'TreeSelect',
            `\`value\` should be an array when \`multiple\` is true, got \`${typeof finalValue[treeMaxLevel.value]}\``,
          );
        }
      }
    };

    const getTreeClass = (level: number, total: number) => {
      if (level === 0) return 'right';
      if (level === 1 && level !== total - 1) return 'middle';
      return 'left';
    };

    const onRootChange = (level: number) => {
      setInnerValue(innerValue.value, level);
    };

    const handleTreeClick = (itemValue: TreeSelectValue, level: number, isDisabled: boolean) => {
      if (isDisabled) return;
      (innerValue.value as TreeSelectValueGroup)[level] = itemValue;
      setInnerValue(innerValue.value, level);
    };

    watch(
      [innerValue, options, keys, multiple],
      () => {
        buildTreeOptions();
      },
      { immediate: true, deep: true },
    );

    const renderSideBar = (treeOption: _TreeOptionData[]) => {
      return (
        <TSideBar
          v-model={(innerValue.value as TreeSelectValueGroup)[0]}
          class={`${treeSelectClass.value}-colum`}
          onChange={() => onRootChange(0)}
        >
          {treeOption.map((item, index) => (
            <TSideBarItem key={index} label={item.label} value={item.value} disabled={item.disabled}></TSideBarItem>
          ))}
        </TSideBar>
      );
    };

    const renderMiddleLevel = (treeOption: _TreeOptionData[], level: number) => {
      return treeOption.map((item) => (
        <div
          key={item.value}
          class={{
            [`${treeSelectClass.value}__item`]: true,
            [`${treeSelectClass.value}__item--active`]:
              item.value === (innerValue.value as TreeSelectValueGroup)[level],
            [`${treeSelectClass.value}__item--disabled`]: item.disabled,
          }}
          onClick={() => handleTreeClick(item.value, level, item.disabled)}
        >
          {item.label}
        </div>
      ));
    };

    const renderLeafLevel = (treeOption: _TreeOptionData[], level: number) => {
      if (multiple.value) {
        return (
          <TCheckboxGroup
            v-model={(innerValue.value as TreeSelectValueGroup)[level]}
            class={`${treeSelectClass.value}__checkbox`}
            onChange={() => onRootChange(level)}
          >
            {treeOption.map((item) => (
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
          v-model={(innerValue.value as TreeSelectValueGroup)[level]}
          class={`${treeSelectClass.value}__radio`}
          onChange={() => onRootChange(level)}
        >
          {treeOption.map((item) => (
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

    return () => {
      return (
        <div class={treeSelectClass.value} style={rootStyle.value}>
          {treeOptions.value.map((item, level) => {
            let levelContent;
            if (level === 0) {
              levelContent = renderSideBar(item);
            } else if (level === leafLevel.value && level === treeMaxLevel.value) {
              // ⬆ fix #1901: Add `&& level === treeMaxLevel.value` to control checkGroup visibility, display checkGroup only when current level matches max level.
              levelContent = renderLeafLevel(item, level);
            } else {
              levelContent = renderMiddleLevel(item, level);
            }

            return (
              <div
                key={level}
                class={[
                  `${treeSelectClass.value}__column`,
                  `${treeSelectClass.value}__column--${getTreeClass(
                    leafLevel.value - level,
                    treeOptions.value.length,
                  )}`,
                ]}
              >
                {levelContent}
              </div>
            );
          })}
        </div>
      );
    };
  },
});

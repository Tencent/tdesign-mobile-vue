import { computed, defineComponent, ref, toRefs, watch } from 'vue';
import { SideBar as TSideBar, SideBarItem as TSideBarItem } from '../side-bar';
import TRadio, { RadioGroup as TRadioGroup } from '../radio';
import TCheckbox, { CheckboxGroup as TCheckboxGroup } from '../checkbox';
import config from '../config';
import { convertUnit, useDefault } from '../shared';
import props from './props';
import { TdTreeSelectProps, TreeSelectValue } from './type';
import { TreeOptionData } from '../_common/js/common';
import { usePrefixClass } from '@/hooks/useClass';

const { prefix } = config;
const name = `${prefix}-tree-select`;

export default defineComponent({
  name,
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
    const { height, customStyle, value, options, keys, multiple } = toRefs(props);
    const [innerValue, setInnerValue] = useDefault<TreeSelectValue, TdTreeSelectProps>(
      props,
      context.emit,
      'value',
      'change',
    );
    const leafLevel = ref(0);
    const treeOptions = ref<TreeOptionData[][]>([]);
    const rootStyle = computed(() => [`height: ${convertUnit(height.value)}`, customStyle.value].join(';'));

    const buildTreeOptions = () => {
      const { options, multiple, keys } = props;

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
        const thisValue = innerValue.value?.[level];

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
        const finalValue = innerValue.value;
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

    const onRootChange = (level: number) => {
      setInnerValue(innerValue.value, level);
    };

    const handleTreeClick = (itemValue: TreeSelectValue, level: number) => {
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

    const renderSideBar = (treeOption: TreeOptionData[]) => {
      return (
        <TSideBar
          v-model={innerValue.value[0]}
          class={`${treeSelectClass.value}-colum`}
          onChange={() => onRootChange(0)}
        >
          {treeOption.map((item, index) => (
            <TSideBarItem key={index} label={item.label} value={item.value}></TSideBarItem>
          ))}
        </TSideBar>
      );
    };

    const renderMiddleLevel = (treeOption: TreeOptionData[], level: number) => {
      return treeOption.map((item) => (
        <div
          key={item.value}
          class={{
            [`${treeSelectClass.value}__item`]: true,
            [`${name}__item--active`]: item.value === innerValue.value[level],
          }}
          onClick={() => handleTreeClick(item.value, level)}
        >
          {item.label}
        </div>
      ));
    };

    const renderLeafLevel = (treeOption: TreeOptionData[], level: number) => {
      if (multiple.value) {
        return (
          <TCheckboxGroup
            v-model={innerValue.value[level]}
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
              >
                {item.label}
              </TCheckbox>
            ))}
          </TCheckboxGroup>
        );
      }
      return (
        <TRadioGroup
          v-model={innerValue.value[level]}
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
            } else if (level === leafLevel.value) {
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

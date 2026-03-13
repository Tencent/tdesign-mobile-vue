import { VNode, Ref, ref, watch, onMounted, onUpdated, Slots, toRefs } from 'vue';

import { CheckboxOption, CheckboxOptionObj, TdCheckboxGroupProps } from '../type';
import useChildSlots from '../../hooks/useChildSlots';

export const getOptionListBySlots = (nodes: VNode[]) => {
  const arr: Array<CheckboxOptionObj> = [];
  nodes?.forEach((node) => {
    const option = node.props as CheckboxOptionObj;
    // @ts-ignore TODO
    if (option?.['check-all'] === '' || option?.['check-all'] === true) {
      option.checkAll = true;
    }
    option && arr.push(option);
  });
  return arr;
};

export const getOptions = (props: any, slots: Slots) => {
  const { options } = toRefs(props);
  const optionList = ref<CheckboxOptionObj[]>([]);

  watch(
    options,
    (options) => {
      if (!options) return [];
      optionList.value = options.map((item: CheckboxOption) => {
        let r: CheckboxOptionObj = {};
        if (typeof item !== 'object') {
          r = { label: String(item), value: item };
        } else {
          r = { ...item };
        }
        return r;
      });
    },
    { immediate: true },
  );

  // 从 slot 中解析 checkbox 选项列表
  const updateOptionListBySlots = () => {
    const nodes = slots.default && slots.default();
    if (nodes !== undefined) {
      optionList.value = getOptionListBySlots(useChildSlots('t-checkbox'));
    }
  };

  // 挂载时初始化
  onMounted(updateOptionListBySlots);

  // 更新时同步，确保 slot 内容动态变化（如筛选后 checkbox 数量改变）时 optionList 也能更新
  onUpdated(updateOptionListBySlots);

  return optionList;
};

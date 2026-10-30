import { VNode, Ref, computed, Slots, toRefs } from 'vue';

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

  // computed 在渲染阶段求值，slot 调用不会产生 "invoked outside render function" 警告
  const optionList = computed<Array<CheckboxOptionObj>>(() => {
    if (options.value?.length) {
      return options.value.map((item: CheckboxOption) => {
        let r: CheckboxOptionObj = {};
        if (typeof item !== 'object') {
          r = { label: String(item), value: item };
        } else {
          r = { ...item };
        }
        return r;
      });
    }

    // 无 options 时从 slot 解析
    const nodes = slots.default?.();
    if (nodes) {
      return getOptionListBySlots(useChildSlots('TCheckbox', nodes));
    }
    return [];
  });

  return optionList;
};

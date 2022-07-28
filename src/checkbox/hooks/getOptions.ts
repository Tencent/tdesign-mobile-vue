import { VNode, Ref, ref, watch, onMounted, Slots, toRefs } from 'vue';

import { CheckboxOption, CheckboxOptionObj, TdCheckboxGroupProps } from '../type';
import { useChildSlots } from '../../shared';

export const getOptionListBySlots = (nodes: VNode[]) => {
  const arr: Array<CheckboxOptionObj> = [];
  nodes?.forEach((node) => {
    const option = node.props as CheckboxOptionObj;
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
          r.disabled = r.disabled === undefined ? props.disabled : r.disabled;
        }
        return r;
      });
    },
    { immediate: true },
  );

  onMounted(() => {
    const nodes = slots.default && slots.default();
    if (nodes !== undefined) {
      optionList.value = getOptionListBySlots(useChildSlots('t-checkbox'));
    }
  });

  return optionList;
};

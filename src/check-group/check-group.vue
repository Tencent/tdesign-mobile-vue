<template>
  <div :class="`${prefix}-checkbox-group`">
    <slot v-if="!(options && options.length)"></slot>
    <span v-else>
      <checkbox
        v-for="(item, idx) in optionList"
        :key="idx"
        :name="item.name"
        :label="item.label"
        :value="item.value"
        :check-all="item.checkAll"
      ></checkbox>
    </span>
  </div>
</template>

<script lang="ts">
import { SetupContext, provide, ref, computed, defineComponent, watch, toRefs, VNode, reactive, onMounted } from 'vue';
import intersection from 'lodash/intersection';
import config from '../config';
import CheckboxProps from '../checkbox/checkbox-group-props';
import Checkbox from '../checkbox/checkbox.vue';
import {
  CheckboxGroupValue,
  CheckboxOption,
  CheckboxOptionObj,
  TdCheckboxGroupProps,
  TdCheckboxProps,
} from '../checkbox/type';
import { useChildSlots, useDefault } from '../shared';

const { prefix } = config;
const name = `${prefix}-check-group`;

export interface Child {
  value: string | number;
}

export default defineComponent({
  name,
  components: {
    Checkbox,
  },
  props: CheckboxProps,
  emits: ['update:value', 'update:modelValue', 'change'],
  setup(props: any, context: SetupContext) {
    const { options } = toRefs(props);
    const [groupCheckValue, setGroupCheckValue] = useDefault<CheckboxGroupValue, TdCheckboxGroupProps>(
      props,
      context.emit,
      'value',
      'change',
    );
    const checkedMap = ref({});
    const optionList = ref<Array<CheckboxOptionObj>>([]);
    const intersectionLen = computed(() => {
      const values = optionList.value.map((item) => item.value);
      if (groupCheckValue.value instanceof Array) {
        const n = intersection(groupCheckValue.value, values);
        return n.length;
      }
      return 0;
    });

    const isCheckAll = computed(() => {
      if (groupCheckValue.value instanceof Array && groupCheckValue.value.length !== optionList.value.length - 1) {
        return false;
      }
      return intersectionLen.value === optionList.value.length - 1;
    });

    const indeterminate = computed(() => {
      return !isCheckAll.value && intersectionLen.value < optionList.value.length && intersectionLen.value !== 0;
    });

    const values = computed(() => {
      if (groupCheckValue.value instanceof Array) {
        return groupCheckValue.value.join();
      }
      return '';
    });

    watch(
      values,
      () => {
        if (groupCheckValue.value instanceof Array) {
          const map = {};
          groupCheckValue.value.forEach((item: string | number) => {
            map[item] = true;
          });
          checkedMap.value = map;
        }
      },
      { immediate: true },
    );

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

    const maxExceeded = computed(() => {
      return props.max !== undefined && groupCheckValue.value.length === props.max;
    });

    const onCheckedChange = (p: { checked: boolean; checkAll: boolean; e: Event; option: TdCheckboxProps }) => {
      const { checked, checkAll, e } = p;
      if (checkAll) {
        onCheckAllChange(checked, { e });
      } else {
        handleCheckboxChange(p);
      }
    };

    const getOptionListBySlots = (nodes: VNode[]) => {
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

    onMounted(() => {
      const nodes = context.slots.default && context.slots.default();
      if (nodes !== undefined) {
        optionList.value = getOptionListBySlots(useChildSlots('t-checkbox'));
      }
    });

    const handleCheckboxChange = (data: { checked: boolean; e: Event; option: TdCheckboxProps }) => {
      const currentValue = data.option.value;
      if (groupCheckValue.value instanceof Array) {
        // TODO: need to test more
        if (currentValue === undefined) {
          return;
        }
        const val = [...groupCheckValue.value];
        if (data.checked) {
          val.push(currentValue);
        } else {
          const i = val.indexOf(currentValue);
          val.splice(i, 1);
        }
        setGroupCheckValue(val, {
          e: data.e,
          current: data.option.value,
          type: data.checked ? 'check' : 'uncheck',
        });
      } else {
        console.warn(
          `TDesign CheckboxGroup Warn: \`value\` must be an array, instead of ${typeof groupCheckValue.value}`,
        );
      }
    };
    const getAllCheckboxValue = (): CheckboxGroupValue => {
      const val = new Set<NonNullable<TdCheckboxProps['value']>>();
      for (let i = 0, len = optionList.value.length; i < len; i++) {
        const item = optionList.value[i];
        if (item.checkAll) continue;
        if (item.value === undefined) continue;
        val.add(item.value);
        if (maxExceeded.value) break;
      }
      return [...val];
    };
    const onCheckAllChange = (checked: boolean, context: { e: Event; source?: 't-checkbox' }) => {
      const value: CheckboxGroupValue = checked ? getAllCheckboxValue() : [];
      setGroupCheckValue(value, {
        e: context.e,
        type: checked ? 'check' : 'uncheck',
        current: undefined,
      });
    };

    provide('checkboxGroup', {
      ...toRefs(props),
      groupCheckValue,
      indeterminate,
      isCheckAll,
      checkedMap,
      onCheckedChange,
    });
    return {
      prefix,
      optionList,
    };
  },
});
</script>

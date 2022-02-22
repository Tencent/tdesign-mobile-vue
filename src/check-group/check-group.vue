<template>
  <div :class="`${prefix}-checkbox-group`">
    <slot v-if="!(groupOptions && groupOptions.length)"></slot>
    <span v-else>
      <checkbox
        v-for="(item, idx) in groupOptions"
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
import { SetupContext, provide, ref, computed, defineComponent } from 'vue';
import config from '../config';
import CheckboxProps from '../checkbox/checkbox-group-props';
import checkbox from '../checkbox/checkbox.vue';
import { CheckboxGroupValue, CheckboxOption, TdCheckboxGroupProps } from '../checkbox/type';
import { useDefault } from '../shared';

const { prefix } = config;
const name = `${prefix}-check-group`;

export interface Child {
  value: string | number;
}

export default defineComponent({
  name,
  components: {
    checkbox,
  },
  props: CheckboxProps,
  emits: ['update:value', 'update:modelValue', 'change'],
  setup(props: any, context: SetupContext) {
    const children = ref({});
    const isAllSelected = ref(false);
    const [groupCheckValue, setGroupCheckValue] = useDefault<CheckboxGroupValue, TdCheckboxGroupProps>(
      props,
      context.emit,
      'value',
      'change',
    );

    const checkedValues = computed(() => props.value || []);
    // eslint-disable-next-line vue/no-setup-props-destructure
    const groupOptions = computed(() => {
      return props.options?.map((option: CheckboxOption) => {
        let opt = option as CheckboxOption;
        if (typeof option === 'string' || typeof option === 'number') {
          opt = { value: option, label: option.toString() };
        }
        return opt;
      });
    });
    /**
     * @description: 为checkbox注册
     * @param {object}
     * @return: void
     */
    const register = (child: Child) => {
      child?.value && (children.value[child.value] = child);
    };

    /**
     * @description: 为checkbox取消注册
     * @param {object}
     * @return: void
     */
    const unregister = (child: Child) => {
      child.value && delete children.value[child.value];
    };
    /**
     * @description: 为checkbox选中
     * @param {string}
     * @return: void
     */
    const check = (value: string, e: Event) => {
      const index = checkedValues.value.indexOf(value);
      const inMax = props?.max === undefined || checkedValues?.value?.length < props?.max;
      if (index !== undefined && index === -1 && inMax) {
        const tempValues = checkedValues?.value?.concat(value);
        const resultValues = [...Array.from(tempValues)];
        isAllSelected.value = Object.keys(children?.value).length === resultValues.length;
        setGroupCheckValue(resultValues as CheckboxGroupValue, { e });
      }
    };
    /**
     * @description: 为checkbox取消选中
     * @param {string}
     * @return: void
     */
    const uncheck = (name: string, e: Event) => {
      const index = checkedValues?.value.indexOf(name);
      if (index !== undefined && index !== -1) {
        isAllSelected.value = false;
        const tempValues = checkedValues?.value.slice(0, index);
        const resultValues = tempValues.concat(checkedValues?.value.slice(index + 1));
        setGroupCheckValue(resultValues as CheckboxGroupValue, { e });
      }
    };
    /**
     * @description: 切换选中
     * @param {string}
     * @return: void
     */
    const toggle = (name: string, e: Event) => {
      const index = checkedValues?.value.indexOf(name);
      if (index === -1) {
        check(name, e);
      } else {
        uncheck(name, e);
      }
    };
    /**
     * @description: 切换全部
     * @param {boolean}
     * @return: void
     */
    const toggleAll = (checked: boolean) => {
      const resultValues = Object.keys(children.value).filter((name: string) => {
        const child = children.value[name];
        const isChecked = !!checkedValues?.value?.indexOf(name);
        if (child.disabled) {
          return isChecked;
        }
        // eslint-disable-next-line no-nested-ternary
        return checked === false ? false : !checked ? !isChecked : true;
      });
      isAllSelected.value = !!resultValues.length;
      setGroupCheckValue(resultValues as CheckboxGroupValue);
    };

    provide('rootGroup', {
      checkedValues,
      disabled: props.disabled,
      register,
      unregister,
      check,
      uncheck,
      toggle,
      toggleAll,
      isAllSelected,
    });
    return {
      prefix,
      register,
      unregister,
      check,
      uncheck,
      toggle,
      toggleAll,
      groupOptions,
    };
  },
});
</script>

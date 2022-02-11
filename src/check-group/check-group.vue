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
import { CheckboxOption } from '../checkbox/type';
import { emitEvent } from '@/shared';

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
  emits: ['update:value', 'change'],
  setup(props: any, context: SetupContext) {
    const children = ref({});
    const isALlSelected = ref(false);
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
        isALlSelected.value = Object.keys(children?.value).length === resultValues.length;
        emitEvent(props, context, 'update:value', resultValues, { e });
        emitEvent(props, context, 'change', resultValues, { e });
        props?.onChange && props?.onChange(resultValues, { e });
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
        isALlSelected.value = false;
        const tempValues = checkedValues?.value.slice(0, index);
        const resultValues = tempValues.concat(checkedValues?.value.slice(index + 1));
        emitEvent(props, context, 'update:value', resultValues, { e });
        emitEvent(props, context, 'change', resultValues, { e });
        props?.onChange && props?.onChange(resultValues, { e });
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
      const names = Object.keys(children.value).filter((name: string) => {
        const child = children.value[name];
        const isChecked = !!checkedValues?.value?.indexOf(name);
        if (child.disabled) {
          return isChecked;
        }
        // eslint-disable-next-line no-nested-ternary
        return checked === false ? false : !checked ? !isChecked : true;
      });
      isALlSelected.value = !!names.length;
      emitEvent(props, context, 'update:value', names);
      emitEvent(props, context, 'change', names);
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
      isALlSelected,
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

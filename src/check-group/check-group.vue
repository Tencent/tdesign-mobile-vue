<template>
  <div :class="`${prefix}-checkbox-group`">
    <slot v-if="!(options && options.length)"></slot>
    <span v-else>
      <checkbox v-for="(item, idx) in options" :name="item.name" :label="item.label" :value="item.value" :checkAll="item.checkAll" :key="idx"></checkbox>
    </span>
  </div>
</template>

<script lang="ts">
import { SetupContext, provide, ref, computed, defineComponent, watch } from 'vue';
import config from '../config';
import CheckboxProps from '../checkbox/checkbox-group-props';
import checkbox from '../checkbox/checkbox.vue';

const { prefix } = config;
const name = `${prefix}-check-group`;

export interface Child {
  value: string | number;
}

export default defineComponent({
  name,
  props: CheckboxProps,
  components: {
    checkbox,
  },
  emits: ['update:value', 'change'],
  setup(props: any, content: SetupContext) {
    const children = ref({});
    const checkedValues = computed(() => props.value || []);
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
        const resultValues = [...Array.from(tempValues)]
        content.emit('update:value', resultValues);
        content.emit('change', resultValues, { e });
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
        const tempValues = checkedValues?.value.slice(0, index);
        const resultValues = tempValues.concat(checkedValues?.value.slice(index + 1));
        content.emit('update:value', resultValues);
        content.emit('change', resultValues, { e });
        props?.onChange && props?.onChange(resultValues, { e });
      }
    };
    /**
     * @description: 切换选中
     * @param {string}
     * @return: void
     */
    const toggle = (name: string) => {
      const index = checkedValues?.value.indexOf(name);
      if (index === -1) {
        check(name);
      } else {
        uncheck(name);
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
      content.emit('update:value', names);
      content.emit('change', names);
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
    });
    return {
      prefix,
      register,
      unregister,
      check,
      uncheck,
      toggle,
      toggleAll,
    };
  },
});
</script>

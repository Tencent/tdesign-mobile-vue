<template>
  <div :class="`${prefix}-check-group`">
    <slot> </slot>
  </div>
</template>

<script lang="ts">
import { SetupContext, provide, ref, computed, defineComponent, PropType } from 'vue';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-check-group`;

export interface Child {
  name: string;
}

export default defineComponent({
  name,
  props: {
    /**
     * @description check-group 当前的值check-box的值
     * @attribute modelValue
     */
    modelValue: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    /**
     * @description check-group 当前的值check-box组是否能被点击
     * @attribute disabled
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * @description check-group 当前组最大的选择项
     * @attribute max
     */
    max: {
      type: [String, Number],
      default: 0,
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, content: SetupContext) {
    const children = ref({});
    const checkedValues = computed(() => props.modelValue || []);
    /**
     * @description: 为check-box注册
     * @param {object}
     * @return: void
     */
    const register = (child: Child) => {
      child?.name && (children.value[child.name] = child);
    };

    /**
     * @description: 为check-box取消注册
     * @param {object}
     * @return: void
     */
    const unregister = (child: Child) => {
      child.name && delete children.value[child.name];
    };
    /**
     * @description: 为check-box选中
     * @param {string}
     * @return: void
     */
    const check = (name: string) => {
      const index = checkedValues.value.indexOf(name);
      const inMax = props?.max < 1 || checkedValues?.value?.length < props?.max;
      if (index !== undefined && index === -1 && inMax) {
        const tempValues = checkedValues?.value?.concat(name);
        content.emit('update:modelValue', [...Array.from(tempValues)]);
      }
    };
    /**
     * @description: 为check-box取消选中
     * @param {string}
     * @return: void
     */
    const uncheck = (name: string) => {
      const index = checkedValues?.value.indexOf(name);
      if (index !== undefined && index !== -1) {
        const tempValues = checkedValues?.value.slice(0, index);
        content.emit('update:modelValue', tempValues.concat(checkedValues?.value.slice(index + 1)));
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
        const isChecked = !!~checkedValues?.value?.indexOf(name);
        if (child.disabled) {
          return isChecked;
        }
        // eslint-disable-next-line no-nested-ternary
        return checked === false ? false : !checked ? !isChecked : true;
      });
      content.emit('update:modelValue', names);
      content.emit('change', names);
    };
    provide('rootGroup', {
      checkedValues,
      disabled: props.disabled,
      register,
      unregister,
      check,
      uncheck,
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

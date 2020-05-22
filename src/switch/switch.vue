<template>
  <span :class="classes">
    <span :class="textClasses" v-if="text">
      {{text}}
    </span>
    <span :class="nodeClasses" @click="toggle">
    </span>
  </span>
</template>

<script lang="ts">
import { computed, toRefs, SetupContext } from 'vue';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-switch`;

export interface SwitchProps {
    modelValue: {
      type: [string, number, boolean],
      default: false
    },
    value: {
      type: [string, number, boolean],
      default: false
    },
    activeValue: {
      type: [string, number, boolean],
      default: true
    },
    inactiveValue: {
      type: [string, number, boolean],
      default: false
    },
    disabled: {
      type: boolean,
      default: false
    },
    text: string,
  }

export default {
  name,
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: false,
    },
    /**
       * @description 当前选择的值
       * @attribute value
       */
    value: {
      type: [String, Number, Boolean],
      default: false,
    },
    /**
       * @description 打开的值
       * @attribute activeValue
       */
    activeValue: {
      type: [String, Number, Boolean],
      default: true,
    },
    /**
       * @description 关闭的值
       * @attribute inactiveValue
       */
    inactiveValue: {
      type: [String, Number, Boolean],
      default: false,
    },
    /**
       * @description 是否禁用
       * @attribute disabled
       */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
       * @description 描述文字
       * @attribute text
       */
    text: {
      type: String,
      default: '',
    },
  },
  setup(props: SwitchProps, context: SetupContext) {
    const currentValue = computed({
      set(val) {
        context.emit('update:modelValue', val);
      },
      get() {
        return props.modelValue || props.value;
      },
    });

    const classes = computed(() => [
      `${name}`,
      {
        [`${name}--checked`]: currentValue.value === props.activeValue,
        [`${prefix}-is-disabled`]: props.disabled,
      },
    ]);

    const textClasses = computed(() => [
      `${name}__text`,
    ]);

    const nodeClasses = computed(() => [
      `${name}__node`,
      {
        [`${name}__node--checked`]: currentValue.value === props.activeValue,
        [`${prefix}-is-disabled`]: props.disabled,
      },
    ]);

    function handleToggle() {
      const checked = currentValue.value === props.activeValue
        ? props.inactiveValue : props.activeValue;

      currentValue.value = checked;
      context.emit('change', checked);
    }

    function toggle(event:Event) {
      event.preventDefault();
      if (props.disabled) {
        return false;
      }
      handleToggle();
    }

    return {
      classes,
      textClasses,
      nodeClasses,
      toggle,
      currentValue,
      ...toRefs(props),
    };
  },
};
</script>

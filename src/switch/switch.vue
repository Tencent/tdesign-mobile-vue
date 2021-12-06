<template>
  <span :class="classes">
    <span v-if="text" :class="textClasses">
      {{ text }}
    </span>
    <span :class="nodeClasses" @click="toggle"> </span>
  </span>
</template>

<script lang="ts">
import { ref, computed, toRefs, SetupContext, defineComponent, ExtractPropTypes } from 'vue';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-switch`;

export const switchProps = {
  /**
   * @description 当前选择的值
   * @attribute modelValue
   */
  modelValue: {
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
};
export type SwitchPropsType = ExtractPropTypes<typeof switchProps>;

export default defineComponent({
  name,
  props: switchProps,
  emits: ['update:modelValue', 'change'],
  setup(props, context: SetupContext) {
    const switchValue = ref(false);
    const currentValue = computed({
      set(val) {
        switchValue.value = val as boolean;
        context.emit('update:modelValue', val);
      },
      get() {
        return props.modelValue || switchValue.value;
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
      {
        [`${prefix}-is-disabled`]: props.disabled,
      },
    ]);

    const nodeClasses = computed(() => [
      `${name}__node`,
      {
        [`${name}__node--checked`]: currentValue.value === props.activeValue,
        [`${prefix}-is-disabled`]: props.disabled,
      },
    ]);

    function handleToggle() {
      const checked = currentValue.value === props.activeValue ? props.inactiveValue : props.activeValue;

      currentValue.value = checked;
      context.emit('change', checked);
    }

    function toggle(event: Event) {
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
});
</script>

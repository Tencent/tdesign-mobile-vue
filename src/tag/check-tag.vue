<template>
  <button :class="classes" :disabled="disabled">
    <t-icon v-if="icon" :class="`${baseClass}__icon`" :name="icon" />
    <slot :class="`${baseClass}__text`" />
    <t-icon
      v-if="closable && !disabled"
      :class="`${baseClass}__close`"
      name="clear"
      @click="onClickClose"
    />
  </button>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, watch } from "vue";
import TIcon from "../icon";
import config from "../config";
const { prefix } = config;
const name = `${prefix}-check-tag`;

export enum TagSize {
  Large = "large",
  Default = "default",
  Small = "small",
}

export enum TagShape {
  Square = "square",
  Round = "round",
  Circle = "circle",
}

// export type TagProps = {};

const CheckTag = defineComponent({
  name,
  components: {
    TIcon,
  },
  props: {
    size: {
      type: String,
      default: TagSize.Default,
    },
    icon: {
      type: String,
      default: "",
    },
    shape: {
      type: String,
      default: TagShape.Square,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    closable: {
      type: Boolean,
      default: false,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["change", "close"],
  setup(props, context) {
    const baseClass = `${prefix}-tag`;

    const {  size, shape, checked, disabled, closable } = toRefs(props);

    const classes = computed(() => [
      `${baseClass}`,
      `${baseClass}--checkable`,
      {
        [`${baseClass}--size-${size.value}`]: size.value,
        [`${prefix}-is-closable ${baseClass}--closable`]: closable.value,
        [`${prefix}-is-disabled ${baseClass}--disabled`]: disabled.value,
        [`${prefix}-is-checked ${baseClass}--checked`]: checked.value,
        [`${baseClass}--square`]: shape.value.valueOf() === TagShape.Square.valueOf(),
        [`${baseClass}--round`]: shape.value.valueOf() === TagShape.Round.valueOf(),
        [`${baseClass}--circle`]: shape.value.valueOf() === TagShape.Circle.valueOf(),
      },
    ]);

    function onClickClose(e: Event): void {
      if (props.disabled) {
        e.stopPropagation();
      } else {
        context.emit("close", e);
      }
    }

    watch(checked, (checked) => {
      context.emit("change", checked);
    });

    return {
      baseClass,
      classes,
      onClickClose,
    };
  },
});

export default CheckTag;
</script>

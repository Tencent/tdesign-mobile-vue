<template>
  <div :class="classes">
    <t-icon :icon="_icon" :class="iconClass" v-if="_icon" />
    <div :class="textClass">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, toRefs, ref } from 'vue';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-toast`;

export enum ToastTheme {
  Text = 'text',
  Loading = 'loading',
  Success = 'success',
  Fail = 'fail'
}
export enum ToastPosition {
  Middle = 'middle',
  Top = 'top',
  Bottom = 'bottom'
}
export interface ToastProps {
  icon: String;
  iconOnly: Boolean,
  loading: Boolean;
  theme: ToastTheme;
  position:ToastPosition
}

export default {
  name,
  props: {
    position: {
      type: String,
      default: ToastPosition.Middle,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    iconOnly: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    theme: {
      type: String,
      default: '',
    },
  },
  setup(props: ToastProps) {
    const textClass = computed(() => [`${name}__text`]);
    const _icon = computed(() => (loading.value ? 'loading_gradient' : inIcon));
    const iconClass = ref(`${name}__icon`);
    const inIcon = props.icon;
    const { loading } = toRefs(props);
    const classes = computed(() => [
      `${name}`,
      {
        [`${name}--text`]:
          props.theme.valueOf() === ToastTheme.Text.valueOf(),
        [`${name}--success`]:
          props.theme.valueOf() === ToastTheme.Success.valueOf(),
        [`${name}--fail`]:
          props.theme.valueOf() === ToastTheme.Fail.valueOf(),
        [`${name}--loading`]:
          props.theme.valueOf() === ToastTheme.Loading.valueOf(),
        [`${name}--middle`]:
          props.position.valueOf() === ToastPosition.Middle.valueOf(),
        [`${name}--top`]:
          props.position.valueOf() === ToastPosition.Top.valueOf(),
        [`${name}--bottom`]:
          props.position.valueOf() === ToastPosition.Bottom.valueOf(),
        [`${name}--icononly`]: props.iconOnly,
      },
    ]);

    return {
      classes,
      textClass,
      iconClass,
      _icon,
      ...toRefs(props),
    };
  },
};
</script>

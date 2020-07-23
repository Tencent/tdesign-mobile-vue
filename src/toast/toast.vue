<template>
  <div>
    <t-mask v-show="showOverlay"/>
    <div :class="classes">
      <t-icon :icon="_icon" :class="`${name}__icon`" v-if="_icon" />
      <div :class="`${name}__text`">{{ message }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, toRefs, ref } from 'vue';

import TIcon from '../icon';
import TMask from '../mask';
import { ToastPosition, ToastProps, ToastTypeIcon } from './toast.interface';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-toast`;

export default {
  name,
  components: { TIcon, TMask },
  props: {
    /**
     * @description 消息内容
     * @attribute message
     */
    message: String,
    /**
     * @description 提示类型
     * @attribute type
     */
    type: String,
    /**
     * @description 展示位置
     * @attribute position
     */
    position: {
      type: String,
      default: ToastPosition.Middle,
    },
    /**
     * @description 自定义图标
     * @attribute icon
     */
    icon: [String, Function],
    /**
     * @description 是否显示背景遮罩
     * @attribute showOverlay
     */
    showOverlay: Boolean,
    /**
     * @description 显示时间，毫秒
     * @attribute duration
     */
    duration: {
      type: Number,
      default: 2000,
    },
  },
  setup(props: ToastProps) {
    const _icon = computed(() => {
      let icon : string = props.type && ToastTypeIcon[props.type];
      if (props.icon) icon = props.icon;
      return icon;
    });

    const classes = computed(() => [
      `${name}`,
      {
        [`${name}--text`]:
          !_icon.value,
        [`${name}--icononly`]:
          !props.message && _icon.value,
        [`${name}--middle`]:
          props.position === ToastPosition.Middle.valueOf(),
        [`${name}--top`]:
          props.position === ToastPosition.Top.valueOf(),
        [`${name}--bottom`]:
          props.position === ToastPosition.Bottom.valueOf(),
      },
    ]);

    return {
      name: ref(name),
      classes,
      _icon,
      ...toRefs(props),
    };
  },
};
</script>

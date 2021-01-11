<template>
  <div>
    <t-mask v-show="showOverlay" />
    <div :class="classes">
      <t-icon v-if="computedIcon" :name="computedIcon" :class="`${name}__icon`" />
      <div :class="`${name}__text`">{{ message }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, toRefs, ref, defineComponent } from 'vue';

import TIcon from '../icon';
import TMask from '../mask';
import { ToastPosition, ToastTypeIcon } from './toast.interface';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-toast`;

export default defineComponent({
  name,
  components: { TIcon, TMask },
  props: {
    /**
     * @description 消息内容
     * @attribute message
     */
    message: {
      type: String,
      default: '',
    },
    /**
     * @description 提示类型
     * @attribute type
     */
    type: {
      type: String,
      default: '',
    },
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
    icon: {
      type: [String, Function],
      default: '',
    },
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
  setup(props) {
    const computedIcon = computed(() => {
      let icon = props.type && ToastTypeIcon[props.type];
      if (props.icon) icon = props.icon;
      return icon;
    });

    const classes = computed(() => [
      `${name}`,
      {
        [`${name}--text`]: !computedIcon.value,
        [`${name}--icononly`]: !props.message && computedIcon.value,
        [`${name}--middle`]: props.position === ToastPosition.Middle.valueOf(),
        [`${name}--top`]: props.position === ToastPosition.Top.valueOf(),
        [`${name}--bottom`]: props.position === ToastPosition.Bottom.valueOf(),
      },
    ]);

    return {
      name: ref(name),
      classes,
      computedIcon,
      ...toRefs(props),
    };
  },
});
</script>

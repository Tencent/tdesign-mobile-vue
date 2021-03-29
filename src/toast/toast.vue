<template>
  <div>
    <t-mask v-show="showOverlay" />
    <div :class="classes">
      <component :is="computedIcon" :class="`${name}__icon`"> </component>
      <div :class="`${name}__text`">{{ message }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import TIconLoading from '../icon/loading.vue';
import TIconCheck from '../icon/check.vue';
import TIconWarning from '../icon/warning.vue';
import { computed, toRefs, ref, defineComponent, PropType } from 'vue';
import TMask from '../mask';
import { ToastPositionType, ToastProps, ToastType } from './toast.interface';
import config from '../config';
const { prefix } = config;
const name = `${prefix}-toast`;

// FUNCTION > SLOT > TYPE
export default defineComponent({
  name,
  components: { TMask, TIconLoading, TIconCheck, TIconWarning },
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
      type: String as PropType<ToastType>,
      default: '',
    },
    /**
     * @description 展示位置
     * @attribute position
     */
    position: {
      type: String as PropType<ToastPositionType>,
      default: 'middle',
    },
    /**
     * @description 自定义图标
     * @attribute icon
     */
    icon: {
      type: Function as unknown as PropType<ToastProps['icon']>,
      default: undefined,
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
  setup(props, context) {
    const toastTypeIcon = {
      loading: TIconLoading,
      success: TIconCheck,
      fail: TIconWarning,
    };
    const computedIcon = computed(() => {
      if (typeof props.icon === 'function') {
        return props.icon();
      }
      if (!!context.slots.icon) {
        return context.slots.icon;
      }
      if (props.type) {
        return toastTypeIcon[props.type];
      }
      return undefined;
    });

    const classes = computed(() => [
      `${name}`,
      {
        [`${name}--text`]: !computedIcon.value,
        [`${name}--icononly`]: !props.message && computedIcon.value,
        [`${name}--top`]: props.position === 'top',
        [`${name}--middle`]: props.position === 'middle',
        [`${name}--bottom`]: props.position === 'bottom',
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

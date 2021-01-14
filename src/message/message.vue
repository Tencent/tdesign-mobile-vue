<template>
  <transition name="message" @after-leave="afterLeave" @after-enter="afterEnter">
    <div v-if="currentVisible" ref="root" :class="rootClasses" :style="rootStyles">
      <slot>
        <slot name="icon">
          <t-check-icon v-if="theme === 'success'" />
          <t-error-icon v-else />
        </slot>
        <span :class="`${name}--txt`">{{ content }}</span>
      </slot>
    </div>
  </transition>
</template>

<script lang="ts">
import { ref, computed, SetupContext, watch, defineComponent, PropType } from 'vue';
import { MessageType, MessageAlignType } from './message.interface';
import TCheckIcon from '../icon/check-circle-filled.vue';
import TErrorIcon from '../icon/error-circle-filled.vue';
import config from '../config';
import { TNode } from '@/shared';
const { prefix } = config;
const name = `${prefix}-message`;

export default defineComponent({
  name,
  components: { TCheckIcon, TErrorIcon },
  props: {
    modelValue: Boolean,
    /**
     * @description 显示与隐藏
     * @attribute visible
     */
    visible: Boolean,
    /**
     * @description 消息内容
     * @attribute content
     */
    content: {
      type: String,
      default: '',
    },
    /**
     * @description 消息类型
     * @attribute theme
     */
    theme: {
      type: String as PropType<MessageType>,
      default: 'info',
    },
    /**
     * @description 显示时间，毫秒
     * @attribute duration
     */
    duration: {
      type: Number,
      default: 2000,
    },
    /**
     * @description 文本对齐方式
     * @attribute align
     */
    align: {
      type: String as PropType<MessageAlignType>,
      default: 'left',
    },
    /**
     * @description 自定义层级
     * @attribute zIndex
     */
    zIndex: {
      type: Number,
      default: 5000,
    },
  },
  emits: ['update:modelValue', 'visible-change', 'open', 'opened', 'close', 'closed'],
  setup(props, context: SetupContext) {
    const root = ref(null);
    const currentVisible = computed(() => props.modelValue || props.visible);
    const rootClasses = computed(() => ({
      [name]: true,
      [`${name}--${props.theme}`]: true,
      [`${name}-align--${props.align}`]: !!props.align,
    }));
    const rootStyles = computed(() => ({
      zIndex: props.zIndex,
    }));

    watch(
      () => currentVisible.value,
      (val) => {
        context.emit('visible-change', val);
        if (val) {
          context.emit('open');
          setTimeout(() => {
            context.emit('update:modelValue', false);
            context.emit('close');
          }, props.duration);
        }
      },
    );

    return {
      name: ref(name),
      root,
      currentVisible,
      rootClasses,
      rootStyles,
      afterEnter: () => context.emit('opened'),
      afterLeave: () => context.emit('closed'),
    };
  },
});
</script>

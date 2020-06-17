<template>
  <transition name="message" @after-leave="afterLeave" @after-enter="afterEnter">
    <div v-if="currentVisible" ref="root" :class="rootClasses" :style="rootStyles">
      <slot>
        <t-icon icon="circle_info" />
        <span :class="`${name}--txt`">{{content}}</span>
      </slot>
    </div>
  </transition>
</template>

<script lang="ts">
import { ref, computed, SetupContext, watch } from 'vue';
import { IMessageProps } from './message.interface';
import TIcon from '../icon';

import config from '../config';
const { prefix } = config;

const name = `${prefix}-message`;

export default {
  name,
  components: { TIcon },
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
    content: String,
    /**
     * @description 消息类型
     * @attribute theme
     */
    theme: {
      type: String,
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
    align: String,
    /**
     * @description 偏移量
     * @attribute offset
     */
    offset: {
      type: Object,
      default: () => {},
    },
    /**
     * @description 自定义图标
     * @attribute icon
     */
    icon: [String, Function],
    /**
     * @description 自定义层级
     * @attribute zIndex
     */
    zIndex: Number,
  },
  setup(props: IMessageProps, context: SetupContext) {
    const root = ref(null);
    const currentVisible = computed(() => props.modelValue || props.visible);
    const rootClasses = computed(() => ({
      [name]: true,
      [`${name}--${props.theme}`]: true,
      [`${name}-align--${props.align}`]: !!props.align,
    }));
    const rootStyles = computed(() => ({
      zIndex: props.zIndex,
      ...props.offset,
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
};
</script>

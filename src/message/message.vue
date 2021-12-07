<template>
  <transition name="message" @after-leave="afterLeave" @after-enter="afterEnter">
    <div v-if="currentVisible" ref="root" :class="rootClasses" :style="rootStyles">
      <slot>
        <slot name="icon">
          <check-circle-filled-icon v-if="theme === 'success'" />
          <error-circle-filled-icon v-else />
        </slot>
        <span :class="`${name}--txt`">{{ content }}</span>
        <close-icon v-if="closeBtn === true" @click="onClose" />
        <t-node v-else :content="closeBtnContent" />
      </slot>
    </div>
  </transition>
</template>

<script lang="ts">
import { ref, computed, SetupContext, watch, defineComponent, getCurrentInstance, PropType } from 'vue';
import { CheckCircleFilledIcon, ErrorCircleFilledIcon, CloseIcon } from 'tdesign-icons-vue-next';
import { TdMessageProps, MessageAlignType, MessageThemeList } from './type';
import config from '../config';
import { emitEvent } from '@/shared/emit';
import { renderTNode, TNode } from '@/shared';

const { prefix } = config;
const name = `${prefix}-message`;

export default defineComponent({
  name,
  components: { CheckCircleFilledIcon, ErrorCircleFilledIcon, CloseIcon, TNode },
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
      type: String as PropType<MessageThemeList>,
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
     * @description 关闭按钮
     * @attribute close-btn
     */
    closeBtn: [String, Boolean, TNode],
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
  setup(props: TdMessageProps, context: SetupContext) {
    const root = ref(null);
    const internalInstance = getCurrentInstance();
    const closeBtnContent = computed(() => renderTNode(internalInstance, 'closeBtn'));
    const currentVisible = computed(() => props.modelValue || props.visible);
    const rootClasses = computed(() => ({
      [name]: true,
      [`${name}--${props.theme}`]: true,
      [`${name}-align--${props.align}`]: !!props.align,
    }));
    const rootStyles = computed(() => ({
      zIndex: props.zIndex,
    }));

    const onClose = () => {
      context.emit('update:modelValue', false);
      emitEvent(props, context, 'close');
    };

    watch(
      () => currentVisible.value,
      (val) => {
        emitEvent(props, context, 'visible-change', val);

        if (val === false) return;

        emitEvent(props, context, 'open');
        if (props.duration > 0) {
          setTimeout(onClose, props.duration);
        }
      },
    );

    return {
      name: ref(name),
      root,
      currentVisible,
      rootClasses,
      rootStyles,
      closeBtnContent,
      onClose,
      afterEnter: () => emitEvent(props, context, 'opened'),
      afterLeave: () => emitEvent(props, context, 'closed'),
    };
  },
});
</script>

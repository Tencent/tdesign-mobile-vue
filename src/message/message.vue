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
import { ref, computed, watch, defineComponent, getCurrentInstance, PropType, SetupContext } from 'vue';
import { CheckCircleFilledIcon, ErrorCircleFilledIcon, CloseIcon } from 'tdesign-icons-vue-next';
import messageProps from './props';
import config from '../config';
import { emitEvent } from '../shared/emit';
import { renderTNode, TNode, useDefault } from '../shared';
import { TdMessageProps } from './type';

const { prefix } = config;
const name = `${prefix}-message`;

export default defineComponent({
  name,
  components: { CheckCircleFilledIcon, ErrorCircleFilledIcon, CloseIcon, TNode },
  props: messageProps,
  emits: ['visible-change', 'open', 'opened', 'close', 'closed'],
  setup(props, context: SetupContext) {
    const root = ref(null);
    const internalInstance = getCurrentInstance();
    const closeBtnContent = computed(() => renderTNode(internalInstance, 'closeBtn'));
    const [currentVisible] = useDefault<TdMessageProps['visible'], TdMessageProps>(
      props,
      context.emit,
      'visible',
      'visible-change',
    );
    const rootClasses = computed(() => ({
      [name]: true,
      [`${name}--${props.theme}`]: true,
      [`${name}-align--${props.align}`]: !!props.align,
    }));
    const rootStyles = computed(() => ({
      zIndex: props.zIndex,
    }));

    const onClose = () => {
      emitEvent(props, context, 'close');
      currentVisible.value = false;
    };

    watch(
      () => currentVisible.value,
      (val) => {
        if (val === false) return;

        emitEvent(props, context, 'open');
        currentVisible.value = true;

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

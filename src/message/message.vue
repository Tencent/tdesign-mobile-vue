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
import { ref, computed, watch, defineComponent, getCurrentInstance, SetupContext, toRefs } from 'vue';
import { CheckCircleFilledIcon, ErrorCircleFilledIcon, CloseIcon } from 'tdesign-icons-vue-next';
import messageProps from './props';
import config from '../config';
import { renderTNode, TNode, useEmitEvent, useVModel } from '../shared';

const { prefix } = config;
const name = `${prefix}-message`;

export default defineComponent({
  name,
  components: { CheckCircleFilledIcon, ErrorCircleFilledIcon, CloseIcon, TNode },
  props: messageProps,
  emits: ['visible-change', 'open', 'opened', 'close', 'closed'],
  setup(props: any, context: SetupContext) {
    const emitEvent = useEmitEvent(props, context.emit);
    const root = ref(null);
    const internalInstance = getCurrentInstance();
    const closeBtnContent = computed(() => renderTNode(internalInstance, 'closeBtn'));
    const { visible, modelValue } = toRefs(props);
    const [currentVisible, setVisible] = useVModel(visible, modelValue, props.defaultValue, props.onChange);
    const rootClasses = computed(() => ({
      [name]: true,
      [`${name}--${props.theme}`]: true,
      [`${name}-align--${props.align}`]: !!props.align,
    }));
    const rootStyles = computed(() => ({
      zIndex: props.zIndex,
    }));

    const onClose = () => {
      emitEvent('close');
      setVisible(false);
    };

    watch(
      () => currentVisible.value,
      (val) => {
        if (val === false) return;

        emitEvent('open');
        setVisible(true);

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
      afterEnter: () => emitEvent('opened'),
      afterLeave: () => emitEvent('closed'),
    };
  },
});
</script>
